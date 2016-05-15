(function(app) {
    /* global ng */
    app.TagsComponent = ng.core
        .Component({
            selector: 'qpon-tags',
            templateUrl: "qpon/templates/tags.component.html"
        })
        .Class({
            constructor:
                function TagsComponentConstructor() {
                    this.tags = [
                      'javascript',
                      'Angular2',
                      'C++'
                    ];
                    this.selectedTags = [];
                    this.isExpanded = true;
                },
            ngAfterViewInit: function () {
                app.utils.MDL.upgradeClasses(["mdl-js-button"]);
            },
            changeIsExpanded: function () {
                this.isExpanded = !this.isExpanded;
            },
            changeSelection: function (tag) {
                var st = this.selectedTags;
                if (st.includes(tag)) {
                    st.splice(st.findIndex(s => s == tag), 1);
                } else {
                    st.push(tag);
                };
            }
        });

})(window.app || (window.app = {}));
