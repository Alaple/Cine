## 📌 DESCRIPCIÓN
Sistema de gestión operativa y administrativa de reservas online de entradas de cine.
Permite seleccionar la función de la película, agendar el día y horario más conveniente asociados a la misma, seleccionar el medio de pago a utilizar y realizar la reserva de la entrada.

## 🛠️ FUNCIONALIDADES

### // USUARIO
- Registro al sistema
- Login/Logout
- Modificación de datos de perfil de usuario
- Selección de películas, salas y funciones disponibles
- Selección de medio de pago
- Consulta de historial de reservas

### // ADMINISTRADOR
- Login/Logout
- Creación, modificación y eliminación de películas, salas y funciones
- Carga de datos relacionados a los medios de pago ofrecidos

### // SISTEMA
- Muestra de películas, salas y funciones disponibles
- Posibilidad de selección de películas, salas y funciones
- Posibilidad de selección de diferentes medios de pago
- Impresión de ticket de reserva


## 🛠️ ACTORES/ROLES
- USUARIO
- ADMINISTRADOR
- SISTEMA


## 🛠️ ENTIDADES PRINCIPALES
- USUARIO
- PELÍCULA
- FUNCIÓN
- RESERVA


## 🛠️ INSTRUCCIONES TÉCNICAS

- Descarga de node modules:

```
npm install
```
- Compilación para desarrollo

```
npm run serve
```
- Compilación para producción

```
npm run build
```

![VueJS](https://img.shields.io/badge/-VueJS-black?style=flat-square&logo=vuejs) ![VSCode](https://img.shields.io/badge/-VSCode-black?style=flat-square&logo=vscode) ![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb) ![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript) ![Bootstrap](https://img.shields.io/badge/-Bootstrap-black?style=flat-square&logo=bootstrap) ![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)


## 🛠️ ENDPOINTS

| CRUD     |      RESTFull HTTP       |  Descripción |
|----------|:-------------:|------ |
| Create   |  POST         | Crear registros de usuarios, reservas, funciones, salas y películas |
| Read     |  GET          |   Obtener los registros de usuarios, reservas, funciones, salas y películas|
| Update   | PUT           |    Actualizar los registros de usuarios, reservas, funciones, salas y películas |
| Delete   | DELETE        |    Eliminar los registros de usuarios, reservas, funciones, salas y películas |
<br/>

#### Crear un nuevo registro

```http
  POST 
  /api/usuarios
  /api/reservas
  /api/funciones
  /api/salas
  /api/peliculas
```

#### Obtener todos los registros

```http
  GET 
  /api/usuarios
  /api/reservas
  /api/funciones
  /api/salas
  /api/peliculas
```

#### Obtener registros por id

```http
  GET 
  /api/usuarios/${id}
  /api/reservas/${id}
  /api/funciones/${id}
  /api/salas/${id}
  /api/peliculas/${id}
```

#### Actualizar todos los registros

```http
  PUT 
  /api/usuarios
  /api/reservas
  /api/funciones
  /api/salas
  /api/peliculas
```

#### Actualizar registros por id

```http
  PUT 
  /api/usuarios/${id}
  /api/reservas/${id}
  /api/funciones/${id}
  /api/salas/${id}
  /api/peliculas/${id}
```

#### Eliminar todos los registros

```http
  DELETE 
  /api/usuarios
  /api/reservas
  /api/funciones
  /api/salas
  /api/peliculas
```

#### Eliminar registros por id

```http
  DELETE 
  /api/usuarios/${id}
  /api/reservas/${id}
  /api/funciones/${id}
  /api/salas/${id}
  /api/peliculas/${id}
```

## ⚖️ LICENCIA
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://choosealicense.com/licenses/mit/)


## 👩‍💻 INTEGRANTES

- Jonathan Jusid - [@JonathanJusid](https://github.com/jonathanjusid)
- Manuel Alonso - [@Manuelfalonso](https://www.github.com/manuelfalonso)
- Natalia Gorrini - [@shape-shifters](https://github.com/shape-shifters)
- Lucas Palacios - [@Alaple](https://www.github.com/alaple)