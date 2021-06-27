import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); 

export default new Vuex.Store(
  { 
    state: {
      idPelicula: '',
      idFuncionSeleccionada: '',
      token:'',
      userid: ''
    }, 
    actions: {

    }, 
    mutations: {

    } 
  }
)