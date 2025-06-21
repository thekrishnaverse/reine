import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails }) => {
  const handleViewDetailsClick = () => {
    onViewDetails(car);
  };

  const WHATSAPP_NUMBER = '6281289998402'; // WhatsApp Number
  const handleWhatsAppClick = () => {
    const message = `Halo, saya tertarik dengan mobil ${car.name}. Bisa minta informasi lebih lanjut?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const genericPlaceholder = `https://picsum.photos/seed/default-car-placeholder/400/225`;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <img 
        className="w-full h-56 object-cover" 
        src={car.imageUrl} 
        alt={car.name} 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          // Prevent infinite loop if generic placeholder also fails
          if (target.src !== genericPlaceholder) {
             target.src = genericPlaceholder;
             target.alt = `${car.name} (gambar tidak tersedia)`;
          } else {
            // If even the generic placeholder fails, just show alt text
            target.alt = `${car.name} (placeholder gambar juga tidak tersedia)`;
          }
        }}
        />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-honda-gray mb-1">{car.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{car.tagline}</p>
        
        {/* WhatsApp Button - Positioned under title/tagline */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center mb-4"
          aria-label={`Hubungi via WhatsApp mengenai ${car.name}`}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/>
          </svg>
          Hubungi via WhatsApp
        </button>

        <p className="text-lg font-semibold text-honda-red mb-4">{car.priceEstimate}</p>
        
        <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-1">Fitur Utama:</h4>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                {car.keyFeatures.slice(0, 3).map(feature => <li key={feature}>{feature}</li>)}
                 {car.keyFeatures.length > 3 && <li className="text-gray-500">...dan lainnya</li>}
            </ul>
        </div>

        {/* "Lihat Detail" Button - Stays at the bottom */}
        <div className="mt-auto"> 
            <button
              onClick={handleViewDetailsClick}
              className="w-full bg-honda-red hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label={`Lihat detail untuk ${car.name}`}
            >
              Lihat Detail
            </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;