export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string | null;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface Skill {
  id: number;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Resume {
  id: number;
  title: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  created_at: string;
  updated_at: string;
}

export interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
} 