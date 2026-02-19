
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Activity, RefreshCw, Upload, 
  Terminal, Server, Shield, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { TrainingStats } from '../types';

const AdminPage: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [logs, setLogs] = useState<string[]>(["[System] Admin session established.", "[Auth] JWT verified successfully."]);
  
  // Added weights property to match TrainingStats interface definition in types.ts
  const [stats, setStats] = useState<TrainingStats>({
    mse: 450230,
    rmse: 671,
    r2: 0.95,
    samples: 12540,
    lastTrained: new Date().toLocaleDateString(),
    weights: {
      bias: 1000000,
      size: 4500,
      bedrooms: 300000,
      age: -50000,
      parking: 150000,
      connectivity: -20000
    }
  });

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8));
  };

  const startTraining = async () => {
    setIsTraining(true);
    addLog("Training sequence initiated...");
    await new Promise(r => setTimeout(r, 1000));
    addLog("Preprocessing features: ColumnTransformer executing...");
    await new Promise(r => setTimeout(r, 1500));
    addLog("Fitting GradientBoostingRegressor (n_estimators=1000)...");
    await new Promise(r => setTimeout(r, 2000));
    addLog("Validation fold 5/5 complete.");
    
    setStats({
      ...stats,
      r2: parseFloat((0.95 + Math.random() * 0.02).toFixed(3)),
      lastTrained: new Date().toLocaleDateString()
    });
    
    addLog("Model training finished. Weights serialized to 'house_model_v2.pkl'.");
    setIsTraining(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Admin Console</h2>
        <p className="text-slate-500">Monitor model health and retraining pipelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Nodes", val: "4/4", icon: Server, color: "text-emerald-500" },
          { label: "Dataset Size", val: stats.samples.toLocaleString(), icon: Database, color: "text-blue-500" },
          { label: "Current R²", val: stats.r2.toString(), icon: Activity, color: "text-purple-500" },
          { label: "Last Train", val: stats.lastTrained, icon: RefreshCw, color: "text-amber-500" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
              <item.icon size={16} className={item.color} />
            </div>
            <div className="text-2xl font-bold text-slate-800">{item.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dataset Upload */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Upload size={20} className="mr-2 text-emerald-500" /> Update Dataset
            </h3>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50">
              <p className="text-slate-600 mb-4">Upload new CSV training data to improve accuracy.</p>
              <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">
                Choose CSV File
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-emerald-400 font-mono text-sm flex items-center">
                <Terminal size={16} className="mr-2" /> SYSTEM_LOGS
              </h3>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="font-mono text-sm space-y-2 min-h-[160px]">
              {logs.map((log, i) => (
                <div key={i} className="text-slate-400">
                  <span className="text-emerald-500/50 mr-2">$</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model Controls */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Model Control</h3>
            <button
              onClick={startTraining}
              disabled={isTraining}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center shadow-lg ${isTraining ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'}`}
            >
              {isTraining ? <RefreshCw className="animate-spin mr-2" /> : <Activity size={18} className="mr-2" />}
              {isTraining ? "Training Pipeline Active" : "Retrain Model Now"}
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-4 italic">
              Warning: Retraining will consume high GPU resources for ~5 minutes.
            </p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h4 className="text-emerald-800 font-bold mb-4 flex items-center text-sm">
              <Shield size={16} className="mr-2" /> Health Status
            </h4>
            <div className="space-y-3">
              <StatusItem label="API Endpoint" status="online" />
              <StatusItem label="Worker Pool" status="ready" />
              <StatusItem label="ML Inference" status="operational" />
              <StatusItem label="Storage" status="92% free" warning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ label, status, warning }: { label: string, status: string, warning?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-emerald-700/70 font-medium">{label}</span>
    <span className={`text-[10px] font-bold uppercase flex items-center ${warning ? 'text-amber-600' : 'text-emerald-600'}`}>
      {warning ? <AlertTriangle size={10} className="mr-1" /> : <CheckCircle2 size={10} className="mr-1" />}
      {status}
    </span>
  </div>
);

export default AdminPage;
