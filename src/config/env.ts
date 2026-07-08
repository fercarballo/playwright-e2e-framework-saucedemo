/**
 * Configuración de ambiente centralizada.
 *
 * En lugar de hardcodear la URL en el código de los tests, la leemos de una
 * variable de entorno. Esto permite correr la MISMA suite contra distintos
 * ambientes (dev, staging, prod) cambiando una sola variable, sin tocar código:
 *
 *     BASE_URL=https://staging.mi-app.com npm test
 *
 * Si la variable no está definida, usamos un valor por defecto sensato.
 */

export interface EnvConfig {
  /** URL base de la aplicación bajo prueba. */
  baseURL: string;
}

const DEFAULT_BASE_URL = 'https://www.saucedemo.com';

export const ENV: EnvConfig = {
  baseURL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
};
