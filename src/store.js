import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); 

export default new Vuex.Store(
  { 
    state: {
      idPelicula: '',
      idFuncionSeleccionada: '',
      token:'',
      userid: '',
      valorEntrada: 650
    }, 
    actions: {

    }, 
    mutations: {

    } 
  }
)