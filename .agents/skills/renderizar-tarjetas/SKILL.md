---
name: renderizar-tarjetas
description: Orquesta y valida la generación de la grilla de tarjetas de mascotas (PetCard y PetGrid) con Tailwind CSS, Mobile-First, badges de estado dinámicos, placeholders SVG para fotos faltantes y accesibilidad táctil de 44px.
---

# Habilidad / Comando: Renderizar Tarjetas de Mascotas

Esta habilidad estandariza la construcción y renderizado de la interfaz visual de tarjetas de mascotas en **PawFinder**.

## Especificaciones de Renderizado

1. **Estructura Visual de Tarjeta (`PetCard`)**:
   - Contenedor con borde suave, sombra hover (`hover:shadow-xl hover:-translate-y-1 transition-all duration-300`).
   - Imagen con contenedor de aspect ratio fijo (`aspect-[4/3]`) y renderizado condicional:
     - Si `image_url` es válida: `<img src="..." alt="..." className="w-full h-full object-cover" />`
     - Si `image_url` es nula/vacía: Renderizar `PetImageFallback` (SVG ilustrado por especie con degradado temático).
   - Badge flotante en esquina superior derecha:
     - **Perdido**: Rojo / Ámbar (`bg-rose-500/90 text-white animate-pulse-subtle`)
     - **Encontrado**: Esmeralda / Verde (`bg-emerald-500/90 text-white`)
     - **En Adopción**: Azul / Cian (`bg-sky-500/90 text-white`)
   - Recompensa destacada (si aplica): Badge dorado con ícono de moneda.
   - Datos clave: Nombre (o "Mascota sin nombre"), Especie, Raza (o "Raza no especificada"), Ubicación con ícono de pin, Fecha con ícono de calendario.
   - Botón de acción principal: "Ver Detalles" con altura mínima de `44px` para cumplimiento táctil mobile-first.

2. **Null-Safety Requerida**:
   - Usar siempre helpers sanitizadores (`getSafePetName`, `getSafeBreed`, `getSafeLocation`, `formatReward`).
   - Ningún campo nulo debe mostrar texto "null" o "undefined" en pantalla.

3. **Grilla (`PetGrid`)**:
   - Layout responsive: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`.
   - Empty State ilustrado cuando el filtro no arroja resultados, con botón de "Restablecer filtros".
