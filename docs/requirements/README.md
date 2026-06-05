# Requisitos del Proyecto

Este documento resume el alcance real de MAIMBAQ: la app, el backend, el museo y la documentación.

## Funcionales

- Permitir navegar entre las pantallas de entrada, creación, resultado, museo y sobre nosotros.
- Capturar o seleccionar una imagen del dibujo del usuario.
- Analizar o simular el flujo de generación de la obra.
- Mostrar el resultado con nombre de la obra, artista, estilo y fecha.
- Guardar obras en el museo del usuario.
- Permitir ver detalles de cada obra en un modal.
- Acceder a la documentación técnica desde GitHub Pages.

## Técnicos

- Usar Node.js con Express para el backend.
- Conectar el backend con MongoDB mediante Mongoose.
- Mantener la configuración sensible fuera del repositorio.
- Evitar subir credenciales reales al repositorio.
- Servir el frontend localmente desde el backend para pruebas.
- Mantener rutas absolutas para navegación y assets cuando se ejecute en local.
- Publicar la documentación en GitHub Pages con Docusaurus.

## Entorno local

- Puerto por defecto: `5000`.
- Base de datos: MongoDB Atlas o MongoDB local según la variable `MONGODB_URI`.
- Origen permitido para desarrollo: localhost y variantes de puerto usadas por el frontend.

## Archivos clave

- `backend/src/app.js`
- `backend/src/routes/artwork.routes.js`
- `index.html` (archivo raíz del frontend)
- `pages/crear.html` (página de creación)
- `pages/museo.html` (página museo)
- `pages/sobre.html` (página sobre)
