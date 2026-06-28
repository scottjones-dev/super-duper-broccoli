import type { AppOpenAPI } from "@/types";

import { env } from "@deeliciousbakes/env/server";
import packageJSON from "../../../../package.json" with { type: "json" };

import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: AppOpenAPI) {
  if (env.NODE_ENV === "production") return;

  /**
   * OpenAPI Document
   */
  app.doc("/openapi.json", {
    openapi: "3.1.0",

    info: {
      title: "Deelicious API",
      version: packageJSON.version,
      description:
        "REST API for Deelicious. Provides ingredients, inventory, and baking operations.",
      contact: {
        name: "Alice Systems",
        email: "scottjones@alicesystems.co.uk",
        url: "https://alicesystems.co.uk",
      },
      license: {
        name: "Proprietary",
        url: "https://alicesystems.co.uk/license",
      },
      termsOfService: "https://alicesystems.co.uk/terms-of-service",
    },

    externalDocs: {
      description: "Full API Documentation",
      url: "https://alicesystems.co.uk/docs/deelicious-api",
    },

    servers: [
      {
        url: env.BETTER_AUTH_URL,
        description: "Local Development API",
      },
    ],

    tags: [
      { name: "Home", description: "Health check endpoints" },
      { name: "Ingredients", description: "Operations related to ingredients", },
    ],
  });

  /**
   * Scalar API Reference UI
   */
  app.get(
    "/reference",
    Scalar({
      theme: "bluePlanet",
      layout: "modern",
      defaultOpenAllTags: true,
      expandAllModelSections: true,
      expandAllResponses: true,
      hideDarkModeToggle: true,
      hideClientButton: true,
      showSidebar: true,
      showDeveloperTools: "localhost",
      operationTitleSource: "summary",
      persistAuth: false,
      telemetry: true,
      default: false,
      isEditable: false,
      hideModels: false,
      documentDownloadType: "both",
      hideTestRequestButton: false,
      hideSearch: false,
      showOperationId: false,
      withDefaultFonts: true,
      defaultOpenFirstTag: true,
      expandAllSchemaProperties: false,
      orderSchemaPropertiesBy: "alpha",
      orderRequiredPropertiesFirst: true,
      title: "API",
      _integration: "hono",
      darkMode: true,
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch"
      },
      modelsSectionLabel: "Models",
      slug: "api",
      sources: [
        { url: "/openapi.json", title: "API" },
        // { url: "/api/auth/open-api/generate-schema", title: "Auth" },
      ],
      pageTitle: "Deelicious API Reference",
    }),
  );

  app.get("/llms.txt", async (c) => {
    const spec = app.getOpenAPI31Document({
      openapi: "3.1.0",
      info: {
        title: "Deelicious API",
        version: packageJSON.version,
      },
    });
    const text = JSON.stringify(spec, null, 2);

    return c.text(text, 200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
  });
}