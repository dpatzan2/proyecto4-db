import { useState, useEffect } from 'react';
import {
  fetchCarreras,
  createCarrera,
  updateCarrera,
  deleteCarrera
} from '../api/carreras';
import { useNavigate } from 'react-router-dom';

export default function CarrerasTable({ uniId, facId, depId }) {
const navigate = useNavigate();  
  const empty = {
    nombre: '',
    codigo: '',
    duracion_semestres: '',
    creditos_requeridos: '',
    modalidad: '',
    titulo_otorgado: '',
    coordinador: ''
  };

  const fields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'codigo', label: 'Código' },
    { key: 'duracion_semestres', label: 'Duración (semestres)' },
    { key: 'creditos_requeridos', label: 'Créditos Requeridos' },
    { key: 'modalidad', label: 'Modalidad' },
    { key: 'titulo_otorgado', label: 'Título Otorgado' },
    { key: 'coordinador', label: 'Coordinador' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
    fetchCarreras(uniId, facId, depId).then(res => setList(res.data));

  useEffect(() => {
    load();
  }, [uniId, facId, depId]);

  useEffect(() => {
    if (editingId != null) {
      const c = list.find(x => x.id === editingId);
      setForm({
        nombre: c.nombre,
        codigo: c.codigo,
        duracion_semestres: c.duracion_semestres ?? '',
        creditos_requeridos: c.creditos_requeridos ?? '',
        modalidad: c.modalidad || '',
        titulo_otorgado: c.titulo_otorgado || '',
        coordinador: c.coordinador || ''
      });
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:false}),{}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:true}),{}));
    }
  }, [editingId, list]);

  const change = e => {
    const { name, value } = e.target;
    setForm(f=>({...f,[name]: value}));
  };
  const toggle = k => setEnabled(e=>({...e,[k]:!e[k]}));

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {};
    fields.forEach(({key}) => {
      if (editingId===null || enabled[key]) {
        if (['duracion_semestres','creditos_requeridos'].includes(key)) {
          payload[key] = form[key] ? parseInt(form[key],10) : null;
        } else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId != null
      ? updateCarrera(uniId, facId, depId, editingId, payload)
      : createCarrera(uniId, facId, depId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar carrera?')) {
      deleteCarrera(uniId, facId, depId, id).then(load);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {fields.map(({key,label}) => (
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
                value={form[key]}
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
            editingId!=null?'bg-yellow-500':'bg-blue-500'
          } text-white py-2 rounded`}
        >
          {editingId!=null?'Actualizar Carrera':'Agregar Carrera'}
        </button>
        {editingId!=null && (
          <button
            type="button"
            onClick={()=>setEditingId(null)}
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
              {['ID','Nombre','Código','Duración','Créditos','Modalidad','Título','Coordinador','Acciones']
                .map(h=>(
                  <th key={h} className="px-4 py-2 text-left text-sm font-semibold">{h}</th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(c=>(
              <tr key={c.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{c.id}</td>
                <td
                  className="px-4 py-3 text-center text-blue-600 underline cursor-pointer border border-gray-300"
                  onClick={() => navigate(`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}/carreras/${c.id}`)}
                >
                  {c.nombre}
                </td>
                <td className="px-4 py-2">{c.codigo}</td>
                <td className="px-4 py-2">{c.duracion_semestres}</td>
                <td className="px-4 py-2">{c.creditos_requeridos}</td>
                <td className="px-4 py-2">{c.modalidad || '—'}</td>
                <td className="px-4 py-2">{c.titulo_otorgado || '—'}</td>
                <td className="px-4 py-2">{c.coordinador || '—'}</td>
                <td className="px-4 py-2 space-x-2">
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
