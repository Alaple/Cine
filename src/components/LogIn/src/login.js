import { router } from "../../../router";
import store from "../../../store";

export default {
    name: 'src-components-home',
    components: {},
    props: [],
    data () {
      return {
        urlLogIn: 'http://localhost:3000/api/usuarios/login'
      }
    },
    computed: {
        
    },
    mounted () {
      
    },
    methods: {
      async logInToPage(email,password){
          try{
            let respuesta = await this.axios(this.urlLogIn,{email: email,clave: password});
            store.state.token = respuesta.data;
            router.push('/home');
          }catch(err){
            console.log("LogIn Error: ", err);
          }
      }
    }
  }
  
  
  