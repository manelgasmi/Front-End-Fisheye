import { Contact } from "../classes/contact.js";

const dialog = document.getElementById("contact_modal");
const contactButton = document.querySelector(".contact_button");
const firstInputField = document.getElementById("first-name");

// basculer entre ouverture et fermeture de la modal
 function openModal() {
  dialog.showModal();
  dialog.setAttribute("aria-modal", "true"); 
  firstInputField.focus();
 }

// Fermer la modal
 function closeModal() {
  dialog.close();
  dialog.setAttribute("aria-modal", "false"); 
  contactButton.focus(); 
  
}

 function submitform(event) {
    event.preventDefault();
    const firstname = document.getElementById("first-name").value;
    const lastname = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    //instantier la classe contact
    const contact = new Contact(firstname, lastname, email, message);
    console.log('firstname', contact.firstname)
    console.log('lastname', contact.lastname)
    console.log('email', contact.email)
    console.log('message', contact.message)

    //tester la validation du formulaire
    if (contact.isValidContact()) {
        console.log("Formulaire validé");
    } else {
        console.error("Formulaire non validé");
    }

}

// Gestion du clavier pour la modal
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && dialog.hasAttribute("open")) {
      closeModal();
    }
  });

// Ajouter des event listeners
document.querySelector(".contact_button").addEventListener("click", openModal);
document.querySelector(".close-modal").addEventListener("click", closeModal);
document.querySelector("#contact_modal form").addEventListener("submit", submitform);