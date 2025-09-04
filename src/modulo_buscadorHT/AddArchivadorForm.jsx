import React, { useState } from 'react';
import axios from 'axios';

const AddArchivadorForm = ({ onRecordAdded, onCancel, showForm, onToastMessage }) => {
  const [formData, setFormData] = useState({
    ht: '',
    fecha_recepcion: '',
    apellido_nombre: '',
    facturas: '',
    servicio: '',
    medicina: '',
    monto_total: '',
    fecha_facturacion: '',
    comentario: '',
    carta_garantia: '',
    fecha_oficio: '',
    oficio: '',
    archivador: '',
    estado: 'NO PAGADO'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://192.168.3.96:5000/api/archivadores', formData);
      console.log('Record added successfully:', response.data);
      onRecordAdded();
      onToastMessage('Registro agregado con éxito.');
      setFormData({
        ht: '',
        fecha_recepcion: '',
        apellido_nombre: '',
        facturas: '',
        servicio: '',
        medicina: '',
        monto_total: '',
        fecha_facturacion: '',
        comentario: '',
        carta_garantia: '',
        fecha_oficio: '',
        oficio: '',
        archivador: '',
        estado: 'NO PAGADO'
      });
    } catch (err) {
      console.error('Error al agregar el registro:', err.response?.data || err.message);
      setError('Error al agregar el registro. Por favor, inténtelo de nuevo.');
      onToastMessage('Error al agregar el registro.');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return null;
  }

  const inputStyle = "w-full p-3 bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";
  const labelStyle = "block text-gray-400 font-semibold mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-700">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-full bg-gray-700 hover:bg-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Agregar Nuevo Archivador</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="ht" className={labelStyle}>HT</label>
            <input
              type="text"
              id="ht"
              name="ht"
              value={formData.ht}
              onChange={handleInputChange}
              pattern="\d*"
              inputMode="numeric"
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="apellido_nombre" className={labelStyle}>Apellido y Nombre</label>
            <input
              type="text"
              id="apellido_nombre"
              name="apellido_nombre"
              value={formData.apellido_nombre}
              onChange={handleInputChange}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="fecha_recepcion" className={labelStyle}>Fecha de Recepción</label>
            <input
              type="date"
              id="fecha_recepcion"
              name="fecha_recepcion"
              value={formData.fecha_recepcion}
              onChange={handleInputChange}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="facturas" className={labelStyle}>Facturas</label>
            <input
              type="text"
              id="facturas"
              name="facturas"
              value={formData.facturas}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="servicio" className={labelStyle}>Servicio</label>
            <input
              type="text"
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="medicina" className={labelStyle}>Medicina</label>
            <input
              type="text"
              id="medicina"
              name="medicina"
              value={formData.medicina}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="monto_total" className={labelStyle}>Monto Total</label>
            <input
              type="text"
              id="monto_total"
              name="monto_total"
              value={formData.monto_total}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="fecha_facturacion" className={labelStyle}>Fecha de Facturación</label>
            <input
              type="date"
              id="fecha_facturacion"
              name="fecha_facturacion"
              value={formData.fecha_facturacion}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="comentario" className={labelStyle}>Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              value={formData.comentario}
              onChange={handleInputChange}
              className={`${inputStyle} h-20`}
            ></textarea>
          </div>
          <div>
            <label htmlFor="carta_garantia" className={labelStyle}>Carta de Garantía</label>
            <input
              type="text"
              id="carta_garantia"
              name="carta_garantia"
              value={formData.carta_garantia}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="fecha_oficio" className={labelStyle}>Fecha de Oficio</label>
            <input
              type="date"
              id="fecha_oficio"
              name="fecha_oficio"
              value={formData.fecha_oficio}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="oficio" className={labelStyle}>Oficio</label>
            <input
              type="text"
              id="oficio"
              name="oficio"
              value={formData.oficio}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="archivador" className={labelStyle}>Archivador</label>
            <input
              type="text"
              id="archivador"
              name="archivador"
              value={formData.archivador}
              onChange={handleInputChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="estado" className={labelStyle}>Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className={inputStyle}
            >
              <option value="NO PAGADO">NO PAGADO</option>
              <option value="PAGADO">PAGADO</option>
            </select>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:scale-105 disabled:bg-green-600/50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {loading ? 'Agregando...' : 'Agregar Archivador'}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-center mt-4 p-3 rounded-md text-red-400 bg-red-900/30">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddArchivadorForm;
