import { test, expect } from '@playwright/test';
import { AdminPage } from '../../pages/AdminPage';

// Verifica se o administrador consegue filtrar usuários bloqueados.
test('E2E-03 - Filtrar usuários bloqueados', async ({ page }) => {
  const adminPage = new AdminPage(page);
  const email = 'blocked@system.com';

  await adminPage.login();
  await adminPage.openAdministration();
  await adminPage.openUsers();

  // Aguarda o carregamento da área de usuários.
  await expect(
    page.getByPlaceholder('Buscar por nome ou e-mail...')
  ).toBeVisible({ timeout: 10000 });

  await adminPage.filterBlockedUsers();

  const userCard = page.getByRole('article').filter({
    hasText: email,
  });

  // Confirma que a conta bloqueada aparece na listagem.
  await expect(userCard).toBeVisible({ timeout: 10000 });

  await expect(
    userCard.getByText('BLOQUEADO', { exact: true })
  ).toBeVisible();

  console.log('Usuário bloqueado localizado na administração.');
});
