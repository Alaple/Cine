<template>
  <section class="profile">
      <h1>Mi Perfil</h1>
      <br />

      <div class="container">
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://securitygladiators.com/wp-content/uploads/2019/11/kids-movies.png"
                      alt="User"
                      width="290"
                    />
                    <div class="mt-3">
                      <div>                    
                        <h4>{{ usuarios.nombre }} {{ usuarios.apellido }} </h4>
                      </div>
                      <p class="text-secondary mb-1">Movie Fan!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <h2>Mis Datos</h2>
                  <br />

                  <div>
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Nombre</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {{ usuarios.nombre }}
                      </div>
                    </div>
                    <hr />
                  </div>

                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Apellido</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{ usuarios.apellido }}
                    </div>
                  </div>
                  <hr />

                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{ usuarios.email }}
                    </div>
                  </div>
                  <hr />
                  <br />

                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Fecha de nacimiento</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{ usuarios.fechaNacimiento }}
                    </div>
                  </div>
                  <hr />
                  <br />

                <!-- <div class="row">
                    <div class="col-sm-12">
                      <a class="btn boton-editar btn-dark" target="__blank" href="#">Editar</a>
                    </div>
                  </div> -->
                  
                </div>
              </div>
            </div>

            <div class="row gutters-sm">
              <div class="col-sm-12 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h2>Mis Reservas</h2>
                    <br />

                    <table class="table">
                      <tr>
                        <th scope="col">RESERVA NRO</th>
                        <th scope="col">FUNCION NRO</th>
                        <th scope="col">CANTIDAD DE ENTRADAS</th>
                        <th scope="col">MEDIO DE PAGO</th>
                        <th scope="col">COSTO TOTAL</th>
                      </tr>
                      <tr v-for="reserva in reservas" :key="reserva._id">
                        <td>{{ reserva.nroReserva }}</td>
                        <td>{{ reserva._idFuncion }}</td>
                        <td>{{ reserva.cantidadEntradas }}</td>
                        <td>{{ reserva.medioPago }}</td>
                        <td>{{ reserva.valorTotal | moneda}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </section>
</template>

<script lang="js">

 import store from "../store.js"

  export default  {
    name: 'mi-perfil',
    props: [],
    filters: {
      moneda: function (value) {
      return "$" + value.toFixed().toLocaleString();
      }
    },
    data () {
      return {
        usuarios: [],
        reservas: [],
        userid: store.state.userid,
        token: store.state.token,
      }
    },
    mounted() {
      this.getUsuariosID()
      this.getReservaUsuario()
    },
    
    methods: {

    async getUsuariosID() {
      try {
        let respuesta = await this.axios(`http://localhost:3000/api/usuarios/${this.userid}`, 
        { headers: { Authorization: `Bearer ${this.token}` }});
        this.usuarios = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getReservaUsuario() {
      try {
        let respuesta = await this.axios(`http://localhost:3000/api/reservas/usuario/${this.userid}`, 
        { headers: { Authorization: `Bearer ${this.token}` }});
        this.reservas = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    }

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
  font-family: 'Convergence', sans-serif;
}

h1 {
  margin-top: 1.5%;
  margin-left: 1.6%;
  font: bold 20px/2 Sans-Serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Convergence', sans-serif;
}

th {
    font-size: 15px;
    text-align: center;
    font-family: 'nunito', sans-serif;
}

td {
    font-size: 12px;
    text-align: center;
    font-family: 'nunito', sans-serif;
}


img {
    margin: 20%;
}

.boton-editar{
  font-family: 'Orbitron', sans-serif;  
}

.card-body h6{
  font-family: 'nunito', sans-serif;
  font-weight: bold;
}
</style>
