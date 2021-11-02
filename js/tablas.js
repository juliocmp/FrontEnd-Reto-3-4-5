var endpointCategory = "http://129.151.121.96:8080/api/Category"
$(document).ready(function() {
    $("#alerta").hide()
    getCategory()
    $("#actualizarCategory").click(function() {
        putCategory()

    })
})


function getCategory() {

    $.ajax({

        url: endpointCategory + "/all",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.length == 0) {
                $("#tabla").hide()
                $("#alertareg").show()
            } else {
                $("#alertareg").hide()
                let registro = ""
                $.each(data, function(index, categoria) {
                    registro += "<tr>" +
                        "<td>" + categoria.id + "</td>" +
                        "<td>" + categoria.name + "</td>" +
                        "<td>" + categoria.description + "</td>" +
                        "<td>" +
                        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'" +
                        "onclick=\"verCategory('" + categoria.id + "','" + categoria.name + "','" + categoria.description + "')\"" +
                        ">Actualizar</button>" +
                        "<button class='btn btn-danger ml-1'  " +
                        "onclick=\"eliminarCategory('" + categoria.id + "')\"" +
                        ">Eliminar</button>" +
                        "</td>"
                    "</tr>"

                })

                $("#tbody").html(registro)
            }

        }

    })
}



function verCategory(id, name, description) {
    // let ds = new Date(startDate)
    // let de = new Date(endDate)
    $("#id").val(id)
    $("#name").val(name)
    $("#description").val(description)
        //$("#startDate").val(ds.toISOString().slice(0, 16))
        //$("#endDate").val(de.toISOString().slice(0, 16))
}


function putCategory() {

    let categoria = {
        id: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    }


    $.ajax({

        url: endpointCategory + "/update",
        type: 'PUT',
        data: JSON.stringify(categoria),
        dataType: 'json',
        contentType: "application/json",
        complete: function(data) {
            console.log(data.status)
            let mensaje = ""
            if (data.status == "201") {
                mensaje = "Actualizo Categoría con Exito"
            } else {
                mensaje = "problemas al Guardar en BD consulte con el Administrador"
            }
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            getCategory()
        }

    })
}




function eliminarCategory(id) {

    $.ajax({

        url: endpointCategory + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        complete: function(data) {
            getCategory()
        }

    })
}