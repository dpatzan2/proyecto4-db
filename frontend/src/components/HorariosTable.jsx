import { useState, useEffect } from 'react';
import {
  fetchHorarios,
  createHorario,
  updateHorario,
  deleteHorario
} from '../api/horarios';

export default function HorariosTable({ uniId, facId, depId, matId, cursoId }) {
  const empty = {
    aula_id: '',
    dia_semana: '',
    hora_inicio: '',
    hora_fin: ''
  };

  const fields = [
    { key: 'aula_id',    label: 'Aula ID',    type: 'number' },
    { key: 'dia_semana', label: 'Día Semana' },
    { key: 'hora_inicio',label: 'Hora Inicio', type: 'datetime-local' },
    { key: 'hora_fin',   label: 'Hora Fin',    type: 'datetime-local' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
    fetchHorarios(uniId, facId, depId, matId, cursoId)
      .then(res => setList(res.data));
  useEffect(load, [uniId, facId, depId, matId, cursoId]);

  useEffect(() => {
    if (editingId != null) {
      fetchHorario(uniId, facId, depId, matId, cursoId, editingId)
        .then(res => {
          const h = res.data;
          setForm({
            aula_id:     h.aula_id?.toString() || '',
            dia_semana:  h.dia_semana || '',
            hora_inicio: h.hora_inicio.slice(0,16),
            hora_fin:    h.hora_fin.slice(0,16)
          });
          setEnabled(fields.reduce((a,f)=>( { ...a, [f.key]: false }), {}));
        });
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a,f)=>( { ...a, [f.key]: true }), {}));
    }
  }, [editingId]);

  const change = e => {
    const { name, type, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const toggle = key => setEnabled(e => ({ ...e, [key]: !e[key] }));

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {};
    fields.forEach(({ key, type }) => {
      if (editingId===null || enabled[key]) {
        if (type === 'number') {
          payload[key] = form[key] ? parseInt(form[key],10) : null;
        } else if (type === 'datetime-local') {
          payload[key] = form[key] ? new Date(form[key]).toISOString() : null;
        } else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId!=null
      ? updateHorario(uniId, facId, depId, matId, cursoId, editingId, payload)
      : createHorario(uniId, facId, depId, matId, cursoId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar horario?')) {
      deleteHorario(uniId, facId, depId, matId, cursoId, id).then(load);
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
          {editingId!=null?'Actualizar Horario':'Agregar Horario'}
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
              {['ID','Aula ID','Día','Inicio','Fin','Acciones']
                .map(h=>(
                  <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(h=>(
              <tr key={h.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{h.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{h.aula_id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{h.dia_semana}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{h.hora_inicio.slice(0,16).replace('T',' ')}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{h.hora_fin.slice(0,16).replace('T',' ')}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={()=>setEditingId(h.id)} className="text-green-600">✎</button>
                  <button onClick={()=>handleDelete(h.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
