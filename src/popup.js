// Récupération des élèments du DOM
const resetBtn = document.getElementById("resetBtn");
const countElement = document.getElementById("valeurAffichee");
const lastCountElement = document.getElementById("derniereValeur");

// Fonction pour mettre à jour l'affichage du compteur
function updateCounterDisplay() {
  // Récupération des valeurs du compteur et de la dernière valeur depuis le stockage Chrome
    chrome.storage.sync.get(["compteur", "derniereValeur"], (res) => {
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
    });
}

// Fonction pour réinitialiser le compteur
function resetCounter() {
  // Demande de confirmation à l'utilisateur
    var confirmation = confirm("Are you sure you want to reset this counter ?");

    if (confirmation) {
        // Récupère la dernière valeur du compteur avant la réinitialisation
        chrome.storage.sync.get(["compteur"], (res) => {
        if ("compteur" in res) {
            let count = parseInt(res.compteur, 10);
            // Enregistre la dernière valeur avant réinitialisation
            chrome.storage.sync.set({ derniereValeur: count }, () => {
                // Réinitialise le compteur
                chrome.storage.sync.remove("compteur", () => {
                    chrome.storage.sync.remove("clicDetails", () => {
                    updateCounterDisplay(); // Met à jour l'affichage après réinitialisation
                    });
                });
            });
        } else {
            // Réinitialise le compteur
            chrome.storage.sync.remove("clicDetails", () => {
                updateCounterDisplay(); // Met à jour l'affichage après réinitialisation
            });
        }
        });
    }
}

// Initialise l'affichage au chargement de la page
updateCounterDisplay();

// Ajout d'un gestionnaire d'événements au bouton de réinitialisation
resetBtn.addEventListener("click", () => {
    resetCounter();
});
