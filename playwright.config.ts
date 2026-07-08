import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/config/env';

/**
 * Configuración central de Playwright.
 * Documentación oficial: https://playwright.dev/docs/test-configuration
 *
 * Toda decisión de esta config está explicada en docs/GUIA-DE-APRENDIZAJE.md
 */
export default defineConfig({
  // Carpeta donde Playwright busca los archivos *.spec.ts
  testDir: './tests',

  // Corre los tests de un mismo archivo en paralelo (además de los archivos entre sí).
  fullyParallel: true,

  // En CI, falla si alguien dejó un test.only olvidado (evita que se saltee la suite).
  forbidOnly: !!process.env.CI,

  // Reintentos: 2 en CI para absorber inestabilidad de infraestructura; 0 en local
  // para NO esconder tests flaky mientras desarrollamos.
  retries: process.env.CI ? 2 : 0,

  // Workers (procesos en paralelo). Fijo en CI para resultados reproducibles;
  // en local Playwright usa ~50% de los núcleos disponibles.
  workers: process.env.CI ? 4 : undefined,

  // Reporters: HTML navegable (con trace viewer) + salida de lista en consola.
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Timeout global por test.
  timeout: 30_000,

  // Timeout específico de las aserciones web-first (expect(locator)...).
  expect: { timeout: 5_000 },

  // Opciones que heredan TODOS los tests.
  use: {
    // URL base: los page objects navegan con rutas relativas ('/inventory.html').
    baseURL: ENV.baseURL,

    // Traza (timeline + DOM + red) solo en el primer reintento: diagnóstico sin costo en cada corrida.
    trace: 'on-first-retry',

    // Captura de pantalla únicamente cuando un test falla.
    screenshot: 'only-on-failure',

    // Video solo si el test falla (se descarta si pasa).
    video: 'retain-on-failure',

    // Timeout por acción individual (click, fill, etc.).
    actionTimeout: 10_000,
  },

  // Matriz de navegadores. Cross-browser real: mismo test, tres motores distintos.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
