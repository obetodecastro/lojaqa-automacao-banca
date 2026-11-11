import { test, expect } from '../../fixtures/auth.fixture';
import { AdminPage } from '../../pages/AdminPage';

test('E2E-05 - Alterar perfil de usuário', async ({ page, adminApi }) => {
  const adminPage = new AdminPage(page);
  const email = 'onaglei@live.co.uk';
  const adminPassword = process.env.ADMIN_PASSWORD;

  expect(adminPassword).toBeTruthy();

  // Consulta a API para localizar o ID da conta de teste.
  const usersResponse = await adminApi.get('users');
  expect(usersResponse.status()).toBe(200);

  const users = await usersResponse.json();

  const testUser = users.find(
    (user: { _id?: string; email?: string }) => user.email === email
  );

  expect(testUser).toBeTruthy();
  expect(testUser._id).toBeTruthy();

  try {
    // Prepara a conta com o perfil CLIENTE antes do teste.
    const setupResponse = await adminApi.put(`users/${testUser._id}`, {
      data: {
        role: 'user',
        adminPassword,
      },
    });

    expect(setupResponse.status()).toBe(200);

    const setupData = await setupResponse.json();
    expect(setupData.user.role).toBe('user');

    // Executa a alteração de perfil pela interface administrativa.
    await adminPage.login();
    await adminPage.openAdministration();
    await adminPage.openUsers();

    await page.getByPlaceholder('Buscar por nome ou e-mail...')
      .fill(email);

    const userCard = page.getByRole('article').filter({
      hasText: email,
    });

    await expect(userCard).toBeVisible({ timeout: 10000 });

    // Confirma o perfil inicial e verifica a alteração para BLOQUEADO.
    await expect(
      userCard.locator('select[data-field="role"]')
    ).toHaveValue('user');

    await adminPage.updateUserRole(email, 'blocked');

    await expect(
      userCard.locator('select[data-field="role"]')
    ).toHaveValue('blocked', { timeout: 10000 });

    console.log('Perfil alterado para BLOQUEADO.');

  } finally {
    // Garante a restauração da conta para CLIENTE, mesmo se o teste falhar.
    const restoreResponse = await adminApi.put(`users/${testUser._id}`, {
      data: {
        role: 'user',
        adminPassword,
      },
    });

    expect(restoreResponse.status()).toBe(200);

    const restoreData = await restoreResponse.json();
    expect(restoreData.user.role).toBe('user');

    console.log('Perfil restaurado para CLIENTE pela API.');
  }
});
