# Requirements

Este documento resume los requisitos del proyecto MAIMBAQ de forma clara y separada por tipo.

## Funcionales

- Permitir navegar entre las pantallas de creación, carga, resultado, museo y sobre nosotros.
- Capturar o seleccionar una imagen del dibujo del usuario.
- Simular o ejecutar el flujo de generación de la obra.
- Mostrar el resultado con nombre de la obra, artista, estilo y fecha.
- Guardar obras en el museo del usuario.
- Permitir ver detalles de cada obra en un modal.

## Técnicos

- Usar Node.js con Express para el backend.
- Conectar el backend con MongoDB mediante Mongoose.
- Mantener una plantilla local de configuración separada del código.
- Evitar subir credenciales reales al repositorio.
- Servir el frontend localmente desde el backend para pruebas.
- Mantener rutas absolutas para navegación y assets cuando se ejecute en local.

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
