$(function () {
    $('#btnRegister').click(function () {
        $(this).ShowProgressIndicator();

        var email = $.trim($('#txtEmail').val());
        var password = $.trim($('#txtPassword').val());
        var confirmPwd = $.trim($('#txtConfirmedPassword').val());
        //var response = grecaptcha.getResponse();
    
        var url = apiBaseUrl + "/route/user/new";

        var param = "{ 'Email': '{0}', 'Password': '{1}', 'ConfirmPassword': '{2}' }";

        param = param.format(email, password, confirmPwd);
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
                //grecaptcha.reset();
                $('.progressIndicator').fadeOut(100).remove();
            }
        });
     
    });
});

function OnSuccess(data, status) {
    if (data.Success) {
       
        $('#loginToken').val("Y");

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