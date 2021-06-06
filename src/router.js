import Vue from 'vue'
import VueRouter from 'vue-router'

/* import Home from './components/Home/index.vue' */
import Login from './components/Login.vue'
/* import Register from './components/Register.vue'
import MiPerfil from './components/MiPerfil.vue'
import PeliculaSeleccionada from './components/PeliculaSeleccionada.vue'
import PeliculaFunciones from './components/PeliculaFunciones.vue'
import Peliculas from './components/Peliculas.vue'
import Salas from './components/Salas.vue'
import Funciones from './components/Funciones.vue'
import Reserva from './components/Reserva.vue' */

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes : [
        { path: '/', redirect:'/home' },
/*         { path: '/home', component: Home }, */
        { path: '/login', component: Login },
/*         { path: '/register', component: Register },
        { path: '/miPerfil', component: MiPerfil },
        { path: '/peliculaSeleccionada', component: PeliculaSeleccionada },
        { path: '/peliculaFunciones', component: PeliculaFunciones },
        { path: '/peliculas', component: Peliculas },
        { path: '/salas', component: Salas },
        { path: '/funciones', component: Funciones },
        { path: '/reserva', component: Reserva }, */
    ]
})