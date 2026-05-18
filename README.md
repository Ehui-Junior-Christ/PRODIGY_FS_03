# 🌟 Maison Céleste — Plateforme E-Commerce Artisanale

**Maison Céleste** est une application web e-commerce haut de gamme conçue pour une boutique locale spécialisée dans l'épicerie fine, les céramiques artisanales, les thés biologiques et les bougies naturelles.

Ce projet a été développé en respectant scrupuleusement les standards de qualité professionnels les plus stricts, en appliquant les principes de design avancés issus des fichiers de compétences globaux de l'utilisateur :
- 🎨 **Taste Skill (Anti-IA) :** Approche éditoriale et brutaliste raffinée, refusant les clichés visuels génériques (pas de lueurs néon superflues ni de glassmorphism paresseux). Utilisation de typographies de caractère (`Playfair Display` et `Plus Jakarta Sans`) et d'une palette terreuse authentique.
- ⚡ **Emil Kowalski Animation & UI :** Implémentation d'animations fluides basées sur la physique de ressort (Spring physics), de micro-interactions tactiles (`scale: 0.98` au clic) et d'une continuité spatiale lors de l'ouverture des modales et du tiroir latéral.
- 📐 **Impeccable Design & Rigueur :** Respect d'un système spatial strict (grille de 4px/8px), d'une hiérarchie visuelle claire et d'une ergonomie irréprochable.

---

## 🚀 Fonctionnalités Clés Implémentées

### 1. 🛍️ Catalogue de Produits & Navigation
- **Grille de Produits Dynamique :** Présentation élégante avec images haute qualité, balises de catégories, affichage des prix et notes par étoiles.
- **Filtres et Tri Avancés :**
  - **Catégories :** Filtrage instantané entre Épicerie Fine, Céramiques, Thés & Infusions, et Bougies Artisanales.
  - **Recherche en direct :** Barre de recherche filtrant instantanément par titre ou description.
  - **Curseur de Prix (Slider) :** Filtrage dynamique par budget maximum.
  - **Tri :** Options de tri par popularité, notes des clients, ou prix (croissant/décroissant).

### 2. 🛒 Panier d'Achat Interactif (Cart Drawer)
- **Tiroir Latéral (Slide-over) :** S'ouvre avec une animation fluide lors de l'ajout d'un article ou au clic sur le bouton du panier.
- **Gestion en Temps Réel :** Modification des quantités (`+`/`-`), suppression d'articles et calcul automatique du sous-total, des frais de port (offerts dès 50€ avec barre de progression incitative) et du total général.
- **Persistance des Données :** Sauvegarde automatique du panier dans le `localStorage` du navigateur.

### 3. ⭐ Aperçu Rapide & Avis Clients (User Reviews)
- **Modale Quick View :** Vue détaillée du produit avec description complète, ingrédients/spécifications techniques et affichage des avis clients existants.
- **Système d'Avis Interactif :** Formulaire permettant aux clients de soumettre une note sur 5 étoiles et un commentaire, recalculant immédiatement la note moyenne du produit et mettant à jour l'interface.

### 4. 📦 Simulation de Commande & Suivi (Order Tracking)
- **Tunnel de Commande (Checkout) :** Formulaire modal complet simulant la saisie de l'adresse de livraison et le paiement sécurisé.
- **Confirmation de Commande :** Génération instantanée d'un numéro de suivi unique (ex: `CMD-84920`) et d'une date de livraison estimée.
- **Module de Suivi de Commande :** Modale interactive permettant de saisir son numéro de suivi pour consulter l'avancement de la livraison via une timeline visuelle (En préparation ➔ Expédié ➔ En livraison ➔ Livré).

### 5. 💬 Support Client & FAQ (Customer Support)
- **Modale d'Assistance :** Regroupe un formulaire de contact direct (avec validation et notification toast de confirmation) et une section FAQ accordéon animée répondant aux questions sur le Click & Collect et la livraison locale.

---

## 🛠️ Architecture Technique & Technologies

Le projet repose sur une architecture Vanilla propre, modulaire et extrêmement performante, garantissant un affichage instantané et une compatibilité maximale sans dépendance externe complexe :

```text
PRODIGY_FS_03/
│
├── index.html          # Structure sémantique HTML5 (SEO optimisé, accessible)
├── css/
│   └── style.css       # Système de design complet (Variables, Tokens, UI, Animations)
└── js/
    ├── products.js     # Base de données brute des produits artisanaux
    ├── cart.js         # Logique du panier, calculs, checkout et persistance
    └── app.js          # Contrôleurs UI, filtres, modales, avis et suivi
```

### Points Forts Techniques :
- **Zéro Dépendance Externe :** Code 100% natif (HTML5, CSS3, ES6 JavaScript).
- **Accessibilité (a11y) :** Utilisation des attributs `aria-label`, `aria-expanded`, gestion des focus et fermeture des modales via la touche `Échap`.
- **Performances & SEO :** Balises sémantiques (`<header>`, `<main>`, `<article>`, `<section>`), méta-descriptions riches et optimisation du rendu visuel.

---

## 📦 Instructions d'Exécution

Pour tester et explorer l'application sur votre machine locale :

1. Ouvrez le dossier du projet :
   ```bash
   cd c:\TON_ORDINATEUR\Prodigy\PRODIGY_FS_03
   ```

2. Lancez un serveur web local pour profiter pleinement des fonctionnalités JavaScript (notamment les modules et le `localStorage`). Vous pouvez utiliser par exemple l'extension *Live Server* de VS Code, ou une commande Python :
   ```bash
   # Avec Python 3
   python -m http.server 8000
   ```

3. Ouvrez votre navigateur à l'adresse : [http://localhost:8000](http://localhost:8000).

---
*Fait avec passion et rigueur pour PRODIGY_FS_03.*