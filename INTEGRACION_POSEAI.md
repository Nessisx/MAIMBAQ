# MAIMBAQ - Fusión Completa de PoseAI

## 📋 Resumen de la Integración

El proyecto PoseAI ha sido completamente integrado en MAIMBAQ. La nueva estructura del proyecto ahora incluye:

### Estructura del Proyecto Unificado

```
MAIMBAQ/
├── index.html                           # Página principal (con acceso a PoseAI)
├── manifest.json
├── README.md
├── sw.js
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js
│       └── ... (resto de archivos backend)
│
├── frontend/
│   └── src/
│       ├── assets/
│       │   ├── fonts/
│       │   ├── icons/
│       │   └── images/
│       │
│       ├── css/                        # Estilos compartidos
│       │   ├── base.css
│       │   ├── crear.css
│       │   ├── museo.css
│       │   ├── resultado.css
│       │   └── ...
│       │
│       ├── js/
│       │   ├── app.js
│       │   ├── usernameModeration.js
│       │   └── usernameModeration.test.js
│       │
│       └── apps/                       # ✨ NUEVA CARPETA
│           └── poseai/                 # Aplicación PoseAI integrada
│               ├── poseai.html         # Página principal de PoseAI
│               ├── pose-ai.css         # Estilos adaptados a MAIMBAQ
│               ├── script.js           # Lógica de IA (MediaPipe + TM)
│               ├── model.json          # Configuración del modelo
│               ├── metadata.json       # Metadatos del modelo
│               ├── weights.bin         # Pesos entrenados
│               └── README.md           # Documentación de PoseAI
│
├── pages/
│   ├── crear.html          (✅ navegación actualizada)
│   ├── dashboard.html      (✅ navegación actualizada)
│   ├── museo.html          (✅ navegación actualizada)
│   ├── resultado.html      (✅ navegación actualizada)
│   └── sobre.html          (✅ navegación actualizada)
│
└── docs/
    └── api/
    └── requirements/
```

## 🎯 Cambios Realizados

### 1. **Reorganización de Carpetas**
- ❌ Eliminada: Carpeta independiente `/PoseAI/` en raíz
- ✅ Creada: Carpeta `/frontend/src/apps/poseai/` para mantener estructura cohesiva

### 2. **Adaptación de Estilos**
- Archivo original: `PoseAI/styles.css` (paleta verde/negra)
- Nuevo archivo: `frontend/src/apps/poseai/pose-ai.css`
- **Cambios de color**:
  - Verde (#c8f542) → Amarillo MAIMBAQ (#f5a623)
  - Fondo oscuro customizado → Colores de MAIMBAQ
  - Fuentes: Space Mono/Syne → Nunito (consistente con MAIMBAQ)

### 3. **Actualización de Rutas**
- HTML: `frontend/src/apps/poseai/poseai.html` (renombrado desde `index.html`)
- Scripts: Todas las referencias relativas corregidas
- Modelo: URLs internas correctamente configuradas

### 4. **Integración de Navegación**
Botón "🤖 PoseAI" agregado a:
- ✅ `index.html` - "Analiza poses 🤖" en sección de entrada
- ✅ `pages/dashboard.html` - Nav inferior (4 items)
- ✅ `pages/crear.html` - Nav inferior (4 items)
- ✅ `pages/museo.html` - Nav inferior (4 items)
- ✅ `pages/resultado.html` - Nav inferior (4 items)
- ✅ `pages/sobre.html` - Nav inferior (4 items)

### 5. **Archivos Copiados/Creados**
- ✅ `poseai.html` - HTML con rutas actualizadas
- ✅ `pose-ai.css` - Estilos nuevos (adaptados a MAIMBAQ)
- ✅ `script.js` - Lógica sin cambios (solo estilos internos ajustados)
- ✅ `model.json` - Configuración del modelo TensorFlow
- ✅ `metadata.json` - Metadatos del modelo
- ✅ `weights.bin` - Pesos del modelo (copia binaria)
- ✅ `README.md` - Documentación de PoseAI

## 🔗 Rutas de Acceso

### Desde la página principal (index.html):
```html
<a href="frontend/src/apps/poseai/poseai.html">Analiza poses 🤖</a>
```

### Desde páginas internas (pages/*/):
```html
<a href="../frontend/src/apps/poseai/poseai.html">🤖<span>PoseAI</span></a>
```

## 🎨 Paleta de Colores Unificada

| Elemento | Original PoseAI | MAIMBAQ | Adaptado |
|----------|-----------------|---------|----------|
| Color Primario | #c8f542 (verde) | #f5a623 (amarillo) | #f5a623 ✓ |
| Fondo | #0a0a0f | #1a1008 | #1a1008 ✓ |
| Superficie | #13131a | #251808 | #251808 ✓ |
| Texto | #eaeaf0 | #fff8ee | #fff8ee ✓ |
| Tipografía | Space Mono/Syne | Nunito | Nunito ✓ |

## 📱 Características de PoseAI

PoseAI utiliza dos métodos de IA complementarios:

1. **MediaPipe Hands** (Principal)
   - Detección geométrica de landmarks de manos
   - Análisis de 21 puntos de referencia (landmarks)
   - Determinación de gestos basada en geometría

2. **Teachable Machine** (Fallback)
   - Modelo entrenado con TensorFlow.js
   - 3 clases: Piedra, Papel, Tijera
   - Se activa si MediaPipe no detecta mano

## 🚀 Acceso y Navegación

### URLs Disponibles:
- **Inicio Principal**: `index.html` (botón "Analiza poses 🤖")
- **PoseAI Directo**: `frontend/src/apps/poseai/poseai.html`
- **Desde Dashboard**: Ícono en nav inferior

### Navegación Consistente:
Todas las páginas ahora incluyen:
- 📷 Crear
- 🎨 Museo
- 🤖 **PoseAI** (Nuevo)
- ℹ️ Sobre

## ✅ Validaciones Completadas

- ✓ Carpeta reorganizada correctamente
- ✓ Estilos adaptados a la paleta de MAIMBAQ
- ✓ HTML renombrado y rutas actualizadas
- ✓ Scripts funcionales con estilos integrados
- ✓ Modelo de IA incluido (model.json, metadata.json, weights.bin)
- ✓ Navegación integrada en todas las páginas
- ✓ Documentación completa

## 📝 Notas de Implementación

### Cambios en pose-ai.css:
- Ajuste de paleta de colores CSS custom properties
- Actualización de fuentes a Nunito
- Mantenimiento de la estructura y responsive design original
- Estilos inline removidos de JavaScript (ahora en CSS)

### Compatibilidad:
- Funciona en todos los navegadores modernos con WebGL
- Requiere HTTPS para acceso a cámara (en producción)
- Modelos se cargan desde CDN

## 🎯 Beneficios de la Integración

1. **Estructura Unificada**: El proyecto ahora tiene una estructura clara y escalable
2. **Experiencia Consistente**: Colores, fuentes y componentes alineados
3. **Navegación Intuitiva**: PoseAI accesible desde cualquier página
4. **Mantenimiento Facilitado**: Código centralizado y documentado
5. **Expansión Futura**: Fácil agregar más "apps" en `frontend/src/apps/`

---

**Última actualización**: 29 de Mayo de 2026
**Estado**: ✅ Integración Completada
