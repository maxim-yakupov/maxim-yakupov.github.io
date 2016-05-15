(function(app) {
    /* global ng */
    app.ArticlePreviewComponent = ng.core
        .Component({
            selector: 'qpon-article-preview',
            templateUrl: "qpon/templates/article-preview.component.html",
            directives: [ng.router.ROUTER_DIRECTIVES],
            inputs: ['articleName']
        })
        .Class({
            constructor:
                function ArticlePreviewComponentConstructor() {},
            ngAfterViewInit: function () {
                app.utils.MDL.upgradeClasses(["mdl-js-button"]);
            }
        });

})(window.app || (window.app = {}));
