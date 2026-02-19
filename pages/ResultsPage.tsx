
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, ArrowLeft, Download, Share2, 
  ShieldCheck, Info, Gauge, Zap, BarChart3, Landmark, 
  Code, Cpu, Calculator, MinusCircle, PlusCircle
} from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultsPageProps {
  result: PredictionResult | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result }) => {
  const navigate = useNavigate();
  const [animatedPrice, setAnimatedPrice] = useState(0);

  useEffect(() => {
    if (!result) {
      navigate('/predict');
      return;
    }

    const duration = 1500;
    const steps = 60;
    const increment = result.predicted_price_in_inr / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= result.predicted_price_in_inr) {
        setAnimatedPrice(result.predicted_price_in_inr);
        clearInterval(timer);
      } else {
        setAnimatedPrice(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result, navigate]);

  if (!result) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/predict')}
        className="flex items-center text-slate-500 hover:text-emerald-600 font-bold mb-8 transition-colors text-xs uppercase tracking-widest group"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Estimator
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="bg-slate-900 p-16 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 block mb-6 relative z-10">Fair Market Value Estimate</span>
              <div className="text-6xl md:text-8xl font-black tracking-tighter relative z-10">
                {formatCurrency(animatedPrice)}
              </div>
              <div className="mt-8 inline-flex items-center px-6 py-2 bg-emerald-500/10 rounded-full text-xs font-bold border border-emerald-500/20 relative z-10 text-emerald-400">
                <ShieldCheck size={16} className="mr-2" /> Linear Regression v1.1 Active
              </div>
            </div>

            <div className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border-b border-slate-50 pb-12">
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-2">Conservative Floor</p>
                  <p className="text-3xl font-black text-slate-700">{formatCurrency(result.min_estimate_in_inr)}</p>
                  <p className="text-[10px] text-slate-400 mt-2 italic">*Based on 95% Confidence Interval</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-3xl text-right">
                  <p className="text-[10px] uppercase font-black text-emerald-600 tracking-wider mb-2">Optimistic Ceiling</p>
                  <p className="text-3xl font-black text-emerald-800">{formatCurrency(result.max_estimate_in_inr)}</p>
                  <p className="text-[10px] text-emerald-600/60 mt-2 italic">*Potential peak value in high-demand cycles</p>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h4 className="text-slate-900 text-xl font-black flex items-center mb-6">
                    <Zap size={24} className="mr-3 text-emerald-500" /> AI Market Perspective
                  </h4>
                  <div className="p-8 bg-slate-900 text-emerald-50 rounded-[2rem] border border-slate-800 italic leading-relaxed text-lg shadow-inner">
                    "{result.market_analysis}"
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-slate-900 font-bold flex items-center">
                      <BarChart3 size={20} className="mr-2 text-blue-500" /> Locality Insights
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      {result.pincode_trends} The model weighted connectivity (bus/rail/school) as a key coefficient, indicating a strong correlation between infrastructure and asset liquidity in your sector.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-slate-900 font-bold flex items-center">
                      <Calculator size={20} className="mr-2 text-emerald-500" /> Linear Model Info
                    </h4>
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-emerald-700 font-medium">Model Type:</span>
                        <span className="font-mono font-bold">OLS Regression</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-emerald-700 font-medium">R-Squared:</span>
                        <span className="font-mono font-bold">{result.metrics_summary.r2_score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700 font-medium">Convergence:</span>
                        <span className="font-mono font-bold">100 Iterations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Equations Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200"
          >
            <h4 className="text-slate-800 font-black mb-6 flex items-center uppercase tracking-widest text-xs">
              <Code size={16} className="mr-2" /> Mathematical Breakdown (Linear Regression)
            </h4>
            <div className="font-mono text-[11px] md:text-xs text-slate-600 bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <div className="mb-4 text-emerald-600 font-bold">
                Prediction (y) = β₀ + (β₁ × Size) + (β₂ × BHK) + (β₃ × Age) + (β₄ × Parking) + (β₅ × Infrastructure)
              </div>
              <div className="space-y-1 opacity-70">
                <div>β₀ (Bias/Base Value) = {formatCurrency(result.weights?.bias || 0)}</div>
                <div>β₁ (Size Weight) = {formatCurrency(result.weights?.size || 0)} / sqft</div>
                <div>β₂ (Bedrooms Weight) = {formatCurrency(result.weights?.bedrooms || 0)} / unit</div>
                <div>β₃ (Age Coefficient) = {formatCurrency(result.weights?.age || 0)} / year</div>
                <div>β₄ (Parking Premium) = {formatCurrency(result.weights?.parking || 0)}</div>
                <div>β₅ (Connectivity) = {formatCurrency(result.weights?.connectivity || 0)} / KM</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center">
              <Gauge size={18} className="mr-2 text-emerald-500" /> Investment Grade
            </h4>
            <div className="relative h-4 bg-slate-100 rounded-full mb-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${result.investment_score}%` }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-4xl font-black text-slate-800">{result.investment_score}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">High Potential</span>
            </div>
          </div>

          <button className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all flex items-center justify-center group">
            <Download size={18} className="mr-2 group-hover:translate-y-0.5 transition-transform" /> Export Appraisal PDF
          </button>
          
          <button className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
            <Share2 size={18} className="mr-2" /> Share Result
          </button>

          <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
            <div className="flex items-start space-x-3">
              <Info size={16} className="text-blue-500 mt-0.5" />
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                Our Linear Regression model uses an Ordinary Least Squares (OLS) approach optimized via Stochastic Gradient Descent to ensure weights reflect current locality trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
