$(function () {
    var token = GetParameterByName("token");
    var email = GetParameterByName("email");

    var url = apiBaseUrl + "/route/User/activate";

    var param = "{ 'Email': '{0}', 'Token': '{1}' }";

    param = param.format(email, token);
    var str = [];

    $.ajax({
        type: 'POST',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: param,
        success: OnSuccess,
        error: function (xhr, status, error) {
            PopupValidation(error);
        },
        complete: function (xhr, status) {
         
        }
    });
});

function OnSuccess(data, status) {
    if (data.Success) {
        window.location.href = "#login";
    }
    else {
        var str = [];

        $.each(data.ErrorList, function (i, val) {
            str.push(val.Message);
        });

        PopupValidation(str.join("<br/>"));
    }
}


function PopupValidation(content) {
    $('#modalValidation .modal-body').html("<div class='alert alert-danger'>" + content + "</div>");
    $('#modalValidation').modal('show');
}
