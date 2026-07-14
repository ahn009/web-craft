type ImportMetaWithEnv = ImportMeta & {
  env?: {
    VITE_API_URL?: string;
  };
};

export function normalizeApiBaseUrl(value: string | undefined) {
  return (value?.trim() ?? '').replace(/\/+$/, '');
}

export function buildApiUrl(baseUrl: string, endpoint: string) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
}

const configuredApiUrl = (import.meta as ImportMetaWithEnv).env?.VITE_API_URL;

export const API_BASE_URL = normalizeApiBaseUrl(configuredApiUrl);

export function apiUrl(endpoint: string) {
  return buildApiUrl(API_BASE_URL, endpoint);
}

export function getApiDisplayUrl() {
  return API_BASE_URL || 'same-origin API';
}
