const INCAPACIDADES_BASE_URL = 'http://127.0.0.1:8003/api/incapacidades';

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function listarIncapacidadesRequest(token, filtros = {}) {
  const params = new URLSearchParams();
  if (filtros.empleado_id) params.set('empleado_id', filtros.empleado_id);
  if (filtros.estado) params.set('estado', filtros.estado);
  if (filtros.tipo) params.set('tipo', filtros.tipo);

  const query = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${INCAPACIDADES_BASE_URL}${query}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function obtenerIncapacidadRequest(token, id) {
  const response = await fetch(`${INCAPACIDADES_BASE_URL}/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function crearIncapacidadRequest(token, payload) {
  const response = await fetch(INCAPACIDADES_BASE_URL, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function actualizarIncapacidadRequest(token, id, payload) {
  const response = await fetch(`${INCAPACIDADES_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function cambiarEstadoIncapacidadRequest(token, id, estado) {
  const response = await fetch(`${INCAPACIDADES_BASE_URL}/${id}/estado`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ estado }),
  });

  const data = await response.json();
  return { status: response.status, data };
}