(function(app) {
    /* global ng */
    app.ArticlePreviewComponent = ng.core
        .Component({
            selector: 'qpon-article-preview',
            templateUrl: "qpon/templates/article-preview.component.html",
            directives: [ng.router.ROUTER_DIRECTIVES],
            inputs: ['article']
        })
        .Class({
            constructor:
                function ArticlePreviewComponentConstructor() {
                },
            ngOnInit: function () {
              this.background =
                  this.article.background ?
                      this.article.background :
                      "https://pp.vk.me/c627119/v627119577/375d8/2pksm55fEaQ.jpg";
            },
            ngAfterViewInit: function () {
                app.utils.MDL.upgradeClasses(["mdl-js-button"]);
            }
        });

})(window.app || (window.app = {}));
