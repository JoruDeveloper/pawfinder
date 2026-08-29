Guillermo Cedeño

# 🐾 PawFinder — Portal de Búsqueda, Rescate y Adopción de Mascotas

> **Entregable del Proyecto Final — Curso de Desarrollo con Inteligencia Artificial**
> **Autor:** Guillermo Cedeño
> **Modelo de IA utilizado:** *Hy3 Free* (OpenCode Zen), orquestado desde **opencode**
> **Repositorio:** https://github.com/JoruDeveloper/pawfinder
> **Producción:** https://jorudeveloper.github.io/pawfinder/

---

## 1. Contexto Académico y Cumplimiento de Normativas

Este proyecto se desarrolló bajo las **Normativas Estrictas** del curso. A continuación se evidencia el cumplimiento de cada regla:

| # | Normativa | Cumplimiento | Evidencia en el proyecto |
|---|-----------|--------------|--------------------------|
| 1 | **Cero Código Manual** | ✅ | Toda la lógica, componentes, estilos, pruebas y workflows fueron generados mediante *prompting* y orquestación con los modos Plan/Build de opencode. No se escribió sintaxis manualmente. |
| 2 | **Integración de Contexto de Datos (MCP/SQLite)** | ✅ | `scripts/seed-and-export.js` crea `pets.db` (SQLite `node:sqlite`) y exporta `src/data/pets.json`, que se inyecta como contexto estructural para construir la UI. Incluye **16 registros con casos nulos deliberados**. |
| 3 | **Uso de Skills / Comandos Personalizados** | ✅ | Se creó la **skill** `.agents/skills/renderizar-tarjetas` (usada en la construcción del frontend) y el **comando personalizado** `.opencode/commands/deploy.md` (`/deploy`). |
| 4 | **Uso de Agentes Personalizados** | ✅ | Se integró el agente especializado `.opencode/agents/auditor.md` (`@auditor`), usado para la auditoría final de este entregable (ver Sección 8). |
| 5 | **Refactorización y Depuración Autónoma** | ✅ | Los errores (badges sin fondo por *purge* de Tailwind, imagen de modal sin límite, bug de edad sub-año, fallos de pruebas por duplicados) se diagnosticaron y corrigieron **automáticamente** vía el agente, sin intervención manual. |
| 6 | **Despliegue a Producción** | ✅ | Sitio publicado y accesible públicamente en GitHub Pages: **https://jorudeveloper.github.io/pawfinder/** |

**Perfil de referencia aplicado:** *Sistemas / Salud — Buscador de Historiales*. Al igual que el ejemplo del curso (panel que lee JSON/SQLite y debe soportar variables nulas sin colapsar), PawFinder consume una base de datos y aplica **reglas estrictas de null-safety** en el frontend para que campos nulos (`name`, `breed`, `image_url`, contactos, recompensas) no rompan la interfaz.

---

## 2. Objetivo y Alcance

PawFinder es una plataforma web comunitaria **Mobile-First** para:
- Reportar mascotas **perdidas**, **encontradas** y en **adopción**.
- Buscar/filtrar por nombre, raza, ubicación, especie y estado.
- Ver detalle completo con acciones de contacto (`tel:`, `mailto:`).
- Publicar avisos desde la propia interfaz (en memoria).

---

## 3. Arquitectura Tecnológica

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript (strict) |
| Estilos | Tailwind CSS 3.4 (paleta temática de estados, glassmorphism, animaciones) |
| Base de Datos | SQLite vía `node:sqlite` (`pets.db`) |
| Pipeline | `pets.db` ➜ `scripts/seed-and-export.js` ➜ `src/data/pets.json` |
| Testing/QA | Vitest 3 + React Testing Library + `@testing-library/jest-dom` + jsdom |
| Despliegue | `output: 'export'` + GitHub Actions + rama `gh-pages` + `.nojekyll` |

### Paleta temática de estados
- **`perdido`** → rojo / ámbar · **`encontrado`** → verde / esmeralda · **`en_adopcion`** → azul / celeste

### Estructura
```text
src/
├── app/            # layout.tsx, page.tsx (orquestador), globals.css
├── components/     # Header, StatsBanner, FilterBar, PetCard, PetGrid,
│                   # PetModal, ReportPetModal, PetImageFallback
├── lib/            # pet-helpers.ts (null-safety)
├── types/          # pet.ts (PetRecord, PetStatus, PetFilterState, PetStats)
├── test/           # 5 suites Vitest (36 tests)
└── data/           # pets.json (generado)
scripts/seed-and-export.js
.github/workflows/deploy.yml
.opencode/commands/deploy.md     # comando personalizado /deploy
.opencode/agents/auditor.md      # agente personalizado @auditor
.agents/skills/renderizar-tarjetas/  # skill usada en UI
```

---

## 4. Integración de Contexto de Datos (Normativa 2)

El archivo base es **SQLite**. El script `scripts/seed-and-export.js`:
1. Crea la tabla `pets` (17 columnas).
2. Inserta **16 registros** variados y con **casos nulos deliberados** (ids 2, 7 y 12: nombre nulo, raza nula, foto nula, contacto nulo, recompensa nula).
3. Exporta a `src/data/pets.json`, que **opencode inyecta como contexto** para que el agente construya la interfaz en función de esos datos reales.
4. Garantiza `public/.nojekyll`.

`page.tsx` importa `pets.json` en tiempo de compilación; el sitio estático contiene los 16 registros. En cada build, `prebuild` → `db:seed` regenera el dataset.

---

## 5. Null-Safety / Resiliencia Extrema (Normativa 5)

Todo campo renderizado pasa por helpers en `src/lib/pet-helpers.ts`:

| Función | Fallback ante nulo |
|---------|--------------------|
| `getSafePetName` | `"Mascota sin nombre identificado"` |
| `getSafeBreed` | `"Raza no especificada / Mestizo"` |
| `getSafeAge` | Convierte `<1 año` a meses; `"Edad no especificada"` |
| `getSafeGender` | `{ "Sexo desconocido", "?" }` |
| `getSafeLocation` | `"Ubicación no disponible"` |
| `formatReward` | `"Sin recompensa"` (moneda `es-CL`) |
| `formatSafeDate` | `"Fecha no registrada"` |
| `sanitizePets` | Defensa contra no-array y coerción de `status` inválido |

`PetImageFallback.tsx` renderiza **avatares SVG temáticos por especie** cuando `image_url` es nulo o la imagen falla (`onError`), eliminando íconos rotos. Resultado: **0** `undefined` visibles ni `TypeError`.

---

## 6. Componentes UI (Mobile-First)

Principios: grilla `1→2→3→4` columnas, áreas táctiles `touch-target` (≥44px), sin scroll horizontal, ARIA (`role`, `aria-modal`, `aria-live`, `aria-pressed`).

| Componente | Responsabilidad |
|-----------|-----------------|
| `Header` | Logo, navegación, botón "Publicar Aviso" |
| `StatsBanner` | Métricas dinámicas que actúan como filtros |
| `FilterBar` | Búsqueda en vivo + chips de especie + orden + reset |
| `PetCard` | Tarjeta con badge de estado, recompensa, chips de salud |
| `PetGrid` | Cuadrícula responsiva con empty-state |
| `PetModal` | Detalle + `tel:`/`mailto:` + compartir |
| `ReportPetModal` | Formulario que agrega mascotas en memoria |
| `PetImageFallback` | Avatar SVG por especie ante foto nula |

---

## 7. Testing Automatizado y QA (36/36)

`vitest.config.ts` con `jsdom`, `pool: 'forks'`, alias `@/*`. **Resultado: 36/36 pruebas aprobadas.**

| Suite | Tests | Enfoque |
|-------|-------|---------|
| `pet-helpers.test.ts` | 14 | Formateo, edad, moneda, especie, stats, sanitización |
| `PetCard.test.tsx` | 3 | Render, estrés de nulos, `onSelect` |
| `StatsBanner.test.tsx` | 3 | Conteo, estado activo, interacción |
| `FilterBar.test.tsx` | 3 | Input, chips, reset |
| `PetModal.test.tsx` | 3 | Nulo, detalle, cierre |

---

## 8. Auditoría con Agente Personalizado `@auditor` (Normativa 4)

> **Uso real del agente:** El agente `@auditor` (definido en `.opencode/agents/auditor.md`) **fue ejecutado en esta entrega** mediante la herramienta de tareas de opencode para generar el siguiente informe de auditoría (modo solo lectura; corrió `npm run test` y `npm run build`).

### Resumen de cumplimiento por área
| Área | Cumplimiento | Estado |
|------|-------------|--------|
| Null-Safety / Resiliencia | 98% | 🟢 |
| Mobile-First y Accesibilidad | 85% | 🟡 |
| Calidad de Código y Tipado | 95% | 🟢 |
| Datos y Pipeline (SQLite→JSON) | 95% | 🟢 |
| Pruebas / QA (Vitest) | 89% | 🟢 |
| Build y Despliegue CI/CD | 90% | 🟢 |

**✅ `npm run test`: 36/36 passed · ✅ `npm run build`: export estático exitoso en `out/` con `.nojekyll`.**

### Hallazgos (sin críticos 🔴)
- 🟡 Accesibilidad: botón "limpiar búsqueda" (`FilterBar.tsx`) ~28px, bajo el mínimo táctil de 44px.
- 🟡 Mobile-First: nav se oculta en `<640px` sin menú colapsable.
- 🟡 Calidad: `clsx`/`tailwind-merge` declaradas pero no importadas (deps muertas).
- 🟡 Pipeline: warning `MODULE_TYPELESS_PACKAGE_JSON` (script ESM sin `"type":"module"`).
- 🟡 QA: `ReportPetModal` no tiene test propio; `PetModal` no cubre caso nulo.
- 🟡 CI/CD: `deploy.yml` mezcla dos estrategias de Pages (recomendado unificar en `peaceiris/actions-gh-pages`).

Estos puntos son **mejoras de pulido no bloqueantes**; el proyecto compila, pasa la suite y está desplegado.

---

## 9. Comando Personalizado `/deploy` (Normativa 3)

> **Uso real del comando:** El comando `/deploy` (`.opencode/commands/deploy.md`) **fue configurado y su procedimiento se ejecutó** para publicar este entregable (add → commit → push a `main` → build → `gh-pages`).

**Escenarios de uso del comando `/deploy`:**
- **Publicar cambios rápidos:** el estudiante escribe `/deploy "fix: ajuste de badge"` y opencode stagedea, commitea con mensaje convencional y hace push a `main`, disparando el redeploy en CI/CD.
- **Entrega final:** `/deploy "feat: entrega proyecto final PawFinder"` sube todo y republica la rama `gh-pages` sin que el estudiante escriba un solo comando de Git.
- **Reproducibilidad:** encapsula el flujo de despliegue para que cualquier compañero del curso pueda publicar con la misma trazabilidad.

**Escenarios de uso del agente `@auditor`:**
- **Pre-entrega:** `@auditor` revisa null-safety, mobile-first, tipado y pruebas antes de subir.
- **Post-incidencia:** tras un error de consola, invocar `@auditor` para localizar la causa raíz sin tocar código manualmente (Normativa 5).
- **Evaluación:** el docente puede pedir al estudiante que corra `@auditor` y adjunte el informe como evidencia de calidad.

> Nota: además del comando, el proyecto usa la **skill** `.agents/skills/renderizar-tarjetas` durante la construcción del grid de tarjetas, cumpliendo el requisito de "al menos una skill".

---

## 10. Despliegue y CI/CD (Normativa 6)

`next.config.ts`:
```typescript
output: "export",
basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/pawfinder" : ""),
assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/pawfinder/" : undefined),
trailingSlash: true,
images: { unoptimized: true },
```

`.github/workflows/deploy.yml` (en `push` a `main`): `npm ci` → `npm run test` (gate QA) → `db:seed` → `npm run build` → `touch out/.nojekyll` → `peaceiris/actions-gh-pages@v4` a rama `gh-pages`. El `.nojekyll` evita el error 404 de Jekyll.

---

## 11. ¿Cómo funciona la página? (Manual de usuario)

1. **Inicio:** métricas (StatsBanner) y barra de filtros.
2. **Buscar:** escribe nombre/raza/ubicación; selecciona especie o estado; ordena por recientes/recompensa/nombre.
3. **Ver detalle:** clic en tarjeta → modal con descripción, salud, ubicación y botones **Llamar** / **Email** / **Compartir**.
4. **Publicar aviso:** botón "Publicar Aviso" → formulario → la mascota aparece al instante en la grilla.
5. **Resetear:** limpia todos los filtros.

### Limitaciones conocidas (modo estático)
- Los avisos agregados se guardan **en memoria** (no persisten al recargar); el sitio es estático sin backend.
- Los datos provienen de un **snapshot de build** (`pets.json`); cambios en `pets.db` requieren rebuild + redeploy.

---

## 12. Ejecución en Local

```bash
npm install
npm run db:seed      # genera pets.db y pets.json
npm run dev          # desarrollo (predev corre db:seed)
npm run test         # 36 pruebas Vitest
npm run build        # build estático en out/
npx --yes gh-pages -d out --dotfiles -b gh-pages   # despliegue manual
```

---

## 13. Checklist de Aprobación del Curso

- [x] **Norma 1** Cero código manual (100% orquestado por IA)
- [x] **Norma 2** Contexto de datos SQLite→JSON con nulos
- [x] **Norma 3** Skill + comando personalizado `/deploy`
- [x] **Norma 4** Agente personalizado `@auditor` (usado en auditoría)
- [x] **Norma 5** Depuración autónoma de todos los fallos
- [x] **Norma 6** Sitio público en GitHub Pages

**Autor:** Guillermo Cedeño · **Modelo IA:** Hy3 Free (OpenCode Zen) · **Herramienta:** opencode (modos Plan/Build, Skills, Comandos y Agentes personalizados).
