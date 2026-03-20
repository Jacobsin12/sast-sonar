FROM node:18-slim

WORKDIR /app

# 1. Copiamos los archivos de dependencias
COPY package*.json ./

# 2. INSTALAMOS PROM-CLIENT EXPLÍCITAMENTE (Para asegurar que esté)
RUN npm install prom-client && npm install --only=production

# 3. Copiamos el resto del código
COPY --chown=node:node . .

# 4. Ajustamos permisos (Tu "Corrección Mágica")
RUN chmod -R 555 /app && \
    chmod -R 777 /app/node_modules 

USER node

EXPOSE 3000

CMD ["node", "index.js"]