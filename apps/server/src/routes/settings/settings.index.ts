import { createRouter } from "@/lib/create-app";
import { sessionMiddleware, requireAdmin } from "@/middleware";

import * as handlers from "./settings.handlers";
import * as routes from "./settings.routes";

const settingsRouter = createRouter();

settingsRouter.use(sessionMiddleware);
settingsRouter.use(requireAdmin);

settingsRouter
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch);

export default settingsRouter;