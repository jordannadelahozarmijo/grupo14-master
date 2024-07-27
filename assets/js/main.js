$(document).ready(function(){
    

    function showHide(){
        $("#caja1").mouseenter(function () {
            $("#caja2").show();
        });

        $("#caja1").mouseleave(function () {
            $("#caja2").hide();
        });
    }
    showHide();


    function enviarMensaje(){
        $("#buttonSend").click(function () {
            var nombre = $("#nombre").val();
            var email = $("#email").val();
            var mensaje = $('#mensaje').val();
            alert("Su nombre es: " + nombre + ", su correo es: " +
            email +  " y su mensaje es: " + mensaje );
            });
    }
    enviarMensaje();

    function ElementoHabilidad(){
        $("#miElemento_1, #miElemento_2, #miElemento_3, #miElemento_4, #miElemento_5, #miElemento_6").mouseenter(function(){
            $(this).effect("shake", {times: 2}, 300);
        });
    }
    ElementoHabilidad();

});








