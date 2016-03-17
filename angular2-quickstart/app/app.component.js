(function(app) {
  /* global ng */
  
  app.AppComponent =
    ng.core.Component({
      "selector" : 'my-app',
      "templateUrl" : "app/templates/app.component.html",
      "styleUrls" : ["app/css/app.component.css"],
      "directives" : [
          ng.router.ROUTER_DIRECTIVES,
        ],
      "providers" : [ng.router.ROUTER_PROVIDERS, app.HeroService]
    })
    .Class({
        constructor : function() {
            this.title = "Tour of Heroes";
        }
    });
    
  ng.router.RouteConfig([
    {
      path : '/heroes',
      name : 'Heroes',
      component : app.HeroesComponent,
      useAsDefault : false
    },
    {
      path : '/dashboard',
      name : 'Dashboard',
      component : app.DashboardComponent,
      useAsDefault : false
    },
    {
      path : '/detail/:id',
      name : 'HeroDetail',
      component : app.HeroDetailComponent
    }
  ])(app.AppComponent);
})(window.app || (window.app = {}));