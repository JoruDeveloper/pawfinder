# 02 - Configuración de Agentes y Comandos

## 🎯 Objetivo
Configurar el comando `/renderizar-tarjetas` y el sub-agente de QA & Testing dentro del sistema de habilidades de Antigravity (`.agents/skills/`) para estandarizar la generación de la interfaz y la auditoría continua de resiliencia.

---

## 🛠️ Comandos y Habilidades Registradas

### 1. Comando `/renderizar-tarjetas`
- **Ubicación**: `.agents/skills/renderizar-tarjetas/SKILL.md`
- **Función**: Orquesta la generación de tarjetas de mascotas con Tailwind CSS, mobile-first, badges cromáticos por estado (`perdido`, `encontrado`, `en_adopcion`), placeholder dinámico para fotos faltantes y accesibilidad táctil de 44px.

### 2. Sub-Agente QA & Testing (`qa-testing`)
- **Ubicación**: `.agents/skills/qa-testing/SKILL.md`
- **Función**: Audita exhaustivamente componentes de interfaz sometiéndolos a datos incompletos (`null`, `undefined`, campos vacíos, URLs rotas, fechas inválidas) y ejecuta la suite de pruebas automatizada en Vitest.

---

## 📋 Checklist de Configuración
- [x] Especificación de comando y roles definida.
- [x] Creación del skill `.agents/skills/renderizar-tarjetas/SKILL.md`.
- [x] Creación del skill `.agents/skills/qa-testing/SKILL.md`.
- [x] Integración en `AGENTS.md` para auto-activación durante el ciclo de vida del proyecto.
