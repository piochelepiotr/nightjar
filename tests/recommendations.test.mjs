import test from 'node:test';
import assert from 'node:assert/strict';
import places from '../data/places.json' with {type:'json'};
import reviewed from '../data/roadside-evidence.json' with {type:'json'};
import {mergeEvidence,recommendationTier,milesBetween} from '../server/recommendations.mjs';
import {restEvidence,statusFresh,parseRestStatus} from '../server/rest-status.mjs';
import {permission} from '../server/core.mjs';

const snapshot={checkedAt:'2026-11-25T21:00:00Z',lastModified:'2026-11-25T20:59:00Z',records:[{ctNo:'90200131',state:'closed',lat:40.7936,lon:-122.3175,statusText:'Closed'},{ctNo:'90900020',state:'closed',lat:37.7311,lon:-118.9693,statusText:'Closed for winter'},{ctNo:'90300040',state:'open',lat:39.3409,lon:-120.3398,statusText:'Open'}]};
const now=Date.parse(snapshot.checkedAt),catalog=mergeEvidence(places,reviewed,snapshot,now);
test('closed facilities lose to a farther open car-rest facility; stale openings lose promotion',()=>{
 const obrien=catalog.find(p=>p.id==='ca-86'),crestview=catalog.find(p=>p.id==='ca-66'),donner=catalog.find(p=>p.id==='ca-22');
 assert.equal(obrien.permission,'closed');assert.equal(crestview.permission,'closed');assert.equal(recommendationTier(obrien,now),-1);
 assert.equal(donner.permission,'rest-supported');assert.equal(recommendationTier(donner,now),0);
 const older=restEvidence(places.find(p=>p.id==='ca-22'),snapshot,now+3*3600000);
 assert.equal(older.permission,'unverified');assert.equal(recommendationTier(older,now+3*3600000),2);
 assert.equal(recommendationTier(donner,now+3*3600000),2);
 assert.equal(statusFresh({...snapshot,lastModified:'2020-01-01'},now),false);
});
test('activity filters cannot hide reviewed vehicle-camping areas or promote unknown primitive records',()=>{
 for(const id of ['usfs-70996','usfs-84034','usfs-28368','blm-jean-roach-dry-lakes','usfs-gmug-musicians-camp-site-group']){
  const p=catalog.find(p=>p.id===id);assert.ok(p,id);assert.equal(recommendationTier(p,now),1);assert.equal(p.permission,'unverified');assert.ok(p.review.scope);assert.ok(p.review.access);
 }
 assert.equal(recommendationTier({kind:'dispersed',source:'primitive'},now),2);
 assert.equal(permission({kind:'dispersed',status:'Open'}),'unverified');
 assert.equal(permission({kind:'rest',source:'wa'}),'unverified');
});
test('a bounded destination search does not silently widen a thirty-mile radius',()=>{
 const denver={lat:39.7392,lon:-104.9903};
 assert.ok(milesBetween(catalog.find(p=>p.id==='usfs-28368'),denver)<30);
 const west=places.find(p=>/West Magnolia/i.test(p.name));assert.ok(milesBetween(west,denver)>30);
});
test('parser fails closed for partial/schema-changed status feeds',()=>{
 assert.throws(()=>parseRestStatus('<kml></kml>'));
 assert.throws(()=>parseRestStatus('<Placemark id="placemark_123"><styleUrl>#srra_newstate</styleUrl></Placemark>'));
});
