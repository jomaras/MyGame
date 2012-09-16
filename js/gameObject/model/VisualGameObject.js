Ostro.GameObject.Model.VisualGameObject = Ostro.GameObject.Model.GameObject.extend
({
    init: function(image, x, y, z)
    {
        this._super(x, y, z);

        this.image = image;
    },

    draw: function(deltaTime, context, xScroll, yScroll)
    {
        context.drawImage(this.image, this.x - xScroll, this.y - yScroll);
    },

    collisionArea: function()
    {
        return new Ostro.Geometry.Rectangle(this.x, this.y, this.image.width, this.image.height);
    }
});