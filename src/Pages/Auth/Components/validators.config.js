import axios from 'axios'
import { minLength, sameAs } from 'rehoc'

const checkLoginForExistance = (login, done) =>
  axios
    .post('/api/login/check', { login })
    .then(response => response.data)
    .then(data => done(!data.exist))

export const registrationValidationConfig = [
  {
    field: 'login',
    validators: [
      minLength(3),
      {
        rule: checkLoginForExistance,
        message: 'Login has already been taken',
        async: true
      }
    ]
  },
  {
    field: 'amount',
    initialValue: 60,
    validators: [
      { rule: val => val > 100, message: 'Value must be greater then 100' }
    ]
  },
  {
    field: 'array',
    initialValue: [],
    validators: [
      {
        rule: val => val.length > 3,
        message: 'Array length must be greater then 3'
      }
    ]
  },
  {
    field: 'password',
    validators: [minLength(4, 'Password must be longer than 4 symbols')]
  },
  {
    field: 'passwordConfirm',
    validators: [
      sameAs(
        ['password'],
        "Confirmation password doesn't match previous password"
      )
    ]
  }
]

export const loginValidationConfig = [
  {
    field: 'login',
    validators: [minLength(3)]
  },
  {
    field: 'password',
    validators: [minLength(4, 'Password must be longer than 4 symbols')]
  }
]
