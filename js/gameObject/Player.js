Ostro.GameObject.Player = Ostro.GameObject.Model.Character.extend({
   init: function(level, gameManager)
   {
       this._super(level, gameManager,
       {
           idleLeft: { image: gameManager.resourceManager.getResource("player_idle_left"), frameCount : 6 },
           idleRight: { image: gameManager.resourceManager.getResource("player_idle_right"), frameCount : 6 },
           runLeft: { image: gameManager.resourceManager.getResource("player_run_left"), frameCount : 12 },
           runRight: { image: gameManager.resourceManager.getResource("player_run_right"), frameCount : 12 },
           x: 20,
           y: 400 - 48,
           z: 4,
           isPlayerCharacter: true
       });
   }
});