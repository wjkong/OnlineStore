var emptyStr = '';
var zero = 0.00;
var lineBreak = '<br />';
var yes = "Y";
var singleQuote = "'";
var comma = ",";
var space = " ";
var root = emptyStr;
var linkText = "<a target=_blank href='{0}'>{1}</a>";
var mapLink = "<span data-latitude='{0}' data-longitude='{1}' class='map text-info' data-toggle='modal' data-target='#modalMap'><span class='glyphicon glyphicon-map-marker'></span>{2}</span>";
var imgLink = "<img src='{0}' alt=icon />";

var app = angular.module('onlineStoreApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'Pages/home.html',
            controller: 'mainController'
        })
         .when('/home', {
              templateUrl: 'Pages/home.html',
              controller: 'mainController'
          })
         .when('/login', {
             templateUrl: 'Pages/login.html',
             controller: 'loginController'
         })
        .when('/logout', {
            templateUrl: 'Pages/logout.html',
            controller: 'logoutController'
        })
          .when('/myAccount', {
              templateUrl: 'Pages/myAccount.html',
              controller: 'myAccountController'
          })
        .when('/registration', {
            templateUrl: 'Pages/registration.html',
            controller: 'registerController'
        })
        .when('/contact', {
            templateUrl: 'Pages/contact.html',
            controller: 'contactController'
        })
        .when('/activation', {
            templateUrl: 'Pages/activation.html',
            controller: 'activationController'
        })
        .when('/recoverPassword', {
            templateUrl: 'Pages/recoverPassword.html',
            controller: 'recoverPasswordController'
        });

    //$locationProvider.html5Mode(true);
});


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-65517203-1', 'auto');
ga('send', 'pageview');

Date.prototype.yyyymmdd = function () {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
};

Date.prototype.mmdd = function () {
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
};

String.prototype.format = function () {
    var s = this;
    var i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};


String.prototype.formatNumber = function () {
    var s = this;

    return Number(s.replace(/[^0-9\.]+/g, ""));
};


$.fn.stars = function () {

    var strStar = "<span style='width: {0}px;'></span>";

    return $(this).each(function () {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        // Replace the numerical value with stars
        $(this).html(strStar.format(size));
    });
}

$.fn.ShowProgressIndicator = function () {
    // To prevent double-click, create an invisible layer to cover the submit button. Also, display a progress indicator.
    $(this).append("<span class='progressIndicator'><img src='../Images/loading.gif' /></span>");

    var position = $(this).position();

    var left = position.left - 2;
    var top = position.top - 2;
    var height = $(this).outerHeight() + 4;
    var width = $(this).outerWidth() + 4;

    $('.progressIndicator').css('left', left)
                                      .css('top', top)
                                      .css('width', width)
                                      .css('height', height)
                                      .show();
}



// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

  
});

function GetParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function isLogin() {
    var result = false;

    if ($('#hidEmail').val().length != 0)
        result = true;

    return result;
}

$(function () {
    $('.navbar-collapse').click('li', function () {
        $('.navbar-collapse').collapse('hide');
    });

    $('#hypLogout').click(function () {
        $('#lblEmail').text(emptyStr);
        $('#hypRegistration').show();
        $('#hypLogin').show();
        $('#hypLogout').hide();
        $('#hypMyAccount').hide();

        window.location.href = "#home";
    });
});

