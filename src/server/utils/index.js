const { path, curryN } = require('ramda');

const getUserIDfromSession = request => request.session.passport.user;
const getLoginFromRequest = path(['body', 'login']);
const findByIDInCollection = id => item => item._id.toString() === id;
const throwIfUndefined = msg => data => {
  if (data === void 0) throw new Error(msg);
  return data;
};

const getDeeplyNestedDocument = curryN(2, (pathConfig, document) =>
  pathConfig.reduce((object, [key, id]) => object[key].id(id), document)
);

const mergeDocument = curryN(2, (item, doc) => {
  for (let key in item) {
    doc[key] = item[key];
  }
  return doc;
});

module.exports = {
  getUserIDfromSession,
  getLoginFromRequest,
  findByIDInCollection,
  throwIfUndefined,
  getDeeplyNestedDocument,
  mergeDocument
};
