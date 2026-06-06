---
sidebar_position: 2
title: "Despliegue en Heroku"
---

# Despliegue en Heroku (Cómo lo hicimos)

Este documento detalla los pasos y procesos que utilizamos para desplegar MAIMBAQ en Heroku y mapear un dominio personalizado con GoDaddy. Heroku fue nuestra plataforma inicial, y el sitio público se expone ahora como `https://www.maimbaq.bar/`.

## Pasos de despliegue

### 1. Preparar el repositorio

Nos aseguramos de que el repositorio ignore correctamente dependencias, builds y archivos sensibles mediante `.gitignore`:

```
node_modules/
.env
build/
dist/
.DS_Store
```

### 2. Crear el archivo `Procfile`

Heroku necesita un `Procfile` en la raíz del proyecto para saber cómo iniciar la aplicación.

**Para servir Docusaurus:**

```text
web: npm run start --prefix website
```

**Para ejecutar el backend Express:**

```text
web: npm --prefix backend start
```

````

### 3. Configurar `package.json` y scripts de build

En `website/package.json`, hacemos que Heroku ejecute el build antes de iniciar:

```json
{
  "scripts": {
    "build": "docusaurus build",
    "start": "node server.js",
    "heroku-postbuild": "npm run build"
  }
}
````

Crea un `server.js` en la carpeta `website/` que sirva la carpeta compilada:

```javascript
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4. Desplegar en Heroku

Una vez todo esté listo, se ejecutan los siguientes comandos:

```bash
git add .
git commit -m "Prepare for Heroku deploy"
heroku login
heroku create maimbaq-dba2ec399b00
git push heroku main
```

**Resultado:**

- App pública (dominio personalizado): `https://www.maimbaq.bar/`

### 5. Configurar dominio personalizado en GoDaddy

Después de crear y desplegar la aplicación en Heroku, configuramos un dominio personalizado en GoDaddy para que el sitio se sirva como `https://www.maimbaq.bar/`.

- En GoDaddy, edita los DNS de `www.maimbaq.bar`.
- Crea un registro CNAME para `www` apuntando al dominio Heroku de la aplicación, por ejemplo: `www` → `maimbaq-dba2ec399b00.herokuapp.com.`.
- En el panel de Heroku, agrega `www.maimbaq.bar` como dominio personalizado para la app.
- Habilita SSL automático en Heroku para que el dominio funcione con HTTPS.

> Si también quieres que `maimbaq.bar` sin www redirija a `www.maimbaq.bar`, configura el reenvío de dominio o el registro adecuado en GoDaddy.

### 6. Configurar variables de entorno

Si tu aplicación necesita variables de entorno (como conexión a MongoDB), se configuran en Heroku:

```bash
heroku config:set MONGODB_URI="mongodb+srv://usuario:contraseña@cluster.mongodb.net/maimbaq"
```

## Evidencia del proceso

### Crear app en Heroku

![Heroku create - Paso 1](../images/Imagen 1 - Creacion Heroku.png)

![Heroku create - Paso 2](../images/Imagen 1.1 - Creacion Heroku.png)

### Push a Heroku

![Git push a Heroku](../images/Imagen 2 - Push del proyecto.png)

### Despliegue exitoso

![Despliegue completado](../images/Imagen 2.1 - Subida exitosa.png)

## Monitoreo y logs

Para ver los logs de tu aplicación en Heroku:

```bash
heroku logs --tail
```
