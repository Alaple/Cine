import { router } from "../../../router";
import store from "../../../store";
import { errorAlertMixin } from "../../../errorAlertMixin"

export default {
    name: 'src-components-home',
    components: {},
    props: [],
    mixins: [errorAlertMixin],
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
            console.log(respuesta)
            store.state.token = respuesta.data.token;
            store.state.userid = respuesta.data.user._id;
            this.error=false;
            if(!respuesta.data.user.esAdministrador){
              router.push('/home');
            }else{
              router.push('/adminHome');
            }
          }catch(err){
            console.log("LogIn Error: ", err);
            this.alertaError('Los datos ingresados son incorrectos')
            this.error=true;
          }
      }
    }
  }
  
  
  