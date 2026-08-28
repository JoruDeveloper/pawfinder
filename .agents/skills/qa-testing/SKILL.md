---
name: qa-testing
description: Sub-agente y protocolo de QA & Testing para PawFinder. Audita la null-safety ante datos incompletos (nulos, vacíos, undefined, imágenes caídas) y ejecuta suites de pruebas automatizadas con Vitest.
---

# Sub-Agente: QA & Testing para PawFinder

Este protocolo define las directivas de auditoría de calidad de software y verificación de resiliencia ante datos degradados.

## Protocolo de Auditoría

1. **Prueba de Inyección de Nulos Extremos**:
   - Pasar a los componentes un objeto con todas las propiedades opcionales fijadas en `null` o `undefined`.
   - Verificar que no ocurra ningún error `TypeError: Cannot read properties of undefined` ni fallos de renderizado.

2. **Prueba de Resiliencia Visual**:
   - Mascotas con nombres de 100 caracteres no deben romper el layout (`line-clamp-1` o `truncate`).
   - Mascotas sin foto deben mostrar el fallback SVG de la especie correspondiente.
   - Mascotas con montos de recompensa 0, negativos o nulos no deben mostrar badges vacíos.
   - Teléfonos o correos nulos en el modal deben mostrar "No especificado" o deshabilitar la acción de llamada/email limpiamente.

3. **Ejecución de Pruebas Automatizadas**:
   - Ejecutar `npm run test` (Vitest) y asegurar 100% de tests aprobados.
   - Ejecutar `npm run build` para asegurar compilación estática libre de errores de tipado o rutas.
