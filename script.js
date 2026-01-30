// Variables globales
let pays = [];
let questionActuelle = null;
let session = {
    numeroQuestion: 1,
    total: 20,
    score: 0
};

// Éléments DOM
const flagImage = document.getElementById('flag-image');
const progression = document.getElementById('progression');
const quizForm = document.getElementById('quiz-form');
const btnValider = document.getElementById('btn-valider');
const btnSuivant = document.getElementById('btn-suivant');
const feedback = document.getElementById('feedback');
const scoreFinal = document.getElementById('score-final');
const scoreText = document.getElementById('score-text');
const btnNouvelleSession = document.getElementById('btn-nouvelle-session');

// Charger la liste des pays depuis le JSON
async function chargerPays() {
    try {
        const response = await fetch('data/pays.json');
        pays = await response.json();
        demarrerSession();
    } catch (error) {
        console.error('Erreur lors du chargement des pays:', error);
        feedback.textContent = 'Erreur lors du chargement des données. Veuillez recharger la page.';
        feedback.className = 'feedback error';
        feedback.classList.remove('hidden');
    }
}

// Démarrer une nouvelle session de quiz
function demarrerSession() {
    session = {
        numeroQuestion: 1,
        total: 20,
        score: 0
    };
    scoreFinal.classList.add('hidden');
    genererQuestion();
}

// Générer une nouvelle question
function genererQuestion() {
    if (pays.length < 4) {
        console.error('Pas assez de pays dans la base de données');
        return;
    }

    // Sélectionner un pays aléatoire pour la bonne réponse
    const indexBonneReponse = Math.floor(Math.random() * pays.length);
    const bonneReponse = pays[indexBonneReponse];

    // Sélectionner 3 autres pays différents pour les mauvaises réponses
    const mauvasesReponses = [];
    while (mauvasesReponses.length < 3) {
        const indexAleatoire = Math.floor(Math.random() * pays.length);
        const paysAleatoire = pays[indexAleatoire];

        // Vérifier que ce pays n'est pas déjà dans les réponses
        if (paysAleatoire.code !== bonneReponse.code &&
            !mauvasesReponses.find(p => p.code === paysAleatoire.code)) {
            mauvasesReponses.push(paysAleatoire);
        }
    }

    // Créer un tableau avec toutes les options et le mélanger
    const options = [...mauvasesReponses, bonneReponse];

    // Algorithme de mélange de Fisher-Yates
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Trouver l'index de la bonne réponse dans le tableau mélangé
    const indexBonneReponseMelange = options.findIndex(p => p.code === bonneReponse.code);

    questionActuelle = {
        bonneReponse: bonneReponse,
        indexBonneReponse: indexBonneReponseMelange,
        options: options
    };

    afficherQuestion();
}

// Afficher la question à l'écran
function afficherQuestion() {
    // Mettre à jour la progression
    progression.textContent = `Question ${session.numeroQuestion}/${session.total}`;

    // Afficher le drapeau
    flagImage.src = `https://flagcdn.com/w320/${questionActuelle.bonneReponse.code}.png`;
    flagImage.alt = `Drapeau à identifier`;

    // Afficher les options
    questionActuelle.options.forEach((pays, index) => {
        const optionSpan = document.getElementById(`option-${index}`);
        optionSpan.textContent = pays.nom;
    });

    // Réinitialiser le formulaire
    quizForm.reset();

    // Réactiver les options
    const radioInputs = document.querySelectorAll('input[name="answer"]');
    radioInputs.forEach(input => input.disabled = false);

    // Réinitialiser l'interface
    btnValider.classList.remove('hidden');
    btnSuivant.classList.add('hidden');
    feedback.classList.add('hidden');
    feedback.className = 'feedback hidden';
}

// Valider la réponse de l'utilisateur
function validerReponse(event) {
    event.preventDefault();

    // Vérifier qu'une réponse a été sélectionnée
    const reponseSelectionnee = document.querySelector('input[name="answer"]:checked');
    if (!reponseSelectionnee) {
        alert('Veuillez sélectionner une réponse');
        return;
    }

    const indexReponse = parseInt(reponseSelectionnee.value);
    const estCorrect = indexReponse === questionActuelle.indexBonneReponse;

    // Désactiver les options
    const radioInputs = document.querySelectorAll('input[name="answer"]');
    radioInputs.forEach(input => input.disabled = true);

    // Afficher le feedback
    feedback.classList.remove('hidden');
    if (estCorrect) {
        feedback.textContent = 'Bravo!';
        feedback.className = 'feedback success';
        session.score++;
    } else {
        feedback.textContent = `Mauvaise réponse... C'était ${questionActuelle.bonneReponse.nom}`;
        feedback.className = 'feedback error';
    }

    // Masquer le bouton valider et afficher le bouton suivant
    btnValider.classList.add('hidden');
    btnSuivant.classList.remove('hidden');
}

// Passer à la question suivante
function questionSuivante() {
    session.numeroQuestion++;

    if (session.numeroQuestion > session.total) {
        afficherScoreFinal();
    } else {
        genererQuestion();
    }
}

// Afficher le score final
function afficherScoreFinal() {
    // Masquer le quiz
    document.querySelector('.flag-container').style.display = 'none';
    quizForm.style.display = 'none';
    btnSuivant.classList.add('hidden');
    feedback.classList.add('hidden');

    // Afficher le score
    scoreText.textContent = `Votre score: ${session.score}/${session.total}`;
    scoreFinal.classList.remove('hidden');
}

// Démarrer une nouvelle session
function nouvelleSession() {
    // Réafficher le quiz
    document.querySelector('.flag-container').style.display = 'flex';
    quizForm.style.display = 'block';

    // Redémarrer
    demarrerSession();
}

// Event listeners
quizForm.addEventListener('submit', validerReponse);
btnSuivant.addEventListener('click', questionSuivante);
btnNouvelleSession.addEventListener('click', nouvelleSession);

// Initialisation au chargement de la page
window.addEventListener('DOMContentLoaded', chargerPays);
