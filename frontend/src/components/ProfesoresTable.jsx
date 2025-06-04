import { useState, useEffect } from 'react';
import {
  fetchProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor
} from '../api/profesores';

export default function ProfesoresTable({ uniId, facId, depId }) {
  const empty = {
    codigo_empleado: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    fecha_nacimiento: '',
    fecha_contratacion: '',
    titulo_academico: '',
    especialidad: '',
    salario: '',
    tipo_contrato: '',
    estado: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  const fields = [
    { key: 'codigo_empleado', label: 'Código Empleado' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'cedula', label: 'Cédula' },
    { key: 'fecha_nacimiento', label: 'Nacimiento', type: 'date' },
    { key: 'fecha_contratacion', label: 'Contratación', type: 'date' },
    { key: 'titulo_academico', label: 'Título Académico' },
    { key: 'especialidad', label: 'Especialidad' },
    { key: 'salario', label: 'Salario' },
    { key: 'tipo_contrato', label: 'Tipo Contrato' },
    { key: 'estado', label: 'Estado' },
    { key: 'email', label: 'Email' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'direccion', label: 'Dirección' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = () =>
      fetchProfesores(uniId, facId, depId).then(res => setList(res.data));
  
  useEffect(() => {
      load();
  }, [uniId, facId, depId]);

  useEffect(() => {
    if (editingId != null) {
      const p = list.find(x => x.id === editingId);
      setForm({
        codigo_empleado: p.codigo_empleado,
        nombres: p.nombres,
        apellidos: p.apellidos,
        cedula: p.cedula || '',
        fecha_nacimiento: p.fecha_nacimiento?.slice(0, 10) || '',
        fecha_contratacion: p.fecha_contratacion?.slice(0, 10) || '',
        titulo_academico: p.titulo_academico || '',
        especialidad: p.especialidad || '',
        salario: p.salario != null ? String(p.salario) : '',
        tipo_contrato: p.tipo_contrato || '',
        estado: p.estado || '',
        email: p.email || '',
        telefono: p.telefono || '',
        direccion: p.direccion || ''
      });
      setEnabled(fields.reduce((a, f) => ({ ...a, [f.key]: false }), {}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((a, f) => ({ ...a, [f.key]: true }), {}));
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
        // fechas a ISO
        if (type === 'date') {
          payload[key] = form[key] ? new Date(form[key]).toISOString() : null;
        }
        // salario a float
        else if (key === 'salario') {
          payload[key] = form[key] ? parseFloat(form[key]) : null;
        }
        else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId != null
      ? updateProfesor(uniId, facId, depId, editingId, payload)
      : createProfesor(uniId, facId, depId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar profesor?')) {
      deleteProfesor(uniId, facId, depId, id).then(load);
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
            editingId!=null ? 'bg-yellow-500' : 'bg-blue-500'
          } text-white py-2 rounded`}
        >
          {editingId != null ? 'Actualizar Profesor' : 'Agregar Profesor'}
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
                'ID','CodEmp','Nombres','Apellidos','Cédula',
                'Nacimiento','Contratación','Título','Especialidad',
                'Salario','Tipo Contrato','Estado','Email','Teléfono','Dirección','Acciones'
              ].map(h => (
                <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{p.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.codigo_empleado}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.nombres}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.apellidos}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.cedula||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.fecha_nacimiento?.slice(0,10)||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.fecha_contratacion?.slice(0,10)||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.titulo_academico||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.especialidad||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.salario ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.tipo_contrato||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.estado||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.email||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.telefono||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{p.direccion||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={()=>setEditingId(p.id)} className="text-green-600">✎</button>
                  <button onClick={()=>handleDelete(p.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
}
