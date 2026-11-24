export function mostrarMensaje(container, texto, tipo = 'success') {
  if (!container) return;
  container.innerHTML = `<div class="msg msg--${tipo}">${texto}</div>`;
}

export function renderBadgeEstado(estado = '') {
  const limpio = String(estado).toLowerCase();
  return `<span class="badge badge--${limpio}">${estado}</span>`;
}