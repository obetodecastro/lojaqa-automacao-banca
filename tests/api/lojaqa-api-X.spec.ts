import { test, expect } from '@playwright/test';

test('API-01 - Realizar login administrativo', async ({ request }) => {
  // Envia as credenciais para o endpoint de login.
  const response = await request.post('login', {
    data: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_LOGIN_PASSWORD,
    },
  });

  // Exibe informações seguras da requisição.
  console.log('URL acessada:', response.url());
  console.log('Status recebido:', response.status());

  // Verifica se o login foi aceito.
  expect(response.status()).toBe(200);

  // Verifica se a resposta contém JSON.
  expect(response.headers()['content-type']).toContain('application/json');

  // Valida os dados da resposta sem exibir o token.
  const responseData = await response.json();

  expect(responseData.token).toBeTruthy();
  expect(responseData.user.email).toBe(process.env.ADMIN_EMAIL);
  expect(responseData.user.role).toBe('admin');

  console.log('API-01: login administrativo realizado com sucesso.');
});
