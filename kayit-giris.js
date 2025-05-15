document.getElementById("kayitForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const ad = document.getElementById("ad").value;
  const email = document.getElementById("email").value;
  const sifre = document.getElementById("sifre").value;

  if (ad && email && sifre) {
    document.getElementById("kayitMessage").textContent = "Kayıt başarılı! Giriş yapabilirsiniz.";
  } else {
    document.getElementById("kayitMessage").textContent = "Lütfen tüm alanları doldurun!";
  }
});

document.getElementById("girisForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const girisEmail = document.getElementById("girisEmail").value;
  const girisSifre = document.getElementById("girisSifre").value;

  if (girisEmail && girisSifre) {
    document.getElementById("girisMessage").textContent = "Giriş başarılı! Hoş geldiniz.";
  } else {
    document.getElementById("girisMessage").textContent = "E-posta veya şifre hatalı!";
  }
});
