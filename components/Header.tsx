import React from 'react';
import { Sparkles, HeartHandshake } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
            <HeartHandshake size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              Inclusive AI Campaign Starter
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Advocacy for access, fairness, and literacy in education
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 flex items-center gap-1">
          <Sparkles size={14} />
          <span>Powered by Gemini</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
