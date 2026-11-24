const AUTH_BASE_URL = 'http://127.0.0.1:8001/api/auth';

export async function loginRequest(identificador, contrasena) {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: identificador, contrasena }),
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function logoutRequest(token) {
  const response = await fetch(`${AUTH_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return { status: response.status, data };
}