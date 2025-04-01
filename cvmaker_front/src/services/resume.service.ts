import { resumeApi } from '../api/client';
import { Resume } from '../types/resume';

export class ResumeService {
  static async getAll(): Promise<Resume[]> {
    return resumeApi.getAll();
  }

  static async getById(id: string): Promise<Resume> {
    return resumeApi.getById(id);
  }

  static async create(data: Omit<Resume, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Resume> {
    return resumeApi.create(data);
  }

  static async update(id: string, data: Partial<Resume>): Promise<Resume> {
    return resumeApi.update(id, data);
  }

  static async delete(id: string): Promise<void> {
    return resumeApi.delete(id);
  }

  static generatePDF(resume: Resume): void {
    // TODO: Implement PDF generation
    console.log('Generating PDF for resume:', resume);
  }

  static shareResume(resume: Resume): void {
    // TODO: Implement sharing functionality
    console.log('Sharing resume:', resume);
  }
} 