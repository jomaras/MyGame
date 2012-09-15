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
       this.canvasSupported = false;
       this.resourcesLoaded = false;
       this.loadingScreenCol = 0;
       this.loadingScreenColDirection = 1;
       this.loadingScreenColSpeed = 255;

       g_GameObjectManager = this;

       // watch for keyboard events
       document.onkeydown = function(event){ g_GameObjectManager.keyDown(event);}
       document.onkeyup = function(event){ g_GameObjectManager.keyUp(event);}

       // get references to the canvas elements and their 2D contexts
       this.canvas = document.getElementById('canvas');

       if (this.canvas.getContext)
       {
           this.canvasSupported = true;
           this.context2D = this.canvas.getContext('2d');
           this.backBuffer = document.createElement('canvas');
           this.backBuffer.width = this.canvas.width;
           this.backBuffer.height = this.canvas.height;
           this.backBufferContext2D = this.backBuffer.getContext('2d');
       }

       // create a new ResourceManager
       new ResourceManager(
           [{name: 'runLeft', src: 'images/run_left.png'},
               {name: 'runRight', src: 'images/run_right.png'},
               {name: 'idleLeft', src: 'images/idle_left.png'},
               {name: 'idleRight', src: 'images/idle_right.png'},
               {name: 'background0', src: 'images/jsplatformer4_b0.png'},
               {name: 'background1', src: 'images/jsplatformer4_b1.png'},
               {name: 'background2', src: 'images/jsplatformer4_b2.png'},
               {name: 'block', src: 'images/BlockA0.png'},
               {name: 'gem', src: 'images/Gem.png'}]);

       // use setInterval to call the draw function
       setInterval(function(){g_GameObjectManager.draw();}, SECONDS_BETWEEN_FRAMES);
    },

    draw: function ()
    {
        // calculate the time since the last frame
        var thisFrame = new Date().getTime();
        var dt = (thisFrame - this.lastFrame)/1000;
        this.lastFrame = thisFrame;

        if (!this.resourcesLoaded)
        {
            var numLoaded = 0;
            for (i = 0; i < g_ResourceManager.imageProperties.length; ++i)
            {
                if (g_ResourceManager[g_ResourceManager.imageProperties[i]].complete)
                    ++numLoaded;
            }

            if ( numLoaded == g_ResourceManager.imageProperties.length )
            {
                // create a new ApplicationManager
                new ApplicationManager(this.canvas.width, this.canvas.height);
                this.resourcesLoaded = true;
            }
            else
            {
                this.loadingScreenCol += this.loadingScreenColDirection * this.loadingScreenColSpeed * dt;
                if (this.loadingScreenCol > 255)
                {
                    this.loadingScreenCol = 255;
                    this.loadingScreenColDirection = -1;
                }
                else if (this.loadingScreenCol < 0)
                {
                    this.loadingScreenCol = 0;
                    this.loadingScreenColDirection = 1;
                }
                this.context2D.fillStyle = "rgb(" + parseInt(this.loadingScreenCol) + "," + parseInt(this.loadingScreenCol) + "," + parseInt(this.loadingScreenCol) + ")";
                this.context2D.fillRect (0, 0, this.canvas.width, this.canvas.height);
            }
        }

        // clear the drawing contexts
        if (this.canvasSupported && this.resourcesLoaded)
        {
            this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
            this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // first update all the game objects
            for (x in this.gameObjects)
            {
                if (this.gameObjects[x] && this.gameObjects[x].update)
                {
                    this.gameObjects[x].update(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
                }
            }

            // then draw the game objects
            for (x in this.gameObjects)
            {
                if (this.gameObjects[x].draw)
                {
                    this.gameObjects[x].draw(dt, this.backBufferContext2D, this.xScroll, this.yScroll);
                }
            }

            // copy the back buffer to the displayed canvas
            this.context2D.drawImage(this.backBuffer, 0, 0);
        }
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