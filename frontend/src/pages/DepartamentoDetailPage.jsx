import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchDepartamento }   from '../api/departamentos';
import { fetchCarreras } from '../api/carreras';
import { fetchProfesores } from '../api/profesores';
import { fetchMaterias } from '../api/materias';
import CarrerasTable from '../components/CarrerasTable';
import ProfesoresTable from '../components/ProfesoresTable';
import MateriasTable from '../components/MateriasTable';

export default function DepartamentoDetailPage() {
  const { uniId, facId, depId } = useParams();

  const [departamento, setDepartamento]   = useState(null);
  const [carreras, setCarreras]           = useState([]);
  const [profesores, setProfesores]       = useState([]);
  const [materias, setMaterias]           = useState([]);

  useEffect(() => {
      fetchDepartamento(uniId, facId, depId)
        .then(res => setDepartamento(res.data))
        .catch(err => console.error(err));
  
      fetchCarreras(uniId, facId, depId)
        .then(res => setCarreras(res.data))
        .catch(err => console.error(err));
      
      fetchProfesores(uniId, facId, depId)
        .then(res => setProfesores(res.data))
        .catch(err => console.error(err));

      fetchMaterias(uniId, facId, depId)
        .then(res => setMaterias(res.data))
        .catch(err => console.error(err));
    }, [uniId, facId, depId]);

  if (!departamento) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Cargando datos...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-6">
        <Link to={`/universidades/${uniId}/facultades/${facId}`} className="text-blue-400 hover:text-blue-600">
          &larr; Volver a Facultades
        </Link>

        <div className="bg-white text-gray-900 p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{departamento.nombre}</h1>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="px-4 py-3 text-center border border-gray-300"><strong>ID:</strong> {departamento.id}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Código:</strong> {departamento.codigo}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Jefe de departamento:</strong> {departamento.jefe_departamento || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Teléfono:</strong> {departamento.telefono || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Email:</strong> {departamento.email || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Presupuesto:</strong> {departamento.presupuesto || '—'}</div>
            </div>
          </table>
        </div>
        
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Carreras</h2>
          <CarrerasTable
            uniId={uniId}
            facId={facId}
            depId={depId}
            carreras={carreras}
            reload={() => fetchCarreras(uniId, facId, depId).then(r=>setCarreras(r.data))}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Profesores</h2>
          <ProfesoresTable
            uniId={uniId}
            facId={facId}
            depId={depId}
            profesores={profesores}
            reload={() => fetchProfesores(uniId, facId, depId).then(r=>setProfesores(r.data))}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Materias</h2>
          <MateriasTable
            uniId={uniId}
            facId={facId}
            depId={depId}
            materias={materias}
            reload={() => fetchMaterias(uniId, facId, depId).then(r=>setMaterias(r.data))}
          />
        </section>
        
      </div>
    </div>
  );
}
