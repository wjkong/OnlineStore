$(function () {
    $('#btnRecover').click(function () {
        $(this).ShowProgressIndicator();

        var email = $.trim($('#txtEmail').val());

        var url = apiBaseUrl + "/route/user/recoverPwd";

        var param = "{ 'Email': '{0}' }";

        param = param.format(email);
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
    });
});

function OnSuccess(data, status) {
    if (data.Success) {
        $('#txtEmail').val(emptyStr);
        PopupSuccess("A temprory password has been sent to you");
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

function PopupSuccess(content) {
    $('#modalSuccess .modal-body').html("<div class='alert alert-success'>" + content + "</div>");
    $('#modalSuccess').modal('show');
}

