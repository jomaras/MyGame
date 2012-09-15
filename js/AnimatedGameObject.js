
var AnimatedGameObject = VisualGameObject.extend({
    init: function(image, x, y, z, frameCount, fps)
    {
        if (frameCount <= 0) { alert("Frame count can not be null!")};
        if (fps <= 0) { alert("fps can not be null"); }

        this._super(image, x, y, z);
        this.currentFrame = 0;
        this.frameCount = frameCount;
        this.timeBetweenFrames = 1/fps;
        this.timeSinceLastFrame = this.timeBetweenFrames;
        this.frameWidth = this.image.width / this.frameCount;
    },

    setAnimation: function(image, frameCount, fps)
    {
        if (frameCount <= 0) throw "framecount can not be <= 0";
        if (fps <= 0) throw "fps can not be <= 0"

        this.image = image;
        this.currentFrame = 0;
        this.frameCount = frameCount;
        this.timeBetweenFrames = 1/fps;
        this.timeSinceLastFrame = this.timeBetweenFrames;
        this.frameWidth = this.image.width / this.frameCount;
    },

    draw: function(deltaTime, context, xScroll, yScroll)
    {
        var sourceX = this.frameWidth * this.currentFrame;
        context.drawImage(this.image, sourceX, 0, this.frameWidth, this.image.height, this.x - xScroll, this.y - yScroll, this.frameWidth, this.image.height);

        this.timeSinceLastFrame -= deltaTime;

        if (this.timeSinceLastFrame <= 0)
        {
            this.timeSinceLastFrame = this.timeBetweenFrames;
            this.currentFrame++;
            this.currentFrame %= this.frameCount;
        }
     },

     collisionArea: function()
     {
        return new Rectangle(this.x, this.y, this.frameWidth, this.image.height);
     }
});