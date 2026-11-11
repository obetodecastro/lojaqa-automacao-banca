
// Carrega as variáveis do arquivo .env.
import 'dotenv/config';

// Importa a configuração do Playwright.
import { defineConfig, devices } from '@playwright/test';

// Define as configurações gerais do projeto.
export default defineConfig({
  // Pasta onde ficam os testes.
  testDir: './tests',

  // Reconhece arquivos terminados em .spec.ts.
  testMatch: '**/*.spec.ts',

  // Permite execução paralela.
  fullyParallel: true,

  // Configurações compartilhadas.
  use: {
    // Endereço-base da API.
    baseURL: process.env.BASE_URL,

    // Salva rastreamento em novas tentativas.
    trace: 'on-first-retry',
  },

  // Configuração do navegador para testes E2E.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Gera relatório HTML.
  reporter: 'html',
});
