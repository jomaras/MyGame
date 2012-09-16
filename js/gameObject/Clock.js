Ostro.GameObject.Clock = Ostro.GameObject.Model.GameObject.extend({
    init: function(x, y, z)
    {
        this._super(x, y, z);

        this.totalTime = 0;
        this.angleInDegrees = 0;

        this.degreesPerSecond = 6;

        this.circle = new Ostro.Geometry.Circle(x, y, 40);
    },

    update: function (dt, context, xScroll, yScroll)
    {
       //this.totalTime += dt;
    },

    draw: function(deltaTime, context)
    {
        Ostro.Helpers.CanvasDrawerHelper.drawCircle(context, this.circle, "white");
        this.drawSeconds(context);
    },

    drawSeconds: function(context)
    {
        Ostro.Helpers.CanvasDrawerHelper.drawRadialLineAtAngle(context, this.x, this.y, this._getAngleInRadians(this.totalTime), 30);
    },

    isPointWithin: function(x, y)
    {
        return this.circle.isPointWithin(x, y);
    },

    onMouseDrag: function(pointX, pointY)
    {
        this.totalTime = this._getAngleInSeconds(pointX, pointY);
    },

    _getAngleInRadians: function(totalSeconds)
    {
        return (90 - ((totalSeconds % 60)*this.degreesPerSecond)) * Math.PI/180;
    },

    _getAngleInSeconds: function(deltaX, deltaY)
    {
        var oldAngleInDegrees = this.angleInDegrees;

        this.angleInDegrees = 90 + Math.atan((deltaY - this.y)/(deltaX - this.x)) * 180 / Math.PI;

        if(deltaX < this.x)
        {
            this.angleInDegrees += 180;
        }

        var seconds = this.angleInDegrees / this.degreesPerSecond;

        this.changeInDegrees = oldAngleInDegrees - this.angleInDegrees;

        return seconds;
    }
});