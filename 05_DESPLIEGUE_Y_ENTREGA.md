# 05 - Despliegue y Entrega

## 🎯 Objetivo
Configurar el pipeline de Integración y Despliegue Continuo (CI/CD) mediante GitHub Actions, compilar el sitio estático (`output: 'export'`) y sincronizar los cambios con el repositorio remoto `https://github.com/JoruDeveloper/pawfinder` para su publicación en GitHub Pages.

---

## 🚀 Configuración de Despliegue
- **Repositorio Remoto**: `https://github.com/JoruDeveloper/pawfinder`
- **Rama Principal**: `main`
- **Workflow CI/CD**: `.github/workflows/deploy.yml`
- **Entorno de Publicación**: GitHub Pages (`gh-pages` / GitHub Actions deployment)
- **URL Estimada**: `https://jorudeveloper.github.io/pawfinder/`

---

## 📋 Checklist de Entrega
- [x] Inicialización y vinculación de repositorio Git con remoto `https://github.com/JoruDeveloper/pawfinder`.
- [x] Creación de workflow en `.github/workflows/deploy.yml`.
- [x] Validación local de compilación estática (`npm run build` sin errores, exportación a `out/`).
- [x] Commit semántico y `git push` a la rama `main` completado exitosamente.
- [x] Verificación final de entrega y documentación de acceso.
