export interface CampaignInput {
  issue: string;
  affectedGroup: string;
  timeline: string;
  actionIdeas: string;
  audience: string;
  platform: string;
  tone: string;
}

export interface SectionData {
  title: string;
  content: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export const PLATFORM_OPTIONS = [
  "Instagram",
  "TikTok",
  "Twitter/X",
  "LinkedIn",
  "Facebook",
  "Medium",
  "Substack",
  "School Newsletter"
];

export const TONE_OPTIONS = [
  "Hopeful & Encouraging",
  "Serious & Urgent",
  "Informative & Educational",
  "Friendly & Casual",
  "Professional & Direct"
];