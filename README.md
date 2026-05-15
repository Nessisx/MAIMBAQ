# MAIMBAQ

Aplicación web interactiva que transforma dibujos en experiencias digitales y los presenta en un museo virtual. MAIMBAQ combina una interfaz móvil-first con un backend en Node.js + MongoDB.

## Qué incluye

- `index.html`: entrada principal con onboarding y acceso por nombre.
- `pages/`: pantallas secundarias (`dashboard`, `crear`, `IA`, `resultado`, `museo`, `sobre`).
- `frontend/src/`: recursos compartidos de la app (CSS, JS, assets).
- `backend/`: API REST con Express, Mongoose y conexión a MongoDB.
- `docs/`: documentación de la API y los requisitos del proyecto.

## Características clave

- Conversión de dibujos en obras digitales.
- Museo interactivo con galería de obras.
- Flujo de usuario simple: crear → procesar → ver resultado.
- PWA básica con `manifest.json` y `sw.js`.
- Backend con CRUD de obras en `/api/artworks`.

## Estructura del proyecto

- `index.html`
- `manifest.json`
- `sw.js`
- `pages/`
- `frontend/src/css/`
- `frontend/src/js/`
- `frontend/src/assets/`
- `backend/package.json`
- `backend/src/app.js`
- `backend/src/routes/`
- `backend/src/models/`
- `backend/src/database/connect.js`
- `backend/src/middlewares/`
- `docs/api/README.md`
- `docs/requirements/README.md`

## Ejecución local

### Frontend

- Abre `index.html` directamente en el navegador, o usa un servidor local.
- Si prefieres servidor, desde la raíz del proyecto:

```bash
npx serve .
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Después abre `http://localhost:5000`.

## Configuración de entorno

Crea un archivo `.env` en `backend/` con al menos estas variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maimbaq
```

Opcional:

```env
CLIENT_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## API principal

Base URL local: `http://localhost:5000/api`

- `GET /api/health`
- `GET /api/artworks`
- `GET /api/artworks/:id`
- `POST /api/artworks`
- `PATCH /api/artworks/:id`
- `DELETE /api/artworks/:id`

### Ejemplo de creación de obra

```http
POST /api/artworks
Content-Type: application/json

{
  "title": "Dinosaurio Espacial",
  "artist": "Carlos",
  "style": "Fantasía",
  "imageUrl": "https://..."
}
```

## Documentación adicional

- `docs/api/README.md` — endpoints de la API.
- `docs/requirements/README.md` — requisitos funcionales y técnicos.

## Contribuir

1. Haz fork del repositorio.
2. Crea una rama nueva: `git checkout -b feature/mi-feature`.
3. Haz commit de tus cambios.
4. Envía un pull request.

---

Hecho con foco en experiencia de dibujo y arte digital.
