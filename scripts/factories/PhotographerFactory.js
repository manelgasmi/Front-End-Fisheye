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
    name.setAttribute("aria-level", "1");
    name.setAttribute("tabindex", "0");

    // insérer l'adresse
    const address = document.querySelector(".photographer-address span");
    address.setAttribute(
      "aria-label",
      `Adresse du photographe : ${photographer.city}, ${photographer.country}`
    );
    address.innerText = `${photographer.city}, ${photographer.country}`;

    // insérer tagline
    const tagline = document.querySelector(".photographer-tagline");
    tagline.setAttribute(
      "aria-label",
      `Tagline du photographe : ${photographer.tagline}`
    );
    tagline.innerText = photographer.tagline;

    // insérer image
    const img = document.createElement("img");
    img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    img.setAttribute("alt", `Portrait de ${photographer.name}`);
    img.setAttribute("tabindex", "0");
    const portrait = document.querySelector(".photographer-img");
    portrait.appendChild(img);

    // insére le prix
    const priceElement = document.querySelector(".likes-widget_price");
    priceElement.innerText = `${photographer.price} € / jour`; 
    priceElement.setAttribute('aria-label', `Prix du photographe : ${photographer.price} euros par jour`);
   
    // récupérer les medias du photographer
    const medias = await this.getPhotographerMedias(photographer.id);

    this.displayMediasSection(medias);

    this.displayTotalLikes(medias);

    // Initialiser le lightbox après avoir charger les images
    const lightbox = new Lightbox();
    lightbox.init();

    //Lancer la gestion des boutons like
    this.manageLikeButtons(medias);

    this.initOrderMedia(medias);
  }

  manageLikeButtons(medias) {
    // gestion de click sur le like
    const likeButtons = document.querySelectorAll(".btn-like");
    likeButtons.forEach((likeButton, index) => {
      likeButton.addEventListener("click", () => {
        const likedMedia = medias[index];
        if (likedMedia.liked) {
          likedMedia.likes--;
          likedMedia.liked = false;
        } else {
          likedMedia.likes++;
          likedMedia.liked = true;
        }
        const likesTexts = document.querySelectorAll(".media-likes");
        likesTexts[index].innerText = likedMedia.likes;
        this.displayTotalLikes(medias);
      });
    });
  }
  // afficher la somme des likes
  displayTotalLikes(medias) {
    const likesSum = medias.reduce((acc, media) => acc + media.likes, 0);
    const likesSumWidget = document.querySelector(".likes-widget__count");
    likesSumWidget.innerText = likesSum;
  }

  displayMediasSection(medias) {
    const mediaSection = document.querySelector(".media");
    mediaSection.innerHTML = "";
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
        mediaElement.setAttribute(
          "src",
          `./assets/images/media/${media.image}`
        );
        mediaElement.setAttribute("alt", media.title);
        mediaElement.setAttribute("title", media.title);
        mediaElement.setAttribute("tabindex", "0");
        mediaElement.dataset.index = i;
      } else {
        mediaElement = document.createElement("video");
        mediaElement.setAttribute(
          "src",
          `./assets/images/media/${media.video}`
        );
        mediaElement.setAttribute("controls", true);
        mediaElement.setAttribute("alt", media.title);
        mediaElement.setAttribute("title", media.title);
        mediaElement.setAttribute("aria-label", "Video : " + media.title);
        mediaElement.setAttribute("tabindex", "0");
        mediaElement.dataset.index = i;
      }

      mediaContainer.appendChild(mediaElement);
      article.appendChild(mediaContainer);

      // création du bloc media-info
      const mediaInfo = document.createElement("div");
      mediaInfo.classList.add("media-info");

      // création du titre du media
      const mediaTitle = document.createElement("h4");
      mediaTitle.innerText = media.title;
      mediaTitle.setAttribute("tabindex", "0");
      mediaInfo.appendChild(mediaTitle);

      // création du bloc like
      const likeContainer = document.createElement("div");
      likeContainer.classList.add("like-container");
      likeContainer.setAttribute("aria-label", "Nombre de likes");

      // creation nombre de like
      const likes = document.createElement("span");
      likes.classList = "media-likes";
      likes.innerText = media.likes;
      likes.setAttribute("aria-label", `${media.likes} j'aime`);

      likes.setAttribute("tabindex", "0");
      likeContainer.appendChild(likes);

      // creation DE l'icone
      const likeIcon = document.createElement("i");
      likeIcon.classList = "fa-solid fa-heart";
      const likeButton = document.createElement("button");
      likeButton.classList = "btn-like";
      likeButton.dataset.index = i;
      likeButton.appendChild(likeIcon);
      likeContainer.appendChild(likeButton);
      mediaInfo.appendChild(likeContainer);
      article.appendChild(mediaInfo);

      // ajouter l'article à la section
      mediaSection.appendChild(article);
    }
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

    // création de l'adresse
    const location = document.createElement("h6");
    location.innerText = `${photographer.city}, ${photographer.country}`; 
    location.setAttribute ("aria-label", `adresse : ${photographer.city}, ${photographer.country}`)
    location.setAttribute ("tabindex", "0");

    // création du tagnline
    const tagline = document.createElement("p");
    tagline.innerText = photographer.tagline;
    tagline.setAttribute("aria-label", `Tagline : ${photographer.tagline}`);
    tagline.setAttribute("tabindex", "0");

    // création du prix
    const price = document.createElement("span");
    price.innerText = `${photographer.price}€/jour`;
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
    // retourner le tableau photographers seulement une fois récupéré
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

  initOrderMedia(medias) {
    const order = document.getElementById("order");
    order.addEventListener("change", () => {
      // trie par popularité
      if (order.value === "0") {
        medias.sort((a, b) => b.likes - a.likes);
        // trie par date
      } else if (order.value === "1") {
        medias.sort((a, b) => {
          if (a.date.toLowerCase() < b.date.toLowerCase()) return -1;
          if (a.date.toLowerCase() > b.date.toLowerCase()) return 1;
          return 0;
        });
        // trie par titre
      } else if (order.value === "2") {
        medias.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        });
      } else {
        console.log("Pas de tri");
      }

      this.displayMediasSection(medias);

      // Initialiser le lightbox après avoir charger les images
      const lightbox = new Lightbox();
      lightbox.init();

      //Lancer la gestion des boutons like
      this.manageLikeButtons(medias);
    });
  }
}
