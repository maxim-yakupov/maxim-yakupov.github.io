(function(app) {
    /* global ng */
    app.AppComponent = ng.core
        .Component({
            selector: 'qpon-app',
            templateUrl: "qpon/templates/app.component.html",
            directives : [ng.router.ROUTER_DIRECTIVES, app.NavigationComponent],
            providers : [
                ng.router.ROUTER_PROVIDERS,
                ng.core.provide(
                    ng.common.LocationStrategy,
                    { useClass: ng.common.HashLocationStrategy }
                )
            ]
        })
        .Class({
            constructor: [
                ng.router.Router,
                function AppComponentConstructor(router) {
                    this._router = router;
                    this.useAsDefault("blog");
                }
            ],
            useAsDefault: function(defaultPath) {
                if (this._router.urlTree._root.children.length == 0) {
                    this._router.navigate([defaultPath]);
                }
            }
        });

    ng.router.Routes([
        { path : '/blog', component : app.BlogComponent },
        { path : '/about', component : app.AboutComponent },
        { path : '/:wrong', component : app.WrongPathComponent }
    ])(app.AppComponent);
})(window.app || (window.app = {}));
