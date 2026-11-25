# Overnight map: source research and evidence model

Researched 2026-11-25. Initial geography: the western contiguous United States (WA, OR, CA, NV, ID, MT, WY, UT, CO, AZ, NM). This document distinguishes source facts from product decisions. Dataset timestamps indicate when a publisher last changed a record; fetching it today does not independently verify present conditions.

## Findings that drive the map

There is no evidence here for a comprehensive western-US registry of every place where a traveler may sleep in a car. A public road, a parking lot, a public-land polygon, and an overnight permission are different facts. The map should show useful evidence and its limits rather than manufacture a legal yes/no layer from those geometries.

BLM generally permits dispersed camping on much of its land, subject to local restrictions and closures. Its current national guidance distinguishes rules from recommendations, lists varying stay limits, and requires vehicles to remain on designated routes unless specifically allowed otherwise. A BLM ownership polygon alone therefore cannot establish that a specific pullout is reachable or permitted. [BLM national camping guidance](https://www.blm.gov/programs/recreation/camping)

Forest Service motorized access is designated by vehicle class and season. Limited off-route access for dispersed camping can be designated separately; local maps specify the applicable corridor and exceptions. Forest orders can prohibit camping and impose restrictions even where a road appears on a Motor Vehicle Use Map (MVUM). [36 CFR Part 212](https://www.govinfo.gov/content/pkg/CFR-2025-title36-vol2/xhtml/CFR-2025-title36-vol2-chapII.html), [36 CFR Part 261](https://www.govinfo.gov/content/pkg/CFR-2025-title36-vol2/xhtml/CFR-2025-title36-vol2-part261.html)

National parks need particular care. Joshua Tree explicitly permits vehicle sleeping at a lawfully occupied designated campsite and prohibits it outside campgrounds. Grand Teton likewise restricts car sleeping to designated campgrounds. These are concrete examples, not evidence for a universal rule for every land manager. [Joshua Tree FAQ](https://www.nps.gov/jotr/faqs.htm), [Grand Teton camping](https://www.nps.gov/grte/planyourvisit/camping.htm)

## Official geographic feeds inspected

The ArcGIS layer links below are directly queryable. Requests should use WGS84 output (`outSR=4326`), spatial envelopes, explicit fields, and complete pagination. Respect `exceededTransferLimit`; a truncated response must never be presented as all results.

| Feed | Useful fields | What it establishes / limits |
| --- | --- | --- |
| [USFS recreation opportunities, layer 0](https://apps.fs.usda.gov/ArcX/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0) | `objectid`, `recareaid`, `recareaname`, `latitude`, `longitude`, `recareaurl`, `forestname`, `markeractivity`, `markeractivitygroup`, `recareadescription`, `openstatus`, `open_season_start`, `open_season_end`, `restrictions`, `feedescription`, `reservation_info`, `operational_hours` | Official recreation records with useful local restrictions and status. Not all records are car-accessible camping: explicitly separate backpacking, cabins, group facilities, and day use. Preserve unknown status and source language. |
| [USFS MVUM roads, layer 1](https://apps.fs.usda.gov/ArcX/rest/services/EDW/EDW_MVUM_01/MapServer/1) | `objectid`, `id`, `name`, `symbol`, `mvum_symbol_name`, `forestname`, `districtname`, `passengervehicle`, `passengervehicle_datesopen`, `highclearancevehicle`, `highclearancevehicle_datesopen`, `surfacetype`, `seasonal`, `routestatus` | Vehicle-use designations, not a camping-permission field. No dedicated dispersed-camping corridor attribute was present in the inspected national schema. Do not color these roads as permitted sleeping corridors. |
| [BLM campground facilities, layer 8](https://gis.blm.gov/arcgis/rest/services/Recreation/BLM_Natl_Recreation_Sites_Facilities/MapServer/8) | `OBJECTID`, `FacilityID`, `FacilityName`, `FacilityDescription`, `FacilityTypeDescription`, `FacilityUseFeeDescription`, `FacilityReservationURL`, `FacilityLatitude`, `FacilityLongitude`, `StayLimit`, `Reservable`, `LastUpdatedDate`, `BLMFacURL` | Exact official facility records. Coordinates are also stored as strings. Descriptions can contain fees, first-come rules, vehicle limits, and access details. `Reservable` may be `-1`; preserve it as source data until interpreted against the schema. |
| [BLM primitive campsites, layer 4](https://gis.blm.gov/arcgis/rest/services/Recreation/BLM_Natl_Recs_pts/MapServer/4) | `OBJECTID`, `FET_NAME`, `FET_SUBTYPE`, `DESCRIPTION`, `WEB_LINK`, `LAT`, `LONG`, `ADMIN_ST`, `WEB_DISPLAY` | Official primitive-campsite locations. Subtype can explicitly indicate nonreservable/no fee. Some points may require a boat or hike; source schema does not independently establish car access. |
| [BLM camping recreation areas, layer 2](https://gis.blm.gov/arcgis/rest/services/Recreation/BLM_Natl_Recreation_Sites_Facilities/MapServer/2) | `RecAreaID`, `RecAreaName`, `RecAreaDescription`, `RecAreaLatitude`, `RecAreaLongitude`, `StayLimit`, `RecAreaFeeDescription`, `RecAreaReservationURL`, `BLMRecURL`, `ActivityNames`, `LastUpdatedDate` | Broader areas, sometimes whole scenic byways with camping somewhere along them. An area reference pin must not be presented as an exact sleeping location. |
| [Caltrans rest areas](https://caltrans-gis.dot.ca.gov/arcgis/rest/services/CHhighway/Rest_Areas/FeatureServer/0) | Inspect current layer metadata before querying. | Official rest-area locations, rather than a generic OSM parking inference. Dataset catalogue warns temporary closures may occur and refers users to facility links. [Catalogue](https://data.ca.gov/%40caltrans/safety-roadside-rest-areas) |
| [WSDOT active rest-area sites, layer 8](https://data.wsdot.wa.gov/ArcGIS/rest/services/Shared/FacilitiesData/MapServer/8) | `OBJECTID`, `SiteName`, `SiteLatitude`, `SiteLongitude`, `SiteLocation`, `SiteCity`, `SiteStreetAddress`, `SiteStatus` | Official rest-area locations. `SiteStatus=OWNED` describes property status, not whether the public facility is open tonight. Trim fixed-width text. |
| [ODOT rest areas, layer 38](https://gis.odot.state.or.us/arcgis1006/rest/services/basemaps/Basemap_Overlay_WM/MapServer/38) | `OBJECTID`, `NAME`, `LOCATION`, `OPERATED`, `SAFETY_RA`, `ACCESS`, `SIGNED_RTE`, `GIS_PRC_DT`, `EFFECTV_DT` | Official geographic feed, but sample record was dated 2014. Useful discovery layer; current operation/closures require separate checking. `OPERATED` matters because operators differ. |

The [Forest Service transportation data catalogue](https://data.fs.usda.gov/geodata/edw/datasets.php?dsetCategory=transportation) explicitly warns that not every forest is represented in national MVUM data. Coverage gaps must remain visible. The [BLM geospatial programme](https://www.blm.gov/services/geospatial) provides official service directories and land-management layers; ownership should be a contextual overlay.

## Rest-area rules: keep rest separate from camping

The following are researched policy references, not a promise that a specific site is open or that every parking bay accepts every vehicle. Posted restrictions and local operators matter. Do not apply these statewide policies to arbitrary private parking lots or park-and-ride facilities.

| State | Verified official guidance | Appropriate map wording |
| --- | --- | --- |
| CA | Caltrans manual prohibits camping and limits remaining/parking to eight hours in 24 hours. The official dataset explicitly describes taking a nap as a rest-area purpose. [Manual, public facilities](https://dot.ca.gov/-/media/dot-media/programs/maintenance/documents/maintenance_manual_volume_1-combined_version_dec242024-final.pdf), [dataset](https://data.ca.gov/%40caltrans/safety-roadside-rest-areas) | Rest stop, up to 8h/24h; camping prohibited; check closure/signs. Do not call it a campground. |
| WA | Eight hours in 24 hours unless authorized otherwise; camping and maintaining sleeping accommodations are prohibited. Shorter zones may be posted. [RCW 47.38.020](https://app.leg.wa.gov/rcw/default.aspx?cite=47.38.020), [WSDOT traffic manual](https://www.wsdot.wa.gov/publications/manuals/fulltext/m51-02/chapter6.pdf) | Time-limited rest parking; overnight sleeping permission not independently established from the parking cap. |
| OR | ODOT regulations prohibit camping/tents/structures and remaining more than 12 hours in 24 hours. Both highway sides count together as one rest area. [Official posted rules](https://www.oregon.gov/odot/Forms/2ODOT/7342119.pdf) | Rest stop, up to 12h/24h at sites subject to these rules; no camping; verify operator and signs. |
| NV | NDOT identifies a maximum of 18 hours in a two-week period and tells visitors to consult signs. [NDOT help centre](https://nvdot.zendesk.com/hc/en-us/articles/360049661813-How-Long-May-I-Stay-or-Park-in-a-Rest-Area-Park-n-Ride) | Time-limited rest; 18h per two weeks; verify local restrictions. |
| AZ | ADOT prohibits camping/campfires and encourages sufficient rest. The inspected page does not state a numeric stay limit or blanket vehicle-sleeping permission. [ADOT rules](https://azdot.gov/business/highway-maintenance/rest-areas/rest-area-rules) | Rest area; no camping; overnight specifics unverified. Do not invent an unlimited-stay rule. |
| ID | ITD explicitly answers overnight-parking questions: up to ten consecutive hours on interstates, sixteen on US/state highways. Camping and utility connections are prohibited. [ITD FAQ](https://itd.idaho.gov/faqs/rest-areas/) | Overnight rest within route-specific limit; no camping; confirm route and signs. |
| MT | MDT explicitly allows overnight parking for up to twelve hours using one space per vehicle; camping prohibited. Seasonal dates and temporary closures are listed separately. [MDT rest areas](https://www.mdt.mt.gov/travinfo/restarea.aspx) | Overnight rest, max 12h, one space; no camping; check current status. |
| UT | UDOT says no overnight camping; extended stays are permitted and monitored by staff/Highway Patrol. [UDOT rest areas](https://connect.udot.utah.gov/public/rest-areas/) | Conditional extended rest, no overnight camping; ask staff about the intended stay. |
| CO, WY, NM | No complete official overnight-rest policy was verified in this research pass. | Unknown. Do not fill the gap from informal state-by-state summaries. |

## Campground discovery and live availability

Recreation.gov encourages reuse of federal recreation data and identifies RIDB as its documented data-sharing API. Its coverage is federal/federally affiliated recreation, not every state park or private campground. [Use and share data](https://www.recreation.gov/use-our-data)

A direct unauthenticated test of `https://ridb.recreation.gov/api/v1/facilities?limit=1` returned HTTP 401. The documented RIDB integration requires an API key. Do not put a key in browser source or Git. [RIDB documentation](https://ridb.recreation.gov/docs)

An observed website endpoint was tested successfully on 2026-11-25:

```
GET https://www.recreation.gov/api/camps/availability/campground/232447/month?start_date=2026-12-01T00%3A00%3A00.000Z
```

It returned HTTP 200 with a `campsites` object keyed by campsite ID; each object contained `campsite_id`, `site`, `loop`, `campsite_reserve_type`, and `availabilities` keyed by UTC-midnight date strings. Observed values included `Available` and `Reserved`. This is an observed website interface, not a documented public API compatibility promise. Additional query arguments such as `f=pjson` should not be added to this endpoint. Keep its adapter isolated; fail visibly when upstream shape or access changes.

Product decisions for availability:

- A successful fetch means a recent inventory observation, not a reservation or guaranteed vacancy.
- For a multi-night stay, the **same campsite** must be available for every requested night, including across month boundaries. Never sum independent nightly counts as continuous stays.
- Only explicit reservable availability counts as reservable. Preserve first-come, walk-up, closed, not-yet-released, reserved, and unknown as distinct statuses. An unrecognized status is unknown.
- Walk-up or first-come inventory is not an occupancy sensor. Label on-site availability unknown unless a reliable operator feed explicitly reports it.
- Site equipment, vehicle length, access method, arrival cutoff, minimum stay, permits, and booking window can still prevent booking even when a calendar displays availability. Source-specific policies supersede broad policies. [Recreation.gov reservation policies](https://www.recreation.gov/reservation-policies)
- Link out to the campground's actual booking page. State parks and commercial reservations need separate adapters or honest external links.

## Conservative classification model

This is a proposed product model derived from the research, not a legal standard.

1. **Official camping record**: an agency explicitly lists a campsite or campground. Show whether vehicle access, fees, reservation requirement, operating season, and status are known. This is stronger evidence than an inferred pullout, but still subject to closures and equipment restrictions.
2. **Conditional overnight/rest**: an official rule supports time-limited rest or a local page describes dispersed camping under conditions. Display those conditions and their source; do not replace them with an unconditional green check.
3. **Needs verification**: OSM parking, a forest road, an ambiguous area centroid, land ownership without specific camping evidence, or unknown vehicle access. Never include these in an "allowed tonight" count.
4. **Closed/prohibited**: an applicable source explicitly says closed or prohibits the proposed use. Closure/prohibition outranks general permissive guidance. Do not derive an exact closure polygon from a vague description.

Each result should retain stable upstream ID, source URL, fetch timestamp, source last-updated value when present, classification rationale, raw restriction text, access uncertainty, and any source failure. An AI-written description must not be presented as an agency ruling. Do not infer permission from a lack of prohibitions, from `access=yes`, from `overnight=yes` alone without context, or from nearby public land.

## Caching and reliability decisions

Location discovery can be cached heavily (for example a day for site metadata, longer for stable road geometry) while availability should have a short freshness window (for example five minutes). These are engineering choices, not publisher guarantees. Show the actual fetched-at time and stale state; cached data must never acquire a newer timestamp merely because it was read again.

Persist successful responses on the backend; coalesce concurrent identical requests; cache by canonical provider/query key; bound spatial queries and pagination. Keep stale successful discovery data when a provider fails, accompanied by a warning. For stale availability, remove any "live" or current-vacancy claim and expose last-known results as historical observations. Never cache upstream errors as an empty successful result.

Browser offline storage should retain the app shell, saved places, and fetched evidence. It cannot promise fully offline basemaps or fresh closures/availability. Respect tile-provider terms; avoid bulk caching third-party basemap tiles without explicit permission.

A future comprehensive version would need ongoing per-manager closure ingestion, local ordinances, current district MVUM/PDF interpretation, ownership/inholding checks, road condition/access information, and separate reservation-system integrations. Those gaps should be explicit in the app and repository; an exhaustive "all legal places" claim is not supported by the inspected data.

## Clarification: sleeping in the car beside a forest road

The primary use case is finding a roadside place to sleep **inside the vehicle**; developed campgrounds are a fallback. A campground directory alone does not meet that need. The road layer should be the main exploration surface, with local overnight evidence attached to the selected road or pullout.

`data/forest-rules.json` contains 15 researched forest-policy entries. These are source-backed **conditions and restrictions**, not geometries of approved sleeping spaces. Each entry has a forest-name match, summary, vehicle rule, exceptions, policy sources, current map/alerts links, review date, and roadside evidence status. Source URLs were checked and recorded separately in `research/forest-source-checks.json`. A review date does not mean all active forest orders have been exhaustively reviewed or that the road was visited.

Useful distinctions found in official forest-specific material:

- Eldorado explicitly describes drive-to dispersed camping and gives a one-vehicle-length parking limit beside designated roads. Its current annual dispersed stay cap is ten days per ranger district.
- Gifford Pinchot permits motorized access to dispersed sites along specific map corridors, on existing routes within 150 feet. Coconino uses 300 feet from the edge of specifically designated camping road segments. Those allowances do not extend to every open road.
- White River gives a 300-foot road-centerline maximum for impacted dispersed sites, subject to local designated-site-only restrictions. Pleasant Grove's Uinta-Wasatch-Cache map provides a different 150-foot allowance only for its listed routes. Avoid turning either into a region-wide rule.
- Mendocino's one-mile exclusion around developed recreation sites removes many superficially attractive roadside spots. Inyo's Restricted Recreation Areas similarly require an actual boundary check.
- Tahoe National Forest has mapped restrictions around Highway 20 and on its east side. The separate **Lake Tahoe Basin Management Unit** prohibits overnight occupancy outside specified exempt areas. A substring matcher must apply the Basin rule before the Tahoe National Forest rule.
- Shasta-Trinity's own guidance combines roadside parking limits with a campsite setback from roads. That does not clearly settle sleeping inside the parked car. This is deliberately marked unclear rather than resolved by assumption.

Several official forest pages support dispersed camping broadly while omitting an explicit universal pull-off distance or car-sleeping rule. Their entries retain that uncertainty. A forest match can provide relevant evidence but cannot alone set a road's permission to "allowed". The exact stop still needs compatible motor access, public ownership, absence of applicable camping restrictions, a lawful/safe stopping position, and any required local designation.

For road-first interaction, show the road's name/number, vehicle classification and season, then the applicable local policy, map and closure links. Keep separate explanations for (1) may drive here, (2) may park here, and (3) may occupy the car overnight. The national MVUM road service lacks the dedicated local camping-corridor fields needed to collapse those checks into one automatic green line. Local PDF maps can supply additional evidence, but their camping dots/tables have not been converted into a complete geospatial permission dataset in this pass.
