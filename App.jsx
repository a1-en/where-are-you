// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CountriesList from './components/CountriesList';
import SearchBar from './components/SearchBar';
import SelectMenu from './components/SelectMenu'; // Import SelectMenu
import './App.css'; // Ensure your CSS is imported here
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import countriesData from './countriesData'; // Adjust the path as needed

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedRegion, setSelectedRegion] = useState(''); // State for selected region

  // Toggle dark mode state
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Apply the dark class to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle search input changes
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle region selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  // Filter countries based on search query and selected region
  const filteredCountries = countriesData.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="app">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Search and Filter Container */}
      <div className="search-filter-container">
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <SelectMenu selectedRegion={selectedRegion} handleRegionSelect={handleRegionSelect} />
      </div>
      
      <main>
        <CountriesList countries={filteredCountries} />
      </main>
    </div>
  );
}

export default App;
