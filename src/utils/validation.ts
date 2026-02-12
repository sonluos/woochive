import { PortfolioItem, ResearchProject, MusicWork, Publication, Bio, Course } from '../types/portfolio';

// File format validation
const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const AUDIO_FORMATS = ['mp3', 'wav', 'ogg', 'flac'];
const PDF_FORMAT = ['pdf'];

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

export function isValidImageFormat(filename: string): boolean {
  const ext = getFileExtension(filename);
  return IMAGE_FORMATS.includes(ext);
}

export function isValidAudioFormat(filename: string): boolean {
  const ext = getFileExtension(filename);
  return AUDIO_FORMATS.includes(ext);
}

export function isValidPdfFormat(filename: string): boolean {
  const ext = getFileExtension(filename);
  return PDF_FORMAT.includes(ext);
}

// Required field validation
export function validatePortfolioItem(item: Partial<PortfolioItem>): string[] {
  const errors: string[] = [];
  
  if (!item.id || item.id.trim() === '') {
    errors.push('ID is required');
  }
  
  if (!item.title || item.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!item.description || item.description.trim() === '') {
    errors.push('Description is required');
  }
  
  if (!item.date || item.date.trim() === '') {
    errors.push('Date is required');
  }
  
  if (!item.tags || !Array.isArray(item.tags)) {
    errors.push('Tags must be an array');
  }
  
  // Validate thumbnail if provided
  if (item.thumbnail && !isValidImageFormat(item.thumbnail)) {
    errors.push('Thumbnail must be a valid image format (jpg, jpeg, png, webp, gif)');
  }
  
  return errors;
}

export function validateResearchProject(project: Partial<ResearchProject>): string[] {
  const errors = validatePortfolioItem(project);
  
  if (!project.fullDescription || project.fullDescription.trim() === '') {
    errors.push('Full description is required');
  }
  
  if (!project.images || !Array.isArray(project.images)) {
    errors.push('Images must be an array');
  } else {
    project.images.forEach((img, index) => {
      if (!isValidImageFormat(img)) {
        errors.push(`Image at index ${index} has invalid format`);
      }
    });
  }
  
  if (!project.technologies || !Array.isArray(project.technologies)) {
    errors.push('Technologies must be an array');
  }
  
  return errors;
}

export function validateMusicWork(work: Partial<MusicWork>): string[] {
  const errors = validatePortfolioItem(work);
  
  if (!work.fullDescription || work.fullDescription.trim() === '') {
    errors.push('Full description is required');
  }
  
  if (!work.instruments || !Array.isArray(work.instruments)) {
    errors.push('Instruments must be an array');
  }
  
  // Validate audio file if provided
  if (work.audioFile && !isValidAudioFormat(work.audioFile)) {
    errors.push('Audio file must be a valid format (mp3, wav, ogg, flac)');
  }
  
  return errors;
}

export function validatePublication(pub: Partial<Publication>): string[] {
  const errors: string[] = [];
  
  if (!pub.id || pub.id.trim() === '') {
    errors.push('ID is required');
  }
  
  if (!pub.title || pub.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!pub.authors || !Array.isArray(pub.authors) || pub.authors.length === 0) {
    errors.push('Authors must be a non-empty array');
  }
  
  if (!pub.venue || pub.venue.trim() === '') {
    errors.push('Venue is required');
  }
  
  if (!pub.date || pub.date.trim() === '') {
    errors.push('Date is required');
  }
  
  if (!pub.abstract || pub.abstract.trim() === '') {
    errors.push('Abstract is required');
  }
  
  // Validate PDF if provided
  if (pub.pdfFile && !isValidPdfFormat(pub.pdfFile)) {
    errors.push('PDF file must have .pdf extension');
  }
  
  return errors;
}

export function validateBio(bio: Partial<Bio>): string[] {
  const errors: string[] = [];
  
  if (!bio.name || bio.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!bio.introduction || bio.introduction.trim() === '') {
    errors.push('Introduction is required');
  }
  
  return errors;
}

export function validateCourse(course: Partial<Course>): string[] {
  const errors: string[] = [];
  
  if (!course.id || course.id.trim() === '') {
    errors.push('ID is required');
  }
  
  if (!course.name || course.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!course.semester || course.semester.trim() === '') {
    errors.push('Semester is required');
  }
  
  return errors;
}
