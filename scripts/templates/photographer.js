// Fonction pour créer un modèle de photographe basé sur les données fournies
function photographerTemplate(data) {
    console.log(data)
    // Déstructuration des propriétés de l'objet data pour une utilisation facile
    const { name, portrait, id, city, tagline, country, price } = data;
    console.log(id)

    const picture = `assets/photographers/${portrait}`;
    // Fonction pour créer le DOM de la carte du photographe
    function getUserCardDOM() {
        // Crée un élément article pour contenir les informations du photographe
        const article = document.createElement( 'article' );

        // Crée un élément img pour afficher le portrait du photographe
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture); // définit la source de l'image
        img.setAttribute("alt", `Portrait de {$name}`); // définit le texte alternatif pour l'accessibilité
        
        // Crée un élément h2 pour afficher le nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("id", `photographer-name-${id}`); // Assigner un ID unique pour l'accessibilité
       
        // Crée un élément h6 pour afficher la localisation du photographe
        const h6 = document.createElement( 'h6' );
        h6.textContent = `${city}, ${country}`;
        h6.setAttribute("id", `photographer-location-${id}`); // Assigner un ID unique pour l'accessibilité
       
        // Crée un élément p pour afficher la tagline du photographe
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        p.setAttribute("id", `photographer-tagline-${id}`); // Assigner un ID unique pour l'accessibilité
        
        // Crée un élément span pour afficher le tarif journalier du photographe
        const span = document.createElement( 'span' );
        span.textContent = `${price}/jour`;
        span.setAttribute("id", `photographer-price-${id}`); // Assigner un ID unique pour l'accessibilité
        
        // Assigner un attribut aria-labelledby à l'article pour associer les éléments textuels pour l'accessibilité
        article.setAttribute("aria-labelledby",`photographer-name-${id} photographer-location-${id} photographer-tagline-${id} photographer-price-${id}`); 
        
        // Ajoute les éléments créés (img, h2, h6, p, span) à l'article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h6);
        article.appendChild(p);
        article.appendChild(span);
        // Retourne l'article complet contenant les informations du photographe
        return (article);
    }
    // Retourne un objet contenant le nom du photographe, son portrait, et la fonction getUserCardDOM
    return { name, picture, getUserCardDOM }
    
}
console.log(getUserCardDOM);



