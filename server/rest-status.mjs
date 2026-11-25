import {plain} from './core.mjs';

export const CALTRANS_STATUS_URL='https://quickmap.dot.ca.gov/data/v2_srra.kml';
export const STATUS_MAX_AGE=2*60*60*1000;

// The agency's documented QuickMap layer: IDs are stable SRRA numbers, not names.
export function parseRestStatus(kml){
 const records=[];
 for(const match of kml.matchAll(/<Placemark\s+id="placemark_(\d+)"[^>]*>([\s\S]*?)<\/Placemark>/g)){
  const [,ctNo,body]=match,html=body.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1];
  const state=body.match(/<styleUrl>#srra_(open|closed|closing)<\/styleUrl>/)?.[1];
  const name=plain(html?.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]);
  const coords=body.match(/<coordinates>\s*([-\d.]+),([-\d.]+)/);
  const statusText=plain(html?.match(/<strong>Status:<\/strong>([\s\S]*?)<\/p>/)?.[1]);
  const reportedAt=plain(html?.match(/Last updated:\s*([\s\S]*?)<\/span>/)?.[1]);
  if(!html||!state||!name||!coords||!statusText||!reportedAt)throw Error('Unrecognized Caltrans status schema for '+ctNo);
  records.push({ctNo,name,state,statusText,reportedAt,lon:+coords[1],lat:+coords[2]});
 }
 // The upstream repeats two identical placemarks. Collapse only identical
 // facility/status tuples; reject contradictory states at the same location.
 const unique=new Map();for(const r of records){const key=r.ctNo+':'+r.lat+':'+r.lon,prior=unique.get(key);if(prior&&prior.state!==r.state)throw Error('Conflicting Caltrans status');unique.set(key,r)}
 if(unique.size<60)throw Error('Incomplete Caltrans status response');
 return [...unique.values()];
}

export function statusFresh(snapshot,now=Date.now()){
 const age=now-Date.parse(snapshot?.checkedAt),sourceAge=now-Date.parse(snapshot?.lastModified);
 return age>=-60000&&age<=STATUS_MAX_AGE&&sourceAge>=-60000&&sourceAge<=STATUS_MAX_AGE;
}

export function restEvidence(p,snapshot,now=Date.now()){
 if(p.source!=='caltrans')return p;
 const matches=snapshot.records.filter(r=>r.ctNo===String(p.ctNo));
 const record=matches.sort((a,b)=>Math.hypot(a.lat-p.lat,a.lon-p.lon)-Math.hypot(b.lat-p.lat,b.lon-p.lon))[0];
 const fresh=statusFresh(snapshot,now);
 const operating=record?{...record,checkedAt:snapshot.checkedAt,sourceUpdated:snapshot.lastModified,sourceUrl:CALTRANS_STATUS_URL,fresh}:null;
 return {...p,operating,permission:record?.state==='closed'?'closed':record?.state==='open'&&fresh?'rest-supported':'unverified',
  status:record?`${record.state.toUpperCase()} · ${record.statusText}${fresh?'':' · status check stale'}`:'Status not matched to current agency feed',
  review:{scope:'Exact rest facility · directional highway access',headline:'Car rest permitted · maximum 8 hours per 24 hours',
   summary:'Caltrans supports stopping to rest and take a nap. Camping is prohibited. Use automobile parking; the highway direction in the facility name matters.',
   rules:['Maximum 8 hours in any 24-hour period.','No campground-style setup or extended camping.','Open facility status does not establish an empty parking bay.'],
   access:record?`${record.statusText}. ${fresh?'Recent agency status check.':'Last reported status is stale; current opening is unconfirmed.'}`:'No matching agency operating status found.',
   checkedAt:'2026-11-25',sources:['https://dot.ca.gov/programs/design/lap-landscape-architecture-and-community-livability/lap-liv-h-safety-roadside-rest-areas','https://dot.ca.gov/-/media/dot-media/programs/design/documents/pdpm-chapter29-a11y.pdf',CALTRANS_STATUS_URL]}};
}
