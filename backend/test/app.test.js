const assert = require('assert');
const ClusterFactory = require('../cluster-factory');

describe('test singleton', () => {

    var myApp1 = ClusterFactory.getInstance();
    var myApp2 = ClusterFactory.getInstance();

    assert(myApp1 === myApp2);
});