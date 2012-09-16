Ostro.ResourceManager = Ostro.OO.Class.extend({
   init: function(resources)
   {
       this.resources = resources;
       this.resourceMapping = {};
   },

   getResource: function(name)
   {
       return this.resourceMapping[name];
   },

   loadResources: function(callbackFunction, thisObject)
   {
       var noOfLoadedImages = 0;

       for(var i = 0, length = this.resources.length; i < length; i++)
       {
           var resource = this.resources[i];
           var image = new Image();
           this.resourceMapping[resource.name] = image;

           image.onload = function()
           {
               noOfLoadedImages++;

               if(noOfLoadedImages == length && callbackFunction != null)
               {
                    thisObject != null ? callbackFunction.call(thisObject)
                                       : callbackFunction();
               }
           }

           image.src = resource.src;
       }
   }
});