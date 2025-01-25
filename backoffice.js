const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const formButton = document.getElementById("formBtn");
const form = document.getElementById("phoneForm");

if (id) {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc4MDEyNDYsImV4cCI6MTczOTAxMDg0Nn0.2ctDtOBYtqvg4wGtBp7SoPS5ceMrEGdwKUWN9DEegOQ",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const product = data.find((product) => product._id === id);
      (form.elements.name.value = product.name),
        (form.elements.description.value = product.description),
        (form.elements.urlImg.value = product.imageUrl),
        (form.elements.brand.value = product.brand),
        (form.elements.price.value = product.price);
      formButton.textContent = "Modifica";
    });
} else {
  formButton.textContent = "Aggiungi";
}

form.onsubmit = function (event) {
  event.preventDefault();

  const newObj = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    imageUrl: form.elements.urlImg.value,
    brand: form.elements.brand.value,
    price: form.elements.price.value,
  };

  console.log(newObj);

  if (id) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "PUt",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc4MDEyNDYsImV4cCI6MTczOTAxMDg0Nn0.2ctDtOBYtqvg4wGtBp7SoPS5ceMrEGdwKUWN9DEegOQ",
      },
      body: JSON.stringify(newObj),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Oggetto aggiunto con successo!");
        } else {
          console.error("Errore durante l'aggiunta dell'oggetto:", response.statusText);
        }
        return response.json();
      })
      .then((data) => console.log("Risultato POST:", data))
      .catch((error) => console.error("Errore durante il POST:", error));
  } else {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc4MDEyNDYsImV4cCI6MTczOTAxMDg0Nn0.2ctDtOBYtqvg4wGtBp7SoPS5ceMrEGdwKUWN9DEegOQ",
      },
      body: JSON.stringify(newObj),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Oggetto aggiunto con successo!");
        } else {
          console.error("Errore durante l'aggiunta dell'oggetto:", response.statusText);
        }
        return response.json();
      })
      .then((data) => console.log("Risultato POST:", data))
      .catch((error) => console.error("Errore durante il POST:", error));
  }
};
