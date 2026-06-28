// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from "../resource";
import { APIPromise } from "../api-promise";
import type { RequestOptions } from "../internal/request-options";

export class Home extends APIResource {
  /**
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<HomeListResponse>} The root endpoint of the API, providing a welcome message.
   *
   * @example
   * ```ts
   * const list = await client.home.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<HomeListResponse> {
    return this._client.get("/", options);
  }
}

export interface HomeListResponse {
  message: string;
}
export declare namespace Home {
  export {
    type HomeListResponse as HomeListResponse,
  };
}
export { Home as HomeResource };
