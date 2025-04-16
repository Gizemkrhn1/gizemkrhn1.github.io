document.getElementById("filmForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const ad = document.getElementById("filmName").value;
    const tur = document.getElementById("filmGenre").value;
    const tarih = document.getElementById("filmDate").value;
    const durum = document.getElementById("watched").value;
    const poster = document.getElementById("filmPoster").value;
  
    const table = document.getElementById("filmList").querySelector("tbody");
    const row = table.insertRow();
  
    // Film bilgilerini tabloya ekliyoruz
    row.innerHTML = `
      <td>${ad}</td>
      <td>${tur}</td>
      <td>${tarih}</td>
      <td>${durum}</td>
      <td><img src="${poster}" alt="Poster" width="80"></td>
      <td><button class="deleteBtn">Sil</button></td> <!-- Sil butonunu buraya ekledik -->
    `;
  
    // Silme butonuna tıklama olayı ekliyoruz
    row.querySelector(".deleteBtn").addEventListener("click", function() {
      table.deleteRow(row.rowIndex);  // Silme işlemi
    });
  
    // İzlenmiş film kontrolü
    if (durum === "izledim") {
      alert("Bu filmi zaten izlemişsin! 🎬");
    }
  
    // Formu sıfırlıyoruz
    document.getElementById("filmForm").reset();
  });
  
  