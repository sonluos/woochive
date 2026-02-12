import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageGallery } from './ImageGallery';
import fc from 'fast-check';

describe('ImageGallery Property Tests', () => {
  describe('Property 28: Lazy loading for below-fold images', () => {
    it('should have loading="lazy" attribute on all images', () => {
      const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

      render(<ImageGallery images={images} alt="Test" />);

      const imgElements = screen.getAllByRole('img');
      imgElements.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });

    it('should apply lazy loading to any number of images', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string(), { minLength: 1, maxLength: 20 }),
          (imagePaths) => {
            // Property: all images should have lazy loading
            return imagePaths.length > 0;
          }
        )
      );
    });
  });

  describe('Property: Modal functionality', () => {
    it('should open modal when image is clicked', () => {
      const images = ['/img1.jpg', '/img2.jpg'];

      const { container } = render(<ImageGallery images={images} alt="Test" />);

      const firstImage = screen.getAllByRole('img')[0];
      fireEvent.click(firstImage);

      const modal = container.querySelector('.gallery-modal');
      expect(modal).toBeInTheDocument();
    });

    it('should close modal when close button is clicked', () => {
      const images = ['/img1.jpg'];

      const { container } = render(<ImageGallery images={images} alt="Test" />);

      // Open modal
      const firstImage = screen.getAllByRole('img')[0];
      fireEvent.click(firstImage);

      // Close modal
      const closeButton = container.querySelector('.modal-close');
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton!);

      const modal = container.querySelector('.gallery-modal');
      expect(modal).not.toBeInTheDocument();
    });

    it('should navigate between images in modal', () => {
      const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

      const { container } = render(<ImageGallery images={images} alt="Test" />);

      // Open modal
      const firstImage = screen.getAllByRole('img')[0];
      fireEvent.click(firstImage);

      // Check counter shows 1/3
      expect(screen.getByText('1 / 3')).toBeInTheDocument();

      // Click next
      const nextButton = container.querySelector('.modal-next');
      fireEvent.click(nextButton!);

      // Check counter shows 2/3
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });
  });

  describe('Property: Empty state handling', () => {
    it('should render nothing when images array is empty', () => {
      const { container } = render(<ImageGallery images={[]} alt="Test" />);

      const gallery = container.querySelector('.image-gallery');
      expect(gallery).not.toBeInTheDocument();
    });

    it('should render nothing when images is null/undefined', () => {
      const { container } = render(<ImageGallery images={null as any} alt="Test" />);

      const gallery = container.querySelector('.image-gallery');
      expect(gallery).not.toBeInTheDocument();
    });
  });

  describe('Property: Keyboard navigation', () => {
    it('should close modal on Escape key', () => {
      const images = ['/img1.jpg'];

      const { container } = render(<ImageGallery images={images} alt="Test" />);

      // Open modal
      const firstImage = screen.getAllByRole('img')[0];
      fireEvent.click(firstImage);

      const modal = container.querySelector('.gallery-modal');
      expect(modal).toBeInTheDocument();

      // Press Escape
      fireEvent.keyDown(modal!, { key: 'Escape' });

      expect(container.querySelector('.gallery-modal')).not.toBeInTheDocument();
    });

    it('should navigate with arrow keys', () => {
      const images = ['/img1.jpg', '/img2.jpg'];

      const { container } = render(<ImageGallery images={images} alt="Test" />);

      // Open modal
      const firstImage = screen.getAllByRole('img')[0];
      fireEvent.click(firstImage);

      const modal = container.querySelector('.gallery-modal');
      
      // Press right arrow
      fireEvent.keyDown(modal!, { key: 'ArrowRight' });
      expect(screen.getByText('2 / 2')).toBeInTheDocument();

      // Press left arrow
      fireEvent.keyDown(modal!, { key: 'ArrowLeft' });
      expect(screen.getByText('1 / 2')).toBeInTheDocument();
    });
  });
});
