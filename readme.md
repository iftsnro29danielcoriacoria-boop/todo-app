Trabajo Práctico Integrador DevOps - To-Do App
Objetivo

Aplicar prácticas y herramientas clave de DevOps para desarrollar, contenerizar, automatizar, testear y desplegar una aplicación real en un entorno CI/CD.

Descripción del Proyecto

Aplicación web To-Do List con backend en Node.js/Express y base de datos en MongoDB Atlas, que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tareas.
El frontend es básico pero funcional, con botones e íconos para interactuar con la aplicación y marcar tareas como completadas, editarlas, eliminarlas o crear nuevas.

Funcionalidades principales

Ver todas las tareas

Crear nueva tarea

Editar tarea existente

Eliminar tarea

Marcar tarea como completada

Los botones de acción incluyen íconos claros para mejorar la experiencia del usuario: ✅ Completada, ✏️ Editar, 🗑️ Eliminar, ➕ Crear, 🔄 Refrescar.

Control de versiones

Branches principales:

main: versión estable lista para producción.

develop: desarrollo activo.

feature/*: ramas para agregar nuevas funcionalidades.

Flujo de trabajo:

Crear branch de feature desde develop.

Implementar cambios y testear localmente.

Hacer commit y push de la feature.

Integrar la feature a develop.

Una vez estable, pasar cambios a main.

Base de datos

MongoDB Atlas como base de datos en la nube.

La app está conectada directamente a Atlas mediante una URI segura.

Se crearon colecciones de tareas y se importó un dataset inicial con varias tareas para pruebas.

CRUD completo implementado: las operaciones desde la app actualizan automáticamente los datos en la nube.

Estructura del proyecto

La aplicación sigue una estructura modular, separando responsabilidades por capas:

Backend: Node.js + Express

Controllers: manejo de lógica de endpoints

Services: lógica de negocio y conexión a la base de datos

Models: esquemas de datos para MongoDB

Routes: definición de endpoints

Middleware: manejo de errores y funciones auxiliares

Tests: pruebas automatizadas

Esta organización permite mantener el código limpio, escalable y fácil de mantener.

Despliegue y DevOps

La aplicación está preparada para Docker y CI/CD, siguiendo buenas prácticas de DevOps.

Render es la plataforma recomendada para desplegar este backend Node.js + MongoDB Atlas, ya que permite mantener el servicio activo y desplegar imágenes Docker de forma sencilla.

Se descartó Vercel para este proyecto porque no maneja Docker tradicional ni servidores persistentes de Node.js.

Estado actual del proyecto

Backend funcionando correctamente y conectado a MongoDB Atlas.

CRUD completo implementado y testeado localmente.

Frontend básico pero funcional con botones e íconos.

Feature para marcar tareas completadas integrada a la rama de desarrollo (develop).

Branch main contiene la versión estable inicial.

Próximos pasos

Dockerizar la aplicación con Dockerfile y docker-compose.

Configurar CI/CD con GitHub Actions para tests, build y despliegue automático.

Desplegar la app en Render usando la imagen Docker.

(Opcional) Mejorar el frontend y agregar monitorización o alertas.
## 3. Dockerización

- Se creó el `Dockerfile` para la app.
- Se generó `docker-compose.yml` para levantar el servicio `app`.
- La app se conecta a MongoDB Atlas mediante la variable de entorno `MONGO_URI`.
- No se necesita servicio de base de datos local.
