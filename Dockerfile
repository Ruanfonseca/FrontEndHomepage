# Estágio 1: Construir a aplicação AngularJS
FROM node:18 as node

WORKDIR /app

COPY . .

# Instalar dependências
RUN npm install

COPY . .

# Construir a aplicação AngularJS
RUN npm run build

FROM nginx:1.21

COPY --from=node /app/dist/ruanfonseca /usr/share/nginx/html

EXPOSE 82


#comandos docker
# docker build -t ruanfonseca/ruanfonseca/sitepessoalfront:latest .
#
#
