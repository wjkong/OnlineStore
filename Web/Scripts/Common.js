var app = angular.module('onlineStoreApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'Pages/home.html',
            controller: 'mainController'
        })
         .when('/login', {
             templateUrl: 'Pages/login.html',
             controller: 'loginController'
         })


        // route for the about page
        .when('/about', {
            templateUrl: 'Pages/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'Pages/contact.html',
            controller: 'contactController'
        });


    //$locationProvider.html5Mode(true);
});



// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

app.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

app.controller('loginController', function ($scope) {
    $scope.message = 'Login .';
});