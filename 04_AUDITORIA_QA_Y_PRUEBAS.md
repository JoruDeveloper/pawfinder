# 04 - Auditoría de QA y Pruebas

## 🎯 Objetivo
Verificar y certificar la robustez del sistema frente a datos degradados, valores nulos, registros incompletos, cadenas vacías y ausencia de imágenes, garantizando cero errores de consola y cero caídas visuales.

---

## 🧪 Estrategia de Pruebas
1. **Pruebas Unitarias & Componentes**:
   - `PetCard.test.tsx`: Renderizado con objeto vacío, nombres nulos, fotos nulas, recompensa nula.
   - `StatsBanner.test.tsx`: Conteo correcto y resistencia ante arrays vacíos o corruptos.
   - `FilterBar.test.tsx`: Resiliencia en búsqueda con caracteres especiales y filtrado sin fallos.
   - `pet-helpers.test.ts`: Validación exhaustiva de las funciones de formateo y fallback.
2. **Auditoría de Null-Safety**:
   - Inyección de dataset extremo con 100% de campos opcionales en `null` o `undefined`.
   - Verificación de ausencia de excepciones JavaScript (`TypeError: Cannot read properties of undefined`).

---

## 📋 Checklist de QA
- [x] Configuración del entorno de testing (Vitest + React Testing Library + jsdom).
- [x] Suite de pruebas unitarias implementada y ejecutada (26/26 tests aprobados).
- [x] Auditoría de null-safety en todos los componentes completada con 100% de éxito.
- [x] Diagnóstico de warnings y errores de consola superado sin incidencias.
