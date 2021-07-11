export default {
  name: 'src-components-pelicula-funciones',
  components: {},
  props: [],
  data () {
    return {
      idPelicula: this.$store.state.idPelicula,
      pelicula: {},
      funciones: [],
      urlFunciones: 'http://localhost:3000/api/funciones/',
      urlPeliculas: 'http://localhost:3000/api/peliculas/',
      funcionesDiasYHorario: []
    }
  },
  computed: {
    
  },
  mounted () {
    this.getFuncionesPorPelicula(this.idPelicula);
    this.getPelicula(this.idPelicula);
  },
  methods: {
    async getFuncionesPorPelicula(id) {
      try {
        let respuesta = await this.axios(this.urlFunciones + 'pelicula/' + id);
        this.funciones = respuesta.data;
        // Actualiza el listado de dias y horas
        this.calcularFuncionesDiasYHorarios();
      } catch (error) {
        console.error(error);
      }
    },
    async getPelicula(id) {
      try {
        let respuesta = await this.axios(this.urlPeliculas + id);
        this.pelicula = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
    getDia(dia){
      switch (dia) {
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
    calcularFuncionesDiasYHorarios() {
      for (const funcion of this.funciones) {
        var fecha = new Date(funcion.diaHorario);
        let pos = this.funcionesDiasYHorario.map(function(f) { return f.dia; }).indexOf(fecha.getDay());
        if (pos == -1) {
          this.funcionesDiasYHorario.push({
            dia: fecha.getDay(),
            horarios: [{
              hora: this.getHora(fecha),
              lugaresDisponibles: funcion.cantLugaresDisponibles,
              funcion: funcion._id
            }]
          })          
        } 
        else
        {
          var horarioActuales = this.funcionesDiasYHorario[pos].horarios;
          var nuevoHorarios = []
          horarioActuales.forEach(element => nuevoHorarios.push(element));
          nuevoHorarios.push({
            hora: this.getHora(fecha),
            lugaresDisponibles: funcion.cantLugaresDisponibles,
            funcion: funcion._id
          });
          this.funcionesDiasYHorario[pos].horarios = nuevoHorarios;
        }
      }
    },
    getHora(fecha) {
      // Devuelve formato: HH:MM
      return `${fecha.getHours()}:${fecha.getMinutes() < 10 ? '00' : fecha.getMinutes()}`
    },
    goToReserva(idFuncion) {
      this.$store.state.idFuncionSeleccionada = idFuncion;
      this.$router.push('/reserva');
    },
    getButtonClass(cantLugares) {
      return [
          'btn',
          cantLugares > 0 ? 'btn-success' : 'btn-secondary',
          'my-2',
          'me-2'
      ]
    },
  }
}


