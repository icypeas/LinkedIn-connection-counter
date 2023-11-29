// Appeler la fonction pour enregistrer la date d'installation au chargement de la page
enregistrerDateInstallation();

// ====================================Pour la detection du bouton Se connecter ou Connect========================

// Fonction pour détecter le bouton "Se connecter" avec la classe spécifiée
function detecterBoutonSeConnecter() {
  // Sélectionnez le bouton avec la classe spécifiée
  var boutonSeConnecter = document.querySelector(
    'button[class^="artdeco-button"][class$="pvs-profile-actions__action"]'
  );

  // Si le bouton n'est pas trouvé sur la page de profil
  if (!boutonSeConnecter) {
    boutonSeConnecter = document.querySelector(
      'button[class^="artdeco-dropdown__item"]'
    );
  }

  if (!boutonSeConnecter) {
    boutonSeConnecter = document.querySelector(
      'button[class^="artdeco-button"][class$="full-width"]'
    );
  }

  // Vérifiez si le bouton "Se connecter" a été trouvé
  if (boutonSeConnecter) {
    // Ajoutez un gestionnaire d'événements pour le clic sur le bouton
    boutonSeConnecter.addEventListener("click", function () {
      verifierDivSpecifique();
    });

    // Désactivez l'observation après avoir trouvé le bouton
    observerDivSpecifique.disconnect();
  }
}

// Utilisez MutationObserver pour détecter les changements dans le DOM
var observerDivSpecifique = new MutationObserver(detecterBoutonSeConnecter);

// Configurez l'observateur pour surveiller les changements dans le sous-arbr de la div spéciefique
var optionsDivSpecifique = { subtree: true, childList: true };
observerDivSpecifique.observe(document.body, optionsDivSpecifique);

// Appelez la fonction pour détecter le bouton "Se connecter"
detecterBoutonSeConnecter();

// =======================================================FIN==================================================

// ======================Pour réinitialiser tous les dimanches à 23:59:59 et mis à jour de l'affichage========================

const countElement = document.getElementById("valeurAffichee");
const lastCountElement = document.getElementById("derniereValeur");

// Fonction pour mettre à jour l'affichage du compteur
function updateCounterDisplay() {
  chrome.storage.sync.get(
    ["compteur", "derniereValeur", "dateDebutClics"],
    (res) => {
      if ("compteur" in res) {
        let count = parseInt(res.compteur, 10);
        countElement.textContent = count;
      } else {
        countElement.textContent = 0;
      }

      if ("derniereValeur" in res) {
        let lastCount = parseInt(res.derniereValeur, 10);
        lastCountElement.textContent = lastCount;
      } else {
        lastCountElement.textContent = 0;
      }
    }
  );
}

// Fonction pour réinitialiser le compteur chaque dimanche à 23:59:59
function reinitialiserCompteurChaqueDimanche() {
  // Récupère la dernière valeur du compteur avant la réinitialisation
  chrome.storage.sync.get(["compteur", "dateDebutClics"], (res) => {
    if ("compteur" in res) {
      let count = parseInt(res.compteur, 10);

      // Vérifiez si le jour actuel est un dimanche (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)
      const jourActuel = new Date().getDay();
      if (jourActuel === 0) {
        // Enregistre la dernière valeur avant réinitialisation
        chrome.storage.sync.set({ derniereValeur: count }, () => {
          // Réinitialise le compteur
          chrome.storage.sync.remove(
            ["compteur", "clicDetails", "dateDebutClics"],
            () => {
              // Met à jour l'affichage après réinitialisation
              updateCounterDisplay(); 
            }
          );
        });
      }
    } else {
      // Réinitialise le compteur
      chrome.storage.sync.remove(["clicDetails", "dateDebutClics"], () => {
        // Met à jour l'affichage après réinitialisation
        updateCounterDisplay(); 
      });
    }
  });
}

// Initialise l'affichage au chargement de la page
updateCounterDisplay();

// Vérifier si c'est la première utilisation de l'extension
chrome.storage.sync.get("premiereUtilisation", (result) => {
  if (!("premiereUtilisation" in result)) {
    // C'est la première utilisation, initialiser le compteur et sauvegarder la date du début des clics
    const maintenant = new Date();
    const jourActuel = maintenant.getDay();
    if (jourActuel === 0){
      chrome.storage.sync.set(
        {
          compteur: 0,
          premiereUtilisation: true,
          dateDebutClics: new Date().toLocaleString(),
        },
        () => {
          console.log(
            "Extension utilisée pour la première fois. Compteur initialisé à 0."
          );
        }
      );
    }
  }
});

// Configurez le délai pour déclencher la réinitialisation chaque dimanche à 23:59:59
// Calculer le délai jusqu'au prochain dimanche à 23:59:59
const maintenant = new Date();
const joursAvantProchainDimanche = 7 - maintenant.getDay();
const prochainDimanche = new Date(
  maintenant.getFullYear(),
  maintenant.getMonth(),
  maintenant.getDate() + joursAvantProchainDimanche,
  23,
  59,
  59,
  999
);

const delaiJusquaDimanche = prochainDimanche - maintenant;

// Démarrez le délai pour déclencher la réinitialisation chaque dimanche à 23:59:59
setTimeout(() => {
  reinitialiserCompteurChaqueDimanche();
  // Configurez le délai pour déclencher la réinitialisation chaque dimanche suivant à 23:59:59
  setInterval(reinitialiserCompteurChaqueDimanche, 7 * 24 * 60 * 60 * 1000);
}, delaiJusquaDimanche);

// Appeler la fonction toutes les 24 heures (86,400,000 millisecondes)
setInterval(reinitialiserCompteurChaqueDimanche, 86400000);

// =======================================================FIN==================================================

// ============Pour permettre de commencer le comptage n'importe quel jour pendant la première semaine, puis uniquement les lundis par la suite===========================

// Fonction pour incrémenter le compteur chaque fois qu'elle est appelée
function incrementerCompteur() {
  chrome.storage.sync.get({"compteur": 0}, (result) => {
    // // Vérifier si le compteur existe dans le stockage
    // if ("compteur" in result) {
      // Le compteur existe, l'incrémenter
      let clickCount = parseInt(result.compteur, 10) + 1;
      chrome.storage.sync.set({ compteur: clickCount }, () => {});
    // } else {
    //   // Le compteur n'existe pas, le créer et l'initialiser à 1
    //   chrome.storage.sync.set({ compteur: 1 }, () => {});
    // }
  });
}

// Fonction pour vérifier le jour de la semaine avant d'incrémenter le compteur
function verifierJourSemaine() {
  // Récupérer la date actuelle
  const maintenant = new Date();

  // Sinon, autoriser le comptage tous les jours de la semaine
  const jourActuel = maintenant.getDay();
  if (jourActuel >= 0 && jourActuel <= 6) {
    // Incrémenter le compteur
    incrementerCompteur();
  } else {
    // Afficher un message à l'utilisateur pour attendre jusqu'à lundi
    alert("Vous ne pouvez commencer le comptage que du lundi au dimanche.");
  }
}

// Fonction pour enregistrer la date d'installation lors de la première exécution
function enregistrerDateInstallation() {
  chrome.storage.sync.get("dateInstallation", (result) => {
    // Si la date d'installation n'est pas déjà enregistrée, l'enregistrer
    if (!result.dateInstallation) {
      const maintenant = new Date();
      chrome.storage.sync.set({ dateInstallation: maintenant.toDateString() });
    }
  });
}

// Fonction pour afficher le bouton dans la console
function afficherBouton(bouton) {

  const span = bouton.querySelector("span");

  if ((span && (span.textContent.trim() === "Se connecter") || span.textContent.trim() === "Connect")) {
    // Ajouter un écouteur de clic pour afficher le message dans la console
    bouton.addEventListener("click", () => {
      // Vérifier le jour de la semaine avant d'incrémenter le compteur
      verifierJourSemaine();
    });
  }
}

// =======================================================FIN==================================================

// ================================Verifier la div specifique et chercher le bouton Envoyer ou Send==================================================

// Fonction pour vérifier la présence de la div avec la classe spécifique
function verifierDivSpecifique() {
  // Sélectionnez la div avec la classe spécifique
  var divSpecifique = document.querySelector(
    ".artdeco-modal.artdeco-modal--layer-default.send-invite"
  );

  // Vérifiez si la div a été trouvée
  if (divSpecifique) {
    // Sélectionnez le bouton "Envoyer" ou "Send" avec aria-label commençant par "Envoyer" ou "Send"
    var boutonEnvoyer = divSpecifique.querySelector(
      'button[aria-label^="Envoye"]'
    );
    var boutonSend = divSpecifique.querySelector(
      'button[aria-label^="Send"]'
    );

    console.log("boutonEnvoyer", boutonEnvoyer);
    console.log("boutonSend", boutonSend);

    // Vérifiez si le bouton "Envoyer" ou "Send" a été trouvé
    if (boutonEnvoyer || boutonSend) {
      // Sélectionnez le bouton à utiliser pour le gestionnaire d'événements
      var boutonClique = boutonEnvoyer || boutonSend;
      // Ajouter un gestionnaire d'événements pour le clic sur le bouton
      boutonClique.addEventListener("click", function () {
        // Incrémenter le compteur
        verifierJourSemaine();
      });
      return;
    }

  } else {
    // Si la div spécifique n'est pas trouvée, vérifiez le changement de class du bouton
    var elementReseau = document.querySelector('.artdeco-button.artdeco-button--muted[class$="full-width"]');
    if (elementReseau) {
      // Si le changement de class est fait exécutez la fonction verifierJourSemaine()
      verifierJourSemaine();
      // Désactivez l'observation après la première exécution
      observerButtonSpecifique.disconnect();
      return
    }    
  }
}

// Observer pour surveiller les modifications dans le DOM
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Nouveaux nœuds ont été ajoutés
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === 1 &&
          node.matches(
            "button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view"
          )
        ) {
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
document
  .querySelectorAll(
    "button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view"
  )
  .forEach(afficherBouton);

// Utilisez MutationObserver pour détecter les changements dans le DOM
var observerButtonSpecifique = new MutationObserver(verifierDivSpecifique);

// Configurez l'observateur pour surveiller les changements dans le sous-arbre de la div spécifique
var optionsDivSpecifique = { subtree: true, childList: true };
observerButtonSpecifique.observe(document.body, optionsDivSpecifique);

// Appelez la fonction pour rechercher et afficher les boutons existants
document
  .querySelectorAll('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view')
  .forEach(afficherBouton);

// =======================================================FIN===================================================
