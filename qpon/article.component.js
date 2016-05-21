(function(app) {
    /* global ng */
    var l = app.utils.logger('article.component');

    app.ArticleComponent = ng.core
        .Component({
            selector: 'qpon-article',
            templateUrl: "qpon/templates/article.component.html",
            directives : [ng.router.ROUTER_DIRECTIVES]
        })
        .Class({
            constructor: [
                ng.router.RouteSegment,
                app.ArticleService,
                function ArticleComponentConstructor(routeSegment, articleService) {
                    this._articleService = articleService;
                    this.articleName = routeSegment.getParam('article');
                    this.articleId = "article-" + this.articleName;
                    this.article = {};
                    l.log("Article's name: \"" + this.articleName + "\"");
                }
            ],
            ngAfterViewInit: function() {
                let service = this._articleService;
                service.updateArticles()
                    .then(() => {
                        l.dir(this._articleService.articles);
                        service.loadAndProcess(this.articleName)
                            .then(article => {
                                this.article = article;
                                this.getArticleArea().innerHTML = article.content;
                            });
                    });

            },
            getArticleArea: function () {
                return document.getElementById(this.articleId);
            }
        });

})(window.app || (window.app = {}));
