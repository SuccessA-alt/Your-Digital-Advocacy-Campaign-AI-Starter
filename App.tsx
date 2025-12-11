import React, { useState } from 'react';
import Header from './components/Header';
import CampaignForm from './components/CampaignForm';
import CampaignResult from './components/CampaignResult';
import { generateCampaignStrategy } from './services/geminiService';
import { CampaignInput, LoadingState } from './types';
import { AlertCircle, ArrowRight, HeartHandshake, Sparkles, Megaphone, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<'PDF' | 'Word'>('PDF');

  const handleStart = () => {
    setHasStarted(true);
    // Smooth scroll to top when starting
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: CampaignInput) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setResult(null);

    try {
      const generatedText = await generateCampaignStrategy(data);
      setResult(generatedText);
      setLoadingState(LoadingState.SUCCESS);
      
      // Scroll to results on mobile
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error(err);
      setError("Something went wrong while connecting to the AI. Please check your connection and try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    if (downloadFormat === 'PDF') {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxLineWidth = pageWidth - (margin * 2);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      // Split text to fit width automatically
      const textLines = doc.splitTextToSize(result, maxLineWidth);
      
      let cursorY = 20;
      const lineHeight = 6;
      const pageHeight = doc.internal.pageSize.getHeight();
      
      doc.text("Inclusive AI Campaign Plan", margin, cursorY);
      cursorY += 10;
      
      for (let i = 0; i < textLines.length; i++) {
        // Check if we need a new page
        if (cursorY + lineHeight > pageHeight - margin) {
            doc.addPage();
            cursorY = 20;
        }
        doc.text(textLines[i], margin, cursorY);
        cursorY += lineHeight;
      }
      
      doc.save("inclusive-ai-campaign-plan.pdf");
    } else {
      // Word (.doc) - Simple text blob approach
      const blob = new Blob([result], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "inclusive-ai-campaign-plan.doc";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12 px-4 animate-fade-in">
      <div className="bg-brand-50 p-4 rounded-full mb-8 text-brand-600">
        <HeartHandshake size={48} />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
        Make Your Voice Heard on <span className="text-brand-600">AI in Education</span>
      </h1>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Whether you are a student, teacher or community organiser, you can help shape how AI is used in schools.
        <br className="hidden sm:block"/>
        This tool helps you create a simple, inclusive and realistic advocacy campaign in minutes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-brand-50 w-10 h-10 rounded-lg flex items-center justify-center text-brand-600 mb-4 mx-auto">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Identify the Issue</h3>
          <p className="text-sm text-slate-500">Spot gaps in access, bias or AI literacy in your school or community.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-brand-50 w-10 h-10 rounded-lg flex items-center justify-center text-brand-600 mb-4 mx-auto">
            <Megaphone size={20} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Plan Your Message</h3>
          <p className="text-sm text-slate-500">Set a clear change goal and get a platform-ready draft post.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-brand-50 w-10 h-10 rounded-lg flex items-center justify-center text-brand-600 mb-4 mx-auto">
            <HeartHandshake size={20} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Be Inclusive</h3>
          <p className="text-sm text-slate-500">Receive tips on accessibility, privacy and respectful tone.</p>
        </div>
      </div>

      <button 
        onClick={handleStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-brand-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600 hover:bg-brand-700 hover:shadow-lg hover:-translate-y-1"
      >
        Start Your Campaign
        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
      
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 max-w-lg mx-auto">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-bold text-slate-700 block mb-1">Privacy & AI Reminder:</span>
          This tool uses AI and can make mistakes. Please review and adapt the content for your context.
          <br className="mb-1"/>
          Don’t include real names of students or sensitive personal details – use general phrases like “a student in my class”.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <Header />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {!hasStarted ? (
          <WelcomeScreen />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <CampaignForm 
                onSubmit={handleFormSubmit} 
                isLoading={loadingState === LoadingState.LOADING} 
              />
              <button 
                onClick={() => setHasStarted(false)} 
                className="mt-6 text-sm text-slate-500 hover:text-brand-600 flex items-center gap-1 mx-auto lg:mx-0"
              >
                &larr; Back to Start
              </button>
            </div>

            {/* Right Column: Results */}
            <div id="results-section" className="lg:col-span-7">
              
              {loadingState === LoadingState.IDLE && (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-600 mb-2">Your strategy will appear here</h3>
                  <p className="max-w-xs mx-auto">
                    Fill out the form to generate a custom advocacy plan tailored to your needs.
                  </p>
                </div>
              )}

              {loadingState === LoadingState.LOADING && (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white h-48 rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                      <div className="h-6 bg-slate-100 rounded w-1/3"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-100 rounded w-4/6"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loadingState === LoadingState.ERROR && (
                 <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800 flex items-start gap-3">
                   <AlertCircle className="shrink-0 mt-0.5" />
                   <div>
                     <h3 className="font-semibold">Error</h3>
                     <p>{error}</p>
                   </div>
                 </div>
              )}

              {loadingState === LoadingState.SUCCESS && result && (
                <>
                  <CampaignResult rawText={result} />
                  
                  {/* Download Section */}
                  <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-end gap-4 animate-fade-in">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">Download format:</span>
                        <div className="relative">
                            <select 
                                value={downloadFormat}
                                onChange={(e) => setDownloadFormat(e.target.value as 'PDF' | 'Word')}
                                className="pl-3 pr-8 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white text-sm outline-none appearance-none cursor-pointer hover:border-brand-400 transition-colors"
                            >
                                <option value="PDF">PDF</option>
                                <option value="Word">Word (.doc)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.98]"
                    >
                        <Download size={18} />
                        Download plan
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Inclusive AI Campaign Starter. Designed for educators and students.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;