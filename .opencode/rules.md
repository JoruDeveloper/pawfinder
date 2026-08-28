# Políticas de Operación del Sistema & Restricciones Autónomas

## 🚫 Restricciones Estrictas (Hard Restrictions)
- **Cero Código Manual**: Prohibido escribir código manualmente o solicitar al usuario que complete funciones, bloques o configuraciones.
- **Sin Marcadores Incompletos**: Prohibido dejar marcadores tipo `// TODO`, `// Implement logic here` o componentes a medio construir.
- **Autonomía Total en Depuración**: Prohibido pedirle al usuario que solucione bugs o errores de consola; el agente debe autodiagnosticar y corregir mediante herramientas de análisis y pruebas.
- **Null-Safety Extrema**: Prohibido asumir que los datos de la base de datos o APIs vienen completos; la UI jamás debe romperse, mostrar `undefined` no formateado o lanzar excepciones con campos nulos o vacíos.

---

## ⚡ Comportamientos Permitidos y Requeridos
- **Generación 100% Autónoma**: Toda la lógica, vistas, estilos, componentes, pruebas y workflows deben ser generados y validados completamente por el agente.
- **Persistencia y Datos Dinámicos**: Usar SQLite (`pets.db`) como fuente dinámica de datos, con soporte para script de siembra y exportación tipada.
- **Orquestación de Comandos y Agentes**: Configurar y operar el comando `/renderizar-tarjetas` y el sub-agente de QA & Testing.
- **Control de Versiones y Despliegue**: Gestionar Git con commits semánticos y push a `https://github.com/JoruDeveloper/search-pets-webs`.
- **CI/CD Integrado**: Configurar GitHub Actions en `.github/workflows/deploy.yml` para despliegue automatizado en GitHub Pages.

---

## 📱 Principios de Diseño y Arquitectura
- **Mobile-First**: Componentes concebidos primero para dispositivos móviles (<640px) y escalados progresivamente. Áreas táctiles mínimas de 44px.
- **Estética Premium**: Paleta armónica moderna con Tailwind CSS, glassmorphism, micro-animaciones, estados de carga y empty states interactivos.
- **Resiliencia UI**: Fallback visual instantáneo (avatares/placeholders SVG elegantes) para mascotas sin foto y etiquetas informativas amigables para datos faltantes (edad, raza, contacto).
