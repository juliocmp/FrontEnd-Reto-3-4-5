var endpointCategory = "http://129.151.121.96:8080/api/Category"
$(document).ready(function() {
    //  postDepartamento()
    $("#alerta").hide()
    $("#guardarCategory").click(function() {
        postCategory()
    })
})

function postCategory() {

    let categoria = {
        id: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    }

    console.log(categoria)

    $.ajax({

        url: endpointCategory + "/save",
        type: 'POST',
        data: JSON.stringify(categoria),
        dataType: 'json',
        contentType: "application/json",
        complete: function(data) {
            console.log(data.status)
            let mensaje = ""
            if (data.status == "201") {
                mensaje = "Se guardó la Categoría con Exito"
            } else {
                console.log(data.status)
                mensaje = "problemas al Guardar en BD consulte con el Administrador"
            }
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            limpiarCategory()

        }

    })
}


function limpiarCategory() {
    $("#id").val(""),
        $("#name").val(""),
        $("#description").val("")
}