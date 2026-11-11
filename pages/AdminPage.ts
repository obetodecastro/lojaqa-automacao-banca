import { Page } from '@playwright/test';

// Reúne as ações administrativas utilizadas nos testes E2E.
export class AdminPage {
  constructor(private page: Page) {}

  // Realiza o login administrativo e aguarda o acesso ao painel.
  async login() {
    await this.page.goto(
      'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html'
    );

    await this.page.locator('#email').fill('admin@system.com');

    await this.page
      .getByPlaceholder('Mínimo de 8 caracteres')
      .fill('AdminPassword123');

    await Promise.all([
      this.page.waitForURL('**/painel.html'),
      this.page.getByRole('button', { name: 'Entrar' }).click(),
    ]);
  }

  // Acessa a área de administração.
  async openAdministration() {
    await this.page.getByText('Administração', { exact: true }).click();
  }

  // Abre o gerenciamento de usuários.
  async openUsers() {
    await this.page.getByRole('button', { name: /^Usuários/ }).click();
  }

  // Aplica o filtro de usuários bloqueados.
  async filterBlockedUsers() {
    await this.page.locator('#adminUserRole').selectOption('blocked');
  }

  // Altera o perfil de acesso de um usuário específico.
  async updateUserRole(email: string, role: string) {
    const userCard = this.page.getByRole('article').filter({
      hasText: email,
    });

    const roleSelect = userCard.locator('select[data-field="role"]');

    // Expande o cartão caso o campo de edição esteja recolhido.
    if (!(await roleSelect.isVisible())) {
      await userCard.getByText(email, { exact: true }).click();
    }

    await roleSelect.selectOption(role);

    const saveButton = userCard.getByRole('button', {
      name: 'Salvar Alterações',
    });

    // Aguarda o botão de salvamento ficar visível.
    await saveButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await saveButton.click();
  }
}
