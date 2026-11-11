# LojaQA – Automação de Testes | Módulo 12

Projeto de automação de testes de API e End-to-End (E2E) do módulo de Administração: Moderação de Usuários e Controle de Acesso (RBAC) da aplicação LojaQA.

## Equipe

- Roberto Castro
- Kalleby Esdras
- Wkelison Pereira

## Tecnologias utilizadas

- Node.js
- TypeScript
- Playwright
- Yarn
- Dotenv

## Objetivo do projeto

Validar as funcionalidades administrativas da aplicação LojaQA, garantindo o gerenciamento de usuários, a identificação de usuários bloqueados, a alteração de perfis de acesso e a restrição de login para usuários bloqueados.

## Estrutura do projeto

```text
lojaqa-automacao-banca/
├── fixtures/
│   └── auth.fixture.ts
├── pages/
│   └── AdminPage.ts
├── tests/
│   ├── api/
│   │   ├── lojaqa-api-X.spec.ts
│   │   ├── lojaqa-api-users.spec.ts
│   │   └── lojaqa-api-block-user.spec.ts
│   └── e2e/
│       ├── lojaqa-admin-blocked.spec.ts
│       ├── lojaqa-admin-rbac.spec.ts
│       ├── lojaqa-admin-role.spec.ts
│       ├── lojaqa-admin-users.spec.ts
│       ├── lojaqa-login-blocked.spec.ts
│       └── lojaqa-login.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── yarn.lock
```

## Instalação e configuração

### 1. Pré-requisitos

- Node.js instalado.
- Yarn 1.22.22.

### 2. Instalar as dependências

```bash
yarn install
```

### 3. Instalar o navegador Chromium

```bash
yarn playwright install chromium
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, utilizando o `.env.example` como referência.

Preencha as variáveis com as credenciais administrativas disponibilizadas para a execução dos testes.

**Importante:** o arquivo `.env` contém credenciais e não deve ser compartilhado ou enviado ao GitHub.

## Execução dos testes

### Executar todos os testes

```bash
yarn test --project=chromium --workers=1 --reporter=list
```

### Executar os testes E2E com navegador visível

```bash
yarn playwright test tests/e2e --project=chromium --headed --workers=1 --reporter=list
```

### Executar os testes de API

```bash
yarn playwright test tests/api --project=chromium --workers=1 --reporter=list
```

## Cenários automatizados

### Testes de API

| Identificação | Cenário |
|---|---|
| API-01 | Realizar login administrativo |
| API-02 | Listar usuários |
| API-03 | Bloquear usuário |

### Testes E2E

| Identificação | Cenário |
|---|---|
| E2E-01 | Login administrativo |
| E2E-02 | Acessar gerenciamento de usuários |
| E2E-03 | Filtrar usuários bloqueados |
| E2E-04 | Validar perfis de acesso |
| E2E-05 | Alterar perfil de usuário |
| E2E-06 | Impedir login de usuário bloqueado |

## Boas práticas aplicadas

- Organização dos testes por funcionalidade.
- Page Object Model (POM).
- Fixtures para reutilização de autenticação administrativa.
- Seletores semânticos sempre que aplicáveis.
- Uso de assertions para validação dos resultados.
- Sincronização baseada em condições, evitando esperas fixas desnecessárias.
- Uso de variáveis de ambiente para configuração de credenciais.
- Restauração do perfil do usuário após cenários que alteram seu estado.

## Resultado da validação

Na última execução da suíte completa, foram aprovados os 9 testes automatizados configurados para Chromium.

```text
9 passed
```

## Observação

Os testes utilizam os serviços e a aplicação LojaQA disponibilizados para a atividade. A execução em outro computador depende de acesso à internet, instalação das dependências, navegador Chromium e configuração válida das variáveis de ambiente.