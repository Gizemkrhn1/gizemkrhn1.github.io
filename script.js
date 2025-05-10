document.addEventListener("DOMContentLoaded", function () {

  // Film ekleme formu
  const filmForm = document.getElementById('film-form');

  filmForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Sayfanın yenilenmesini engeller

    // Formdan alınan veriler
    const filmAd = document.getElementById('film-ad').value;
    const filmTur = document.getElementById('film-tur').value;
    const filmTarih = document.getElementById('film-tarih').value;
    const filmAciklama = document.getElementById('film-aciklama').value;
    const filmPoster = document.getElementById('film-poster').files[0]; // Poster dosyasını al

    // FileReader kullanarak poster resmini base64 formatında oku
    let posterURL = '';
    if (filmPoster) {
      const reader = new FileReader();
      reader.onloadend = function () {
        posterURL = reader.result;
        addFilmToLocalStorage();
      };
      reader.readAsDataURL(filmPoster);
    } else {
      addFilmToLocalStorage(); // Poster yoksa filmi ekle
    }

    // LocalStorage'a film ekleme işlemi
    function addFilmToLocalStorage() {
      const yeniFilm = {
        ad: filmAd,
        tur: filmTur,
        tarih: filmTarih,
        aciklama: filmAciklama,
        poster: posterURL
      };

      let filmler = JSON.parse(localStorage.getItem('filmler')) || [];
      filmler.push(yeniFilm);
      localStorage.setItem('filmler', JSON.stringify(filmler));

      filmForm.reset();
      alert('Film başarıyla eklendi!');
      listeleFilmleri(); // Filmi listele
    }
  });

  // Film listesini sayfada görüntüle
  const filmListesiDiv = document.getElementById('film-listesi');
  
  function listeleFilmleri() {
    const filmler = JSON.parse(localStorage.getItem('filmler')) || [];
    filmListesiDiv.innerHTML = ''; // Önceki listeleri temizle
    
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

    // Silme butonlarına tıklama olayı ekle
    const silButonlari = document.querySelectorAll('.sil-buton');
    silButonlari.forEach(buton => {
      buton.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        silFilm(index);
      });
    });
  }

  // Film silme işlemi
  function silFilm(index) {
    let filmler = JSON.parse(localStorage.getItem('filmler')) || [];
    filmler.splice(index, 1); // Belirtilen index'teki filmi sil
    localStorage.setItem('filmler', JSON.stringify(filmler));
    listeleFilmleri(); // Listeleri tekrar güncelle
    alert('Film başarıyla silindi!');
  }

  // Sayfa yüklendiğinde filmleri listele
  listeleFilmleri();

});
