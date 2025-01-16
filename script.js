document.addEventListener("DOMContentLoaded", () => {
    fetch("news.json")
        .then(response => response.json())
        .then(data => {
            const noticiasContenido = document.getElementById("noticias-contenido");
            data.forEach(noticia => {
                const noticiaDiv = document.createElement("div");
                noticiaDiv.classList.add("noticia");
                noticiaDiv.innerHTML = `
                    <h3><a href="noticia.html?slug=${noticia.slug}">${noticia.title}</a></h3>
                    <p>${noticia.description}</p>
                    <small>${new Date(noticia.date).toLocaleDateString()}</small>
                `;
                noticiasContenido.appendChild(noticiaDiv);
            });
        })
        .catch(error => console.error("Error cargando noticias:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");

    fetch("news.json")
        .then(response => response.json())
        .then(data => {
            const noticia = data.find(item => item.slug === slug);
            const detalleNoticia = document.getElementById("detalle-noticia");

            if (noticia) {
                detalleNoticia.innerHTML = `
                    <h2>${noticia.title}</h2>
                    <p><em>${new Date(noticia.date).toLocaleDateString()}</em></p>
                    <p>${noticia.content}</p>
                `;
            } else {
                detalleNoticia.innerHTML = "<p>La noticia no fue encontrada.</p>";
            }
        })
        .catch(error => console.error("Error cargando la noticia:", error));
});

// Ruta al archivo JSON de la agenda
const agendaFilePath = 'agenda.json';

// Cargar la agenda y mostrarla
function cargarAgenda() {
    fetch(agendaFilePath)
        .then(response => response.json())
        .then(data => {
            const agendaList = document.getElementById('agenda-list');
            agendaList.innerHTML = '';
            data.forEach(evento => {
                const eventElement = document.createElement('div');
                eventElement.className = 'agenda-evento';
                eventElement.innerHTML = `
                    <h3>${evento.titulo}</h3>
                    <p><strong>Fecha:</strong> ${evento.fecha}</p>
                    <p><strong>Hora:</strong> ${evento.hora}</p>
                    <p><strong>Lugar:</strong> ${evento.lugar}</p>
                    <p>${evento.descripcion}</p>
                `;
                agendaList.appendChild(eventElement);
            });
        })
        .catch(error => console.error('Error al cargar la agenda:', error));
}

// Ejecutar la función al cargar la página
cargarAgenda();

