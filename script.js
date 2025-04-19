// Firebase yapılandırması ve Firestore bağlantısı
const firebaseConfig = {
  apiKey: "AIzaSyAIaHgcDNQ2rTLb1YJ32mUJwCASWDGBffI",
  authDomain: "film-rehberi.firebaseapp.com",
  projectId: "film-rehberi",
  storageBucket: "film-rehberi.appspot.com",
  messagingSenderId: "635298137027",
  appId: "1:635298137027:web:b654a847db2bdbbbdab376",
  measurementId: "G-R94S8D622M"
};

// Firebase'i başlatıyoruz
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

// Firestore veritabanını başlatıyoruz
const db = firebase.firestore();

// Filmleri sayfada gösterme (Firestore'dan alıp, tabloya eklemek)
function displayFilms() {
  const filmList = document.getElementById("filmList").querySelector("tbody");
  filmList.innerHTML = ''; // Önceki filmleri temizle

  // Firestore'dan filmleri alıyoruz
  db.collection("films").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const film = doc.data();
        const row = filmList.insertRow();
        row.innerHTML = `
          <td>${film.name}</td>
          <td>${film.genre}</td>
          <td>${film.date}</td>
          <td>${film.status}</td>
          <td><img src="${film.poster}" alt="Poster" width="80"></td>
          <td><button class="deleteBtn">Sil</button></td>
        `;
        
        // Silme butonuna tıklama olayı ekliyoruz
        row.querySelector(".deleteBtn").addEventListener("click", function() {
          deleteFilm(doc.id);  // Firebase'den silme işlemi
          row.remove();  // Tablodan satırı sil
        });
      });
    })
    .catch((error) => {
      console.error("Veriler alınırken bir hata oluştu: ", error);
    });
}

// Film ekleme fonksiyonu (Firebase'e veri ekleme)
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

  // Film verisini Firestore'a ekliyoruz
  db.collection("films").add(newFilm)
    .then(() => {
      console.log("Film başarıyla Firestore'a eklendi!");
      displayFilms(); // Sayfayı güncelle
    })
    .catch((error) => {
      console.error("Film eklenirken bir hata oluştu: ", error);
    });

  // Formu sıfırlıyoruz
  document.getElementById("filmForm").reset();
});

// Film silme işlemi (Firebase'den)
function deleteFilm(id) {
  db.collection("films").doc(id).delete()
    .then(() => {
      console.log("Film başarıyla silindi");
      displayFilms(); // Sayfayı güncelle
    })
    .catch((error) => {
      console.error("Silme sırasında hata oluştu: ", error);
    });
}

// Sayfa yüklendiğinde filmleri göster
window.onload = displayFilms;
