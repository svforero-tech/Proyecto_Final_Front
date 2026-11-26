const SEGUIMIENTO_BASE_URL = 'http://127.0.0.1:8004/api/seguimientos';

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function listarSeguimientosRequest(token, filtros = {}) {
  const params = new URLSearchParams();
  if (filtros.incapacidad_id) params.set('incapacidad_id', filtros.incapacidad_id);
  if (filtros.estado_seguimiento) params.set('estado_seguimiento', filtros.estado_seguimiento);

  const query = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${SEGUIMIENTO_BASE_URL}${query}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function listarSeguimientosPorIncapacidadRequest(token, incapacidadId) {
  const response = await fetch(`${SEGUIMIENTO_BASE_URL}/incapacidad/${incapacidadId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return { status: response.status, data };
}

export async function crearSeguimientoRequest(token, payload) {
  const response = await fetch(SEGUIMIENTO_BASE_URL, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { status: response.status, data };
}