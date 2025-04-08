import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ResumeState, Resume } from '../../types/resume';
import { ResumeService } from '../../services/resume.service';

const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
};

export const fetchResumes = createAsyncThunk(
  'resume/fetchAll',
  async () => {
    return await ResumeService.getAll();
  }
);

export const fetchResumeById = createAsyncThunk(
  'resume/fetchById',
  async (id: string) => {
    return await ResumeService.getById(id);
  }
);

export const createResume = createAsyncThunk(
  'resume/create',
  async (data: Omit<Resume, 'id' | 'created_at' | 'updated_at'>) => {
    return await ResumeService.create(data);
  }
);

export const updateResume = createAsyncThunk(
  'resume/update',
  async ({ id, data }: { id: string; data: Partial<Resume> }) => {
    return await ResumeService.update(id, data);
  }
);

export const deleteResume = createAsyncThunk(
  'resume/delete',
  async (id: string) => {
    await ResumeService.delete(id);
    return id;
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentResume: (state) => {
      state.currentResume = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all resumes
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resumes';
      });

    // Fetch resume by id
    builder
      .addCase(fetchResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resume';
      });

    // Create resume
    builder
      .addCase(createResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
        state.currentResume = action.payload;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create resume';
      });

    // Update resume
    builder
      .addCase(updateResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.resumes.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.resumes[index] = action.payload;
        }
        state.currentResume = action.payload;
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update resume';
      });

    // Delete resume
    builder
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.filter(r => r.id.toString() !== action.payload);
        if (state.currentResume?.id.toString() === action.payload) {
          state.currentResume = null;
        }
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete resume';
      });
  },
});

export const { clearError, clearCurrentResume } = resumeSlice.actions;
export default resumeSlice.reducer; 