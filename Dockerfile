# 1️⃣ Imagen base ligera de Node.js
FROM node:18-alpine

# 2️⃣ Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copiar archivos de dependencias primero (mejor cacheo)
COPY package*.json ./

# 4️⃣ Instalar dependencias
RUN npm install --production

# 5️⃣ Copiar el resto de la aplicación
COPY . .

# 6️⃣ Exponer el puerto donde corre la app
EXPOSE 3001

# 7️⃣ Comando para arrancar la app
CMD ["node", "src/server.js"]
