import { router } from "../../../router";
import store from "../../../store";

export default {
    name: 'src-components-home',
    components: {},
    props: [],
    data () {
      return {
        email:'',
        clave:'',
        error: false,
        urlLogIn: 'http://localhost:3000/api/usuarios/login'
      }
    },
    computed: {
        
    },
    mounted () {
      this.error=false;
    },
    methods: {
      async logInToPage(email,password){
          try{
            let respuesta = await this.axios.post(this.urlLogIn,{email: email,clave: password});
            store.state.token = respuesta.data;
            this.error=false;
            router.push('/home');
          }catch(err){
            console.log("LogIn Error: ", err);
            this.error=true;
          }
      }
    }
  }
  
  
  