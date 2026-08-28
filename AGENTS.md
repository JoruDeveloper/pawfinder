# Antigravity Workspace Guidelines & PawFinder Architecture

Este archivo contiene la especificación de arquitectura, directivas de desarrollo y configuración de agentes y habilidades para el proyecto **PawFinder** (Portal de Búsqueda y Rescate de Mascotas Perdidas).

---

## 📌 Contexto y Arquitectura del Proyecto

### 1. Visión General
**PawFinder** es una plataforma web comunitaria para la búsqueda, rescate y adopción de mascotas extraviadas y encontradas. La plataforma está diseñada bajo un enfoque **Mobile-First**, con un diseño visual moderno (*rich aesthetics*), alta resiliencia ante datos nulos o corruptos (*null-safety*), y compilación estática para despliegue automatizado en GitHub Pages.

### 2. Stack Tecnológico
- **Frontend Framework**: Next.js 15+ (App Router) + React 19 + TypeScript
- **Estilos**: Tailwind CSS con paleta temática de estados (`perdido`, `encontrado`, `en_adopcion`) y animaciones sutiles.
- **Base de Datos & Pipeline de Datos**: SQLite (`pets.db`) gestionado vía script automatizado (`scripts/seed-and-export.js`) y exportado a `src/data/pets.json`.
- **Suite de Pruebas**: Vitest + React Testing Library + `@testing-library/jest-dom` + `jsdom`.
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) para despliegue en GitHub Pages.

---

## 🛠️ Roles, Habilidades y Comandos Disponibles (`.agents/skills/`)
- **`/renderizar-tarjetas` (`.agents/skills/renderizar-tarjetas/SKILL.md`)**: Orquesta la creación y renderizado de la grilla de tarjetas de mascotas con badges cromáticos, placeholders SVG por especie y accesibilidad táctil mínima de 44px.
- **`qa-testing` (`.agents/skills/qa-testing/SKILL.md`)**: Sub-agente para auditoría de null-safety, estrés de datos incompletos y ejecución automatizada de tests en Vitest.
- **`next-best-practices`**: Buenas prácticas, convenciones de archivos, Server Components (RSC) y optimización en Next.js.
- **`auth0-nextjs`**: Flujos de autenticación y gestión de sesiones con Auth0.
- **`nestjs-expert`**: Arquitectura backend modular con NestJS.

---

## 📋 Reglas Globales de Desarrollo (Always-On)

### 1. Mobile-First (Frontend)
- Todo diseño y componente UI debe comenzar pensando en pantallas móviles (`< 640px`) y escalar progresivamente con modificadores responsivos (`md:`, `lg:`).
- Áreas táctiles mínimas de `44px` en botones, enlaces y campos de formulario.
- Prohibido el desbordamiento horizontal (`overflow-x` no deseado o anchos fijos como `w-[500px]`).
- Menú de navegación colapsable y selectores táctiles accesibles.

### 2. Null-Safety y Resiliencia Extrema
- Todos los campos de datos (nombres, razas, edades, géneros, descripciones, recompensas, datos de contacto y fotos) deben ser renderizados mediante funciones sanitizadoras (`getSafePetName`, `getSafeBreed`, `getSafeAge`, `formatReward`, `PetImageFallback`).
- Ningún campo nulo debe mostrar literales "null" o "undefined" ni lanzar excepciones en tiempo de ejecución.

### 3. Calidad y Estándares de Código
- Tipado estricto en TypeScript sin uso innecesario de `any`.
- Separación de responsabilidades: componentes UI desacoplados de la lógica de sanitización y formateo.
- Manejo robusto de errores con estados visuales claros para el usuario (empty-states, loading states, badges informativos).
