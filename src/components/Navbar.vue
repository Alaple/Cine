<template>
  <section class="src-componentes-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
      
      <!-- opción ruta Home -->
      <router-link to="/home">
        <a class="navbar-brand" href="#">ReservaTuEntrada</a>
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
        <ul class="nav navbar-nav">
          <!-- opción ruta Login -->
          <li class="nav-item active">
            <router-link to="/login">
              <a class="nav-link" href="#">Login</a>
            </router-link>
          </li> 
            <!-- opción ruta MiPerfil -->
          <li class="nav-item">
          <div v-if="userId">
            <router-link to="/miPerfil">
              <a class="nav-link" href="#">MiPerfil</a>
            </router-link>
          </div>
          <div v-else>  
          <router-link to="/login">
              <a class="nav-link" href="#">MiPerfil</a>
          </router-link>
          </div>
          </li>
        </ul>
      </div>
    </nav>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-componentes-navbar',
    props: ['userId'],
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

  #navbarNav{
    margin-left: auto;
    flex-grow: 0;
  }

  a {
    outline: none;
    text-decoration: none;
    padding: 2px 1px 0;
    color: white;
  }


  a:link {

  }

  a:visited {

  }

  #navbarNav a:hover {
    color: #d6f789 !important;
    transition: color 0.s ease;
  }

  a:active {

  }

  .navbar {
    margin-bottom: 1rem;
    border-radius: 1px;
  }

  .navbar ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .navbar li{
    border-right: 1.5px solid #d6f789;
    float: left;
    font-family: 'Nunito', sans-serif;
  }

  .navbar li:last-child{
    border-right: none;
  }

  .nav-link{
    color: white !important;
    
  }

  .navbar a{
    display: block;
    padding: 2px 10px ;
    font-family: 'Nunito', sans-serif;
  }

  .navbar-brand{
    padding-left: .8rem;
    font-family: 'Acme', sans-serif !important;
    font-size:25px;
    text-decoration: underline #d6f789;
  }

</style>
