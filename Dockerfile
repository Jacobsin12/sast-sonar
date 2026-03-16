FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
# Cambiamos el dueño de los archivos al usuario node
COPY --chown=node:node . .  
# Usamos el usuario no-root
USER node
EXPOSE 3000
CMD ["node", "index.js"]