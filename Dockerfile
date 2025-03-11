# # Usar a imagem do Node.js 20 baseada no Alpine Linux
# FROM node:20-alpine AS development

# # Instalar Git se necessário
# RUN apk add --no-cache git

# # Instalar PM2 globalmente
# RUN npm install -g pm2

# # Definir o diretório de trabalho dentro do contêiner
# WORKDIR /usr/src/app

# # Copiar package.json e package-lock.json para instalar as dependências
# COPY package*.json ./

# # Instalar dependências do projeto
# RUN npm install

# # Copiar todos os arquivos da aplicação para dentro do contêiner
# COPY . .

# # Expor a porta que a aplicação irá usar (se aplicável)
# EXPOSE 14193

# RUN npm run dev
# # Comando de entrada para o desenvolvimento usando PM2
# # CMD [ "npm", "--", "run", "dev"]
