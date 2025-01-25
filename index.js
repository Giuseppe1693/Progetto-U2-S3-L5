const cardContainer = document.querySelector(".row");

fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc4MDEyNDYsImV4cCI6MTczOTAxMDg0Nn0.2ctDtOBYtqvg4wGtBp7SoPS5ceMrEGdwKUWN9DEegOQ",
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const card = document.createElement("div");
      card.className = "col-md-3";
      card.innerHTML = `<a class="link-underline link-underline-opacity-0 text-black" href="./detail.html?id=${product._id}">
    <div  class="card m-2" style="width: 18rem;">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.description}</p>
                      <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                      <p class="card-text"><strong>Price:</strong> ${product.price}</p>
                      <button id="${product._id}" class="btn btn-danger mb-1 z-2">Elimina</button>
                      <a href="./backoffice.html?id=${product._id}" class="btn btn-primary mb-1 z-1">Modifica</a>
                    </div>
                  </div> </a>`;
      cardContainer.appendChild(card);
    });
  });

const deleteButtons = document.querySelectorAll(".btn-danger");

deleteButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`https://striveschool-api.herokuapp.com/api/product/${btn.id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc4MDEyNDYsImV4cCI6MTczOTAxMDg0Nn0.2ctDtOBYtqvg4wGtBp7SoPS5ceMrEGdwKUWN9DEegOQ",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const cardToRemove = btn.closest(".col-md-3");
        cardContainer.removeChild(cardToRemove);
      });
  });
});
