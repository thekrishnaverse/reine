import React, { useState, useEffect, useCallback } from 'react';
import { HERO_SLIDER_PLACEHOLDER_IMAGES } from '../constants';
// Note: LoadingSpinner is no longer used here as images are static placeholders.
// import LoadingSpinner from './LoadingSpinner'; 

const HeroSlider: React.FC = () => {
  // Use placeholder images directly
  const images = HERO_SLIDER_PLACEHOLDER_IMAGES;
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no placeholder images are defined, display a static hero section
  if (!images || images.length === 0) {
    return (
     <section id="hero-static" className="text-center py-10 bg-gradient-to-r from-honda-red via-red-600 to-red-700 rounded-lg shadow-lg mb-12">
       <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Temukan Mobil Honda Impian Anda</h1>
       <p className="text-lg sm:text-xl text-red-100">Jelajahi model terbaru kami.</p>
     </section>
   );
 }

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setTimeout(goToNext, 5000); // Auto-slide every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentIndex, images.length, goToNext]);


  const currentImageUrl = images[currentIndex];

  return (
    <section id="hero-slider" className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full rounded-lg shadow-lg mb-12 overflow-hidden group">
      <div
        style={{ backgroundImage: `url(${currentImageUrl})` }}
        className="w-full h-full bg-center bg-cover duration-1000 ease-in-out transition-all"
        role="img"
        aria-label={`Slider image ${currentIndex + 1}`}
      >
        {/* Text overlay removed */}
      </div>
      
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 sm:left-5 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Gambar Sebelumnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 sm:right-5 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Gambar Berikutnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setCurrentIndex(slideIndex)}
              className={`w-3 h-3 rounded-full ${currentIndex === slideIndex ? 'bg-white' : 'bg-gray-400 opacity-70'} hover:opacity-100 focus:outline-none`}
              aria-label={`Ke gambar ${slideIndex + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;