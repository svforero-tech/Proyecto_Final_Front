import { loginRequest, logoutRequest } from './services/auth_service.js';
import { mostrarMensaje } from './components/ui_components.js';

const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('loginSection');
const navbar = document.getElementById('navbar');
const btnLogout = document.getElementById('btnLogout');
const alertBox = document.getElementById('alertBox');

function actualizarEstadoVista() {
  const token = localStorage.getItem('token');
  const autenticado = Boolean(token);

  loginSection.style.display = autenticado ? 'none' : 'block';
  navbar.style.display = autenticado ? 'block' : 'none';

  if (autenticado) {
    document.getElementById('empleadosSection').style.display = 'block';
    document.dispatchEvent(new CustomEvent('sesion:activa'));
  } else {
    document.getElementById('empleadosSection').style.display = 'none';
    document.getElementById('incapacidadesSection').style.display = 'none';
    document.getElementById('seguimientoSection').style.display = 'none';
  }
}

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const identificador = document.getElementById('identificador').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  if (!identificador || !contrasena) {
    mostrarMensaje(alertBox, 'Complete usuario/correo y contraseña.', 'error');
    return;
  }

  try {
    const { status, data } = await loginRequest(identificador, contrasena);
    if (status === 200 && data.ok && data.data?.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('usuario', JSON.stringify(data.data.usuario));
      mostrarMensaje(alertBox, data.mensaje || 'Sesión iniciada.', 'success');
      loginForm.reset();
      actualizarEstadoVista();
    } else {
      mostrarMensaje(alertBox, data.mensaje || 'No fue posible iniciar sesión.', 'error');
    }
  } catch {
    mostrarMensaje(alertBox, 'Error de conexión con ms-auth.', 'error');
  }
});

btnLogout?.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  try {
    if (token) {
      await logoutRequest(token);
    }
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    mostrarMensaje(alertBox, 'Sesión cerrada.', 'success');
    actualizarEstadoVista();
  }
});

navbar?.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-view]');
  if (!btn) return;
  const vista = btn.dataset.view;

  ['empleados', 'incapacidades', 'seguimiento'].forEach((nombre) => {
    const sec = document.getElementById(`${nombre}Section`);
    if (sec) sec.style.display = nombre === vista ? 'block' : 'none';
  });
});

actualizarEstadoVista();