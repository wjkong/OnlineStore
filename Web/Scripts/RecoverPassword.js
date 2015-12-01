$(function () {
    $('#btnRecover').click(function () {
         $(this).ShowProgressIndicator();

        var email = $.trim($('#txtEmail').val());

        if (email.length > 0) {
            var url = apiBaseUrl + "/route/User?action=ChangeStatus";

            var param = "{ 'email': '{0}' }";
            param = param.format(email);
            var str = [];

            $.ajax({
                type: 'PUT',
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: param,
                success: OnSuccess,
                error: function (xhr, status, error) {
                     PopupValidation(error);
                },
                complete: function (xhr, status) {
                    $('.progressIndicator').fadeOut(100).remove();
                }
            });
        }
        else {
            var str = [];

            if (email.length == 0)
                str.push("<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>Username is requried<br/>");

            $('.progressIndicator').fadeOut(100).remove();

            PopupValidation(str.join(emptyStr));
        }
    });
});

function OnSuccess(data, status) {
    if (data) {
        var email = $.trim($('#txtEmail').val())

        window.location.href = "#login";
     
    }
    else {
        PopupValidation("Invalid Email");
    }
}

function PopupValidation(content) {
    $('#modalValidation .modal-body').html("<div class='alert alert-danger'>" + content + "</div>");
    $('#modalValidation').modal('show');
}