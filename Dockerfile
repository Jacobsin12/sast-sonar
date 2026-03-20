FROM node:18-slim

WORKDIR /app

COPY package*.json ./

# Forzamos la instalación de la librería de métricas
RUN npm install prom-client && npm install --only=production

COPY --chown=node:node . .

RUN chmod -R 555 /app && \
    chmod -R 777 /app/node_modules 

USER node

EXPOSE 3000

CMD ["node", "index.js"]