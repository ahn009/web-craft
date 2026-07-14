const configuredApiUrl = import.meta.env.VITE_API_URL?.trim() ?? '';

export const API_BASE_URL = configuredApiUrl.replace(/\/+$/, '');

export function apiUrl(endpoint: string) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${path}`;
}

export function getApiDisplayUrl() {
  return API_BASE_URL || 'same-origin API';
}
