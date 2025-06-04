import { useEffect, useState } from 'react';
import { fetchUniversidades, createUniversidad, updateUniversidad } from '../api/universidades';
import UniversityList from '../components/UniversityList';
import UniversityForm from '../components/UniversityForm';

export default function UniversidadesPage() {
  const [universidades, setUniversidades] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => {
    fetchUniversidades().then(res => setUniversidades(res.data));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = (data) => createUniversidad(data).then(load);
  const handleUpdate = (id, data) => updateUniversidad(id, data).then(() => {
    setEditing(null);
    load();
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold mb-8 text-center">Universidades</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <UniversityForm
            key={editing ? editing.id : 'new'}
            initialData={editing}
            onSubmit={(formData) => {
              editing ? handleUpdate(editing.id, formData) : handleCreate(formData);
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <UniversityList
            universidades={universidades}
            onEdit={(uni) => setEditing(uni)}
          />
        </div>
      </div>
    </div>
  );
}