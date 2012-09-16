Ostro.Geometry.Circle = Ostro.OO.Class.extend({
    init: function(x, y, radius)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
    },

    intersects: function(other)
    {
        alert("Not yet implemented");
        return true;
    },

    isPointWithin: function(x, y)
    {
        var deltaX = x - this.x;
        var deltaY = y - this.y;

        return (deltaX * deltaX + deltaY * deltaY) <= this.radius * this.radius;
    }
});
