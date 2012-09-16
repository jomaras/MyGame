Ostro.GameObject.Model.Character = Ostro.GameObject.Model.AnimatedGameObject.extend({
    init: function(level, gameManager, configMap)
    {
        this.gameManager = gameManager;
        this.resourceManager = gameManager.resourceManager;
        this.configMap = configMap;

        this.level = level;

        this.idleLeft = configMap.idleLeft.image
        this.idleRight = configMap.idleRight.image;
        this.runLeft = configMap.runLeft.image;
        this.runRight = configMap.runRight.image;

        this._super(this.idleRight, configMap.x, configMap.y, configMap.z, configMap.idleRight.frameCount, 20);

        this.level = level;
        this.jumpHeight = configMap.jumpHeight || 64;
        this.halfPI = Math.PI / 2;
        this.jumpHangTime = configMap.jumpHangTime || 0.35;
        this.jumpSinWaveSpeed = this.halfPI / this.jumpHangTime;
        this.jumpSinWavePos = 0;
        this.fallMultiplyer = configMap.fallMultiplyer || 1.5;
        this.grounded = true;
        this.speed = configMap.speed || 95;
        this.left = false;
        this.right = false;
        this.screenBorder = 20;

        this.defaultDelta = 0.010;

        if(!configMap.isPlayerCharacter)
        {
            this.keyDown = null;
            this.keyUp = null;
        }
    },

    isGoLeftKey: function(keyCode)
    {
        return Ostro.Helpers.KeyboardHelper.isLeft(keyCode) || Ostro.Helpers.KeyboardHelper.isA(keyCode);
    },

    isGoRightKey: function(keyCode)
    {
        return Ostro.Helpers.KeyboardHelper.isRight(keyCode) || Ostro.Helpers.KeyboardHelper.isD(keyCode);
    },

    isJumpKey: function(keyCode)
    {
        return Ostro.Helpers.KeyboardHelper.isSpace(keyCode)
            || Ostro.Helpers.KeyboardHelper.isUp(keyCode)
            || Ostro.Helpers.KeyboardHelper.isW(keyCode);
    },

    keyDown: function(event)
    {
        var updateRequired = false;

        if (this.isGoLeftKey(event.keyCode) && !this.left)
        {
            this.left = true;
            updateRequired = true;
        }
        if (this.isGoRightKey(event.keyCode) && !this.right)
        {
            this.right = true;
            updateRequired = true;
        }
        if (this.isJumpKey(event.keyCode) && this.grounded)
        {
            this.grounded = false;
            this.jumpSinWavePos = 0;
        }

        if (updateRequired)
        {
            this.updateAnimation();
        }
    },

    keyUp: function(event)
    {
        if (this.isGoLeftKey(event.keyCode))
        {
            this.left = false;
            this.setAnimation(this.idleLeft, this.configMap.idleLeft.frameCount, 20);
        }
        if (this.isGoRightKey(event.keyCode))
        {
            this.right = false;
            this.setAnimation(this.idleRight, this.configMap.idleRight.frameCount, 20);
        }

        this.updateAnimation();
    },

    goLeft: function()
    {
        var updateRequired = false;

        this.right = false;

        if(!this.left) { updateRequired = true; }

        this.left = true;

        if(updateRequired)
        {
            this.updateAnimation();
        }
    },

    goRight: function()
    {
        var updateRequired = false;

        this.left = false;

        if(!this.right) { updateRequired = true; }

        this.right = true;

        if(updateRequired)
        {
            this.updateAnimation();
        }
    },

    updateAnimation: function()
    {
        if (this.right && this.left)
        {
            this.setAnimation(this.idleLeft, this.configMap.idleLeft.frameCount, 20);
        }
        else if (this.right)
        {
            this.setAnimation(this.runRight, this.configMap.runRight.frameCount, 20);
        }
        else if (this.left)
        {
            this.setAnimation(this.runLeft, this.configMap.runLeft.frameCount, 20);
        }
    },

    update: function (dt, context, xScroll, yScroll)
    {
        if (this.left) { this.x -= this.speed * dt; }
        if (this.right) { this.x += this.speed * dt;}

        // only test for a collision if the player is moving left or right
        // (and not trying to do both at the same time)
        if ((this.right || this.left) && !(this.left && this.right))
        {
            // this will be true until the player is no longer colliding
            var collision = false;
            // the player may have to be pushed back through several block stacks (especially if the
            // frame rate is very slow)
            do
            {
                // the current position of the player (test the left side if running left and the right side if running right)
                var xPos = this.left ? this.x : this.x + this.frameWidth;
                // the index of stack of blocks that the player is standing on/in
                var currentBlock = this.level.currentBlock(xPos);
                // the height of the stack of blocks that the player is standing on/in
                var groundHeight = this.level.groundHeight(currentBlock);
                // the height of the player (we need the height from the ground up,
                // whereas the this.y value represents the position of the player
                // from the "sky" down).
                var playerHeight = context.canvas.height - (this.y + this.image.height);
                // if the player is not higher than the stack of blocks, it must be colliding
                if (playerHeight  < groundHeight)
                {
                    collision = true;

                    // push to the other side
                    this.x = this.right ? this.level.blockWidth * currentBlock - this.frameWidth - 1
                        : this.level.blockWidth * (currentBlock + 1);
                }
                else
                {
                    collision = false;
                }
            } while (collision)
        }

        // keep the player bound to the level
        if (this.x > this.level.blocks.length * this.level.blockWidth - this.frameWidth - 1)
        {
            this.x = this.level.blocks.length * this.level.blockWidth - this.frameWidth - 1;
        }

        //Uncomment for camera to follow
        /*var xScroll = this.x - (context.canvas.width/2) - this.screenBorder;

         if(xScroll < 0) { xScroll = 0; }

         this.gameObjectManager.xScroll = xScroll;*/


        if (this.x < 0)
        {
            this.x = 0;
        }

        // if the player is jumping or falling, move along the sine wave
        if (!this.grounded)
        {
            // the last position on the sine wave
            var lastHeight = this.jumpSinWavePos;
            // the new position on the sine wave
            this.jumpSinWavePos += this.jumpSinWaveSpeed * dt;

            // we have fallen off the bottom of the sine wave, so continue falling
            // at a predetermined speed
            if (this.jumpSinWavePos >= Math.PI)
            {
                this.y += this.jumpHeight / this.jumpHangTime * this.fallMultiplyer * dt;
            }
            else
            {
                this.y -= (Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
            }
        }

        // now that the player has had it's y position changed we need to check for a collision
        // with the ground below the player. we have to check both the players left and right sides
        // for a collision with the ground

        // left side
        var currentBlock1 = this.level.currentBlock(this.x);
        // right side
        var currentBlock2 = this.level.currentBlock(this.x + this.frameWidth);
        // ground height below the left side
        var groundHeight1 = this.level.groundHeight(currentBlock1);
        // ground height below the right side
        var groundHeight2 = this.level.groundHeight(currentBlock2);
        // the heighest point under the player
        var maxGroundHeight = groundHeight1 > groundHeight2 ? groundHeight1 : groundHeight2;
        // the players height (relaitive to the bottom of the screen)
        var playerHeight = context.canvas.height - (this.y + this.image.height);

        // we have hit the ground
        if (maxGroundHeight >= playerHeight)
        {
            this.y = context.canvas.height - maxGroundHeight - this.image.height;
            this.grounded = true;
            this.jumpSinWavePos = 0;
        }
        // otherwise we are falling
        else if (this.grounded)
        {
            this.grounded = false;
            // starting falling down the sine wave (i.e. from the top)
            this.jumpSinWavePos = this.halfPI;
        }
    }
});
