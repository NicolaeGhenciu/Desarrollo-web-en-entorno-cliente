$(function () {
    $("#login").on("click", function () {
        $.ajax({
            url: 'login.php',
            type: 'GET',
            dataType: 'json',
            data: {
                email: $('#email').val(),
                pass: $('#pass').val(),
            },
            success: function (datos) {

                //console.log(datos);

                //console.log(datos['email']);

                // Luego, agrega la cadena de texto como un parámetro de consulta en la URL

                if (datos == null) {
                    $('#mensajePass').html("<b style='color: red;'> Incorrecta </b>");
                    $('#mensajeEmail').html("<b style='color: red;'> Incorrecta </b>");
                } else {
                    const url = "ahorcado.html?id=" + datos['id'];

                    if (datos['email'] != "") {
                        window.location.replace(url);
                    };
                }

            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');

            },
            complete: function (xhr, status) {
                //alert('Petición realizada');
            }
        });
    });
});