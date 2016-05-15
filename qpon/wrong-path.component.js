(function(app) {
    /* global ng */
    app.WrongPathComponent = ng.core
        .Component({
            selector: 'qpon-wrong-path',
            templateUrl: "qpon/templates/wrong-path.component.html"
        })
        .Class({
            constructor:
                function WrongPathComponentConstructor() {}
        });

})(window.app || (window.app = {}));
