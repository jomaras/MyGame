var GameObjectManager = Class.extend({
    init: function()
    {
       this.gameObjects = [];
       this.lastFrame = new Date().getTime();
       this.xScroll = 0;
       this.yScroll = 0;
       this.canvas = null;
       this.context2D = null;
       this.backBuffer = null;
       this.backBufferContext2D = null;

       g_GameObjectManager = this;

       // watch for keyboard events
       document.onkeydown = function(event){ g_GameObjectManager.keyDown(event);}
       document.onkeyup = function(event){ g_GameObjectManager.keyUp(event);}

       // get references to the canvas elements and their 2D contexts
       this.canvas = document.getElementById('canvas');

       if(!this.canvas.getContext) { alert("Canvas is not supported!"); return; }

       this.context2D = this.canvas.getContext('2d');
       this.backBuffer = document.createElement('canvas');
       this.backBuffer.width = this.canvas.width;
       this.backBuffer.height = this.canvas.height;
       this.backBufferContext2D = this.backBuffer.getContext('2d');

       // create a new ResourceManager
       this.resourceManager = new ResourceManager
       ([
           {name: 'runLeft', src: 'images/run_left.png'},
           {name: 'runRight', src: 'images/run_right.png'},
           {name: 'idleLeft', src: 'images/idle_left.png'},
           {name: 'idleRight', src: 'images/idle_right.png'},
           {name: 'background0', src: 'images/jsplatformer4_b0.png'},
           {name: 'background1', src: 'images/jsplatformer4_b1.png'},
           {name: 'background2', src: 'images/jsplatformer4_b2.png'},
           {name: 'block', src: 'images/BlockA0.png'},
           {name: 'gem', src: 'images/Gem.png'}
       ]);

       this.resourceManager.loadResources(function()
       {
           this.createGameObjects();
           setInterval(function(){ g_GameObjectManager.draw(); }, SECONDS_BETWEEN_FRAMES);
       }, this);
    },

    createGameObjects: function()
    {
        this.level = new Level(this.canvas.width, this.canvas.height, this.resourceManager);
        this.gameObjects.push(this.level);
        ValueTypeHelper.pushAll(this.gameObjects, this.level.getGameObjects());

        this.gameObjects.push(new RepeatingGameObject(this.resourceManager.getResource("background2"), 0, 100, 3, 600, 320, 0.75));
        this.gameObjects.push(new RepeatingGameObject(this.resourceManager.getResource("background1"), 0, 100, 2, 600, 320, 0.5));
        this.gameObjects.push(new RepeatingGameObject(this.resourceManager.getResource("background0"), 0, 0, 1, 600, 320, 0.25));

        this.player = new Player(this.level, this.resourceManager);
        this.gameObjects.push(this.player);

        this.gameObjects.sort(function(a, b) { return a.zOrder - b.zOrder; })
    },

    draw: function ()
    {
        // calculate the time since the last frame
        var thisFrame = new Date().getTime();
        var dt = (thisFrame - this.lastFrame)/1000;
        this.lastFrame = thisFrame;

        // clear the drawing contexts
        this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var gameObjects = this.gameObjects;

        for(var i = 0, length = gameObjects.length; i < length; i++)
        {
            var gameObject = gameObjects[i];

            if(gameObject && gameObject.update)
            {
                gameObject.update(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
            }
        }

        for(var i = 0, length = gameObjects.length; i < length; i++)
        {
            var gameObject = gameObjects[i];

            if(gameObject && gameObject.draw)
            {
                gameObject.draw(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
            }
        }

        this.context2D.drawImage(this.backBuffer, 0, 0);
    },

    addGameObject: function(gameObject)
    {
        this.gameObjects.push(gameObject);
        this.gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;})
    },

    removeGameObject: function(gameObject)
    {
        this.gameObjects.removeObject(gameObject);
    },

    keyDown: function(event)
    {
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].keyDown)
            {
                this.gameObjects[x].keyDown(event);
            }
        }
    },

    keyUp: function(event)
    {
        for (x in this.gameObjects)
        {
            if (this.gameObjects[x].keyUp)
            {
                this.gameObjects[x].keyUp(event);
            }
        }
    }
});