import { PhotographerFactory } from "../factories/PhotographerFactory.js";

export class App {
  constructor() {}

  buildPage(page) {
    const photographerFactory = new PhotographerFactory();
    const photographer = photographerFactory.initPage(page);
  }
}
