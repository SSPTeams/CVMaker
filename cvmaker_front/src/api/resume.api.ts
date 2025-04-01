import { apiClient } from './client';
import { Resume } from '../types/resume';

// Моки для разработки
const mockResumes: Resume[] = [
  {
    id: '1',
    userId: '1',
    title: 'Software Developer Resume',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    location: 'New York, USA',
    summary: 'Experienced software developer with expertise in React and TypeScript.',
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016-09-01',
        endDate: '2020-06-30',
      },
    ],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Developer',
        location: 'New York, USA',
        startDate: '2020-07-01',
        endDate: '2024-02-29',
        description: 'Led development of multiple web applications using React and TypeScript.',
      },
    ],
    skills: [
      { name: 'React', level: 'Expert' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Node.js', level: 'Intermediate' },
    ],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-02-29T00:00:00.000Z',
  },
];

export const resumeApi = {
  getAll: async (): Promise<Resume[]> => {
    // Реальный API-вызов
    const response = await apiClient.get<Resume[]>('/resumes/');
    return response.data;
    
    // Мок для разработки:
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mockResumes);
    //   }, 500);
    // });
  },

  getById: async (id: string): Promise<Resume> => {
    // Реальный API-вызов
    const response = await apiClient.get<Resume>(`/resumes/${id}/`);
    return response.data;
    
    // Мок для разработки:
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const resume = mockResumes.find((r) => r.id === id);
    //     if (resume) {
    //       resolve(resume);
    //     } else {
    //       reject(new Error('Resume not found'));
    //     }
    //   }, 500);
    // });
  },

  create: async (data: Omit<Resume, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Resume> => {
    // Реальный API-вызов
    const response = await apiClient.post<Resume>('/resumes/', data);
    return response.data;
    
    // Мок для разработки:
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const newResume: Resume = {
    //       ...data,
    //       id: String(mockResumes.length + 1),
    //       userId: '1',
    //       createdAt: new Date().toISOString(),
    //       updatedAt: new Date().toISOString(),
    //     };
    //     mockResumes.push(newResume);
    //     resolve(newResume);
    //   }, 500);
    // });
  },

  update: async (id: string, data: Partial<Resume>): Promise<Resume> => {
    // Реальный API-вызов
    const response = await apiClient.put<Resume>(`/resumes/${id}/`, data);
    return response.data;
    
    // Мок для разработки:
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const index = mockResumes.findIndex((r) => r.id === id);
    //     if (index !== -1) {
    //       const updatedResume = {
    //         ...mockResumes[index],
    //         ...data,
    //         updatedAt: new Date().toISOString(),
    //       };
    //       mockResumes[index] = updatedResume;
    //       resolve(updatedResume);
    //     } else {
    //       reject(new Error('Resume not found'));
    //     }
    //   }, 500);
    // });
  },

  delete: async (id: string): Promise<void> => {
    // Реальный API-вызов
    await apiClient.delete(`/resumes/${id}/`);
    
    // Мок для разработки:
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const index = mockResumes.findIndex((r) => r.id === id);
    //     if (index !== -1) {
    //       mockResumes.splice(index, 1);
    //       resolve();
    //     } else {
    //       reject(new Error('Resume not found'));
    //     }
    //   }, 500);
    // });
  },
}; 