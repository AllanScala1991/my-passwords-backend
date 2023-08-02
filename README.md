
# My Passwords Backend

Backend de um projeto pessoal de gerenciamento de senhas.


## Funcionalidades

- Gerenciamento de usuário
- Gerenciamento de senhas
- Criptografia e Descriptografia de senhas


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/AllanScala1991/my-passwords-backend
```

Entre no diretório do projeto

```bash
  cd my-passwords-backend
```

Instale as dependências

```bash
  npm install
```

Crie uma imagem docker com PostgreSQL, sete a variavel de ambiente e migre as tabelas:

```bash
  npx prisma migrate dev
```

Inicie o servidor

```bash
  npm run dev
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Stack utilizada
**Back-end:** Node, Express, Prisma e Typescript.


