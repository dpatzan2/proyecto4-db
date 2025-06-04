import { useState, useEffect } from 'react';
import {
  fetchMaterias,
  createMateria,
  updateMateria,
  deleteMateria
} from '../api/materias';
import { useNavigate } from 'react-router-dom';

export default function MateriasTable({ uniId, facId, depId }) {
    const navigate = useNavigate();  
  const empty = {
    nombre: '',
    codigo: '',
    creditos: '',
    horas_teoricas: '',
    horas_practicas: '',
    descripcion: '',
    es_obligatoria: false,
    semestre_sugerido: ''
  };

  const fields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'codigo', label: 'Código' },
    { key: 'creditos', label: 'Créditos' },
    { key: 'horas_teoricas', label: 'Horas Teóricas' },
    { key: 'horas_practicas', label: 'Horas Prácticas' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'es_obligatoria', label: 'Obligatoria', type: 'checkbox' },
    { key: 'semestre_sugerido', label: 'Semestre', type: 'number' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
      fetchMaterias(uniId, facId, depId).then(res => setList(res.data));
  
  useEffect(() => {
      load();
  }, [uniId, facId, depId]);

  useEffect(() => {
    if (editingId != null) {
      const m = list.find(x => x.id === editingId);
      setForm({
        nombre: m.nombre,
        codigo: m.codigo,
        creditos: m.creditos != null ? String(m.creditos) : '',
        horas_teoricas: m.horas_teoricas != null ? String(m.horas_teoricas) : '',
        horas_practicas: m.horas_practicas != null ? String(m.horas_practicas) : '',
        descripcion: m.descripcion || '',
        es_obligatoria: Boolean(m.es_obligatoria),
        semestre_sugerido: m.semestre_sugerido != null ? String(m.semestre_sugerido) : ''
      });
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:false}),{}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:true}),{}));
    }
  }, [editingId, list]);

  const change = e => {
    const { name, type, value, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const toggle = key => setEnabled(e => ({ ...e, [key]: !e[key] }));

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {};
    fields.forEach(({ key, type }) => {
      if (editingId === null || enabled[key]) {
        if (type === 'checkbox') {
          payload[key] = form[key];
        } else if (['creditos','horas_teoricas','horas_practicas','semestre_sugerido'].includes(key)) {
          payload[key] = form[key] ? parseInt(form[key], 10) : null;
        } else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId != null
      ? updateMateria(uniId, facId, depId, editingId, payload)
      : createMateria(uniId, facId, depId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar materia?')) {
      deleteMateria(uniId, facId, depId, id).then(load);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {fields.map(({ key, label, type }) => (
          <div key={key} className="flex items-start gap-2">
            {editingId != null && (
              <input
                type="checkbox"
                checked={enabled[key]}
                onChange={() => toggle(key)}
                className="form-checkbox h-5 w-5 text-blue-600 mt-2"
              />
            )}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">{label}</label>
              <input
                name={key}
                type={type || 'text'}
                {...(type === 'checkbox'
                    ? { checked: form[key] }
                    : { value: form[key] })}
                onChange={change}
                disabled={!enabled[key]}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300 disabled:bg-gray-100"
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className={`col-span-1 md:col-span-2 ${
            editingId!=null ? 'bg-yellow-500' : 'bg-blue-500'
          } text-white py-2 rounded`}
        >
          {editingId != null ? 'Actualizar Materia' : 'Agregar Materia'}
        </button>
        {editingId != null && (
          <button
            type="button"
            onClick={() => setEditingId(null)}
            className="col-span-1 md:col-span-2 bg-gray-400 text-white py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {[
                'ID','Nombre','Código','Créditos','Horas T.',
                'Horas P.','Descripción','Obligatoria','Semestre','Acciones'
              ].map(h => (
                <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(m => (
              <tr key={m.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{m.id}</td>
                <td
                  className="px-4 py-3 text-center text-blue-600 underline cursor-pointer border border-gray-300"
                  onClick={() => navigate(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/materias/${m.id}`)}
                >
                  {m.nombre}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">{m.codigo}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{m.creditos ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{m.horas_teoricas ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{m.horas_practicas ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{m.descripcion || '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  {m.es_obligatoria ? '✔' : '✘'}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">{m.semestre_sugerido ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={()=>setEditingId(m.id)} className="text-green-600">✎</button>
                  <button onClick={()=>handleDelete(m.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
