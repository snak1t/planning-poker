const merge = require('ramda/src/merge');
const omit = require('ramda/src/omit');

const createStore = () => {
    let store = {};
    let subscribers = {};

    const update = (id, data) => {
        const prevData = typeof store[id] === 'undefined' ? {} : store[id];
        const newData = merge(prevData, data);
        store[id] = newData;
        subscribers[id].forEach(f => f(newData));
    };

    const get = id => store[id];

    const purge = id => {
        store = omit([id], store);
        subscribers = omit([id], subscribers);
    };

    const subscribe = (id, f) => {
        if (subscribers[id]) {
            subscribers[id].push(f);
        } else {
            subscribers[id] = [f];
        }
        return () => {
            subscribers[id].filter(ff => ff !== f);
            if (subscribers[id].length === 0) {
                delete subscribers[id];
            }
        };
    };

    return {
        purge,
        get,
        update,
        subscribe,
    };
};

module.exports = {
    createStore,
};
