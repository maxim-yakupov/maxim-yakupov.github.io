(function(app) {
    /* global ng */
    var l = app.utils.logger('article.service');

    app.ArticleService = ng.core
        .Class({
            constructor: function ArticleServiceConstructor() {
                this.articles = [];
                this.updateArticles();
            },
            updateArticles: function () {
                return app.utils.API.articles()
                          .then(articles => {
                              this.articles.length = 0;
                              for (let article of articles) {
                                  this.articles.push(article);
                              };
                              l.log('Articles loaded');
                              l.dir(this.articles);
                              return articles;
                          });
            },
            getLength: function () {
                return this.articles.length;
            },
            getArticles: function (leftLimit, rightLimit) {
                if (leftLimit === undefined) {
                    return this.articles.slice(0, this.getLength());
                } else if (rightLimit === undefined) {
                    return this.articles.slice(leftLimit, this.getLength());
                } else {
                    return this.articles.slice(leftLimit, rightLimit);
                }
            },
            loadArticle: function (name) {
                var foundArticle = false;
                for (let article of this.articles) {
                    if (article.name == name) {
                        foundArticle = article;
                        break;
                    }
                }
                return app.utils.API.article(name)
                          .then(article => {
                              if (!foundArticle) {
                                  foundArticle = {};
                              }
                              foundArticle.content = article;
                              return foundArticle;
                          });
            },
            processArticle: function (markdownText) {
                return markdown.toHTML(markdownText);
            },
            loadAndProcess: function (name) {
                return this.loadArticle(name)
                            .then(article => {
                                article.content = this.processArticle(article.content);
                                return article;
                            });
            }
        });

})(window.app || (window.app = {}));
