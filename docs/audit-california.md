# Northern California and Sierra overnight-permission audit

Audit date: 2026-11-25. Coverage examined: Tahoe, Eldorado, Mendocino, Shasta-Trinity, Plumas, Sierra, Stanislaus and Lake Tahoe Basin Management Unit. Inyo/Mono is documented separately. This is an inventory of **spatial rule sources and unresolved geometry**, not a claim that every local rule is implemented.

## Method and result

The audit checked the official USFS ArcGIS Online organisation (`gGHDlz6USftL5Pau`), searches for each forest with and without camping/closure terms, the public `USFSRegion05` catalogue, the agency ArcX EDW and FSGISX02 regional service directories, forest GIS pages and current forest alert indexes. Relevant order pages, associated PDFs and ArcGIS metadata are retained in ignored `research/audit-california/`.

**No complete, current machine-readable camping-permission or camping-exclusion layer was found for these eight forests in the inspected public services.** That finding must not become “no restrictions.” There are current signed local orders with map exhibits which still need faithful geometry extraction/digitization and validation. The application cannot responsibly mark all remaining forest roads as overnight-allowed until those spatial gaps are resolved.

Public service searches are reproducible in `search-*.json`, `forest-all-*.json`, `r05-owner.json`, `edw.json`, `fsgisx02-r05.json` and the forest `gis-*-links.json` snapshots. A zero search result means “not found in this bounded search,” not proof that an agency has no internal dataset.

## Shared machine-readable sources and their actual meanings

| Source and identifier | Fields / publisher information | Relevant limits |
| --- | --- | --- |
| [USFS MVUM roads](https://apps.fs.usda.gov/ArcX/rest/services/EDW/EDW_MVUM_01/MapServer/1), service `EDW_MVUM_01`, layer 1 | `objectid`, `id`, `name`, `mvum_symbol_name`, `forestname`, `districtname`, `passengervehicle`, `passengervehicle_datesopen`, `highclearancevehicle`, `operationalmaintlevel`, `surfacetype`, `seasonal`. The [official transportation catalogue](https://data.fs.usda.gov/geodata/edw/datasets.php?dsetCategory=transportation) reports refresh dates and warns that some forests are missing. | Vehicle-use geometry and season, **not** universal parking or sleeping permission. Inspected national schema has no local camping-corridor designation field. Legal `passengervehicle=open` can coexist with maintenance level “2 - HIGH CLEARANCE VEHICLES”; do not confuse legal access with sedan suitability. |
| [Developed sites](https://apps.fs.usda.gov/ArcX/rest/services/EDW/EDW_DevelopedSite_01/MapServer), `EDW_DevelopedSite_01` | Official developed-site reference data; inspect individual sublayer schema before use. | Useful for finding recreation sites and contextual exclusions. A one-mile buffer around a **site centroid** is not a faithful implementation of a one-mile buffer around the full developed-site boundary. |
| [Basic ownership](https://apps.fs.usda.gov/ArcX/rest/services/EDW/EDW_BasicOwnership_01/MapServer), `EDW_BasicOwnership_01` / `_02`; [surface ownership](https://apps.fs.usda.gov/ArcX/rest/services/EDW/EDW_SurfaceOwnership_01/MapServer) | Official national land-status sources in the EDW directory. | Distinguish actual federal ownership from administrative forest envelopes and private inholdings. Neither ownership layer is a camping permit. |
| [NFG ELMER online view](https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/NFG_ELMER_Online_View/FeatureServer), ArcGIS item `4fe828f4f4e647389594e2fbbcc718eb`, owner `NFGMobile_Publisher` | Layer 6 `Forest_Closure_Line`; layer 7 `Forest_Closure_Area`. Fields: `line_name`/`area_name`, `order_num`, `order_num_fk`, `rev_date`, `data_source`, `accuracy`, edit dates. Data edit timestamp inspected: 2026-11-25. | **California coverage gap:** regional bbox query returned zero records and area-layer extent starts around 116.86°W. It cannot supply restrictions for the forests in this audit. Order numbers also require their underlying order details; an area polygon alone does not establish which activity is prohibited. |
| [FSGISX02 Region 5 directory](https://apps.fs.usda.gov/fsgisx02/rest/services/r05) | Inspected services: `R05_RNA_01`, `R05_RNAforDashboard_01`, `r05_SNV_ACCEL_01`. | No regional camping/forest-order service appears in the inspected directory. |

## Per-forest findings

### Tahoe National Forest — local exclusion geometry unresolved

The current public source [Order 17-25-05](https://www.fs.usda.gov/r05/tahoe/alerts/camping-and-campfire-restrictions-truckee-and-sierraville-districts) prohibits camping, including on roads/trails, inside mapped Truckee/Sierraville Restricted Use Areas, with specific exemptions. Signed order effective **2025-07-01 to 2028-06-30**; the page's start-date field differs by one day, so use the signed text. The associated [order/maps PDF](https://www.fs.usda.gov/sites/nfs/files/r05/tahoe/publication/alerts/17-25-05%20East%20Side%20Camping%20and%20Campfire%20Restrictions%20Order.pdf) and page map images are the spatial evidence. Trail-corridor camping exemptions do not authorize driving to those corridors.

[Order 17-25-01](https://www.fs.usda.gov/r05/tahoe/alerts/highway-20-area-camping-restrictions), effective **2025-05-02 to 2028-05-02**, identifies different half-mile/quarter-mile buffers on sections of Highway 20 and Conservation Camp Road. The [signed map/order PDF](https://www.fs.usda.gov/sites/nfs/files/r05/tahoe/publication/alerts/17-25-01%20Hwy%2020%20Camping%20Prohibition%20Order.pdf) is suitable for controlled spatial reconstruction using the named route sections, mileposts and NFS ownership. Applying one uniform Highway 20 buffer would be wrong.

Additional current sources include [parking order 17-26-06](https://www.fs.usda.gov/r05/tahoe/alerts/parking-restrictions), **2026-04-09 to 2028-04-09**, and [occupancy order 17-26-05](https://www.fs.usda.gov/r05/tahoe/alerts/14-day-camping-occupancy-restrictions-0), **2026-04-05 to 2028-04-05**. Parking signs are not supplied as a complete point layer. No official public feature layer representing the camping polygons/corridors above was found in the inspected USFS organisation or regional services. Multiple current timber/fire area closures remain an additional layer of work; see `alerts-tahoe-links.json`.

### Eldorado — road-season designation available; overnight exclusions incomplete

The [travel-management designation](https://www.fs.usda.gov/r05/eldorado/alerts/travel-management-designation), page updated **2026-02-24**, describes designated motor access and an annual January–March closure on native-surface roads/trails, subject to extensions. MVUM route geometry is available nationally, but the camping permission must remain separate. [Order 03-25-08](https://www.fs.usda.gov/r05/eldorado/alerts/camping-occupancy-restrictions), **2025-10-17 to 2028-10-16**, establishes district annual camping limits; it is not a map of every permitted roadside space.

The alert index includes local road closures and wilderness restrictions. Some still-listed alerts are expired, including Silver Bear 03-25-01 (**ended 2026-06-15**) and Mokelumne 03-23-10 (**ended 2026-05-31**); they must not be promoted into live prohibitions without a replacement order. No complete current motorized dispersed-camping corridor/overnight-exclusion feature layer was found. [GIS page](https://www.fs.usda.gov/r05/eldorado/data-tools/gis) leads to general national data, not a local overnight layer.

### Mendocino — a significant computable rule needs full site geometries

[Order 08-25-16](https://www.fs.usda.gov/r05/mendocino/alerts/dispersed-camping-stay-limits), signed effective **2025-10-07 to 2027-10-08**, prohibits camping within **one mile of a Developed Recreation Site**. It also limits occupancy within the same one-mile-radius location. [Signed order](https://www.fs.usda.gov/sites/nfs/files/r05/mendocino/publication/alerts/FO%2008-25-16%20Mendocino%20NF%20Dispersed%20Camping%20Stay%20Limits%20%28MG%29.pdf).

This is spatially actionable once the complete developed-site footprints are verified. Buffering only selected campground pins would miss picnic areas/trailheads and could understate the exclusion. No published compiled one-mile no-camping polygon layer was found in the inspected official catalogue. Current M10/16N21/22N11 and other road closures also require dated route overlays; their links are retained in the alert inventory. [GIS page](https://www.fs.usda.gov/r05/mendocino/data-tools/gis) links national clearinghouse/extract tools.

### Shasta-Trinity — multiple specific map orders, including car-overnight parking

The audit found several current local orders that an all-green forest layer would miss:

| Rule | Validity | Required spatial representation |
| --- | --- | --- |
| [Upper Ski Bowl 14-26-09](https://www.fs.usda.gov/r05/shasta-trinity/alerts/upper-ski-bowl-parking-restriction-order) | 2026-08-29 to 2028-08-29 | Exact Upper Ski Bowl parking-lot footprint; parking prohibited daily **00:00–06:00**. This directly affects sleeping in the car. Signed order and separate map attached. |
| [Mt. Shasta Plantation 14-26-06](https://www.fs.usda.gov/r05/shasta-trinity/alerts/mount-shasta-plantation-area-camping-and-fire-restrictions-0) | 2026-07-29 to 2027-07-29 | Camping-exclusion boundary described with PLSS section lines and a map; developed recreation sites are excepted. |
| [McCloud River Loop 14-25-23](https://www.fs.usda.gov/r05/shasta-trinity/alerts/mccloud-river-loop-dispersed-camping-restriction) | 2025-09-30 to 2027-09-30 | Area boundary follows Highway 89, PLSS lines, river and forest boundary; overnight camping outside designated developed campgrounds prohibited. Explicitly supersedes 14-24-02. |
| [Stay limits 14-25-24](https://www.fs.usda.gov/r05/shasta-trinity/alerts/forest-wide-camping-stay-limits-order) | 2025-09-30 to 2027-09-30 | Separate **seven-day annual-limit areas** in Exhibits B/C, with different general limits elsewhere. A stay-limit polygon must not be mistaken for a no-camping polygon. |

The signed PDFs and separate maps are indexed in `restriction-order-index.json`; no matching public current rule feature service was found. The official [GIS page](https://www.fs.usda.gov/r05/shasta-trinity/data-tools/gis) links national datasets. Official `USFSRegion05` SFSW “Day Use Only,” recreation footprints and improvements datasets found in ArcGIS are **planning alternatives/proposals**, not automatically operative restrictions; reject them as current permission evidence unless linked to a final decision.

### Plumas — occupancy rule and specific closures, no complete roadside layer found

[Order 05-11-25-01](https://www.fs.usda.gov/r05/plumas/alerts/plumas-national-forest-camping-stay-and-occupancy-limits), **2025-06-24 to 2027-04-30**, limits camping and campsite party/vehicle counts. It does not identify legal roadside pullouts. The current alert index additionally lists Rogers Cow Camp closure; campground closure status must outrank a static location pin. [GIS page](https://www.fs.usda.gov/r05/plumas/data-tools/gis) redirects users to national clearinghouse/extract sources. No official public compiled camping exclusions or permitted roadside corridors were found. The absence of such a layer is unresolved coverage.

### Sierra — supersession and expired alerts prevent simple scraping-as-truth

[Order 05-15-00-25-20](https://www.fs.usda.gov/r05/sierra/alerts/occupancy-limitations), **2025-12-18 to 2027-12-18**, limits camping and vehicle parking by ranger district. It does not grant overnight permission to road pixels. The [current alert index](https://www.fs.usda.gov/r05/sierra/alerts) includes repeated reopenings and replacements of developed-site/road/trail closure lists.

For example, the Ross Crossing reopening order 05-15-00-26-07 still appears on the index but **expired 2026-09-23**; it also superseded 26-06. A system must follow the latest valid closure list, not indefinitely retain either version. [GIS page](https://www.fs.usda.gov/r05/sierra/data-tools/gis) points to general data, not an exhaustive camping layer. No official public all-current overnight exclusions/corridors service was found.

### Stanislaus — signed lake restriction; roadside-parking wording needs care

[Order STF-16-2025-01](https://www.fs.usda.gov/r05/stanislaus/alerts/cherry-lake-camping-restrictions), **2025-01-27 to 2026-12-31**, provides Cherry Lake camping restriction geometry in a signed PDF. [Occupancy order STF-16-2026-09](https://www.fs.usda.gov/r05/stanislaus/alerts/forest-order-limiting-occupancy-and-use-remains-effect), **2026-07-31 to 2029-07-30**, provides separate stay limits. These are different rule types.

The [May 2024 dispersed-camping guide](https://www.fs.usda.gov/sites/nfs/files/r05/stanislaus/publication/dispersed%20campping%20ROG.pdf) says to park within one vehicle length and **walk into camp**. That text should not be silently converted into an exact roadside car-sleeping authorization. It separately notes some SNO-Parks allow vehicle overnighting with a pass, requiring per-facility verification. No complete public current overnight-permission/exclusion feature service was found; the modern generic GIS page URL returned 404 in this audit. Current road closures remain separate from camping limits.

### Lake Tahoe Basin — a restrictive default with narrow mapped exceptions

[Order 19-24-05](https://www.fs.usda.gov/r05/laketahoebasin/alerts/camping-overnight-stay-restriction), signed effective **2024-06-28 to 2027-12-01**, restricts overnight occupancy to Exhibit A places and durations. The page explicitly treats vehicle overnighting as dispersed camping. The current [signed order](https://www.fs.usda.gov/sites/nfs/files/r05/laketahoebasin/publication/alerts/19-24-05%20Camping%20Forest%20Order_1.pdf) and [map](https://www.fs.usda.gov/sites/nfs/files/r05/laketahoebasin/publication/alerts/19-24-05%20Camping%20Forest%20Order%20Map_0.pdf) are the operative spatial sources.

Exemptions include a **300-foot McKinney–Rubicon Springs Road corridor** along a specifically described segment, with quarter-mile exclusions around facilities, plus nonmotorized trail corridors. Those exemptions do not authorize vehicle access on hiking trails. This could be implemented as a restrictive NFS-ownership default with carefully validated exception geometry; a campground-only exception list would be incomplete. No published official compiled exception feature layer was found.

Official USFS ArcGIS “Lake Tahoe West online Map” item `59c1cdf7fa034673aa5582d0068cf113` ([FeatureServer](https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/Lake_Tahoe_West_online_Map_WFL1/FeatureServer)) contains project recreation/road/ownership/wilderness layers, but **not the current signed overnight-rule polygons**. “Camping_Permitted” and “Camping_Prohibited” services found under `ChrisBTRTA` belong to a trail organisation, not the official USFS organisation; they were not adopted as agency permission. The modern generic LTBMU GIS page returned 404.

## Integration consequences

A coverage registry should track, per managing unit and rule family: source publication date; operative start/end dates; superseded order; scope (overnight, parking, motor access, fire only); complete/incomplete geometry; and the last successful refresh. Missing geometry blocks positive automated permission for affected areas; it need not hide map exploration or already verified exact facilities.

The priority extraction queue is Tahoe's restricted-use and Highway 20 maps, Mendocino's developed-site exclusion, Shasta's four mapped rules above, Stanislaus Cherry Lake and the Basin's default/exception model. Every extraction needs independent point tests on both sides of boundaries and in holes/excepted areas. Fire-only restrictions must never become blanket no-camping polygons. Conversely, road-access layers must never be displayed as overnight permissions.

This audit identifies genuine unresolved regional coverage; it does **not** certify the whole western United States or these eight forests as comprehensively validated.

## Georeferenced official PDF extraction check

The bounded audit downloaded the current signed/map PDFs and inspected page dictionaries with `pypdf` for `/VP`, `/Measure`, `/GPTS` and `/LPTS`. This identifies an actionable spatial source even where no public feature layer was found; it does **not** extract the colored restriction geometry or equate the rectangular map extent with the restriction. Main-map and inset viewports must be distinguished. Independent geometry validation is still required.

| Current official map | Georeferenced pages (one-based) |
| --- | --- |
| [Upper Ski Bowl Parking Restriction Order Map](https://www.fs.usda.gov/sites/nfs/files/r05/shasta-trinity/publication/alerts/14-26-09%20Upper%20Ski%20Bowl%20Parking%20Restriction%20Exhibit%20A%20Map.pdf) | 1 |
| [Mount Shasta Plantation Area Restrictions Map](https://www.fs.usda.gov/sites/nfs/files/r05/shasta-trinity/publication/alerts/14-26-06%20Mt.%20Shasta%20Plantation%20Area%20Camping%20and%20Fire%20Restrictions%20Map.pdf) | 1 |
| [McCloud River Loop Restriction Map](https://www.fs.usda.gov/sites/nfs/files/r05/shasta-trinity/publication/alerts/14-25-23%20McCloud%20River%20Loop%20Dispersed%20Camping%20Restriction%20Map.pdf) | 1 |
| [Forest Order and Maps PDF](https://www.fs.usda.gov/sites/nfs/files/r05/tahoe/publication/alerts/17-25-05%20East%20Side%20Camping%20and%20Campfire%20Restrictions%20Order.pdf) | 6, 7, 8, 9, 10, 11 |
| [17-25-01 Highway 20 Camping Prohibition](https://www.fs.usda.gov/sites/nfs/files/r05/tahoe/publication/alerts/17-25-01%20Hwy%2020%20Camping%20Prohibition%20Order.pdf) | 2 |
| [19-24-05 Camping Restrictions Forest Order Map](https://www.fs.usda.gov/sites/nfs/files/r05/laketahoebasin/publication/alerts/19-24-05%20Camping%20Forest%20Order%20Map_0.pdf) | 1 |

The inspected Stanislaus Cherry Lake signed PDF had no geospatial viewport. A separate usable map may still exist; this is not proof that the order has no spatial source. Inspection results and downloaded provenance are cached locally in ignored `research/audit-california/pdf-geometry-audit.json`.
