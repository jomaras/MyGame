Ostro.GameObject.Level = Ostro.OO.Class.extend({
   init: function(canvasWidth, canvasHeight, resourceManager)
   {
       this.resourceManager = resourceManager;
       this.canvasWidth = canvasWidth;
       this.canvasHeight = canvasHeight;

       this.blocks = [];
       this.powerups = {};
       this.powerupItems = [];
       this.blockPoints = [];
       this.blockItems = [];
       this.blockWidth = 64;
       this.blockHeight = 48;

       this.blocks[0] = 1;
       this.blocks[1] = 1;
       this.blocks[2] = 1;
       this.blocks[3] = 1;
       this.blocks[4] = 1;
       this.blocks[5] = 1;
       this.blocks[6] = 2;
       this.blocks[7] = 2;
       this.blocks[8] = 2;
       this.blocks[9] = 2;
       this.blocks[10] = 3;
       this.blocks[11] = 3;
       this.blocks[12] = 4;
       this.blocks[13] = 5;
       this.blocks[14] = 4;
       this.blocks[15] = 4;
       this.blocks[16] = 4;

       this.powerups[15] = 'Gem';

       this.addBlocks(canvasWidth, canvasHeight);
       this.addPowerups(canvasWidth, canvasHeight);
   },

   getGameObjects: function()
   {
       return this.blockItems.concat(this.powerupItems);
   },

   addBlocks: function(canvasWidth, canvasHeight)
   {
        for (var x = 0; x < this.blocks.length; ++x)
        {
            var blockX = 0, blockY = 0;

            for (var y = 0; y < this.blocks[x]; ++y)
            {
                blockX = x * this.blockWidth;
                blockY = canvasHeight - (y + 1) * this.blockHeight;

                this.blockItems.push(new Ostro.GameObject.Model.VisualGameObject(this.resourceManager.getResource("block"), blockX, blockY, 4));
            }

            this.blockPoints.push({x: blockX, y: blockY});
        }
   },

   addPowerups: function(canvasWidth, canvasHeight)
   {
       var gemImage = this.resourceManager.getResource("gem");
       for (var x = 0; x < this.blocks.length; ++x)
       {
           if (this.powerups[x])
           {
               var xPosition = x * this.blockWidth + this.blockWidth / 2;
               var yPosition = canvasHeight - this.groundHeight(x);

               switch(this.powerups[x])
               {
                   case 'Gem':
                       this.powerupItems.push(new Ostro.GameObject.Powerup(gemImage, xPosition - gemImage.width / 2, yPosition - gemImage.height, 4, 1, 1));
                       break;
               }
           }
       }
   },

   getShortestPath: function(startX, startY)
   {

   },

   isPowerup: function(pointX, pointY)
   {
       return this.powerups[this.currentBlock(pointX)];
   },

   isAccessible: function(pointX, pointY)
   {
       var currentBlockIndex = this.currentBlock(pointX);
       var groundHeight = this.groundHeight(currentBlockIndex);

       return pointY < (this.canvasHeight - groundHeight);
   },

   canBeSeenFrom: function(startX, startY, endX, endY)
   {
       var line = Ostro.Geometry.Line.createFromTwoPoints(startX, startY, endX, endY);

       for(var i = 0, length = this.blockPoints.length; i < length; i++)
       {
           var point = this.blockPoints[i];
           if(line.isOnLine(point.x, point.y))
           {
                return false;
           }
       }

       return true;
   },

   currentBlock: function(x)
   {
       return parseInt( x / this.blockWidth);
   },

   groundHeight: function(blockIndex)
   {
       if (blockIndex < 0 || blockIndex > this.blocks.length)
       {
           return 0;
       }

       return this.blocks[blockIndex] *  this.blockHeight;
   }
});