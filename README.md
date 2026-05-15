# 🎨 MAIMBAQ — Museo de Arte Interactivo de Barranquilla

<div align="center">


**Plataforma web que transforma dibujos en experiencias digitales mediante inteligencia artificial,<br>desarrollada por estudiantes de la Unisimón en colaboración con el MAMBAQ.**



</div>

---

## 📋 Tabla de Contenidos

- [¿Qué es MAIMBAQ?](#-qué-es-maimbaq)
- [Equipo](#-equipo)
- [Características](#-características)
- [Flujo de Usuario](#-flujo-de-usuario)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Instalación y Uso](#-instalación-y-uso)
- [Rutas de la App](#-rutas-de-la-app)
- [API Backend](#-api-backend)
- [Sistema de Autenticación](#-sistema-de-autenticación)
- [Diseño y UI](#-diseño-y-ui)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)

---

## 🏛️ ¿Qué es MAIMBAQ?

**MAIMBAQ** es una aplicación web tipo PWA (Progressive Web App) diseñada para niños, que permite **fotografiar dibujos hechos en papel y transformarlos en obras de arte digitales** usando inteligencia artificial. Las obras creadas se exhiben en un museo interactivo donde toda la comunidad puede explorarlas.

El proyecto nace de la colaboración entre:
- 🏛️ **MAMBAQ** — El [Museo de Arte Moderno de Barranquilla](https://mambaq.com), institución cultural referente del arte contemporáneo en Colombia.
- 🎓 **Unisimón** — Equipo de estudiantes de la Universidad Simón Bolívar de Barranquilla.

La app rinde homenaje a **Álvaro Cepeda Samudio**, destacado escritor y periodista colombiano, símbolo de la identidad cultural del Caribe.

---

## 👨‍💻 Equipo

| Nombre | Rol |
|---|---|
| Keiner Fontalvo | Desarrollador |
| Joseph De La Rans | Desarrollador |
| Oscar Llanos | Desarrollador |
| Nelson Sierra | Desarrollador |

> Proyecto universitario — Universidad Simón Bolívar, Barranquilla, Colombia.

---

## ✨ Características

### Implementadas ✅
- 🎬 **Onboarding animado** — 3 slides de bienvenida antes de entrar
- 👋 **Acceso sin registro** — Solo pide el nombre del artista, sin contraseña
- 🔐 **Login / Registro opcionales** — Para usuarios con cuenta guardada
- 📷 **Captura de dibujos** — Toma foto con cámara o sube desde galería
- 🎨 **Procesamiento con IA** — Transforma el dibujo en obra digital
- 🏛️ **Museo interactivo** — Galería de obras con vista en pantalla completa
- 📊 **Dashboard personal** — Vista de obras recientes del artista
- 🔃 **Ordenamiento** — Galería filtrable por recientes, popularidad y valoración
- ℹ️ **Página Sobre** — Info del MAMBAQ, el equipo y Álvaro Cepeda Samudio
- 📱 **PWA** — Instalable en dispositivo móvil (`manifest.json` + `sw.js`)
- 🌐 **Deploy en GitHub Pages** — Frontend disponible públicamente

### Backend ✅
- API REST con Node.js + Express + MongoDB
- Endpoints CRUD para obras de arte
- Health check endpoint
- Configuración por variables de entorno

### En desarrollo 🚧
- ❤️ Sistema de likes / valoraciones
- 💬 Comentarios
- 🏆 Badges y logros
- 🔍 Búsqueda por artista o categoría

---

## 🔄 Flujo de Usuario

```
┌──────────────────────────────────────────────────────────────────┐
│  index.html — ENTRADA                                            │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  🎬 ONBOARDING (3 slides)                               │    │
│  │    1. Bienvenida a MAIMBAQ                              │    │
│  │    2. Sube tu dibujo favorito                           │    │
│  │    3. Tu arte en el museo                               │    │
│  └────────────────────┬────────────────────────────────────┘    │
│                       ↓                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  👋 ¿Cómo te llamas?                                    │    │
│  │     [ Input nombre ]                                    │    │
│  │     [ ¡Entrar a jugar! 🚀 ]  → acceso directo          │    │
│  │     [ ¿Tienes cuenta? Entra al tablero ] → opcional     │    │
│  └──────────────────────┬──────────────────────────────────┘    │
│                         │                                        │
│         ┌───────────────┴──────────────┐                        │
│         ↓                              ↓                         │
│   Como invitado                  Con cuenta                      │
│         ↓                              ↓                         │
│   dashboard.html             pages/login o register              │
│                                        ↓                         │
│                                  dashboard.html                  │
└──────────────────────────────────────────────────────────────────┘

Desde el Dashboard:

  dashboard.html
       │
       ├──→ pages/crear.html     📷 Fotografiar y crear obra con IA
       │         │
       │         └──→ pages/IA.html    ✨ Procesamiento y resultado
       │                   │
       │                   └──→ pages/resultado.html
       │
       ├──→ pages/museo.html     🏛️ Galería de todas las obras
       │
       └──→ pages/sobre.html     ℹ️ Info del MAMBAQ y el equipo
```

---

## 📁 Estructura del Proyecto

```
MAIMBAQ/
│
├── 📄 index.html              # Entrada principal (onboarding + nombre)
├── 📄 manifest.json           # Configuración PWA
├── 📄 sw.js                   # Service Worker (caché offline)
├── 📄 .gitignore
├── 📄 README.md
│
├── 📁 pages/                  # Pantallas de la app
│   ├── dashboard.html         # Pantalla principal del artista
│   ├── crear.html             # Captura y formulario de la obra
│   ├── IA.html                # Procesamiento con inteligencia artificial
│   ├── resultado.html         # Resultado final de la obra
│   ├── museo.html             # Galería / museo interactivo
│   └── sobre.html             # Información del proyecto y equipo
│
├── 📁 frontend/
│   └── src/
│       ├── assets/
│       │   └── images/        # Imágenes (mambaq.jpeg, universidad.jpg, alvaro.webp...)
│       ├── css/               # Estilos globales
│       └── js/                # Scripts compartidos
│
├── 📁 backend/                # API REST
│   ├── package.json
│   ├── server.js              # Entrada del servidor Express
│   ├── routes/                # Rutas de la API
│   ├── controllers/           # Lógica de negocio
│   ├── models/                # Modelos Mongoose (MongoDB)
│   └── config/                # Configuración (env, DB)
│
└── 📁 docs/                   # Documentación técnica
    ├── api/
    │   └── README.md          # Documentación de endpoints
    └── requirements/
        └── README.md          # Requisitos funcionales y técnicos
```

---

## 🛠 Tecnologías

### Frontend
| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura de pantallas |
| **CSS3 + Variables CSS** | Estilos y animaciones |
| **JavaScript Vanilla** | Lógica, validaciones, navegación |
| **Google Fonts** — Fredoka One + Nunito | Tipografía |
| **PWA** (manifest + Service Worker) | Instalable en móvil, soporte offline |
| **GitHub Pages** | Hosting del frontend |

### Backend
| Tecnología | Uso |
|---|---|
| **Node.js** | Runtime del servidor |
| **Express.js** | Framework web / API REST |
| **MongoDB** | Base de datos de obras |
| **Mongoose** | ODM para MongoDB |

---

## 🚀 Instalación y Uso

### Frontend (solo HTML)

```bash
# Clona el repo
git clone https://github.com/Nessisx/MAIMBAQ.git
cd MAIMBAQ

# Abre directamente en el navegador
open index.html

# O con servidor local (recomendado)
npx serve .
# → http://localhost:3000
```

> El frontend también está disponible en: **https://nessisx.github.io/MAIMBAQ/**

---

### Backend (Node.js + MongoDB)

```bash
# Entra a la carpeta del backend
cd backend

# Instala dependencias
npm install

# Configura las variables de entorno
cp .env.example .env
# Edita .env con tus valores (MongoDB URI, puerto, etc.)

# Inicia en modo desarrollo
npm run dev

# → http://localhost:5000
```

#### Variables de entorno (`.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maimbaq
# Agrega las claves específicas de tu entorno
```

---

## 🗺 Rutas de la App

| Ruta | Descripción |
|---|---|
| `/` o `index.html` | Onboarding + acceso por nombre |
| `/pages/dashboard.html` | Pantalla principal del artista |
| `/pages/crear.html` | Capturar dibujo y completar datos |
| `/pages/IA.html` | Procesamiento con IA |
| `/pages/resultado.html` | Resultado final de la obra |
| `/pages/museo.html` | Museo / galería de obras |
| `/pages/sobre.html` | Sobre el proyecto y el equipo |

---

## 🔌 API Backend

Base URL local: `http://localhost:5000/api`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/health` | Estado del servidor |
| `GET` | `/api/artworks` | Listar todas las obras |
| `POST` | `/api/artworks` | Crear una nueva obra |
| `GET` | `/api/artworks/:id` | Obtener una obra por ID |
| `PATCH` | `/api/artworks/:id` | Actualizar una obra |
| `DELETE` | `/api/artworks/:id` | Eliminar una obra |

### Ejemplo — Crear obra

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

### Ejemplo — Respuesta

```json
{
  "_id": "664a1b2c...",
  "title": "Dinosaurio Espacial",
  "artist": "Carlos",
  "style": "Fantasía",
  "imageUrl": "https://...",
  "likes": 0,
  "createdAt": "2026-05-14T..."
}
```

> 📄 Documentación completa en [`docs/api/README.md`](./docs/api/README.md)

---

## 🔐 Sistema de Autenticación

MAIMBAQ tiene un sistema de acceso de **dos niveles**, pensado para que los niños puedan entrar fácil:

### Nivel 1 — Invitado (flujo principal, recomendado para niños)

Solo escribe tu nombre → entras directo. Sin correo, sin contraseña.

```js
// Lo que se guarda en sessionStorage
{
  name: "Carlos",
  guest: true
}
```

La sesión dura mientras el navegador esté abierto. Al cerrarlo se limpia automáticamente (ideal para tablets compartidas).

### Nivel 2 — Cuenta registrada (flujo opcional)

Para usuarios que quieren persistir su perfil entre sesiones.

```js
// Lo que se guarda en localStorage
{
  name: "Picasso Jr.",
  email: "artista@ejemplo.com",
  pass: "••••••"   // ⚠️ Solo para prototipo
}
```

> ⚠️ **Nota de seguridad:** Las contraseñas se almacenan en texto plano solo en el prototipo frontend. La versión de producción debe usar el backend con hash (bcrypt).

### Verificar sesión activa desde cualquier página

```js
const user = JSON.parse(sessionStorage.getItem('maimbaq_user') || 'null');

if (!user) {
  window.location.href = '/index.html'; // Redirigir si no hay sesión
}

// Usar los datos
console.log(user.name);   // "Carlos"
console.log(user.guest);  // true / false
```

---

## 🎨 Diseño y UI

### Paleta de colores

```css
:root {
  --yellow: #F5A623;   /* Acento principal */
  --orange: #E8860A;   /* Gradiente */
  --dark:   #1A1008;   /* Fondo */
  --dark2:  #251808;   /* Fondo inputs */
  --card:   #2E1E0A;   /* Cards */
  --card2:  #3A2510;   /* Hover / detalle */
  --text:   #FFF8EE;   /* Texto principal */
  --muted:  #C9A06A;   /* Texto secundario */
  --green:  #4CAF50;   /* Éxito */
  --red:    #E53935;   /* Error */
}
```

### Tipografías

| Fuente | Uso |
|---|---|
| `Fredoka One` | Títulos, logo, botones principales |
| `Nunito` | Cuerpo, labels, descripciones |

### Diseño responsivo

La app está optimizada para **375px de ancho** (mobile-first, estándar iPhone). En desktop se centra automáticamente. Soporta instalación como PWA en Android/iOS.

### Navegación principal

Bottom nav fija con 3 secciones:

| Icono | Sección |
|---|---|
| 📷 Crear | `crear.html` |
| 🎨 Museo | `museo.html` |
| ℹ️ Sobre | `sobre.html` |

---

## 🗺 Roadmap

### v0.1 — Base ✅
- [x] Onboarding de 3 slides animados
- [x] Acceso como invitado (solo nombre)
- [x] Login / registro opcionales
- [x] Dashboard con obras recientes
- [x] Página de creación con cámara/galería
- [x] Museo interactivo con ordenamiento
- [x] Página Sobre con info del MAMBAQ y equipo
- [x] PWA (manifest + service worker)
- [x] API REST con Node.js + MongoDB

### v0.2 — Interacción 🚧
- [ ] Integración real con IA para procesar dibujos
- [ ] Sistema de likes / corazones
- [ ] Comentarios moderados
- [ ] Vista de obra en pantalla completa con detalles

### v0.3 — Comunidad
- [ ] Perfil de artista con todas sus obras
- [ ] Búsqueda por nombre o estilo
- [ ] Retos de dibujo semanales
- [ ] Colecciones temáticas

### v0.4 — Producción
- [ ] Autenticación segura en backend (JWT + bcrypt)
- [ ] Moderación de contenido subido
- [ ] Panel de administración para el MAMBAQ
- [ ] Modo para maestros / aulas

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

```bash
# 1. Haz fork del repo
# 2. Crea tu branch
git checkout -b feature/mi-feature

# 3. Commitea tus cambios
git commit -m "Add: descripción de lo que hiciste"

# 4. Push
git push origin feature/mi-feature

# 5. Abre un Pull Request en GitHub
```

### Convención de commits

```
Add:    nueva funcionalidad
Fix:    corrección de bug
Style:  cambios de CSS/UI sin lógica
Docs:   cambios en documentación
Refac:  refactorización
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

<div align="center">

Hecho con ❤️ en Barranquilla, Colombia 🇨🇴

**MAIMBAQ** — *Tu arte merece un museo*

[MAMBAQ](https://mambaq.com) · [Unisimón](https://unisimon.edu.co) · [Demo](https://nessisx.github.io/MAIMBAQ/)

</div>
