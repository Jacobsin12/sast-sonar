FROM node:18-slim

# Creamos el directorio y le damos permisos al usuario node
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos dependencias y limpiamos caché para que sea ligero
RUN npm install --only=production

# Copiamos el resto del código y cambiamos el dueño a node
COPY --chown=node:node . .

# --- LA CORRECCIÓN MÁGICA ---
# Quitamos permisos de escritura para que el usuario node solo pueda LEER
RUN chmod -R 555 /app && \
    chmod -R 777 /app/node_modules 
# Nota: node_modules a veces necesita permisos, pero el código fuente (.js) no.

USER node

EXPOSE 3000

CMD ["node", "index.js"]