🧪 GUÍA DE PRUEBA - PoseAI en MAIMBAQ
=====================================

Esta guía te ayudará a probar la integración de PoseAI en MAIMBAQ.


🚀 ACCESO INICIAL:
=================

Opción 1: Desde la página de bienvenida (index.html)
  1. Abre: index.html en tu navegador
  2. Baja hasta la sección de botones
  3. Haz clic en "Analiza poses 🤖"
  4. Serás redirigido a: frontend/src/apps/poseai/poseai.html

Opción 2: Desde el tablero (dashboard.html)
  1. Accede a: pages/dashboard.html
  2. Verás la barra de navegación inferior
  3. Haz clic en "🤖 PoseAI"
  4. Serás redirigido a la aplicación

Opción 3: URL directa
  - Accede directamente a: frontend/src/apps/poseai/poseai.html


✅ PRUEBAS A REALIZAR:
====================

1. VERIFICACIÓN DE NAVEGACIÓN
   ─────────────────────────────
   □ index.html → Botón "Analiza poses 🤖" visible
   □ pages/dashboard.html → Ícono "🤖 PoseAI" en nav inferior
   □ pages/crear.html → Ícono "🤖 PoseAI" en nav inferior
   □ pages/museo.html → Ícono "🤖 PoseAI" en nav inferior
   □ pages/resultado.html → Ícono "🤖 PoseAI" en nav inferior
   □ pages/sobre.html → Ícono "🤖 PoseAI" en nav inferior

2. VERIFICACIÓN DE ESTILOS
   ────────────────────────
   □ Color primario: Amarillo MAIMBAQ (#f5a623)
   □ Fondo: Oscuro (#1a1008)
   □ Tipografía: Nunito
   □ Botones: Consistentes con MAIMBAQ
   □ Colores de texto: Claros y legibles

3. FUNCIONALIDAD DE POSEAI
   ───────────────────────
   □ Página carga correctamente
   □ Elementos HTML visibles (zona de carga, botones)
   □ Cargar imagen → Funciona
   □ Capturar foto → Abre cámara
   □ Cámara en vivo → Abre análisis en tiempo real
   □ Analizar pose → Muestra resultados

4. MODELOS DE IA
   ──────────────
   □ Modelos se cargan correctamente
   □ Estado de carga visible
   □ MediaPipe Hands carga exitosamente
   □ Teachable Machine carga como fallback
   □ Mensaje de éxito: "✅ Todo listo. Sube una imagen para analizar."

5. ANÁLISIS DE IMÁGENES
   ────────────────────
   □ Subir imagen → Muestra vista previa
   □ Botón "Analizar pose" se habilita
   □ Análisis completa exitosamente
   □ Resultado muestra:
     - Emoji de gesto (🪨 / 📄 / ✂️)
     - Nombre del gesto (Piedra/Papel/Tijera)
     - Porcentaje de confianza
     - Método utilizado (MediaPipe o Teachable Machine)
     - Gráfico de probabilidades

6. CÁMARA EN VIVO
   ──────────────
   □ Permiso de cámara solicitado
   □ Cámara se activa correctamente
   □ Análisis real-time funciona
   □ Resultados se actualizan cada 500ms
   □ Botón "Cerrar cámara" detiene análisis

7. NAVEGACIÓN DESDE POSEAI
   ───────────────────────
   □ Botón "Volver" en header regresa a index.html
   □ Botón "Nueva imagen" reinicia la aplicación
   □ Botón "←" cierra cámara correctamente

8. RESPONSIVE DESIGN
   ─────────────────
   □ Funciona en desktop
   □ Funciona en tablet
   □ Funciona en móvil
   □ Elementos se adaptan correctamente


🔍 PUNTOS CLAVE A VALIDAR:
========================

Archivo: frontend/src/apps/poseai/poseai.html
  ✓ Rutas relativas correctas:
    - <link rel="stylesheet" href="pose-ai.css">
    - <script src="script.js"></script>
    - <a href="../../../index.html"> (Volver)

Archivo: frontend/src/apps/poseai/pose-ai.css
  ✓ Colores MAIMBAQ:
    - --accent: #f5a623 ✅
    - --bg: #1a1008 ✅
    - --surface: #251808 ✅
    - --text: #fff8ee ✅

Archivo: frontend/src/apps/poseai/script.js
  ✓ Estilos personalizados integrados
  ✓ Variable TM_URL correcta: "./";

Archivo: frontend/src/apps/poseai/model.json
  ✓ Presente y válido

Archivo: frontend/src/apps/poseai/metadata.json
  ✓ Presente y válido

Archivo: frontend/src/apps/poseai/weights.bin
  ✓ Presente (archivo binario)


🌐 PRUEBAS EN NAVEGADOR:
======================

1. Abre DevTools (F12)
2. Ve a Console
3. Busca mensajes "[PoseAI]"
4. Deberías ver:
   ✓ "Iniciando PoseAI…"
   ✓ "Cargando MediaPipe Hands…"
   ✓ "Cargando Teachable Machine (fallback)…"
   ✓ "MediaPipe Hands listo ✓"
   ✓ "Teachable Machine listo ✓"
   ✓ "✅ Todo listo. Sube una imagen para analizar."

5. Red (Network tab)
   ✓ poseai.html → 200
   ✓ pose-ai.css → 200
   ✓ script.js → 200
   ✓ model.json → 200
   ✓ metadata.json → 200
   ✓ CDN resources (MediaPipe, TensorFlow) → 200


📱 CASOS DE USO:
===============

Caso 1: Usuario nuevo
  index.html → Botón "Analiza poses 🤖" → PoseAI funciona ✓

Caso 2: Usuario registrado
  dashboard.html → Nav "🤖 PoseAI" → PoseAI funciona ✓

Caso 3: Navegación entre páginas
  any-page → Nav "🤖 PoseAI" → PoseAI funciona ✓
  PoseAI → "Volver" → index.html funciona ✓


⚠️ POSIBLES PROBLEMAS Y SOLUCIONES:
==================================

Problema: "No se puede encontrar el archivo CSS"
Solución: Verificar que pose-ai.css está en:
         frontend/src/apps/poseai/pose-ai.css
         Las rutas relativas deben ser: href="pose-ai.css"

Problema: "MediaPipe no carga"
Solución: Verificar conexión a internet
         Los modelos se cargan desde CDN
         Algunos navegadores pueden requerir HTTPS

Problema: "Cámara no funciona"
Solución: Dar permisos de cámara al navegador
         En producción requiere HTTPS
         Algunos navegadores pueden bloquearlo

Problema: "Estilos no se aplican"
Solución: Limpiar caché del navegador (Ctrl+Shift+R)
         Verificar que pose-ai.css existe
         Abrir DevTools para ver errores


✨ RESULTADO ESPERADO:
====================

Una aplicación PoseAI completamente integrada en MAIMBAQ que:
  ✅ Mantiene la estética visual de MAIMBAQ
  ✅ Es accesible desde múltiples puntos del sitio
  ✅ Funciona sin errores
  ✅ Carga los modelos de IA exitosamente
  ✅ Analiza poses con precisión
  ✅ Proporciona una experiencia de usuario fluida

---

¡Listo para probar! 🚀

Si encuentras algún problema, verifica los pasos anteriores
y consulta la documentación en:
  - INTEGRACION_POSEAI.md
  - frontend/src/apps/poseai/README.md
