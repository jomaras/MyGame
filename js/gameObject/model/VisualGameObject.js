Ostro.GameObject.Model.VisualGameObject = Ostro.GameObject.Model.GameObject.extend
({
    init: function(image, x, y, z)
    {
        this._super(x, y, z);

        this.image = image;
        this.hidden = false;
    },

    draw: function(deltaTime, context, xScroll, yScroll)
    {
        if(this.hidden) { return; }

        context.drawImage(this.image, this.x - xScroll, this.y - yScroll);
    },

    collisionArea: function()
    {
        return new Ostro.Geometry.Rectangle(this.x, this.y, this.image.width, this.image.height);
    },

    isPointWithin: function(xPoint, yPoint)
    {
        return xPoint >= this.x && xPoint <= (this.x + this.image.width)
            && yPoint >= this.y && yPoint <= (this.y + this.image.height);
    }
});