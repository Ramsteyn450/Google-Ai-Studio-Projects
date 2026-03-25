
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Activity, Shield, ArrowRight, Home, MapPin, TrendingUp, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

const HomePage: React.FC = () => {
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current, {
      useCORS: true,
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = 'EstateIntelligence-Home.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col overflow-hidden" ref={exportRef}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 bg-white overflow-hidden">
        {/* Export Button */}
        <button 
          onClick={handleExport}
          className="fixed bottom-8 right-8 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center space-x-2 group"
          title="Export as Presentation Image"
        >
          <Download size={20} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap px-0 group-hover:px-2 font-bold text-xs uppercase tracking-widest">
            Export as Image
          </span>
        </button>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern House" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-emerald-100 shadow-sm">
                <Activity size={14} className="mr-2 animate-pulse" /> AI-Powered Real Estate Intelligence
              </div>
              <h1 className="text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
                Predicting <br />
                <span className="text-emerald-500">The Future</span> <br />
                Of Property.
              </h1>
              <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-medium">
                Professional-grade house price prediction platform using advanced machine learning to estimate real estate value with 94%+ confidence.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/predict"
                  className="px-10 py-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 flex items-center transition-all hover:scale-105 active:scale-95 group"
                >
                  Get Started <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                <div className="flex -space-x-4 items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i}`} 
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                      alt="User"
                    />
                  ))}
                  <div className="pl-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Used by 1,200+ Agents
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white p-6 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 transform rotate-3 hover:rotate-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Modern Architecture" 
                  className="w-full h-[500px] object-cover rounded-[2.5rem] mb-8"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -left-10 bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl max-w-xs transform -rotate-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Accuracy</p>
                      <p className="text-2xl font-black">94.2%</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Our model uses iterative SGD to converge on the most accurate market value for any property.
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full -z-10 blur-3xl opacity-50" />
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
