import React from 'react';

const ArchivadoresTable = ({ data, handleUpdateStatus, handleDeleteRecord, currentPage, totalResults, handlePageChange }) => {
  const limit = 10;
  const totalPages = Math.ceil(totalResults / limit);

  const getPaginationButtons = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + Math.ceil(maxPagesToShow / 2) >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxPagesToShow / 2);
        endPage = currentPage + Math.floor(maxPagesToShow / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-full font-semibold transition-colors duration-200 ${
            i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-blue-400 hover:bg-gray-600'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="bg-gray-700 p-4 rounded-xl shadow-inner overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-600">
        <thead className="bg-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">HT</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Apellido y Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha de Recepción</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Facturas</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Monto Total</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Carta de Garantía</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Oficio</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Archivador</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Eliminar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {data.map((archivador, index) => (
            <tr key={index} className="hover:bg-gray-600 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">{archivador.ht}</td>
              <td className="px-6 py-4 whitespace-nowrap">{archivador.apellido_nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleUpdateStatus(archivador.id, archivador.estado)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200 
                    ${archivador.estado?.toUpperCase().trim() === 'PAGADO' 
                      ? 'bg-green-500 text-green-900 hover:bg-green-600' 
                      : 'bg-red-500 text-red-900 hover:bg-red-600'}`
                  }
                >
                  {archivador.estado?.toUpperCase().trim() === 'PAGADO' ? 'PAGADO' : 'NO PAGADO'}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{archivador.fecha_recepcion.split('T')[0]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{archivador.facturas}</td>
              <td className="px-6 py-4 whitespace-nowrap">{archivador.monto_total}</td>
              <td className="px-6 py-4 whitespace-nowrap">{archivador.carta_garantia}</td>
              <td className="px-6 py-4 whitespace-nowrap">{archivador.oficio}</td>
              <td className="px-6 py-4 whitespace-nowrap">{archivador.archivador}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDeleteRecord(archivador.id)}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 rounded-full font-semibold bg-gray-700 text-blue-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Anterior
          </button>
          {getPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 rounded-full font-semibold bg-gray-700 text-blue-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ArchivadoresTable;
