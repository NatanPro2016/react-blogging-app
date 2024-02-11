const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const { isLoggedIn } = require("./middleware/isLogIn");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(bodyParser.json({ limit: "10000kb" }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

const auth = require("./routs/auth");
const posts = require("./routs/posts");
const user = require("./routs/user");

app.use("/api/auth/", auth);
app.use("/api/user/", isLoggedIn, user);
app.use("/api/posts/", isLoggedIn, posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}`);
});
