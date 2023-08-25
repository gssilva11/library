ps-mat-2023-2
Repositório da disciplina Eletiva II - Programação de Scripts, 5º semestre ADS matutino Fatec Franca 2023/2

Para criar o projeto
npx @aka-demy/create-express-app

Para atualizar os pacotes e remover as vulnerabilidades
npm audit fix --force

Superbase para criar o banco na nuvem Prisma para gerir

Para instalar o prisma
npm install prisma --save-dev

Para iniciar o prisma com postgresql
npx prisma init --datasource-provider postgresql

Para informar ao prisma onde está nosso banco:
no arquivo .env colar o caminho node.js do projeto criado no superbase e no YOUR-PASSWORD colar a senha do banco

Para instalar o prisma client (conexão de fato entre projeto)
npm i @prisma/client

Para criar um novo cliente prisma
criar pasta database dentro de src, criar arquivo client.js e colar: import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma

Inicializar o Client (sempre que a estrutura muda)
prisma genetare OBS: é no schema.prisma que a estrutura do banco é manipulada

Montar a estrutura do BD
No arquivo schema da pasta prisma, criar a estrutura do BD e após rodar npx prisma migrate dev --name <nomedesejadoparamigração> sempre após uma migração é necessário rodar npx prisma generate

Visualizar seu Banco
npx prisma studio