# MAIMBAQ API Documentation

## Overview

**Base URL**: `http://localhost:5000/api`

**Production URL**: `https://api.maimbaq.com/api` (cuando sea publicado)

**Version**: 1.0.0

**Status**: Active

Este documento describe los endpoints del backend de MAIMBAQ y cómo se conectan con la experiencia de la app.

## Contexto de la API

La API alimenta el flujo de creación y museo virtual de MAIMBAQ. Su responsabilidad principal es guardar y consultar obras digitales, junto con la metadata asociada.

---

## Authentication

Actualmente, la API no requiere autenticación. En versiones futuras se puede proteger con JWT u OAuth2 si el proyecto lo necesita.

---

## Response Format

Todas las respuestas siguen un formato consistente:

### Success Response (2xx)

```json
{
  "success": true,
  "data": {},
  "message": "Descripción del éxito"
}
```

### Error Response (4xx, 5xx)

```json
{
  "success": false,
  "error": "Mensaje de error",
  "statusCode": 404
}
```

---

## Endpoints

### 1. Health Check

Verifica que el servidor esté funcionando.

#### Request

```http
GET /api/health
```

#### Response (200 OK)

```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### cURL Example

```bash
curl -X GET http://localhost:5000/api/health
```

---

### 2. List All Artworks

Obtiene la lista completa de obras. Soporta paginación y filtros.

#### Request

```http
GET /api/artworks
```

#### Query Parameters

| Parameter | Type    | Description                                               | Example            |
| --------- | ------- | --------------------------------------------------------- | ------------------ |
| `limit`   | integer | Número máximo de obras a retornar (default: 20, max: 100) | `?limit=10`        |
| `skip`    | integer | Número de obras a saltar (default: 0)                     | `?skip=20`         |
| `sort`    | string  | Campo para ordenar. Prefijo `-` para descendente          | `?sort=-createdAt` |
| `artist`  | string  | Filtrar por nombre del artista                            | `?artist=Carlos`   |

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Dinosaurio Espacial",
        "artist": "Carlos",
        "style": "Fantasía",
        "description": "Un dinosaurio navegando por el espacio",
        "imageUrl": "https://example.com/image1.jpg",
        "tags": ["dinosaurio", "espacio"],
        "views": 245,
        "likes": 18,
        "createdAt": "2024-01-10T14:30:00Z",
        "updatedAt": "2024-01-12T09:15:00Z"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Montaña Encantada",
        "artist": "María",
        "style": "Realismo",
        "description": "Una montaña con vegetación mágica",
        "imageUrl": "https://example.com/image2.jpg",
        "tags": ["montaña", "magia"],
        "views": 156,
        "likes": 12,
        "createdAt": "2024-01-09T16:20:00Z",
        "updatedAt": "2024-01-11T11:45:00Z"
      }
    ],
    "total": 2,
    "limit": 20,
    "skip": 0
  }
}
```

#### cURL Example

```bash
# Listar todas las obras
curl -X GET http://localhost:5000/api/artworks

# Con paginación
curl -X GET "http://localhost:5000/api/artworks?limit=10&skip=0"

# Ordenar por fecha descendente
curl -X GET "http://localhost:5000/api/artworks?sort=-createdAt"

# Filtrar por artista
curl -X GET "http://localhost:5000/api/artworks?artist=Carlos"
```

#### Status Codes

| Code | Description                        |
| ---- | ---------------------------------- |
| 200  | Success                            |
| 400  | Bad request (parámetros inválidos) |
| 500  | Server error                       |

---

### 3. Get Artwork by ID

Obtiene una obra específica por su ID.

#### Request

```http
GET /api/artworks/:id
```

#### URL Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `id`      | string | Yes      | MongoDB ObjectId o UUID de la obra |

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "item": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Dinosaurio Espacial",
      "artist": "Carlos",
      "style": "Fantasía",
      "description": "Un dinosaurio navegando por el espacio",
      "imageUrl": "https://example.com/image1.jpg",
      "tags": ["dinosaurio", "espacio"],
      "views": 245,
      "likes": 18,
      "createdAt": "2024-01-10T14:30:00Z",
      "updatedAt": "2024-01-12T09:15:00Z"
    }
  }
}
```

#### Response (404 Not Found)

```json
{
  "success": false,
  "error": "Obra no encontrada.",
  "statusCode": 404
}
```

#### Response (400 Bad Request)

```json
{
  "success": false,
  "error": "ID inválido.",
  "statusCode": 400
}
```

#### cURL Example

```bash
curl -X GET http://localhost:5000/api/artworks/507f1f77bcf86cd799439011
```

#### Status Codes

| Code | Description       |
| ---- | ----------------- |
| 200  | Success           |
| 400  | Invalid ID format |
| 404  | Artwork not found |
| 500  | Server error      |

---

### 4. Create Artwork

Crea una nueva obra de arte digital para el museo.

#### Request

```http
POST /api/artworks
Content-Type: application/json
```

#### Request Body

```json
{
  "title": "Dinosaurio Espacial",
  "artist": "Carlos",
  "style": "Fantasía",
  "description": "Un dinosaurio navegando por el espacio",
  "imageUrl": "https://example.com/image1.jpg",
  "tags": ["dinosaurio", "espacio"]
}
```

#### Request Body Parameters

| Parameter     | Type   | Required | Validation                    | Example                   |
| ------------- | ------ | -------- | ----------------------------- | ------------------------- |
| `title`       | string | Yes      | Min 3, Max 100 chars          | "Dinosaurio Espacial"     |
| `artist`      | string | Yes      | Min 2, Max 50 chars           | "Carlos"                  |
| `style`       | string | Yes      | Max 50 chars                  | "Fantasía"                |
| `description` | string | No       | Max 500 chars                 | "Un dinosaurio..."        |
| `imageUrl`    | string | Yes      | Valid URL                     | "https://..."             |
| `tags`        | array  | No       | Max 5 tags, each max 30 chars | ["dinosaurio", "espacio"] |

#### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "artwork": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Dinosaurio Espacial",
      "artist": "Carlos",
      "style": "Fantasía",
      "description": "Un dinosaurio navegando por el espacio",
      "imageUrl": "https://example.com/image1.jpg",
      "tags": ["dinosaurio", "espacio"],
      "views": 0,
      "likes": 0,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  },
  "message": "Obra creada exitosamente"
}
```

#### Response (400 Bad Request)

```json
{
  "success": false,
  "error": "El título es requerido.",
  "statusCode": 400
}
```

#### Response (400 Validation Error)

```json
{
  "success": false,
  "error": "Validación fallida: El título debe tener al menos 3 caracteres.",
  "statusCode": 400
}
```

#### cURL Example

```bash
curl -X POST http://localhost:5000/api/artworks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dinosaurio Espacial",
    "artist": "Carlos",
    "style": "Fantasía",
    "description": "Un dinosaurio navegando por el espacio",
    "imageUrl": "https://example.com/image1.jpg",
    "tags": ["dinosaurio", "espacio"]
  }'
```

#### JavaScript/Fetch Example

```javascript
const artwork = {
  title: "Dinosaurio Espacial",
  artist: "Carlos",
  style: "Fantasía",
  description: "Un dinosaurio navegando por el espacio",
  imageUrl: "https://example.com/image1.jpg",
  tags: ["dinosaurio", "espacio"],
};

const response = await fetch("http://localhost:5000/api/artworks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(artwork),
});

const result = await response.json();
console.log(result);
```

#### Status Codes

| Code | Description                                 |
| ---- | ------------------------------------------- |
| 201  | Artwork created successfully                |
| 400  | Validation error or missing required fields |
| 409  | Duplicate artwork (si aplica)               |
| 500  | Server error                                |

---

### 5. Update Artwork

Actualiza una obra existente (actualización parcial permitida).

#### Request

```http
PATCH /api/artworks/:id
Content-Type: application/json
```

#### URL Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `id`      | string | Yes      | MongoDB ObjectId de la obra |

#### Request Body (todos los campos son opcionales)

```json
{
  "title": "Dinosaurio Espacial Mejorado",
  "style": "Fantasía Moderna",
  "likes": 25,
  "views": 300,
  "tags": ["dinosaurio", "espacio", "aventura"]
}
```

#### Request Body Parameters

| Parameter     | Type   | Validation           | Example                   |
| ------------- | ------ | -------------------- | ------------------------- |
| `title`       | string | Min 3, Max 100 chars | "Dinosaurio Espacial"     |
| `artist`      | string | Min 2, Max 50 chars  | "Carlos"                  |
| `style`       | string | Max 50 chars         | "Fantasía Moderna"        |
| `description` | string | Max 500 chars        | "Un dinosaurio..."        |
| `imageUrl`    | string | Valid URL            | "https://..."             |
| `tags`        | array  | Max 5 tags           | ["dinosaurio", "espacio"] |
| `views`       | number | Non-negative         | 300                       |
| `likes`       | number | Non-negative         | 25                        |

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "artwork": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Dinosaurio Espacial Mejorado",
      "artist": "Carlos",
      "style": "Fantasía Moderna",
      "description": "Un dinosaurio navegando por el espacio",
      "imageUrl": "https://example.com/image1.jpg",
      "tags": ["dinosaurio", "espacio", "aventura"],
      "views": 300,
      "likes": 25,
      "createdAt": "2024-01-10T14:30:00Z",
      "updatedAt": "2024-01-15T11:00:00Z"
    }
  },
  "message": "Obra actualizada exitosamente"
}
```

#### Response (404 Not Found)

```json
{
  "success": false,
  "error": "Obra no encontrada.",
  "statusCode": 404
}
```

#### Response (400 Validation Error)

```json
{
  "success": false,
  "error": "Validación fallida: El título debe tener al menos 3 caracteres.",
  "statusCode": 400
}
```

#### cURL Example

```bash
curl -X PATCH http://localhost:5000/api/artworks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dinosaurio Espacial Mejorado",
    "likes": 25,
    "views": 300
  }'
```

#### JavaScript/Fetch Example

```javascript
const updates = {
  title: "Dinosaurio Espacial Mejorado",
  likes: 25,
  views: 300,
};

const response = await fetch(
  "http://localhost:5000/api/artworks/507f1f77bcf86cd799439011",
  {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  },
);

const result = await response.json();
console.log(result);
```

#### Status Codes

| Code | Description                  |
| ---- | ---------------------------- |
| 200  | Artwork updated successfully |
| 400  | Validation error             |
| 404  | Artwork not found            |
| 500  | Server error                 |

---

### 6. Delete Artwork

Elimina una obra de arte.

#### Request

```http
DELETE /api/artworks/:id
```

#### URL Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `id`      | string | Yes      | MongoDB ObjectId de la obra |

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "artwork": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Dinosaurio Espacial",
      "artist": "Carlos",
      "style": "Fantasía",
      "description": "Un dinosaurio navegando por el espacio",
      "imageUrl": "https://example.com/image1.jpg",
      "tags": ["dinosaurio", "espacio"],
      "views": 245,
      "likes": 18,
      "createdAt": "2024-01-10T14:30:00Z",
      "updatedAt": "2024-01-12T09:15:00Z"
    }
  },
  "message": "Obra eliminada exitosamente"
}
```

#### Response (404 Not Found)

```json
{
  "success": false,
  "error": "Obra no encontrada.",
  "statusCode": 404
}
```

#### cURL Example

```bash
curl -X DELETE http://localhost:5000/api/artworks/507f1f77bcf86cd799439011
```

#### JavaScript/Fetch Example

```javascript
const response = await fetch(
  "http://localhost:5000/api/artworks/507f1f77bcf86cd799439011",
  {
    method: "DELETE",
  },
);

const result = await response.json();
console.log(result);
```

#### Status Codes

| Code | Description                  |
| ---- | ---------------------------- |
| 200  | Artwork deleted successfully |
| 404  | Artwork not found            |
| 500  | Server error                 |

---

## Error Handling

### Common Error Codes

| Status Code | Error Type            | Description                        | Example                                              |
| ----------- | --------------------- | ---------------------------------- | ---------------------------------------------------- |
| 400         | Bad Request           | Datos inválidos o campos faltantes | `{ "error": "El título es requerido." }`             |
| 404         | Not Found             | Recurso no encontrado              | `{ "error": "Obra no encontrada." }`                 |
| 409         | Conflict              | Conflicto con datos existentes     | `{ "error": "Una obra con este título ya existe." }` |
| 422         | Unprocessable Entity  | Validación fallida                 | `{ "error": "Validación fallida: ..." }`             |
| 500         | Internal Server Error | Error del servidor                 | `{ "error": "Error interno del servidor" }`          |

### Error Response Format

```json
{
  "success": false,
  "error": "Descripción del error",
  "statusCode": 400,
  "details": {
    "field": "message"
  }
}
```

---

## Data Models

### Artwork Model

```typescript
interface Artwork {
  _id: string; // MongoDB ObjectId
  title: string; // Required, 3-100 chars
  artist: string; // Required, 2-50 chars
  style: string; // Required, max 50 chars
  description?: string; // Optional, max 500 chars
  imageUrl: string; // Required, valid URL
  tags?: string[]; // Optional, max 5 tags
  views: number; // Default: 0
  likes: number; // Default: 0
  createdAt: Date; // Auto-generated
  updatedAt: Date; // Auto-generated
}
```

---

## Rate Limiting

Actualmente no hay límite de velocidad configurado. En producción se recomienda:

- 100 requests por minuto por IP
- 10 requests por segundo para POST/PATCH/DELETE

---

## CORS Configuration

La API permite CORS desde:

- `http://localhost:3000` (desarrollo)
- `http://localhost:5000` (desarrollo)
- URLs configuradas en `process.env.CLIENT_ORIGIN`

---

## Environment Variables

Archivo `.env` necesario en `backend/`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/maimbaq
DB_MODE=mongo              # 'mongo' o 'memory'

# CORS
CLIENT_ORIGIN=http://localhost:3000

# Optional
LOG_LEVEL=info
```

---

## Examples

### Complete Workflow

#### 1. Verificar que el servidor esté activo

```bash
curl -X GET http://localhost:5000/api/health
```

#### 2. Crear una obra

```bash
curl -X POST http://localhost:5000/api/artworks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Primer Dinosaurio",
    "artist": "Juan",
    "style": "Fantasía",
    "imageUrl": "https://example.com/dino.jpg"
  }'
```

Response:

```json
{
  "success": true,
  "data": {
    "artwork": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Mi Primer Dinosaurio",
      "artist": "Juan",
      "style": "Fantasía",
      "imageUrl": "https://example.com/dino.jpg",
      "views": 0,
      "likes": 0,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

#### 3. Listar todas las obras

```bash
curl -X GET http://localhost:5000/api/artworks
```

#### 4. Obtener una obra específica

```bash
curl -X GET http://localhost:5000/api/artworks/507f1f77bcf86cd799439011
```

#### 5. Actualizar la obra (aumentar likes)

```bash
curl -X PATCH http://localhost:5000/api/artworks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"likes": 5, "views": 50}'
```

#### 6. Eliminar la obra

```bash
curl -X DELETE http://localhost:5000/api/artworks/507f1f77bcf86cd799439011
```

---

## Support & Feedback

Para reportar bugs o sugerir mejoras, contacta al equipo de desarrollo.

---

**Last Updated**: January 15, 2024
**API Version**: 1.0.0
**Status**: Active & Production Ready
