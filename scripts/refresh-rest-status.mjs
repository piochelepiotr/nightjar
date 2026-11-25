import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {CALTRANS_STATUS_URL,parseRestStatus} from '../server/rest-status.mjs';
await mkdir('.cache/sources',{recursive:true});
const path='data/caltrans-status.json';let previous;try{previous=JSON.parse(await readFile(path,'utf8'))}catch{}
const headers={};if(previous?.etag)headers['If-None-Match']=previous.etag;if(previous?.lastModified)headers['If-Modified-Since']=previous.lastModified;
const r=await fetch(CALTRANS_STATUS_URL,{headers,signal:AbortSignal.timeout(45000)});
let snapshot;
if(r.status===304&&previous)snapshot={...previous,checkedAt:new Date().toISOString()};
else{
 if(!r.ok)throw Error('Caltrans returned '+r.status);
 const body=await r.text(),records=parseRestStatus(body),hash=createHash('sha256').update(body).digest('hex');
 await writeFile('.cache/sources/caltrans-'+hash+'.kml',body);
 snapshot={sourceUrl:CALTRANS_STATUS_URL,checkedAt:new Date().toISOString(),lastModified:r.headers.get('last-modified'),etag:r.headers.get('etag'),hash,records};
}
// Atomic replacement: invalid/truncated downloads never replace last known evidence.
await writeFile(path+'.tmp',JSON.stringify(snapshot,null,2)+'\n');await rename(path+'.tmp',path);
console.log('Caltrans status checked:',snapshot.records.length,'facilities',snapshot.checkedAt);
