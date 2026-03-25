
export interface PredictionInput {
  house_size_sqft: number;
  pincode: string;
  bedrooms: number;
  floors: number;
  house_age_years: number;
  parking: 'yes' | 'no';
  owner_name: string;
  nearby_bus_stand_distance_km: number;
  nearby_railway_distance_km: number;
  nearby_school_distance_km: number;
  lat?: number;
  lng?: number;
  image?: File | null;
}

export interface PredictionResult {
  predicted_price_in_inr: number;
  min_estimate_in_inr: number;
  max_estimate_in_inr: number;
  model_version: string;
  confidence_score: number;
  metrics_summary: {
    mse: number;
    rmse: number;
    r2_score: number;
    iterations: number;
  };
  market_analysis: string;
  investment_score: number; // 1-100
  nearby_highlights: Array<{web: {uri: string, title: string}}>;
  pincode_trends: string;
  weights?: Record<string, number>;
  house_image_url?: string;
}

export interface TrainingStats {
  mse: number;
  rmse: number;
  r2: number;
  samples: number;
  lastTrained: string;
  weights: Record<string, number>;
}
