# MAIMBAQ

Aplicación web creativa para convertir dibujos en experiencias digitales, con una interfaz pensada para navegación por secciones y un backend en Node.js + MongoDB.

## Estructura

- `frontend/public/`: página de inicio servida por el backend en local.
- `frontend/src/`: estilos, scripts e imágenes compartidas.
- `pages/`: pantallas secundarias del proyecto.
- `backend/`: API en Node.js, Express y Mongoose.
- `docs/`: documentación organizada del proyecto.

## Requisitos

Consulta los requisitos funcionales y técnicos en [docs/requirements/README.md](docs/requirements/README.md).

## Documentación de API

Consulta los endpoints del backend en [docs/api/README.md](docs/api/README.md).

## Ejecución local

### Frontend + backend desde el servidor local

1. Abre la carpeta `backend/`.
2. Instala dependencias con `npm install`.
3. Ejecuta `npm run dev`.
4. Abre `http://localhost:5000`.

### Variables de entorno

- Revisa la plantilla en [backend/test/.env](backend/test/.env).
- No subas credenciales reales al repositorio.

## Rutas principales

- Inicio: `/`
- Crear: `/pages/crear.html`
- Carga IA: `/pages/IA.html`
- Museo: `/pages/museo.html`
- Resultado: `/pages/resultado.html`
- Sobre: `/pages/sobre.html`

## Backend

El backend expone:

- `GET /api/health`
- `GET /api/artworks`
- `POST /api/artworks`
- `GET /api/artworks/:id`
- `PATCH /api/artworks/:id`
- `DELETE /api/artworks/:id`
