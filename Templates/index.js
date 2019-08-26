module.exports = (routeName) => {
  return `const passport = require("passport");
  const session = require("express-session");
  const bodyParser = require("body-parser");
  const express = require("express");

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({ secret: "keyboard warrior cat", resave: true, saveUninitialized: true })
  ); // session secret
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.json());


  // Routes
  require("./routes/${routeName}Routes")(app);


  const PORT = process.env.PORT || 3000;
  // Starting the server, syncing our models ------------------------------------/
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });

  module.exports = app;`
}