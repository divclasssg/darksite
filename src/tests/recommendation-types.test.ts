import {
  type CandidateLocation,
  type DateRange,
  type GeoPoint,
  type LayerKey,
  type NightCondition,
  type RecommendationRequest,
  type RecommendationResult,
  type RecommendationState,
  type ScoreBreakdown
} from "@/recommendation/types";

const center = {
  latitude: -44.238,
  longitude: 170.099
} satisfies GeoPoint;

const dateRange = {
  start: "2026-04-01",
  end: "2026-04-30"
} satisfies DateRange;

const request = {
  prompt: "Find the best night for the Milky Way near Lake Tekapo",
  region: "Canterbury, New Zealand",
  dateRange,
  target: "milky-way",
  center
} satisfies RecommendationRequest;

const location = {
  id: "lake-tekapo",
  name: "Lake Tekapo",
  country: "New Zealand",
  region: "Canterbury",
  coordinates: center,
  elevationMeters: 710,
  bortleClass: 2,
  distanceFromCityKm: 3.8
} satisfies CandidateLocation;

const nightCondition = {
  locationId: location.id,
  date: "2026-04-17",
  astronomicalDusk: "2026-04-17T19:42:00.000Z",
  astronomicalDawn: "2026-04-18T05:18:00.000Z",
  moon: {
    phase: "Waxing Crescent",
    illuminationPercent: 18,
    moonrise: "2026-04-17T14:06:00.000Z",
    moonset: "2026-04-18T00:41:00.000Z",
    isBelowHorizonDuringCoreWindow: true
  },
  weather: {
    cloudCoverPercent: 12,
    precipitationProbabilityPercent: 4,
    humidityPercent: 39,
    visibilityKm: 32
  },
  dataMode: "fixture"
} satisfies NightCondition;

const score = {
  moon: 92,
  weather: 88,
  darkness: 95,
  nightWindow: 91,
  milkyWayBonus: 12,
  riskPenalty: -4,
  total: 96,
  confidence: 89
} satisfies ScoreBreakdown;

const result = {
  id: "lake-tekapo-2026-04-17",
  date: "2026-04-17",
  location,
  score,
  reasons: ["Low cloud cover", "Moon stays below horizon in the core window"],
  risks: ["Shorter usable window after astronomical dusk"],
  dataMode: "fixture"
} satisfies RecommendationResult;

const activeLayers = {
  moon: true,
  weather: false,
  darkSky: true
} satisfies Record<LayerKey, boolean>;

const state = {
  status: "ready",
  request,
  selectedDate: "2026-04-17",
  selectedLocationId: location.id,
  candidates: [location],
  conditions: [nightCondition],
  results: [result],
  activeLayers,
  message: null
} satisfies RecommendationState;

describe("recommendation domain types", () => {
  it("accepts representative request, result, and state objects", () => {
    expect(request.target).toBe("milky-way");
    expect(request.center).toEqual(center);
    expect(request.dateRange.start).toBe("2026-04-01");
    expect(location.coordinates.longitude).toBe(170.099);
    expect(nightCondition.moon.isBelowHorizonDuringCoreWindow).toBe(true);
    expect(nightCondition.weather.visibilityKm).toBe(32);
    expect(score.total).toBe(96);
    expect(result.reasons).toContain("Low cloud cover");
    expect(state.activeLayers.darkSky).toBe(true);
    expect(state.results[0].location.id).toBe("lake-tekapo");
  });
});
