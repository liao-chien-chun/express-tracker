module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '尚未登入無法使用')
    res.redirect('/users/login')
  }
}