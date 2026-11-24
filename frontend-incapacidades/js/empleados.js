import { listarEmpleadosRequest } from './services/empleados_service.js';
import { mostrarMensaje, renderBadgeEstado } from './components/ui_components.js';

const listaContainer = document.getElementById('empleadosLista');
const alertBox = document.getElementById('alertBox');

export async function cargarEmpleados() {
  const token = localStorage.getItem('token');
  if (!token || !listaContainer) return;

  try {
    const { status, data } = await listarEmpleadosRequest(token);
    if (status !== 200 || !data.ok) {
      mostrarMensaje(alertBox, data.mensaje || 'No se pudieron cargar los empleados.', 'error');
      return;
    }

    const empleados = data.data || [];
    if (empleados.length === 0) {
      listaContainer.innerHTML = '<p>No hay empleados registrados.</p>';
      return;
    }

    const filas = empleados
      .map(
        (emp) => `
          <tr>
            <td>${emp.documento}</td>
            <td>${emp.nombres} ${emp.apellidos}</td>
            <td>${emp.cargo}</td>
            <td>${emp.area}</td>
            <td>${renderBadgeEstado(emp.estado)}</td>
          </tr>
        `
      )
      .join('');

    listaContainer.innerHTML = `
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre completo</th>
            <th>Cargo</th>
            <th>Área</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    `;
  } catch {
    mostrarMensaje(alertBox, 'Error de conexión con ms-empleados.', 'error');
  }
}

document.addEventListener('sesion:activa', cargarEmpleados);
if (localStorage.getItem('token')) {
  cargarEmpleados();
}