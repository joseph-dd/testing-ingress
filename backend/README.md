# API de Votación de Canciones

Esta es una API REST monolítica construida con Node.js, Express y MariaDB. Permite a los usuarios gestionar canciones, eventos y votar por sus canciones favoritas en diferentes eventos.

## ✨ Características

- **Gestión de Canciones**: CRUD completo para crear, leer, actualizar y eliminar canciones.
- **Gestión de Usuarios**: CRUD completo para usuarios.
- **Gestión de Eventos**: CRUD completo para eventos.
- **Sistema de Votos (Solicitudes)**: Permite a los usuarios votar por canciones en eventos específicos.
- **Búsqueda**: Endpoint para buscar canciones por título o artista.
- **Ranking**: Endpoint para ver un top de las canciones más votadas.
- **Calidad de Código**: Configurado con ESLint y Prettier para un código limpio y consistente.
- **Gestión de Procesos**: Listo para producción con PM2.

---

## 🛠️ Stack Tecnológico y Dependencias Clave

### Dependencias de Producción

- **`express`**: Framework web para construir la API.
- **`mariadb`**: Driver para la conexión con la base de datos MariaDB.
- **`cors`**: Middleware para habilitar el Cross-Origin Resource Sharing.
- **`dotenv`**: Para gestionar variables de entorno de forma segura.
- **`pm2`**: Gestor de procesos para mantener la aplicación corriendo en producción.

### Dependencias de Desarrollo

- **`nodemon`**: Reinicia el servidor automáticamente durante el desarrollo.
- **`eslint`**: Analiza el código para encontrar y corregir problemas.
- **`prettier`**: Formatea el código para mantener un estilo consistente.
- **`eslint-config-prettier`** y **`eslint-plugin-prettier`**: Aseguran la compatibilidad entre ESLint y Prettier.

---

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [MariaDB](https://mariadb.org/) o un servidor de base de datos compatible (como XAMPP).
- Un cliente de API como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar los endpoints.

## ⚙️ Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd <NOMBRE_DEL_PROYECTO>
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar la base de datos:**
    - Crea una base de datos en MariaDB.
    - Ejecuta el script `.sql` proporcionado para crear las tablas e insertar datos iniciales.

4.  **Configurar variables de entorno:**
    - Crea un archivo llamado `.env.example` en la raíz del proyecto con el siguiente contenido:

      ```env
      # Configuración del Servidor
      PORT=3000

      # Configuración de la Base de Datos
      DB_HOST=localhost
      DB_PORT=3006
      DB_USER=root
      DB_PASSWORD=
      DB_DATABASE=
      ```

    - Duplica este archivo (`cp .env.example .env`) y rellena el nuevo `.env` con tus credenciales. El archivo `.env` es ignorado por Git para proteger tus datos sensibles.

## ▶️ Ejecución de la Aplicación

- **Modo Desarrollo (con reinicio automático):**

  ```bash
  npm run dev
  ```

- **Modo Producción (con PM2):**

  ```bash
  npm start
  ```

- **Detener la aplicación en producción:**

  ```bash
  npm run stop
  ```

## 📚 Documentación de la API

La API se ejecuta en `http://localhost:3000`.

### Canciones (`/api/canciones`)

| Método   | Ruta   | Descripción                        | Body (JSON)                                          |
| :------- | :----- | :--------------------------------- | :--------------------------------------------------- |
| `GET`    | `/`    | Lista todas las canciones o busca. | N/A                                                  |
| `GET`    | `/:id` | Obtiene una canción por su ID.     | N/A                                                  |
| `POST`   | `/`    | Crea una nueva canción.            | `{ "titulo": "string", "artista_nombre": "string" }` |
| `PUT`    | `/:id` | Actualiza una canción existente.   | `{ "titulo": "string", "artista_nombre": "string" }` |
| `DELETE` | `/:id` | Elimina una canción.               | N/A                                                  |

**Ejemplo de Búsqueda:** `curl "http://localhost:3000/api/canciones?search=queen"`

### Usuarios (`/api/usuarios`)

| Método   | Ruta   | Descripción                     | Body (JSON)              |
| :------- | :----- | :------------------------------ | :----------------------- |
| `GET`    | `/`    | Lista todos los usuarios.       | N/A                      |
| `GET`    | `/:id` | Obtiene un usuario por su ID.   | N/A                      |
| `POST`   | `/`    | Crea un nuevo usuario.          | `{ "nombre": "string" }` |
| `PUT`    | `/:id` | Actualiza un usuario existente. | `{ "nombre": "string" }` |
| `DELETE` | `/:id` | Elimina un usuario.             | N/A                      |

### Eventos (`/api/eventos`)

| Método   | Ruta   | Descripción                    | Body (JSON)              |
| :------- | :----- | :----------------------------- | :----------------------- |
| `GET`    | `/`    | Lista todos los eventos.       | N/A                      |
| `GET`    | `/:id` | Obtiene un evento por su ID.   | N/A                      |
| `POST`   | `/`    | Crea un nuevo evento.          | `{ "nombre": "string" }` |
| `PUT`    | `/:id` | Actualiza un evento existente. | `{ "nombre": "string" }` |
| `DELETE` | `/:id` | Elimina un evento.             | N/A                      |

### Votos / Solicitudes (`/api/solicitudes`)

| Método   | Ruta   | Descripción                                      | Body (JSON)                                                                   |
| :------- | :----- | :----------------------------------------------- | :---------------------------------------------------------------------------- |
| `GET`    | `/`    | Lista todas las solicitudes con detalles.        | N/A                                                                           |
| `GET`    | `/top` | Muestra el ranking de canciones más votadas.     | N/A                                                                           |
| `GET`    | `/:id` | Obtiene una solicitud por su ID.                 | N/A                                                                           |
| `POST`   | `/`    | Crea una nueva solicitud (voto).                 | `{ "usuario_id": int, "cancion_id": int, "evento_id": int, "cantidad": int }` |
| `PUT`    | `/:id` | Actualiza la cantidad de votos de una solicitud. | `{ "cantidad": int }`                                                         |
| `DELETE` | `/:id` | Elimina una solicitud.                           | N/A                                                                           |
