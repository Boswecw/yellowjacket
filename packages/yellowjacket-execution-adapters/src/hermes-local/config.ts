export interface HermesLocalClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeoutMs?: number;
}

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}
