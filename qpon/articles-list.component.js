(function(app) {
    /* global ng */
    var l = app.utils.logger('articles-list');

    app.ArticlesListComponent = ng.core
        .Component({
            selector: 'qpon-articles-list',
            templateUrl: "qpon/templates/articles-list.component.html",
            directives: [app.ArticlePreviewComponent, app.TagsComponent]
        })
        .Class({
            constructor:
                function ArticlesListComponentConstructor() {
                    this.articles = [];
                    this.articlesToShow = [];
                    this.articlesPerPage = 4;
                    this.page = 0;
                    this.totalPages = 0;
                    this.updateArticles();
                },
            ngAfterViewInit: function () {
                app.utils.MDL.upgradeClasses(["mdl-js-button"]);
            },
            preparePreview: function (i) {
                if (i < 0) return this.showArticles(
                    this.page * this.articlesPerPage,
                    (this.page + 1) * this.articlesPerPage
                );
                return app.utils.API.article(this.articles[i].name)
                    .then(text => this.articles[i].preview = text.substring(0, 500))
                    .then(t => this.preparePreview(i - 1));
            },
            updateArticles: function () {
                app.utils.API.articles()
                    .then(articles => this.articles = articles)
                    .then(a => this.totalPages = 1 +
                        (this.articles.length - this.articles.length % this.articlesPerPage)
                        / this.articlesPerPage)
                    .then(t => this.preparePreview(this.articles.length - 1));
            },
            showArticles: function (leftLimit, rightLimit) {
                this.articlesToShow.length = 0;
                this.articles.slice(leftLimit, rightLimit)
                    .forEach(article => this.articlesToShow.push(article));
            },
            showNext: function (shift) {
                this.page += shift;
                this.page %= this.totalPages;
                this.page =
                    this.page < 0 ?
                        this.totalPages + this.page :
                        this.page;
                this.showArticles(
                    this.page * this.articlesPerPage,
                    (this.page + 1) * this.articlesPerPage
                );
                l.log('showNext(' + shift + ') '
                    + this.page + ' '
                    + this.articlesPerPage
                );
            }
        });

})(window.app || (window.app = {}));
