import { useState, useEffect } from 'react';
import { fetchDepartamentos, createDepartamento, updateDepartamento, deleteDepartamento } from '../api/departamentos';
import { useNavigate } from 'react-router-dom';

export default function DepartamentosTable({ uniId, facId }) {
  const navigate = useNavigate();  

  const empty = {
    nombre: '',
    codigo: '',
    jefe_departamento: '',
    telefono: '',
    email: '',
    presupuesto: ''
  };

  const fields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'codigo', label: 'Código' },
    { key: 'jefe_departamento', label: 'Jefe' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'email', label: 'Email' },
    { key: 'presupuesto', label: 'Presupuesto' },
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
    fetchDepartamentos(uniId, facId).then(res => setList(res.data));

  useEffect(() => {
    if (editingId != null) {
      const d = list.find(x => x.id === editingId);
      setForm({
        nombre: d.nombre,
        codigo: d.codigo,
        jefe_departamento: d.jefe_departamento||'',
        telefono: d.telefono||'',
        email: d.email||'',
        presupuesto: d.presupuesto ?? ''
      });
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:false}),{}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:true}),{}));
    }
  }, [editingId, list]);

  const toggle = k => setEnabled(e=>({...e,[k]:!e[k]}));
  const change = e => {
    const { name, value } = e.target;
    setForm(f=>({...f,[name]:value}));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {};
    fields.forEach(({key}) => {
      if (editingId===null || enabled[key]) {
        payload[key] = key==='presupuesto'
          ? (form[key]? parseFloat(form[key]): null)
          : form[key];
      }
    });
    const action = editingId!=null
      ? updateDepartamento(uniId, facId, editingId, payload)
      : createDepartamento(uniId, facId, payload);
    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    }); 
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar departamento?')) {
      deleteDepartamento(uniId, facId, id).then(load);
    }
  };

    useEffect(() => {
        load();
    }, [uniId, facId]);

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-900 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {fields.map(({key,label})=>(
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
            editingId!=null?'bg-yellow-500 hover:bg-yellow-600':'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold py-2 rounded`}
        >
          {editingId!=null?'Actualizar Departamento':'Agregar Departamento'}
        </button>
        {editingId!=null && (
          <button
            type="button"
            onClick={()=>setEditingId(null)}
            className="col-span-1 md:col-span-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {['ID','Nombre','Código','Jefe','Teléfono','Email','Presupuesto','Acciones']
                .map(h=>(
                  <th key={h} className="px-4 py-3 text-center text-sm font-semibold border border-gray-300">{h}</th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200 text-gray-900">
            {list.map(d=>(
              <tr key={d.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{d.id}</td>
                <td
                  className="px-4 py-3 text-center text-blue-600 underline cursor-pointer border border-gray-300"
                  onClick={() => navigate(`/universidades/${uniId}/facultades/${facId}/departamentos/${d.id}`)}
                >
                  {d.nombre}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.codigo}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.jefe_departamento||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.telefono||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.email||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.presupuesto??'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={()=>setEditingId(d.id)} className="text-green-600">✎</button>
                  <button onClick={()=>handleDelete(d.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  );
}
