import { useState, useEffect } from 'react';
import { fetchAulas, createAula, updateAula,deleteAula } from '../api/aulas';
const numberKeys = ['capacidad', 'piso'];

export default function AulasTable({ uniId, facId }) {
  const empty = {
    codigo:'', 
    nombre:'', 
    capacidad:'', 
    tipo:'', 
    tiene_proyector:false,
    tiene_aire_acondicionado:false, 
    piso:'', 
    edificio:''
};
const fields = [
  {key:'codigo',label:'Código'}, 
  {key:'nombre',label:'Nombre'},
  {key:'capacidad',label:'Capacidad'}, 
  {key:'tipo',label:'Tipo'},
  { key: 'tiene_proyector', label: 'Proyector', type: 'checkbox' },
  { key: 'tiene_aire_acondicionado', label: 'Aire Acondicionado', type: 'checkbox' },
  {key:'piso',label:'Piso'}, 
  {key:'edificio',label:'Edificio'}
];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
    fetchAulas(uniId, facId).then(res => setList(res.data));

  useEffect(() => {
    if (editingId != null) {
      const d = list.find(x => x.id === editingId);
      setForm({
        codigo: d.codigo,
        nombre: d.nombre,
        capacidad: d.capacidad != null ? String(d.capacidad) : '',
        tipo: d.tipo||'',
        tiene_proyector: Boolean(d.tiene_proyector),
        tiene_aire_acondicionado: Boolean(d.tiene_aire_acondicionado),
        piso: d.piso != null ? String(d.piso) : '',
        edificio: d.edificio ?? ''
      });
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:false}),{}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a,f)=>({...a,[f.key]:true}),{}));
    }
  }, [editingId, list]);

  const toggle = k => setEnabled(e=>({...e,[k]:!e[k]}));
  const change = (e) => {
    const { name, type, value, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {};
    fields.forEach(({ key, type }) => {
     if (editingId === null || enabled[key]) {
       if (type === 'checkbox') {
         payload[key] = form[key];
       } else if (['capacidad','piso'].includes(key)) {
         payload[key] = form[key] ? parseInt(form[key], 10) : null;
       } else {
         payload[key] = form[key];
       }
     }
   });

    const action = editingId!=null
      ? updateAula(uniId, facId, editingId, payload)
      : createAula(uniId, facId, payload);
    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar aula?')) {
      deleteAula(uniId, facId, id).then(load);
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
                type={type || 'text'}
                name={key}
                {...(type === 'checkbox'
                    ? {
                        checked: form[key],
                        onChange: change
                      }
                    : {
                        value: form[key],
                        onChange: change
                      })}
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
          {editingId!=null?'Actualizar Carrera':'Agregar Carrera'}
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
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              {['ID','Código','Nombre','Capacidad','Tipo','Tiene Proyector','Tiene Aire Acondicionado', 'Piso', 'Edificio','Acciones']
                .map(h=>(
                  <th key={h} className="px-4 py-2 text-left text-sm font-semibold">{h}</th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(d=>(
              <tr key={d.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{d.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.codigo}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.nombre}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.capacidad}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.tipo}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                    {d.tiene_proyector ? '✔' : '✘'}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">
                    {d.tiene_aire_acondicionado ? '✔' : '✘'}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.piso||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{d.edificio||'—'}</td>
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
