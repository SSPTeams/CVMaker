export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}

export interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
} 