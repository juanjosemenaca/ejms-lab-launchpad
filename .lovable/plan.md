

# Web corporativa EJMS Lab S.L.

Landing de una sola página, moderna y tecnológica, orientada a captar leads de I+D / desarrollo tecnológico. Logo oficial integrado en cabecera y footer.

## Estructura de la página

```text
┌─────────────────────────────────────────┐
│ Header: [Logo EJMS LAB]  Inicio Servicios Contacto  [CTA] │
├─────────────────────────────────────────┤
│ HERO                                    │
│  Titular potente + subtítulo            │
│  CTA principal "Hablemos de tu proyecto"│
│  Fondo con efecto tech (grid + glow)    │
├─────────────────────────────────────────┤
│ SERVICIOS (3 tarjetas)                  │
│  · I+D y prototipado                    │
│  · Desarrollo de software               │
│  · Consultoría tecnológica              │
├─────────────────────────────────────────┤
│ POR QUÉ EJMS LAB (4 ventajas + iconos)  │
├─────────────────────────────────────────┤
│ CONTACTO                                │
│  Formulario (nombre, email, empresa,    │
│  mensaje) + datos de contacto al lado   │
├─────────────────────────────────────────┤
│ Footer: logo, enlaces, copyright EJMS Lab S.L. │
└─────────────────────────────────────────┘
```

## Secciones en detalle

1. **Header fijo** — Logo a la izquierda, navegación con scroll suave a anclas (#servicios, #contacto), botón CTA "Contactar". Versión móvil con menú desplegable.
2. **Hero** — Titular tipo "Convertimos ideas en tecnología". Subtítulo sobre I+D y desarrollo. Dos CTAs: primario (contacto) y secundario (ver servicios). Fondo decorativo con grid sutil y resplandor de color de marca.
3. **Servicios** — 3 tarjetas con icono, título y descripción corta, hover con elevación y borde luminoso.
4. **Por qué EJMS Lab** — 4 puntos: experiencia, enfoque a medida, tecnología puntera, acompañamiento end-to-end.
5. **Contacto** — Formulario con validación + bloque de datos (email, ubicación). De momento el envío muestra confirmación con toast (sin backend); fácil de conectar a email/CRM más adelante.
6. **Footer** — Logo, nombre legal "EJMS Lab S.L.", enlaces de navegación, año dinámico.

## Estilo visual (moderno y tecnológico)

- Tema oscuro como base, con superficies elevadas y acentos luminosos.
- Paleta: fondo casi negro, texto claro, acento cian/azul eléctrico para CTAs y detalles, gradientes sutiles.
- Tipografía sans-serif geométrica, jerarquía clara, mucho espacio en blanco.
- Animaciones suaves al hacer scroll (fade/slide-in), hover states con glow.
- Totalmente responsive (móvil, tablet, desktop).

## Detalles técnicos

- Copio el logo subido a `src/assets/ejms-lab-logo.png` y lo importo como módulo ES6.
- Versión del logo invertida en CSS (`filter: invert()`) o variante adaptada para fondo oscuro en header/footer.
- Tokens de color y tipografía definidos en `src/index.css` y `tailwind.config.ts` (HSL semántico, no colores directos en componentes).
- Componentes nuevos en `src/components/`: `Header`, `Hero`, `Services`, `WhyUs`, `Contact`, `Footer`.
- `src/pages/Index.tsx` se reescribe para componer las secciones.
- Formulario con `react-hook-form` + `zod` para validación; feedback con `sonner` toast.
- Scroll suave nativo con `scroll-behavior: smooth`.
- Metadatos SEO en `index.html`: título "EJMS Lab S.L. — I+D y desarrollo tecnológico", description, og:title/description/image (logo).
- Sin backend en esta fase. Si más adelante quieres que el formulario envíe emails reales, se añade Lovable Cloud + edge function con Resend.

