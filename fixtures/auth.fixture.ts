
// Importa as ferramentas necessárias do Playwright.
import {
  test as base,
  expect,
  request as playwrightRequest,
  APIRequestContext,
} from '@playwright/test';

// Define o tipo da fixture que disponibiliza a API autenticada.
type AuthFixtures = {
  adminApi: APIRequestContext;
};

// Cria uma extensão do Playwright com autenticação administrativa.
export const test = base.extend<AuthFixtures>({
  adminApi: async ({ request }, use) => {
    // Recupera as credenciais do administrador no arquivo .env.
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_LOGIN_PASSWORD;

    // Verifica se as credenciais estão configuradas.
    if (!email || !password) {
      throw new Error('Credenciais administrativas não configuradas.');
    }

    // Realiza o login administrativo na API.
    const loginResponse = await request.post('login', {
      data: { email, password },
    });

    // Confirma que a autenticação foi realizada com sucesso.
    expect(loginResponse.status()).toBe(200);

    // Converte a resposta do login para JSON.
    const loginData = await loginResponse.json();

    // Recupera o token JWT retornado pela API.
    const token = loginData.token;

    // Verifica se o token foi recebido.
    expect(token).toBeTruthy();

    // Cria um contexto de API com autenticação Bearer.
    const adminApi = await playwrightRequest.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Disponibiliza a API autenticada para os testes.
    await use(adminApi);

    // Encerra o contexto após a execução dos testes.
    await adminApi.dispose();
  },
});

// Exporta o expect para utilização nos testes.
export { expect };
