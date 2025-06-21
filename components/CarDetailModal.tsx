import React, { useState, useEffect, useCallback } from 'react';
import { Car, WPMediaItem } from '../types';
import LoadingSpinner from './LoadingSpinner';
import AIAttribution from './AIAttribution';
import * as geminiService from '../services/geminiService';
import * as imageService from '../services/imageService';

interface CarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
  onAIDescriptionFetched: (carId: string, description: string) => void;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({ isOpen, onClose, car, onAIDescriptionFetched }) => {
  const [isLoadingDescription, setIsLoadingDescription] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [currentCar, setCurrentCar] = useState<Car | null>(car);
  
  const [galleryImages, setGalleryImages] = useState<WPMediaItem[]>([]);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  const fetchAIDescription = useCallback(async (carToFetch: Car) => {
    if (!carToFetch || !carToFetch.id || carToFetch.aiDescription) return;
    setIsLoadingDescription(true);
    setDescriptionError(null);
    try {
      const description = await geminiService.generateCarDescription(carToFetch.name, carToFetch.basePrompt);
      onAIDescriptionFetched(carToFetch.id, description);
      setCurrentCar(prevCar => prevCar && prevCar.id === carToFetch.id ? { ...prevCar, aiDescription: description } : prevCar);
    } catch (err: any) {
      console.error(`Error fetching AI description for ${carToFetch.name}:`, err);
      setDescriptionError(err.message || `Gagal memuat deskripsi untuk ${carToFetch.name}.`);
      setCurrentCar(prevCar => prevCar && prevCar.id === carToFetch.id ? { ...prevCar, aiDescription: undefined } : prevCar);
    } finally {
      setIsLoadingDescription(false);
    }
  }, [onAIDescriptionFetched]);

  const fetchGallery = useCallback(async (carToFetch: Car) => {
    if (!carToFetch) return;
    setIsLoadingGallery(true);
    setGalleryError(null);
    setGalleryImages([]);
    setCurrentGalleryIndex(0);
    try {
      const images = await imageService.fetchCarGalleryImages(carToFetch.name);
      if (images.length > 0) {
        setGalleryImages(images);
      } else {
        // Use fallback if no gallery images found
        setGalleryImages([{ 
            id: 0, date: '', slug: '', title: { rendered: carToFetch.name }, 
            media_details: {}, source_url: carToFetch.imageUrl, mime_type: 'image/jpeg' 
        }]);
         setGalleryError('Tidak ada gambar galeri tambahan, menampilkan gambar utama.');
      }
    } catch (err: any) {
      console.error(`Error fetching gallery for ${carToFetch.name}:`, err);
      setGalleryError(`Gagal memuat galeri untuk ${carToFetch.name}.`);
      // Use fallback on error
       setGalleryImages([{ 
            id: 0, date: '', slug: '', title: { rendered: carToFetch.name }, 
            media_details: {}, source_url: carToFetch.imageUrl, mime_type: 'image/jpeg' 
        }]);
    } finally {
      setIsLoadingGallery(false);
    }
  }, []);

  useEffect(() => {
    setCurrentCar(car);
    if (car) {
      setDescriptionError(null);
      if (!car.aiDescription) {
        fetchAIDescription(car);
      }
      fetchGallery(car);
    } else {
      setGalleryImages([]); // Clear gallery when no car
      setCurrentGalleryIndex(0);
    }
  }, [car, fetchAIDescription, fetchGallery]);
  
  useEffect(() => {
    if (isOpen && currentCar && !currentCar.aiDescription && !isLoadingDescription && !descriptionError) {
      fetchAIDescription(currentCar);
    }
    // Gallery is fetched when car prop changes
  }, [isOpen, currentCar, fetchAIDescription, isLoadingDescription, descriptionError]);


  if (!isOpen || !currentCar) {
    return null;
  }

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };
  
  const currentGalleryImageUrl = galleryImages.length > 0 
    ? imageService.getImageUrlFromMediaItem(galleryImages[currentGalleryIndex], 'large') 
    : currentCar.imageUrl; // Fallback to car's main image if gallery is empty

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="Tutup modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="md:w-1/2 relative group">
                {isLoadingGallery ? (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-lg">
                        <LoadingSpinner />
                    </div>
                ) : galleryImages.length > 0 ? (
                    <>
                        <img 
                            className="w-full h-auto max-h-80 object-contain rounded-lg shadow-md mb-2 md:mb-0" 
                            src={currentGalleryImageUrl} 
                            alt={`${currentCar.name} - Gambar ${currentGalleryIndex + 1}`} 
                        />
                        {galleryImages.length > 1 && (
                            <>
                                <button onClick={prevGalleryImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Gambar sebelumnya">‹</button>
                                <button onClick={nextGalleryImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Gambar berikutnya">›</button>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {currentGalleryIndex + 1} / {galleryImages.length}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                     <img className="w-full h-auto object-contain rounded-lg shadow-md mb-4 md:mb-0" src={currentCar.imageUrl} alt={currentCar.name} />
                )}
                 {galleryError && !isLoadingGallery && <p className="text-xs text-red-500 mt-1">{galleryError}</p>}
            </div>
            <div className="md:w-1/2">
                <h2 id="modal-title" className="text-3xl lg:text-4xl font-bold text-honda-red mb-2">{currentCar.name}</h2>
                <p className="text-md lg:text-lg text-gray-700 mb-1">{currentCar.tagline}</p>
                <p className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">{currentCar.priceEstimate}</p>
            </div>
        </div>
        
        {/* Thumbnails for gallery */}
        {galleryImages.length > 1 && !isLoadingGallery && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                {galleryImages.map((img, index) => (
                    <button key={img.id || index} onClick={() => setCurrentGalleryIndex(index)} className={`w-20 h-16 rounded-md overflow-hidden border-2 ${index === currentGalleryIndex ? 'border-honda-red' : 'border-transparent'} focus:outline-none`}>
                        <img 
                            src={imageService.getImageUrlFromMediaItem(img, 'thumbnail')} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        )}


        <div className="mt-8 space-y-4">
          {currentCar.engineSpecs && <p><strong className="text-gray-700 font-semibold">Mesin:</strong> {currentCar.engineSpecs}</p>}
          {currentCar.fuelEconomy && <p><strong className="text-gray-700 font-semibold">Konsumsi BBM:</strong> {currentCar.fuelEconomy}</p>}
          <div>
            <strong className="text-gray-700 font-semibold">Fitur Utama:</strong>
            <ul className="list-disc list-inside ml-4 text-gray-600 mt-1 space-y-1">
              {currentCar.keyFeatures.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h3 className="text-2xl font-semibold text-honda-gray mb-4">Deskripsi Model (AI):</h3>
          {isLoadingDescription && (
            <div className="flex flex-col items-center justify-center h-40">
              <LoadingSpinner />
              <p className="mt-3 text-gray-600">Memuat deskripsi dari AI...</p>
            </div>
          )}
          {descriptionError && !isLoadingDescription && (
             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{descriptionError}</span>
            </div>
          )}
          {!isLoadingDescription && !descriptionError && currentCar.aiDescription && (
            <>
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: currentCar.aiDescription.replace(/\n/g, '<br />') }}></div>
              <AIAttribution />
            </>
          )}
          {!isLoadingDescription && !descriptionError && !currentCar.aiDescription && (
            <p className="text-gray-500">Deskripsi AI untuk model ini belum tersedia atau sedang dimuat.</p>
          )}
        </div>

        {currentCar.additionalPostContent && (
          <div className="mt-8 border-t pt-8">
            <h3 className="text-2xl font-semibold text-honda-gray mb-4">Informasi Tambahan: {currentCar.additionalPostContent.title}</h3>
            <div 
              className="prose prose-sm sm:prose-base max-w-none text-gray-700" 
              dangerouslySetInnerHTML={{ __html: currentCar.additionalPostContent.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailModal;
