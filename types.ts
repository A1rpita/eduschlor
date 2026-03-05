
export enum Category {
  GENERAL = 'General',
  OBC = 'OBC',
  SC = 'SC',
  ST = 'ST',
  EWS = 'EWS'
}

export enum Religion {
  HINDU = 'Hindu',
  MUSLIM = 'Muslim',
  CHRISTIAN = 'Christian',
  SIKH = 'Sikh',
  BUDDHIST = 'Buddhist',
  JAIN = 'Jain',
  PARSI = 'Parsi',
  OTHERS = 'Others'
}

export enum EducationLevel {
  SCHOOL_10 = '10th Standard',
  SCHOOL_12 = '12th Standard / Intermediate',
  UNDERGRADUATE = 'Undergraduate (BA, BSc, BTech, etc.)',
  POSTGRADUATE = 'Postgraduate (MA, MSc, MTech, etc.)',
  DIPLOMA = 'Diploma / ITI',
  PHD = 'PhD / Research'
}

export interface StudentProfile {
  name: string;
  state: string;
  category: Category;
  religion: Religion;
  familyIncome: number;
  isMinority: boolean;
  isDisabled: boolean;
  educationLevel: EducationLevel;
  currentCourse: string;
  lastYearPercentage: number;
  institutionType: 'Government' | 'Private' | 'Aided';
  gender: 'Male' | 'Female' | 'Other';
  primaryInterest: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  description: string;
  eligibilityJustification: string;
  applicationUrl: string;
  type: 'Government' | 'Private' | 'State';
  applicationSteps: string[];
  requiredDocuments: string[];
  tips: string[];
  selectionCriteria: string;
  essayTips?: string;
}

export interface CareerMilestone {
  title: string;
  description: string;
  skills: string[];
  duration: string;
}

export interface CareerGuidance {
  recommendedRoles: string[];
  skillRoadmap: CareerMilestone[];
  suggestedCertifications: string[];
  marketOutlook: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DSSResult {
  scholarships: Scholarship[];
  careerGuidance: CareerGuidance;
  sources: GroundingSource[];
}
