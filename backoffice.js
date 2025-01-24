const form = document.getElementById("phoneForm");
const addBtn = document.getElementById("addBtn");

form.onsubmit = function (event) {
  event.preventDefault();
  console.log(event);

  const newObj = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    imageUrl: form.elements.urlImg.value,
    brand: form.elements.brand.value,
    price: form.elements.price.value,
  };

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTljYWI3NDcwMTAwMTU4YjJhZjEiLCJpYXQiOjE3Mzc3MTAwMjYsImV4cCI6MTczODkxOTYyNn0.4qvaaW9aP5XmE6i5KsBpdZi6r0MX-o7yYHaaRQHzH2Y",
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
};
