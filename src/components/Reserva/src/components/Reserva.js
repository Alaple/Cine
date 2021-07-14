
export default {
  name: 'src-components-reserva',
  components: {},
  props: [],
  data () {
    return {
      pelicula: {},
      funcion: {},
      reserva: {},
      sala: {},
      urlPeliculas: 'http://localhost:3000/api/peliculas/',
      urlFunciones: 'http://localhost:3000/api/funciones/',
      urlReservas: 'http://localhost:3000/api/reservas/',
      urlSalas: 'http://localhost:3000/api/salas/',
      formData: this.getInicialData(),
      formState: {},
      cantEntradasMin: 1,
      cantEntradasMax: 0,
      mostrarTicket: false,
    }
  },
  computed: {
    mostrarValorTotal(){
      return this.formData.cantidadEntradas * this.$store.state.valorEntrada
    }
  },
  mounted () {
    this.getPelicula(this.$store.state.idPelicula);
    this.getFuncion(this.$store.state.idFuncionSeleccionada);
  },
  methods: {
    async getPelicula(id) {
      try {
        let respuesta = await this.axios(this.urlPeliculas + id);
        this.pelicula = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getFuncion(id) {
      try {
        let respuesta = await this.axios(this.urlFunciones + id);
        this.funcion = respuesta.data;
        // Defino la cantidad de entradas disponibles de la funcion elegida
        this.cantEntradasMax = this.funcion.cantLugaresDisponibles;
      } catch (error) {
        console.error(error);
      }
    },
    getInicialData() {
      return {
        _id: '',
        _idFuncion: '',
        _idUsuario: '',
        cantidadEntradas: '',
        nroReserva: '',
        valorTotal: '',
        medioPago: ''
      }
    },
    async postFuncion() {
      let reservaNueva = {
        _idFuncion: this.funcion._id,
        _idUsuario: this.$store.state.userid,
        cantidadEntradas: this.formData.cantidadEntradas,
        valorTotal: (this.$store.state.valorEntrada * this.formData.cantidadEntradas),
        medioPago: this.formData.medioPago
      }
      try {
        let respuesta = await this.axios.post(this.urlReservas, reservaNueva, {'content-type':'application/json'});
        this.reserva  = respuesta.data.ops[0];
        // Obtengo la sala elegida para mostrar el ticket
        await this.getSala(this.funcion._idSala);
        // Muestra el ticket completando los datos con la reserva generada
        this.mostrarTicket = true;
      } 
      catch (error) {
        console.error(error);
      }
    },
    async getSala(id) {
      try {
        let respuesta = await this.axios(this.urlSalas + id);
        this.sala = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
    getDia(diaHorario){
      let fecha = new Date(diaHorario);
      switch (fecha.getDay()) {
        case 0:
          return 'Domingo';
        case 1:
          return 'Lunes';
        case 2:
          return 'Martes';
        case 3:
          return 'Miercoles';
        case 4:
          return 'Jueves';
        case 5:
          return 'Viernes';
        case 6:
          return 'Sabado';
        default:
          return 'Dia invalido';
      }
    },
    getHora(diaHorario) {    
      let fecha = new Date(diaHorario);
      return `${fecha.getHours()}:${fecha.getMinutes() < 10 ? '00' : fecha.getMinutes()}`
    },
  }
}


