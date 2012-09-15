var GameObject = Class.extend
({
    init: function(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.zOrder = z;

        g_GameObjectManager.addGameObject(this);
    },
    shutDown: function()
    {
        g_GameObjectManager.removeGameObject(this);
    }
});

