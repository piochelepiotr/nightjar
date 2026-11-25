# Independent Southwest cases for the ten-place acceptance test

Research date: November25,2026. Machine-readable expectations: `data/qa/southwest-cases.json`. Website checks remain assigned to the parent QA run; this research does not claim Chrome verification.

| Destination | Preferred non-campground candidate | Strength and practical limit |
|---|---|---|
| Moab | Brown-post designated primitive sites along DubinkyWellRoad | BLM explicitly confirms the corridor's designated-only camping rule. Official map identifies primitive sites as free. USU reference coordinate is road access, not a camping pad; no validated per-site GIS found. |
| Flagstaff/Sedona | CinderHills nearFlagstaff; eight designated WestSedona areas forSedona | Both official positive recreation records were missed by a camping-marker-only harvest. Current roads open. Area reference points must remain area references; local bans and exceptions are essential. |
| LasVegas | BLMJean/RoachDryLakes | Explicit official dispersedcamping activity, coordinates and14daylimit, about26misouthofVegas. Broad recreationarea point; exactpad availability and dryground unknown. |

The test should reject nearby illegal alternatives: river-left MoabDaily outside developedcampgrounds; arbitraryWestSedona/Flagstaff roadside pullouts in orderpolygons; VegasValleyBLM campingclosure and arbitraryRedRockroadsidecamping. Actual official GIS polygons are cached for Arizona; Moab/Vegas currently have authoritative map boundaries requiring reviewed conversion before a polygon decision is justified.

Source and geometry inventory, precise semantics, effective dates, gaps and sourceURLs are documented in `docs/audit-southwest.md`. The source-derived cases deliberately distinguish an exactfacility, designated-site system, and an area/corridor where a legal site must be selected. They must not be rendered as if the reference coordinate itself were a surveyed permissible parking spot.

Important regression checks: a14daystaycap is not a fullcampingban; fire-only restrictions are not campingbans; known named-site exceptions override a broader campingprohibition for that site's campingact; an open road provesaccess, not campingpermission. PumphouseEDW contains conflicting open/season metadata and must not be silently resolved. R03 itself warns someorders are notdisplayed.
