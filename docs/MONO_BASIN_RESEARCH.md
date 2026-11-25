# Mono Basin: mapped overnight constraints

Researched 2026-11-25. This research resolves local polygons around Highway 120 rather than attaching a forest-wide summary to every road.

## Current official map provenance

The current [Inyo National Forest camping page](https://www.fs.usda.gov/r05/inyo/recreation/camping-cabins) sends visitors to `essrp.org/camping` for the restricted-area map. That redirects to [Camp Like A Pro](https://www.camplikeapro.org/), a page provided by Mono County Sustainable Outdoors and Recreation. The [county camping page](https://www.monocounty.ca.gov/2153/Camping-Camp-Like-a-Pro) and [county press release](https://monocounty.ca.gov/sites/default/files/fileattachments/county_administration/page/33842/pr_2024camplikeapro_06.10.24_final.pdf) independently identify this programme.

The actual current embed was followed through its published page data:

1. CampLikeAPro Wix component `comp-koubiduf` points to [this HTML embed](https://www-camplikeapro-org.filesusr.com/html/9cd3e0_762d2fb9d7c84d78dd01d1a1d010fea2.html).
2. The embed loads [Mono County ArcGIS app `64894b1e239a490e8365364d1a7bc982`](https://monomammoth.maps.arcgis.com/apps/instant/basic/index.html?appid=64894b1e239a490e8365364d1a7bc982).
3. The app configuration identifies webmap [`556c0b4e109140d1a86dc19eefab6ea4`](https://monomammoth.maps.arcgis.com/apps/mapviewer/index.html?webmap=556c0b4e109140d1a86dc19eefab6ea4).
4. The webmap uses the hosted [Camp_Like_A_Pro_Mono_County_WFL1 FeatureServer](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer), ArcGIS item `cbc4ec746fef4a619d570fa2e92d71fd`.

The app owner is `MonoCountyCA`. The webmap and feature-service owner is `emiller@mono.ca.gov_MonoMammoth`. Thus this is the feed in the current published county map, not a similarly named archived service. The full page/app/webmap metadata and embed HTML are retained under `research/mono/` for reproducibility.

## Geospatial layers

| Layer | Contents | Use |
| --- | --- | --- |
| [0](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer/0) | `No_Dispersed_Camping`, 47 features | Actual negative restriction polygons, including USFS Restricted Recreation Areas, private ownership, LADWP and other reasons. `OwnerDescr`, `Notes`, `Website`, `description`, stable `GlobalID`. Some features may have null geometry; retain explicit diagnostics rather than crash. |
| [2](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer/2) | LADWP no-camping parcels | Additional local ownership restriction geometry. Avoid publishing unnecessary owner/mailing-address fields from the parcel schema. |
| [3](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer/3) | Wilderness | Independently prevents treating roadless wilderness as vehicle-camping territory; it can allow permitted nonmotorized camping. |
| [5](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer/5) | Inyo roads | Useful official geometry and road identifiers. Includes highway reference roads, so it is not an overnight-permission layer. |
| [9](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer/9) | `HT_INF_2` | Visible green forest-area layer. Popup is forest name, information links and campfire-permit note; it has no explicit camping-permitted field. |
| [14](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer/14) | BLM reference land polygons | Ownership/manager context, not an unconditional permission. |
| [16](https://services.arcgis.com/rQj5FcfuWPllzwY8/ArcGIS/rest/services/Camp_Like_A_Pro_Mono_County_WFL1/FeatureServer/16) | `HT_INF` | Hidden in the current webmap. Its geometry differs from layer 9. No explicit permission field or documented derivation was found. Do not silently substitute it as an "allowed camping" polygon. |

The current legend labels green as **U.S. Forest Service**, not "camping allowed". A copy is retained at `research/mono/current-map-legend.png`. This distinction matters: the present feed has useful exact exclusions but does not assert that every remaining green pixel is a legally usable car-sleeping space.

Layer 0 reports a data edit timestamp of **2025-05-06**. The feed remains the one in the current county publication. Show the publisher date separately from the fetch date; do not describe the geometry as independently reverified today. The [current Forest Order 05-04-50-25-17](https://www.fs.usda.gov/r05/inyo/alerts/stay-limits-parking-and-developed-recreation-site-use) prohibits camping in Inyo Recreation Restriction Areas except developed campground campsites or posted overflow areas, effective July 3, 2025 through July 3, 2027.

## Reproducible east/west Highway 120 tests

The following coordinates were taken from vertices of the **published county road geometry**, not guessed from place names. Coordinates are latitude, longitude in this table; the saved GIS request uses longitude, latitude.

| Location | Latitude, longitude | Restriction query result |
| --- | --- | --- |
| CA 120 West, Tioga/Lee Vining Canyon | `37.9499678885235, -119.199833734036` | Layer 0 `OBJECTID=24`, **USFS Restricted Recreation Area**. |
| CA 120 West, lower canyon | `37.9311794360148, -119.160053907333` | Same restricted polygon 24. |
| CA 120 West, near Lee Vining | `37.9402180610182, -119.125148074294` | Same restricted polygon 24. |
| CA 120 East, western section | `37.8925485410041, -119.079879120120` | Layer 0 `OBJECTID=4`, **LADWP: no camping**; also layer 2 parcel `OBJECTID=272`. |
| CA 120 East, farther east | `37.9211858939989, -119.040031205810` | No hit in queried no-dispersed-camping, LADWP parcel or wilderness layers; in Inyo reference polygons. |
| CA 120 East, Jeffrey-pine/Mono Mills side | `37.9130352656338, -118.999946564127` | No hit in those restriction layers; in Inyo reference polygons. |
| CA 120 East, farther southeast | `37.8834515020172, -118.949971382617` | No hit in those restriction layers; in Inyo reference polygons. |

Layer 5 identifies the west highway as `NAME='120 WEST'`, `ID='01S64 - CA120W'`, and the east highway as `NAME='120 EAST Q-014'`, `ID='01S27 - CA120E'`. Both have `DESIGNATION='Highway'` and `SYMBOL=14`; this reference road designation is not an MVUM camping corridor authorization.

The polygon tests establish the user's important west/east distinction for the sampled locations: roadside dispersed camping in the west-canyon restriction polygon must be rejected, while several forest locations farther east lie outside the mapped restriction. They also disprove the overbroad rule "anything east of US 395 is allowed": the western part of CA 120 East crosses LADWP no-camping land.

The no-hit eastern samples are eligible for further dispersed-camping checks under the underlying forest policy; they are **not** a permission to sleep on the highway shoulder. Legal parking, established access, the exact off-highway pullout, current closures, ownership, water setbacks and any local signs still have to agree. The map should resolve the actual selected coordinate against these layers, then say precisely which checks passed.

An earlier approximate west sample `37.94,-119.20` is in Ansel Adams Wilderness, not on CA 120. It must not be used as the road regression fixture. Actual road vertices above avoid that error.

Saved evidence:

- `research/mono/120-roads.json`: road geometry used for sample selection.
- `research/mono/road-point-tests.json`: full restriction query results for actual road vertices.
- `research/mono/point-tests.json`: additional approximate point checks, kept distinct from road samples.
- `research/mono/all-nocamping.json`: complete layer-0 GeoJSON query response.

Example point-query parameters are `geometryType=esriGeometryPoint`, `geometry=<lon>,<lat>`, `inSR=4326`, `spatialRel=esriSpatialRelIntersects`, `returnGeometry=false`, `outFields=*`, `f=json`. For production, request only needed fields and cache the source polygons, then evaluate intersections locally. A missing/failed feed must not be treated as a clean no-restriction result.
