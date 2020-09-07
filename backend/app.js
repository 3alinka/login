/**
 * author: malinkaphann@gmail.com
 * this is where everything starts.
 */
const ClusterFactory = require("./manager/cluster-factory");
const BackendFactory = require("./manager/backend-factory");
const backendApp = BackendFactory.getInstance();
const clusterManager = ClusterFactory.getInstance();

clusterManager.run(() => {
  backendApp.start();
});
