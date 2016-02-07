$(function () {
    //var userName = getCookie("userName");

    ////$('#hidEmail').val("wjkonger@gmail.com");

    //if (userName != undefined && userName.length > 0) {
    //    $('#txtEmail').val(userName);

    //    $("#chkRememberMe").prop('checked', true);
    //}

    $('#btnLogin').click(function () {
        $(this).ShowProgressIndicator();

        var email = $.trim($('#txtEmail').val());
        var password = $.trim($('#txtPassword').val());
   
        $(this).ShowProgressIndicator();

        var email = $.trim($('#txtEmail').val());
        var password = $.trim($('#txtPassword').val());
        var confirmPwd = $.trim($('#txtConfirmedPassword').val());

        var url = apiBaseUrl + "/route/user/login";

        var param = "{ 'Email': '{0}', 'Password': '{1}' }";

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
                //grecaptcha.reset();
                $('.progressIndicator').fadeOut(100).remove();
            }
        });
    });
});

function OnSuccess(data, status) {
    if (data.Success) {
        if ($("#chkRememberMe").prop('checked')) {
            var username = $.trim($('#txtEmail').val());

            setCookie("userName", username);
        }

        var email = $.trim($('#txtEmail').val())

        window.location.href = "#home";

        setCookie("authToken", username);

        $('#hypRegistration').hide();
        $('#hypLogin').hide();
        $('#hypLogout').show();
        $('#hypMyAccount').show();
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

