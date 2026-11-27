# DESIGN.md — Lucas Oliveira Barbosa Portfolio

## Direction
Clean, restrained engineering portfolio with real product focus. Dark graphite (`#0b0d10`) and warm paper light (`#f8f7f4`) surfaces, `1px` structural hairlines, and a single teal accent (`#14b8a6` dark / `#0f766e` light).

## Hard Anti-Slop Rules
- **No decorative glow orbs or background grids** behind content.
- **No frosted-glass floating pill navbars** — use a flat, full-width sticky header with a `1px` bottom border.
- **No pulsing status dots** (`Available for work` pills).
- **No single-word italic serif flourishes** inside sans-serif headlines.
- **No multi-accent rainbow gradients** (stick to 1 primary accent + neutrals).
- **No invented metrics or fake latency numbers** (e.g., `340ms`); label interactive previews clearly as demos.
- **No LLM buzzword copy** (`Crafted`, `bridging`, `Where X meets Y`, excessive em dashes).
- **Real CV facts only:** experience, academic projects, skills, and courses must match `Currículo Lucas Oliveira Barbosa.pdf`.

## Typography
- Primary UI & headings: `Plus Jakarta Sans`
- Technical metadata & code: `JetBrains Mono`
- Crisp hierarchy via weight and size contrast, not decorative italics or uppercase pill spam.

## Interaction & Accessibility
- All clickable controls must be native `<button>` or `<a>` elements with visible keyboard focus rings.
- Short, crisp transitions (`160ms–240ms`), respecting `prefers-reduced-motion`.
- Default language: English (`en`), with persistent EN/PT toggle.
