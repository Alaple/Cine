import { router } from "../../../router";

export default {
    name: 'src-components-home',
    components: {},
    props: [],
    data () {
      return {
        formState : {},
        lengthMin : 3,
        nombre:'',
        apellido:'',
        clave1:'',
        clave2:'',
        email:'',
        fechaNacimiento:'',
        error:false,
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
            this.error=false;
            alert("REGISTRO EXITOSO")
            router.push('/login');
          }catch(err){
            console.log("Register Error: ", err.message);
            this.error=true;
          }
      }
    }
  }
  
  
  