// File generated from our OpenAPI spec by Scalar. See README.md for details.

import { APIResource } from "../resource";
import { APIPromise } from "../api-promise";
import type { RequestOptions } from "../internal/request-options";
import { path as __scalarPath } from "../internal/utils/path";

export class AuditLogs extends APIResource {
  /**
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<AuditLogListResponse>} The list of audit logs
   *
   * @example
   * ```ts
   * const list = await client.auditLogs.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<AuditLogListResponse> {
    return this._client.get("/audit-logs", options);
  }

  /**
   * @param {AuditLogCreateParams} body - The request body to send.
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<AuditLogCreateResponse>} The created audit log
   *
   * @example
   * ```ts
   * const create = await client.auditLogs.create({
   *   tableName: "",
   *   recordId: "",
   *   action: "create",
   * });
   * ```
   */
  create(body: AuditLogCreateParams, options?: RequestOptions): APIPromise<AuditLogCreateResponse> {
    return this._client.post("/audit-logs", { body: body, ...options });
  }

  /**
   * @param {string} id
   * @param {RequestOptions} [options] - Options to apply to the request, such as headers and an abort signal.
   * @returns {APIPromise<AuditLogRetrieveResponse>} The requested audit log
   *
   * @example
   * ```ts
   * const retrieve = await client.auditLogs.retrieve("id");
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AuditLogRetrieveResponse> {
    return this._client.get(__scalarPath`/audit-logs/${id}`, options);
  }
}

export type AuditLogListResponse = Array<AuditLogListResponse.AuditLogListResponseItem>;

export namespace AuditLogListResponse {
  export interface AuditLogListResponseItem {
    id: string;
    /**
     * @format date-time
     */
    createdAt: string;
    tableName: string;
    recordId: string;
    action: "create" | "update" | "delete";
    userId: string | null;
    before: string | number | boolean | string | null | AuditLogListResponseItem.Before | Array<string | null>;
    after: string | number | boolean | string | null | AuditLogListResponseItem.After | Array<string | null>;
  }

  export namespace AuditLogListResponseItem {
    export interface Before {
    }

    export interface After {
    }
  }
}

export interface AuditLogCreateParams {
  tableName: string;
  recordId: string;
  action: "create" | "update" | "delete";
  userId?: string | null;
  before?: AuditLogCreateParams.Before | null;
  after?: AuditLogCreateParams.After | null;
}

export namespace AuditLogCreateParams {
  export interface Before {
  }

  export interface After {
  }
}

export interface AuditLogCreateResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  tableName: string;
  recordId: string;
  action: "create" | "update" | "delete";
  userId: string | null;
  before: string | number | boolean | string | null | AuditLogCreateResponse.Before | Array<string | null>;
  after: string | number | boolean | string | null | AuditLogCreateResponse.After | Array<string | null>;
}

export namespace AuditLogCreateResponse {
  export interface Before {
  }

  export interface After {
  }
}

export interface AuditLogRetrieveResponse {
  id: string;
  /**
   * @format date-time
   */
  createdAt: string;
  tableName: string;
  recordId: string;
  action: "create" | "update" | "delete";
  userId: string | null;
  before: string | number | boolean | string | null | AuditLogRetrieveResponse.Before | Array<string | null>;
  after: string | number | boolean | string | null | AuditLogRetrieveResponse.After | Array<string | null>;
}

export namespace AuditLogRetrieveResponse {
  export interface Before {
  }

  export interface After {
  }
}
export declare namespace AuditLogs {
  export {
    type AuditLogListResponse as AuditLogListResponse,
    type AuditLogCreateResponse as AuditLogCreateResponse,
    type AuditLogRetrieveResponse as AuditLogRetrieveResponse,
    type AuditLogCreateParams as AuditLogCreateParams,
  };
}
export { AuditLogs as AuditLogResource };
