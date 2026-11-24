const EMPLEADOS_BASE_URL = 'http://127.0.0.1:8002/api/empleados';

export async function listarEmpleadosRequest(token, filtros = {}) {
  const params = new URLSearchParams();
  if (filtros.documento) params.set('documento', filtros.documento);
  if (filtros.area) params.set('area', filtros.area);
  if (filtros.estado) params.set('estado', filtros.estado);

  const query = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${EMPLEADOS_BASE_URL}${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return { status: response.status, data };
}