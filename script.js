// Firebase modüllerini yüklüyoruz
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyAIaHgcDNQ2rTLb1YJ32mUJwCASWDGBffI",
  authDomain: "film-rehberi.firebaseapp.com",
  projectId: "film-rehberi",
  storageBucket: "film-rehberi.appspot.com",
  messagingSenderId: "635298137027",
  appId: "1:635298137027:web:b654a847db2bdbbbdab376",
  measurementId: "G-R94S8D622M"
};

// Firebase ve Firestore başlatılıyor
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Filmleri ekrana yazdırma
function displayFilms() {
  const filmList = document.getElementById("filmList").querySelector("tbody");
  filmList.innerHTML = '';

  getDocs(collection(db, "films"))
    .then((querySnapshot) => {
      querySnapshot.forEach((docu) => {
        const film = docu.data();
        const row = filmList.insertRow();
        row.innerHTML = `
          <td>${film.name}</td>
          <td>${film.genre}</td>
          <td>${film.releaseDate}</td>
          <td>${film.watched}</td>
          <td><img src="${film.poster}" alt="Poster" width="80"></td>
          <td><button class="deleteBtn">Sil</button></td>
        `;

        row.querySelector(".deleteBtn").addEventListener("click", function () {
          deleteFilm(docu.id);
          row.remove();
        });
      });
    })
    .catch((error) => {
      console.error("Veriler alınırken hata:", error);
    });
}

// Film ekleme işlemi
document.getElementById("filmForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("filmName").value;
  const genre = document.getElementById("filmGenre").value;
  const releaseDate = document.getElementById("filmDate").value;
  const watched = document.getElementById("watched").value;
  const poster = document.getElementById("filmPoster").value;

  const newFilm = {
    name,
    genre,
    releaseDate,
    watched,
    poster
  };

  addDoc(collection(db, "films"), newFilm)
    .then(() => {
      console.log("Film eklendi!");
      document.getElementById("filmForm").reset();
      displayFilms();
    })
    .catch((error) => {
      console.error("Film eklenirken hata oluştu:", error);
    });
});

// Film silme fonksiyonu
function deleteFilm(id) {
  deleteDoc(doc(db, "films", id))
    .then(() => {
      console.log("Film silindi");
      displayFilms();
    })
    .catch((error) => {
      console.error("Silme sırasında hata:", error);
    });
}

// Sayfa yüklenince filmleri göster
window.onload = displayFilms;
