import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFacultades } from '../api/facultades';
import { fetchPeriodos }   from '../api/periodos';
import { fetchUniversidad } from '../api/universidades';
import FacultadesTable from '../components/FacultadesTable';
import PeriodosTable   from '../components/PeriodosTable';

export default function UniversidadDetailPage() {
  const { uniId } = useParams();
  const [universidad, setUniversidad] = useState(null);
  const [facultades, setFacultades]   = useState([]);
  const [periodos, setPeriodos]       = useState([]);

  useEffect(() => {
    fetchUniversidad(uniId)
      .then(res => setUniversidad(res.data))
      .catch(err => console.error(err));

    fetchFacultades(uniId)
      .then(res => setFacultades(res.data))
      .catch(err => console.error(err));

    fetchPeriodos(uniId)
      .then(res => setPeriodos(res.data))
      .catch(err => console.error(err));
  }, [uniId]);

  if (!universidad) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-6">
        <Link to="/" className="text-blue-400 hover:text-blue-600">&larr; Volver</Link>

        <div className="bg-white text-gray-900 p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{universidad.nombre}</h1>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="px-4 py-3 text-center border border-gray-300"><strong>ID:</strong> {universidad.id}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Código:</strong> {universidad.codigo}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Dirección:</strong> {universidad.direccion || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Teléfono:</strong> {universidad.telefono || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Email:</strong> {universidad.email || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Rector:</strong> {universidad.rector || '—'}</div>
              <div className="md:col-span-2 px-4 py-3 text-center border border-gray-300">
                <strong>Fecha Fundación:</strong>{' '}
                {universidad.fecha_fundacion
                  ? new Date(universidad.fecha_fundacion).toLocaleDateString()
                  : '—'}
              </div>
            </div>
          </table>
        </div>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Facultades</h2>
          <FacultadesTable
            uniId={uniId}
            facultades={facultades}
            reload={() => fetchFacultades(uniId).then(r=>setFacultades(r.data))}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Periodos Académicos</h2>
          <PeriodosTable
            uniId={uniId}
            periodos={periodos}
            reload={() => fetchPeriodos(uniId).then(r=>setPeriodos(r.data))}
          />
        </section>
      </div>
    </div>
  );
}
