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

## 📚 Enlaces Importantes

| Recurso                    | Link                                                                |
| -------------------------- | ------------------------------------------------------------------- |
| **Documentación Completa** | [📖 Docusaurus](https://nessisx.github.io/MAIMBAQ/)                 |
| **Repositorio GitHub**     | [🐙 github.com/nessisx/MAIMBAQ](https://github.com/nessisx/MAIMBAQ) |

> **Nota**: Recomendamos borrar caché del navegador si ya visitó la documentación anteriormente.

## Qué incluye

- 🎨 Conversión de dibujos en obras digitales mediante herramientas de procesamiento visual.
- 🤖 Análisis de poses con inteligencia artificial utilizando MediaPipe y TensorFlow.
- 🏛️ Museo interactivo para explorar y visualizar las obras creadas.
- 📱 Flujo intuitivo de usuario: crear, procesar y visualizar resultados.
- 🔔 Compatibilidad con PWA para una experiencia más accesible desde distintos dispositivos.
- 🎭 API REST para la gestión de obras digitales mediante operaciones CRUD.
- 📚 Documentación técnica y guías de uso del proyecto.
- 🎯 Diseño inspirado en museos y espacios culturales digitales.

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

## Evolución del proyecto

- Fase 0 — Idea y prototipo: concepto inicial y primeras pantallas estáticas.
- Fase 1 — MVP frontend: interfaz móvil-first para crear y visualizar obras.
- Fase 2 — Backend y API: endpoints CRUD para `artworks` y almacenamiento en MongoDB.
- Fase 3 — Integración IA: análisis de poses con MediaPipe/TensorFlow para enriquecer resultados.
- Fase 4 — Documentación pública: migración de docs a Docusaurus y publicación en GitHub Pages.
- Fase 5 — Mantenimiento y mejoras: refactor, accesibilidad, y ajustes de diseño (actual).

Si quieres que incluya fechas concretas o eventos adicionales, dime y lo actualizo.

## Contribuir

1. Haz fork del repositorio.
2. Crea una rama nueva: `git checkout -b feature/mi-feature`.
3. Haz commit de tus cambios.
4. Envía un pull request.

## Licencia

MIT - Ver [LICENSE](LICENSE) para más detalles.

---

Hecho con foco en experiencia de dibujo y arte digital.
Espero les guste este grandiosisimo proyecto, para que todos los niños y niñas de toda barranquilla suban su hermosa creatividad. 🎨✨
