FROM node:16-alpine

# Crear y configurar directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Configurar variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Iniciar la aplicación
CMD ["node", "src/app.js"]
