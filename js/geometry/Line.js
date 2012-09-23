Ostro.Geometry.Line = Ostro.OO.Class.extend({
    init: function(a, b)
    {
        this.a = a;
        this.b = b;
    },

    isOnLine: function(x, y)
    {
        if(Number.isNaN(this.a) && Number.isNaN(this.b))
        {
            return this.x == x;
        }

        return Ostro.Helpers.ValueTypeHelper.areEqualToPrecision(this.a * x + this.b, y, 0.01);
    },

    getPointOnLineFromX: function(x)
    {
        if(Number.isNaN(this.a) && Number.isNaN(this.b))
        {
            return {x: x, y: Number.NaN};
        }

        return {x: x, y: this.a * x + this.b }
    },

    getPointOnLineFromY: function(y)
    {
        if(Number.isNaN(this.a) && Number.isNaN(this.b))
        {
            return {x: this.x, y: y};
        }

        if(this.a == 0)
        {
            return {x: Number.NaN, y: y};
        }

        return {x: (y - this.b)/this.a, y:y };
    }
});

Ostro.Geometry.Line.createFromTwoPoints = function(x1, y1, x2, y2)
{
    var deltaX = x1 - x2;
    var deltaY = y1 - y2;

    if(deltaX == 0)
    {
        var line = new Ostro.Geometry.Line(Number.NaN, Number.NaN);
        line.x = x1;

        return line;
    }

    var a = deltaY/deltaX;

    return new Ostro.Geometry.Line(a, a * x1 + y1);
};
