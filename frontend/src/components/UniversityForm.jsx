import { useState, useEffect } from 'react';

export default function UniversityForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    nombre: '',
    codigo: '',
    direccion: '',
    telefono: '',
    email: '',
    rector: '',
    fecha_fundacion: ''
  });

  const [enabled, setEnabled] = useState({
    nombre: false,
    codigo: false,
    direccion: false,
    telefono: false,
    email: false,
    rector: false,
    fecha_fundacion: false
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || '',
        codigo: initialData.codigo || '',
        direccion: initialData.direccion || '',
        telefono: initialData.telefono || '',
        email: initialData.email || '',
        rector: initialData.rector || '',
        fecha_fundacion: initialData.fecha_fundacion?.slice(0,10) || ''
      });
      setEnabled({
        nombre: false,
        codigo: false,
        direccion: false,
        telefono: false,
        email: false,
        rector: false,
        fecha_fundacion: false
      });
    } else {
      setEnabled({
        nombre: true,
        codigo: true,
        direccion: true,
        telefono: true,
        email: true,
        rector: true,
        fecha_fundacion: true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const toggleField = (field) => {
    setEnabled(e => ({ ...e, [field]: !e[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {};
    Object.keys(form).forEach((key) => {
      if (!initialData || enabled[key]) {
        if (key === 'fecha_fundacion') {
          dataToSend[key] = form[key]
            ? new Date(form[key]).toISOString()
            : null;
        } else {
          dataToSend[key] = form[key];
        }
      }
    });

    onSubmit(dataToSend);

    if (!initialData) {
      setForm({
        nombre: '',
        codigo: '',
        direccion: '',
        telefono: '',
        email: '',
        rector: '',
        fecha_fundacion: ''
      });
    }
  };

  const fields = [
    { key:'nombre', label:'Nombre' },
    { key:'codigo', label:'Código' },
    { key:'direccion', label:'Dirección' },
    { key:'telefono', label:'Teléfono' },
    { key:'email', label:'Email' },
    { key:'rector', label:'Rector' },
    { key:'fecha_fundacion', label:'Fecha Fundación', type:'date', full:true },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white text-gray-900 shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(field => (
        <div key={field.key} className={field.full ? 'col-span-1 md:col-span-2 flex items-center gap-2' : 'flex items-center gap-2'}>
          {initialData && (
            <input
              type="checkbox"
              checked={enabled[field.key]}
              onChange={() => toggleField(field.key)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          )}
          <div className={field.full ? 'flex-1' : 'flex-1'}>
            <label className="block text-sm font-semibold mb-1 text-gray-900">{field.label}</label>
            <input
              type={field.type || 'text'}
              name={field.key}
              value={form[field.key] || ''}
              onChange={handleChange}
              disabled={!enabled[field.key]}
              placeholder={field.label}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                enabled[field.key]
                  ? 'border-gray-300 focus:ring-blue-200'
                  : 'border-gray-200 bg-gray-100 cursor-not-allowed'
              }`}
            />
          </div>
        </div>
      ))}

      <button
        type="submit"
        className={`col-span-1 md:col-span-2 ${
          initialData ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-semibold py-2 rounded transition`}
      >
        {initialData ? 'Actualizar Universidad' : 'Agregar Universidad'}
      </button>
    </form>
  );
}
