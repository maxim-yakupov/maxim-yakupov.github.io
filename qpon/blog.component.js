(function(app) {
    /* global ng */
    app.BlogComponent = ng.core
        .Component({
            selector: 'qpon-blog',
            templateUrl: "qpon/templates/blog.component.html",
            directives: [ng.router.ROUTER_DIRECTIVES],
            providers: [app.ArticleService]
        })
        .Class({
            constructor: [
                ng.router.Router,
                app.ArticleService,
                function BlogComponentConstructor(router, articleService) {
                    this._router = router;
                    this._articleService = articleService;
                }
            ]
        });

    ng.router.Routes([
        { path : '/', component : app.ArticlesListComponent },
        { path : '/:article', component : app.ArticleComponent }
    ])(app.BlogComponent);
})(window.app || (window.app = {}));
