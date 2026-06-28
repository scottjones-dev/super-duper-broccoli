// File generated from our OpenAPI spec by Scalar. See README.md for details.

export { DeeliciousAPI as default } from './client.js';

export { type Uploadable, toFile } from './core/uploads';
export { APIPromise } from './api-promise';
export { DeeliciousAPI, type ClientOptions, type DeeliciousAPIOptions, type Logger, type LogLevel } from './client.js';
export {
  DeeliciousAPIError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';
