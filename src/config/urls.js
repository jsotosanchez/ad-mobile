const URLBASE = 'http://192.168.0.66:8080';
const URLS = {
  especialidades: `${URLBASE}/especialidades`,
  colaDeEspera: `${URLBASE}/colaDeEspera`,
  turnos: `${URLBASE}/turnos`,
  usuarios: `${URLBASE}/usuarios`,
  notificaciones: `${URLBASE}/notificaciones`,
};

// paciente

// mis turnos
export const urlTurnosDePaciente = (id) => {
  return `${URLS.turnos}/paciente/${id}`;
};
export const urlTurnosConfirmar = (id) => {
  return `${URLS.turnos}/${id}/confirmar`;
};
export const urlTurnosCancelar = (id) => {
  return `${URLS.turnos}/${id}/cancelar`;
};
// fin mis turnos

// reservar turno
export const urlMedicosPorEspecialidad = (id) => {
  return `${URLS.usuarios}/especialidades/${id}`;
};

export const urlEspecialidades = () => {
  return URLS.especialidades;
};

export const urlTurnosDisponibles = (especialidad) => {
  return `${URLS.turnos}/especialidades/${especialidad}`;
};

export const urlReservarTurno = (id) => {
  return `${URLS.turnos}/${id}/reservar`;
};

export const urlColaDeEspera = () => {
  return `${URLS.colaDeEspera}`;
};
// fin reservar turno

// urls de notificaciones
export const urlNotificacionesDeUsuario = (id) => {
  return `${URLS.notificaciones}/usuario/${id}`;
};

export const urlMarcarNotificacionLeida = (id) => {
  return `${URLS.notificaciones}/${id}/marcarLeida`;
};
// fin urls de notificaciones

// medico

// turnos del medico
export const urlTurnosDeMedico = (id, fecha) => {
  return `${URLS.turnos}/medico/${id}/dia/${fecha}`;
};

export const urlBorrarTurno = (id) => {
  return `${URLS.turnos}/${id}`;
};
// fin de turnos del medico

// cargar agenda
export const urlEspecialidadesDeMedico = (id) => {
  return `${URLS.usuarios}/${id}/especialidades`;
};
export const urlPostAgenda = () => {
  return `${URLS.turnos}`;
};

// fin cargar agenda

// editar agenda

export const urlDiasPorMedico = (id) => {
  return `${URLS.turnos}/medico/${id}/dias`;
};

export const urlBorrarTurnosPorDia = (id, dia) => {
  return `${URLS.turnos}/medico/${id}/dia/${dia}`;
};
// fin editar agenda
