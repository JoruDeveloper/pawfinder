# 01 - Plan de Arquitectura y Datos

## 🎯 Objetivo
Definir la arquitectura de software, el modelo de datos relacional en SQLite (`pets.db`), el mecanismo de exportación y sincronización de datos con Next.js, y las garantías de null-safety en todo el flujo.

---

## 🏗️ Arquitectura del Sistema
- **Frontend Framework**: Next.js 15+ (App Router) + TypeScript + Tailwind CSS
- **Modo de Exportación**: `output: 'export'` (Generación estática para GitHub Pages)
- **Base de Datos Local / Semilla**: SQLite (`pets.db`) gestionada con script automatizado (`better-sqlite3` / `sqlite3`)
- **Pipeline de Datos**: `pets.db` ➔ `scripts/seed-and-export.js` ➔ `src/data/pets.json` ➔ Componentes React con tipado estricto
- **Aislamiento y Null-Safety**: Capa de adaptadores y helpers de sanitización (`safePetAdapter`) para blindar la UI.

---

## 🗄️ Esquema Relacional SQLite (`pets.db`)

```sql
CREATE TABLE IF NOT EXISTS pets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,                     -- Puede ser NULL (mascota sin nombre o no identificada)
  species TEXT NOT NULL,         -- 'perro', 'gato', 'ave', 'otro'
  breed TEXT,                    -- Puede ser NULL ('Mestizo' / 'Desconocida')
  age_years REAL,                -- Puede ser NULL
  gender TEXT,                   -- 'macho', 'hembra', 'desconocido' o NULL
  status TEXT NOT NULL,          -- 'perdido', 'encontrado', 'en_adopcion'
  description TEXT,              -- Puede ser NULL
  location TEXT NOT NULL,        -- Ciudad / Zona / Barrio
  date_reported TEXT NOT NULL,   -- Formato ISO YYYY-MM-DD
  image_url TEXT,                -- Puede ser NULL o ruta no existente
  contact_name TEXT,             -- Nombre de contacto o NULL
  contact_phone TEXT,            -- Teléfono o NULL
  contact_email TEXT,            -- Email o NULL
  reward_amount REAL,            -- Monto de recompensa o NULL
  is_vaccinated INTEGER DEFAULT 0,
  is_sterilized INTEGER DEFAULT 0
);
```

---

## 📋 Checklist de Ejecución
- [x] Especificación de arquitectura y esquema SQLite definida.
- [x] Script de inicialización y siembra `scripts/seed-and-export.js` con 16 registros diversos (casos con nulos, fotos ausentes, distintos estados).
- [x] Archivo `src/data/pets.json` generado automáticamente y sincronizado con `pets.db`.
- [x] Adaptador de datos con tipado TypeScript en `src/types/pet.ts` y helpers en `src/lib/pet-helpers.ts`.
