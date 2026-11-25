# Ten-place research and map audit — November 25, 2026

**The earlier website did not pass this audit.** The baseline browser output is
preserved in [qa-baseline.json](qa-baseline.json). It recommended closed rest
facilities, missed useful agency-listed vehicle-camping areas and ranked primitive
records without establishing car access. It also silently offered stops beyond a
30-mile discovery radius.

The revised map separates reviewed area references from exact rest facilities,
excludes known closures from recommendations, keeps unknown records on the map,
and uses a 30-mile straight-line discovery radius in Explore. This is not road
distance or a driving-detour claim. Campgrounds remain off by default.

| Destination | Research finding and revised map behavior | Remaining accuracy gap |
| --- | --- | --- |
| Yosemite / El Portal | No fully verified primary found in this bounded audit. No invented green forest-road suggestion. McCabe Flat offered only as campground backup; compatible drive-up sites require reservation. | Nearby forest-road pullouts/current November access not resolved. Yosemite vehicle sleeping limited to a registered compatible campsite; Camp 4 vehicle sleeping prohibited. |
| Mono Lake / Lee Vining | 01N11 east-side forest-road scouting corridor appears with local exclusion checks, stay limits, 200-foot water setback and existing-road requirement. Crestview is closed and excluded. West canyon and LADWP samples remain prohibited. | A road vertex is not a parking pad. High-clearance maintenance and unconfirmed winter conditions prevent an exact ordinary-car recommendation. |
| Truckee / Donner | Open eastbound and westbound Donner Summit rest facilities appear first, with eight-hour-per-24-hour rest limit, camping prohibition and direction-specific access. | No live parking-bay occupancy. Forest restrictions are not comprehensively digitized. |
| Redding / Shasta | Closed O’Brien is excluded. Open Herbert S. Miles and Lakehead appear with eight-hour rest rules and source freshness. Other open facilities within the radius may also appear. | Straight-line proximity is not highway route convenience. No live parking occupancy. |
| Moab | Dubinky Well Road marked primitive-site corridor appears before campgrounds. Brown-post/tent-symbol sites only; waste containment, stay/move rules summarized. | Access reference is not an individual legal campsite. Camping-zone vector coverage and current road conditions incomplete. |
| Flagstaff | Cinder Hills appears despite its OHV marker category. Official motorized camping use, FR776 status, stay limit and rough-surface uncertainty summarized. | Broad recreation-area marker, not an exact car pad. Loose cinders are not suitable for every car. West Sedona's separate eight designated areas are also included near Sedona, not misrepresented as a nearby Flagstaff exact spot. |
| Las Vegas | Jean/Roach Dry Lakes appears with existing-road restriction outside the lakebed, stay limit and warning against driving on wet lakebed. | Broad area reference; current ground conditions unknown. Official Las Vegas Valley closure raster not yet fully converted into reviewed vector geometry. |
| Denver / Front Range | Winiger Ridge appears inside 30 miles despite its source activity category. Numbered sites only, high-clearance recommendation, FCFS/no vacancy feed and conflicting November access sources are explicit. | Current gate status is unresolved; not an available-tonight promise. West Magnolia/Gordon Gulch are outside this radius. |
| Glenwood Springs | No fully verified primary established. Generic BLM primitive pins are not promoted as the best car-sleeping option. Thompson Creek is a campground backup only. White River summaries now include current trail/water setbacks and Fourmile winter gate. | Exact primary candidate coverage remains inadequate. Corridor restrictions need additional reviewed geometry. |
| Crested Butte | Slate River Musicians Camp MC1–17 designated roadside group appears with numbered-only rule, 14-day limit, approximate group-marker scope, winter-access uncertainty and sources. Horse Ranch is a secondary seasonal candidate. | Group marker has approximately 200 m accuracy, not pad precision. Current snow/gate status and individual site occupancy unknown. |

## Evidence and independent expected behavior

The research preserves coordinates, source IDs, rule summaries, rejected
alternatives, source URLs and access qualifications:

* [Four California cases](qa-california-10places.md), [case data](../data/qa/california-cases.json)
* [Three Southwest cases](qa-southwest-10places.md), [case data](../data/qa/southwest-cases.json)
* [Three Colorado cases](qa-rockies-10places.md), [case data](../data/qa/rockies-cases.json)

Broader source discovery is recorded in [California](audit-california.md),
[Southwest](audit-southwest.md), and [Rockies/Northwest](audit-rockies-northwest.md).
Those are source/coverage audits, not claims that all local rules are implemented.

## Source freshness

Caltrans QuickMap is now collected through a validated adapter using stable SRRA
numbers. The feed repeats two identical placemarks; identical duplicates are
collapsed, conflicting states fail validation. Invalid or partial downloads never
replace the last successful snapshot. Original KML is content-hashed and archived.

The GitHub Pages workflow requests a new snapshot on each deployment and on an
hourly schedule. GitHub's scheduler can delay runs. A current-open claim expires
after two hours relative to both retrieval and publisher timestamps; stale open
facilities become unknown rather than continuing as current recommendations.
Known closed records remain visible as last-reported closures. Other regions do
not yet have this automated operating-status coverage.

The prototype does **not** have a hosted PostGIS backend, comprehensive municipal
parking coverage, an exhaustive inventory of signed roadside pads, or live FCFS
occupancy. The proposed production architecture is in [ARCHITECTURE.md](ARCHITECTURE.md).

## Browser verification

Chrome MCP checks center the actual map on each of the ten destinations, inspect
the rendered recommendations and open the leading result to verify the displayed
summary and source links. [Local browser observations](qa-local-browser.json)
preserve those readings. A deployment verification record is added after release.

This establishes that the researched findings are represented in the interface.
It does **not** establish complete permission coverage or prove that the best
possible overnight stop has been discovered at every destination. Two destinations
still have explicit primary-option gaps, and most forest candidates remain area
references with unresolved current access.
