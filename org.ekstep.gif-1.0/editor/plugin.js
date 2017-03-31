EkstepEditor.basePlugin.extend({
    name: "GIF",
    
    initialize: function() {
        var instance = this;
        EkstepEditorAPI.addEventListener(instance.manifest.id + ":assetbrowser:open", this.openBrowser, this);
    },
    
    newInstance: function() {                        
        var instance = this;
        var _parent = this.parent;
        this.parent = undefined;
        var props = this.convertToFabric(this.attributes);
        if(this.attributes.from == 'plugin') {
            delete props.width; // To maintain aspect ratio 
            delete props.height;
        }
        
        var media = this.media ? this.media[this.attributes.asset] : undefined;
        if (!(media && media.src)) throw new Error('media source is missing!');                               
        if (media && media.src) {
            this.name = this.attributes.asset;
            media.src = EkstepEditorAPI.getMediaReverseProxyURL(media.src);
            fabric.Image.fromURL(media.src, function(img) {
                instance.editorObj = img;
                instance.parent = _parent;
                if (instance.attributes.from == 'plugin') {
                    instance.editorObj.scaleToWidth(props.w);
                    delete instance.attributes.from;
                }
                //
                instance.postInit();
            }, props);
        }
    },
    openBrowser: function() {
        var instance = this;
        EkstepEditorAPI.dispatchEvent('org.ekstep.assetbrowser:show', {
            type: 'image',
            search_filter: {}, 
            callback: function(data) { 
                data.x = 20;
                data.y = 20;
                data.w = 50;
                data.h = 50;
                data.from = 'plugin';
                EkstepEditorAPI.dispatchEvent(instance.manifest.id + ':create', data) 
            }
        });
    },
    getCopy: function() {
        var cp = this._super();
        cp.assetMedia = this.media[this.attributes.asset];
        return cp;
    }
});
//# sourceURL=gifplugin.js
