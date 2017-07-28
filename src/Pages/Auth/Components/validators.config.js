import axios from 'axios'
import { minLength, sameAs, oneOf } from 'rehoc-validator'

const checkLoginForExistance = (login, done) =>
  axios
    .post('/api/login/check', { login })
    .then(response => response.data)
    .then(data => done(!data.exist))

export const registrationValidationConfig = {
  login: {
    validators: [
      minLength(3),
      {
        rule: checkLoginForExistance,
        message: 'Login has already been taken',
        async: true
      }
    ]
  },
  password: {
    validators: [
      oneOf([
        minLength(2),
        minLength(4, 'Password must be longer than 4 symbols')
      ])
    ]
  },
  passwordConfirm: {
    validators: [
      sameAs(
        ['password'],
        "Confirmation password doesn't match previous password"
      )
    ]
  }
}

export const loginValidationConfig = {
  login: {
    field: 'login',
    validators: [minLength(3)]
  },
  password: {
    validators: [minLength(3, 'Password must be longer than 4 symbols')]
  }
}
