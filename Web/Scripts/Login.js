$(function () {
    var userName = getCookie("userName");

    //$('#hidEmail').val("wjkonger@gmail.com");

    if (userName != undefined && userName.length > 0) {
        $('#txtUsername').val(userName);

        $("#chkRememberMe").prop('checked', true);
    }

    $('#btnLogin').click(function () {
        $(this).ShowProgressIndicator();

        var email = $.trim($('#txtEmail').val());
        var password = $.trim($('#txtPassword').val());
   
        if (email.length > 0 && password.length > 0) {
            var url = apiBaseUrl + "/route/User?action=Login";

            var param = "{ 'email': '{0}', 'password': '{1}' }";
            param = param.format(email, password);
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
                    $('.progressIndicator').fadeOut(100).remove();
                }
            });
        }
        else {
            var str = [];

            if (username.length == 0)
                str.push("<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>Username is requried<br/>");

            if (password.length == 0)
                str.push("<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>Password is requried<br/>");

            if (response.length == 0)
                str.push("<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>ReCaptcha is requried<br/>");

            $('.progressIndicator').fadeOut(100).remove();

            PopupValidation(str.join(emptyStr));
        }
    });


});

function OnSuccess(data, status) {
    if (data) {
        if ($("#chkRememberMe").prop('checked')) {
            var username = $.trim($('#txtEmail').val());

            setCookie("email", username);
        }

        var email = $.trim($('#txtEmail').val())

        window.location.href = "#home";

        $('#lblEmail').text(email);
        $('#hypRegistration').hide();
        $('#hypLogin').hide();
        $('#hypLogout').show();
        $('#hypMyAccount').show();
    }
    else {
        PopupValidation("Invalid username and password");
    }
}

function PopupValidation(content) {
    $('#modalValidation .modal-body').html("<div class='alert alert-danger'>" + content + "</div>");
    $('#modalValidation').modal('show');
}