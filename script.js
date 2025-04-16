// Filmleri sayfada gösterme
function displayFilms() {
  const filmList = document.getElementById("filmList").querySelector("tbody");
  filmList.innerHTML = ''; // Önceki filmleri temizle
  const films = JSON.parse(localStorage.getItem('films')) || []; // LocalStorage'dan filmleri al

  films.forEach(film => {
    const row = filmList.insertRow();
    row.innerHTML = `
      <td>${film.name}</td>
      <td>${film.genre}</td>
      <td>${film.date}</td>
      <td>${film.status}</td>
      <td><img src="${film.poster}" alt="Poster" width="80"></td>
      <td><button class="deleteBtn">Sil</button></td> <!-- Sil butonunu buraya ekledik -->
    `;
    
    // Silme butonuna tıklama olayı ekliyoruz
    row.querySelector(".deleteBtn").addEventListener("click", function() {
      deleteFilm(film.name);  // Silme işlemi
      row.remove();  // Tablodan satırı sil
    });
  });
}

// Film ekleme
document.getElementById("filmForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const ad = document.getElementById("filmName").value;
  const tur = document.getElementById("filmGenre").value;
  const tarih = document.getElementById("filmDate").value;
  const durum = document.getElementById("watched").value;
  const poster = document.getElementById("filmPoster").value;

  // Yeni film objesini oluştur
  const newFilm = {
    name: ad,
    genre: tur,
    date: tarih,
    status: durum,
    poster: poster
  };

  // LocalStorage'dan filmleri al
  const films = JSON.parse(localStorage.getItem('films')) || [];
  films.push(newFilm);  // Yeni filmi ekle
  localStorage.setItem('films', JSON.stringify(films));  // LocalStorage'a kaydet

  // Sayfayı güncelle
  displayFilms();

  // Formu sıfırlıyoruz
  document.getElementById("filmForm").reset();
});

// Film silme işlemi
function deleteFilm(name) {
  const films = JSON.parse(localStorage.getItem('films')) || [];
  const updatedFilms = films.filter(film => film.name !== name);  // Silinen filmi listeden çıkar
  localStorage.setItem('films', JSON.stringify(updatedFilms));  // Yeni listeyi localStorage'a kaydet
}

// Sayfa yüklendiğinde filmleri göster
window.onload = displayFilms;

  
  