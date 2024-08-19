//Uso DOM con JQuery

//Uso de Text, HTML y Val

/* $(function () {
    $("#btn1").click(function () {
        console.log("Text: " + $("#test").text());
    });
    $("#btn2").click(function () {
        console.log("HTML: " + $("#test").html());
    });
    $("#btn3").click(function () {
        console.log("Value: " + $("#valorNom").val() + " " + $("#valorAp").val());
    });
}); */

//Uso de Text, HTML y Val para reemplazar texto
$(function () {
    //reemplaza el texto con id test
    $("#btn1").click(function () {
        $("#test").text("Reemplazamos este texto");
    });
    //reemplaza el text con id test y lo hace mas grande
    $("#btn2").click(function () {
        "HTML: " + $("#test").html("<h1>Luego, podemos hacerlo más <i>GRANDE</i></h1>");
    });
    //reemplaza el valor en los inputs
    $("#btn3").click(function () {
        "Value: " + $("#valorNom").val("Salvador") + " " + $("#valorAp").val("Dalí");
    });
});

//Uso del atributo Attr
$(function () {
    $("#hola").click(function () {
        $("#inputHola").attr("value", "Hola")
    })
})

//Uso del atributo Css

//obtener los colores por consola
$(function () {
    $("#obtenerColores").click(function () {
        console.log($("#p").css("background-color"));
        console.log($("#p2").css("background-color"));
        console.log($("#p3").css("background-color"));
    });
});

//Cambiar el color de todos las p
$(function () {
    $("#cambiarColores").click(function () {
        $("p").css("background-color", "yellow");
    });
});

//Cambia el color de las letras, el color del background y el tamaño.
$(function () {
    $("#cambiarPropiedades").click(function () {
        $("p").css({
            "background-color": "yellow",
            "font-size": "150%",
            "color": "blue"
        });
    });
});
