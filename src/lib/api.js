const LOCAL_BACKEND_URL = 'http://localhost:5000';

export function getBackendBaseUrl() {
  const configured = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '');
  if (configured) return configured;

  if (window.location.hostname === 'localhost') {
    return LOCAL_BACKEND_URL;
  }

  return `${window.location.origin}/backend`;
}

export async function apiFetch(path, options = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${getBackendBaseUrl()}${normalizedPath}`;

  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'string'
      ? payload
      : payload?.error || payload?.message || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}
