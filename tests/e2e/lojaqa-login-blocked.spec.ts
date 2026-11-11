import { test, expect } from '@playwright/test';

// Verifica se usuários bloqueados são impedidos de acessar o sistema.
test('E2E-06 - Impedir login de usuário bloqueado', async ({ page }) => {
  await page.goto(
    'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html'
  );

  // Confirma que a tela de login foi carregada.
  await expect(
    page.getByRole('heading', { name: 'Acesso à LojaQA' })
  ).toBeVisible();

  await page.locator('#email').fill('blocked@system.com');

  await page
    .getByPlaceholder('Mínimo de 8 caracteres')
    .fill('Blocked123');

  // Tenta autenticar com a conta bloqueada.
  await page.getByRole('button', { name: 'Entrar' }).click();

  // Aguarda e valida a mensagem de bloqueio.
  await expect(
  page.getByText('Usuário bloqueado. Tentativa 1 de 3.', {
    exact: true,
  })
  ).toBeVisible({ timeout: 10000 });

 // Confirma que o usuário permanece na tela de login.
  await expect(page).toHaveURL(/login\.html/);

  await expect(
    page.getByRole('heading', { name: 'Acesso à LojaQA' })
  ).toBeVisible();

  console.log('E2E-06: acesso do usuário bloqueado impedido.');
});
