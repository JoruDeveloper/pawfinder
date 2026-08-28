# 📘 REPORT.md — Portal Comunitario PawFinder

> **Documento de Reporte Técnico y de Implementación**
> Proyecto: **PawFinder** · Portal de Búsqueda, Rescate y Adopción de Mascotas
> Repositorio: `https://github.com/JoruDeveloper/pawfinder`
> Despliegue: `https://jorudeveloper.github.io/pawfinder/`
> Ruta base en producción: `/pawfinder`

---

## 1. Resumen Ejecutivo

PawFinder es una plataforma web comunitaria construida de forma **100% autónoma** (sin intervención manual de código) que permite a los usuarios reportar mascotas perdidas, encontrar ejemplares rescatados y gestionar adopciones. La solución fue diseñada bajo los principios de **Mobile-First estricto**, **Null-Safety extrema** y **despliegue estático automatizado** en GitHub Pages mediante CI/CD.

**Estado final:** ✅ Build estático exitoso · ✅ 36/36 pruebas aprobadas · ✅ Push a `main` · ✅ Despliegue a `gh-pages`.

---

## 2. Arquitectura Tecnológica

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Estilos | Tailwind CSS 3.4 (paleta temática de estados, glassmorphism, animaciones) |
| Base de Datos | SQLite vía `node:sqlite` (`pets.db`) |
| Pipeline de Datos | `pets.db` ➜ `scripts/seed-and-export.js` ➜ `src/data/pets.json` |
| Testing / QA | Vitest 3 + React Testing Library + `@testing-library/jest-dom` + jsdom |
| Despliegue | `output: 'export'` + GitHub Actions + rama `gh-pages` + `.nojekyll` |

### Paleta Temática de Estados
- **`perdido`** → rojo / ámbar (`#ef4444`, `#f59e0b`)
- **`encontrado`** → verde / esmeralda (`#10b981`, `#34d399`)
- **`en_adopcion`** → azul / celeste (`#3b82f6`, `#60a5fa`)

---

## 3. Estructura del Proyecto

```text
pawfinder/
├── .agents/
│   ├── rules/                # mobile-first.md, session-management.md
│   └── skills/               # renderizar-tarjetas, qa-testing, (y skills base)
├── .antigravity/
│   └── rules.md              # Políticas de operación autónoma
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD a GitHub Pages
├── public/
│   └── .nojekyll            # Evita procesamiento Jekyll
├── scripts/
│   └── seed-and-export.js   # Semilla SQLite + exportación JSON
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx         # Orquestador principal (estado, filtros, modales)
│   ├── components/
│   │   ├── FilterBar.tsx
│   │   ├── Header.tsx
│   │   ├── PetCard.tsx
│   │   ├── PetGrid.tsx
│   │   ├── PetImageFallback.tsx
│   │   ├── PetModal.tsx
│   │   ├── ReportPetModal.tsx
│   │   └── StatsBanner.tsx
│   ├── data/
│   │   └── pets.json        # Dataset generado (16 registros)
│   ├── lib/
│   │   └── pet-helpers.ts   # Sanitización y null-safety
│   ├── test/
│   │   ├── setup.ts
│   │   ├── pet-helpers.test.ts
│   │   ├── PetCard.test.tsx
│   │   ├── StatsBanner.test.tsx
│   │   ├── FilterBar.test.tsx
│   │   └── PetModal.test.tsx
│   └── types/
│       └── pet.ts           # PetRecord, PetSpecies, PetStatus, PetFilterState, PetStats
├── 01_PLAN_ARQUITECTURA_Y_DATOS.md … 05_DESPLIEGUE_Y_ENTREGA.md
├── AGENTS.md
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## 4. Capa de Datos (SQLite → JSON)

El script `scripts/seed-and-export.js` utiliza el módulo experimental `node:sqlite` para:

1. Crear la tabla `pets` con 17 columnas (`id`, `name`, `species`, `breed`, `age_years`, `gender`, `status`, `description`, `location`, `date_reported`, `image_url`, `contact_name`, `contact_phone`, `contact_email`, `reward_amount`, `is_vaccinated`, `is_sterilized`).
2. Insertar **16 registros** variados con fotos reales (Unsplash) y **casos deliberados con valores nulos** para validar la resiliencia:
   - 3 mascotas sin nombre (`name: null`) → fallback "Mascota sin nombre identificado".
   - Razas nulas → "Raza no especificada / Mestizo".
   - Fotos nulas → avatar SVG temático por especie.
   - Contactos sin teléfono o sin email → oculta acciones no disponibles.
   - Recompensas nulas → "Sin recompensa".
3. Exportar a `src/data/pets.json` y garantizar `public/.nojekyll`.

El `package.json` ejecuta `db:seed` automáticamente como `prebuild` y `predev`, asegurando que el dataset siempre esté vigente.

---

## 5. Capa de Resiliencia — Helpers de Null-Safety

`módulo src/lib/pet-helpers.ts` centraliza toda la sanitización:

| Función | Comportamiento ante nulo |
|---------|--------------------------|
| `getSafePetName` | `"Mascota sin nombre identificado"` |
| `getSafeBreed` | `"Raza no especificada / Mestizo"` |
| `getSafeAge` | Convierte `<1 año` a meses; `"Edad no especificada"` si nulo/NaN |
| `getSafeGender` | `{ label: "Sexo desconocido", symbol: "?" }` |
| `getSafeLocation` | `"Ubicación no disponible"` |
| `formatSafeDate` | Fecha en español legible; `"Fecha no registrada"` si inválida |
| `formatReward` | Moneda `es-CL` (`$150.000`); `"Sin recompensa"` si ≤ 0 |
| `getStatusConfig` | Badges y clases CSS temáticas por estado |
| `normalizeSpecies` | Detecta perro/gato/ave/otro de forma tolerante |
| `computeStats` | Métricas dinámicas (total/lost/found/adoption) |
| `sanitizePets` | Coerción segura del array crudo a `PetRecord[]` |

`PetImageFallback.tsx` renderiza avatares SVG con degradados por especie cuando `image_url` es nulo o la imagen falla (`onError`), eliminando el riesgo de íconos rotos.

---

## 6. Componentes UI (Mobile-First)

Todos los componentes son *Client Components* (`"use client"`) y cumplen:
- **Diseño mobile-first**: grids de 1→2→3→4 columnas según breakpoint.
- **Áreas táctiles ≥ 44px**: clase utilitaria `touch-target` (`min-height/width: 44px`).
- **Sin desbordamiento horizontal**: sin anchos fijos problemáticos.
- **Accesibilidad**: `aria-label`, `aria-pressed`, `role`, `aria-live`.

| Componente | Responsabilidad |
|-----------|-----------------|
| `Header` | Logo con gradiente, navegación responsiva, botón "Publicar Aviso" |
| `StatsBanner` | Tarjetas de métricas que actúan como filtros directos |
| `FilterBar` | Búsqueda en tiempo real (nombre/raza/ubicación), chips de especie, orden, reset |
| `PetCard` | Tarjeta con badge de estado, indicador de recompensa, chips de salud |
| `PetGrid` | Cuadrícula responsiva con empty-state interactivo |
| `PetModal` | Detalle completo con `tel:`, `mailto:`, ficha de salud y compartir |
| `ReportPetModal` | Formulario que agrega mascotas en memoria en tiempo real |
| `PetImageFallback` | Avatar SVG temático por especie ante foto nula/fallida |

La página `src/app/page.tsx` orquesta: estado de lista, filtros combinados (búsqueda + especie + estado + orden), modales y pie de página con protocolos de seguridad.

---

## 7. Testing Automatizado y Auditoría QA

Entorno: `vitest.config.ts` con `jsdom`, `pool: 'forks'`, alias `@/*` y `setup.ts` con `@testing-library/jest-dom`.

**Resultado: 36/36 pruebas aprobadas (100%).**

| Suite | Pruebas | Enfoque |
|-------|---------|---------|
| `pet-helpers.test.ts` | 14 | Formateo, conversión de edad, moneda, normalización de especie, stats, sanitización |
| `PetCard.test.tsx` | 3 | Renderizado, estrés de nulos, evento `onSelect` |
| `StatsBanner.test.tsx` | 3 | Conteo dinámico, estado activo, interacción |
| `FilterBar.test.tsx` | 3 | Input de búsqueda, chips de especie, reset |
| `PetModal.test.tsx` | 3 | Retorno nulo, detalle + acciones, cierre |

La auditoría de null-safety verificó que ningún campo nulo produce `undefined` visible ni `TypeError` en tiempo de ejecución.

---

## 8. Despliegue y CI/CD

`next.config.ts` configurado para exportación estática:
```typescript
output: "export",
basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/pawfinder" : ""),
assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/pawfinder/" : undefined),
trailingSlash: true,
images: { unoptimized: true },
```

`.github/workflows/deploy.yml` (disparado en `push` a `main`):
1. Checkout + Node 22.
2. `npm ci` → `npm run test` (QA gate).
3. `npm run db:seed` → `npm run build` (con `NEXT_PUBLIC_BASE_PATH=/pawfinder`).
4. `touch ./out/.nojekyll`.
5. Despliegue dual a rama `gh-pages` (`peaceiris/actions-gh-pages@v4`) y artefacto de Pages.

El archivo `.nojekyll` evita que GitHub Pages (Jekyll) ignore `_next/`, solucionando el conocido error 404.

**Comandos de publicación manual ejecutados:**
```bash
git init && git branch -M main
git remote add origin https://github.com/JoruDeveloper/pawfinder.git
git add . && git commit -m "feat(pawfinder): ..."
git push -u origin main
npx --yes gh-pages -d out --dotfiles -b gh-pages
```

---

## 9. Verificación Final

- ✅ `npm run test` → **36/36 passed**
- ✅ `npm run build` → compilación estática exitosa, `out/index.html` + `out/_next/` generados
- ✅ `out/.nojekyll` presente
- ✅ Push a `main` exitoso
- ✅ Rama `gh-pages` publicada (`Published`)
- ✅ Workflow de GitHub Actions disparado (build + pages deployment)

---

## 10. Checklist de Aprobación

- [x] `.antigravity/rules.md` y `AGENTS.md` con directivas estrictas
- [x] 5 documentos de tracking (`01`–`05`) con casillas `[x]`
- [x] SQLite (`pets.db`) sembrada con 16 registros y casos nulos
- [x] UI 100% responsiva (Mobile-First), áreas táctiles ≥44px, sin scroll horizontal
- [x] Helpers de sanitización + fallback SVG implementados
- [x] Suite de **36 pruebas** Vitest al 100%
- [x] Compilación estática Next.js (`output: 'export'`) en `out/`
- [x] `.nojekyll` + rama `gh-pages` desplegada
- [x] Repositorio sincronizado y accesible en producción

**URL de producción:** https://jorudeveloper.github.io/pawfinder/
