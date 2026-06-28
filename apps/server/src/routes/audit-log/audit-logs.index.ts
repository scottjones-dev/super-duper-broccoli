import { createRouter } from "@/lib/create-app";

import * as handlers from "./audit-log.handlers";
import * as routes from "./audit-log.routes";

const auditLogRouter = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)

export default auditLogRouter;
