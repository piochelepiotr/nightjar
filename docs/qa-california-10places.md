# California contribution to the ten-place acceptance test

Reviewed **2026-11-25**. This document covers four California cases, not all ten places and not a claim that browser QA has passed. The machine-readable fixtures are [`data/qa/california-cases.json`](../data/qa/california-cases.json). Website comparison is left explicitly pending for the main agent to complete in Chrome.

Assumptions: ordinary passenger car, a 30-mile **straight-line discovery radius**, and sleeping tonight. Straight-line distance is not a driving detour. An actual pullout, a road corridor, a land polygon and a campground are different evidence scopes. No exact ordinary-car roadside sleeping spot is fabricated when the evidence only establishes a candidate corridor.

## Sources that materially change the result

Caltrans permits a nap in a vehicle at a safety roadside rest area; its [rest-area program page](https://dot.ca.gov/programs/design/lap-landscape-architecture-and-community-livability/lap-liv-h-safety-roadside-rest-areas) and [official design manual chapter 29](https://dot.ca.gov/-/media/dot-media/programs/design/documents/pdpm-chapter29-a11y.pdf) establish the eight-hour limit in a 24-hour period and camping prohibition. This is useful time-limited car rest, not an unlimited campsite.

More importantly, **positive live facility status is available**. [QuickMap](https://quickmap.dot.ca.gov/) loads [its layer configuration](https://quickmap.dot.ca.gov/config/layers.json), whose `rest_areas` layer names [`v2_srra.kml`](https://quickmap.dot.ca.gov/data/v2_srra.kml) and [`v2_srrapending.kml`](https://quickmap.dot.ca.gov/data/v2_srrapending.kml). The first contained 86 placemarks when audited. Titles are in each description's `h2.iw-title` (the KML `name` is blank); IDs are `placemark_<CT_NO>`, with `#srra_open`, `#srra_closed` and `#srra_closing` style/status values. The [QuickMap FAQ](https://quickmap.dot.ca.gov/faq) explains open/closed status. Official [Caltrans rest-area geometry](https://caltrans-gis.dot.ca.gov/arcgis/rest/services/CHhighway/Rest_Areas/FeatureServer/0) joins by `CT_NO`; the relevant fields are `MAP_LABEL_NAME`, `REST_AREA_NAME`, `TRAFFIC_DIRECTION`, `LATITUDE` and `LONGITUDE`.

The snapshot used below had per-record update **11/25/2026 12:58 pm Pacific** and HTTP Last-Modified **2026-11-25 20:58:53 UTC**. Refresh before travel. An absent LCS closure record must not be interpreted as open; this source provides an affirmative status instead. Open still does not guarantee an empty parking bay or a safe road approach.

| Case | Best supported non-campground result | Material rejected alternative |
| --- | --- | --- |
| El Portal / Yosemite | None fully verified in this bounded audit; compatible McCabe Flat campground site is fallback | Yosemite parking, Camp 4 car sleeping and Merced River dispersed pullouts |
| Mono Lake / Lee Vining | 01N11 is a researched **road corridor**, still unsuitable for an exact verified-spot green claim | West-canyon restricted area; LADWP parcel east of US395; winter-closed Crestview rest area |
| Truckee / Donner | Donner Summit rest areas, currently OPEN, direction-specific eight-hour car rest | Treating nearby Tahoe forest roads as automatically permitted |
| Redding / Shasta | Herbert S. Miles and Lakehead rest areas, currently OPEN, selected by onward route | Closer O'Brien rest area is explicitly CLOSED |

## 1. Yosemite Valley / El Portal

Anchor El Portal **37.67430, -119.78400**. No fully verified non-campground car-sleeping spot was established within 30 miles. This is a bounded research outcome, not proof that none exists.

[NPS regulations](https://www.nps.gov/yose/planyourvisit/nrcamping.htm) prohibit sleeping in a vehicle except at a registered compatible campsite; they specifically prohibit car sleeping at walk-in Camp 4. [Lower River parking](https://www.nps.gov/places/lower-river-parking.htm) is day parking, not an overnight workaround. The [current park conditions](https://www.nps.gov/yose/planyourvisit/conditions.htm) page must be checked separately from normal campground seasons: this audit encountered a temporary campground-closure notice alongside normal operating lists and did not infer a tonight-open campsite from a seasonal table.

Fallback: **McCabe Flat Campground, 37.59659, -120.00349**, BLM facility **273833**, 13.2 miles straight-line from El Portal. Coordinates come from [BLM's official recreation facility service, layer 8](https://gis.blm.gov/arcgis/rest/services/Recreation/BLM_Natl_Recreation_Sites_Facilities/MapServer/8), not a guessed roadside point. The [facility description](https://www.blm.gov/visit/mccabe-flat-campground) distinguishes **two drive-up** from eight walk-in sites. A compatible drive-up reservation is required for this fallback; this does not establish vehicle sleeping in the common parking lot. The [current Merced River overview](https://www.blm.gov/visit/merced-river) requires reservations and says same-day bookings may be available; use [the actual booking inventory](https://www.recreation.gov/camping/campgrounds/273833), rather than older first-come wording elsewhere. Exact site availability and current facility operation were **not live verified** in this research.

BLM's facility rules prohibit dispersed camping in the Merced River corridor, so Briceburg day-use pullouts are rejected. Nearby Hardin Flat forest roads remain unverified: the official [Stanislaus dispersed guide](https://www.fs.usda.gov/sites/nfs/files/r05/stanislaus/publication/dispersed%20campping%20ROG.pdf) instructs users to park and walk to camp; it is insufficient evidence for a particular sleeping-car pullout with current winter access.

Expected website: show a truthful gap in verified non-campground results, park/river restrictions, and compatible campground fallback. Do not manufacture a green forest-road pin to fill the gap.

## 2. Mono Lake / Lee Vining

Anchor **37.95760, -119.11950**. Research candidate **01N11 / 120–1S35 CONNECT**, actual MVUM vertex **37.91402177451219, -119.04656990290476**, 5.0 miles straight-line. Official [national MVUM service, layer 1](https://apps.fs.usda.gov/ArcX/rest/services/EDW/EDW_MVUM_01/MapServer/1), object **19837965**, reports year-long passenger-vehicle legal use but maintenance level **2 — HIGH CLEARANCE VEHICLES** and native surface. Legal vehicle class and ordinary-car physical suitability are separate questions.

The point was checked against the county-published [Camp Like a Pro service](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer): no intersection with layer 0 no-dispersed-camping, layer 2 LADWP, or layer 3 wilderness. USFS context layers 9/16 intersect, but their green ownership symbology does not itself grant camping permission. See [the county's endorsement](https://www.monocounty.ca.gov/2153/Camping-Camp-Like-a-Pro) and the separate [Mono Basin evidence audit](MONO_BASIN_RESEARCH.md). Current order **05-04-50-25-17**, effective July 3, 2025–July 3, 2027, overrides general forest permission inside the restricted recreation areas.

This is a **road corridor scouting candidate**, not an identified cleared pullout. No current snow/ground-condition confirmation or exact durable parking surface was obtained. Keep it out of an exact-spot verified-green count for an ordinary car tonight. Summer scouting may be viable after checking current orders, physical access and a legal durable surface; existing road data alone cannot prove the eventual parked position.

Boundary regression fixtures:

- Actual west CA120 road point **37.9499678885235, -119.199833734036** intersects county no-camping object **24**, `USFS Restricted Rec Area`.
- East CA120 point **37.8925485410041, -119.07987912012** intersects LADWP polygon **4**, parcel **272**. Thus “east of US395” is not universal permission.
- Crestview rest area **CT_NO 90900020**, approximately **37.7311, -118.9693**, is explicitly **CLOSED — Winter Closure**, no reopening estimate, in the audited QuickMap feed.
- [Caltrans SR120 conditions](https://roads.dot.ca.gov/roadscell.php?roadnumber=120) reported the winter closure from Crane Flat to five miles west of US395. This is not a blanket closure of every SR120 East segment.

Expected website: resolve west and LADWP exclusions, distinguish road corridor from sleeping spot, disclose high-clearance/winter uncertainty and suppress closed Crestview as a tonight recommendation.

## 3. Truckee / Donner

Anchor **39.32796, -120.18325**. Strongest verified non-campground options are exact Caltrans facilities:

| Facility | Official ID / object | Official geometry | Straight-line distance | Snapshot |
| --- | --- | --- | --- | --- |
| Donner Summit westbound | CT_NO **90300041**, OBJECTID **23** | **39.34276723296793, -120.34030208580023** | 8.5 miles | OPEN |
| Donner Summit eastbound | CT_NO **90300040**, OBJECTID **22** | **39.34085523380519, -120.33984608389402** | 8.4 miles | OPEN |

Both have explicit affirmative status in the live source described above. Select according to actual direction; the nearby opposite carriageway is not necessarily a short legal detour. Apply the eight-hour / 24-hour rest limit, no camping and current source freshness. Winter driving conditions remain separate from facility operating status.

Do not replace this verified exact-facility evidence with generic Tahoe forest road pins. [Tahoe order 17-25-05](https://www.fs.usda.gov/r05/tahoe/alerts/camping-and-campfire-restrictions-truckee-and-sierraville-districts), effective July 1, 2025–June 30, 2028 in the signed text, has mapped restricted-use areas and specific exceptions. Road presence by itself does not settle those exclusions.

Expected website: prominently surface both Donner rest facilities with correct direction, current OPEN status, source timestamp and eight-hour limit. The preferred one depends on the route.

## 4. Redding / Shasta

Anchor **40.58654, -122.39168**. Strongest verified non-campground options are exact Caltrans facilities:

| Facility | Official ID / object | Official geometry | Straight-line distance | Snapshot |
| --- | --- | --- | --- | --- |
| Herbert S. Miles southbound | CT_NO **99900178**, OBJECTID **82** | **40.27040315206914, -122.2703395129296** | 22.8 miles | OPEN |
| Lakehead southbound | CT_NO **90200107**, OBJECTID **15** | **40.91746119056417, -122.39785962642311** | 22.9 miles | OPEN |
| Herbert S. Miles northbound | CT_NO **90200086**, OBJECTID **10** | **40.251550152328534, -122.26073450941782** | 24.1 miles | OPEN |
| O'Brien northbound — reject | CT_NO **90200131**, OBJECTID **86** | **40.793572187451254, -122.31753459496386** | closer than Lakehead | CLOSED |

O'Brien's live description says **Rest Area Closure**, with no reopening estimate. This is a concrete ranking regression: a nearby sleeping-permitted facility pin is not a usable tonight recommendation when the facility is closed. Lakehead is useful on a southbound approach from the north; Herbert S. Miles may suit the opposite leg. No universal best is claimed without onward route information.

Generic Shasta forest-road car sleeping remains unresolved where guidance separates parking near the road from camping hundreds of feet away. Do not silently treat walk-in camping language as exact car-sleeping permission. Another independent restriction fixture, outside the 30-mile Redding radius, is [Upper Ski Bowl order 14-26-09](https://www.fs.usda.gov/r05/shasta-trinity/alerts/upper-ski-bowl-parking-restriction-order), effective August 29, 2026–August 29, 2028: parking is prohibited midnight–6 am in its mapped area.

Expected website: reject closed O'Brien and offer the current open facilities with direction, limit and freshness; no unsupported green forest-road replacement.

## Verification still required by the main acceptance run

Compare actual Chrome search results and cards with these fixtures, recording what was visible, any ranking issue, and the final correction. For campground fallback, distinguish facility operation, a compatible vehicle site and actual date availability. For a corridor, do not claim an exact parking space. Refresh live status before the final run; these November 25 snapshots must not become indefinitely cached operational truth.
