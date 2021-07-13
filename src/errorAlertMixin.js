export const errorAlertMixin = {
        methods: {
            alertaError(errorMensaje) {
                if(!alert(errorMensaje)){window.location.reload();}
              }
        }
    }
