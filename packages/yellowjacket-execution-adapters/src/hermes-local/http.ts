import { HermesAdapterError } from "./errors";

export interface FetchResponseLike {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
  text(): Promise<string>;
}

export interface FetchInitLike {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export type FetchLike = (url: string, init?: FetchInitLike) => Promise<FetchResponseLike>;

export function joinUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function buildHeaders(apiKey?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  return headers;
}

async function parseJson<T>(response: FetchResponseLike): Promise<T> {
  return (await response.json()) as T;
}

export async function getJson<T>(
  fetcher: FetchLike,
  url: string,
  headers: Record<string, string>,
): Promise<T> {
  const response = await fetcher(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new HermesAdapterError(
      `GET ${url} failed with status ${response.status}`,
      "transport_error",
    );
  }

  return parseJson<T>(response);
}

export async function postJson<TRequest, TResponse>(
  fetcher: FetchLike,
  url: string,
  body: TRequest,
  headers: Record<string, string>,
): Promise<TResponse> {
  const response = await fetcher(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new HermesAdapterError(
      `POST ${url} failed with status ${response.status}`,
      "transport_error",
    );
  }

  return parseJson<TResponse>(response);
}
