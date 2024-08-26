
const tarjeta = document.querySelector('.conteiner-gallery');
const url = './books.json'

function colocarImagenes() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.library.forEach(element => {
        const img = document.createElement('img')
        /* img.dataset.id = element.book.ISBN; */
        img.src = element.book.cover;
        img.className = 'seleccion-img'
        tarjeta.appendChild(img);
      });
      /* console.log(data) */
    })
}

function moverAlectura() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      /* const botontarjeta = document.querySelector('.seleccion-img')
      console.log(botontarjeta,"log botontarjeta") */
      const selectTargeta = document.querySelector('.conteiner-lectura')
      tarjeta.addEventListener('click', e => {
        if (e.target.nodeName === 'IMG') {
          const capturarimg = e.target;
          console.log('seleccionaste la imagen: ', capturarimg) //aca selecciono la imagen
          console.log("quiero crear un boton en la imagen")
          const img = document.createElement('img');
          img.className = 'conteiner-lectura';
          selectTargeta.appendChild(capturarimg);
          /* capturarimg.forEach(element => {
            /* console.log("aca entro?")
            img.src = element.book.cover;
            img.className = 'conteiner-lectura';
            selectTargeta.appendChild(img); 
          }); */
        }
        else {
          console.log("nada")
        }
      })
    })
}

function moverAlibreria() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const TargetaLectura = document.querySelector('.conteiner-lectura')
      const tarjetaLibreria = document.querySelector('.conteiner-gallery')
      if (TargetaLectura.length === 0) {
        const Vacio = document.createElement('H3')
        Vacio.textContent = ("No hay ningun libro en lectura")
        TargetaLectura.appendChild(Vacio) 
      } else {
        TargetaLectura.addEventListener('click', e => {
          if (e.target.nodeName === 'IMG') {
            const capturarimg = e.target;
            console.log('seleccionaste libro de seccion lectura: ', capturarimg) //aca selecciono la imagen
            const img = document.createElement('img'); //creo el elemento img
            img.className = 'conteiner-lectura';
            tarjetaLibreria.appendChild(capturarimg); //le doy la imagen al conteiner libreria
          }
          else {
            console.log("nada")
          }
        })

      }
    })
}

const GenreSelect = document.getElementById('desplegable');
function filtrarGenero() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const generosUnicos = [];
      data.library.forEach(element => {
        const genero = element.book.genre;
        if (!generosUnicos.includes(genero)) {
          generosUnicos.push(genero)
          const opc = document.createElement('option');
          opc.value = genero;
          opc.textContent = genero;
          GenreSelect.appendChild(opc);
        }
      })
    })
}
/* OBTENGO GENEROS REPETIDOS Y LOS PONGO EN EL SELECT 
 const GenreSelect = document.getElementById('desplegable');
  function filtrarGenero(){
    fetch (url)
     .then(res => res.json())
     .then(data => {
      data.library.forEach(element => {
       const opc = document.createElement('option') 
       const genero = element.book.genre;
       opc.value = genero;
       opc.textContent= genero;
       GenreSelect.appendChild(opc); 
      });
    })   
  } */



/* const tarjeta = document.querySelector('.conteiner-lectura'); */
function seleccionarGenero() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const generos = document.getElementById('desplegable'); //elemento html desplegable

      generos.addEventListener('change', () => {
        const capturarGenero = generos.value; //capturo los géneros de los options
        tarjeta.innerHTML = ''; //limpio el contenedor

        console.log("Género seleccionado:", capturarGenero);

        // Filtrar los libros por el género seleccionado
        const librosFiltrados = data.library.filter(element => element.book.genre === capturarGenero);

        // Mostrar las imágenes de los libros filtrados
        librosFiltrados.forEach(element => {
          const img = document.createElement('img');
          img.src = element.book.cover;
          img.className = 'seleccion-img';
          tarjeta.appendChild(img);
        });

        // Si no se encuentran libros para el género seleccionado
        if (librosFiltrados.length === 0) {
           tarjeta.innerHTML = '<p>No se encontraron libros para este género.</p>'; 
        }
      });
    });
}





colocarImagenes();
moverAlectura();
moverAlibreria();
filtrarGenero();
seleccionarGenero();
