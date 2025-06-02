// URL base de la API
const API_URL = 'https://api.spacexdata.com/v5/launches';

// Obtenemos el parámetro 'id' de la URL
const params = new URLSearchParams(window.location.search);
const launchId = params.get('id');

// Obtenemos el contenedor donde se mostrarán los detalles
const container = document.getElementById('details-container');

// Hacemos la solicitud para obtener los datos del lanzamiento específico
fetch(`${API_URL}/${launchId}`)
  .then(res => res.json())
  .then(launch => {
    // Generamos el contenido HTML con los datos del lanzamiento
    const content = `
      <h1>${launch.name}</h1>
      <img src="${launch.links.patch.small || 'https://via.placeholder.com/150'}" alt="${launch.name}" />
      <p><strong>Detalles:</strong> ${launch.details || 'No hay detalles disponibles.'}</p>
      <p><strong>Vuelo #:</strong> ${launch.flight_number}</p>
      <p><strong>Fecha y hora de despegue:</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
      <p><strong>Fallas:</strong></p>
      <ul>
        ${
          launch.failures.length > 0
            ? launch.failures.map(f => `<li>${f.reason}</li>`).join('')
            : '<li>No hubo fallas</li>'
        }
      </ul>
      <a href="index.html">⬅ Volver</a>
    `;

    // Insertamos el contenido en el DOM
    container.innerHTML = content;
  })
  .catch(error => {
    console.error('Error al cargar los detalles:', error);
    container.innerHTML = '<p>Error al cargar los detalles del lanzamiento.</p>';
  });
