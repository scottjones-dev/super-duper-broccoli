import { OpenApiGeneratorV3, OpenAPIRegistry, } from "@asteasolutions/zod-to-openapi";

import type { ZodSchema } from "@/types";

const oneOf = <T extends ZodSchema>(schemas: T[],): object[] => {

  const registry = new OpenAPIRegistry();

  schemas.forEach((schema, index) => { registry.register(index.toString(), schema); });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  const components = generator.generateComponents();

  return Object.values(components.components?.schemas ?? {},) as object[];
};

export default oneOf;