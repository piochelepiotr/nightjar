export class PersistentCache{
 constructor(store,fetcher=fetch){this.store=store;this.fetcher=fetcher;this.pending=new Map();this.stats={hits:0,misses:0,stale:0};}
 async get(key,ttl,loader,{stale=true}={}){if(this.pending.has(key))return this.pending.get(key);const job=this.load(key,ttl,loader,stale);this.pending.set(key,job);try{return await job}finally{this.pending.delete(key)}}
 async load(key,ttl,loader,allowStale){const now=Date.now(),old=await this.store.get(key);if(old&&now-old.time<ttl){this.stats.hits++;return {...old,cache:'hit',stale:false}}this.stats.misses++;try{const data=await loader();const entry={data,time:Date.now()};await this.store.put(key,entry);return {...entry,cache:'miss',stale:false}}catch(e){if(old&&allowStale){this.stats.stale++;return {...old,cache:'stale',stale:true,error:'Source unavailable; showing saved data.'}}throw e}}
}
export class BucketStore{constructor(bucket){this.bucket=bucket}async get(k){const r=await this.bucket.get('cache-v1/'+encodeURIComponent(k));return r?await r.json():null}async put(k,v){await this.bucket.put('cache-v1/'+encodeURIComponent(k),JSON.stringify(v),{httpMetadata:{contentType:'application/json'}})}}
