const path = require('path')
const User = require('../models/user')
const { pick } = require('ramda')

const getUserData = pick(['login', 'games'])

module.exports = (app, passport) => {
  app.post('/api/signup', (req, res) => {
    passport.authenticate('local-signup', (err, user) => {
      if (err) {
        return res.json({ error: err.message })
      }
      req.login(user, () => {
        res.json(getUserData(user))
      })
    })(req, res)
  })

  app.post('/api/login/check', (req, res) => {
    const login = req.body.login
    User.findOne({ login }, function(err, user) {
      const exist = user !== null
      res.json({ exist: exist })
    })
  })

  app.post('/api/login', (req, res) => {
    passport.authenticate('local-login', (err, user) => {
      if (err) {
        return res.json({ error: err.message })
      }
      req.login(user, () => {
        res.json(getUserData(user))
      })
    })(req, res)
  })

  app.get('/api/user', (req, res) => {
    let sessionUser = req.session.passport
    if (!sessionUser || !sessionUser.user) return res.json({ user: null })
    let id = sessionUser.user
    User.findOne({ _id: id }, function(err, user) {
      res.json(getUserData(user))
    })
  })

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.json({ logout: true })
  })
}
