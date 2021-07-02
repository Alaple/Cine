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
        email:'',
        fechaNacimiento:'',
        error:false,
        urlRegister: 'http://localhost:3000/api/usuarios',
        clave1:'',
        clave2:'',
        msg: [],
        showPassword: false
      }
    },

    watch:{
      clave1(value){
        value = this.clave1
        this.validatePassword(value)
      }
    },

    methods: {

      validatePassword(value) {
        let difference = 8 - value.length;
        if (value.length < 8) { 
          this.msg['clave1'] = 'Debe contener 8 caracteres como mínimo!'
          this.msg['clave1'] = (difference == 1) ? 'Resta 1 ':'Restan ' + difference
         } else { 
           this.msg['clave1'] = '';   
        }

        let has_number = /\d/.test(value)
        if (!has_number) {
          this.msg['clave1'] = 'Debe contener al menos un número'
        }

        let has_lowercase = /[a-z]/.test(value)
        if (!has_lowercase) {
          this.msg['clave1'] = 'Debe contener al menos una minúscula'
        }

        let has_uppercase = /[A-Z]/.test(value)
        if (!has_uppercase) {
          this.msg['clave1'] = 'Debe contener al menos una mayúscula'
        }

        /*eslint-disable*/
        let has_special = /[!@#\$%\^\&*\)\(+=._-]/.test(value)
        if (!has_special) {
          this.msg['clave1'] = 'Debe contener al menos un caracter especial'
        }
      },

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
  
  
  