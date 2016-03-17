(function(app) {
  /* global ng */

  app.HeroService = 
    ng.core.Class({
      constructor : function() {},
      getHeroes : function() {
        return Promise.resolve(app.HEROES);
      },
      getHeroesSlowly : function() {
        return new Promise(resolve =>
          setTimeout(() => resolve(app.HEROES), 2000) // 2 seconds
        );
      },
      getHero : function(id) {
        return Promise.resolve(app.HEROES)
          .then(heroes => heroes.filter(hero => hero.id === id)[0]);
      }
    });
  
})(window.app || (window.app = {}));