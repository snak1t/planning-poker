const merge = require('ramda/src/merge')
const omit = require('ramda/src/omit')

const createStore = () => {
  let store = {}

  const update = (id, data) => {
    const prevData = typeof store[id] === 'undefined' ? {} : store[id]
    const newData = merge(prevData, data)
    store[id] = newData
  }

  const get = id => store[id]

  const purge = id => {
    store = omit([id], store)
  }

  return {
    purge,
    get,
    update
  }
}

module.exports = {
  createStore
}
