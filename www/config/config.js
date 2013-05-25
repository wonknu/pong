/**
 * CONFIG FILE, to configure different environment [ DEV / PROD ]
 */
module.exports = (function(){
    switch(process.env.NODE_ENV){
        case 'development' :
            return {
                PORT        : 1337,
                DEBUG       : true,
                IO_LOG      : true,
                IO_ORIGINS  : '*:*'
            };
        break;
        case 'production' :
            return {
                PORT        : 1337,
                DEBUG       : true,
                IO_LOG      : true,
                IO_ORIGINS  : '*:*'
            };
        break;
        default :
            return {
                PORT        : 1337,
                DEBUG       : true,
                IO_LOG      : true,
                IO_ORIGINS  : '*:*',
            };
        break;
    }
})();
