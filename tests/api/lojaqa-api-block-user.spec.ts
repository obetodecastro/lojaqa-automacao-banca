import { test, expect } from '../../fixtures/auth.fixture';

test('API-03 - Bloquear usuário', async ({ adminApi }) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const email = 'onaglei@live.co.uk';

  // Confirma que a senha administrativa está configurada.
  expect(adminPassword).toBeTruthy();

  // Consulta a lista de usuários.
  const usersResponse = await adminApi.get('users');
  expect(usersResponse.status()).toBe(200);

  const users = await usersResponse.json();

  // Localiza a conta de teste.
  const testUser = users.find(
    (user: { _id?: string; email?: string }) => user.email === email
  );

  expect(testUser).toBeTruthy();
  expect(testUser._id).toBeTruthy();

  try {
    // Solicita o bloqueio da conta.
    const response = await adminApi.put(`users/${testUser._id}`, {
      data: {
        role: 'blocked',
        adminPassword,
      },
    });

    expect(response.status()).toBe(200);

    const result = await response.json();
    expect(result.user.role).toBe('blocked');

    console.log('API-03: usuário bloqueado com sucesso.');

  } finally {
    // Restaura a conta para CLIENTE, mesmo que já estivesse bloqueada.
    const restoreResponse = await adminApi.put(`users/${testUser._id}`, {
      data: {
        role: 'user',
        adminPassword,
      },
    });

    expect(restoreResponse.status()).toBe(200);

    const restoreData = await restoreResponse.json();
    expect(restoreData.user.role).toBe('user');

    console.log('Perfil restaurado para CLIENTE.');
  }
});
