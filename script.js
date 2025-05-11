const filmForm = document.getElementById('film-form');

filmForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const filmAd = document.getElementById('film-ad').value;
  const filmTur = document.getElementById('film-tur').value;
  const filmTarih = document.getElementById('film-tarih').value;
  const filmAciklama = document.getElementById('film-aciklama').value;
  const filmPosterFile = document.getElementById('film-poster').files[0];

  if (filmPosterFile) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const posterURL = reader.result;

      addFilmToLocalStorage(posterURL);
    };
    reader.readAsDataURL(filmPosterFile);
  } else {
    addFilmToLocalStorage('');
  }

  function addFilmToLocalStorage(posterURL) {
    const yeniFilm = {
      ad: filmAd,
      tur: filmTur,
      tarih: filmTarih,
      aciklama: filmAciklama,
      poster: posterURL || 'default.jpg'
    };

    let filmler = JSON.parse(localStorage.getItem('filmler')) || [];
    filmler.push(yeniFilm);
    localStorage.setItem('filmler', JSON.stringify(filmler));

    filmForm.reset();
    alert('Film başarıyla eklendi!');
    listeleFilmleri();
  }
});

// Film listeleme fonksiyonu
const filmListesiDiv = document.getElementById('film-listesi');

function listeleFilmleri() {
  const filmler = JSON.parse(localStorage.getItem('filmler')) || [];
  filmListesiDiv.innerHTML = '';

  filmler.forEach((film, index) => {
    const filmDiv = document.createElement('div');
    filmDiv.classList.add('film');

    filmDiv.innerHTML = `
      <h3>${film.ad}</h3>
      <p><strong>Tür:</strong> ${film.tur}</p>
      <p><strong>Yayın Tarihi:</strong> ${film.tarih}</p>
      <p><strong>Açıklama:</strong> ${film.aciklama}</p>
      <img src="${film.poster}" alt="${film.ad}" class="film-poster">
      <button class="sil-buton" data-index="${index}">Sil</button>
    `;

    filmListesiDiv.appendChild(filmDiv);
  });

  const silButonlari = document.querySelectorAll('.sil-buton');
  silButonlari.forEach(buton => {
    buton.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      silFilm(index);
    });
  });
}

function silFilm(index) {
  let filmler = JSON.parse(localStorage.getItem('filmler')) || [];
  filmler.splice(index, 1);
  localStorage.setItem('filmler', JSON.stringify(filmler));
  listeleFilmleri();
  alert('Film başarıyla silindi!');
}

listeleFilmleri();
