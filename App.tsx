import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CarCard from '@/components/CarCard'; // Changed to use @/ alias
import CarDetailModal from './components/CarDetailModal';
import LoadingSpinner from './components/LoadingSpinner';
import HeroSlider from './components/HeroSlider'; // Import HeroSlider
import { Car } from './types';
import { INITIAL_CARS } from './constants';
import * as imageService from './services/imageService';
import * as postService from './services/postService';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS); // Starts with placeholders
  const [isLoadingInitialData, setIsLoadingInitialData] = useState<boolean>(true);
  const [initialDataError, setInitialDataError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoadingInitialData(true);
      setInitialDataError(null);
      
      try {
        // Fetch car card images and post content concurrently
        const [carsWithImages, carsWithPosts] = await Promise.all([
          imageService.fetchAndMapCarImages(INITIAL_CARS).catch(e => {
            console.error("Image service error (fetchAndMapCarImages):", e);
            setInitialDataError(prev => prev ? `${prev} Gagal memuat gambar mobil.` : "Gagal memuat gambar mobil.");
            return INITIAL_CARS; // Return initial cars with placeholders on error
          }),
          postService.fetchAndMapCarPosts(INITIAL_CARS).catch(e => {
            console.error("Post service error (fetchAndMapCarPosts):", e);
            setInitialDataError(prev => prev ? `${prev} Gagal memuat info tambahan.` : "Gagal memuat info tambahan.");
            return INITIAL_CARS; // Return initial cars as fallback for post data
          })
        ]);
        
        // Merge the results. `carsWithImages` has updated imageUrls.
        // `carsWithPosts` has updated `additionalPostContent`.
        // We need to combine these onto a single set of car objects.
        const mergedCars = INITIAL_CARS.map(initialCar => {
          const carWithImageData = carsWithImages.find(c => c.id === initialCar.id) || initialCar;
          const carWithPostData = carsWithPosts.find(c => c.id === initialCar.id) || initialCar;
          return {
            ...initialCar,
            imageUrl: carWithImageData.imageUrl,
            additionalPostContent: carWithPostData.additionalPostContent,
            // Ensure aiDescription from state is preserved if already fetched for some cars (though unlikely at this stage)
            aiDescription: cars.find(c => c.id === initialCar.id)?.aiDescription || initialCar.aiDescription, 
          };
        });
        
        setCars(mergedCars);

      } catch (err: any) {
        console.error("Failed to load initial data:", err);
        setInitialDataError(prev => prev || "Gagal memuat data awal. Beberapa fitur mungkin tidak berfungsi dengan benar.");
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    loadInitialData();
  }, []); // Empty dependency array means this runs once on mount

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCar(null), 300); 
  };

  const updateCarWithAIDescription = (carId: string, description: string) => {
    const updatedCars = cars.map(c => 
      c.id === carId ? { ...c, aiDescription: description } : c
    );
    setCars(updatedCars);
    if (selectedCar && selectedCar.id === carId) {
      setSelectedCar(prevCar => prevCar ? {...prevCar, aiDescription: description} : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        cars={cars} 
        onCarNavigationClick={handleViewDetails} 
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <HeroSlider /> {/* Uses placeholder images */}

        <section id="models">
          <h2 className="text-3xl font-bold text-honda-gray text-center mb-10">Model Terbaru Honda</h2>
          
          {isLoadingInitialData && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <LoadingSpinner size="h-16 w-16" />
              <p className="text-lg text-gray-600 mt-4">Memuat model mobil...</p>
            </div>
          )}

          {initialDataError && !isLoadingInitialData && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
              <p className="font-bold">Informasi:</p>
              <p>{initialDataError}</p>
              <p>Beberapa gambar atau informasi tambahan mungkin tidak tersedia. Menggunakan data placeholder.</p>
            </div>
          )}
          
          {process.env.API_KEY === undefined && ( 
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
                <p className="font-bold">Perhatian:</p>
                <p>Fitur deskripsi AI mungkin tidak berfungsi karena API Key belum dikonfigurasi.</p>
              </div>
            )}

          {!isLoadingInitialData && cars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map(car => (
                <CarCard key={car.id} car={car} onViewDetails={handleViewDetails} />
              ))}
            </div>
          )}
           {!isLoadingInitialData && cars.length === 0 && !initialDataError && (
              <div className="text-center py-10">
                  <p className="text-lg text-gray-600">Tidak ada model mobil yang tersedia saat ini.</p>
              </div>
           )}
        </section>
      </main>
      <Footer />

      {selectedCar && (
        <CarDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          car={selectedCar}
          onAIDescriptionFetched={updateCarWithAIDescription}
        />
      )}
    </div>
  );
};

export default App;