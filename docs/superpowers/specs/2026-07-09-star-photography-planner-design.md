# Star Photography Planner Design

## Summary

Build a responsive web app that recommends the best dates and places for star photography worldwide. The service uses moon conditions, weather, dark-sky quality, night length, and optional Milky Way visibility to answer planning questions such as:

> In April 2026, when and where should I go in New Zealand to photograph stars?

The first version should prioritize product structure and recommendation quality over final visual styling. Detailed visual design, palette, spacing, and component polish will be handled in a later design pass.

## Product Direction

The app should feel like an interactive globe-based observatory, not a form-driven travel search page. The 3D Earth is the main canvas on the first screen. Users can either type a natural-language prompt or explore directly by moving the globe.

Both interaction modes update the same recommendation state:

- Typing "April 2026 New Zealand star photography" moves the globe to New Zealand and evaluates candidate dates and locations.
- Rotating, zooming, or tapping the globe updates the selected region and refreshes recommendations.
- Scrubbing dates changes the highlighted places and score layers on the globe.
- Toggling layers shows moon impact, cloud risk, dark-sky quality, and Milky Way suitability.

The product should support both planning and execution:

- For future trips beyond reliable forecast windows, recommendations use moon calculations, astronomical darkness, seasonal climate, light pollution, and candidate site quality.
- For near-term trips, recommendations also use current weather forecasts and show higher-confidence execution guidance.

## MVP Scope

The MVP is a responsive web app. It supports desktop planning and mobile checking, but native mobile apps are out of scope.

The app should cover the world without scanning every coordinate globally. It uses a hybrid candidate model:

- A curated database of known or likely astrophotography destinations.
- Limited grid scanning around a user-selected or searched region.
- Ranking across places and dates within the requested travel window.

The MVP must answer the representative query:

> 2026년 4월 뉴질랜드에서 별 사진을 찍으려면 언제 어디가 좋아?

The result should include:

- Recommended date windows.
- Recommended locations.
- Overall score.
- Factor scores.
- Explanation of why the recommendation is good.
- Risks and caveats.
- Confidence level.

## Core User Experience

The first screen is a full globe canvas with lightweight overlays:

- Prompt input at the top or as a floating command surface.
- Recommendation summary card that appears after a prompt or region selection.
- Date scrubber for evaluating nearby nights.
- Layer controls for moon, weather, dark sky, and Milky Way suitability.
- Highlighted candidate zones and selected locations on the globe.

The globe remains interactive while results are visible. The recommendation UI must not turn the globe into passive decoration.

## Architecture

The system is split into five modules.

### Globe Experience

Renders the 3D Earth and all spatial interaction. It owns:

- Three.js globe scene.
- Camera movement and region focus.
- Candidate pins and highlighted zones.
- Data layers for moon impact, cloud risk, dark-sky quality, and Milky Way suitability.
- Date scrubber interaction.

### Intent and Region Resolver

Turns natural language and direct globe selections into a normalized recommendation request.

Inputs can include:

- Region, country, city, landmark, or selected globe area.
- Travel month, date range, or specific night.
- Photography target, such as general stars or Milky Way.
- Optional movement radius.

MVP implementation can begin with rules plus geocoding. LLM-based parsing can be added later if needed.

### Candidate Location Engine

Builds the list of places to evaluate.

It first checks the curated astrophotography candidate database. If the user selects an arbitrary region, it performs a limited local grid scan around that area. This avoids expensive global weather API scans while preserving the feeling of worldwide coverage.

### Sky and Weather Scoring Engine

Computes date and place scores from astronomical, weather, dark-sky, and confidence inputs.

The scoring engine must expose factor scores, not only a single ranking. This makes recommendations explainable and debuggable.

### Data Provider Layer

Wraps external and computed data sources.

Expected provider categories:

- Astronomical calculations for moon phase, moonrise, moonset, astronomical twilight, and Milky Way visibility.
- Weather forecast APIs for near-term cloud, precipitation, humidity, and visibility.
- Climate or historical weather data for future planning outside reliable forecast windows.
- Light pollution data from static or periodically refreshed datasets.
- Geocoding and place lookup.

This layer owns caching, rate limiting, retry behavior, and provider-specific normalization.

## Data Flow

1. User enters a prompt, moves the globe, taps a region, or adjusts dates.
2. The app creates a normalized recommendation request.
3. The candidate engine selects known locations and optionally scans a limited grid near the chosen region.
4. The data provider layer gathers astronomy, weather, climate, and light pollution inputs.
5. The scoring engine ranks each location-night pair.
6. The UI updates the globe highlights, layers, recommendation card, and date scrubber from the same result state.

## Recommendation Model

The MVP scoring formula is:

`shooting suitability = moon score + weather score + dark-sky score + night-window score + Milky Way bonus - risk penalties`

### Moon Score

Measures how favorable the moon is for dark-sky photography.

Inputs:

- Moon phase.
- Moon illumination.
- Moonrise and moonset times.
- Whether moonlight overlaps the useful dark window.

### Weather Score

Measures whether the sky is likely to be usable.

Inputs:

- Cloud cover.
- Precipitation.
- Humidity.
- Visibility.

Near-term recommendations use forecast data. Future planning recommendations use climate or historical patterns and must show lower confidence.

### Dark-Sky Score

Measures ambient sky darkness.

Inputs:

- Light pollution estimate.
- Distance from major cities.
- Site elevation when available.

Low-resolution data must be marked as an estimate.

### Night-Window Score

Measures whether there is enough true darkness.

Inputs:

- Astronomical twilight times.
- Length of the dark window.
- Local season and latitude.

### Milky Way Bonus

Adds value when the Milky Way core or desired galactic feature is visible during the useful dark window.

The app should still support general star photography when Milky Way conditions are weak.

### Confidence

Confidence is separate from suitability. A night can have high theoretical suitability but low confidence if weather is based only on climate statistics.

Confidence levels:

- High: near-term forecast available and fresh.
- Medium: forecast available but farther out or partially uncertain.
- Low: planning recommendation based on astronomy, climate, and static data.

## Failure Handling

The app should degrade gracefully.

- If weather forecast data is unavailable, use climate or historical weather fallback and show lower confidence.
- If light pollution data is coarse, show the dark-sky score as an estimate.
- If a geocoding query is ambiguous, ask the user to choose among likely regions.
- If API limits are reached, use cached data and clearly mark stale or fallback results.
- If the scoring engine has insufficient data for a candidate, exclude that candidate or rank it with a visible data-quality warning.

The app must avoid presenting long-range weather as certain. Future travel planning should be described as probability-based guidance.

## API and Data Cost Strategy

The product should not perform unrestricted global grid scans through live weather APIs. That would create cost, latency, and rate-limit risk.

Instead:

- Use a curated candidate database for common astrophotography destinations.
- Run limited grid scans only around the searched or selected region.
- Cache provider results by location, time window, and data type.
- Prefer computed astronomy data where possible because it is stable and inexpensive.
- Use static or periodically refreshed light pollution data rather than per-request API calls.
- Separate near-term forecast requests from long-range planning requests.

Provider choices can be finalized during implementation, but the architecture must keep providers swappable.

## Testing Strategy

### Astronomy Tests

Verify moon phase, moonrise, moonset, and astronomical twilight calculations across time zones, hemispheres, and high-latitude edge cases.

### Scoring Tests

Use fixture locations and dates to prove that:

- Better moon conditions improve ranking.
- Poor cloud or precipitation conditions lower ranking.
- Darker locations outrank light-polluted locations when other factors are similar.
- Confidence changes correctly between forecast-backed and climate-backed recommendations.

### UI State Tests

Verify that prompt input, globe selection, date scrubbing, and layer toggles update the same recommendation state.

### Provider Tests

Mock weather, geocoding, and light pollution providers to test retries, caching, API failure, stale data, and fallback paths.

## Out of Scope for MVP

- Final visual design system.
- Native mobile app.
- User accounts.
- Trip itinerary booking.
- Social sharing.
- Advanced route planning.
- Guaranteed cloud-free predictions.

## Open Implementation Decisions

These should be decided during implementation planning:

- Exact frontend framework.
- Exact astronomy library.
- Weather and climate provider selection.
- Initial curated destination dataset format.
- Whether the first build uses a backend API, serverless functions, or a local prototype API.

## Approval Status

Approved decisions:

- Use a 3D globe-first interface.
- Support both prompt input and direct globe exploration as equal interaction modes.
- Use a hybrid worldwide coverage model: curated candidate database plus limited local grid scans.
- Support both planning and near-term execution workflows.
- Score by moon, weather, dark-sky quality, night window, Milky Way bonus, risk, and confidence.
- Defer detailed visual design until after product structure and recommendation behavior are specified.
