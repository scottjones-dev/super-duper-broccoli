# Deelicious TypeScript API

Complete reference of every operation, grouped by resource. See [the README](./README.md) for usage and configuration.

## Contents

- [`Home`](#home)
  - [`list`](#list)
- [`AuditLogs`](#auditlogs)
  - [`list`](#list-1)
  - [`create`](#create)
  - [`retrieve`](#retrieve)
- [`Settings`](#settings)
  - [`list`](#list-2)
  - [`create`](#create-1)
  - [`retrieve`](#retrieve-1)
  - [`patch`](#patch)
- [`Ingredients`](#ingredients)
  - [`list`](#list-3)
  - [`create`](#create-2)
  - [`retrieve`](#retrieve-2)
  - [`patch`](#patch-1)
  - [`delete`](#delete)
  - [`listAuditLog`](#listauditlog)

## Setup

```ts
import DeeliciousAPI from "@scott-w-jones-hotmail-com-team/deelicious-api";

const client = new DeeliciousAPI();
```

## `Home`

### `list`

| Direction | Type |
| --- | --- |
| Response | [`HomeListResponse`](./src/resources/home.ts) |

```ts
const list = await client.home.list();
```

## `AuditLogs`

### `list`

| Direction | Type |
| --- | --- |
| Response | [`AuditLogListResponse`](./src/resources/audit-logs.ts) |

```ts
const list = await client.auditLogs.list();
```

### `create`

| Direction | Type |
| --- | --- |
| Request | [`AuditLogCreateParams`](./src/resources/audit-logs.ts) |
| Response | [`AuditLogCreateResponse`](./src/resources/audit-logs.ts) |

```ts
const create = await client.auditLogs.create({
  tableName: "",
  recordId: "",
  action: "create",
});
```

### `retrieve`

| Direction | Type |
| --- | --- |
| Response | [`AuditLogRetrieveResponse`](./src/resources/audit-logs.ts) |

```ts
const retrieve = await client.auditLogs.retrieve("id");
```

## `Settings`

### `list`

| Direction | Type |
| --- | --- |
| Response | [`SettingListResponse`](./src/resources/settings.ts) |

```ts
const list = await client.settings.list();
```

### `create`

| Direction | Type |
| --- | --- |
| Request | [`SettingCreateParams`](./src/resources/settings.ts) |
| Response | [`SettingCreateResponse`](./src/resources/settings.ts) |

```ts
const create = await client.settings.create({
  emailFrom: "",
});
```

### `retrieve`

| Direction | Type |
| --- | --- |
| Response | [`SettingRetrieveResponse`](./src/resources/settings.ts) |

```ts
const retrieve = await client.settings.retrieve("id");
```

### `patch`

| Direction | Type |
| --- | --- |
| Request | [`SettingPatchParams`](./src/resources/settings.ts) |
| Response | [`SettingPatchResponse`](./src/resources/settings.ts) |

```ts
const patch = await client.settings.patch("id", {});
```

## `Ingredients`

### `list`

| Direction | Type |
| --- | --- |
| Response | [`IngredientListResponse`](./src/resources/ingredients.ts) |

```ts
const list = await client.ingredients.list();
```

### `create`

| Direction | Type |
| --- | --- |
| Request | [`IngredientCreateParams`](./src/resources/ingredients.ts) |
| Response | [`IngredientCreateResponse`](./src/resources/ingredients.ts) |

```ts
const create = await client.ingredients.create({
  name: "",
  buyFrom: "sainsburys",
  buyQuantity: 0,
  buyQuantityType: "count",
  buyPriceTotal: 0,
});
```

### `retrieve`

| Direction | Type |
| --- | --- |
| Response | [`IngredientRetrieveResponse`](./src/resources/ingredients.ts) |

```ts
const retrieve = await client.ingredients.retrieve("id");
```

### `patch`

| Direction | Type |
| --- | --- |
| Request | [`IngredientPatchParams`](./src/resources/ingredients.ts) |
| Response | [`IngredientPatchResponse`](./src/resources/ingredients.ts) |

```ts
const patch = await client.ingredients.patch("id", {});
```

### `delete`

```ts
await client.ingredients.delete("id");
```

### `listAuditLog`

Get the audit log history for a single ingredient

| Direction | Type |
| --- | --- |
| Response | [`IngredientListAuditLogResponse`](./src/resources/ingredients.ts) |

```ts
const listAuditLog = await client.ingredients.listAuditLog("id");
```
