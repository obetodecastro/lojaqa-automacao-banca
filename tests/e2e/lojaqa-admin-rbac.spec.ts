import { test, expect } from '@playwright/test';
import { AdminPage } from '../../pages/AdminPage';

test('E2E-04 - Validar perfis de acesso dos usuários', async ({ page }) => {
  const adminPage = new AdminPage(page);

  await adminPage.login();
  await adminPage.openAdministration();
  await adminPage.openUsers();

  // Aguarda o carregamento da listagem de usuários.
  await expect(
    page.getByPlaceholder('Buscar por nome ou e-mail...')
  ).toBeVisible({ timeout: 10000 });

  // Verifica a presença dos quatro perfis de acesso.
  await expect(
    page.getByText('Administrador Geral admin@system.com', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Usuário Padrão user@system.com', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Usuário Bloqueado blocked@system.com', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('LojaQA Oficial lojista@system.com', { exact: true })
  ).toBeVisible();

  console.log('Perfis de acesso identificados corretamente.');
});
