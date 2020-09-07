/**
 * author: malinkaphann@gmail.com
 * create many server instances as much as possible according to the number of CPU cores.
 */
const os = require("os");
const cluster = require("cluster");
const clusterWorkerSize = os.cpus().length;

var ClusterFactory = (function () {

    /**
     * constructor
     */
    function ClusterApp() {

        return {

            run: (callback) => {

                if (clusterWorkerSize > 1) {

                    if (cluster.isMaster) {
                        for (let i = 0; i < clusterWorkerSize; i++) {
                            cluster.fork();
                        }

                        cluster.on("exit", function (worker) {
                            console.log("Worker", worker.id, " has exitted.");
                        });

                    } else {

                        if (typeof callback === 'function') {
                            //const app = BackendFactory.getInstance();
                            //app.start(process.pid);
                            callback();
                        }
                    }

                } else {

                    if (typeof callback === 'function') {
                        //const app = BackendFactory.getInstance();
                        //app.start(process.pid);
                        callback();
                    }
                }
            }
        }
    }

    var instance;

    return {

        getInstance: function () {

            if (!instance) {
                instance = new ClusterApp();
                delete instance.constructor;
            }

            return instance;
        }
    };

})();

module.exports = ClusterFactory;