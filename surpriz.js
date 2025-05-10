const films = [
  {
    title: "The Platform",
    description: "Bir hapishane kulesinde her katta iki kişi, yukarıdan aşağıya inen bir yemek platformuyla hayatta kalmaya çalışır. Gerilim ve sınıf ayrımını konu alır.",
    imdb: "7.0"
  },
  {
    title: "Coherence",
    description: "Bir kuyruklu yıldızın geçişi sırasında bir grup arkadaşın gerçeklik algıları bozulur. Zekice kurgulanmış bir bilimkurgu-gerilim filmi.",
    imdb: "7.2"
  },
  {
    title: "The Fall",
    description: "1920’lerde Los Angeles’ta bir hastanede kalan küçük bir kız ve bir dublörün hayal gücüyle örülü muhteşem bir masal dünyası.",
    imdb: "7.8"
  },
  {
    title: "The Handmaiden",
    description: "Bir dolandırıcılık planı, ihanetler ve sapkın arzularla örülü Güney Kore yapımı, görsel olarak etkileyici bir psikolojik gerilim.",
    imdb: "8.1"
  },
  {
    title: "Sound of Metal",
    description: "İşitme yetisini kaybeden bir bateristin müziğe ve hayata tutunma çabası. Derin ve duygusal bir yolculuk.",
    imdb: "7.8"
  }
];

const btn = document.getElementById('btn');
const container = document.getElementById('film-container');

btn.addEventListener('click', () => {
  const film = films[Math.floor(Math.random() * films.length)];
  container.innerHTML = `
    <h2>${film.title}</h2>
    <p>${film.description}</p>
    <strong>IMDb: ${film.imdb}</strong>
  `;
  container.classList.remove('hidden');
});
