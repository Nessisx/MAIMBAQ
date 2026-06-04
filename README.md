# MAIMBAQ

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Aplicación web interactiva que transforma dibujos en experiencias digitales y los presenta en un museo virtual. MAIMBAQ combina una interfaz móvil-first con un backend en Node.js + MongoDB, integrando IA para análisis de poses con MediaPipe y TensorFlow.

## Qué incluye

- `index.html`: entrada principal con onboarding y acceso por nombre.
- `pages/`: pantallas secundarias (`dashboard`, `crear`, `IA`, `resultado`, `museo`, `sobre`).
- `frontend/src/`: recursos compartidos de la app (CSS, JS, assets).
  - `apps/poseai/`: aplicación integrada de análisis de poses con IA
- `backend/`: API REST con Express, Mongoose y conexión a MongoDB.
- `docs/`: documentación de la API y los requisitos del proyecto.

## Características clave

- 🎨 Conversión de dibujos en obras digitales.
- 🏛️ Museo interactivo con galería de obras.
- 🤖 Análisis de poses con MediaPipe + TensorFlow (PoseAI integrado).
- 📱 Flujo de usuario simple: crear → procesar → ver resultado.
- 🔔 PWA con `manifest.json` y `sw.js`.
- 🎭 Backend con CRUD de obras en `/api/artworks`.
- 🎯 Experiencia culturalmente contemporánea: estética de museo, archivo histórico y revista literaria.

## Galería de Pantallas

### Página Principal

![Página Inicial](frontend/src/assets/images/placeholder.png)
_Interfaz de bienvenida con onboarding interactivo y acceso personalizado por nombre del usuario._

### Dashboard

![Dashboard](frontend/src/assets/images/pagina_inicial.png)
_Centro de control con acceso rápido a las principales funciones de la aplicación._

### Crear Obra

![Crear Obra](frontend/src/assets/images/museo_beta.png)
_Interfaz para capturar o subir dibujos y convertirlos en obras digitales._

### Museo Virtual

![Museo](frontend/src/assets/images/museo_beta.png)
_Galería interactiva mostrando todas las obras creadas y compartidas por la comunidad._

### Análisis de Poses (PoseAI)

![PoseAI](frontend/src/assets/images/poseAI.png)
_Herramienta de IA que analiza poses corporales con MediaPipe + TensorFlow en tiempo real._

### Sobre Nosotros

![Sobre Nosotros](frontend/src/assets/images/sobre_nosotros.png)
_Información sobre el equipo, organización y propósito de MAIMBAQ._

## Estructura del proyecto

```
MAIMBAQ/
├── index.html                          # Entrada principal
├── pages/                              # Páginas secundarias
│   ├── dashboard.html
│   ├── crear.html
│   ├── museo.html
│   ├── resultado.html
│   └── sobre.html
├── frontend/
│   └── src/
│       ├── css/                        # Estilos
│       ├── js/                         # Lógica del cliente
│       ├── apps/
│       │   └── poseai/                 # Análisis de poses con IA
│       └── assets/
│           ├── images/                 # Capturas de pantalla
│           ├── icons/                  # Íconos PWA
│           └── fonts/                  # Tipografías
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js                      # Servidor Express
│       ├── routes/                     # Endpoints API
│       ├── models/                     # Modelos Mongoose
│       ├── database/                   # Conexión DB
│       ├── middlewares/                # Middleware personalizado
│       └── utils/                      # Utilidades
├── docs/
│   ├── api/                            # Documentación de API
│   └── requirements/                   # Requisitos del proyecto
├── sitemap.xml                         # Mapa del sitio para SEO
├── robots.txt                          # Configuración de bots
└── manifest.json                       # Configuración PWA
```

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

## API REST

### Base URL

- Local: `http://localhost:5000/api`
- Production: `https://tu-api.com/api`

### Endpoints

#### Health Check

```http
GET /api/health
```

Respuesta:

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

#### Listar todas las obras

```http
GET /api/artworks
```

Respuesta:

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Dinosaurio Espacial",
      "artist": "Carlos",
      "style": "Fantasía",
      "imageUrl": "https://..."
    }
  ]
}
```

#### Obtener obra por ID

```http
GET /api/artworks/:id
```

#### Crear nueva obra

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

#### Actualizar obra

```http
PATCH /api/artworks/:id
Content-Type: application/json

{
  "title": "Nuevo título",
  "style": "Realismo"
}
```

#### Eliminar obra

```http
DELETE /api/artworks/:id
```

Para documentación interactiva completa, consulta [docs/api/README.md](docs/api/README.md).

## Documentación adicional

- [API Documentation](docs/api/README.md) — endpoints detallados y ejemplos
- [Requirements](docs/requirements/README.md) — requisitos funcionales y técnicos
- [API Spec (OpenAPI)](docs/api/swagger.json) — especificación OpenAPI/Swagger

## Paleta de Colores

La aplicación utiliza una paleta de colores culturalmente contemporánea inspirada en museos, archivos y revistas literarias:

- **Primario (Terracota)**: `#B96863`
- **Primario Oscuro**: `#8B4D48`
- **Beige (Papel)**: `#DCCCBD`
- **Marfil (Fondo)**: `#F5F1EB`
- **Negro Carbón (Texto)**: `#1E1E1E`
- **Verde Natural**: `#6B8A4F`
- **Rojo Natural**: `#C4645A`

## Tecnologías Principales

- **Frontend**: HTML5, CSS3, JavaScript vanilla, PWA
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **IA**: MediaPipe, TensorFlow.js
- **Deploy**: GitHub Pages (frontend), cualquier servidor Node (backend)

## Contribuir

1. Haz fork del repositorio.
2. Crea una rama nueva: `git checkout -b feature/mi-feature`.
3. Haz commit de tus cambios.
4. Envía un pull request.

## Licencia

MIT - Ver [LICENSE](LICENSE) para más detalles.

---

Hecho con foco en experiencia de dibujo y arte digital. 🎨✨
