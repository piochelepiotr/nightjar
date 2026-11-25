# First-version verification

Verified 2026-11-25 against the local preview and the published GitHub Pages site, using Chrome MCP.

- Production URL: https://piochelepiotr.github.io/nightjar/ returns HTTP 200; GitHub Actions deployment succeeds.
- Public build loads 8,451 source records and 15 forest-policy summaries without a backend connection or ChatGPT hosting. Asset URLs work below the `/nightjar/` project path.
- Live browser CORS requests successfully load USFS roads (341 segments in the inspected Truckee center cell; 292 in the inspected Eldorado cell), ownership, and forest-specific policy summaries. A selected Eldorado road resolves to USDA Forest Service land and displays the one-vehicle-length, 100-foot water setback, and ten-day annual district limit.
- Yosemite inspection classifies roadside / parking vehicle sleeping as prohibited and links the National Park Service policy.
- Parking discovery successfully loads 143 community records in the inspected Truckee 0.1° center cell using the listed VK Maps Overpass mirror. The main Overpass endpoint was failing. Source timestamps, OSM tags and object URLs remain attached; unknown permission is not promoted to allowed.
- San Francisco–Denver routing succeeds: approximately 1,254 miles / 21.6 hours in the tested route response. This is a source observation, not a current travel-time or closure guarantee.
- Direct browser Recreation.gov availability succeeds on GitHub Pages. Upper Pines (232447), arrival December 1, 2026 for two nights: the observed result was 19 sites available for the complete stay, among 236 sites examined. This is historical QA evidence; the live result may change.
- Save/read-back behavior and source links were exercised. Sources are escaped before rendering. Local backend CORS allows the GitHub Pages origin; invalid dates return HTTP 400.
- Mobile 390×844 viewport has no horizontal overflow; the roadside summary is accessible in the bottom panel. The latest production build produced no console warnings/errors during the checked flows.
- Automated tests cover same-site multi-night availability across a month boundary, walk-up versus reservable inventory, parking-tag uncertainty, closure precedence, coordinate/date validation, persistent-cache reuse, concurrent request deduplication, and refusal of stale availability after failure.

## Verification limits

Chrome MCP's Offline emulation did not actually block a cache-busting network request during this session, so a fully disconnected browser run is **not** claimed. App-shell precaching and provider Cache Storage were inspected; cache behavior is covered by automated tests. The app refuses availability when the browser reports offline.

This is a first version, not exhaustive legal clearance. Forest exclusion/camping-corridor geometries and live closure coverage remain incomplete. Those exact roadside verdicts are explicitly unknown. Store-specific car-sleeping permissions and municipal restrictions are not comprehensively ingested. Reviewed policies and source snapshots do not establish that a location is open tonight.
