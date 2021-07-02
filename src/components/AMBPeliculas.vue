<template>
  <section class="profile">
    <h2>PANEL DE ADMINISTRADOR</h2>
    <h1 class="text-center">ABM Películas</h1>
    <br>

    <div class="container">
      <button class="btn btn-primary btn-sm" id="nuevo" @click="mostrarForm()">
        {{ mostrar ? "CANCELAR" : "NUEVA PELÍCULA" }}
      </button>
      <div class="table-responsive">
        <div class="card-body">
          <table class="table table-border">
            <thead class="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">EDITAR / ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pelicula in peliculas" :key="pelicula._id">
                <td>{{ pelicula._id }}</td>
                <td>{{ pelicula.nombre }}</td>
                <td>
                  <button
                    class="btn-warning btn-sm mx-2"
                    @click="getPeliculasID(pelicula._id)"
                  >
                    EDITAR
                  </button>
                  <button
                    class="btn-danger btn-sm mx-2"
                    @click="eliminar(pelicula._id)"
                  >
                    ELIMINAR
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="mostrar" id="myform">
        <form @submit.prevent="add()">
          <h1 class="text-center">Agregar nueva Película</h1>
          <input
            type="text"
            placeholder="Ingrese nombre"
            class="form-control my-2"
            v-model="pelicula.nombre"
          />
          <input
            type="text"
            placeholder="Ingrese descripcion"
            class="form-control my-2"
            v-model="pelicula.descripcion"
          />
          <input
            type="text"
            placeholder="Ingrese género"
            class="form-control my-2"
            v-model="pelicula.genero"
          />
          <input
            type="text"
            placeholder="Ingrese imagen"
            class="form-control my-2"
            v-model="pelicula.url_imagen"
          />
          <input
            type="text"
            placeholder="Ingrese trailer"
            class="form-control my-2"
            v-model="pelicula.url_trailer"
          />
          <input
            type="text"
            placeholder="Ingrese duración"
            class="form-control my-2"
            v-model="pelicula.duracion"
          />
          <input
            type="text"
            placeholder="Ingrese calificación"
            class="form-control my-2"
            v-model="pelicula.calificacion"
          />
          <input
            type="text"
            placeholder="Ingrese director"
            class="form-control my-2"
            v-model="pelicula.director"
          />
          <input
            type="text"
            placeholder="Ingrese actores"
            class="form-control my-2"
            v-model="pelicula.actores"
          />
          <br>
        </form>
        <div v-if="edit">
          <button class="btn btn-primary btn-sm" @click="editar(pelicula._id)">GUARDAR</button>
        </div>
        <div v-else>
          <button class="btn btn-primary btn-sm" @click="add()">CREAR</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

import store from "../store.js"

export default {
    name: 'abmPeliculas',
    props: [],
    data () {
        return {
            token: store.state.token,
            mostrar: false,
            edit: true,
            peliculas: [],
            pelicula: {},
            agregar: true,
        }
    },
    mounted() {
        this.getPeliculas()
    },

    methods: {
        async getPeliculas() {
            try {
                let respuesta = await this.axios('http://localhost:3000/api/peliculas/');
                console.log('AXIOS GET ALL MOVIES', respuesta.data);
                this.peliculas = respuesta.data;
            } catch (error) {
                console.error(error);
            }
        },

        async eliminar(id) {
            try {
                let respuesta = await this.axios.delete(`http://localhost:3000/api/peliculas/${id}`, 
                { headers: { Authorization: `Bearer ${this.token}` }});
                console.log('DELETED!', respuesta.data);
                this.getPeliculas()
            } catch (error) {
                console.error(error); 
            }
        },

        async add() {
            try {
                let data = this.pelicula
                data.genero = data.genero.split(' ')
                data.actores = data.actores.split(' ')
                let respuesta = await this.axios.post(`http://localhost:3000/api/peliculas/`, data, 
                { headers: { Authorization: `Bearer ${this.token}` }
                });
                console.log('CREATED!', respuesta.data);
                this.getPeliculas()
                this.clear() 
            } catch (error) {
                console.error(error);
            }
        },

        async editar(id) {
            try {
                console.log(this.pelicula);
                let data = JSON.parse(JSON.stringify(this.pelicula))
                delete data._id

                if (typeof data.genero == 'string') {
                data.genero = data.genero.split(' ')
                }

                if (typeof data.actores == 'string') {
                data.actores = data.actores.split(' ')
                }
                
                console.log(this.pelicula);
                let respuesta = await this.axios.put(`http://localhost:3000/api/peliculas/${id}`, data, 
                { headers: { Authorization: `Bearer ${this.token}` }
                });
                console.log('UPDATED!', respuesta.data);
                this.getPeliculas()
                this.clear()
            } catch (error) {
                console.error(error);
            }
        },

        async getPeliculasID(id) {
            try {
                let respuesta = await this.axios(`http://localhost:3000/api/peliculas/${id}`);
                console.log('AXIOS GET ALL MOVIES', respuesta.data);
                this.pelicula = respuesta.data;
                this.pelicula.genero = this.pelicula.genero.join(' ')
                this.pelicula.actores = this.pelicula.actores.join(' ')
                console.log(this.pelicula);
                this.mostrar = true
                this.edit = true
            } catch (error) {
                console.error(error);
            }
        },

        clear(){
            if (this.pelicula.nombre != null) {
                this.pelicula.nombre = '',
                this.pelicula.descripcion = '',
                this.pelicula.genero = [],
                this.pelicula.url_imagen = '',
                this.pelicula.url_trailer = '',
                this.pelicula.duracion = '',
                this.pelicula.calificacion = '',
                this.pelicula.director = '',
                this.pelicula.actores = []
            }
        },

        mostrarForm() {
            this.mostrar = !this.mostrar
            this.clear()
            this.edit = false
        },

    },

}

</script>

<style scoped lang="css">
h2 {
  font: bold 20px/2 Sans-Serif;
  background-color: #2bc8ac;
  color: white;
  display: table;
  padding: 0 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: auto;
  margin-top: 2%;
}

h1 {
  margin-top: 1.5%;
  font: bold 20px/2 Sans-Serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-inline input {
  margin-right: 8px;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border-collapse: collapse;
  display: table-cell;
}

#nuevo {
  margin-left: 85%;
}

#myform {
  margin-bottom: 5%;
}

</style>