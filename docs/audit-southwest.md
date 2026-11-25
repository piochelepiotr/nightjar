# Southwest local overnight-policy audit

Research checked 2026-11-25. This is an inventory of verified sources and explicit coverage gaps, not a claim that every local rule has been digitized.

## Implementable regional Forest Order GIS

| Region | Official hosted polygon layer | Scope |
|---|---|---|
| R03 | https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/r03_ForestOrder/FeatureServer/1 | Arizona and New Mexico Forest Orders |
| R04 | https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/R04_Forest_Orders_PUBLIC_VIEW/FeatureServer/0 | Intermountain forests, including Utah and Humboldt-Toiyabe |

Both services accept ArcGIS query with `f=geojson`, `outSR=4326`, `outFields=*`, `where`, pagination. Cache source geometry and original attributes. Essential fields: `objectid, forestname, unitid, ordername, ordernum, ordertype, description, exemption, cfr, temporaltype, signeddate, startdate, enddate, rescinddate, hyperlink, acres, rev_date, data_source, accuracy, forest_order, pub_date, statement`. Dates are epoch milliseconds. Use effective dates and rescission, not publication date, to decide whether an order currently applies. Preserve order numbers and source links.

R03 public provenance: official USFSRegion03 app https://usfs.maps.arcgis.com/apps/instant/basic/index.html?appid=e338ad662af14709a498c15aa28b27c7 , its webmap `95baf7a28d8a4a84a30c75c6738d2824`, uses this hosted service. The app states that the signed order is authoritative. Its layers distinguish Closure, Restriction/Prohibition, Fire Restriction, Large Area, and Future/Coming orders. The map includes a coverage-warning layer saying **Some Orders Not Displayed**, including Coconino. Absence of a polygon cannot establish permission. Service `/2` is ForestOrderNoData; `/3` ForestOrderClick. The actual public webmap also references a separate ForestOrderClick service.

Verified snapshots: R03 115 records, R04 235 records. Focused geometry snapshots contain 31 Coconino/Kaibab/Prescott polygons and 125 Utah/Humboldt-Toiyabe polygons. Source data edits occurred November 24–25, 2026. Saved under ignored `research/audit-southwest/` with schemas, attributes, focused GeoJSON, and public-app metadata.

**Classification must read the actual prohibition and exemptions.** R03 Coconino order 03-04-00-26-08 is categorized `Closure Order`, but only imposes a 14-in-30-day stay cap. It is not a no-camping order. R04 many rows have purpose-only descriptions, `cfr = See closure order`, `exemption = See closure order`. Name/category keyword matching alone cannot establish whether car sleeping is banned. Fire-only restrictions do not ban sleeping. Stock/wilderness restrictions may be irrelevant to roadside cars. Known named dispersed-site exceptions must survive a wider no-camping polygon.

## Arizona

### Coconino — verified local restrictions and positive exceptions

* 03-04-06-26-04, West Sedona, 2026-08-31–2028-08-31: camping prohibited except eight named designated dispersed areas. Official full text and map: https://www.fs.usda.gov/r03/coconino/alerts/west-sedona-camping-and-campfire-restrictions-0 . Polygon objectid 78594. Exceptions are Rockview, Angel Valley, Javelina, Surprise, Windmill, Cockscomb, Greasy Spoon, Nolan.
* Positive recreation evidence: https://www.fs.usda.gov/r03/coconino/recreation/west-sedona-designated-dispersed-camping-area . Free, first come first served; 14-day stay cap; no wood/charcoal fires, controllable LPG allowed. EDW recareaid **84034**, official area reference point **34.814265,-111.905162**; activity is null, so camping-activity-only harvest misses it. This coordinate is a reference point for a system of eight areas, not an individual parking pad. EDW says all eight areas open 24/7, no reservation.
* 03-04-06-23-03, Oak Creek/Sedona country: camping prohibition with developed-campground exceptions. Polygon objectid 75289, effective January 24, 2023 to January 24, 2033. Do not treat trailheads or roads anywhere within this forest as automatically available.
* 03-04-08-25-01, Flagstaff camping/campfire prohibition: objectid 75371, May 1, 2025–April 30, 2027, developed-campground exceptions.
* 03-04-08-25-02, Kachina/Pumphouse: objectid 75373, May 1, 2025–April 30, 2035, designated loops 1–4 are exceptions. Signed text: https://www.fs.usda.gov/sites/nfs/files/r03/coconino/publication/alerts/03-04-08-25-02%20Order%20Kachina-Pumphouse%20Camping%20and%20Campfire%20Prohibition.pdf . Pumphouse EDW81580 has passenger-car access and numbered sites, but an old October12 season-end field conflicts with open status; do not silently convert that ambiguous season to a definite closure or definite year-round opening.
* Cinder Hills EDW **70996**, **35.328054,-111.523053**, open, markeractivity `OHV Open Area Riding`, activity group `OHV Riding & Camping`. Live official page explicitly includes OHV Camping: https://www.fs.usda.gov/r03/coconino/recreation/cinder-hills-highway-vehicle-area . This is an area, not an exact pullout. Site no potable water, no glass; access FR776. It is omitted by the present camping-marker-only harvest.
* Current road access independent of camping policy: https://www.fs.usda.gov/r03/coconino/conditions/forest-roads-status , updated November23, 2026: FR776, FR237, FR525 from89A to152C open. Several nearby flood/seasonal roads closed. https://www.fs.usda.gov/r03/coconino/alerts/red-rock-ranger-district-affected-severe-flooding-many-closures-effect lists affected sites; West Sedona is not listed as closed and its site page says Open.
* Current forest stay cap official text: https://www.fs.usda.gov/r03/coconino/alerts/14-day-camping-limit-consecutive-30-day-period-0 . Fourteen days in any30days. Header end date says October26,2028 but actual implementation text says October29,2028; preserve discrepancy rather than inventing certainty.

Motorized camping corridors are explicitly drawn on the official MVUM / travel map. **An open road does not imply its adjoining land is a motorized camping corridor.** Travel-map rule allows vehicle camping within300ft only along designated segments, with additional restrictions. https://www.fs.usda.gov/sites/nfs/files/r03/coconino/publication/2025-travel-map.pdf ; https://www.fs.usda.gov/sites/nfs/files/r03/publication/mvum-coconino-front.pdf ; https://www.fs.usda.gov/sites/nfs/files/r03/publication/mvum-coconino-back.pdf . Precise camping-corridor linework was not found in a validated GIS service during this bounded audit; requires georeferenced-map extraction or management-agency GIS, not buffering all forest roads.

### Kaibab / Prescott

R03 supplies local polygons, including Kaibab White Sage/Dragon Bravo fire closure (03-07-03-26-03) and current14-in30 stay cap (03-07-26-01). Prescott contains Highway260/SaltMine camping closure (03-09-05-24-09), Perkinsville Bridge camping/road closure (03-09-01-25-10), equestrian-only GroomCreek order. Each needs the signed-order semantics and exceptions; no blanket positive permission follows from the forest perimeter.

## Utah

### Moab BLM — official nuanced zoning, PDF geometry gap

Current official sources: https://www.blm.gov/programs/recreation/recreation-activities/utah ; https://www.blm.gov/utah-canyon-country-do-moab-fo/guidebook/moab-field-office-visitor-guide ; https://www.blm.gov/sites/default/files/docs/2025-09/BLMUtahMoabVisitorMap-North_112124_508.pdf ; https://www.blm.gov/sites/default/files/docs/2025-09/BLMUtahMoabVisitorMap-South_112024_508.pdf . Current guide describes camping-management zones separately from land ownership. Do not encode a simple20mile-radius closure.

BLM explicitly permits primitive camping at **marked designated sites** along DubinkyWell, GeminiBridges, BlackRidge, PackCreek, MillCanyon/BlueHills, and PictureFrameArch areas. The older still-official georeferenced camping map https://www.blm.gov/sites/blm.gov/files/BLMUtahMoabCamping.pdf says sites are marked with brown posts/tent symbols, free, and portable toilets required unless a constructed toilet exists; vehicle/camping use stays within posted boundaries. Current guide requires human-waste carryout in GrandCounty. Fourteen-day stay at one location, then move30mi. Exact campsite coordinates are not published in the verified text; do not invent point pads. USU2025 institutional orientation guide provides DubinkyWell/SpringCanyon road access reference **38.628940,-109.801845**,21.6mi from town, https://www.usu.edu/ucc/files/2025/welcome-packets-and-gear-lists/2025-Moab-Housing-Resources.pdf ; this is a road reference, not a legal camp spot.

River-left MoabDaily ColoradoRiver corridor allows developed campgrounds only; river-right designated sites only between DeweyBridge and SaltWash. Arches/Canyonlands, state parks, private lands and UtahraptorStatePark are not interchangeable with BLM primitive camping. Older third-party points in land transferred to Utahraptor may now be paid state-park sites. Klondike2022 supplemental rule is authoritative for its area: https://www.blm.gov/press-release/bureau-land-management-opens-new-campground-and-finalizes-rules-klondike-bluffs-area .

Searches of ArcGIS returned no validated public Moab camping-zone feature layer. The official older MoabCamping PDF does contain geospatial `/VP /Measure /GPTS` metadata; it can support a properly reviewed GIS conversion. Current2024 visitor map is vector PDF without `/VP` georeference metadata in the downloaded file. Both saved. Oil/gas MoabMasterLeasingPlan CSU/NSO layers are unrelated and must not be used as camping restrictions.

### Southern and northern Utah USFS

R04 has precise polygons and signed PDF links for Dixie Dave'sHollow (0407-22-003), CedarCity/PineValley camping restrictions (0407-25-011), LeedsCreek (0407-26-006), EnterpriseReservoir (0407-26-005), district water-source camping restriction (0407-26-004); plus PineValley2026 area closures. These are distinct from forestwide occupancy caps (0407-25-001). Manti-LaSal0410-26-00-01 is a stay-limit rule, not blanket ban. Fishlake04-08-13-01 occupancy/use requires signed-order interpretation. UintaWasatchCache has101records including MirrorLakeHighway camping/vehicle order, AmericanFork/AlpineLoop, RockCanyon, CottonwoodCanyons, Farmingtonwintercamping etc. Do not display all as general no-camping without reading their scope.

SouthernUtah BLM Kanab, GrandStaircase, StGeorge and Monticello need separate local management-zone/permit ingestion. This audit verified no complete machine-readable camping permission dataset for those offices. Unknown must remain visible.

## Nevada

### Las Vegas positive area and local exclusions

Official BLM **Jean/RoachDryLakes**, **35.804889,-115.274255**, https://www.blm.gov/visit/jeanroach-dry-lakebed-special-recreation-management-area , explicitly offers DispersedCamping with14day limit, about26mi south of LasVegas. Official coordinate is a recreation-area reference; not an individual camping pad. Outside the lakebed use existing roads/trails. Lakebed can flood and retain water after rain; page advises against driving on it after precipitation. Site fee / ordinary camping permit not explicitly stated on this page; do not fabricate a fee or permit. https://www.blm.gov/southern-nevada-district-recreation gives14in28days and after that relocate outside25mi radius or nonBLM land for14days.

That district page publishes a **LasVegasValley camping-closure map** as raster image: https://www.blm.gov/sites/default/files/images/2024-02/Nevada_SNDO_In-Valley-Camping-Closure-Map.png . It is real published boundary evidence, not yet validated GIS geometry. Broad absence of a BLM order layer cannot make all valley BLM parcels green.

RedRockCanyonNCA is a separate restrictive area, with developed-campground and specific backcountry exceptions; a high-elevation hike-in exception is not permission to sleep in a roadside car. Official recreation rules: https://www.blm.gov/nevada/red-rock-canyon-nca/recreation ; supplemental regulations https://www.blm.gov/sites/blm.gov/files/documents/files/NV-LE-Supplemental-Regulations.pdf . Calico/ScenicDrive trailhead parking should not become green from public ownership. Need exact NCA boundary plus rule-specific exceptions before publishing a red polygon for its full extent.

### Humboldt-Toiyabe and municipal gaps

R04 has6Humboldt-Toiyabe records at snapshot: HooverWilderness foodstorage/use restrictions, SpringMountainsLeeMeadows04-17-25-10, SpringMountainsrepairclosures04-17-25-04, butterflycollection04-17-05-26-03, ElephantFire04-17-26-01-04. Descriptions are often purpose-only. A butterflycollection prohibition is not an area closure for sleeping. The region feed is not a complete verified inventory of every local roadside-camping rule.

Potential municipal dataset requiring verification: cityofReno owner `friedlandere_cityofreno`, ArcGISitem `c10622e9f5564f13a26dad9a66402e1a`, https://services5.arcgis.com/RjM4BJrv5ZkqP4XC/arcgis/rest/services/Truckee_River_Camping_Ordinance/FeatureServer . Not yet validated enough to ingest as a vehicle-sleeping prohibition. No statewide municipal parking/sleeping law polygon feed verified in this audit.

## Required coverage disclosure

Show three independent things: positive site/area permission; applicable mapped restrictions with summarized exceptions; and whether the local-rule layer is complete enough to decide. A public-land boundary, a road-open status, a recreation activity point, or absence of a mapped order individually cannot establish that every pullout or parking lot is legal for overnight car sleeping.
