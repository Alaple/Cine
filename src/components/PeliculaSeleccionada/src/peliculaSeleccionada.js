import { router } from "../../../router";
import store from "../../../store";

export default {
    name: 'src-components-peliculaSeleccionada',
    components: {},
    props: [],
    data () {
      return {
        idPelicula:'',
        pelicula: {},
        urlPelicula: 'http://localhost:3000/api/peliculas/'
      }
    },
    computed: {
        
    },
    mounted () {
      this.getPeliculas();
    },
    methods: {
      async getPeliculas() {
        try {
          let respuesta = await this.axios(this.urlPelicula+ store.state.idPelicula);
          this.pelicula = respuesta.data;
        } catch (error) {
          console.error(error);
        }
      },
      goToReserva(){
        router.push('/reserva');
      }
    }
  }
  
  
  