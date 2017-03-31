Plugin.extend({
   _type: 'gif',
   _isContainer: false,
   _render: false,
   initPlugin: function(data) {
       var dims = this.relativeDims();
       var div = document.getElementById(data.id);
       if (div) {
           jQuery("#" + data.id).remove();
       }

       div = document.createElement('div');
       div.id = data.id;
       div.style.width = dims.w + 'px';
       div.style.height = dims.h + 'px';
       div.style.top = dims.y + 'px';
       div.style.left = dims.x + 'px';

       div.style.position = 'absolute';

       var instance = this;
       var parentDiv = document.getElementById(Renderer.divIds.gameArea);
       parentDiv.insertBefore(div, parentDiv.childNodes[0]);

       // URL of the gif image
       var asset = Renderer.theme.getAsset(data.asset);
       asset.style = 'max-width:100%;max-height:100%';
       var html = asset;
       jQuery("#" + data.id).append(html);

       this._div = div;
       this._self = new createjs.DOMElement(div);

       this._render = true;
   }
});