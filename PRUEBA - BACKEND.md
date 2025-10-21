
# 🎧 PRUEBA TÉCNICA – BIOONIX SOLUTIONS IT C,A 

---
* **Áreas evaluadas:** Fundamentos de SQL, Express.js, CRUD básico, buenas prácticas
---

## 🎯 **OBJETIVO**

El candidato debe demostrar que entiende cómo:

1. Diseñar y normalizar una base de datos simple.
2. Crear una API REST con Express que realice operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
3. Conectar la API a la base de datos (mariadb, mysql).

---

## 🎶 **ESCENARIO**

Queremos construir monolito para gestionar las **solicitudes de canciones** durante un evento.
Un usuario puede pedir una canción indicando su nombre, el título y el artista.

---

## 🧱 **PARTE 1 – BASE DE DATOS**

```sql
CREATE TABLE tb_data (
  id_registro INT PRIMARY KEY,
  evento_id int,
  evento_nombre VARCHAR(100),
  usuario_id int,
  usuario_nombre VARCHAR(100),
  cancion_id int,
  cancion_titulo VARCHAR(100),
  artista_nombre VARCHAR(100),
  votos INT
);

INSERT INTO tb_data VALUES
(1, 1,'Sunset Party', 1,'Carlos Pérez', 1, 'Despacito', 'Luis Fonsi', 10),
(2, 1,'Sunset Party', 2,'Ana Torres', 2, 'Shape of You', 'Ed Sheeran', 8),
(3, 1, 'Sunset Party', 3,'Carlos Pérez', 3, 'Perfect', 'Ed Sheeran', 6);
```

Inserta tantos datos de ejemplo segun sea necesario.

---

## ⚙️ **PARTE 2 – API REST CON EXPRESS**

### 📁 **Aplica estructura modular**

* Utilizar Eslint.
* Utilizar prettier.

### 🧠 **Requisitos funcionales**

* Debe aplicar configuracion de cors.
* Debes crear un **CRUD básico** con los siguientes endpoints:
* Debe crear un endpoint `GET /api/solicitudes/top` → mostrar las canciones más votadas.
* Validar que un usuario no pueda solicitar la misma canción dos veces en el mismo evento.
* Implementar búsqueda por artista o título usando `?search=`.

| Método   | Ruta                   | Descripción                    |
| -------- | ---------------------- | ------------------------------ |
| `POST`   | `/api/usuarios`        | Insertar un usuario            |
| `POST`   | `/api/canciones`       | Insertar una cancion           |
| `GET`    | `/api/solicitudes`     | Listar todas las solicitudes   |
| `GET`    | `/api/solicitudes/:id` | Obtener una solicitud por ID   |
| `POST`   | `/api/solicitudes`     | Crear una nueva solicitud      |
| `PUT`    | `/api/solicitudes/:id` | Editar una solicitud existente |
| `PUT`    | `/api/canciones//voto/:id` | votar una cancion          |
| `DELETE` | `/api/solicitudes/:id` | Eliminar una solicitud         |

---

### 🧩 **Ejemplo de implementación (básico)**

**server.js**

```js
import express from "express";
import cors from "cors";
import solicitudesRoutes from "./routes/solicitudes.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/solicitudes", solicitudesRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
```


## 📦 **QUE DEBES ENTREGAR**

1. Subir el código al repositorio GitHub.
1. Script `.sql` con creación e inserción de tablas.
2. En el script sql debes explicar la forma normal utilizada.
3. La API debe funcionar con pm2.
4. README con instrucciones y documentacion:

   * Instalar dependencias (`npm install`)
   * Ejecutar (`npm start`)
   * Probar endpoints (`GET`, `POST`, etc.)

