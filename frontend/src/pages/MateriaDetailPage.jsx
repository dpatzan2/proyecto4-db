import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMateria }   from '../api/materias';
import { fetchPre } from '../api/prerrequisitos';
import PrerrequisitosTable from '../components/PreTable';
import { fetchCursos } from '../api/cursos';
import CursosTable from '../components/CursosTable';

export default function MateriaDetailPage() {
  const { uniId, facId, depId, matId } = useParams();

  const [materia, setMateria]  = useState(null);
  const [preres, setPreres]    = useState();
  const [cursos, setCursos]    = useState();           


  useEffect(() => {
      fetchMateria(uniId, facId, depId, matId)
        .then(res => setMateria(res.data))
        .catch(err => console.error(err));

      fetchPre(uniId, facId, depId, matId)
        .then(res => setPreres(res.data))
        .catch(err => console.error(err));

      fetchCursos(uniId, facId, depId, matId)
        .then(res => setCursos(res.data))
        .catch(err => console.error(err));

  
    }, [uniId, facId, depId, matId]);

  if (!materia) {
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
          <h1 className="text-3xl font-bold mb-4">{materia.nombre}</h1>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="px-4 py-3 text-center border border-gray-300"><strong>ID:</strong> {materia.id}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Código:</strong> {materia.codigo}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Duracion en semestres:</strong> {materia.creditos || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Creditos necesarios:</strong> {materia.horas_teoricas || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Modalidad:</strong> {materia.horas_practicas || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Titulo:</strong> {materia.descripcion || '—'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Coordinador:</strong> {materia.es_obligatoria ? '✔' : '✘'}</div>
              <div className="px-4 py-3 text-center border border-gray-300"><strong>Coordinador:</strong> {materia.semestre_sugerido || '—'}</div>
            </div>
          </table>
        </div>

        <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Prerrequisitos</h2>
            <PrerrequisitosTable
                uniId={uniId}
                facId={facId}
                depId={depId}
                matId={matId}
                preres={preres}
            reload={() => fetchPre(uniId, facId, depId, matId).then(r=>setPreres(r.data))}
            />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Cursos</h2>
            <CursosTable
                uniId={uniId}
                facId={facId}
                depId={depId}
                matId={matId}
                cursos={cursos}
            reload={() => fetchCursos(uniId, facId, depId, matId).then(r=>setCursos(r.data))}
            />
        </section>

      </div>
    </div>
  );
}
