
// Importa o teste e as validações da fixture autenticada.
import { test, expect } from '../../fixtures/auth.fixture';

// Testa a listagem de usuários pelo administrador.
test('API-02 - Listar todos os usuários', async ({ adminApi }) => {

  // Solicita a lista de usuários à API.
  const response = await adminApi.get('users');

  // Exibe o endereço e o status da resposta.
  console.log('URL acessada:', response.url());
  console.log('Status recebido:', response.status());

  // Valida se a API respondeu com sucesso.
  expect(response.status()).toBe(200);

  // Valida se o conteúdo retornado está no formato JSON.
  expect(response.headers()['content-type']).toContain('application/json');

  // Converte a resposta da API para JSON.
  const users = await response.json();

  // Verifica se a resposta é uma lista de usuários.
  expect(Array.isArray(users)).toBe(true);

  // Verifica se a lista contém pelo menos um usuário.
  expect(users.length).toBeGreaterThan(0);

  // Exibe somente a quantidade de usuários encontrados.
  console.log('Quantidade de usuários:', users.length);

  console.log('API-02: listagem de usuários realizada com sucesso.');
});
