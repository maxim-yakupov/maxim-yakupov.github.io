(function(app) {
    /* global ng */
    app.BlogComponent = ng.core
        .Component({
            selector: 'qpon-blog',
            templateUrl: "qpon/templates/blog.component.html",
            directives : [ng.router.ROUTER_DIRECTIVES]
        })
        .Class({
            constructor: [
                ng.router.Router,
                function BlogComponentConstructor(router) {
                    this._router = router;
                }
            ]
        });

    ng.router.Routes([
        { path : '/', component : app.ArticlesListComponent },
        { path : '/:article', component : app.ArticleComponent }
    ])(app.BlogComponent);
})(window.app || (window.app = {}));
