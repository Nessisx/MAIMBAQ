# PoseAI - Integración en MAIMBAQ

## Descripción

PoseAI es una aplicación web que utiliza inteligencia artificial para analizar poses humanas a partir de imágenes. Detecta y clasifica gestos como Piedra, Papel y Tijera utilizando:

- **MediaPipe Hands**: Detección geométrica de landmarks de manos (método principal)
- **Teachable Machine**: Modelo de aprendizaje automático como fallback

## Ubicación en el Proyecto

```
frontend/
└── src/
    └── apps/
        └── poseai/
            ├── poseai.html         # Página principal
            ├── pose-ai.css         # Estilos (adaptados a MAIMBAQ)
            ├── script.js           # Lógica principal
            ├── model.json          # Configuración del modelo TM
            ├── metadata.json       # Metadatos del modelo TM
            └── weights.bin         # Pesos del modelo TM
```

## Acceso

PoseAI está integrado en la navegación principal de MAIMBAQ:

### Desde la página de inicio (index.html)
- Botón "Analiza poses 🤖" en la sección de bienvenida

### Desde cualquier página interna
- Ícono "🤖 PoseAI" en la barra de navegación inferior

### URLs directas
- Desde index.html: `frontend/src/apps/poseai/poseai.html`
- Desde páginas internas: `../frontend/src/apps/poseai/poseai.html`

## Características

### Métodos de Entrada
1. **Subir imagen**: Arrastra una imagen o selecciona desde el navegador
2. **Capturar foto**: Toma una foto con la cámara en tiempo real
3. **Cámara en vivo**: Análisis continuo en tiempo real desde la webcam

### Análisis
- Detección automática de manos y poses
- Clasificación de gestos (Piedra, Papel, Tijera)
- Confianza de predicción en porcentaje
- Información del método utilizado

## Estilos Adaptados

Los estilos de PoseAI han sido adaptados para coincidir con la paleta de colores de MAIMBAQ:

- **Color Principal**: Amarillo (#f5a623) - reemplaza al verde original
- **Fondo**: Oscuro (#1a1008) - consistente con MAIMBAQ
- **Tipografía**: Nunito - misma fuente que el proyecto principal
- **Componentes**: Botones y tarjetas rediseñados en línea con el design system de MAIMBAQ

## Dependencias Externas

El proyecto carga automáticamente:

- **TensorFlow.js**: Framework de ML en el navegador
- **MediaPipe**: Librería de detección de poses
- **Teachable Machine**: Herramienta de entrenamiento automático de ML

Todas se cargan dinámicamente desde CDN, sin necesidad de instalación local.

## Notas Técnicas

- Requiere acceso a la cámara web (para captura de fotos)
- Funciona en navegadores modernos con WebGL
- El modelo se carga una sola vez al iniciar la aplicación
- Los análisis en tiempo real se ejecutan cada 500ms para optimizar rendimiento

## Troubleshooting

### "No se pudo acceder a la cámara"
- Verifica los permisos de cámara en tu navegador
- Algunos navegadores requieren conexión HTTPS para acceder a la cámara

### "No se pudo detectar la mano"
- Mejora la iluminación
- Asegúrate de que la mano está completamente visible en la imagen
- Intenta diferentes ángulos o posiciones

### Modelos no cargan
- Recarga la página
- Verifica tu conexión a internet
- Comprueba la consola del navegador para ver mensajes de error específicos
