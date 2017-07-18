import { omit, merge } from 'ramda';

export const user = (state = null, { type, payload }) => {
  switch (type) {
    case '[user] LOGIN_USER':
      return extractUserInfo(payload);
    case '[user] ADD_ANAUTHORIZED_USER':
      return merge({ temporary: true }, payload);
    default:
      return state;
  }
};

const extractUserInfo = omit(['games']);
