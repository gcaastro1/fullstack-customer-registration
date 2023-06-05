# MyConts

### Projeto Fullstack com a finalidade de criar uma api onde é possivel cadastrar, editar e excluir clientes e cadastrar contatos para cada cada cliente.

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
- axios
- hook-form

## Instalação do Projeto Back End - API

Para iniciar o projeto, é necessario instalar as suas dependencias:

```bash
# caso use npm
npm run i

# caso use yarn
yarn
```

## Conectar ao banco de dados

Com as dependencias instaladas, é necessario configurar o .env para ter acesso ao seu banco de dados:

```.env
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
SECRET_KEY=<example>
```

Enfim rode as migrações.

```bash

npx prisma migrate
```

## Rodar o servidor

Logo após as migrações serem feitas, podemos rodar o projeto:

```bash
# caso use npm
npm run start

# caso use yarn
yarn start
```

## Rotas

```bash
URL Base: 'http://localhost:8000'

Documentação: 'http://localhost:8000/api'
```

## Instalação do Projeto Front End

Para iniciar o projeto, é necessario instalar as suas dependencias:

```bash
# caso use npm
npm run i

# caso use yarn
yarn
```

## Rotas

```bash
URL Base: 'http://localhost:3000'
```
