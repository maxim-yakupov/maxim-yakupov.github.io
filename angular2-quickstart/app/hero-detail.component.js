(function(app) {
  /* global ng */
  
  app.HeroDetailComponent =
    ng.core.Component({
      "selector" : 'my-hero-detail',
      "templateUrl" : "app/hero-detail.component.html",
      "inputs" : ['hero']
    })
    .Class({
        constructor : function() {}
    });
})(window.app || (window.app = {}));