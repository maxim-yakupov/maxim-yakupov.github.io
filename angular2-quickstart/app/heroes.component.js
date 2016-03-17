(function(app) {
  /* global ng */
  
  app.HeroesComponent =
    ng.core.Component({
      "selector" : 'my-heroes',
      "templateUrl" : "app/templates/heroes.component.html",
      "styleUrls" : ["app/css/heroes.component.css"],
      "directives" : [app.HeroDetailComponent],
    })
    .Class({
      constructor : [ng.router.Router, app.HeroService, function(router, heroService) {
        this._router = router;
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
      },
      gotoDetail : function() {
       let link = ['HeroDetail', { "id" : this.selectedHero.id }];
       this._router.navigate(link);
      }
    });
})(window.app || (window.app = {}));
