(function(app) {
  /* global ng */
  
  app.AppComponent =
    ng.core.Component({
      "selector" : 'my-app',
      "templateUrl" : "app/app.component.html",
      "styleUrls" : ["app/app.component.css"],
      "directives" : [app.HeroDetailComponent],
      "providers" : [app.HeroService]
    })
    .Class({
      constructor : [app.HeroService, function(heroService) {
      	this._heroService = heroService;
      	this.title = 'Tour of Heroes';
      	this.selectedHero = null;
      	this.heroes = null;
      }],
      ngOnInit : function() {
        this.getHeroes();
      },
      getHeroes : function() {
        this._heroService.getHeroes()
          .then(heroes => this.heroes = heroes);
      },
      onSelect : function(hero) {
        this.selectedHero = hero;
      }
    });
})(window.app || (window.app = {}));
