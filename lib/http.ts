import { config } from './config';
import { handleHttpError } from './interceptors';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
  method?: HttpMethod;
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
} & Omit<RequestInit, 'method' | 'body' | 'headers' | 'cache'>;

export async function http<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method, body, headers, cache, ...fetchOptions } = options;
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    method: method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: cache ?? 'no-cache',
    ...fetchOptions,
  });

  if (!response.ok) {
    await handleHttpError(response);
  }

  return response.json();
}
