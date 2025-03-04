import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface Resume {
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

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumes: (state, action: PayloadAction<Resume[]>) => {
      state.resumes = action.payload;
    },
    addResume: (state, action: PayloadAction<Resume>) => {
      state.resumes.push(action.payload);
    },
    updateResume: (state, action: PayloadAction<Resume>) => {
      const index = state.resumes.findIndex(resume => resume.id === action.payload.id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.filter(resume => resume.id !== action.payload);
    },
    setCurrentResume: (state, action: PayloadAction<Resume | null>) => {
      state.currentResume = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setResumes,
  addResume,
  updateResume,
  deleteResume,
  setCurrentResume,
  setLoading,
  setError,
} = resumeSlice.actions;

export default resumeSlice.reducer; 