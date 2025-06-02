// URL base de la API de lanzamientos
const API_URL = 'https://api.spacexdata.com/v5/launches';

// Obtenemos el contenedor donde se agregarán las cards
const container = document.getElementById('launches-container');

// Hacemos la solicitud a la API
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    // Por cada lanzamiento, creamos una card
    data.forEach(launch => {
      const card = document.createElement('div');
      card.className = 'card';

      // Imagen del parche de la misión
      const img = document.createElement('img');
      img.src = launch.links.patch.small || 'https://via.placeholder.com/150';
      img.alt = launch.name;

      // Al hacer clic en la imagen, redirige a la vista de detalle
      img.addEventListener('click', () => {
        window.location.href = `details.html?id=${launch.id}`;
      });

      // Nombre del lanzamiento
      const title = document.createElement('h3');
      title.textContent = launch.name;

      // Agregamos la imagen y el título a la card
      card.appendChild(img);
      card.appendChild(title);

      // Agregamos la card al contenedor principal
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error al cargar los lanzamientos:', error);
    container.innerHTML = '<p>Error al cargar los datos.</p>';
  });
