/**
 * author: malinkaphann@gmail.com
 *
 * this factory is used to create a singleton backend application.
 * features of this class
 * 1- it is a factory
 * 2- factory will create a singleton application
 * 3- can add config, route, middleware on the fly.
 */
const chalk = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const DB_URL = process.env.DB_URL;
const morgan = require("morgan");
const userController = require("../controllers/user");
const bodyParser = require("body-parser");

var BackendFactory = (function () {
  function BackendApp() {
    const app = express();

    const port = process.env.PORT || 8080;

    setConfig(app);

    useMiddleware(app);

    setRoutes(app);

    setDatabase();

    app.start = function () {
      app.listen(port, () =>
        console.log(
          `app running on ${port} with pid = ${process.pid}, http://localhost:${port}`
        )
      );
    };

    app.stop = function () {
      // TO-DO
    };

    return app;
  }

  /**
   * this is where to set configuration
   * @param {*} app
   */
  function setConfig(app) {
    /*
         backend app is not supposed to have these lines

        app.engine('.html', require('ejs').__express);
        app.set('views', './views');
        app.set('view engine', 'html');
        */
  }

  /**
   * this is where to add middleware
   * @param {*} app
   */
  function useMiddleware(app) {
    // backend app is not supposed to have this line
    //app.use('/static', express.static(path.join(`${__dirname}/public`)));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    morgan.token("pid", function (req, res) {
      return process.pid;
    });
    app.use(morgan("pid = :pid :method :url :response-time"));
  }

  /**
   * this is where to add routes
   * @param {*} app
   */
  function setRoutes(app) {
    app.get("/", (req, res) => res.send("hello world"));
    app.post("/login", userController.login);
  }

  function setDatabase() {
    var connected = chalk.bold.cyan;
    var error = chalk.bold.yellow;
    var disconnected = chalk.bold.red;
    var termination = chalk.bold.magenta;

    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", function () {
      console.log(
        connected("mongoose default connection ", mongoose.connection.id)
      );
    });

    mongoose.connection.on("error", function (err) {
      console.log(
        error("mongoose default connection has occured " + err + " error")
      );
    });

    mongoose.connection.on("disconnected", function () {
      console.log(disconnected("mongoose default connection is disconnected"));
    });

    process.on("SIGINT", function () {
      mongoose.connection.close(function () {
        console.log(
          termination(
            "mongoose default connection is disconnected due to application termination"
          )
        );
        process.exit(0);
      });
    });
  }

  var instance;

  return {
    getInstance: function () {
      if (!instance) {
        instance = new BackendApp();
        delete instance.constructor;
      }

      return instance;
    },
  };
})();

module.exports = BackendFactory;
