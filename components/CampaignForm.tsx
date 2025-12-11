import React, { useState } from 'react';
import { CampaignInput, PLATFORM_OPTIONS, TONE_OPTIONS } from '../types';
import { Send, Loader2, Info } from 'lucide-react';

interface CampaignFormProps {
  onSubmit: (data: CampaignInput) => void;
  isLoading: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CampaignInput>({
    issue: '',
    affectedGroup: '',
    timeline: '',
    actionIdeas: '',
    audience: '',
    platform: PLATFORM_OPTIONS[0],
    tone: TONE_OPTIONS[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-brand-50 px-6 py-4 border-b border-brand-100">
        <h2 className="text-lg font-semibold text-slate-800">Design Your Campaign</h2>
        <p className="text-sm text-slate-500 mt-1">Fill in the details to generate your advocacy plan.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Issue Input */}
        <div>
          <label htmlFor="issue" className="block text-sm font-medium text-slate-700 mb-1">
            What is the main issue?
          </label>
          <p className="text-xs text-slate-500 mb-2">
            E.g., "Students without laptops can't use AI tools at home" or "AI detectors are flagging non-native speakers."
          </p>
          <textarea
            id="issue"
            name="issue"
            rows={3}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors resize-none"
            placeholder="Describe the problem..."
            value={formData.issue}
            onChange={handleChange}
          />
        </div>

        {/* Affected Group */}
        <div>
          <label htmlFor="affectedGroup" className="block text-sm font-medium text-slate-700 mb-1">
            Who is most affected?
          </label>
          <input
            type="text"
            id="affectedGroup"
            name="affectedGroup"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            placeholder="E.g. Rural students, ESL learners, Students with disabilities"
            value={formData.affectedGroup}
            onChange={handleChange}
          />
        </div>

        {/* Timeline */}
        <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-1">
                When do you hope to see a change?
            </label>
            <input
                type="text"
                id="timeline"
                name="timeline"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                placeholder="E.g. By next semester, In 3 months, Before exams start"
                value={formData.timeline}
                onChange={handleChange}
            />
        </div>

        {/* Action Ideas */}
        <div>
          <label htmlFor="actionIdeas" className="block text-sm font-medium text-slate-700 mb-1">
            Any action ideas you already have?
          </label>
          <textarea
            id="actionIdeas"
            name="actionIdeas"
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors resize-none"
            placeholder="E.g. Starting a petition, hosting a lunch discussion, making a video series"
            value={formData.actionIdeas}
            onChange={handleChange}
          />
        </div>

        {/* Audience */}
        <div>
          <label htmlFor="audience" className="block text-sm font-medium text-slate-700 mb-1">
            Who do you want to reach?
          </label>
          <input
            type="text"
            id="audience"
            name="audience"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            placeholder="E.g. School principal, Parents, Local school board"
            value={formData.audience}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform */}
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-slate-700 mb-1">
              Platform
            </label>
            <div className="relative">
              <select
                id="platform"
                name="platform"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors appearance-none bg-white"
                value={formData.platform}
                onChange={handleChange}
              >
                {PLATFORM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </div>

          {/* Tone */}
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-700 mb-1">
              Tone
            </label>
            <div className="relative">
              <select
                id="tone"
                name="tone"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors appearance-none bg-white"
                value={formData.tone}
                onChange={handleChange}
              >
                {TONE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-semibold shadow-md transition-all ${
                isLoading 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-brand-600 hover:bg-brand-700 hover:shadow-lg active:transform active:scale-[0.98]'
                }`}
            >
                {isLoading ? (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Generating Plan...</span>
                </>
                ) : (
                <>
                    <Send size={20} />
                    <span>Generate Campaign</span>
                </>
                )}
            </button>
        </div>

        <div className="bg-brand-50 p-4 rounded-lg flex gap-3 text-sm text-brand-800 border border-brand-100">
            <Info className="shrink-0 mt-0.5" size={16} />
            <p>
                <strong>Privacy Reminder:</strong> Please do not include real names of students or specific sensitive details. Generalize your inputs (e.g., "a student in my class").
            </p>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;