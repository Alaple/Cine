
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
      mostrarTicket: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}


