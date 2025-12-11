import React from 'react';
import ReactMarkdown from 'react-markdown';
import { SectionData } from '../types';
import { Copy, Check, Share2, AlertCircle } from 'lucide-react';

interface CampaignResultProps {
  rawText: string;
}

const SECTION_HEADERS = [
  "CAMPAIGN SNAPSHOT",
  "CAMPAIGN PLAN",
  "FIRST POST DRAFT",
  "INCLUSION & ACCESSIBILITY CHECKS"
];

const CampaignResult: React.FC<CampaignResultProps> = ({ rawText }) => {
  const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

  // Helper to parse the raw text into sections based on known headers
  const parseSections = (text: string): SectionData[] => {
    const sections: SectionData[] = [];
    
    // Create a regex pattern that matches any of the headers
    // We use a lookahead to split but keep delimiters, or we can index find
    // Simpler approach: split by headers, map back
    
    let currentText = text;
    const foundIndices: { header: string, index: number }[] = [];

    SECTION_HEADERS.forEach(header => {
      const index = currentText.indexOf(header);
      if (index !== -1) {
        foundIndices.push({ header, index });
      }
    });

    foundIndices.sort((a, b) => a.index - b.index);

    for (let i = 0; i < foundIndices.length; i++) {
      const current = foundIndices[i];
      const next = foundIndices[i + 1];
      
      const contentStartIndex = current.index + current.header.length;
      const contentEndIndex = next ? next.index : currentText.length;
      
      const content = currentText.substring(contentStartIndex, contentEndIndex).trim();
      
      sections.push({
        title: current.header,
        content: content
      });
    }

    // If parsing fails (AI didn't use headers), fallback to just showing everything
    if (sections.length === 0) {
      return [{ title: "Campaign Strategy", content: text }];
    }

    return sections;
  };

  const sections = parseSections(rawText);

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(title);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getIconForSection = (title: string) => {
    switch (title) {
        case "CAMPAIGN SNAPSHOT": return <Share2 className="text-purple-500" size={24}/>;
        case "CAMPAIGN PLAN": return <div className="w-6 h-6 rounded-full border-2 border-brand-500 flex items-center justify-center text-brand-500 font-bold text-xs">1</div>;
        case "FIRST POST DRAFT": return <div className="text-pink-500 font-bold text-lg">@</div>;
        case "INCLUSION & ACCESSIBILITY CHECKS": return <AlertCircle className="text-green-600" size={24} />;
        default: return <div className="w-6 h-6 bg-slate-200 rounded-full" />;
    }
  }

  const getColorForSection = (title: string) => {
      switch (title) {
        case "CAMPAIGN SNAPSHOT": return "border-l-4 border-purple-400";
        case "CAMPAIGN PLAN": return "border-l-4 border-brand-400";
        case "FIRST POST DRAFT": return "border-l-4 border-pink-400";
        case "INCLUSION & ACCESSIBILITY CHECKS": return "border-l-4 border-green-400";
        default: return "border-l-4 border-slate-300";
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {sections.map((section, idx) => (
        <div key={idx} className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${getColorForSection(section.title)}`}>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
                {getIconForSection(section.title)}
                <h3 className="font-bold text-slate-800 tracking-wide">{section.title}</h3>
            </div>
            <button
              onClick={() => handleCopy(section.content, section.title)}
              className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
              title="Copy to clipboard"
            >
              {copiedSection === section.title ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <div className="p-6 prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-800">
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </div>
        </div>
      ))}

      <div className="flex justify-center pt-8 pb-12">
        <p className="text-center text-slate-400 text-sm italic max-w-md">
            Remember: This is an AI-generated draft. Always review for accuracy and safety before posting.
        </p>
      </div>
    </div>
  );
};

export default CampaignResult;
