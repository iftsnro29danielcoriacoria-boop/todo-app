
FROM node:18-alpine


WORKDIR /app


# Asegúrate de que 'prom-client' esté listado en 'dependencies' en package.json
COPY package*.json ./


RUN npm install --production

# 5️⃣ Copiar el resto de la aplicación
COPY . .

# 6️⃣ Exponer los puertos donde corre la app y las métricas
EXPOSE 3001 
EXPOSE 9000 

CMD ["node", "server.js"]