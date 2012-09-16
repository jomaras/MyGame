Ostro.GameObject.Mummy = Ostro.GameObject.Model.Character.extend({
    init: function(level, gameManager)
    {
        this._super(level, gameManager,
        {
            idleLeft: { image: gameManager.resourceManager.getResource("mummy_idle_left"), frameCount : 6 },
            idleRight: { image: gameManager.resourceManager.getResource("mummy_idle_right"), frameCount : 6 },
            runLeft: { image: gameManager.resourceManager.getResource("mummy_walk_left"), frameCount : 12 },
            runRight: { image: gameManager.resourceManager.getResource("mummy_walk_right"), frameCount : 12 },
            x: 380,
            y: 400 - 48 - 48,
            z: 4
        });

        this.leftBoundX = 380;
        this.rightBoundX = 600;
    },

    update: function()
    {
        this.__super.update.apply(this, arguments);

        if(this.x <= this.leftBoundX)
        {
            this.goRight();
        }

        if(this.x >= this.rightBoundX)
        {
            this.goLeft();
        }
    }
});