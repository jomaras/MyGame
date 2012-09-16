Ostro.GameObject.Powerup = Ostro.GameObject.Model.AnimatedGameObject.extend({
    init: function(image, x, y, z, frameCount, fps)
    {
        this.sineWavePos = 0;
        this.bounceTime = 1;
        this.bounceSpeed = Math.PI / this.bounceTime;
        this.bounceHeight = 10;

        this._super(image, x, y - this.bounceHeight, z, frameCount, fps);
    },

    update: function (dt, context, xScroll, yScroll)
    {
        var lastSineWavePos = this.sineWavePos;
        this.sineWavePos += this.bounceSpeed * dt;
        this.y += (Math.sin(this.sineWavePos) - Math.sin(lastSineWavePos)) * this.bounceHeight;
    }
});