---
description: Sube los cambios recientes a GitHub (add, commit y push a main) y publica en gh-pages
agent: build
---

Sube los cambios más recientes del proyecto PawFinder a GitHub usando los comandos nativos de opencode (la herramienta `bash`).

Mensaje de commit proporcionado por el usuario: **$ARGUMENTS**

Pasos a ejecutar en orden:

1. Muestra el estado actual con `git status` y un resumen corto de los cambios con `git diff --stat`.
2. Agrega todos los cambios relevantes del proyecto con `git add -A` (respeta el `.gitignore`; no incluyas `node_modules/`, `.next/`, `out/` ni `pets.db`).
3. Crea un commit semántico:
   - Si el usuario pasó un mensaje en `$ARGUMENTS`, úsalo (prefijo `feat:`, `fix:`, `docs:`, `chore:` según corresponda).
   - Si `$ARGUMENTS` está vacío, genera un mensaje convencional y conciso basado en `git status`.
4. Sube la rama con `git push -u origin main` (o `git push` si ya está configurada la upstream).
5. Tras el push, regenera y publica el sitio estático en GitHub Pages:
   - `npm run build` (esto ejecuta `db:seed` vía `prebuild`).
   - `touch out/.nojekyll`.
   - `npx --yes gh-pages -d out --dotfiles -b gh-pages`.
6. Confirma al usuario la URL de producción: https://jorudeveloper.github.io/pawfinder/

No pidas al usuario que ejecute comandos manualmente; haz todo con las herramientas disponibles. Si algún paso falla, autodiagnostica y corrige antes de continuar.
