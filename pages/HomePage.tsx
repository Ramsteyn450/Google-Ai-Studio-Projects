
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Activity, Shield, ArrowRight, Home, MapPin } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 lg:py-40 bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Activity size={14} className="mr-2" /> Iterative LR Engine v1.1
              </div>
              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                Data-Driven <br />
                <span className="text-emerald-500">Property</span> Valuations.
              </h1>
              <p className="text-lg text-slate-500 max-w-lg mb-12 leading-relaxed">
                Objective, AI-powered real estate appraisal using stochastic gradient descent and iterative linear models. Get professional insights into your home's worth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/predict"
                  className="px-8 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 flex items-center transition-all hover:scale-105"
                >
                  Start Valuation <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  to="/admin"
                  className="px-8 py-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center"
                >
                  Model Health
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <Home size={24} />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-black opacity-50">Market Index</p>
                      <p className="text-xl font-bold">+12.4%</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-2 bg-white/10 rounded-full w-full" />
                    <div className="h-2 bg-white/10 rounded-full w-3/4" />
                    <div className="h-2 bg-emerald-500 rounded-full w-1/2" />
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex items-center space-x-3 text-sm opacity-60">
                      <MapPin size={16} />
                      <span>Cluster Analysis Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Training Cycles", value: "100+", icon: Calculator },
              { label: "Accuracy Target", value: "92%", icon: Activity },
              { label: "Records Processed", value: "12k", icon: Shield }
            ].map((stat, i) => (
              <div key={i} className="text-center text-white">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
                  <stat.icon size={24} />
                </div>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
