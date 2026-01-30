# Quiz des Drapeaux Européens

Application web interactive pour tester vos connaissances sur les drapeaux des pays européens.

## Fonctionnalités

- **50 pays européens** : Tous les pays du continent européen (UE, hors UE, Balkans, etc.)
- **Sessions de 20 questions** : Chaque session comprend 20 questions aléatoires
- **Feedback immédiat** : Affichage de "Bravo!" ou de la bonne réponse en cas d'erreur
- **Score final** : Votre score sur 20 à la fin de chaque session
- **Interface moderne** : Design responsive adapté aux mobiles et tablettes
- **Sans serveur** : Fonctionne entièrement côté client (HTML/CSS/JavaScript)

## Utilisation

1. Ouvrez le fichier `index.html` dans votre navigateur web
2. Une question aléatoire s'affiche avec un drapeau et 4 options
3. Sélectionnez votre réponse et cliquez sur "Valider"
4. Le système vous indique si votre réponse est correcte ou affiche la bonne réponse
5. Cliquez sur "Question suivante" pour continuer
6. Après 20 questions, votre score final s'affiche
7. Cliquez sur "Nouvelle session" pour recommencer

## Structure du projet

```
drapeaux-europeens/
├── index.html          # Page principale
├── style.css           # Feuille de styles
├── script.js           # Logique du quiz
├── data/
│   └── pays.json       # Base de données des 50 pays
└── README.md           # Documentation
```

## Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec gradients et animations
- **JavaScript (Vanilla)** : Logique du quiz sans framework
- **FlagCDN API** : Images des drapeaux (https://flagcdn.com)

## Liste des pays inclus

Le quiz comprend 50 pays européens :

- **Union Européenne (27 pays)** : Allemagne, Autriche, Belgique, Bulgarie, Croatie, Chypre, Danemark, Espagne, Estonie, Finlande, France, Grèce, Hongrie, Irlande, Italie, Lettonie, Lituanie, Luxembourg, Malte, Pays-Bas, Pologne, Portugal, République tchèque, Roumanie, Slovaquie, Slovénie, Suède

- **Hors UE** : Royaume-Uni, Norvège, Suisse, Islande, Liechtenstein, Andorre, Monaco, Saint-Marin, Vatican

- **Balkans** : Albanie, Bosnie-Herzégovine, Kosovo, Macédoine du Nord, Monténégro, Serbie

- **Europe de l'Est** : Biélorussie, Moldavie, Ukraine, Russie

- **Transcaucasie** : Arménie, Azerbaïdjan, Géorgie

- **Autre** : Turquie

## Compatibilité

- Chrome, Firefox, Safari, Edge (versions récentes)
- Responsive : fonctionne sur ordinateur, tablette et mobile
- Nécessite une connexion internet pour charger les images des drapeaux

## Auteur

Projet créé avec l'aide de Claude Code.

## Licence

Libre d'utilisation pour des fins éducatives.
