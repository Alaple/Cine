import { router } from "../../../router";

export default {
    name: 'src-components-home',
    components: {},
    props: [],
    data () {
      return {
        nombre:'',
        apellido:'',
        clave1:'',
        clave2:'',
        email:'',
        fechaNacimiento:'',
        urlRegister: 'http://localhost:3000/api/usuarios'
      }
    },
    computed: {
        
    },
    mounted () {
      
    },
    methods: {
      async registerUser(user,clave1,clave2){
          try{
            if(clave1!=clave2) throw new Error("La clave no coincide")
            await this.axios.post(this.urlRegister,user);
            router.push('/login');
          }catch(err){
            console.log("Register Error: ", err.message);
          }
      }
    }
  }
  
  
  