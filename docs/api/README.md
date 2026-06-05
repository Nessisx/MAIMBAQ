# API REST

Backend de MAIMBAQ disponible en desarrollo local desde `http://localhost:5000`.

Esta sección resume los endpoints que usa la app para consultar, crear y mantener obras digitales.

## Lo esencial

- Base local: `http://localhost:5000/api`
- Recurso principal: `artworks`
- Estado del servicio: `GET /api/health`

## Health

- `GET /api/health`

Respuesta ejemplo:

```json
{
  "status": "ok",
  "message": "API saludable",
  "timestamp": "2026-05-13T00:00:00.000Z"
}
```

## Artworks

- `GET /api/artworks` - lista todas las obras.
- `GET /api/artworks/:id` - obtiene una obra por id.
- `POST /api/artworks` - crea una nueva obra.
- `PATCH /api/artworks/:id` - actualiza una obra.
- `DELETE /api/artworks/:id` - elimina una obra.

## Payload de ejemplo

```json
{
  "title": "Dragón espacial",
  "artist": "Picasso Jr.",
  "style": "DaVinci",
  "description": "Obra inspirada en un dibujo infantil",
  "emoji": "🐉",
  "status": "draft",
  "isFeatured": false
}
```

## Notas

- Si MongoDB no responde, el backend puede operar en modo memoria para pruebas locales.
- En producción, conecta `MONGODB_URI` a tu instancia real.
- La documentación completa del contrato de API está en [MAIMBAQ API Documentation](./APIDOC.md).
