# Framework E2E — Playwright + TypeScript (SauceDemo)

Framework de automatización de pruebas **end-to-end** construido con **Playwright** y **TypeScript**, siguiendo el patrón **Page Object Model** con componentes reutilizables, fixtures, datos de prueba desacoplados y ejecución **cross-browser**.

Es un proyecto de portfolio pensado para demostrar las capacidades que se esperan de un perfil **QA Automation Semi-Senior / Senior**: no solo automatizar clicks, sino tomar y justificar decisiones de **arquitectura, mantenibilidad, estabilidad y CI/CD**.

> **App bajo prueba:** [SauceDemo](https://www.saucedemo.com), una tienda de demo pública y estable, ideal para automatización (expone atributos `data-test` en todo el DOM).

---

## Qué demuestra este proyecto

| Capacidad | Cómo se ve en el código |
|---|---|
| **Arquitectura por capas** | `src/pages`, `src/components`, `src/fixtures`, `src/data`, `src/config` |
| **Page Object Model** | Los tests no conocen selectores; hablan de acciones de negocio |
| **Componentes reutilizables** | `HeaderComponent` compartido por composición |
| **Fixtures de Playwright** | Inyección de Page Objects lista para usar en cada test |
| **Data-Driven Testing** | Casos de login negativos generados desde un array |
| **Verificación de negocio** | El checkout valida que `Total = Item total + Tax` |
| **Aserciones web-first** | `expect(locator)...` con auto-wait; **cero** `sleep` fijos |
| **Config por ambiente** | `BASE_URL` por variable de entorno |
| **Cross-browser** | Chromium, Firefox y WebKit |
| **Type safety** | `tsc --noEmit` en verde, `strict: true` |
| **CI/CD** | Workflow de GitHub Actions listo en `.github/workflows` |

---

## Stack

- **[Playwright Test](https://playwright.dev)** — runner + librería de automatización.
- **TypeScript** (`strict`) — tipado estático sobre el código de pruebas.
- **Node.js** — entorno de ejecución.
- **GitHub Actions** — integración continua.

---

## Estructura del proyecto

```
proyecto-1-e2e-playwright/
├── src/
│   ├── config/
│   │   └── env.ts                  # Config por ambiente (baseURL desde variable de entorno)
│   ├── data/
│   │   ├── users.ts                # Datos de prueba: usuarios
│   │   └── checkout.data.ts        # Builder de datos de checkout
│   ├── components/
│   │   └── HeaderComponent.ts      # Componente reutilizable (carrito, menú)
│   ├── pages/
│   │   ├── BasePage.ts             # Clase base de todos los Page Objects
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutStepOnePage.ts
│   │   ├── CheckoutStepTwoPage.ts
│   │   └── CheckoutCompletePage.ts
│   └── fixtures/
│       └── pages.fixture.ts        # Fixtures: inyectan los Page Objects
├── tests/
│   ├── auth/login.spec.ts          # Login (data-driven + negativos)
│   ├── inventory/sorting.spec.ts   # Ordenamiento de productos
│   ├── cart/cart.spec.ts           # Carrito
│   └── checkout/checkout.spec.ts   # Checkout E2E (con verificación de totales)
├── docs/
│   └── GUIA-DE-APRENDIZAJE.md      # Documento de estudio (el "por qué" de todo)
├── .github/workflows/ci.yml        # Pipeline de CI
├── playwright.config.ts            # Configuración central de Playwright
├── tsconfig.json                   # Configuración de TypeScript
├── .env.example                    # Plantilla de variables de entorno
└── package.json
```

> **¿Por qué esta estructura?** Cada carpeta tiene una única responsabilidad. La explicación detallada de cada decisión está en **[docs/GUIA-DE-APRENDIZAJE.md](docs/GUIA-DE-APRENDIZAJE.md)**.

---

## Requisitos previos

- **Node.js** 18 o superior ([descargar](https://nodejs.org)).
- Conexión a internet (la app bajo prueba es pública).

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Instalar los navegadores de Playwright
npx playwright install
```

---

## Cómo correr los tests

```bash
npm test                 # Toda la suite, en los 3 navegadores
npm run test:chromium    # Solo Chromium (más rápido para desarrollo)
npm run test:headed      # Con navegador visible (ver qué hace)
npm run test:ui          # Modo UI interactivo de Playwright (ideal para debug)
npm run test:smoke       # Solo los tests críticos (@smoke)
npm run test:regression  # La regresión completa (@regression)
npm run typecheck        # Verificación de tipos (sin correr tests)
npm run report           # Abre el último reporte HTML
```

### Ver el reporte

Después de una corrida:

```bash
npm run report
```

Se abre un reporte HTML navegable. Si un test falló, incluye captura, video y **trace** (línea de tiempo con el DOM, la red y la consola de cada paso).

---

## Configuración por ambiente

Por defecto los tests corren contra `https://www.saucedemo.com`. Para apuntar a otra URL:

```bash
# Opción 1: variable inline
BASE_URL=https://otro-ambiente.com npm test

# Opción 2: archivo .env
cp .env.example .env       # y editá el valor
```

---

## Documentación de estudio

Este proyecto viene con una **guía de aprendizaje** que explica, paso a paso y con alternativas, **por qué** se tomó cada decisión (herramienta, arquitectura, patrones, selectores, esperas, CI):

**[docs/GUIA-DE-APRENDIZAJE.md](docs/GUIA-DE-APRENDIZAJE.md)**

---

## Roadmap (portfolio QA Automation Sr)

Este es el **Proyecto 1** de una serie:

1. **Framework E2E web** ← *estás acá*
2. Suite de **testing de API** (contratos, negativos, encadenamiento)
3. **Pipeline CI/CD** completo (este repo ya trae la base)
4. **Caza de flakiness** y estrategia de estabilidad
5. **Visual regression** + **contract testing** (Pact)

---

## Licencia

MIT.
