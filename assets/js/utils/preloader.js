/**
 * Loader module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * preloaderObject.load( {Function on progress}, {Function on complete} );
 * 
 */

define(
    ['VAR', 'createjs'],
    function (VAR)
    {
        var cb_progress, cb_complete;
        window.IMGS = [];
        
        /**
         * Initialize loader and load assets
         * @param {Object} progress, call back from progress event
         * @param {Object} complete, call back from complete event
         */
        var initialize = function (progress, complete)
        {
            cb_progress = progress || null;
            cb_complete = complete || null;
            preloader = new createjs.LoadQueue();
            preloader.onProgress = handleProgress;
            preloader.onComplete = handleComplete;
            preloader.onFileLoad = handleFileLoad;
            preloader.loadManifest(VAR.manifest);
        };
        
        /**
         * Receive progress event from loading assets
         * @param {Object} e
         */
        var handleProgress = function (e)
        {
            console.log('Loading : ' + e.loaded);
            if(cb_progress !== null) cb_progress(e);
        };
        
        /**
         * Receive complete event from loading assets
         * @param {Object} e
         */
        var handleComplete = function (e)
        {
            if(cb_complete !== null) cb_complete(e);
        };
        
        /**
         * Receive file load event from loading assets
         * @param {Object} e
         */
        var handleFileLoad = function (e)
        {
            switch(e.type)
            {
                case "fileload": // image loaded
                    var img = new Image();
                    img.src = e.result.src;
                    window.IMGS[e.item.id] = new createjs.Bitmap(img);
                break;
            }
        };
        
        return { 
            load: initialize
        };
    }
);
