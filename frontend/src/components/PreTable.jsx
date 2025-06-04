import { useState, useEffect } from 'react';
import {
  fetchPre,
  createPre,
  deletePre
} from '../api/prerrequisitos';

export default function PrerrequisitosTable({ uniId, facId, depId, matId }) {
  const empty = {
    prerrequisito_id: '',
    es_correquisito: false
  };

  const fields = [
    { key: 'prerrequisito_id', label: 'Prerrequisito ID', type: 'number' },
    { key: 'es_correquisito',   label: 'Correquisito',     type: 'checkbox' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);

const load = () =>
    fetchPre(uniId, facId, depId, matId).then(res => setList(res.data));

  useEffect(() => {
    load();
  }, [uniId, facId, depId, matId]);

  const change = e => {
    const { name, type, value, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      prerrequisito_id: form.prerrequisito_id ? parseInt(form.prerrequisito_id, 10) : null,
      es_correquisito:  form.es_correquisito
    };
    createPre(uniId, facId, depId, matId, payload).then(() => {
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar prerrequisito?')) {
      deletePre(uniId, facId, depId, matId, id).then(load);
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
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">{label}</label>
              <input
                name={key}
                type={type}
                {...(type === 'checkbox'
                    ? { checked: form[key] }
                    : { value: form[key] })}
                onChange={change}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Agregar Prerrequisito
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {['ID','Prerrequisito ID','Correquisito','Acciones'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{p.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.prerrequisito_id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.es_correquisito ? '✔' : '✘'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
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
