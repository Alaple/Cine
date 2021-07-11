<template>
  <section class="profile">
    <h2>PANEL DE ADMINISTRADOR</h2>
    <h1 class="text-center">ABM Reservas</h1>
    <br>

    <div class="container">
      <button class="btn btn-primary btn-sm" id="nuevo" @click="mostrarForm()">
        {{ mostrar ? "CANCELAR" : "NUEVA RESERVA" }}
      </button>
      <div class="table-responsive">
        <div class="card-body">
          <table class="table table-border">
            <thead class="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NRO RESERVA</th>
                <th scope="col">EDITAR / ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reserva in reservas" :key="reserva._id">
                <td>{{ reserva._id }}</td>
                <td>{{ reserva.nroReserva }}</td>
                <td>
                  <button
                    class="btn-warning btn-sm mx-2"
                    @click="getReservaID(reserva._id)"
                  >
                    EDITAR
                  </button>
                  <button
                    class="btn-danger btn-sm mx-2"
                    @click="eliminar(reserva._id)"
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
          <h1 class="text-center">Agregar nueva Reserva</h1>

          <div class="input-group mb-3">
            <span class="input-group-text" id="IDFuncion">ID Funcion</span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="IDFuncion" 
              aria-label="IDFuncion" 
              aria-describedby="IDFuncion"
              v-model="reserva._idFuncion"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="IDUsuario">ID Usuario</span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="IDUsuario" 
              aria-label="IDUsuario" 
              aria-describedby="IDUsuario"
              v-model="reserva._idUsuario"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="CantEntradas">Cantidad Entradas</span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="CantEntradas" 
              aria-label="CantEntradas" 
              aria-describedby="CantEntradas"
              v-model="reserva.cantidadEntradas"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="NroReserva">NRO Reserva</span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="NroReserva" 
              aria-label="NroReserva" 
              aria-describedby="NroReserva"
              v-model="reserva.nroReserva"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="ValorTotal">Valor Total</span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="ValorTotal" 
              aria-label="ValorTotal" 
              aria-describedby="ValorTotal"
              v-model="reserva.valorTotal"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="MedioPago">Medio de Pago</span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="MedioPago" 
              aria-label="MedioPago" 
              aria-describedby="MedioPago"
              v-model="reserva.medioPago"
            >
          </div>

          <br>
        </form>
        <div v-if="edit">
          <button class="btn btn-primary btn-sm" @click="editar(reserva._id)">GUARDAR</button>
        </div>
        <div v-else>
          <button class="btn btn-primary btn-sm" @click="add()">CREAR</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  //import store from "../store.js"

  export default {
    name: 'abmReservas',
    props: [],
    data () {
      return {
          token: this.$store.state.token,
          mostrar: false,
          edit: true,
          reservas: [],
          reserva: {},
          agregar: true,
          urlReservas: 'http://localhost:3000/api/reservas/'
      }
    },
    mounted() {
        this.getReservas()
    },

    methods: {
      async getReservas() {
        try {
            let respuesta = await this.axios(this.urlReservas);
            console.log('AXIOS GET ALL BOOKINGS', respuesta.data);
            this.reservas = respuesta.data;
        } catch (error) {
            console.error(error);
        }
      },

      async eliminar(id) {
        try {
            let respuesta = await this.axios.delete(this.urlReservas + id, 
              { headers: { Authorization: `Bearer ${this.token}` }}
            );
            console.log('DELETED!', respuesta.data);
            this.getReservas();
            // Scroll al final del documento
            window.scrollTo(0,document.body.scrollHeight);
        } catch (error) {
            console.error(error); 
        }
      },

      async add() {
        try {
            let data = this.reserva
            let respuesta = await this.axios.post(this.urlReservas, data, 
              { headers: { Authorization: `Bearer ${this.token}` }
            });
            console.log('CREATED!', respuesta.data);
            this.getReservas()
            this.clear() 
        } catch (error) {
            console.error(error);
        }
      },

      async editar(id) {
        try {
            console.log(this.reserva);
            let data = JSON.parse(JSON.stringify(this.reserva))
            delete data._id
            
            console.log(this.reserva);
            let respuesta = await this.axios.put(this.urlReservas + id, data, 
              { headers: { Authorization: `Bearer ${this.token}` }
            });
            console.log('UPDATED!', respuesta.data);
            this.getReservas()
            this.clear()
        } catch (error) {
            console.error(error);
        }
      },

      async getReservaID(id) {
        try {
            let respuesta = await this.axios(this.urlReservas + id);
            console.log('AXIOS GET BOOKING BY ID', respuesta.data);
            this.reserva = respuesta.data;
            console.log(this.reserva);
            this.mostrar = true
            this.edit = true
            // Scroll al final del documento
            window.scrollTo(0,document.body.scrollHeight);
        } catch (error) {
            console.error(error);
        }
      },

      clear(){
        if (this.reserva._idFuncion != null) {
          this.reserva._idFuncion = '',
          this.reserva._idUsuario = '',
          this.reserva.cantidadEntradas = '',
          this.reserva.nroReserva = '',
          this.reserva.valorTotal = '',
          this.reserva.medioPago = ''
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