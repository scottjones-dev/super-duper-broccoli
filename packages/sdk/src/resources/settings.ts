// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from "../resource";
import { APIPromise } from "../api-promise";
import type { RequestOptions } from "../internal/request-options";
import { path as __scalarPath } from "../internal/utils/path";

export class Settings extends APIResource {
  /**
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<SettingListResponse>} The list of settings
   *
   * @example
   * ```ts
   * const list = await client.settings.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<SettingListResponse> {
    return this._client.get("/settings", options);
  }

  /**
   * @param {SettingCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<SettingCreateResponse>} The created setting
   *
   * @example
   * ```ts
   * const create = await client.settings.create({
   *   emailFrom: "",
   * });
   * ```
   */
  create(body: SettingCreateParams, options?: RequestOptions): APIPromise<SettingCreateResponse> {
    return this._client.post("/settings", { body: body, ...options });
  }

  /**
   * @param {string} id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<SettingRetrieveResponse>} The requested setting
   *
   * @example
   * ```ts
   * const retrieve = await client.settings.retrieve("id");
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<SettingRetrieveResponse> {
    return this._client.get(__scalarPath`/settings/${id}`, options);
  }

  /**
   * @param {string} id
   * @param {SettingPatchParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<SettingPatchResponse>} The updated setting
   *
   * @example
   * ```ts
   * const patch = await client.settings.patch("id", {});
   * ```
   */
  patch(id: string, body: SettingPatchParams, options?: RequestOptions): APIPromise<SettingPatchResponse> {
    return this._client.patch(__scalarPath`/settings/${id}`, { body: body, ...options });
  }
}

export type SettingListResponse = Array<SettingListResponse.SettingListResponseItem>;

export namespace SettingListResponse {
  export interface SettingListResponseItem {
    id: string;
    /**
     * @format date-time
     */
    createdAt: string;
    /**
     * @format date-time
     */
    updatedAt: string;
    companyName: string;
    emailFrom: string;
    createdBy: string | null;
    updatedBy: string | null;
  }
}

export interface SettingCreateParams {
  emailFrom: string;
  id?: string;
  /**
   * @format date-time
   */
  createdAt?: string;
  /**
   * @format date-time
   */
  updatedAt?: string;
  companyName?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export interface SettingCreateResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  /**
   * @format date-time
   */
  updatedAt: string;
  companyName: string;
  emailFrom: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface SettingRetrieveResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  /**
   * @format date-time
   */
  updatedAt: string;
  companyName: string;
  emailFrom: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface SettingPatchParams {
  id?: string;
  /**
   * @format date-time
   */
  createdAt?: string;
  /**
   * @format date-time
   */
  updatedAt?: string;
  companyName?: string;
  emailFrom?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export interface SettingPatchResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  /**
   * @format date-time
   */
  updatedAt: string;
  companyName: string;
  emailFrom: string;
  createdBy: string | null;
  updatedBy: string | null;
}
export declare namespace Settings {
  export {
    type SettingListResponse as SettingListResponse,
    type SettingCreateResponse as SettingCreateResponse,
    type SettingRetrieveResponse as SettingRetrieveResponse,
    type SettingPatchResponse as SettingPatchResponse,
    type SettingCreateParams as SettingCreateParams,
    type SettingPatchParams as SettingPatchParams,
  };
}
export { Settings as SettingResource };
