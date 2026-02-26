import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadProjects, loadMusic, loadPublications, loadBio, loadCourses, DataLoadError } from './dataLoader';

// Mock fetch globally
global.fetch = vi.fn();

describe('Data Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loadProjects', () => {
    it('should load projects successfully', async () => {
      const mockProjects = [
        { id: '1', title: 'Project 1', description: 'Desc', date: '2024-01-01', tags: [], fullDescription: '', images: [], technologies: [] }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects
      });

      const result = await loadProjects();
      expect(result).toEqual(mockProjects);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/^\/data\/projects\.json\?t=\d+$/),
        expect.objectContaining({ cache: 'no-store' })
      );
    });

    it('should throw DataLoadError on 404', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(loadProjects()).rejects.toThrow(DataLoadError);
    });

    it('should throw DataLoadError on network error', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(loadProjects()).rejects.toThrow(DataLoadError);
    });
  });

  describe('loadMusic', () => {
    it('should load music works successfully', async () => {
      const mockMusic = [
        { id: '1', title: 'Music 1', description: 'Desc', date: '2024-01-01', tags: [], instruments: [], fullDescription: '' }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMusic
      });

      const result = await loadMusic();
      expect(result).toEqual(mockMusic);
    });
  });

  describe('loadPublications', () => {
    it('should load publications successfully', async () => {
      const mockPubs = [
        { id: '1', title: 'Paper 1', authors: ['Author'], venue: 'Venue', date: '2024-01-01', abstract: 'Abstract' }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPubs
      });

      const result = await loadPublications();
      expect(result).toEqual(mockPubs);
    });
  });

  describe('loadBio', () => {
    it('should load bio successfully', async () => {
      const mockBio = { name: 'Test', introduction: 'Intro' };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockBio
      });

      const result = await loadBio();
      expect(result).toEqual(mockBio);
    });
  });

  describe('loadCourses', () => {
    it('should load courses successfully', async () => {
      const mockCourses = [
        { id: '1', name: 'Course 1', semester: '2024-1' }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCourses
      });

      const result = await loadCourses();
      expect(result).toEqual(mockCourses);
    });
  });
});

describe('Property 25: Data reload after restart', () => {
  it('should reload data successfully after multiple calls', async () => {
    const mockProjects = [
      { id: '1', title: 'Project 1', description: 'Desc', date: '2024-01-01', tags: [], fullDescription: '', images: [], technologies: [] }
    ];

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockProjects
    });

    // First load
    const result1 = await loadProjects();
    expect(result1).toEqual(mockProjects);

    // Second load (simulating restart)
    const result2 = await loadProjects();
    expect(result2).toEqual(mockProjects);
    expect(result2).toEqual(result1);
  });

  it('should reload all data types consistently', async () => {
    const mockData = {
      projects: [{ id: '1', title: 'P1', description: 'D', date: '2024-01-01', tags: [], fullDescription: '', images: [], technologies: [] }],
      music: [{ id: '1', title: 'M1', description: 'D', date: '2024-01-01', tags: [], instruments: [], fullDescription: '' }],
      publications: [{ id: '1', title: 'Pub1', authors: ['A'], venue: 'V', date: '2024-01-01', abstract: 'A' }],
      bio: { name: 'Test', introduction: 'Intro' },
      courses: [{ id: '1', name: 'C1', semester: '2024-1' }]
    };

    (global.fetch as any).mockImplementation((url: string) => {
      if (url.includes('projects')) return Promise.resolve({ ok: true, json: async () => mockData.projects });
      if (url.includes('music')) return Promise.resolve({ ok: true, json: async () => mockData.music });
      if (url.includes('publications')) return Promise.resolve({ ok: true, json: async () => mockData.publications });
      if (url.includes('bio')) return Promise.resolve({ ok: true, json: async () => mockData.bio });
      if (url.includes('courses')) return Promise.resolve({ ok: true, json: async () => mockData.courses });
      return Promise.reject(new Error('Unknown URL'));
    });

    const [projects, music, pubs, bio, courses] = await Promise.all([
      loadProjects(),
      loadMusic(),
      loadPublications(),
      loadBio(),
      loadCourses()
    ]);

    expect(projects).toEqual(mockData.projects);
    expect(music).toEqual(mockData.music);
    expect(pubs).toEqual(mockData.publications);
    expect(bio).toEqual(mockData.bio);
    expect(courses).toEqual(mockData.courses);
  });
});
