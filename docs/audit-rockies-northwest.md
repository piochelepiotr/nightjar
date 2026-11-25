# Rocky Mountains and Northwest source audit

Research date: 2026-11-25. This is a bounded source audit, not a statement that every forest or parcel has been researched. Priority was Colorado through Denver. Wyoming, Montana, Idaho and the Northwest remain incompletely audited.

## Main finding

A national forest ownership polygon plus a motor-vehicle road is insufficient to establish a legal sleeping location. Colorado has many current corridor bans and designated-site-only orders missing from the national recreation point inventory. The official Crested Butte designated roadside sites are a particularly clear inventory gap. Keep unresearched local restrictions visibly unknown; no returned order is not evidence of permission.

## Official machine-readable sources inspected

All URLs below were retrieved; metadata and search responses are cached in ignored `research/audit-rockies/`.

### Leadville/Salida camping restriction polygons

[USFSRegion02 item b4d3f8a8404d4a7fb8ec0e34b861a532](https://www.arcgis.com/home/item.html?id=b4d3f8a8404d4a7fb8ec0e34b861a532), [FeatureServer](https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/UFC_Leadville_Salida_Camping_Restrictions/FeatureServer).

| Layer | Geometry and semantics | Important limit |
|---|---|---|
| 0 UFC_Salida_CampingRestrictions | Polygon; `AreaName`, `Type`. South Cottonwood Creek: quarter-mile road corridor; Chalk Creek: half-mile corridor; O'Haver: quarter-mile lake/campground buffer. | The attributes describe restriction geography, not the complete operative text. |
| 1 UFC_Leadville_ClosedEntry | Polygon; Twin Lakes recreation closed-entry area. | Distinguish entry closure from camping-only prohibition. |
| 2 UFC_Leadville_CampRegulations | Polygon; Turquoise and Twin Lakes recreation parking/camping regulation areas. | `Restrictions on Parking and Camping` is not a machine-readable unconditional camping ban. |

The service's data/schema edit timestamp is **2022-11-07**. Descriptions link an older Urban Front Country order (`fseprd644152`) and Exhibits Q/R. The current signed order and 2026 camping management implementation must be reconciled before these geometries can produce definitive current decisions. Leadville/Salida web map item `7db8bd28fa18441ba8c3f7f9698cf48c` and CR240 service item `11c0f5f0224148399a80cf39529ef1ac` are additional leads. These are local coverage only.

### R06 fire/area closure GIS

[Official item 35b11d7829c94594a788e79d1cc327ff](https://www.arcgis.com/home/item.html?id=35b11d7829c94594a788e79d1cc327ff), [FeatureServer](https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/R06_FireClosureOrders_PublicView/FeatureServer).

Layers 0/1/2 are point, line and polygon closures. Each has `ForestUnit`, `District`, `FireName`, `ClosureOrderName`, `ClosureOrderNumber`, `ClosureDescription`, `ClosureStatus`, `ClosureStartDate`, `ClosureEndDate`, `ClosureURLlink`, `GlobalID`. Layer 1 adds route fields. Read signed order URLs, filter dates/status, and classify actual prohibited conduct. A fire restriction is not inherently a camping ban. The layer title does not establish completeness of permanent occupancy orders.

### No comparable R01/R02 regional typed order feed verified

Inspected the full official ArcGIS organization `gGHDlz6USftL5Pau` service directory (3,166 services), ArcGIS searches under `USFSRegion02`, and Forest Service `fsgisx01`/`fsgisx02` regional folders. The x01 regional folders require a token; x02 R02 has no listed services and R01 listed a fire occurrence/perimeter map. This search did **not** verify an all-forest R01/R02 public typed order feed. Do not present Colorado, Wyoming or Montana as complete just because the R03/R04/R06 adapters exist.

### Attractive but unsuitable sources

* `DispersedCampsiteInformation`, item `15a7754067ca49d7a7009988a5529a13`: point attributes are approximate counts of surrounding mapped campsites (e.g. 209, 265, 380). These are **not individual legal sites**. Last edit 2021-12-16.
* `Dispersed_Camping_Management_Public_Feedback` is public project feedback, not an operative camping authorization.
* `Dispersed_Campsites_Proposed_Actions`, item `c21985549b2b489f911aa160a90ede35`: alternatives/proposed management, not implemented permission.
* `Existing_Day_Use_Recreation_Sites_Campgrounds_and_MVUM_Dispersed_Camp_Sites`, item `00ed92cd5c5d47d1a77ba1bf770db203`, contains day-use sites, campground points and MVUM line allowances for a **Granite Goose project area**, with proposed-action context. Not a regional current camping database.
* `BRF_BaseData_ClosureAreas_VIEW_Public`, item `0be4af39ab5f44bfb38a67740e4e2927`: project units/status notes without a signed-order field. Not a verified regional camping closure feed.
* `ForestOrderClick`, item `3cbb63db168a4f9e9a35658406b980ed`: R03 disclaimer polygons saying some orders are not displayed. Not order geometries.
* Recreation shooting closures and fire restriction stage layers must not automatically become red sleeping prohibitions.

## Colorado local orders that must precede green roadside recommendations

### Crested Butte / Gunnison

[Current official designated camping explanation](https://www.fs.usda.gov/r02/gmug/recreation/designated-camping-crested-butte), updated March 12, 2026, explicitly describes vehicle-accessible sites outside developed campgrounds. Posted site numbers identify the permitted positions; the surrounding drainage is not open unrestricted roadside camping. Roads include Slate River, Washington Gulch, Gothic, Brush Creek, Cement Creek and Kebler/Irwin. First-come, first-served, maximum 14 days; no potable water/trash service; vehicle suitability varies.

[GMUG-2022-10 operative order](https://www.fs.usda.gov/r02/gmug/alerts/crested-butte-area-camping-and-fire-prohibitions), June 14, 2022–June 30, 2027, limits camping in its described area to the three named campgrounds or numbered Forest Service designated sites. The exhibit boundary is essential; do not apply this to the entire forest.

The agency's [Slate River site-group GeoPDF](https://www.fs.usda.gov/media/65319) is dated April 4, 2024. It contains embedded `/VP` georeferencing in NAD83/UTM13N and depicts **site groups**, not every individual parking pad: SR1–3, SR4–5, SR6–10, SR11–12, SR13–17, SR18–19, MC1–17 and Poverty Gulch groups. Its raw PDF and rendered image are cached. Georeferencing could support an agency-derived group layer with an explicit accuracy radius; do not label those group symbols as exact individual sites. A sample of the national EDW recreation layer did not include these designated roadside groups.

### White River / I-70 / Glenwood Springs

[2026-13 camping location order](https://www.fs.usda.gov/r02/whiteriver/alerts/white-river-national-forest-camp-location-restrictions), effective July 1, 2026–December 31, 2028: camping within 100 feet of water, wetlands **or a National Forest System trail** is prohibited except at developed recreation sites or designated dispersed sites. This needs mapped hydrography/trails and exception sites, not just a forest-wide text warning.

[Eagle-Holy Cross 2025-09](https://www.fs.usda.gov/r02/whiteriver/alerts/eagle-holy-cross-ranger-district-occupancy-and-use), effective January 1, 2025–December 31, 2027, includes quarter-mile restrictions around Deep Lake campground/day-use, Grizzly Creek trailhead, several campgrounds and specified road corridors. Some Homestake/Piney exceptions are designated-site only. Read the exhibits and route mile limits before spatializing.

[Sopris 2025-08](https://www.fs.usda.gov/r02/whiteriver/alerts/sopris-ranger-district-occupancy-and-use-prohibitions), effective September 1, 2025–December 31, 2028: restricted areas include Frying Pan County Road 4 corridor, specified Highway 133 reaches, FSR310, campground buffers, Sunlight resort permit area and Babbish Gulch trailhead buffer. Each described area's extent matters.

[Fourmile Road winter gate change](https://www.fs.usda.gov/r02/whiteriver/alerts/fourmile-road-winter-gate-closure-black-hills-williams-peak-parking), November 20, 2026–May 20, 2027: NFSR300 winter gate is now at mile 2.7, Black Hills/William's Peak parking. Snowmobile access beyond a gate is not car access.

[White River stay order WRNF-2024-01](https://www.fs.usda.gov/sites/nfs/files/r02/whiteriver/publication/alerts/2024-01%20Stay%20limit.pdf) is effective through December 31, 2027: maximum 14 days in a continuous 30-day period forest-wide. [Forest camping guidance](https://www.fs.usda.gov/r02/whiteriver/recreation/camping-cabins) adds already-impacted sites within 300 feet of the road centerline and a 20-mile relocation after 14 days. Label the distinction between the signed prohibition and guidance.

### Denver / Front Range

[Winiger Ridge](https://www.fs.usda.gov/r02/arp/recreation/winiger-ridge), updated September 23, 2026, explicitly allows overnight use only at designated first-come sites accessed by seasonal NFSR359, with high clearance recommended. EDW misclassifies its primary activity as `Intermediate Parent Group`; an activity-only dispersed-site harvest misses it. The agency's modern area/entrance coordinate is 39.949348,-105.371605; EDW's older area marker is 39.961039,-105.396742. Neither is an exact numbered pad.

[ARP-BRD-2023-02](https://www.fs.usda.gov/sites/nfs/files/r02/arp/publication/alerts/WR68JDesignatedDispersedCampingOrder.pdf), May 12, 2023–May 12, 2028, restricts the described Gross/Winiger area to posted designated sites and posted parking instructions. Its referenced old campsite PDF now returns 404. [Current road table](https://www.fs.usda.gov/r02/arp/conditions) was updated November 2, 2026 and lists Winiger OPEN; MVUM route359.1 and spurs publish May15–November30. Preserve the status date: it is not a live gate sensor.

[Denver Water's official Winiger section](https://www.denverwater.org/recreation/gross-resevoir) gives no fee/no reservations, 14 consecutive days and 28 in60, and warns sites27–31 may be temporarily affected by blasting. The same page distinguishes Denver Water day-use parking, which is sunrise–sunset only. Its typical mid-November seasonal-access wording is less precise than the MVUM's November30 date; show this limitation.

[Jeffco regulations](https://www.jeffco.us/1583/Regulations) prohibit overnight camping vehicles except permitted designated camping; its [camping permits](https://www.jeffco.us/1512/Permits-Reservations) are tent-only and explicitly exclude vehicles/RVs. Do not turn those permitted tent sites or their parking lots into car-sleeping candidates.

### BLM Colorado River Valley

The [December 19, 2024 final supplementary rule](https://downloads.regulations.gov/BLM_FRDOC_0001-0192/content.pdf) has a designated-campsites/developed-campgrounds-only table covering local areas including Prince Creek's quarter-mile road corridor, North Hardscrabble's 300-foot corridor, Glenwood Canyon/Horseshoe, Red Hill, South Canyon and Sutey Ranch. Appendix A maps are a spatialization lead. Apply the actual described areas rather than marking the entire field office forbidden or allowed. The separate campfire table is not itself a camping ban.

## Coverage contract

Persist source retrieval timestamp separately from publisher edit date, order effective dates and the latest verified operating status. A verified area can contain legal numbered positions and illegal unnumbered pullouts. A point inventory can represent an entrance, a drainage, a trailhead or a count centroid. Those scopes must be stored explicitly. Current signed orders and closure tables override older inventory descriptions, while uncertain geography must remain unknown rather than green.
