# Clientes & Contatos

### Projeto Fullstack com a finalidade de criar uma api onde é possivel cadastrar, editar e excluir clientes e cadastrar contatos para cada cada cliente.

Documentação

# Rota para documentação:

Configuração - Siga os passos abaixo para configurar o ambiente de desenvolvimento e começar a usar a API:

## **Tecnologias e bibliotecas**:

### Back End

- Nest.js
- Prisma
- TypeScript
- dotenv
- cors
- zod

### Front End

- Next.js
- zod
- Phosphor Icons
- Tailwhind
- NextUI
- axios
- hook-form

###

## Instalação

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

```bash
# caso use npm
npm run i

# caso use yarn
yarn
```

## Conectar ao banco de dados

Instalada as dependências, crie e se conecte a um banco de dados através do env.

```.env
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
SECRET_KEY=<example>
```

Enfim rode as migrações.

```bash
# caso use npm
npm run typeorm migration:run -d src/data-source.ts

# caso use yarn
yarn typeorm migration:run -d src/data-source.ts
```

## Rodar o servidor

Feita a conexão com o banco de dados, inicie o servidor utilizando o comando abaixo.

```bash
# caso use npm
npm run dev

# caso use yarn
yarn dev
```
