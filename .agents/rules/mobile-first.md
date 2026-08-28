# Reglas Mobile-First

Cualquier desarrollo de interfaz de usuario en el frontend debe realizarse con un enfoque prioritario en dispositivos móviles (mobile-first):

- **Tailwind por Defecto**: Escribe los estilos básicos para teléfonos móviles primero. Agrega modificadores responsivos (`md:`, `lg:`) únicamente para adaptar la vista a tabletas y ordenadores de escritorio.
- **Grids y Flexbox**: Los elementos del layout deben apilarse verticalmente en pantallas pequeñas y dividirse en columnas solo en pantallas medianas o superiores (ej. `grid grid-cols-1 md:grid-cols-3` o `flex flex-col md:flex-row`).
- **Navegación Móvil**: El menú de navegación debe colapsarse en pantallas móviles usando un menú hamburguesa o barra inferior táctil.
- **Área Táctil**: Todos los botones, enlaces interactivos y campos de formulario deben contar con un área táctil mínima de `44px` de alto/ancho para facilitar la pulsación en teléfonos.
- **Evitar Desplazamiento Horizontal**: No usar anchos fijos amplios (como `w-[500px]`) que fuercen scroll horizontal en móviles; usar anchos responsivos y porcentajes (como `w-full max-w-md`).
