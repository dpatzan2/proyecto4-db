import { useState, useEffect } from 'react';
import {
  fetchCursos,
  fetchCurso,
  createCurso,
  updateCurso,
  deleteCurso
} from '../api/cursos';
import { useNavigate } from 'react-router-dom';

export default function CursosTable({ uniId, facId, depId, matId }) {
const navigate = useNavigate();  
  const empty = {
    profesor_id: '',
    periodo_academico_id: '',
    seccion: '',
    cupos_maximos: '',
    cupos_disponibles: '',
    horario: '',
    aula: '',
    estado: ''
  };

  const fields = [
    { key: 'profesor_id',          label: 'Profesor ID',         type: 'number' },
    { key: 'periodo_academico_id', label: 'Periodo Académico ID', type: 'number' },
    { key: 'seccion',              label: 'Sección' },
    { key: 'cupos_maximos',        label: 'Cupos Máximos',       type: 'number' },
    { key: 'cupos_disponibles',    label: 'Cupos Disponibles',   type: 'number' },
    { key: 'horario',              label: 'Horario' },
    { key: 'aula',                 label: 'Aula' },
    { key: 'estado',               label: 'Estado' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
      fetchCursos(uniId, facId, depId, matId).then(res => setList(res.data));
  
    useEffect(() => {
      load();
    }, [uniId, facId, depId, matId]);

  useEffect(() => {
    if (editingId != null) {
      fetchCurso(uniId, facId, depId, matId, editingId)
        .then(res => {
          const c = res.data;
          setForm({
            profesor_id:         c.profesor_id?.toString() || '',
            periodo_academico_id:c.periodo_academico_id?.toString() || '',
            seccion:             c.seccion || '',
            cupos_maximos:       c.cupos_maximos?.toString() || '',
            cupos_disponibles:   c.cupos_disponibles?.toString() || '',
            horario:             c.horario || '',
            aula:                c.aula || '',
            estado:              c.estado || ''
          });
          setEnabled(fields.reduce((acc,f)=>( { ...acc, [f.key]: false } ), {}));
        });
    } else {
      setForm(empty);
      setEnabled(fields.reduce((acc,f)=>( { ...acc, [f.key]: true } ), {}));
    }
  }, [editingId]);

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
        if (type === 'number') {
          payload[key] = form[key] ? parseInt(form[key], 10) : null;
        } else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId != null
      ? updateCurso(uniId, facId, depId, matId, editingId, payload)
      : createCurso(uniId, facId, depId, matId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar curso?')) {
      deleteCurso(uniId, facId, depId, matId, id).then(load);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulario */}
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
                onChange={()=>toggle(key)}
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
          {editingId != null ? 'Actualizar Curso' : 'Agregar Curso'}
        </button>
        {editingId != null && (
          <button
            type="button"
            onClick={()=>setEditingId(null)}
            className="col-span-1 md:col-span-2 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {[
                'ID','Prof ID','Periodo ID','Sección','Cupos Mx','Cupos Disp',
                'Horario','Aula','Estado','Acciones'
              ].map(h => (
                <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(c => (
              <tr key={c.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{c.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.profesor_id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.periodo_academico_id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.seccion}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.cupos_maximos ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.cupos_disponibles ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.horario || '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.aula || '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{c.estado || '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={()=>setEditingId(c.id)} className="text-green-600">✎</button>
                  <button onClick={()=>handleDelete(c.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
