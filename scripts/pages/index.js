async function getPhotographers() {
  const reponse = await fetch("data/photographers.json");
  const jsonData = await reponse.json();
  const photographers = jsonData.photographers;
  console.log(photographers);
  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers: photographers,
  };
}
console.log(getPhotographers);

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
console.log(displayData);

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
console.log(init);

init();
