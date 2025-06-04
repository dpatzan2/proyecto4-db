import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCarrera }   from '../api/carreras';
import { fetchEstudiantes } from '../api/estudiantes';
import EstudiantesTable from '../components/EstudiantesTable';
import PlanTable from '../components/PlanTable';
import { fetchPlanes } from '../api/plan_estudios';

export default function CarreraDetailPage() {
  const { uniId, facId, depId, carId } = useParams();

  const [carrera, setCarrera]             = useState(null);
  const [estudiantes, setEstudiantes]     = useState([]);
  const [planes, setPlanes]               = useState([]);

  useEffect(() => {
      fetchCarrera(uniId, facId, depId, carId)
        .then(res => setCarrera(res.data))
        .catch(err => console.error(err));

      fetchEstudiantes(uniId, facId, depId, carId)
        .then(res => setEstudiantes(res.data))
        .catch(err => console.error(err));
    
      fetchPlanes(uniId, facId, depId, carId)
        .then(res => setPlanes(res.data))
        .catch(err => console.error(err));
  
    }, [uniId, facId, depId, carId]);

  if (!carrera) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Cargando datos...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-6">
        <Link to={`/universidades/${uniId}/facultades/${facId}/departamentos/${depId}`} className="text-blue-400 hover:text-blue-600">
          &larr; Volver a Departamentos
        </Link>

        <div className="bg-white text-gray-900 p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{carrera.nombre}</h1>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="px-4 py-3 text-center border border-gray-300"><strong>ID:</strong> {carrera.id}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Código:</strong> {carrera.codigo}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Duracion en semestres:</strong> {carrera.duracion_semestres || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Creditos necesarios:</strong> {carrera.creditos_requeridos || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Modalidad:</strong> {carrera.modalidad || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Titulo:</strong> {carrera.titulo_otorgado || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Coordinador:</strong> {carrera.coordinador || '—'}</div>
            </div>
          </table>
        </div>
        
        <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Estudiantes</h2>
            <EstudiantesTable
                uniId={uniId}
                facId={facId}
                depId={depId}
                carId={carId}
                estudiantes={estudiantes}
            reload={() => fetchEstudiantes(uniId, facId, depId, carId).then(r=>setEstudiantes(r.data))}
            />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Plan Estudios</h2>
            <PlanTable
                uniId={uniId}
                facId={facId}
                depId={depId}
                carId={carId}
                planes={planes}
            reload={() => fetchPlanes(uniId, facId, depId, carId).then(r=>setPlanes(r.data))}
            />
        </section>

      </div>
    </div>
  );
}
