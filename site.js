var passport = require("passport")
var login = require("connect-ensure-login")

exports.signupForm = function(req, res) {
  res.render("signup", {})
}

exports.loginForm = function(req, res) {
  res.render("login", {})
}

exports.login = passport.authenticate("local", {
  successReturnToOrRedirect: "/",
  failureRedirect: "/login",
})

exports.logout = function(req, res) {
  req.logout()
  res.redirect("/")
}

exports.account = [
  login.ensureLoggedIn(),
  function(req, res) {
    res.render("account", { user: req.user })
  },
]
