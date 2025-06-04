import { useState, useEffect } from 'react';
import {
  fetchInscripciones,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion
} from '../api/inscripciones';

export default function InscripcionesTable({ uniId, facId, depId, matId, cursoId }) {
  const empty = {
    estudiante_id: '',
    fecha_inscripcion: '',
    estado: ''
  };

  const fields = [
    { key: 'estudiante_id',       label: 'Estudiante ID',    type: 'number' },
    { key: 'fecha_inscripcion',   label: 'Fecha Inscripción',type: 'date' },
    { key: 'estado',              label: 'Estado' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
    fetchInscripciones(uniId, facId, depId, matId, cursoId)
      .then(res => setList(res.data));
  useEffect(load, [uniId, facId, depId, matId, cursoId]);

  useEffect(() => {
    if (editingId != null) {
      const i = list.find(x => x.id === editingId);
      setForm({
        estudiante_id:     i.estudiante_id?.toString() || '',
        fecha_inscripcion: i.fecha_inscripcion.slice(0,10),
        estado:            i.estado || ''
      });
      setEnabled(fields.reduce((a,f)=>( { ...a, [f.key]: false }), {}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a,f)=>( { ...a, [f.key]: true }), {}));
    }
  }, [editingId, list]);

  const change = e => {
    const { name, type, value } = e.target;
    setForm(f=>({
      ...f,
      [name]: type==='checkbox' ? e.target.checked : value
    }));
  };
  const toggle = key => setEnabled(e=>({ ...e, [key]: !e[key] }));

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {};
    fields.forEach(({ key, type }) => {
      if (editingId===null || enabled[key]) {
        if (type==='number') {
          payload[key] = form[key] ? parseInt(form[key],10) : null;
        } else if (type==='date') {
          payload[key] = form[key] ? new Date(form[key]).toISOString() : null;
        } else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId!=null
      ? updateInscripcion(uniId, facId, depId, matId, cursoId, editingId, payload)
      : createInscripcion(uniId, facId, depId, matId, cursoId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar inscripción?')) {
      deleteInscripcion(uniId, facId, depId, matId, cursoId, id).then(load);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {fields.map(({ key, label, type }) => (
          <div key={key} className="flex items-start gap-2">
            {editingId!=null && (
              <input
                type="checkbox"
                checked={enabled[key]}
                onChange={()=>toggle(key)}
                className="form-checkbox h-5 w-5 text-blue-600 mt-2"
              />
            )}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">{label}</label>
              <input
                name={key}
                type={type}
                value={form[key]}
                onChange={change}
                disabled={!enabled[key]}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300 disabled:bg-gray-100"
              />
            </div>
          </div>
        ))}
        <button type="submit"
          className={`col-span-1 md:col-span-2 ${
            editingId!=null?'bg-yellow-500 hover:bg-yellow-600':'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 rounded`}
        >
          {editingId!=null?'Actualizar Inscripción':'Agregar Inscripción'}
        </button>
        {editingId!=null && (
          <button type="button" onClick={()=>setEditingId(null)}
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
              {['ID','Estudiante ID','Fecha','Estado','Acciones'].map(h=>(
                <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(i=>(
              <tr key={i.id} className="hover:bg-gray-100">
                <td className="px-3 py-2">{i.id}</td>
                <td className="px-3 py-2">{i.estudiante_id}</td>
                <td className="px-3 py-2">{i.fecha_inscripcion.slice(0,10)}</td>
                <td className="px-3 py-2">{i.estado||'—'}</td>
                <td className="px-3 py-2 space-x-2">
                  <button onClick={()=>setEditingId(i.id)} className="text-green-600">✎</button>
                  <button onClick={()=>handleDelete(i.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
