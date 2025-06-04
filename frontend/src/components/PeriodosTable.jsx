import { useState, useEffect } from 'react';
import { createPeriodo, updatePeriodo, deletePeriodo } from '../api/periodos';

export default function PeriodosTable({ uniId, periodos, reload }) {
  const emptyForm = {
    nombre: '',
    codigo: '',
    fecha_inicio: '',
    fecha_fin: '',
    fecha_inscripcion_inicio: '',
    fecha_inscripcion_fin: '',
    es_activo: false,
    tipo: ''
  };

  const [form, setForm] = useState(emptyForm);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fields = [
    { key:'nombre', label:'Nombre' },
    { key:'codigo', label:'Código' },
    { key:'fecha_inicio', label:'Fecha Inicio', type:'date' },
    { key:'fecha_fin', label:'Fecha Fin', type:'date' },
    { key:'fecha_inscripcion_inicio', label:'Inscrip. Inicio', type:'date' },
    { key:'fecha_inscripcion_fin', label:'Inscrip. Fin', type:'date' },
    { key:'tipo', label:'Tipo' },
  ];

  useEffect(() => {
    if (editingId != null) {
      const p = periodos.find(x => x.id === editingId);
      setForm({
        nombre: p.nombre,
        codigo: p.codigo,
        fecha_inicio: p.fecha_inicio.slice(0,10),
        fecha_fin: p.fecha_fin.slice(0,10),
        fecha_inscripcion_inicio: p.fecha_inscripcion_inicio.slice(0,10),
        fecha_inscripcion_fin: p.fecha_inscripcion_fin.slice(0,10),
        es_activo: p.es_activo,
        tipo: p.tipo
      });
      setEnabled(fields.reduce((acc, f) => ({ ...acc, [f.key]: false }), { es_activo: false }));
    } else {
      setForm(emptyForm);
      setEnabled(fields.reduce((acc, f) => ({ ...acc, [f.key]: true }), { es_activo: true }));
    }
  }, [editingId]);

  const toggleField = (key) => setEnabled(e => ({ ...e, [key]: !e[key] }));
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};

    fields.forEach(({key}) => {
      if (editingId === null || enabled[key]) {
        data[key] = ['fecha_inicio','fecha_fin','fecha_inscripcion_inicio','fecha_inscripcion_fin'].includes(key)
          ? new Date(form[key]).toISOString()
          : form[key];
      }
    });
    if (editingId === null || enabled.es_activo) {
      data.es_activo = form.es_activo;
    }

    const action = editingId != null
      ? updatePeriodo(uniId, editingId, data)
      : createPeriodo(uniId, data);

    action.then(() => {
      setEditingId(null);
      setForm(emptyForm);
      reload();
    });
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este periodo?')) {
      deletePeriodo(uniId, id).then(reload);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-900 shadow-md rounded-lg p-6 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {fields.map(({ key, label, type }) => (
          <div key={key} className="flex items-start gap-2">
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
                type={type || 'text'}
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

        <div className="flex items-center gap-2">
          {editingId != null && (
            <input
              type="checkbox"
              name="es_activo"
              checked={enabled.es_activo}
              onChange={() => toggleField('es_activo')}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          )}
          <label className="block text-sm font-semibold mb-1">Activo</label>
          <input
            type="checkbox"
            name="es_activo"
            checked={form.es_activo}
            onChange={handleChange}
            disabled={!enabled.es_activo}
            className={enabled.es_activo ? '' : 'cursor-not-allowed'}
          />
        </div>

        <button
          type="submit"
          className={`col-span-1 md:col-span-3 ${
            editingId != null ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold py-2 rounded transition`}
        >
          {editingId != null ? 'Actualizar Periodo' : 'Agregar Periodo'}
        </button>
        {editingId != null && (
          <button
            type="button"
            onClick={() => setEditingId(null)}
            className="col-span-1 md:col-span-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded transition"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {['ID','Nombre','Código','Inicio','Fin','Inscr. Ini','Inscr. Fin','Activo','Tipo','Acciones']
                .map(h => (
                  <th key={h} className="px-4 py-3 text-center text-sm font-semibold border border-gray-300">{h}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200 text-gray-900">
            {periodos.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{p.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.nombre}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.codigo}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.fecha_inicio.slice(0,10)}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.fecha_fin.slice(0,10)}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.fecha_inscripcion_inicio.slice(0,10)}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.fecha_inscripcion_fin.slice(0,10)}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.es_activo ? 'Sí' : 'No'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.tipo}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={() => setEditingId(p.id)} className="text-green-600">✎</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
