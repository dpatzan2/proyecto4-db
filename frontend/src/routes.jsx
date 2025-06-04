import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UniversidadesPage from './pages/UniversidadesPage';
import UniversidadDetailPage from './pages/UniversidadDetailPage';
import FacultadDetailPage from './pages/FacultadDetailPage';
import DepartamentoDetailPage from './pages/DepartamentoDetailPage';
import CarreraDetailPage from './pages/CarreraDetailPage';
import MateriaDetailPage from './pages/MateriaDetailPage';


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniversidadesPage />} />
        <Route path="/universidades/:uniId" element={<UniversidadDetailPage />} />
        <Route path="/universidades/:uniId/facultades/:facId" element={<FacultadDetailPage />} />
        <Route path="/universidades/:uniId/facultades/:facId/departamentos/:depId" element={<DepartamentoDetailPage />} />
        <Route path="/universidades/:uniId/facultades/:facId/departamentos/:depId/carreras/:carId" element={<CarreraDetailPage />} />
        <Route path="/universidades/:uniId/facultades/:facId/departamentos/:depId/materias/:matId" element={<MateriaDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
