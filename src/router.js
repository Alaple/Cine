import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home/index.vue'
import Login from './components/LogIn/index.vue'
import Register from './components/Register/index.vue'
import PeliculaSeleccionada from './components/PeliculaSeleccionada/index.vue'
import PeliculaFunciones from './components/PeliculaFunciones/index.vue'
import Reserva from './components/Reserva/index.vue'
/* 
import MiPerfil from './components/MiPerfil.vue'
import Peliculas from './components/Peliculas.vue'
import Salas from './components/Salas.vue'
import Funciones from './components/Funciones.vue'
 */

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes : [
        { path: '/', redirect:'/home' },
        { path: '/home', component: Home }, 
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/peliculaSeleccionada', component: PeliculaSeleccionada },
        { path: '/peliculaFunciones', component: PeliculaFunciones },
        { path: '/reserva', component: Reserva },
        /*{ path: '/miPerfil', component: MiPerfil },
        { path: '/peliculas', component: Peliculas },
        { path: '/salas', component: Salas },
        { path: '/funciones', component: Funciones },
        , */
    ]
})