Ostro.GameObject.Model.GameObject = Ostro.OO.Class.extend
({
    init: function(x, y, z)
    {
        this.id = Ostro.GameObject.Model.GameObject._LAST_ID++;
        this.x = x;
        this.y = y;
        this.zOrder = z;
    }
});

Ostro.GameObject.Model.GameObject._LAST_ID = 0;

