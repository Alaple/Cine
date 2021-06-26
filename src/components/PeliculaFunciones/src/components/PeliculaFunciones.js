export default {
  name: 'src-components-pelicula-funciones',
  components: {},
  props: [],
  data () {
    return {
      //idPelicula: '60bbea67169271a0c174521f',
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
        // Para actualizar el listado de dias y horas
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
              funcion: funcion._id
            }]
          })          
        } 
        else
        {
          var horarioActuales = this.funcionesDiasYHorario[pos].horarios;
          console.log(horarioActuales);
          var nuevoHorarios = []
          horarioActuales.forEach(element => nuevoHorarios.push(element));
          nuevoHorarios.push({
            hora: this.getHora(fecha),
            funcion: funcion._id
          });
          this.funcionesDiasYHorario[pos].horarios = nuevoHorarios;
        }
      }
    },
    getHora(fecha) {      
      return `${fecha.getHours()}:${fecha.getMinutes() < 10 ? '00' : fecha.getMinutes()}`
    },
    goToReserva(idFuncion) {
      this.$store.state.idFuncionSeleccionada = idFuncion;
      this.$router.push('/reserva');
    }
  }
}


