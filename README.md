[reflexión.txt](https://github.com/user-attachments/files/20587871/reflexion.txt)# Proyecto4-DB

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
### ⚙️ Uso
1. Abre primero el backend (`localhost:3000`) para exponer la API REST.

2. Luego el frontend (`localhost:5173`).

3. Navega en la UI:

    3.1 Lista de Universidades → Añadir, editar.
   
    3.2 Click en nombre → Detalle con Facultades y Períodos.
   
    3.3 En cada nivel vas profundizando (Departamentos, Aulas, …).

---

### 📚 Herramientas

Backend: `Node.js, Express, Prisma, PostgreSQL, Docker Compose`

Frontend: `React (Vite), React-Router v6, Axios, Tailwind CSS`

--- 
### 🦾 Preguntas

# 1. ¿Cuál fue el aporte técnico de cada miembro del equipo?
Diego: Se enfocó principalmente en el desarrollo del backend, implementando la arquitectura de servicios con Prisma ORM, la configuración de la base de datos PostgreSQL, y el diseño de las rutas RESTful. 

Ihan: Se concentró en el desarrollo del frontend con React, creando los componentes de tabla reutilizables, la navegación entre páginas, y la integración con la API del backend,también contribuyó en el diseño de la interfaz de usuario y la experiencia del usuario para la gestión de datos académicos.

# 2. ¿Qué decisiones estructurales se tomaron en el modelo de datos y por qué?
Optamos por una estructura jerárquica clara: Universidad → Facultad → Departamento → Carrera/Materia, esto se basó en reflejar la organización real de las instituciones universitarias. Separamos entidades como profesores, estudiantes, y cursos para mantener la flexibilidad y evitar redundancia.

# 3. ¿Qué criterios siguieron para aplicar la normalización?
Aplicamos normalización hasta la tercera forma normal (3NF):

Primera forma normal: Eliminamos valores repetidos y aseguramos atomicidad en los campos
Segunda forma normal: Removimos dependencias parciales, cada atributo depende completamente de la clave primaria
Tercera forma normal: Eliminamos dependencias transitivas, separando entidades como periodos_academicos y horarios que podrían depender de otras entidades

# 4. ¿Cómo estructuraron los tipos personalizados y para qué los usaron?
Utilizamos enums implícitos para campos como estado (activo/inactivo), modalidad de carreras (presencial/virtual), y tipo_contrato para profesores, esto nos ayudó a mantener consistencia en los datos y facilitar las validaciones tanto en backend como frontend.

# 5. ¿Qué beneficios encontraron al usar vistas para el índice?
Las vistas nos permitieron crear consultas complejas precalculadas que combinan información de múltiples tablas, como una vista podría mostrar información consolidada de estudiantes con sus carreras, departamentos y facultades sin necesidad de hacer múltiples JOINs en cada consulta, mejorando significativamente el rendimiento de las consultas frecuentes.

# 6. ¿Cómo se aseguraron de evitar duplicidad de datos?
Implementamos claves primarias únicas para cada entidad y utilizamos claves foráneas para mantener la integridad referencial, para el lado delfrontend antes de crear nuevos registros, implementamos validaciones que verifican la existencia de datos similares

# 7. ¿Qué reglas de negocio implementaron como restricciones y por qué?
Restricciones de integridad referencial: Para asegurar que no existan registros huérfanos
Validaciones de fechas: Los períodos académicos deben tener fechas de inicio anteriores a las de fin
Límites de cupos: Los cursos no pueden tener más inscripciones que cupos disponibles
Estados válidos: Los estudiantes solo pueden tener estados predefinidos (activo, inactivo, graduado)

# 8. ¿Qué trigger resultó más útil en el sistema? Justifica.
El trigger más útil fue el que actualiza automáticamente los cupos_disponibles en la tabla cursos cuando se crea o elimina una inscripción, esto evita inconsistencias en los datos y automatiza un cálculo que de otra manera tendríamos que hacer manualmente en cada operación, garantizando que siempre tengamos información actualizada sobre la disponibilidad de cupos.

# 9. ¿Cuáles fueron las validaciones más complejas y cómo las resolvieron?
La validación más compleja fue el manejo de prerrequisitos para materias, ya que uvimos que implementar una lógica que verifica recursivamente si un estudiante ha aprobado todas las materias prerrequisito antes de permitir la inscripción.

# 10. ¿Qué compromisos hicieron entre diseño ideal y rendimiento?
Paginación: Limitamos los resultados de consultas grandes para mantener la responsividad de la interfaz, aunque esto requiera más llamadas a la API
