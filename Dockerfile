# Usar a imagem base do Node.js
FROM node:21.1.0-alpine

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar apenas arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install --legacy-peer-deps

# Copiar todos os arquivos de código
COPY . .

# Rodar o ESLint antes do build (se falhar, cancela o build)
RUN npx eslint ./src --max-warnings=0

# Compilar o Next.js (só prossegue se o ESLint não falhar)
RUN npm run build

# Expor a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]