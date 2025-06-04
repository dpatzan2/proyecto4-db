import { useState, useEffect } from 'react';
import {
  fetchPlanes,
  createPlan,
  updatePlan,
  deletePlan
} from '../api/plan_estudios';

export default function PlanTable({ uniId, facId, depId, carId }) {
  const empty = {
    materia_id: '',
    semestre_sugerido: '',
    es_obligatoria: false,
    grupo: ''
  };

  const fields = [
    { key: 'materia_id',         label: 'Materia ID',        type: 'number' },
    { key: 'semestre_sugerido',  label: 'Semestre Sugerido', type: 'number' },
    { key: 'es_obligatoria',     label: 'Obligatoria',       type: 'checkbox' },
    { key: 'grupo',              label: 'Grupo' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

      const load = () =>
          fetchPlanes(uniId, facId, depId, carId).then(res => setList(res.data));
  
      useEffect(() => {
          load();
      }, [uniId, facId, depId, carId]);

  useEffect(() => {
    if (editingId != null) {
      const p = list.find(x => x.id === editingId);
      setForm({
        materia_id:        p.materia_id != null ? String(p.materia_id) : '',
        semestre_sugerido: p.semestre_sugerido != null ? String(p.semestre_sugerido) : '',
        es_obligatoria:    Boolean(p.es_obligatoria),
        grupo:             p.grupo || ''
      });
      setEnabled(fields.reduce((a,f) => ({ ...a, [f.key]: false }), {}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a,f) => ({ ...a, [f.key]: true }), {}));
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
        } else if (type === 'number') {
          payload[key] = form[key] ? parseInt(form[key], 10) : null;
        } else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId != null
      ? updatePlan(uniId, facId, depId, carId, editingId, payload)
      : createPlan(uniId, facId, depId, carId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar plan de estudios?')) {
      deletePlan(uniId, facId, depId, carId, id).then(load);
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
            editingId != null ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 rounded`}
        >
          {editingId != null ? 'Actualizar Plan' : 'Agregar Plan'}
        </button>
        {editingId != null && (
          <button
            type="button"
            onClick={() => setEditingId(null)}
            className="col-span-1 md:col-span-2 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {['ID','Materia ID','Semestre','Obligatoria','Grupo','Acciones']
                .map(h => (
                  <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{p.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.materia_id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.semestre_sugerido ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.es_obligatoria ? '✔' : '✘'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.grupo || '—'}</td>
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
