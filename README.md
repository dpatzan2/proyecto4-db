# Proyecto4-DB

Una aplicación full-stack para la gestión de universidades, facultades, departamentos, carreras, materias, profesores, estudiantes, períodos académicos, cursos, aulas y prerrequisitos.

---

## 📁 Estructura de carpetas

PROJECT_ROOT
```
├── backend
│ ├── node_modules
│ ├── prisma
│ │ ├── migrations/ # Migraciones generadas por Prisma
│ │ └── schema.prisma # Modelo de datos
│ ├── src
│ │ ├── controllers/ # Lógica de endpoints
│ │ ├── routes/ # Definición de rutas Express
│ │ ├── services/ # Acceso a datos (Prisma)
│ │ ├── index.js # Servidor Express
│ │ └── prismaClient.js # Instancia exportada de PrismaClient
│ ├── .env # Variables de entorno (DB_URL, PORT, etc.)
│ ├── docker-compose.yml # Para levantar base de datos en Docker
│ ├── package.json
│ └── package-lock.json
│
├── frontend
│ ├── node_modules
│ ├── public # HTML estático, favicon, etc.
│ ├── src
│ │ ├── api/ # Módulos Axios para consumir backend
│ │ ├── components/ # Componentes reutilizables (tables, forms…)
│ │ ├── pages/ # Vistas principales (Universidades, Detalles…)
│ │ ├── App.jsx # Componente raíz
│ │ ├── routes.jsx # React-Router v6
│ │ ├── index.css # Estilos globales + Tailwind
│ │ └── main.jsx # Punto de entrada
│ ├── postcss.config.js # Config de PostCSS / Tailwind
│ ├── tailwind.config.js # Config de Tailwind
│ ├── vite.config.js # Configuración de Vite
│ ├── package.json
└ └── package-lock.json
```


---

## 🚀 Instalación y puesta en marcha

### 1. Clonar repositorio

```
git clone https://github.com/dpatzan2/proyecto4-db.git
cd proyecto4-db
```

### 2. Backend
### 2.1 Base de datos
Levantar base de datos:
```
cd backend
docker-compose up -d
```

### 2.2 Instalar dependencias & generar cliente Prisma
```
npm install
npx prisma generate
```

### 2.3 Ejecutar migraciones
```
npx prisma migrate dev --name init
```

### 2.4 Arrancar servidor
```
npm start
```
El backend quedará escuchando en `http://localhost:3000`.

### 3. Frontend
### 3.1 Instalar dependencias
```
cd frontend
npm install
```

### 3.2 Arrancar Vite
```
npm run dev
```
Accede a `http://localhost:5173`.

---
⚙️ Uso
1. Abre primero el backend (`localhost:3000`) para exponer la API REST.

2. Luego el frontend (`localhost:5173`).

3. Navega en la UI:

    3.1 Lista de Universidades → Añadir, editar.
   
    3.2 Click en nombre → Detalle con Facultades y Períodos.
   
    3.3 En cada nivel vas profundizando (Departamentos, Aulas, …).

---

📚 Herramientas

Backend: `Node.js, Express, Prisma, PostgreSQL, Docker Compose`

Frontend: `React (Vite), React-Router v6, Axios, Tailwind CSS`



