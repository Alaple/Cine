
export default {
  name: 'src-components-reserva',
  components: {},
  props: [],
  data () {
    return {
      reserva: {
        "_id":{"$oid":"60bd224cbcdb5f2344176f8a"},
        "_idFuncion":{"$oid":"60bbf109169271a0c1745223"},
        "_idUsuario":{"$oid":"60bbedf8169271a0c1745220"},
        "cantidadEntradas":{"$numberInt":"4"},
        "nroReserva":{"$numberInt":"1"},
        "valorTotal":{"$numberDouble":"1499.98"},
        "medioPago":"Tarjeta"
      },
      funcion: {
        "_id":{"$oid":"60bbf109169271a0c1745223"},
        "diaHorario":{"$date":{"$numberLong":"1625167800000"}},
        "_idPelicula":{"$oid":"60bbea67169271a0c174521f"},
        "_idSala":{"$oid":"60bbef20169271a0c1745221"},
        "cantLugaresDisponibles":{"$numberInt":"10"}
      },
      usuario: {
        "_id":{"$oid":"60bbedf8169271a0c1745220"},
        "nombre":"German",
        "apellido":"Tegui",
        "email":"german@tegui.com",
        "fechaNacimiento":"",
        "esAdministrador":false,
        "clave":"pepe123"
      },
      mostrarTicket: false,
      urlReservas: 'http://localhost:3000/api/reservas/',
      urlUsuarios: 'http://localhost:3000/api/usuarios/',
      reservas: [],
      usuarios: [],
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMxMzkwNzQ1Y2JiYTQxNzA1YmMyNDAiLCJpYXQiOjE2MjM4ODYzMjUsImV4cCI6MTYyMzg5MzUyNX0.IU9hWKtH8MvmUY6jqSLjqVBC2ndpCWweMCFCt3byn3I'
    }
  },
  computed: {

  },
  mounted () {
    console.log(this.$store.state.idFuncionSeleccionada);
  },
  methods: {
    async getReservas() {
      try {
        let respuesta = await this.axios(this.urlReservas);
        console.log('AXIOS GET RESERVAS', respuesta.data);
        this.reservas = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getUsuarios() {
      try {
        let respuesta = await this.axios(this.urlUsuarios, { headers: { Authorization: `Bearer ${this.token}` } });
        console.log('AXIOS GET USUARIOS', respuesta.data);
        this.usuarios = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
  }
}


