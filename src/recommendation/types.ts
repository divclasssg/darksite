export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type DateRange = {
  start: string;
  end: string;
};

export type RecommendationTarget = "stars" | "milky-way";

export type RecommendationRequest = {
  prompt: string;
  region: string;
  dateRange: DateRange;
  target: RecommendationTarget;
  center?: GeoPoint;
};

export type CandidateLocation = {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: GeoPoint;
  elevationMeters: number;
  bortleClass: number;
  distanceFromCityKm: number;
};

export type MoonCondition = {
  phase: string;
  illuminationPercent: number;
  moonrise: string | null;
  moonset: string | null;
  isBelowHorizonDuringCoreWindow: boolean;
};

export type WeatherCondition = {
  cloudCoverPercent: number;
  precipitationProbabilityPercent: number;
  humidityPercent: number;
  visibilityKm: number;
};

export type DataMode = "fixture" | "calculated" | "live" | "mixed";

export type NightCondition = {
  locationId: string;
  date: string;
  astronomicalDusk: string | null;
  astronomicalDawn: string | null;
  moon: MoonCondition;
  weather: WeatherCondition;
  dataMode: DataMode;
};

export type ScoreBreakdown = {
  moon: number;
  weather: number;
  darkness: number;
  nightWindow: number;
  milkyWayBonus: number;
  riskPenalty: number;
  total: number;
  confidence: number;
};

export type RecommendationResult = {
  id: string;
  date: string;
  location: CandidateLocation;
  score: ScoreBreakdown;
  reasons: string[];
  risks: string[];
  dataMode: DataMode;
};

export type RecommendationStatus = "idle" | "loading" | "ready" | "unsupported" | "error";

export type LayerKey = "moon" | "weather" | "darkSky";

export type RecommendationState = {
  status: RecommendationStatus;
  request: RecommendationRequest | null;
  selectedDate: string;
  selectedLocationId: string | null;
  candidates: CandidateLocation[];
  conditions: NightCondition[];
  results: RecommendationResult[];
  activeLayers: Record<LayerKey, boolean>;
  message: string | null;
};
