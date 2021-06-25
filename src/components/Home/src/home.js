import { router } from "../../../router";
import store from "../../../store";

export default {
    name: 'src-components-home',
    components: {},
    props: [],
    data () {
      return {
        peliculas: [],
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
          let respuesta = await this.axios(this.urlPelicula);
          this.peliculas = respuesta.data;
        } catch (error) {
          console.error(error);
        }
      },
      savePelicula(id){
        store.state.idPelicula=id;
        router.push('/peliculaSeleccionada');
      }
    }
  }
  
  
  