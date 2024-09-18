import { PhotographerFactory } from "../factories/PhotographerFactory.js";

export class App {
  constructor() {
  }
  
  async displayList() {
    const photographerFactory = new PhotographerFactory();
    // Récupère les datas des photographes
    const photographers = await photographerFactory.getPhotographers();
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    photographers.forEach((photographer) => {
      const userCardDOM = photographerFactory.createPhotographerCard(photographer);
      photographersSection.appendChild(userCardDOM);
    });
  }

  async displayProfile() {

    //Mettre le code JavaScript lié à la page photographer.html
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    const id = parseInt(photographerId);

    const photographerFactory = new PhotographerFactory();
    
    // Récupère les données du photographer
    const photographers = await photographerFactory.getPhotographer(id);

  }
}
