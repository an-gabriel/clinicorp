# web/Dockerfile
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app/web

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação
COPY . .

# Compila a aplicação
RUN npm run build

# Usa uma imagem do nginx para servir a aplicação
FROM nginx:alpine
COPY --from=0 /usr/src/app/web/build /usr/share/nginx/html

# Expõe a porta que a aplicação vai rodar
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
