import { Photographer } from "../classes/photographer.js";
import { Lightbox } from "../utils/lightbox.js";
import { MediaFactory } from "./MediaFactory.js";

export class PhotographerFactory {
  initPage(page) {
    if (page === "index") {
      this.displayList();
    }
    if (page === "photographer") {
      this.displayProfile();
    }
  }

  // afficher les listes des photographes
  async displayList() {
    
    // Récupère les datas des photographes
    const photographers = await this.getPhotographers();
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    photographers.forEach((photographer) => {
      const userCardDOM = this.createPhotographerCard(photographer);
      photographersSection.appendChild(userCardDOM);
    });
  }

  async displayProfile() {
    //récupérer l'id du photographer depuis l'url
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id"); // récupération de l'id
    const id = parseInt(photographerId);
    
    // Récupère les données du photographer
    const photographer = await this.getPhotographer(id);

    // insérer le nom
    const name = document.querySelector(".photographer-name");
    name.innerText = photographer.name;
    name.setAttribute("id", "photographer-name");
    name.setAttribute("role", "heading");
    name.setAttribute("aria-level", "1")
    name.setAttribute("tabindex" , "0")

    // insérer l'adresse
    const address = document.querySelector(".photographer-address p");
    address.setAttribute("aria-label", `Adresse du photographe : ${photographer.city}, ${photographer.country}`)
    address.innerText = `${photographer.city}, ${photographer.country}`;
    

    // insérer tagline
    const tagline = document.querySelector(".photographer-tagline");
    tagline.innerText = photographer.tagline;
    address.setAttribute("id", "photographer-address");

    // insérer image
    const img = document.createElement("img");
    img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    img.setAttribute("alt", `Portrait de ${photographer.name}`);
    img.setAttribute("aria-labelledby", "photographer-name");
    img.setAttribute("tabindex" , "0");
    const portrait = document.querySelector(".photographer-img");
    portrait.appendChild(img);

    // insére le prix
    const priceElement = document.querySelector('.likes-widget_price');
    priceElement.innerText = `${photographer.price}€ / jour`;// manque accessibilité

    // récupérer les medias du photographer
    const medias = await this.getPhotographerMedias(photographer.id);

    const mediaSection = document.querySelector(".media");

    for (let i = 0; i < medias.length; i++) {
      const media = medias[i];
      const article = document.createElement("article");
      article.classList.add("media-card");
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media-container");

      // création de l'image
      let mediaElement;
      if (media.image) {
        mediaElement = document.createElement("img");
        mediaElement.setAttribute("src", `./assets/images/media/${media.image}`);
        mediaElement.setAttribute("alt", media.title);
        mediaElement.setAttribute("title", media.title);
        mediaElement.setAttribute("tabindex", "0");
        mediaElement.dataset.index =  i;
      } else {
        mediaElement = document.createElement("video");
        mediaElement.setAttribute("src", `./assets/images/media/${media.video}`);
        mediaElement.setAttribute("controls", true);
        mediaElement.setAttribute("alt", media.title);
        mediaElement.setAttribute("title", media.title);
        mediaElement.setAttribute("aria-label", "Video : " + media.title);
        mediaElement.setAttribute("tabindex", "0");
        mediaElement.dataset.index =  i;
      }
      
      mediaContainer.appendChild(mediaElement);
      article.appendChild(mediaContainer);

      // création du bloc media-info
      const mediaInfo = document.createElement("div");
      mediaInfo.classList.add("media-info");
      
      // création du titre du media
      const mediaTitle = document.createElement("h4");
      mediaTitle.innerText = media.title;
      mediaTitle.setAttribute('tabindex', '0');
      mediaInfo.appendChild(mediaTitle);

      // création du bloc like
      const likeContainer = document.createElement("div");
      likeContainer.setAttribute('aria-label', 'Nombre de likes');

      // creation nombre de like
      const likes = document.createElement("span");
      likes.innerText = media.likes;
      likes.setAttribute('aria-label', `${media.likes} j'aime`);
      
      likes.setAttribute('tabindex', '0');
      likeContainer.appendChild(likes);

      // creation DE l'icone
      const likeIcon = document.createElement("i");
      likeIcon.classList = 'fa-solid fa-heart';
      likeContainer.appendChild(likeIcon);
      mediaInfo.appendChild(likeContainer)
      article.appendChild(mediaInfo);

      // ajouter l'article à la section
      mediaSection.appendChild(article);
    }

    // Initialiser le lightbox après avoir charger les images
    const lightbox = new Lightbox();
    lightbox.init();
  }

  createPhotographerCard(photographerData) {
    const photographer = new Photographer(photographerData);
    const article = document.createElement("article");
    article.setAttribute("role", "article");

    // Lien pour l'image du photographe
    const imgLink = document.createElement("a");
    imgLink.setAttribute("href", `photographer.html?id=${photographer.id}`);
    imgLink.setAttribute(
      "aria-label",
      `Lien vers la page de ${photographer.name}`
    );
    imgLink.setAttribute("tabindex", "0");

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
    titleLink.setAttribute("tabindex", "0");

    const h2 = document.createElement("h2");
    h2.innerText = photographer.name;
    titleLink.appendChild(h2);

    // Autres éléments de la carte (ville, tagline, prix)
    const location = document.createElement("h6");
    location.innerText = `${photographer.city}, ${photographer.country}`;// manque accessibilité

    const tagline = document.createElement("p");
    tagline.innerText = photographer.tagline;
    tagline.setAttribute("aria-label", `Tagline : ${photographer.tagline}`);
    tagline.setAttribute("tabindex", "0");

    const price = document.createElement("span");
    price.innerText = `${photographer.price}/jour`;
    price.setAttribute(
      "aria-label",
      `Prix : ${photographer.price} euros par jour`
    );
    price.setAttribute("tabindex", "0");

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
    const data = photographers.find((photographer) => photographer.id === id);
    const photographer = new Photographer(data);
    return photographer;
  }

  async getPhotographerMedias(photographerId) {
    const reponse = await fetch("data/photographers.json");
    const jsonData = await reponse.json();
    const medias = jsonData.media;
    const photographerMediasData = medias.filter(
      (media) => media.photographerId === photographerId
    );
    return photographerMediasData.map((media) => new MediaFactory(media));
  }
}
