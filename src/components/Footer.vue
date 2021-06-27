<template>
  <section class="src-componentes-footer">
   <footer>
        <div id="footer" class="container-fluid">
            <div class="row">
                <div class="col">
                    <h2>Comunicate con nosotros </h2>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p><strong class="letra-distinta">Seguinos</strong> en nuestras <strong class="letra-distinta">redes sociales</strong></p>
                        <a href="" target="_blank"><i class="fab fa-facebook facebook-color" style="font-size:30px"></i></a>
                        <a href="" target="_blank"><i class="fab fa-instagram instagram-color" style="font-size:30px"></i></a>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p><strong class="letra-distinta">Reserva</strong> tu entrada por <strong class="letra-distinta">whatsapp</strong></p>
                    <ul class="list-inline">
                        <li><a href="https://api.whatsapp.com/send?phone=1159328585&text=Quisiera%20comunicarme%20con%20ustedes&source=&data=&app_absent=" target="_blank"><i class="fab fa-whatsapp whatsapp-color" style="font-size:30px"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <i class="fa fa-copyright letra-distinta" aria-hidden="true"> 2021 - Reserva Tu Entrada </i>
            </div>
        </div>
    </footer>  
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-componentes-footer',
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
  .src-componentes-footer {

  }

footer {
  width: 100%;
  height: 2.5rem;
  color: white;
  text-align: center;
  padding-top: 5px;

}

#footer{
  padding: 10px;
  background-color: black;
  color: white;
  margin: 5px auto;
  border-radius: 12px;
}

#footer h2{
  margin: 2px;
  padding-bottom: 10px;
}

#footer a{
  color: white;
  font-size: 15px;
  margin: 5px;
}

.facebook-color:hover{
  color: #3b5998;
}

.instagram-color:hover{
  color: #C13584;
}

.whatsapp-color:hover{
  color: #25D366;
}

#footer a:hover {
  color: lightgreen;
}

#footer p{
  text-align: center;
  padding: 5px;
  color: white;
  font-size: 18px;
  margin: 5px;
}

#footer ul{
  text-align: center;
}

#footer h2{
  color: #d6f789;
  font-size: 45px;
  text-align: center;
  font-weight: 600;
  text-shadow: 0px 0px 1px lightgreen;
}

.letra-distinta{
  color: #d6f789;
}

.list-inline{
  padding: 5px;
  margin: 5px;
}

</style>
