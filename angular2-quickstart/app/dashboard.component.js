(function(app) {
  /* global ng */
  
  app.DashboardComponent =
    ng.core.Component({
      "selector" : 'my-dashboard',
      "templateUrl" : "app/templates/dashboard.component.html",
      "styleUrls" : ["app/css/dashboard.component.css"]
    })
    .Class({
        constructor : [
            ng.router.Router,
            app.HeroService,
            function(router, heroService) {
                this._router = router;
                this._heroService = heroService;
                this.heroes = null;
                this.selectedHero = null;
            }
        ],
        ngOnInit : function() {
            this._heroService.getHeroes()
                .then(heroes => this.heroes = heroes.slice(1, 5));
        },
        gotoDetail : function(hero) {
            let link = ['HeroDetail', { "id" : hero.id }];
            this._router.navigate(link);
        }
    });
})(window.app || (window.app = {}));