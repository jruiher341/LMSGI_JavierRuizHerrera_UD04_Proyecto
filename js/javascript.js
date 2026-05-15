function datosPerfil(datos) {

  document.getElementById('campo-nombre').textContent     = datos.nombre    || '*****';
  document.getElementById('campo-contrasena').textContent = datos.contrasena || '*****';
  document.getElementById('campo-direccion').textContent  = datos.direccion  || '*****';
  document.getElementById('campo-telefono').textContent   = datos.telefono   || '*****';
  document.getElementById('campo-fecha').textContent      = datos.fecha      || '*****';
  document.getElementById('campo-email').textContent      = datos.email      || '*****';

  if (datos.foto) {
    document.getElementById('foto-perfil').src = datos.foto;
  }
}

function obtenerUsuario() {

  fetch('https://randomuser.me/api/')
    .then(respuesta => respuesta.json())
    .then(data => {
      const user = data.results[0];

      const datosMapeados = {
        nombre: `${user.name.first} ${user.name.last}`,
        contrasena: user.login.password,
        direccion: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}`,
        telefono: user.phone,
        fecha: new Date(user.dob.date).toLocaleDateString(),
        email: user.email,
        foto: user.picture.large
      };

      datosPerfil(datosMapeados);
    })
    .catch(error => {
      console.error("Error al obtener el usuario:", error);
    });
}


// Esto hace que cada vez que se actualice la pagina se obtenga un usuario para rellenar los campos
obtenerUsuario();


// Activa la ultima funcion mencionada pero con el boton de "Siguiente usuario"
const reload = document.querySelector(".reload-user");

reload.addEventListener("click", () => {
  obtenerUsuario();
});