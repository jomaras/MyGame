Ostro.Geometry.Rectangle = Ostro.OO.Class.extend({

    init: function(left, top, width, height)
    {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    },

    intersects: function(other)
    {
        if (this.left + this.width < other.left) { return false; }
        if (this.top + this.height < other.top) { return false; }
        if (this.left > other.left + other.width) { return false; }
        if (this.top > other.top + other.height) { return false; }

        return true;
    }
});
