import { PlopTypes } from "@turbo/gen";
import { execSync } from "node:child_process";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // -------------------------------------------------------
  // 1. Generic utility package  (e.g. @deeliciousbakes/utils)
  // -------------------------------------------------------
  plop.setGenerator("package", {
    description: "Create a new generic TypeScript package under packages/",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name (without the @deeliciousbakes/ scope):",
        validate: (input: string) => {
          if (!input) return "name is required";
          if (input.includes(" ")) return "name cannot include spaces";
          if (input.includes("@")) return "name should not include @ scope";
          return true;
        },
      },
      {
        type: "input",
        name: "description",
        message: "Short description:",
        default: "",
      },
    ],
    actions: [
      // package.json
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      // tsconfig.json
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
      // src/index.ts
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/src/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      // Install deps so the workspace is wired up
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/.gitkeep",
        template: "",
        // We use this hook purely to run pnpm install after files are written
      },
      function installDeps(answers: Record<string, string>) {
        try {
          execSync("pnpm install", {
            cwd: (answers as any).turbo.paths.root,
            stdio: "inherit",
          });
          return "✅ pnpm install completed";
        } catch {
          return "⚠️  pnpm install failed — run it manually";
        }
      },
    ],
  });

  // -------------------------------------------------------
  // 2. React / UI package  (e.g. @deeliciousbakes/marketing-ui)
  // -------------------------------------------------------
  plop.setGenerator("ui-package", {
    description: "Create a new React component library package under packages/",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name (without the @deeliciousbakes/ scope):",
        validate: (input: string) => {
          if (!input) return "name is required";
          if (input.includes(" ")) return "name cannot include spaces";
          return true;
        },
      },
      {
        type: "input",
        name: "description",
        message: "Short description:",
        default: "",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/package.json",
        templateFile: "templates/ui-package.json.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/tsconfig.json",
        templateFile: "templates/ui-tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/src/index.ts",
        template: "// @deeliciousbakes/{{name}}\nexport {};\n",
      },
      // Stub component so the exports map resolves
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/src/components/.gitkeep",
        template: "",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/src/hooks/.gitkeep",
        template: "",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/{{name}}/src/lib/.gitkeep",
        template: "",
      },
      function installDeps(answers: Record<string, string>) {
        try {
          execSync("pnpm install", {
            cwd: (answers as any).turbo.paths.root,
            stdio: "inherit",
          });
          return "✅ pnpm install completed";
        } catch {
          return "⚠️  pnpm install failed — run it manually";
        }
      },
    ],
  });

  // -------------------------------------------------------
  // 3. React component inside a package
  //    Run from inside a package dir:  turbo gen component
  // -------------------------------------------------------
  plop.setGenerator("component", {
    description: "Add a new React component to the nearest packages/* package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g. PriceCard):",
        validate: (input: string) => {
          if (!input) return "name is required";
          if (input.includes(" ")) return "no spaces — use PascalCase";
          return true;
        },
      },
      {
        type: "list",
        name: "dir",
        message: "Where should the component live?",
        choices: ["components", "ui", "features"],
        default: "components",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ turbo.paths.cwd }}/src/{{dir}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.tsx.hbs",
      },
    ],
  });

  // -------------------------------------------------------
  // 4. Full-stack API Vertical (DB Schema, Hono Server Route/Handlers/Index, Web Data Actions)
  // -------------------------------------------------------
  plop.setGenerator("api-vertical", {
    description: "Generate a full-stack API vertical: database schema, Hono server routes/handlers, and Next.js frontend fetchers",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Entity name (singular kebab-case, e.g. customer-order or settings-meta):",
        validate: (input: string) => {
          if (!input) return "name is required";
          if (input.includes(" ")) return "name cannot include spaces";
          if (input !== input.toLowerCase()) return "name must be lowercase";
          return true;
        },
      },
    ],
    actions: [
      // 1. Create DB Schema
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/db/src/schema/{{ kebabCase name }}.ts",
        templateFile: "templates/db-schema.ts.hbs",
      },
      // 2. Export DB Schema from packages/db/src/schema/index.ts
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/packages/db/src/schema/index.ts",
        pattern: /$/,
        template: 'export * from "./{{ kebabCase name }}";\n',
      },
      // 3. Create Server Route Definition
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/server/src/routes/{{ kebabCase name }}/{{ kebabCase name }}.routes.ts",
        templateFile: "templates/server-routes.ts.hbs",
      },
      // 4. Create Server Route Handlers
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/server/src/routes/{{ kebabCase name }}/{{ kebabCase name }}.handlers.ts",
        templateFile: "templates/server-handlers.ts.hbs",
      },
      // 5. Create Server Router Index
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/server/src/routes/{{ kebabCase name }}/{{ kebabCase name }}.index.ts",
        templateFile: "templates/server-index.ts.hbs",
      },
      // 6. Import and register server route in apps/server/src/app.ts
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/server/src/app.ts",
        pattern: /(import auditLogRouter from "@\/routes\/audit-log\/audit-logs\.index";)/,
        template: 'import {{ camelCase name }}Router from "@/routes/{{ kebabCase name }}/{{ kebabCase name }}.index";\n$1',
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/server/src/app.ts",
        pattern: /(const routes = \[[^\]]*)(Home[^\]]*)(] as const;)/,
        template: '$1$2, {{ camelCase name }}Router$3',
      },
      // 7. Create Frontend Web Data Client folder & files
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/web/src/data/{{ kebabCase name }}/get.ts",
        templateFile: "templates/web-data-get.ts.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/web/src/data/{{ kebabCase name }}/post.ts",
        templateFile: "templates/web-data-post.ts.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/web/src/data/{{ kebabCase name }}/delete.ts",
        templateFile: "templates/web-data-delete.ts.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/web/src/data/{{ kebabCase name }}/index.ts",
        templateFile: "templates/web-data-index.ts.hbs",
      },
    ],
  });
}
