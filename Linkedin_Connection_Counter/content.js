// Vesion 1.1 Extension chrome pour compter les connexions ajoutées sur LinkedIn 
// et renitialiser le compte au bout de 7 jours. Sans console.log


// Fonction pour détecter le bouton "Se connecter" avec la classe spécifiée
function detecterBoutonSeConnecter() {
  // Sélectionnez le bouton avec la classe spécifiée
  var boutonSeConnecter = document.querySelector('button[class^="artdeco-button"][class$="pvs-profile-actions__action"]');

  // Vérifiez si le bouton "Se connecter" a été trouvé
  if (boutonSeConnecter) {

    // Ajoutez un gestionnaire d'événements pour le clic sur le bouton
    boutonSeConnecter.addEventListener('click', function() {
      verifierDivSpecifique()
    });

    // Désactivez l'observation après avoir trouvé le bouton
    observerDivSpecifique.disconnect();
  } else {}
}

// Utilisez MutationObserver pour détecter les changements dans le DOM
var observerDivSpecifique = new MutationObserver(detecterBoutonSeConnecter);

// Configurez l'observateur pour surveiller les changements dans le sous-arbr de la div spéciefique
var optionsDivSpecifique = { subtree: true, childList: true };
observerDivSpecifique.observe(document.body, optionsDivSpecifique);

// Appelez la fonction pour détecter le bouton "Se connecter"
detecterBoutonSeConnecter();

// Fonction pour réinitialiser le compteur
function reinitialiserCompteur() {
  localStorage.removeItem('compteur');
}

// Fonction pour afficher le bouton dans la console
function afficherBouton(bouton) {
  const span = bouton.querySelector('span');
  if (span && span.textContent.trim() === 'Se connecter' || 'Connect') {

    // Ajouter un écouteur de clic pour afficher le message dans la console
    bouton.addEventListener('click', () => {
      // Incrémenter le compteur dans le localStorage
        let clickCount = localStorage.getItem('compteur') || 0;
        clickCount = parseInt(clickCount, 10) + 1;
        localStorage.setItem('compteur', clickCount);
    });
  }
}
  
// Fonction pour vérifier la présence de la div avec la classe spécifique
function verifierDivSpecifique() {
  // Sélectionnez la div avec la classe spécifique
  var divSpecifique = document.querySelector('.artdeco-modal.artdeco-modal--layer-default.send-invite');

  // Vérifiez si la div a été trouvée
  if (divSpecifique) {

    // Sélectionnez le bouton "Envoyer" avec aria-label commençant par "Envoye"
    var boutonEnvoyer = divSpecifique.querySelector('button[aria-label^="Envoye"]');

    // Vérifiez si le bouton "Envoyer" a été trouvé
    if (boutonEnvoyer) {

      // Initialiser le compteur depuis le local storage
      var compteur = localStorage.getItem('compteur') || 0;

      // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Envoyer"
      boutonEnvoyer.addEventListener('click', function () {
        // Incrémenter le compteur
        compteur++;

        // Enregistrer le compteur dans le local storage
        localStorage.setItem('compteur', compteur);
      });
      

    } else {        
      
      // Sélectionnez le bouton "Send" avec aria-label commençant par "Send"
      var boutonSend = divSpecifique.querySelector('button[aria-label*="Send"]');

      // Vérifiez si le bouton "Send" a été trouvé
      if (boutonSend) {

        // Initialiser le compteur depuis le local storage
        var compteur = localStorage.getItem('compteur') || 0;

        // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Send"
        boutonSend.addEventListener('click', function () {
          // Incrémenter le compteur
          compteur++;

          // Enregistrer le compteur dans le local storage
          localStorage.setItem('compteur', compteur);
        });
        

      } else {}
    }


  } else {}
}
  
// Observer pour surveiller les modifications dans le DOM
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Nouveaux nœuds ont été ajoutés
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view')) {
          // Si le nœud ajouté est un bouton, afficher le bouton
          afficherBouton(node);
        }
      });
    }
  }
});
  
// Options pour l'observer (surveiller les ajouts d'enfants au niveau de la racine)
const observerOptions = { childList: true, subtree: true };

// Démarrer l'observation du DOM
observer.observe(document.body, observerOptions);
// Appeler la fonction pour rechercher et afficher les boutons existants
document.querySelectorAll('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view').forEach(afficherBouton);

// Appelez la fonction pour la première vérification
verifierDivSpecifique();

// Utilisez MutationObserver pour détecter les changements dans le DOM
var observerButtonSpecifique = new MutationObserver(verifierDivSpecifique);

// Configurez l'observateur pour surveiller les changements dans le sous-arbre de la div spécifique
var optionsDivSpecifique = { subtree: true, childList: true };
observerButtonSpecifique.observe(document.body, optionsDivSpecifique);

// Réinitialiser le compteur au bout de 7 jours
setTimeout(reinitialiserCompteur, 7 * 24 * 60 * 60 * 1000);  // 7 jours en millisecondes




























// // Vesion 1.0 Extension chrome pour compter les connexions ajoutées sur LinkedIn 
// // et renitialiser le compte au bout de 7 jours. Sans console.log
// // document.addEventListener('DOMContentLoaded', function() {
// //   var toto = localStorage.getItem('compteur');
// //   console.log(toto);
// //   if (toto === null) {
// //     // Initialiser la valeur si elle n'existe pas
// //     toto = 6446546;
// //   }

// //   console.log(toto);
// //   document.getElementById("valeurAffichee").innerHTML = toto;
// // });

// // Fonction pour détecter le bouton "Se connecter" avec la classe spécifiée
// function detecterBoutonSeConnecter() {
//   // Sélectionnez le bouton avec la classe spécifiée
//   var boutonSeConnecter = document.querySelector('button[class^="artdeco-button"][class$="pvs-profile-actions__action"]');

//   // Vérifiez si le bouton "Se connecter" a été trouvé
//   if (boutonSeConnecter) {

//     // Ajoutez un gestionnaire d'événements pour le clic sur le bouton
//     boutonSeConnecter.addEventListener('click', function() {
//       verifierDivSpecifique()
//     });

//     // Désactivez l'observation après avoir trouvé le bouton
//     observerDivSpecifique.disconnect();
//   } else {}
// }



// // Fonction pour réinitialiser le compteur
// function reinitialiserCompteur() {
//     localStorage.removeItem('compteur');
// }



// // Fonction pour afficher le bouton dans la console
// function afficherBouton(bouton) {
//   const span = bouton.querySelector('span');
//   if (span && span.textContent.trim() === 'Se connecter'|| 'Connect') {
//     // Ajouter un écouteur de clic pour afficher le message dans la console
//     bouton.addEventListener('click', () => {
//       // Incrémenter le compteur dans le localStorage
//         let clickCount = localStorage.getItem('compteur') || 0;
//         clickCount = parseInt(clickCount, 10) + 1;
//         localStorage.setItem('compteur', clickCount);
//     });
//   }
// }
  


// // Fonction pour vérifier la présence de la div avec la classe spécifique
// function verifierDivSpecifique() {
//   // Sélectionnez la div avec la classe spécifique
//   var divSpecifique = document.querySelector('.artdeco-modal.artdeco-modal--layer-default.send-invite');

//   // Vérifiez si la div a été trouvée
//   if (divSpecifique) {
//     // Sélectionnez le bouton "Envoyer" avec aria-label commençant par "Envoye"
//     var boutonEnvoyer = divSpecifique.querySelector('button[aria-label^="Envoye"]');

//     // Vérifiez si le bouton "Envoyer" a été trouvé
//     if (boutonEnvoyer) {
//       // Initialiser le compteur depuis le local storage
//       var compteur = localStorage.getItem('compteur') || 0;

//       // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Envoyer"
//       boutonEnvoyer.addEventListener('click', function () {
//         // Incrémenter le compteur
//         compteur++;

//         // Enregistrer le compteur dans le local storage
//         localStorage.setItem('compteur', compteur);
//       });
//     } else {}
//   } else {}
// }



// // Observer pour surveiller les modifications dans le DOM
// const observer = new MutationObserver((mutationsList) => {
//   for (const mutation of mutationsList) {
//     if (mutation.type === 'childList') {
//       // Nouveaux nœuds ont été ajoutés
//       mutation.addedNodes.forEach((node) => {
//         if (node.nodeType === 1 && node.matches('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view')) {
//           // Si le nœud ajouté est un bouton, afficher le bouton
//           afficherBouton(node);
//         }
//       });
//     }
//   }
// });



// // Utilisez MutationObserver pour détecter les changements dans le DOM
// var observerDivSpecifique = new MutationObserver(detecterBoutonSeConnecter);

// // Configurez l'observateur pour surveiller les changements dans le sous-arbr de la div spéciefique
// var optionsDivSpecifique = { subtree: true, childList: true };
// observerDivSpecifique.observe(document.body, optionsDivSpecifique);

// // Appelez la fonction pour détecter le bouton "Se connecter"
// detecterBoutonSeConnecter();

// // Options pour l'observer (surveiller les ajouts d'enfants au niveau de la racine)
// const observerOptions = { childList: true, subtree: true };

// // Démarrer l'observation du DOM
// observer.observe(document.body, observerOptions);

// // Appeler la fonction pour rechercher et afficher les boutons existants
// document.querySelectorAll('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view').forEach(afficherBouton);
  
// // Utilisez MutationObserver pour détecter les changements dans le DOM
// var observerButtonSpecifique = new MutationObserver(verifierDivSpecifique);

// // Configurez l'observateur pour surveiller les changements dans le sous-arbre de la div spécifique
// var optionsDivSpecifique = { subtree: true, childList: true };
// observerButtonSpecifique.observe(document.body, optionsDivSpecifique);

// // Appelez la fonction pour la première vérification
// verifierDivSpecifique();

// // Réinitialiser le compteur au bout de 7 jours
// setTimeout(reinitialiserCompteur, 7 * 24 * 60 * 60 * 1000);  // 7 jours en millisecondes






















// // Vesion 1.0 Extension chrome pour compter les connexions ajoutées sur LinkedIn 
// // et renitialiser le compte au bout de 7 jours. Avec console.log


// // Fonction pour détecter le bouton "Se connecter" avec la classe spécifiée
// function detecterBoutonSeConnecter() {
//   // Sélectionnez le bouton avec la classe spécifiée
//   var boutonSeConnecter = document.querySelector('button[class^="artdeco-button"][class$="pvs-profile-actions__action"]');

//   // Vérifiez si le bouton "Se connecter" a été trouvé
//   if (boutonSeConnecter) {
//     console.log('Le bouton "Se connecter" avec la classe spécifiée a été trouvé :', boutonSeConnecter);

//     // Ajoutez d'autres actions à effectuer si le bouton est trouvé ici

//     // Ajoutez un gestionnaire d'événements pour le clic sur le bouton
//     boutonSeConnecter.addEventListener('click', function() {
//       console.log('Vous avez cliqué sur le bouton "Se connecter".');
//       verifierDivSpecifique()
//     });

//     // Désactivez l'observation après avoir trouvé le bouton
//     observerDivSpecifique.disconnect();
//   } else {
//     console.log('Le bouton "Se connecter" avec la classe spécifiée n\'a pas été trouvé.');
//   }
// }

// // Utilisez MutationObserver pour détecter les changements dans le DOM
// var observerDivSpecifique = new MutationObserver(detecterBoutonSeConnecter);

// // Configurez l'observateur pour surveiller les changements dans le sous-arbr de la div spéciefique
// var optionsDivSpecifique = { subtree: true, childList: true };
// observerDivSpecifique.observe(document.body, optionsDivSpecifique);

// // Appelez la fonction pour détecter le bouton "Se connecter"
// detecterBoutonSeConnecter();

// // Fonction pour réinitialiser le compteur
// function reinitialiserCompteur() {
//     console.log('Réinitialisation du compteur.');
//     localStorage.removeItem('compteur');
//   }
  
//   // Fonction pour afficher le bouton dans la console
//   function afficherBouton(bouton) {
//     const span = bouton.querySelector('span');
//     if (span && span.textContent.trim() === 'Se connecter' || 'Connect') {
//       console.log("Bouton trouvé :", bouton);

//       // Ajouter un écouteur de clic pour afficher le message dans la console
//       bouton.addEventListener('click', () => {
//         // Incrémenter le compteur dans le localStorage
//           let clickCount = localStorage.getItem('compteur') || 0;
//           clickCount = parseInt(clickCount, 10) + 1;
//           localStorage.setItem('compteur', clickCount);

//         // Afficher le message dans la console
//         console.log(`Vous avez cliqué sur ce bouton ${clickCount} fois.`);
//       });
//   }
//   }
  
//   // Fonction pour vérifier la présence de la div avec la classe spécifique
//   function verifierDivSpecifique() {
//     // Sélectionnez la div avec la classe spécifique
//     var divSpecifique = document.querySelector('.artdeco-modal.artdeco-modal--layer-default.send-invite');
  
//     // Vérifiez si la div a été trouvée
//     if (divSpecifique) {
//       console.log('La div avec la classe spécifique a été trouvée :', divSpecifique);
  
//       // Sélectionnez le bouton "Envoyer" avec aria-label commençant par "Envoye"
//       var boutonEnvoyer = divSpecifique.querySelector('button[aria-label^="Envoye"]');
  
//       // Vérifiez si le bouton "Envoyer" a été trouvé
//       if (boutonEnvoyer) {
//         console.log('Le bouton "Envoyer" avec aria-label commençant par "Envoye" a été trouvé à l\'intérieur de la div spécifique :', boutonEnvoyer);
  
//         // Initialiser le compteur depuis le local storage
//         var compteur = localStorage.getItem('compteur') || 0;
  
//         // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Envoyer"
//         boutonEnvoyer.addEventListener('click', function () {
//           console.log("bla bla a été cliqué")
//           // Incrémenter le compteur
//           compteur++;
  
//           // Afficher dans la console que le bouton "Envoyer" a été cliqué
//           console.log('Le bouton "Envoyer" a été cliqué. Nombre de clics :', compteur);
  
//           // Enregistrer le compteur dans le local storage
//           localStorage.setItem('compteur', compteur);
//         });
        

//       } else {
//         console.log('Le bouton "Envoyer" avec aria-label commençant par "Envoye" n\'a pas été trouvé à l\'intérieur de la div spécifique.');
        
        
//         // Sélectionnez le bouton "Send" avec aria-label commençant par "Send"
//         var boutonSend = divSpecifique.querySelector('button[aria-label*="Send"]');

//         // Vérifiez si le bouton "Send" a été trouvé
//         if (boutonSend) {
//           console.log('Le bouton "Send" avec aria-label commençant par "Envoye" a été trouvé à l\'intérieur de la div spécifique :', boutonSend);

//           // Initialiser le compteur depuis le local storage
//           var compteur = localStorage.getItem('compteur') || 0;

//           // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Send"
//           boutonSend.addEventListener('click', function () {
//             console.log("bla bla a été cliqué")
//             // Incrémenter le compteur
//             compteur++;

//             // Afficher dans la console que le bouton "Send" a été cliqué
//             console.log('Le bouton "Send" a été cliqué. Nombre de clics :', compteur);

//             // Enregistrer le compteur dans le local storage
//             localStorage.setItem('compteur', compteur);
//           });
          

//         } else {
//           console.log('Le bouton "Send" avec aria-label commençant par "Envoye" n\'a pas été trouvé à l\'intérieur de la div spécifique.');
//         }
//       }


//     } else {
//       console.log('La div avec la classe spécifique n\'a pas été trouvée.');
//     }
//   }
  
//   // Observer pour surveiller les modifications dans le DOM
//   const observer = new MutationObserver((mutationsList) => {
//     for (const mutation of mutationsList) {
//       if (mutation.type === 'childList') {
//         // Nouveaux nœuds ont été ajoutés
//         mutation.addedNodes.forEach((node) => {
//           if (node.nodeType === 1 && node.matches('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view')) {
//             // Si le nœud ajouté est un bouton, afficher le bouton
//             afficherBouton(node);
//           }
//         });
//       }
//     }
//   });
  
//   // Options pour l'observer (surveiller les ajouts d'enfants au niveau de la racine)
//   const observerOptions = { childList: true, subtree: true };
  
//   // Démarrer l'observation du DOM
//   observer.observe(document.body, observerOptions);
// // Appeler la fonction pour rechercher et afficher les boutons existants
// document.querySelectorAll('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view').forEach(afficherBouton);

//   // Appelez la fonction pour la première vérification
//   verifierDivSpecifique();
  
//   // Utilisez MutationObserver pour détecter les changements dans le DOM
//   var observerButtonSpecifique = new MutationObserver(verifierDivSpecifique);
  
//   // Configurez l'observateur pour surveiller les changements dans le sous-arbre de la div spécifique
//   var optionsDivSpecifique = { subtree: true, childList: true };
//   observerButtonSpecifique.observe(document.body, optionsDivSpecifique);
  
//   // Réinitialiser le compteur au bout de 7 jours
//   setTimeout(reinitialiserCompteur, 7 * 24 * 60 * 60 * 1000);  // 7 jours en millisecondes
