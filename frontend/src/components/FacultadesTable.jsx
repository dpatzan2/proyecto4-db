import { useState, useEffect } from 'react';
import { createFacultad, updateFacultad, deleteFacultad } from '../api/facultades';
import { useNavigate } from 'react-router-dom';

export default function FacultadesTable({ uniId, facultades, reload }) {
  const navigate = useNavigate();  
  const emptyForm = {
    nombre: '',
    codigo: '',
    decano: '',
    telefono: '',
    email: '',
    presupuesto_anual: ''
  };

  const [form, setForm] = useState(emptyForm);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'codigo', label: 'Código' },
    { key: 'decano', label: 'Decano' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'email', label: 'Email' },
    { key: 'presupuesto_anual', label: 'Presupuesto Anual' },
  ];

  useEffect(() => {
    if (editingId != null) {
      const f = facultades.find(f => f.id === editingId);
      setForm({
        nombre: f.nombre,
        codigo: f.codigo,
        decano: f.decano || '',
        telefono: f.telefono || '',
        email: f.email || '',
        presupuesto_anual: f.presupuesto_anual ?? ''
      });
      setEnabled(fields.reduce((acc, {key}) => ({...acc, [key]: false}), {}));
    } else {
      setForm(emptyForm);
      setEnabled(fields.reduce((acc, {key}) => ({...acc, [key]: true}), {}));
    }
  }, [editingId]);

  const toggleField = (key) => {
    setEnabled(e => ({ ...e, [key]: !e[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const payload = {};

  fields.forEach(({ key }) => {
    if (editingId === null || enabled[key]) {
      payload[key] = key === 'presupuesto_anual'
        ? (form[key] ? parseFloat(form[key]) : null)
        : form[key];
    }
  });

  const promise = editingId != null
    ? updateFacultad(uniId, editingId, payload)
    : createFacultad(uniId, payload);

  promise.then(() => {
    setEditingId(null);
    setForm(emptyForm);
    reload();
  });
};


  const handleDelete = (id) => {
    if (confirm('¿Eliminar esta facultad?')) {
      deleteFacultad(uniId, id).then(reload);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-900 shadow-md rounded-lg p-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {fields.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-start gap-2"
          >
            {editingId != null && (
              <input
                type="checkbox"
                checked={enabled[key]}
                onChange={() => toggleField(key)}
                className="form-checkbox h-5 w-5 text-blue-600 mt-2"
              />
            )}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">{label}</label>
              <input
                type="text"
                name={key}
                value={form[key]}
                onChange={handleChange}
                disabled={!enabled[key]}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                  enabled[key]
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
            editingId != null ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold py-2 rounded transition`}
        >
          {editingId != null ? 'Actualizar Facultad' : 'Agregar Facultad'}
        </button>
        {editingId != null && (
          <button
            type="button"
            onClick={() => setEditingId(null)}
            className="col-span-1 md:col-span-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded transition"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {['ID','Nombre','Código','Decano','Teléfono','Email','Presupuesto','Acciones']
                .map(h => (
                  <th key={h} className="px-4 py-3 text-center text-sm font-semibold border border-gray-300">{h}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200 text-gray-900">
            {facultades.map(f => (
              <tr key={f.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{f.id}</td>
                <td
                  className="px-4 py-3 text-center text-blue-600 underline cursor-pointer border border-gray-300"
                  onClick={() => navigate(`/universidades/${uniId}/facultades/${f.id}`)}
                >
                  {f.nombre}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">{f.codigo}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{f.decano || '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{f.telefono || '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{f.email || '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{f.presupuesto_anual ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={() => setEditingId(f.id)} className="text-green-600">✎</button>
                  <button onClick={() => handleDelete(f.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
