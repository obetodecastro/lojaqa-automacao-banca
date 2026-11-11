import { test, expect } from '@playwright/test';
import { AdminPage } from '../../pages/AdminPage';

// Verifica o acesso administrativo ao gerenciamento de usuários.
test('E2E-02 - Acessar gerenciamento de usuários', async ({ page }) => {
  const adminPage = new AdminPage(page);

  await adminPage.login();

  // Confirma que o painel administrativo foi carregado.
  await expect(
    page.getByRole('heading', { name: 'Painel Administrativo' })
  ).toBeVisible();

  await adminPage.openAdministration();

  // Confirma que a área de administração foi aberta.
  await expect(
    page.getByRole('heading', { name: 'Administração do Sistema' })
  ).toBeVisible();

  // Aguarda o carregamento da listagem de usuários.
  await expect(
    page.getByPlaceholder('Buscar por nome ou e-mail...')
  ).toBeVisible({ timeout: 10000 });

  await expect(
    page.getByRole('button', { name: /^Usuários/ })
  ).toBeVisible();

  console.log('E2E-02: gerenciamento de usuários carregado com sucesso.');
});
