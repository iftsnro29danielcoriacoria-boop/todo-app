# Trabajo Práctico Integrador DevOps - To-Do App

## Objetivo
Aplicar prácticas y herramientas clave de DevOps para desarrollar, contenerizar, automatizar, testear y desplegar una aplicación real en un entorno CI/CD.

## Descripción del Proyecto
Aplicación web To-Do List con backend en Node.js/Express y base de datos en MongoDB Atlas, que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tareas.  
El frontend es básico pero funcional, con botones e íconos para interactuar con la aplicación y marcar tareas como completadas, editarlas, eliminarlas o crear nuevas.

## Funcionalidades principales
- Ver todas las tareas
- Crear nueva tarea
- Editar tarea existente
- Eliminar tarea
- Marcar tarea como completada

Los botones de acción incluyen íconos claros para mejorar la experiencia del usuario: ✅ Completada, ✏️ Editar, 🗑️ Eliminar, ➕ Crear, 🔄 Refrescar.

## Control de versiones
**Branches principales:**
- `main`: versión estable lista para producción.
- `develop`: desarrollo activo.
- `feature/*`: ramas para agregar nuevas funcionalidades.

**Flujo de trabajo:**
1. Crear branch de feature desde `develop`.
2. Implementar cambios y testear localmente.
3. Hacer commit y push de la feature.
4. Integrar la feature a `develop`.
5. Una vez estable, pasar cambios a `main`.

## Base de datos
- MongoDB Atlas como base de datos en la nube.
- La app está conectada directamente a Atlas mediante la variable de entorno `MONGO_URI`.
- Se crearon colecciones de tareas y se importó un dataset inicial con varias tareas para pruebas.
- CRUD completo implementado: las operaciones desde la app actualizan automáticamente los datos en la nube.

## Estructura del proyecto
La aplicación sigue una estructura modular, separando responsabilidades por capas:

todo-app/
│
├─ src/
│ ├─ controllers/ # Lógica de endpoints
│ ├─ services/ # Lógica de negocio y acceso a DB
│ ├─ models/ # Esquemas de MongoDB
│ ├─ routes/ # Definición de endpoints
│ ├─ middleware/ # Manejo de errores
│ └─ server.js # Entry point del backend
│
├─ public/ # Archivos del frontend
├─ tests/ # Pruebas automatizadas
├─ Dockerfile
├─ docker-compose.yml
├─ push-ghcr.ps1 # Script para subir imagen Docker a GHCR
├─ README.md
└─ package.json

markdown
Copiar código

Esta organización permite mantener el código limpio, escalable y fácil de mantener.

## 3. Dockerización
- Se creó el `Dockerfile` para la app.
- Se generó `docker-compose.yml` para levantar el servicio `app`.
- La app se conecta a MongoDB Atlas mediante la variable de entorno `MONGO_URI`.
- No se necesita servicio de base de datos local.
- Imagen Docker construida y subida a **GitHub Container Registry (GHCR)**.

## 4. Automatización de tests
- Se implementaron pruebas automatizadas usando **Jest** y **Supertest**.
- Se testeó:
  - Creación de tareas
  - Obtención de tareas por ID
  - Actualización de tareas
  - Eliminación de tareas
- Todos los tests locales pasan correctamente:

Test Suites: 2 passed, 2 total
Tests: 5 passed, 5 total

markdown
Copiar código

Esto asegura que el backend funciona correctamente con MongoDB Atlas antes de pasar a Docker y CI/CD.

## 5. CI/CD y despliegue automático
- **GitHub Actions** configurado:
  - Build de la app
  - Ejecución de tests
  - Build y push de imagen Docker a GHCR
- Script `push-ghcr.ps1` para logueo seguro y push a GitHub Container Registry.
- **Render** configurado para desplegar automáticamente la imagen Docker de GHCR:
  - Branch: `main`
  - Variables de entorno configuradas (`MONGO_URI`, `PORT=3001`)
  - Despliegue automático habilitado tras cada push a `main`
- La app ahora está disponible públicamente vía Render con CI/CD completo.

## Estado actual del proyecto
- Backend funcionando correctamente y conectado a MongoDB Atlas.
- CRUD completo implementado y testeado localmente.
- Frontend básico pero funcional con botones e íconos.
- Imagen Docker construida y subida a GHCR.
- Pipeline CI/CD funcionando: build, test, push Docker y despliegue en Render.

## Próximos pasos
- Mejorar frontend (UI/UX)
- Añadir monitorización y alertas (opcional)
- Escalar despliegue en Render a instancias con mayor capacidad si es necesario
## 6. Infraestructura como Código (IaC)

Se implementó Terraform para aprovisionar y desplegar la aplicación en contenedores Docker de manera reproducible y automatizada.

### Flujo realizado

1. Se creó un directorio `terraform/` con los siguientes archivos:
   - `main.tf`: define los recursos Docker (imagen y contenedor) para la app.
   - `outputs.tf`: exporta información relevante como el nombre y la IP del contenedor.
   - `variables.tf`: define variables reutilizables, como `mongo_uri`.
   - `terraform.tfvars`: contiene valores concretos para las variables (MONGO_URI, puertos, etc.), nunca subir credenciales directamente al repositorio.