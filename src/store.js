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
      setToken ({commit}, token) {
        console.log('ACTION setToken: ', token);
        commit('setToken', token);
      },
      setUserId ({commit}, userId) {
        console.log('ACTION setUserId: ', userId);
        commit('setUserId', userId);
      }
    }, 
    mutations: {
      setToken(state, token) {
        console.log('MUTATIONS setToken: ', token);
        state.token = token;
      },
      setUserId(state, userId) {
        console.log('MUTATIONS setUserId: ', userId);
        state.userid = userId;
      }
    } 
  }
)