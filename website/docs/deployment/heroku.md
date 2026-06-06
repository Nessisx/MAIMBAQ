---
sidebar_position: 2
title: "Despliegue en Heroku"
---

# Despliegue en Heroku (Cómo lo hicimos)

Este documento detalla los pasos y procesos que utilizamos para desplegar MAIMBAQ en Heroku. Si bien Heroku fue nuestra plataforma inicial, ibamos a usar Azure pero tuvimos problemas con las VMs de la región.

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
```

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

- App pública: `https://maimbaq-dba2ec399b00.herokuapp.com/`

### 5. Configurar variables de entorno

Si tu aplicación necesita variables de entorno (como conexión a MongoDB), se configuran en Heroku:

```bash
heroku config:set MONGODB_URI="mongodb+srv://usuario:contraseña@cluster.mongodb.net/maimbaq"
```

## Evidencia del proceso

### Crear app en Heroku

![Heroku create - Paso 1](/docs/images/Imagen%201%20-%20Creacion%20Heroku.png)

![Heroku create - Paso 2](/docs/images/Imagen%201.1%20-%20Creacion%20Heroku.png)

### Push a Heroku

![Git push a Heroku](/docs/images/Imagen%202%20-%20Push%20del%20proyecto.png)

### Despliegue exitoso

![Despliegue completado](/docs/images/Imagen%202.1%20-%20Subida%20exitosa.png)

## Monitoreo y logs

Para ver los logs de tu aplicación en Heroku:

```bash
heroku logs --tail
```
