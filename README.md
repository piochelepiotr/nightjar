# Nightjar

A road-trip map for finding a place to sleep **in the car** across the western United States, including northern California / Yosemite, Nevada, Utah, Arizona, and Colorado through Denver.

Roadside dispersed camping, pullouts, rest areas, and parking are the primary use case. Campgrounds are an optional backup. It is an evidence explorer, not a comprehensive registry of legal sleeping spaces.

**Live map: https://piochelepiotr.github.io/nightjar/**

## Run locally

Requires Node 22 or later.

```sh
npm ci
npm run build
npm run dev
```

Open **http://127.0.0.1:8027**. No API keys are needed for the initial adapters. Local successful responses persist in `.cache/http/` across server restarts. Keep the Node server running while using the map.

```sh
npm test
npm run refresh-data  # slow, paginated official-source import; network required
npm run build         # rebuild after data or application changes
```

## First-version features

- Official USFS, BLM, Caltrans, WSDOT, and Recreation.gov catalog with original-source links, restrictions, fees, seasons, and fetch dates. Sources overlap; record counts are not counts of unique physical sleeping spots.
- Forest-road geometry with vehicle class and seasonal-access fields; click a road or arbitrary point to inspect official Forest Service land status and relevant forest policies.
- Fifteen researched forest-policy summaries, including Tahoe, Eldorado, Inyo, Mendocino, Stanislaus, Coconino, Uinta-Wasatch-Cache, and White River. Other forests explicitly remain unknown. Forest administration boundaries contain non-Forest-Service inholdings.
- Yosemite boundary with the official prohibition on sleeping in parking lots / roadsides; registered campsites are required, and Camp 4 does not permit sleeping in cars.
- Parking / Walmart discovery from OpenStreetMap in the map-center 0.1° cell. Enable parking research in Layers, zoom in, and load the area. No chain-wide overnight car-sleeping inference.
- Distinct conditional, unknown, forbidden/closed, and personally recorded permission states. A camping record is not proof of car access. Forbidden places appear as map context but are excluded from suggestions. Campgrounds are off by default.
- Search, location, driving routes, and stops within a route corridor. Corridor distance is approximate geographic distance to the route, not a driving detour or live closure check.
- Saved stops and permission notes on this device; JSON export. Personally recorded permission is current only on its stay date.
- Recreation.gov availability for the same campsite over every requested night, including month boundaries. Five-minute cache. Equipment/vehicle compatibility, minimum stays, and bookability still need confirmation. Walk-up does not mean vacant.
- Service worker saves the app and fetched same-origin evidence. An offline response is marked as saved data. Basemaps are not bulk downloaded; unvisited areas and current inventory require connectivity.

## Data and accuracy

Read [the research](docs/RESEARCH.md) before interpreting a map marker as overnight permission. The initial regional catalog and forest-policy review date are recorded in `data/manifest.json` and `data/forest-rules.json`. Fetch timestamps are observations of a publisher feed, not site inspections or a current closure clearance.

**Important gaps:** no complete ingestion of forest orders, municipal vehicle-habitation ordinances, local camping-corridor PDF geometries, current road conditions, or private-store permission database. An open road, public ownership, 24-hour opening hours, RV parking policy, or overnight vehicle-parking tag alone does not establish permission to sleep in a car. State/private campground inventory is not integrated. Forest policies can require map-specific corridors, exclusion checks, and ranger confirmation. These remain visible uncertainties.

Source datasets and site text remain attributed to their respective publishers. OSM candidates are © OpenStreetMap contributors, ODbL; they are not authoritative legal evidence. Basemaps are attributed on the map. The Recreation.gov website read endpoints are observed, undocumented interfaces and may change; failure is shown explicitly.

## Backend and caching

GitHub Pages is the primary host and runs source adapters in the browser, with persistent Cache Storage for provider responses. The included Node backend persists data to disk and can optionally provide availability where browser CORS prevents direct access. No external backend is configured on the public site. Cache reads preserve original timestamps, identical in-flight requests coalesce, and failed refreshes can fall back to marked stale location data. Availability refuses stale fallback.

| Data | Server cache |
| --- | --- |
| Regional catalog / researched policies | Versioned import bundled with the deployment; manual refresh |
| Ownership lookups | 24 hours |
| MVUM road center cells | 7 days |
| OSM parking center cells | 7 days |
| Geocoding / routes | 30 days |
| Recreation.gov monthly availability | 5 minutes; no stale response |

API endpoints: `/api/catalog`, `/api/forests`, `/api/place/:id`, `/api/inspect?point=lat,lon`, `/api/roads?point=lat,lon`, `/api/candidates?point=lat,lon`, `/api/geocode?q=...`, `/api/route?from=lat,lon&to=lat,lon`, `/api/availability?id=...&date=YYYY-MM-DD&nights=1`, `/api/health`.

Only fixed upstream providers are callable. Coordinates, dates, durations, and campground IDs are validated server-side. All source text is rendered as text, and outbound URLs are limited to HTTP(S).

## Deployment

GitHub Actions (`.github/workflows/pages.yml`) tests and publishes `dist/pages` to **https://piochelepiotr.github.io/nightjar/** on every push to `main`. Run `npm run build:pages` for the same static build locally. All files use relative paths for the project subdirectory. The public frontend does not call ChatGPT Sites.

The regional catalog, forest summaries, and map boundaries are bundled for a single cacheable initial download (approximately 18MB before HTTP compression). Road/ownership/parking/geocoding/routing adapters run directly against providers that support browser access. Their responses persist in browser Cache Storage, capped at 250 entries. Some providers may reject browser requests; that is shown as unavailable rather than fabricated permission or inventory.

**Recreation.gov availability has no guaranteed browser CORS support.** The backend implementation is included and tested locally; on GitHub Pages use the official booking link when direct access is blocked, or configure your own reachable HTTPS backend under Sources & rules. The app never uses an anonymous third-party CORS proxy. This first version does not include a separately hosted backend.
