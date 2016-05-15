(function(app) {
    /* global ng */
    app.ArticleComponent = ng.core
        .Component({
            selector: 'qpon-article',
            templateUrl: "qpon/templates/article.component.html",
            directives : [ng.router.ROUTER_DIRECTIVES]
        })
        .Class({
            constructor: [
                ng.router.RouteSegment,
                function ArticleComponentConstructor(routeSegment) {
                    this.articleName = routeSegment.getParam('article');
                    window.console.log(this.articleName);
                    app.utils.API.article(this.articleName).then(text => this.text = text);
                }
            ]
        });

})(window.app || (window.app = {}));
