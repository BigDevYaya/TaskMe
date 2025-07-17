import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SearchFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Category');
  const [render, setRender] = useState(false);

  const filters = ['Category', 'Price', 'Complexity'];

  const handleDropDown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setRender(true);
    }
  };

  const showDropDown = () => {
    setIsOpen(true);
    setRender(true);
  }

  const hideDropDown =  () => {
    setTimeout(() => {
      setIsOpen(false)
      setTimeout(() => setRender(false), 0)
    }, 0)
    
  }

  return (
    <div className="relative inline-block text-left">
      <button className="flex items-center gap-4" onMouseEnter={showDropDown}
      
      >
        Filter by {selectedFilter}{' '}
        <ChevronDown
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 z-50 w-40 md:w- ${
            isOpen ? 'animate-filter' : 'animate-filterUp'
          } transition-opacity duration-300 ${render || 'animate-filterUp'
          } bg-white rounded-lg shadow-md`}
          onMouseLeave={hideDropDown}
        >
          <ul className="py-2 px-4">
            {filters.map((filter, i) => (
              <li
                key={i}
                onClick={() => {
                  setSelectedFilter(filter);
                  setIsOpen(false);
                  setTimeout(() => setRender(false), 300);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedFilter === filter ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
