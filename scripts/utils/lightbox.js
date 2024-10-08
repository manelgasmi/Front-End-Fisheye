export class Lightbox {
  currentIndex = 0;

  init() {
    const dialog = document.getElementById("lightbox");
    const medias = document.querySelectorAll(
      "article .media-container img, article .media-container video"
    );
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    // ouvrir dialog et montrer l'image cliquée
    medias.forEach((media, index) => {
      media.addEventListener("click", () => {
        this.currentIndex = index;
        this.setMedia(medias);
        dialog.showModal();
      });
      media.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.currentIndex = index;
          this.setMedia(medias);
          dialog.showModal();
        }
      });
    });
    // fermer dialog
    document.querySelector(".close-btn").addEventListener("click", () => {
      dialog.close();
    });

    // Naviguer à gauche (image précédente)
    prevButton.addEventListener("click", () => {
      this.currentIndex =
        (this.currentIndex - 1 + medias.length) % medias.length;
      this.setMedia(medias);
    });

    // Naviguer à droite (image suivante)
    nextButton.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % medias.length;
      this.setMedia(medias);
    });

    // Ajouter l'accessibilité par les flèches du clavier
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        prevButton.click();
      } else if (event.key === "ArrowRight") {
        nextButton.click();
      }
    });

    // fermer le dialog quand on clique dehors
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }
  // Afficher le media actuel
  setMedia(medias) {
    const lightboxMedia = document.querySelector(".lightbox-media");
    const media = medias[this.currentIndex];
    if (media.nodeName === "IMG") {
      lightboxMedia.innerHTML = `<img src="${media.src}" alt="Image dans le lightbox ${media.title}" tabindex="0"/>`;
    } else if (media.nodeName === "VIDEO") {
      lightboxMedia.innerHTML = `<video controls src="${media.src}">`;
    }
    // ajouter le titre sous chaque media ouvert dans la lightbox
    const lightboxTitle = document.getElementById("lightboxTitle");
    lightboxTitle.innerText = medias[this.currentIndex].title;
  }
}
