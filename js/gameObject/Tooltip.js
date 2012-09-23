Ostro.GameObject.Tooltip = Ostro.GameObject.Model.VisualGameObject.extend({
    init: function(images, x, y, z)
    {
        this.selectedIndex = 0;
        this.images = images;
        this._super(this.images[this.selectedIndex], x, y, z);
        this.hidden = true;
    },

    goLeft: function()
    {
        this.selectedIndex--;

        if(this.selectedIndex < 0) { this.selectedIndex = this.images.length - 1; }

        this.image = this.images[this.selectedIndex];
    },

    goRight: function()
    {
        this.selectedIndex++;

        if(this.selectedIndex >= this.images.length) { this.selectedIndex = 0; }

        this.image = this.images[this.selectedIndex];
    },

    update: function(x, y)
    {
        this.x = x;
        this.y = y;
    }
});