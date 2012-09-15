var ResourceManager = Class.extend({
    init: function(images)
    {
        g_ResourceManager = this;

        this.imageProperties = [];

        for ( var i = 0; i < images.length; i++ )
        {
            var thisImage = new Image();

            this[images[i].name] = thisImage;

            this.imageProperties.push(images[i].name);

            thisImage.src = images[i].src;
        }
    }
});