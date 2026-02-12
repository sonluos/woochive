import { describe, it, expect } from 'vitest';
import {
  isValidImageFormat,
  isValidAudioFormat,
  isValidPdfFormat,
  validatePortfolioItem,
  validateResearchProject,
  validateMusicWork,
  validatePublication,
  validateBio,
  validateCourse
} from './validation';
import { ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

describe('File Format Validation', () => {
  describe('isValidImageFormat', () => {
    it('should accept valid image formats', () => {
      expect(isValidImageFormat('image.jpg')).toBe(true);
      expect(isValidImageFormat('image.jpeg')).toBe(true);
      expect(isValidImageFormat('image.png')).toBe(true);
      expect(isValidImageFormat('image.webp')).toBe(true);
      expect(isValidImageFormat('image.gif')).toBe(true);
    });

    it('should reject invalid image formats', () => {
      expect(isValidImageFormat('file.pdf')).toBe(false);
      expect(isValidImageFormat('file.mp3')).toBe(false);
      expect(isValidImageFormat('file.txt')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(isValidImageFormat('image.JPG')).toBe(true);
      expect(isValidImageFormat('image.PNG')).toBe(true);
    });
  });

  describe('isValidAudioFormat', () => {
    it('should accept valid audio formats', () => {
      expect(isValidAudioFormat('audio.mp3')).toBe(true);
      expect(isValidAudioFormat('audio.wav')).toBe(true);
      expect(isValidAudioFormat('audio.ogg')).toBe(true);
      expect(isValidAudioFormat('audio.flac')).toBe(true);
    });

    it('should reject invalid audio formats', () => {
      expect(isValidAudioFormat('file.jpg')).toBe(false);
      expect(isValidAudioFormat('file.pdf')).toBe(false);
    });
  });

  describe('isValidPdfFormat', () => {
    it('should accept PDF format', () => {
      expect(isValidPdfFormat('document.pdf')).toBe(true);
      expect(isValidPdfFormat('document.PDF')).toBe(true);
    });

    it('should reject non-PDF formats', () => {
      expect(isValidPdfFormat('file.jpg')).toBe(false);
      expect(isValidPdfFormat('file.doc')).toBe(false);
    });
  });
});

describe('Portfolio Item Validation', () => {
  it('should validate required fields', () => {
    const validItem = {
      id: 'test-1',
      title: 'Test Item',
      description: 'Test description',
      date: '2024-01-01',
      tags: ['tag1', 'tag2']
    };

    const errors = validatePortfolioItem(validItem);
    expect(errors).toHaveLength(0);
  });

  it('should detect missing required fields', () => {
    const invalidItem = {
      id: '',
      title: '',
      description: 'Test',
      date: '2024-01-01',
      tags: []
    };

    const errors = validatePortfolioItem(invalidItem);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.includes('ID'))).toBe(true);
    expect(errors.some(e => e.includes('Title'))).toBe(true);
  });

  it('should validate thumbnail format', () => {
    const itemWithInvalidThumbnail = {
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      date: '2024-01-01',
      tags: ['tag1'],
      thumbnail: 'invalid.txt'
    };

    const errors = validatePortfolioItem(itemWithInvalidThumbnail);
    expect(errors.some(e => e.includes('Thumbnail'))).toBe(true);
  });
});

describe('Research Project Validation', () => {
  it('should validate complete research project', () => {
    const validProject: ResearchProject = {
      id: 'project-1',
      title: 'Test Project',
      description: 'Short description',
      fullDescription: 'Full description',
      date: '2024-01-01',
      tags: ['AI', 'ML'],
      images: ['image1.jpg', 'image2.png'],
      technologies: ['Python', 'TensorFlow']
    };

    const errors = validateResearchProject(validProject);
    expect(errors).toHaveLength(0);
  });

  it('should detect invalid image formats', () => {
    const projectWithInvalidImages: Partial<ResearchProject> = {
      id: 'project-1',
      title: 'Test',
      description: 'Test',
      fullDescription: 'Full',
      date: '2024-01-01',
      tags: ['AI'],
      images: ['valid.jpg', 'invalid.txt'],
      technologies: ['Python']
    };

    const errors = validateResearchProject(projectWithInvalidImages);
    expect(errors.some(e => e.includes('Image'))).toBe(true);
  });
});

describe('Music Work Validation', () => {
  it('should validate complete music work', () => {
    const validWork: MusicWork = {
      id: 'music-1',
      title: 'Test Music',
      description: 'Short description',
      fullDescription: 'Full description',
      date: '2024-01-01',
      tags: ['Electronic'],
      instruments: ['Piano', 'Synthesizer'],
      audioFile: 'audio.mp3'
    };

    const errors = validateMusicWork(validWork);
    expect(errors).toHaveLength(0);
  });

  it('should validate audio file format', () => {
    const workWithInvalidAudio: Partial<MusicWork> = {
      id: 'music-1',
      title: 'Test',
      description: 'Test',
      fullDescription: 'Full',
      date: '2024-01-01',
      tags: ['Electronic'],
      instruments: ['Piano'],
      audioFile: 'invalid.txt'
    };

    const errors = validateMusicWork(workWithInvalidAudio);
    expect(errors.some(e => e.includes('Audio'))).toBe(true);
  });
});

describe('Publication Validation', () => {
  it('should validate complete publication', () => {
    const validPub: Publication = {
      id: 'pub-1',
      title: 'Test Paper',
      authors: ['Author 1', 'Author 2'],
      venue: 'Test Conference',
      date: '2024-01-01',
      abstract: 'Test abstract',
      pdfFile: 'paper.pdf'
    };

    const errors = validatePublication(validPub);
    expect(errors).toHaveLength(0);
  });

  it('should require non-empty authors array', () => {
    const pubWithoutAuthors: Partial<Publication> = {
      id: 'pub-1',
      title: 'Test',
      authors: [],
      venue: 'Test',
      date: '2024-01-01',
      abstract: 'Test'
    };

    const errors = validatePublication(pubWithoutAuthors);
    expect(errors.some(e => e.includes('Authors'))).toBe(true);
  });

  it('should validate PDF format', () => {
    const pubWithInvalidPdf: Partial<Publication> = {
      id: 'pub-1',
      title: 'Test',
      authors: ['Author'],
      venue: 'Test',
      date: '2024-01-01',
      abstract: 'Test',
      pdfFile: 'invalid.doc'
    };

    const errors = validatePublication(pubWithInvalidPdf);
    expect(errors.some(e => e.includes('PDF'))).toBe(true);
  });
});

describe('Bio Validation', () => {
  it('should validate complete bio', () => {
    const validBio: Bio = {
      name: 'Test Name',
      introduction: 'Test introduction'
    };

    const errors = validateBio(validBio);
    expect(errors).toHaveLength(0);
  });

  it('should require name and introduction', () => {
    const invalidBio: Partial<Bio> = {
      name: '',
      introduction: ''
    };

    const errors = validateBio(invalidBio);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('Course Validation', () => {
  it('should validate complete course', () => {
    const validCourse: Course = {
      id: 'course-1',
      name: 'Test Course',
      semester: '2024-1'
    };

    const errors = validateCourse(validCourse);
    expect(errors).toHaveLength(0);
  });

  it('should require id, name, and semester', () => {
    const invalidCourse: Partial<Course> = {
      id: '',
      name: '',
      semester: ''
    };

    const errors = validateCourse(invalidCourse);
    expect(errors.length).toBeGreaterThan(0);
  });
});
