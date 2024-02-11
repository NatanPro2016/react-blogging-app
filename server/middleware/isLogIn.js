const isLoggedIn = (req, res, next) => {
  req.session.authenticated || req.user
    ? next()
    : res.status(401).send("You are not loged in");
};

const isNotLoggedIn = (req, res, next) => {
  req.session.authenticated || req.user
    ? res.send("You are already loged in")
    : next();
};

module.exports = { isLoggedIn, isNotLoggedIn };
