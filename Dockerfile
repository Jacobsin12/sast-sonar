FROM node:18-slim

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias (agregué ejs y path por si acaso)
RUN npm install prom-client ejs path && npm install --only=production

# COPIAMOS TODO EL PROYECTO (Incluyendo la nueva carpeta /public y /views)
COPY . .

# AJUSTE DE PERMISOS: 
# 1. El usuario 'node' debe ser dueño de la carpeta para leer los estáticos
RUN chown -R node:node /app

# 2. Permisos de lectura para que el servidor web pueda servir el CSS/JS
RUN chmod -R 755 /app

USER node

EXPOSE 3000

# Comando de arranque
CMD ["node", "index.js"]