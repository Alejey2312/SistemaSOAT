import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import ArchivadoresTable from './ArchivadoresTable';
import AddArchivadorForm from './AddArchivadorForm';
import { FaPlus } from 'react-icons/fa';

const ArchivadoresList = ({ username }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [searchParams, setSearchParams] = useState({
    ht: '',
    apellido_nombre: '',
    carta_garantia: '',
    oficio: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const limit = 10; // Number of items per page

  const handleFetchSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get(`http://192.168.3.96:5000/api/suggestions?q=${query}`);
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
    if (name === 'apellido_nombre') {
      handleFetchSuggestions(value);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchParams(prevParams => ({ ...prevParams, apellido_nombre: suggestion.apellido_nombre }));
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchParams({
      ht: '',
      apellido_nombre: '',
      carta_garantia: '',
      oficio: ''
    });
    setData([]);
    setTotalResults(0);
    setCurrentPage(1);
    setMessage(null);
    setError(null);
  };

  const handleSearch = async (page) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    const offset = (page - 1) * limit;

    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('limit', limit);
    queryParams.set('offset', offset);

    try {
      const response = await axios.get(`http://192.168.3.96:5000/api/archivadores?${queryParams.toString()}`);
      setData(response.data.rows);
      setTotalResults(response.data.count);
      setCurrentPage(page);
      if (response.data.rows.length === 0) {
        setMessage('No se encontraron resultados.');
      } else {
        setMessage(`Se encontraron ${response.data.count} resultados.`);
      }
    } catch (err) {
      setError('Error al buscar los datos. Por favor, intente de nuevo.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'PAGADO' ? 'NO PAGADO' : 'PAGADO';
    try {
      await axios.put(`http://192.168.3.96:5000/api/archivadores/${id}/estado`, { estado: newStatus });
      
      const updatedData = data.map(item =>
        item.id === id ? { ...item, estado: newStatus } : item
      );
      setData(updatedData);
      
      showToast('Estado actualizado con éxito.');
    } catch (err) {
      console.error('Error al actualizar el estado:', err);
      showToast('Error al actualizar el estado.');
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await axios.delete(`http://192.168.3.96:5000/api/archivadores/${id}`);
      setData(data.filter(item => item.id !== id));
      setTotalResults(prev => prev - 1);
      showToast(`Registro eliminado exitosamente.`);
    } catch (err) {
      setError('Error al eliminar el registro. Por favor, inténtelo de nuevo.');
      console.error('Error al eliminar el registro:', err);
      showToast('Error al eliminar el registro.');
    }
  };

  const isSearchDisabled = Object.values(searchParams).every(param => param.trim() === '');
  
  const handleRecordAdded = () => {
    setShowAddForm(false);
    // Vuelve a cargar la tabla para mostrar el nuevo registro.
    handleSearch(1);
  };
  
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // El mensaje desaparece después de 3 segundos
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-blue-400">Buscador de Archivadores</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:scale-105"
            >
              <FaPlus /> Agregar
            </button>
          </div>

          {toastMessage && (
            <div className="fixed bottom-8 right-8 z-50 p-4 rounded-lg shadow-xl text-white bg-blue-600 animate-slide-in">
              {toastMessage}
            </div>
          )}

          <SearchForm
            searchParams={searchParams}
            handleInputChange={handleInputChange}
            handleSearch={() => handleSearch(1)}
            loading={loading}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            handleSelectSuggestion={handleSelectSuggestion}
            handleClearSearch={handleClearSearch}
            isSearchDisabled={isSearchDisabled}
          />

          {loading && (
            <div className="text-center mt-4 p-4 rounded-md text-blue-400">
              Cargando...
            </div>
          )}
          {error && (
            <div className="text-center mt-4 p-4 rounded-md text-red-400 bg-red-900/30">
              {error}
            </div>
          )}

          {data.length > 0 && (
            <ArchivadoresTable
              data={data}
              handleUpdateStatus={handleUpdateStatus}
              handleDeleteRecord={handleDeleteRecord}
              currentPage={currentPage}
              totalResults={totalResults}
              handlePageChange={handleSearch}
            />
          )}

          {data.length === 0 && !loading && !error && (
            <div className="text-center mt-4 p-4 rounded-lg bg-gray-700 text-gray-400">
              Usa los campos de arriba para buscar registros.
            </div>
          )}
        </div>
      </div>
      
      <AddArchivadorForm
        showForm={showAddForm}
        onCancel={() => setShowAddForm(false)}
        onRecordAdded={handleRecordAdded}
        onToastMessage={showToast}
      />
    </div>
  );
};

export default ArchivadoresList;
