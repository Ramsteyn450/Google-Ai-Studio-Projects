
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Calculator, Settings, BarChart3, Menu, X, Info } from 'lucide-react';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import ResultsPage from './pages/ResultsPage';
import AdminPage from './pages/AdminPage';
import { PredictionResult } from './types';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Predict', path: '/predict', icon: Calculator },
    { name: 'Admin', path: '/admin', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-emerald-500 rounded-lg group-hover:bg-emerald-600 transition-colors">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">EstateIntelligence <span className="text-emerald-500">AI</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-slate-600 hover:text-emerald-500 hover:bg-slate-50'
                }`}
              >
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-b border-slate-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <div className="flex items-center space-x-2">
                    <link.icon size={20} />
                    <span>{link.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const App: React.FC = () => {
  const [lastResult, setLastResult] = useState<PredictionResult | null>(null);

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<PredictPage onResult={setLastResult} />} />
            <Route path="/results" element={<ResultsPage result={lastResult} />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="text-emerald-500 w-6 h-6" />
                  <span className="text-lg font-bold">EstateIntelligence AI</span>
                </div>
                <p className="text-slate-500 text-sm">
                  Leveraging cutting-edge Machine Learning and Google Gemini AI to provide accurate, data-driven real estate valuations.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h4 className="font-semibold text-slate-800">Quick Links</h4>
                <Link to="/" className="text-slate-500 hover:text-emerald-500 transition-colors">Home</Link>
                <Link to="/predict" className="text-slate-500 hover:text-emerald-500 transition-colors">Predict Value</Link>
                <Link to="/admin" className="text-slate-500 hover:text-emerald-500 transition-colors">Admin Console</Link>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-4">Market Compliance</h4>
                <div className="flex items-start space-x-2 text-xs text-slate-400">
                  <Info size={14} className="mt-0.5 flex-shrink-0" />
                  <p>All predictions are estimates based on historical data. Market fluctuations and local developments may impact final valuation.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
              © {new Date().getFullYear()} EstateIntelligence AI. Developed by Senior Full-Stack AI Engineer.
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
