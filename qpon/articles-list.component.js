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
            constructor: [
                app.ArticleService,
                function ArticlesListComponentConstructor(articleService) {
                    this._articleService = articleService;
                    this.toShow = [];
                    this.perPage = 4;
                    this.currentPage = 0;
                    this.totalPages = 0;
                    this.updateArticles();
                }
            ],
            ngAfterViewInit: function () {
                app.utils.MDL.upgradeClasses(["mdl-js-button"]);
            },
            updateArticles: function () {
                let service = this._articleService;
                let self = this;
                function computeNumberOfPages() {
                    let length = service.getLength();
                    let perPage = self.perPage;
                    return 1 +
                      (length - length % perPage)
                      / perPage;
                };
                service.updateArticles()
                    .then(a => this.totalPages = computeNumberOfPages())
                    .then(t => this.showNext(0));
            },
            showArticles: function (leftLimit, rightLimit) {
                this.toShow.length = 0;
                this._articleService.getArticles(leftLimit, rightLimit)
                    .forEach(article => this.toShow.push(article));
            },
            showNext: function (shift) {
                this.currentPage += shift;
                this.currentPage %= this.totalPages;
                this.currentPage =
                    this.currentPage < 0 ?
                        this.totalPages + this.currentPage :
                        this.currentPage;
                this.showArticles(
                    this.currentPage * this.perPage,
                    (this.currentPage + 1) * this.perPage
                );
                l.log('showNext(' + shift + ') '
                    + this.currentPage + ' '
                    + this.perPage
                );
            }
        });

})(window.app || (window.app = {}));
