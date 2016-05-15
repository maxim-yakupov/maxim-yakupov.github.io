(function(app) {
    /* global ng */
    app.NavigationComponent = ng.core
        .Component({
            selector: 'qpon-navigation',
            templateUrl: "qpon/templates/navigation.component.html",
            directives : [ng.router.ROUTER_DIRECTIVES]
        })
        .Class({
            constructor:
                function NavigationComponentConstructor() {}
        });
})(window.app || (window.app = {}));
