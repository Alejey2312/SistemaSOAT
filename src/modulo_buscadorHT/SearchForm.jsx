import React from 'react';

const SearchForm = ({
  searchParams,
  handleInputChange,
  handleSearch,
  loading,
  suggestions,
  showSuggestions,
  handleSelectSuggestion,
  handleClearSearch,
  isSearchDisabled
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSearchDisabled) {
      handleSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <input
        type="text"
        name="ht"
        placeholder="Buscar por HT"
        value={searchParams.ht}
        onChange={handleInputChange}
        className="flex-1 p-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex-1 relative">
        <input
          type="text"
          name="apellido_nombre"
          placeholder="Buscar por Apellido y Nombre"
          value={searchParams.apellido_nombre}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="p-3 text-gray-200 hover:bg-gray-500 cursor-pointer"
              >
                {suggestion.apellido_nombre}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="text"
        name="carta_garantia"
        placeholder="Buscar por Carta de Garantía"
        value={searchParams.carta_garantia}
        onChange={handleInputChange}
        className="flex-1 p-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="oficio"
        placeholder="Buscar por Oficio"
        value={searchParams.oficio}
        onChange={handleInputChange}
        className="flex-1 p-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || isSearchDisabled}
          className={`
            px-6 py-3 rounded-lg font-bold text-white transition-all duration-300
            ${loading || isSearchDisabled
              ? 'bg-blue-600/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105'
            }
          `}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.035 21H7.965a2 2 0 01-1.998-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
