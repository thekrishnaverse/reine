import React, { useState, useEffect, useRef } from 'react';
import { HONDA_LOGO_URL } from '../constants';
import { Car } from '../types';

interface HeaderProps {
  cars: Car[];
  onCarNavigationClick: (car: Car) => void;
}

const Header: React.FC<HeaderProps> = ({ cars, onCarNavigationClick }) => {
  const [isModelsDropdownOpen, setIsModelsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleModelsDropdown = () => {
    setIsModelsDropdownOpen(prev => !prev);
  };

  const handleCarLinkClick = (car: Car) => {
    onCarNavigationClick(car);
    setIsModelsDropdownOpen(false); // Close dropdown after click
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModelsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-honda-gray-dark shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img className="h-8 w-auto mr-3" src={HONDA_LOGO_URL} alt="Honda Logo" />
            <span className="font-semibold text-2xl text-white tracking-tight">Honda Mobil Indonesia</span>
          </div>
          <nav className="relative" ref={dropdownRef}>
            {cars && cars.length > 0 && (
              <button
                onClick={toggleModelsDropdown}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-honda-red flex items-center"
                aria-haspopup="true"
                aria-expanded={isModelsDropdownOpen}
              >
                Model Mobil
                <svg 
                  className={`w-4 h-4 ml-2 transition-transform duration-200 ${isModelsDropdownOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            )}
            {isModelsDropdownOpen && cars && cars.length > 0 && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl py-1 z-50 max-h-96 overflow-y-auto"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="models-menu-button"
              >
                {cars.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleCarLinkClick(car)}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-honda-gray-light hover:text-honda-red transition-colors duration-150"
                    role="menuitem"
                  >
                    {car.name}
                  </button>
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;