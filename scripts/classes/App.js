import { PhotographerFactory } from "../factories/PhotographerFactory.js";

export class App {
  

  buildPage(pageName) {
    const photographerFactory = new PhotographerFactory();
    photographerFactory.initPage(pageName);
  }
}
