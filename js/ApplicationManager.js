var ApplicationManager = Class.extend({
   init: function(canvasWidth, canvasHeight)
   {
       g_ApplicationManager = this;

       this.level = new Level(canvasWidth, canvasHeight);
       this.background3 = new RepeatingGameObject(g_ResourceManager.background2, 0, 100, 3, 600, 320, 0.75);
       this.background2 = new RepeatingGameObject(g_ResourceManager.background1, 0, 100, 2, 600, 320, 0.5);
       this.background = new RepeatingGameObject(g_ResourceManager.background0, 0, 0, 1, 600, 320, 0.25);
       g_player = new Player(this.level);
   }
});