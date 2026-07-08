/**
 * Datos de prueba: usuarios de SauceDemo.
 *
 * SauceDemo expone varios usuarios de prueba, todos con la misma contraseña.
 * Cada uno simula un comportamiento distinto, útil para probar escenarios reales:
 *   - standard_user            → usuario "feliz", todo funciona.
 *   - locked_out_user          → devuelve error de cuenta bloqueada al loguear.
 *   - problem_user             → tiene bugs de UI a propósito (imágenes rotas, etc.).
 *   - performance_glitch_user  → responde con lentitud artificial.
 *
 * Centralizar los datos acá (y no repartirlos por los tests) es una buena
 * práctica: si un dato cambia, se corrige en un solo lugar.
 */

export interface User {
  username: string;
  password: string;
}

const PASSWORD = 'secret_sauce';

export const USERS = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  performanceGlitch: { username: 'performance_glitch_user', password: PASSWORD },
} as const satisfies Record<string, User>;
