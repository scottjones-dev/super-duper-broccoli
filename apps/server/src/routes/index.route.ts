import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "../http/status-codes";
import { jsonContent } from "../openapi/helpers";
import { createMessageObjectSchema } from "../openapi/schemas";

import { createRouter } from "@/lib/create-app";

const Home = createRouter()
    .openapi(
        createRoute({
            tags: ["Home"],
            operationId: "getHome",
            method: "get",
            path: "/",
            responses: {
                [HttpStatusCodes.OK]: jsonContent(
                    createMessageObjectSchema("Deelicious Bakes API"),
                    "The root endpoint of the API, providing a welcome message.",
                ),
            },
        }),
        (c) => {
            return c.json({
                message: "Deelicious Bakes API",
            }, HttpStatusCodes.OK);
        },
    );

export default Home;
