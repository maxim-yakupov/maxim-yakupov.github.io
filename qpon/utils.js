(function(app) {
    app.utils = {};

    app.utils.logger = function (name) {
        return {
            _name: name,
            _level: 0,
            log: function (msg) {
                if (this._level > 0) return;
                window.console.log(new Date().toLocaleTimeString() +
                    "] " + this._name + ">> " + msg);
            },
            dir: function (obj) {
                if (this._level > 1) return;
                this.log("dir-begin--------\\");
                window.console.dir(obj);
                this.log("dir--end---------/");
            },
            error: function (msg, e) {
                if (this._level > 3) return;
                window.console.error(new Date().toLocaleTimeString() +
                    "] " + this._name + ">> " + msg);
                window.console.error(e);
            },
            setLevel: function (level) {
                this._level = level;
            }
        };
    };

    var l = app.utils.logger('utils');

    app.utils.ajax = function (
                                  method,
                                  domen,
                                  path,
                                  body,
                                  headers,
                                  successChecker,
                                  callbackSuccess,
                                  callbackError
                              ) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onload = xhr.onerror = function (event) {
                if (successChecker(xhr)) {
                    callbackSuccess(xhr);
                    resolve(xhr);
                } else {
                    callbackError(xhr);
                    reject("error " + xhr.status);
                }
            };
            xhr.open(method, domen + path, true);
            if (headers) {
                for (header of headers) {
                    xhr.setRequestHeader(header.name, header.data);
                }
            }
            xhr.send(body);
        });
    };

    app.utils.github = {};
    app.utils.github.contents = function (owner, repo, path) {
        return app.utils.ajax(
            'GET',
            'http://api.github.com/',
            'repos/' + owner + '/' + repo + '/contents/' + path,
            null,
            [],
            xhr => xhr.status == 200,
            xhr => {
                l.log('api.github:contents - success');
                l.dir(xhr);
            },
            xhr => l.log('api.github:contents - fail: error ' + JSON.parse(xhr.responseText).message)
        );
    };

    app.utils.github.file = function (owner, repo, path) {
        return app.utils.github.contents(owner, repo, path)
        .then(
            xhr => atob(JSON.parse(xhr.responseText).content)
        );
    };

    app.utils.API = {};
    app.utils.API.article = function (article) {
        // return app.utils.github.file(
        //     'maxim-yakupov',
        //     'maxim-yakupov.github.io',
        //     'articles/' + article + '.html'
        // );
        return app.utils.ajax(
            'GET',
            '/',
            'articles/' + article + '.txt',
            null,
            [],
            xhr => xhr.status == 200,
            xhr => {
                l.log('api:article - success');
                l.dir(xhr);
            },
            xhr => l.log('api:article - fail: error ' + xhr.responseText)
        ).then(
            xhr => xhr.responseText
        );
    };

    app.utils.API.articles = function () {
        // return app.utils.github.contents(
        //     'maxim-yakupov',
        //     'maxim-yakupov.github.io',
        //     'articles/'
        // ).then(xhr => {
        //     var data = JSON.parse(xhr.responseText);
        //     var articles = [];
        //     for (var item of data) {
        //         articles.push(item.name);
        //     }
        //     return articles;
        // });
        return app.utils.ajax(
            'GET',
            '/',
            'articles/articles.json',
            null,
            [],
            xhr => xhr.status == 200,
            xhr => {
                l.log('api:articles - success');
                l.dir(xhr);
            },
            xhr => l.log('api:articles - fail: error ' + xhr.responseText)
        ).then(
            xhr => JSON.parse(xhr.responseText)
        );
    };

    app.utils.MDL = {};

    app.utils.MDL.upgradeClasses = function (classes) {
        var els = [];
        classes.forEach(
            (c) => [].forEach.call(document.getElementsByClassName(c), (e) => els.push(e))
        );
        componentHandler.upgradeElements(els);
    };
})(window.app || (window.app = {}));
