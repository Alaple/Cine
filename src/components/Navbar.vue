<template>

  <section class="src-componentes-navbar">

    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      
      <router-link to="/">
        <a class="navbar-brand" href="#">Inicio</a>
      </router-link>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- opción ruta Home -->
          <li class="nav-item">
            <router-link to="/home">
              <a class="nav-link" href="#">Home</a>
            </router-link>
          </li>
          <!-- opción ruta Login -->
          <li class="nav-item">
            <router-link to="/login">
              <a class="nav-link" href="#">Login</a>
            </router-link>
          </li>
          <!-- opción ruta Register -->
          <li class="nav-item">
            <router-link to="/register">
              <a class="nav-link" href="#">Register</a>
            </router-link>
          </li>
          <!-- opción ruta MiPerfil -->
          <li class="nav-item">
            <router-link to="/miPerfil">
              <a class="nav-link" href="#">MiPerfil</a>
            </router-link>
          </li>
          <!-- opción ruta PeliculaSeleccionada -->
          <li class="nav-item">
            <router-link to="/peliculaSeleccionada">
              <a class="nav-link" href="#">PeliculaSeleccionada</a>
            </router-link>
          </li>
          <!-- opción ruta PeliculaFunciones -->
          <li class="nav-item">
            <router-link to="/peliculaFunciones">
              <a class="nav-link" href="#">PeliculaFunciones</a>
            </router-link>
          </li>
          <!-- opción ruta Peliculas -->
          <li class="nav-item">
            <router-link to="/peliculas">
              <a class="nav-link" href="#">Peliculas</a>
            </router-link>
          </li>
          <!-- opción ruta Salas -->
          <li class="nav-item">
            <router-link to="/salas">
              <a class="nav-link" href="#">Salas</a>
            </router-link>
          </li>
          <!-- opción ruta Reserva -->
          <li class="nav-item">
            <router-link to="/reserva">
              <a class="nav-link" href="#">Reserva</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-componentes-navbar',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-componentes-navbar {

  }
</style>
