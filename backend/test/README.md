# Configuración local

Esta carpeta puede alojar una plantilla de configuración para ejecutar el backend en desarrollo.

## Valores sugeridos

- `MONGODB_URI`: cadena de MongoDB Atlas o instancia local.
- `MONGODB_DB_NAME`: nombre de la base de datos.
- `CLIENT_ORIGIN`: origen permitido para el frontend en desarrollo o producción.

## Uso

1. Crea o ajusta una plantilla local con los valores que necesitas.
2. Mantén las credenciales reales solo en tu máquina.
3. No subas secretos al repositorio.
