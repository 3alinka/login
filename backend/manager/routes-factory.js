/**
 * author: malinka
 * this factory is to load all routes in a specific folder.
 */

var RoutesFactory = (function () {

    function RoutesLoader() {

        return {

            
        }
    }

    return {

        getInstance: function () {

            if (!instance) {
                instance = new ClusterApp();
                delete instance.constructor;
            }

            return instance;
        }
    }

})()

module.exports = RoutesFactory;
