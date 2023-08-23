# Use a base image do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que o aplicativo Node.js está executando
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "dev"]
