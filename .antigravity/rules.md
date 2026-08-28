# 🛡️ Reglas de Operación Autónoma — PawFinder (`.antigravity/rules.md`)

Estas políticas son de cumplimiento **estricto** para cualquier agente que opere sobre el repositorio PawFinder.

## 1. Restricciones Hard (No Negociables)
- **Cero código manual**: El usuario nunca debe completar funciones, componentes o archivos. Toda la solución es generada y ejecutada por el agente.
- **Sin marcadores incompletos**: Prohibido dejar `// TODO`, `// Implement logic here` o componentes a medio construir.
- **Autonomía total en depuración**: Ante fallos de consola, tests o build, el agente autodiagnostica, aplica el fix y re-ejecuta hasta el 100% de éxito. No se delega al usuario.
- **Resiliencia / Null-Safety extrema**: Ningún campo nulo (`null`, `undefined`, cadena vacía, foto ausente) debe romper la UI, mostrar `undefined` o lanzar `TypeError`. Usar siempre los helpers de `src/lib/pet-helpers.ts`.

## 2. Estándares de UI
- **Mobile-First estricto**: Diseñar primero para `< 640px` y escalar con `sm:`, `md:`, `lg:`, `xl:`.
- **Áreas táctiles >= 44px**: Todo botón/enlace/campo usa la clase `touch-target` (`min-height/width: 44px`).
- **Sin desbordamiento horizontal**: Prohibido ancho fijo que genere scroll horizontal.
- **Paleta temática**: `perdido` (rojo/ámbar), `encontrado` (verde/esmeralda), `en_adopcion` (azul/celeste).

## 3. Calidad y Pruebas
- TypeScript estricto, sin `any` innecesario.
- Toda feature lleva pruebas en Vitest (`npm run test`) y debe alcanzar el 100% de éxito antes de desplegar.
- Pipeline: `db:seed` (SQLite) ➔ `src/data/pets.json` ➔ `next build` (`output: 'export'`) ➔ `gh-pages`.

## 4. Despliegue
- `basePath` y `assetPrefix`: `/pawfinder`.
- Siempre incluir `.nojekyll` en `public/` (copiado a `out/`).
- CI/CD en `.github/workflows/deploy.yml`; rama objetivo `gh-pages`.

## 5. Convenciones de Commits
- Mensajes descriptivos en español o inglés técnico, prefijo de tipo (`feat`, `fix`, `test`, `chore`).
- No hacer commit ni push sin que la suite de pruebas y el build pasen.
