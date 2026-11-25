import {restEvidence} from './rest-status.mjs';
import {permission} from './core.mjs';

export function mergeEvidence(places,evidence,status,now=Date.now()){
 const merged=new Map(places.map(p=>[p.id,p]));
 for(const p of evidence){const original=merged.get(p.id);merged.set(p.id,{...original,...p,...(original&&permission(original)==='closed'?{permission:'closed',status:original.status}:{})})}
 return [...merged.values()].map(p=>restEvidence(p,status,now));
}

// Ranking never equates a source catalog label with a verified car-sleeping spot.
export function recommendationTier(p,now=Date.now()){
 if(['closed','forbidden'].includes(p.permission)||p.carSleepingForbidden)return -1;
 if(p.kind==='campground')return 3;
 if(p.permission==='rest-supported'&&p.operating?.fresh&&now-Date.parse(p.operating.checkedAt)<=2*60*60*1000&&now-Date.parse(p.operating.sourceUpdated)<=2*60*60*1000)return 0;
 if(p.source==='caltrans')return 2;
 if(p.review&&(!p.review.expiresAt||Date.parse(p.review.expiresAt+'T23:59:59Z')>=now)&&now-Date.parse(p.review.checkedAt)<30*86400000)return 1;
 return 2;
}

export function milesBetween(a,b){
 const r=Math.PI/180,dy=(a.lat-b.lat)*111.195,dx=(a.lon-b.lon)*111.195*Math.cos((a.lat+b.lat)/2*r);
 return Math.hypot(dx,dy)/1.60934;
}
