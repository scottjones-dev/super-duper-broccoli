import { createRouter } from "@/lib/create-app";
import * as handlers from "./ingredients.handlers";
import * as routes from "./ingredients.routes";
import { requireAdmin } from "@/middleware/require-admin";
import { sessionMiddleware } from "@/middleware";

const ingredientsRouter = createRouter();

ingredientsRouter.use(sessionMiddleware);
ingredientsRouter.use(requireAdmin);

ingredientsRouter
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)
  .openapi(routes.auditLog, handlers.auditLogHistory);

export default ingredientsRouter;