const films = [
  { title: "Inception", description: "Rüya içinde rüya ve zihin bükücü aksiyon.", likes: 150, comments: 45, date: "2010-07-16" },
  { title: "The Shawshank Redemption", description: "Umudun, dostluğun ve özgürlüğün hikayesi.", likes: 200, comments: 60, date: "1994-09-23" },
  { title: "The Godfather", description: "Klasik mafia destanı.", likes: 180, comments: 55, date: "1972-03-24" },
  { title: "Pulp Fiction", description: "Kült film, keskin diyaloglar ve karanlık mizah.", likes: 130, comments: 40, date: "1994-10-14" },
  { title: "The Dark Knight", description: "Batman ve Joker arasındaki destansı mücadele.", likes: 210, comments: 75, date: "2008-07-18" },
  { title: "Forrest Gump", description: "Hayatın iniş çıkışlarını anlatan unutulmaz film.", likes: 170, comments: 50, date: "1994-07-06" },
  { title: "Fight Club", description: "Kendini keşfetme ve anarşi temalı film.", likes: 160, comments: 48, date: "1999-10-15" },
  { title: "Interstellar", description: "Uzay ve zaman yolculuğu.", likes: 190, comments: 65, date: "2014-11-07" },
  { title: "The Matrix", description: "Gerçeklik algısını sorgulatan bilim kurgu.", likes: 175, comments: 52, date: "1999-03-31" },
  { title: "Gladiator", description: "İntikam ve onurun epik hikayesi.", likes: 140, comments: 38, date: "2000-05-05" },
  { title: "The Lion King", description: "Bir aslanın büyüme hikayesi.", likes: 165, comments: 42, date: "1994-06-15" },
  { title: "The Prestige", description: "Sihirbazlar arasındaki rekabet.", likes: 120, comments: 33, date: "2006-10-20" },
  { title: "The Green Mile", description: "Mucizeler ve insanlık.", likes: 155, comments: 39, date: "1999-12-10" },
  { title: "Parasite", description: "Sosyal sınıflar arası çarpıcı gerilim.", likes: 130, comments: 44, date: "2019-05-30" },
  { title: "Joker", description: "Psikolojik drama ve toplumsal eleştiri.", likes: 145, comments: 47, date: "2019-10-04" },
  { title: "Titanic", description: "Efsanevi aşk ve trajedi hikayesi.", likes: 190, comments: 53, date: "1997-12-19" },
  { title: "The Avengers", description: "Süper kahramanlar bir arada!", likes: 160, comments: 41, date: "2012-05-04" },
  { title: "Harry Potter and the Sorcerer's Stone", description: "Büyücülük dünyasının başlangıcı.", likes: 175, comments: 50, date: "2001-11-16" },
  { title: "The Social Network", description: "Facebook'un kuruluş hikayesi.", likes: 110, comments: 27, date: "2010-10-01" },
  { title: "Guardians of the Galaxy", description: "Eğlenceli galaksi macerası.", likes: 125, comments: 35, date: "2014-08-01" },
  { title: "The Hobbit", description: "Orta Dünya'da yeni bir macera.", likes: 115, comments: 29, date: "2012-12-14" },
  { title: "Mad Max: Fury Road", description: "Çılgın aksiyon ve çorak topraklar.", likes: 135, comments: 32, date: "2015-05-15" },
  { title: "La La Land", description: "Müzikal ve aşk hikayesi.", likes: 130, comments: 31, date: "2016-12-09" },
  { title: "The Wolf of Wall Street", description: "Para, hırs ve skandal.", likes: 120, comments: 30, date: "2013-12-25" },
  { title: "Black Panther", description: "Kara Panter ve Wakanda efsanesi.", likes: 140, comments: 36, date: "2018-02-16" },
  { title: "Avengers: Endgame", description: "Sonsuzluk savaşının finali.", likes: 210, comments: 70, date: "2019-04-26" },
  { title: "Spider-Man: Into the Spider-Verse", description: "Çoklu evren animasyonu.", likes: 150, comments: 40, date: "2018-12-14" },
  { title: "Coco", description: "Aile ve müzik temalı animasyon.", likes: 125, comments: 28, date: "2017-11-22" },
  { title: "Jumanji: Welcome to the Jungle", description: "Macera dolu oyun dünyası.", likes: 110, comments: 22, date: "2017-12-20" },
  { title: "Deadpool", description: "Süper kahraman mizahı.", likes: 140, comments: 34, date: "2016-02-12" }
];

const filmList = document.getElementById('film-list');
const sortSelect = document.getElementById('sort-select');

function renderFilms(filmsToRender) {
  filmList.innerHTML = '';

  filmsToRender.forEach(film => {
    const filmDiv = document.createElement('div');
    filmDiv.className = 'film-item';

    filmDiv.innerHTML = `
      <h3>${film.title}</h3>
      <p>${film.description}</p>
      <div class="film-meta">
        <span>👍 ${film.likes}</span>
        <span>💬 ${film.comments}</span>
        <span>📅 ${new Date(film.date).toLocaleDateString('tr-TR')}</span>
      </div>
    `;

    filmList.appendChild(filmDiv);
  });
}

function sortFilms(criteria) {
  let sortedFilms = [...films];

  if (criteria === 'newest') {
    sortedFilms.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === 'most-liked') {
    sortedFilms.sort((a, b) => b.likes - a.likes);
  } else if (criteria === 'most-commented') {
    sortedFilms.sort((a, b) => b.comments - a.comments);
  }

  return sortedFilms;
}

// Sayfa açıldığında en yeni filmler gösterilsin
renderFilms(sortFilms('newest'));

sortSelect.addEventListener('change', () => {
  const selected = sortSelect.value;
  renderFilms(sortFilms(selected));
});

