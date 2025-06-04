import { useNavigate } from 'react-router-dom';

export default function UniversityList({ universidades, onEdit }) {
  const navigate = useNavigate();

  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
      <thead className="bg-gray-800 text-gray-200"> 
        <tr>
          {['ID','Nombre','Código','Dirección','Teléfono','Email','Rector','Fundación','Acciones']
            .map(h => (
              <th key={h} className="px-4 py-3 text-center text-sm font-semibold border border-gray-300">{h}</th>
            ))
          }
        </tr>
      </thead>
      <tbody className="bg-gray-50 divide-y divide-gray-200 text-gray-900">
        {universidades.map(u => (
          <tr key={u.id} className="hover:bg-gray-100">
            <td className="px-4 py-3 text-center border border-gray-300">{u.id}</td>
            <td 
              className="px-4 py-3 text-center text-blue-600 underline cursor-pointer border border-gray-300"
              onClick={() => navigate(`/universidades/${u.id}`)}
            >
              {u.nombre}
            </td>
            <td className="px-4 py-3 text-center border border-gray-300">{u.codigo}</td>
            <td className="px-4 py-3 text-center border border-gray-300">{u.direccion || '—'}</td>
            <td className="px-4 py-3 text-center border border-gray-300">{u.telefono || '—'}</td>
            <td className="px-4 py-3 text-center border border-gray-300">{u.email || '—'}</td>
            <td className="px-4 py-3 text-center border border-gray-300">{u.rector || '—'}</td>
            <td className="px-4 py-3 text-center border border-gray-300">{u.fecha_fundacion?.slice(0,10) || '—'}</td>
            <td className="px-4 py-3 text-center border border-gray-300">
              <button
                onClick={() => onEdit(u)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
        {universidades.length === 0 && (
          <tr>
            <td colSpan="9" className="px-4 py-6 text-center text-gray-500 border border-gray-300">
              No hay universidades registradas.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}