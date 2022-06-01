const LIMIT = {
  NAME_MIN: 3,
  PASSWORD_MIN: 8,
  PHONE_MIN: 10,
  LIMITER_WINDOWMS: 90000,
  LIMITER_MAX: 100,
  TOKEN_EXPIRES: '24h',
};

const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const STATUS = {
  CREATED: 'created',
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};

const MESSAGE = {
  INVALID_SIGNATURE: 'invalid signature',
  NOT_AUTHORIZED: 'Not authorized',
  NOT_FOUND: 'Not found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  TOO_MANY_REQUESTS: 'Too many requests from this IP address',
  JWT_EXPIRED: 'jwt expired',
  TOOLTIP_ROUTES:
    "Use routes: '/api/auth/' or '/api/users/' or '/api/contacts/'",
  REGISTER_SUCCESSFUL: 'register successful',
  LOGIN_SUCCESSFUL: 'login successful',
  LOGOUT_SUCCESSFUL: 'logout successful',
  CREATED_SUCCESSFUL: 'created successful',
  LOADED_SUCCESSFUL: 'loaded successful',
  DELETED_SUCCESSFUL: 'deleted successful',
  UPDATED_SUCCESSFUL: 'updated successful',
};

const SIZE = {
  HALFMB: 524288,
  ONEMB: 1048576,
};

module.exports = {
  LIMIT,
  HTTP_CODE,
  STATUS,
  MESSAGE,
  SIZE,
};
