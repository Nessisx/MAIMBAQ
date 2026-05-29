# Refactoring de Paleta de Colores - MAIMBAQ

## Resumen
Se completó una refactorización completa de la paleta de colores del proyecto MAIMBAQ, transitando de una paleta cálida naranja/marrón a una paleta cultural contemporánea inspirada en museos, archivos y revistas culturales.

## Paleta Anterior
- **Primario (Amarillo/Naranja)**: #f5a623
- **Primario Oscuro**: #e8860a
- **Secundario (Teal)**: #1a8a9a
- **Fondo Oscuro**: #1a1008
- **Texto Claro**: #fff8ee

## Paleta Nueva
- **Primario (Guayaba/Terracota)**: #B96863
- **Primario Oscuro**: #8B4D48
- **Beige/Papel**: #DCCCBD
- **Marfil Cálido**: #F5F1EB
- **Negro Carbón**: #1E1E1E
- **Marrón Natural (Accent2)**: #8B6F47

## Archivos Modificados

### 1. CSS Globales
- ✅ `frontend/src/css/base.css`
  - Actualizado `:root` con nuevas variables CSS
  - Reemplazadas todas las referencias a `--gold`, `--gold-dark`, `--teal`
  - Actualizadas sombras, fondos y colores de componentes base

### 2. CSS por Página
- ✅ `frontend/src/css/crear.css`
  - Gradiente del botón "Escanea tu dibujo": naranja → terracota
  - Sombras actualizadas
  - Bordes y acentos refactorizados

- ✅ `frontend/src/css/museo.css`
  - Colores de etiquetas y clasificaciones
  - Bordes de tarjetas (gold-line y teal-line → primary)
  - Gradientes de placeholders

- ✅ `frontend/src/css/resultado.css`
  - Gradiente de imagen placeholder
  - Badge "Tu Obra"
  - Colores de botones

- ✅ `frontend/src/css/sobre.css`
  - Banner CTA
  - Botón "Empezar"
  - Iconos de organización

- ✅ `frontend/src/css/datos.css`
  - Etiquetas de campos
  - Botón "Vamos"
  - Botón "Atrás"

- ✅ `frontend/src/css/carga.css`
  - Sparkles (animaciones)
  - Barra de progreso
  - Texto de estado

### 3. PoseAI - IA Assistant
- ✅ `frontend/src/apps/poseai/pose-ai.css`
  - Variables de tema completo reemplazadas
  - Paleta oscura → luz contemporánea
  - Colores de botones, bordes y acentos

### 4. Archivos HTML
- ✅ `index.html` - Meta theme-color
- ✅ `pages/dashboard.html` - Meta theme-color
- ✅ `pages/crear.html` - Meta theme-color
- ✅ `pages/museo.html` - Meta theme-color
- ✅ `pages/resultado.html` - Meta theme-color
- ✅ `pages/sobre.html` - Meta theme-color
- ✅ `pages/IA.html` - Meta theme-color
- ✅ `frontend/src/apps/poseai/poseai.html` - Meta theme-color

## Características del Diseño Resultante

### Aesthetic
- **Estilo**: Museo/Archivo/Revista Cultural
- **Tono**: Elegante, minimalista, artístico
- **Espacio**: Abundante espacio en blanco
- **Tipografía**: Serif para títulos (Fredoka One), Sans-serif para cuerpo (Nunito)

### Accesibilidad
- Mayor contraste: Negro carbón (#1E1E1E) sobre fondo marfil (#F5F1EB)
- Colores terracota naturales, menos saturados
- Mejor legibilidad en luz natural

### Compatibilidad
- ✅ Sistema de variables CSS (escalable)
- ✅ PWA theme-color actualizado
- ✅ Compatible con todos los navegadores

## Verificación

### ✅ Búsquedas Completadas
- No hay referencias a `--gold` en CSS
- No hay referencias a `--teal` en CSS
- No hay referencias a `--gold-dark` en CSS
- No hay colores hex antiguos (#f5a623, #e8860a, #1a8a9a)
- Todos los theme-color meta tags actualizados

### ✅ Componentes Revisados
- Buttons (primarios y secundarios)
- Cards y containers
- Badges y labels
- Gradientes (fondos e imágenes)
- Sombras e iconos
- Navegación inferior

## Notas Técnicas

### Cambios Atómicos
Todos los cambios se hicieron usando:
1. Variables CSS raíz (`:root`)
2. Reemplazos de referencias de variables
3. Actualización de colores hardcodeados cuando fue necesario

### Mantenibilidad
- Sistema completamente basado en variables CSS
- Fácil de ajustar en el futuro
- Un único punto de verdad para colores en `base.css` y `pose-ai.css`

## Prueba Recomendada

1. **Visual**: Comparar captura antes/después
2. **Responsive**: Verificar en móvil, tablet y desktop
3. **Accesibilidad**: Contrast checker en DevTools
4. **Performance**: Verificar que no haya cambios en bundle size

---

**Fecha**: [Insertar fecha]
**Estado**: ✅ COMPLETADO
**Impacto Visual**: ALTO - Cambio de identidad de marca complete
