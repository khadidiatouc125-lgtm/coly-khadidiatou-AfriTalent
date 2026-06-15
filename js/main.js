/* ========================================
   AfriTalent - JavaScript principal
   Auteur : [Khadidiatous]
   
   Ce fichier contient les 
   fonctionnalités JavaScript du site :
   1. Dark mode
   2. Bouton retour en haut
   3. Compteurs animés (simple version)
   4. Filtrage des freelances
   5. Validation du formulaire de contact
======================================== */


/* 1. DARK Mode Bascule entre mode clair et mode sombre */

// On récupère le bouton dark mode
var btnDarkMode = document.getElementById('btn-dark-mode');

// On vérifie si l'utilisateur avait déjà activé le dark mode
var modeSombre = localStorage.getItem('dark-mode');

/* Si oui, on active le dark mode au chargement */
if (modeSombre === 'actif') {
    document.body.classList.add('dark-mode');
    if (btnDarkmode) {
        btnDarkMode.textContent = '☀️ Mode Clair';
    }
}

/* Quand on clique sur le bouton dark mode */
if (btnDarkMode) {
    btnDarkMode.addEventListener('click', function() {
        // On bascule la classe dark-mode sur le body
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            btnDarkMode.textContent = '☀️ Mode Clair';
            localStorage.setItem('dark-mode', 'actif');
        } else {
            btnDarkMode.textContent = '🌙 Mode Sombre';
            localStorage.setItem('dark-mode', 'inactif');
        }
    });
}


/* ========================================
   1. BOUTON "RETOUR EN HAUT"
   Apparaît quand on descend, remonte en douceur
======================================== */

// On récupère le bouton
var btnHaut = document.getElementById('btn-haut');

// On écoute le scroll pour afficher/cacher le bouton
window.addEventListener('scroll', function() {
    if (btnHaut) {
        // Si on a scrollé plus de 300px, on affiche le bouton
        if (window.scrollY > 300) {
            btnHaut.style.display = 'block';
        } else {
            btnHaut.style.display = 'none';
        }
    }
});

// Quand on clique sur le bouton, on remonte en haut
if (btnHaut) {
    btnHaut.addEventListener('click', function() {
        // scrollTo avec "behavior: smooth" pour un défilement doux
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


/* ========================================
   2. COMPTEURS ANIMÉS (version simple)
   Les chiffres s'animent de 0 à leur valeur
======================================== */

// Fonction qui anime un compteur de 0 à une valeur cible
function animerCompteur(element, valeurCible, duree) {
    // On commence à 0
    var valeurActuelle = 0;
    // On calcule le pas d'incrémentation
    var pas = valeurCible / (duree / 16); // 16ms = environ 60 images/seconde

    // setInterval répète une action régulièrement
    var interval = setInterval(function() {
        // On augmente la valeur
        valeurActuelle += pas;

        // Si on a dépassé la valeur cible, on s'arrête
        if (valeurActuelle >= valeurCible) {
            valeurActuelle = valeurCible;
            clearInterval(interval); // On arrête l'intervalle
        }

        // On affiche la valeur arrondie dans l'élément
        element.textContent = Math.floor(valeurActuelle).toLocaleString();
    }, 16);
}

// On récupère tous les éléments avec la classe "chiffre"
var compteurs = document.querySelectorAll('.chiffre');

// On lance l'animation directement au chargement de la page
compteurs.forEach(function(compteur) {
    var valeurCible = parseInt(compteur.dataset.valeur);
    animerCompteur(compteur, valeurCible, 2000);
});


/* ========================================
   3. FILTRAGE DES FREELANCES
   Sur la page freelances.html uniquement
   On filtre les cartes par catégorie
======================================== */

// On récupère tous les boutons de filtre
var boutonsFiltres = document.querySelectorAll('.btn-filtre');
// On récupère toutes les cartes de freelance
var cartesFreelance = document.querySelectorAll('.freelance-carte-container');

// Pour chaque bouton de filtre
boutonsFiltres.forEach(function(bouton) {
    bouton.addEventListener('click', function() {

        // On enlève la classe "actif" de tous les boutons
        boutonsFiltres.forEach(function(b) {
            b.classList.remove('actif');
        });
        // On ajoute "actif" au bouton cliqué
        this.classList.add('actif');

        // On lit la catégorie du bouton cliqué (attribut data-categorie)
        var categorie = this.dataset.categorie;

        // Pour chaque carte de freelance
        cartesFreelance.forEach(function(carte) {
            // Si la catégorie est "tous" ou correspond à la catégorie de la carte
            if (categorie === 'tous' || carte.dataset.categorie === categorie) {
                // On affiche la carte
                carte.style.display = 'block';
            } else {
                // Sinon on la cache
                carte.style.display = 'none';
            }
        });
    });
});


/* ========================================
   4. VALIDATION DU FORMULAIRE DE CONTACT
   On vérifie les champs avant l'envoi
======================================== */

// On récupère le formulaire de contact
var formulaire = document.getElementById('formulaire-contact');

if (formulaire) {
    formulaire.addEventListener('submit', function(event) {
        // On empêche l'envoi réel du formulaire
        event.preventDefault();

        // On récupère les valeurs des champs
        var nom = document.getElementById('nom');
        var prenom = document.getElementById('prenom');
        var email = document.getElementById('email');
        var sujet = document.getElementById('sujet');
        var message = document.getElementById('message');

        // On suppose que tout est valide au départ
        var formulaireValide = true;

        /* -- Validation du nom -- */
        if (nom.value.trim() === '') {
            // Si le champ est vide
            afficherErreur(nom, 'Veuillez entrer votre nom');
            formulaireValide = false;
        } else {
            afficherSucces(nom);
        }

        /* -- Validation du prénom -- */
        if (prenom.value.trim() === '') {
            afficherErreur(prenom, 'Veuillez entrer votre prénom');
            formulaireValide = false;
        } else {
            afficherSucces(prenom);
        }

        /* -- Validation de l'email avec regex -- */
        // La regex vérifie que l'email est au format xxx@xxx.xx
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value)) {
            afficherErreur(email, 'Veuillez entrer un email valide (ex: nom@example.com)');
            formulaireValide = false;
        } else {
            afficherSucces(email);
        }

        /* -- Validation du sujet -- */
        if (sujet.value === '') {
            afficherErreur(sujet, 'Veuillez choisir un sujet');
            formulaireValide = false;
        } else {
            afficherSucces(sujet);
        }

        /* -- Validation du message (minimum 20 caractères) -- */
        if (message.value.trim().length < 20) {
            afficherErreur(message, 'Votre message doit contenir au moins 20 caractères');
            formulaireValide = false;
        } else {
            afficherSucces(message);
        }

        /* -- Si tout est valide, on affiche le message de succès -- */
        if (formulaireValide) {
            // On cache le formulaire
            formulaire.style.display = 'none';
            // On affiche le message de succès
            var msgSucces = document.getElementById('message-succes');
            if (msgSucces) {
                msgSucces.style.display = 'block';
            }
        }
    });
}

/* Fonction qui affiche une erreur sous un champ */
function afficherErreur(champ, messageErreur) {
    // On ajoute la classe "invalide" au champ (style rouge)
    champ.classList.add('invalide');
    champ.classList.remove('valide');

    // On cherche l'élément d'erreur sous le champ
    var elementErreur = document.getElementById('erreur-' + champ.id);
    if (elementErreur) {
        elementErreur.textContent = messageErreur;
    }
}

/* Fonction qui indique qu'un champ est valide */
function afficherSucces(champ) {
    // On ajoute la classe "valide" au champ (style vert)
    champ.classList.add('valide');
    champ.classList.remove('invalide');

    // On vide le message d'erreur
    var elementErreur = document.getElementById('erreur-' + champ.id);
    if (elementErreur) {
        elementErreur.textContent = '';
    }
}


/* ========================================
   ANNÉE DYNAMIQUE DANS LE FOOTER
   JavaScript génère automatiquement l'année
======================================== */
var annee = document.getElementById('annee-courante');
if (annee) {
    annee.textContent = new Date().getFullYear();
}
