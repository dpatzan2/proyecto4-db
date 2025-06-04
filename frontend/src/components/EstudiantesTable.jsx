import { useState, useEffect } from 'react';
import {
  fetchEstudiantes,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante
} from '../api/estudiantes';

export default function EstudiantesTable({ uniId, facId, depId, carId }) {
  const empty = {
    codigo_estudiante: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    fecha_nacimiento: '',
    fecha_ingreso: '',
    email: '',
    telefono: '',
    direccion: '',
    semestre_actual: '',
    creditos_aprobados: '',
    promedio_acumulado: '',
    estado: ''
  };

  const fields = [
    { key: 'codigo_estudiante', label: 'Código Estudiante' },
    { key: 'nombres',           label: 'Nombres' },
    { key: 'apellidos',         label: 'Apellidos' },
    { key: 'cedula',            label: 'Cédula' },
    { key: 'fecha_nacimiento',  label: 'Nacimiento',     type: 'date' },
    { key: 'fecha_ingreso',     label: 'Ingreso',        type: 'date' },
    { key: 'email',             label: 'Email' },
    { key: 'telefono',          label: 'Teléfono' },
    { key: 'direccion',         label: 'Dirección' },
    { key: 'semestre_actual',   label: 'Semestre',       type: 'number' },
    { key: 'creditos_aprobados',label: 'Créditos',       type: 'number' },
    { key: 'promedio_acumulado',label: 'Promedio',       type: 'number' },
    { key: 'estado',            label: 'Estado' }
  ];

  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [enabled, setEnabled] = useState({});
  const [editingId, setEditingId] = useState(null);

    const load = () =>
        fetchEstudiantes(uniId, facId, depId, carId).then(res => setList(res.data));

    useEffect(() => {
        load();
    }, [uniId, facId, depId, carId]);

  useEffect(() => {
    if (editingId != null) {
      const e = list.find(x => x.id === editingId);
      setForm({
        codigo_estudiante:  e.codigo_estudiante,
        nombres:            e.nombres,
        apellidos:          e.apellidos,
        cedula:             e.cedula || '',
        fecha_nacimiento:   e.fecha_nacimiento?.slice(0,10) || '',
        fecha_ingreso:      e.fecha_ingreso?.slice(0,10) || '',
        email:              e.email || '',
        telefono:           e.telefono || '',
        direccion:          e.direccion || '',
        semestre_actual:    e.semestre_actual != null ? String(e.semestre_actual) : '',
        creditos_aprobados: e.creditos_aprobados != null ? String(e.creditos_aprobados) : '',
        promedio_acumulado: e.promedio_acumulado != null ? String(e.promedio_acumulado) : '',
        estado:             e.estado || ''
      });
      setEnabled(fields.reduce((acc,f) => ({ ...acc, [f.key]: false }), {}));
    } else {
      setForm(empty);
      setEnabled(fields.reduce((acc,f) => ({ ...acc, [f.key]: true }), {}));
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
        if (type === 'date') {
          payload[key] = form[key]
            ? new Date(form[key]).toISOString()
            : null;
        } else if (type === 'number') {
          if (['promedio_acumulado'].includes(key)) {
            payload[key] = form[key] ? parseFloat(form[key]) : null;
          } else {
            payload[key] = form[key] ? parseInt(form[key],10) : null;
          }
        } else {
          payload[key] = form[key];
        }
      }
    });

    const action = editingId != null
      ? updateEstudiante(uniId, facId, depId, carId, editingId, payload)
      : createEstudiante(uniId, facId, depId, carId, payload);

    action.then(() => {
      setEditingId(null);
      setForm(empty);
      load();
    });
  };

  const handleDelete = id => {
    if (confirm('¿Eliminar estudiante?')) {
      deleteEstudiante(uniId, facId, depId, carId, id).then(load);
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
          {editingId != null ? 'Actualizar Estudiante' : 'Agregar Estudiante'}
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
              {[
                'ID','Código Est.','Nombres','Apellidos','Cédula',
                'Nacimiento','Ingreso','Email','Teléfono','Dirección',
                'Semestre','Créditos','Promedio','Estado','Acciones'
              ].map(h => (
                <th key={h} className="px-3 py-2 text-left text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {list.map(u => (
              <tr key={u.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 text-center border border-gray-300">{u.id}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.codigo_estudiante}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.nombres}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.apellidos}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.cedula||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.fecha_nacimiento?.slice(0,10)||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.fecha_ingreso?.slice(0,10)||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.email||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.telefono||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.direccion||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.semestre_actual ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.creditos_aprobados ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.promedio_acumulado ?? '—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">{u.estado||'—'}</td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <button onClick={() => setEditingId(u.id)} className="text-green-600">✎</button>
                  <button onClick={() => handleDelete(u.id)} className="text-red-600">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
