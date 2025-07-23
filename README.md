# Backend Atom Lista de Tareas

Una API RESTful para la gestión de tareas, construida con: 
**Node.js**, 
**Express**, 
**TypeScript** y **Firebase Firestore**. 
Incluye pruebas unitarias con **Jest** y **Supertest**.

---

## Características

- CRUD de tareas con Firebase Firestore
- Estructura modular en TypeScript
- Middleware de manejo de errores
- Pruebas automatizadas con Jest + Supertest
- Integración con Firebase Admin SDK

---

## Tecnologías

- Node.js
- Express
- TypeScript
- Firebase Admin SDK
- Firestore
- Jest
- Supertest

---

## Instalación

1. Clona el repositorio:

bash:
git clone https://github.com/dankensoft/backend-atom-todo-list.git
cd backend-atom-todo-list

2. Instala Dependencias:

bash:
npm install

3. Crea el archivo de credenciales de Firebase:

Coloca tu archivo firebase-service-account.json dentro de la carpeta config/.

4. Ejecución del Proyecto:
- Modo Desarrollo:

bash:
npm run dev

5. Compilar a Javascript:

bash:
npm run build

6. Ejecutar en producción:

bash:
npm start

7. Pruebas Unitarias con Jest:

bash:
npx jest

Ó correr test individuales:

bash:
npx jest <nombre_archivo.test.ts>

## Endpoints
| Método | Ruta            | Descripción             |
| ------ | --------------- | ----------------------- |
| GET    | /api/tasks      | Listar todas las tareas |
| POST   | /api/tasks      | Crear una nueva tarea   |
| PUT    | /api/tasks/\:id | Actualizar una tarea    |
| DELETE | /api/tasks/\:id | Eliminar una tarea      |

## Autor
Danniels Castillo
Web & Mobile Developer
