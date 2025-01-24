fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc3MTAwMjYsImV4cCI6MTczODkxOTYyNn0.4qvaaW9aP5XmE6i5KsBpdZi6r0MX-o7yYHaaRQHzH2Y",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    data.forEach((product) => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
            <div class="card clickable-card" style="width: 18rem;">
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                <p class="card-text"><strong>Price:</strong> ${product.price}</p>
                <button class="btn btn-danger deleteBtn mb-1">Elimina</button>
                <a href="./backoffice.html/${product._id}" class="btn btn-primary changeBtn mb-1">Modifica</a>
              </div>
            </div>
          `;
      const clickableCard = card.querySelector(".clickable-card");
      clickableCard.addEventListener("click", (event) => {
        if (event.target.classList.contains("deleteBtn") || event.target.classList.contains("changeBtn")) {
          return;
        }

        console.log("Card cliccata con ID:", product._id);
        window.location.href = `/product-details.html?id=${product._id}`;
      });

      const deleteBtn = card.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("Pulsante Elimina cliccato per ID:", product._id);
      });

      cardContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Errore:", error));

const deleteBtns = document.querySelectorAll(".deleteBtn");
deleteBtns.forEach((btn, index) => {
  btn.onclick = function () {
    const cardToRemove = btn.closest(".col-md-4");
    cardContainer.removeChild(cardToRemove);

    fetch(`https://striveschool-api.herokuapp.com/api/product/${data[index]._id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc3MTAwMjYsImV4cCI6MTczODkxOTYyNn0.4qvaaW9aP5XmE6i5KsBpdZi6r0MX-o7yYHaaRQHzH2Y",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Prodotto eliminato con successo!");
        } else {
          console.error("Errore durante l'eliminazione del prodotto:", response.statusText);
        }
      })
      .catch((error) => console.error("Errore durante la richiesta DELETE:", error));
  };
});
