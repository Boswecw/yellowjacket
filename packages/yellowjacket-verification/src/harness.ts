import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import type { ErrorObject } from "ajv";

const require = createRequire(import.meta.url);
const ajv2020Module = require("ajv/dist/2020");
const addFormatsModule = require("ajv-formats");

type ValidateFunctionLike = ((data: unknown) => boolean) & {
  errors?: ErrorObject[] | null;
};

type AjvLike = {
  compile: (schema: object) => ValidateFunctionLike;
};

type AjvConstructorLike = new (options?: Record<string, unknown>) => AjvLike;
type AddFormatsLike = (ajv: AjvLike) => unknown;

const Ajv2020 = (ajv2020Module.default ?? ajv2020Module) as AjvConstructorLike;
const addFormats = (addFormatsModule.default ?? addFormatsModule) as AddFormatsLike;

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const schemaCache = new Map<string, object>();
const validatorCache = new Map<string, ValidateFunctionLike>();

function loadSchema(schemaFileName: string): object {
  const cached = schemaCache.get(schemaFileName);
  if (cached) return cached;

  const schemaPath = path.resolve(process.cwd(), "packages/yellowjacket-contracts/schemas", schemaFileName);
  const raw = fs.readFileSync(schemaPath, "utf-8");
  const schema = JSON.parse(raw) as object;
  schemaCache.set(schemaFileName, schema);
  return schema;
}

function getValidator(schemaFileName: string): ValidateFunctionLike {
  const cached = validatorCache.get(schemaFileName);
  if (cached) return cached;

  const schema = loadSchema(schemaFileName);
  const validator = ajv.compile(schema);
  validatorCache.set(schemaFileName, validator);
  return validator;
}

function formatSchemaError(error: ErrorObject): string {
  return `${error.instancePath || "/"} ${error.message ?? "schema error"}`;
}

export function validateArtifact(schemaFileName: string, payload: unknown): { valid: boolean; errors: string[] } {
  const validate = getValidator(schemaFileName);
  const valid = validate(payload);

  return {
    valid: Boolean(valid),
    errors: (validate.errors ?? []).map(formatSchemaError)
  };
}