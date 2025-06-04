import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFacultad } from '../api/facultades';
import { fetchDepartamentos }   from '../api/departamentos';
import { fetchAulas } from '../api/aulas';
import DepartamentosTable from '../components/DepartamentosTable';
import AulasTable        from '../components/AulasTable';

export default function FacultadDetailPage() {
  const { uniId, facId } = useParams();

  const [facultad, setFacultad]       = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [aulas, setAulas]                 = useState([]);

  useEffect(() => {
      fetchFacultad(uniId, facId)
        .then(res => setFacultad(res.data))
        .catch(err => console.error(err));
  
      fetchDepartamentos(uniId, facId)
        .then(res => setDepartamentos(res.data))
        .catch(err => console.error(err));
  
      fetchAulas(uniId, facId)
        .then(res => setAulas(res.data))
        .catch(err => console.error(err));
    }, [uniId, facId]);

  if (!facultad) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Cargando datos...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-6">
        <Link to={`/universidades/${uniId}`} className="text-blue-400 hover:text-blue-600">
          &larr; Volver a departamentos
        </Link>

        <div className="bg-white text-gray-900 p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{facultad.nombre}</h1>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="px-4 py-3 text-center border border-gray-300"><strong>ID:</strong> {facultad.id}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Código:</strong> {facultad.codigo}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Decano:</strong> {facultad.decano || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Teléfono:</strong> {facultad.telefono || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Email:</strong> {facultad.email || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Presupuesto:</strong> {facultad.presupuesto_anual || '—'}</div>
            </div>
          </table>
        </div>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Departamentos</h2>
          <DepartamentosTable
            uniId={uniId}
            facId={facId}
            departamentos={departamentos}
            reload={() => fetchDepartamentos(uniId, facId).then(r=>setDepartamentos(r.data))}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Aulas</h2>
          <AulasTable
            uniId={uniId}
            facId={facId}
            aulas={aulas}
            reload={() => fetchAulas(uniId, facId).then(r=>setAulas(r.data))}
          />
        </section>
        
      </div>
    </div>
  );
}
