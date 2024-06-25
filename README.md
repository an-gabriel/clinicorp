# Configuração do Ambiente

## Requisitos

- Docker
- Docker Compose
- Node.js

## Passos para iniciar o servidor local

1. **Clone o repositório**

   ```sh
   git clone git@github.com:an-gabriel/clinicorp.git
   cd clinicorp
   ```

2. **Iniciar o Servidor**

   - Inicie o servidor node.js:

     ```sh
     cd server
     npm install
     npm run start

3. **Iniciar o Front**

   - Após iniciar o servidor:
   - volte para o diretorio /clinicorp

     ```sh
     cd web
     npm install
     npm run start

## Passos para iniciar o servidor usando docker

1. **Clone o repositório**

	```sh
	git clone git@github.com:an-gabriel/clinicorp.git
	cd clinicorp

    execute  docker-compose up --build -d

	```
4. **Swagger**

	Acesse o swagger : http://localhost:5000/api-docs



## IMPORTANTE
