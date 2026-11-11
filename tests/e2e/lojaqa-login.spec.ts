import { test, expect } from '@playwright/test';

// Valida o login administrativo pela interface web da LojaQA.
test('E2E-01 - Login administrativo', async ({ page }) => {
  await page.goto(
    'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html'
  );

  // Confirma que a tela de login foi carregada.
  await expect(
    page.getByRole('heading', { name: 'Acesso à LojaQA' })
  ).toBeVisible();

  await page.locator('#email').fill('admin@system.com');
  await page.getByPlaceholder('Mínimo de 8 caracteres').fill('AdminPassword123');

  // Aguarda o redirecionamento após a autenticação.
  await Promise.all([
    page.waitForURL('**/painel.html'),
    page.getByRole('button', { name: 'Entrar' }).click(),
  ]);

  // Valida o acesso ao painel e à área administrativa.
  await expect(
    page.getByRole('heading', { name: 'Painel Administrativo' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Administração do Sistema' })
  ).toBeVisible();

  await expect(page.getByText('admin@system.com')).toBeVisible();

  console.log('URL após login:', page.url());
  console.log('Login administrativo realizado com sucesso.');
});
