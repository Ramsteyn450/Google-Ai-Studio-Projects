
from fastapi import FastAPI, HTTPException, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import SGDRegressor
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from datetime import datetime
from typing import Optional

app = FastAPI(title="EstateIntelligence AI Engine")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "valuation_model.pkl"

class HouseFeatures(BaseModel):
    house_size_sqft: float = Field(..., gt=0)
    pincode: str
    bedrooms: int
    floors: int
    house_age_years: float
    parking: str # 'yes' or 'no'
    bus_km: float
    railway_km: float
    school_km: float
    owner_name: Optional[str] = "Owner"

def generate_synthetic_data(samples=1000):
    """Generates a realistic dataset for training if none exists."""
    np.random.seed(42)
    data = {
        'house_size_sqft': np.random.randint(500, 5000, samples),
        'pincode': np.random.choice(['560001', '560037', '110001', '400001', '600001'], samples),
        'bedrooms': np.random.randint(1, 6, samples),
        'floors': np.random.randint(1, 4, samples),
        'house_age_years': np.random.randint(0, 30, samples),
        'parking': np.random.choice(['yes', 'no'], samples),
        'bus_km': np.random.uniform(0.1, 5.0, samples),
        'railway_km': np.random.uniform(0.5, 15.0, samples),
        'school_km': np.random.uniform(0.2, 3.0, samples)
    }
    df = pd.DataFrame(data)
    # Price logic: Base 4000/sqft + 200k/bedroom - 50k/year_age + 150k if parking
    df['price'] = (df['house_size_sqft'] * 4000) + (df['bedrooms'] * 200000) - \
                  (df['house_age_years'] * 50000) + (df['parking'] == 'yes') * 150000 + \
                  np.random.normal(0, 100000, samples)
    return df

def train_model(df: pd.DataFrame):
    X = df.drop('price', axis=1)
    y = df['price']

    numeric_features = ['house_size_sqft', 'bedrooms', 'floors', 'house_age_years', 'bus_km', 'railway_km', 'school_km']
    categorical_features = ['parking', 'pincode']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ]
    )

    # Use SGDRegressor for iterative Linear Regression (max_iter=100 as requested)
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', SGDRegressor(max_iter=100, tol=1e-3, random_state=42))
    ])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    pipeline.fit(X_train, y_train)

    # Calculate Metrics
    y_pred = pipeline.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    # Save to file
    joblib.dump(pipeline, MODEL_PATH)
    
    return {
        "mse": float(mse),
        "rmse": float(rmse),
        "r2_score": float(r2),
        "timestamp": datetime.now().isoformat(),
        "samples": len(df)
    }

@app.on_event("startup")
def startup():
    if not os.path.exists(MODEL_PATH):
        df = generate_synthetic_data()
        train_model(df)

@app.get("/health")
def health():
    return {"status": "operational", "model_ready": os.path.exists(MODEL_PATH)}

@app.post("/predict")
async def predict(features: HouseFeatures):
    if not os.path.exists(MODEL_PATH):
        raise HTTPException(status_code=500, detail="Model is not trained.")
    
    try:
        model = joblib.load(MODEL_PATH)
        # Convert Pydantic to DataFrame
        input_data = pd.DataFrame([features.dict()])
        prediction = model.predict(input_data)[0]
        
        # Ensure price is not negative
        prediction = max(0, prediction)
        
        # Basic Confidence Range (95% CI approximation)
        std_error = 250000 # Average deviation in simple models
        
        return {
            "predicted_price_in_inr": round(prediction),
            "min_estimate_in_inr": round(max(0, prediction - std_error)),
            "max_estimate_in_inr": round(prediction + std_error),
            "model_version": "v1.1-iterative-lr",
            "metrics_summary": {
                "method": "SGD Linear Regression",
                "iterations": 100
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/train")
async def retrain(file: Optional[UploadFile] = File(None)):
    if file:
        try:
            df = pd.read_csv(file.file)
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid CSV file.")
    else:
        df = generate_synthetic_data()
    
    metrics = train_model(df)
    return {"message": "Model retraining complete", "metrics": metrics}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
