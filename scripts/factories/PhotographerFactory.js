import { Photographer } from "../classes/photographer.js";

export class PhotographerFactory {
  initPage(page) {
    if (page === "index") {
      this.displayList();
    }
    if (page === "photographer") {
      this.displayProfile();
    }
  }

  async displayList() {
    const photographerFactory = new PhotographerFactory();
    // Récupère les datas des photographes
    const photographers = await photographerFactory.getPhotographers();
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    photographers.forEach((photographer) => {
      const userCardDOM =
        photographerFactory.createPhotographerCard(photographer);
      photographersSection.appendChild(userCardDOM);
    });
  }

  async displayProfile() {
    //récupérer l'id du photographer depuis l'url
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    const id = parseInt(photographerId);

    const photographerFactory = new PhotographerFactory();

    // Récupère les données du photographer
    const photographer = await photographerFactory.getPhotographer(id);
    console.log(photographer);

    // insérer le nom
    const name = document.querySelector(".photographer-name");
    name.innerText = photographer.name;

    // insérer l'adresse
    const address = document.querySelector(".photographer-address");
    address.innerText = `${photographer.city}, ${photographer.country}`;

    // insérer tagline
    const tagline = document.querySelector(".photographer-tagline");
    tagline.innerText = photographer.tagline;

    // insérer image
    const img = document.createElement("img");
    img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    img.setAttribute("alt", `Portrait de ${photographer.name}`);
    const portrait = document.querySelector(".photographer-img");
    portrait.appendChild(img);
  }

  createPhotographerCard(photographerData) {
    const photographer = new Photographer(photographerData);

    const article = document.createElement("article");

    // Lien pour l'image du photographe
    const imgLink = document.createElement("a");
    imgLink.setAttribute("href", `photographer.html?id=${photographer.id}`);
    imgLink.setAttribute(
      "aria-label",
      `Lien vers la page de ${photographer.name}`
    );

    const img = document.createElement("img");
    img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    img.setAttribute("alt", `Portrait de ${photographer.name}`);
    imgLink.appendChild(img);

    // Lien pour le nom
    const titleLink = document.createElement("a");
    titleLink.setAttribute("href", `photographer.html?id=${photographer.id}`);
    titleLink.setAttribute(
      "aria-label",
      `Lien vers la page de ${photographer.name}`
    );

    const h2 = document.createElement("h2");
    h2.innerText = photographer.name;
    titleLink.appendChild(h2);

    // Autres éléments de la carte (ville, tagline, prix)
    const location = document.createElement("h6");
    location.innerText = `${photographer.city}, ${photographer.country}`;

    const tagline = document.createElement("p");
    tagline.innerText = photographer.tagline;

    const price = document.createElement("span");
    price.innerText = `${photographer.price}/jour`;

    // Ajout des éléments dans l'article
    article.appendChild(imgLink);
    article.appendChild(titleLink);
    article.appendChild(location);
    article.appendChild(tagline);
    article.appendChild(price);

    return article;
  }

  async getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const jsonData = await reponse.json();
    const photographers = jsonData.photographers;
    // et bien retourner le tableau photographers seulement une fois récupéré
    return photographers;
  }

  async getPhotographer(id) {
    const photographers = await this.getPhotographers();
    const data = photographers.find(
      (photographer) => photographer.id === id
    );
    const photographer = new Photographer(data);
    return photographer;
  }
}
