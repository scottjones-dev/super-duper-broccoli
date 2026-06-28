// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from "../resource";
import { APIPromise } from "../api-promise";
import type { RequestOptions } from "../internal/request-options";
import { path as __scalarPath } from "../internal/utils/path";

export class Ingredients extends APIResource {
  /**
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<IngredientListResponse>} The list of ingredients
   *
   * @example
   * ```ts
   * const list = await client.ingredients.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<IngredientListResponse> {
    return this._client.get("/ingredients", options);
  }

  /**
   * @param {IngredientCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<IngredientCreateResponse>} The created ingredient
   *
   * @example
   * ```ts
   * const create = await client.ingredients.create({
   *   name: "",
   *   buyFrom: "sainsburys",
   *   buyQuantity: 0,
   *   buyQuantityType: "count",
   *   buyPriceTotal: 0,
   * });
   * ```
   */
  create(body: IngredientCreateParams, options?: RequestOptions): APIPromise<IngredientCreateResponse> {
    return this._client.post("/ingredients", { body: body, ...options });
  }

  /**
   * @param {string} id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<IngredientRetrieveResponse>} The requested ingredient
   *
   * @example
   * ```ts
   * const retrieve = await client.ingredients.retrieve("id");
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<IngredientRetrieveResponse> {
    return this._client.get(__scalarPath`/ingredients/${id}`, options);
  }

  /**
   * @param {string} id
   * @param {IngredientPatchParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<IngredientPatchResponse>} The updated ingredient
   *
   * @example
   * ```ts
   * const patch = await client.ingredients.patch("id", {});
   * ```
   */
  patch(id: string, body: IngredientPatchParams, options?: RequestOptions): APIPromise<IngredientPatchResponse> {
    return this._client.patch(__scalarPath`/ingredients/${id}`, { body: body, ...options });
  }

  /**
   * @param {string} id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns Ingredient deleted
   *
   * @example
   * ```ts
   * await client.ingredients.delete("id");
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(__scalarPath`/ingredients/${id}`, { ...options, headers: { Accept: "*/*", ...options?.headers } });
  }

  /**
   * Get the audit log history for a single ingredient
   *
   * @param {string} id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<IngredientListAuditLogResponse>} Audit log entries for this ingredient
   *
   * @example
   * ```ts
   * const listAuditLog = await client.ingredients.listAuditLog("id");
   * ```
   */
  listAuditLog(id: string, options?: RequestOptions): APIPromise<IngredientListAuditLogResponse> {
    return this._client.get(__scalarPath`/ingredients/${id}/audit-log`, options);
  }
}

export type IngredientListResponse = Array<IngredientListResponse.IngredientListResponseItem>;

export namespace IngredientListResponse {
  export interface IngredientListResponseItem {
    id: string;
    /**
     * @format date-time
     */
    createdAt: string;
    /**
     * @format date-time
     */
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    name: string;
    buyFrom: "sainsburys" | "tesco" | "bookers" | "costco" | "amazon" | "other";
    /**
     * @minimum -8388608
     * @maximum 8388607
     */
    buyQuantity: number;
    buyQuantityType: "count" | "g" | "kg" | "ml" | "l";
    /**
     * @minimum -2147483648
     * @maximum 2147483647
     */
    buyPriceTotal: number;
    isGluten: boolean;
    isDairy: boolean;
    isEggs: boolean;
    isNuts: boolean;
    isPeanuts: boolean;
    isSoya: boolean;
    isSesame: boolean;
    isSulphites: boolean;
  }
}

export interface IngredientCreateParams {
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  buyFrom: "sainsburys" | "tesco" | "bookers" | "costco" | "amazon" | "other";
  /**
   * @minimum 0
   * @maximum 8388607
   */
  buyQuantity: number;
  buyQuantityType: "count" | "g" | "kg" | "ml" | "l";
  /**
   * @minimum 0
   * @maximum 2147483647
   */
  buyPriceTotal: number;
  isGluten?: boolean;
  isDairy?: boolean;
  isEggs?: boolean;
  isNuts?: boolean;
  isPeanuts?: boolean;
  isSoya?: boolean;
  isSesame?: boolean;
  isSulphites?: boolean;
}

export interface IngredientCreateResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  /**
   * @format date-time
   */
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  buyFrom: "sainsburys" | "tesco" | "bookers" | "costco" | "amazon" | "other";
  /**
   * @minimum -8388608
   * @maximum 8388607
   */
  buyQuantity: number;
  buyQuantityType: "count" | "g" | "kg" | "ml" | "l";
  /**
   * @minimum -2147483648
   * @maximum 2147483647
   */
  buyPriceTotal: number;
  isGluten: boolean;
  isDairy: boolean;
  isEggs: boolean;
  isNuts: boolean;
  isPeanuts: boolean;
  isSoya: boolean;
  isSesame: boolean;
  isSulphites: boolean;
}

export interface IngredientRetrieveResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  /**
   * @format date-time
   */
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  buyFrom: "sainsburys" | "tesco" | "bookers" | "costco" | "amazon" | "other";
  /**
   * @minimum -8388608
   * @maximum 8388607
   */
  buyQuantity: number;
  buyQuantityType: "count" | "g" | "kg" | "ml" | "l";
  /**
   * @minimum -2147483648
   * @maximum 2147483647
   */
  buyPriceTotal: number;
  isGluten: boolean;
  isDairy: boolean;
  isEggs: boolean;
  isNuts: boolean;
  isPeanuts: boolean;
  isSoya: boolean;
  isSesame: boolean;
  isSulphites: boolean;
}

export interface IngredientPatchParams {
  /**
   * @minLength 1
   * @maxLength 255
   */
  name?: string;
  buyFrom?: "sainsburys" | "tesco" | "bookers" | "costco" | "amazon" | "other";
  /**
   * @minimum 0
   * @maximum 8388607
   */
  buyQuantity?: number;
  buyQuantityType?: "count" | "g" | "kg" | "ml" | "l";
  /**
   * @minimum 0
   * @maximum 2147483647
   */
  buyPriceTotal?: number;
  isGluten?: boolean;
  isDairy?: boolean;
  isEggs?: boolean;
  isNuts?: boolean;
  isPeanuts?: boolean;
  isSoya?: boolean;
  isSesame?: boolean;
  isSulphites?: boolean;
}

export interface IngredientPatchResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  /**
   * @format date-time
   */
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  buyFrom: "sainsburys" | "tesco" | "bookers" | "costco" | "amazon" | "other";
  /**
   * @minimum -8388608
   * @maximum 8388607
   */
  buyQuantity: number;
  buyQuantityType: "count" | "g" | "kg" | "ml" | "l";
  /**
   * @minimum -2147483648
   * @maximum 2147483647
   */
  buyPriceTotal: number;
  isGluten: boolean;
  isDairy: boolean;
  isEggs: boolean;
  isNuts: boolean;
  isPeanuts: boolean;
  isSoya: boolean;
  isSesame: boolean;
  isSulphites: boolean;
}

export type IngredientListAuditLogResponse = Array<IngredientListAuditLogResponse.IngredientListAuditLogResponseItem>;

export namespace IngredientListAuditLogResponse {
  export interface IngredientListAuditLogResponseItem {
    id: string;
    /**
     * @format date-time
     */
    createdAt: string;
    tableName: string;
    recordId: string;
    action: "create" | "update" | "delete";
    userId: string | null;
    before: string | number | boolean | string | null | IngredientListAuditLogResponseItem.Before | Array<string | null>;
    after: string | number | boolean | string | null | IngredientListAuditLogResponseItem.After | Array<string | null>;
  }

  export namespace IngredientListAuditLogResponseItem {
    export interface Before {
    }

    export interface After {
    }
  }
}
export declare namespace Ingredients {
  export {
    type IngredientListResponse as IngredientListResponse,
    type IngredientCreateResponse as IngredientCreateResponse,
    type IngredientRetrieveResponse as IngredientRetrieveResponse,
    type IngredientPatchResponse as IngredientPatchResponse,
    type IngredientListAuditLogResponse as IngredientListAuditLogResponse,
    type IngredientCreateParams as IngredientCreateParams,
    type IngredientPatchParams as IngredientPatchParams,
  };
}
export { Ingredients as IngredientResource };
