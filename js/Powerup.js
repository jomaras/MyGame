var Powerup = AnimatedGameObject.extend({
    init: function(value, image, x, y, z, frameCount, fps)
    {
       this._super(image, x, y, z, frameCount, fps);
       this.value = value;

       this.sineWavePos = 0;
       this.bounceTime = 1;
       this.bounceSpeed = Math.PI / this.bounceTime;
       this.bounceHeight = 5;
    },

    update: function (dt, context, xScroll, yScroll)
    {
        var lastSineWavePos = this.sineWavePos;
        this.sineWavePos += this.bounceSpeed * dt;
        this.y += (Math.sin(this.sineWavePos) - Math.sin(lastSineWavePos)) * this.bounceHeight;

        /*if (this.collisionArea().intersects(g_player.collisionArea()))
        {
            alert("Shut down powerup");
        }*/
    }
});