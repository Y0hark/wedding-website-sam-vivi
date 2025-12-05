# Site de Mariage - Samuel & Viviana 💍

Site web statique pour la célébration du mariage de Samuel & Viviana et du baptême de leurs jumelles Maiëlle et Noa.

**Date :** 1er week-end d'octobre 2026  
**Lieu :** Ardèche, France  
**Thème :** Bohème Chic

## 🎨 Palette de Couleurs

- **Navy Blue** (#1B3A5F) - Couleur principale
- **Rust** (#B7410E) - Accent chaud
- **Terracotta** (#E2725B) - Accent doux
- **Burgundy** (#800020) - Accent profond
- **Sage Green** (#9CAF88) - Accent naturel
- **Ivory** (#FFFFF0) - Fond principal

## 📂 Structure du Projet

```
wedding-website-sam-vivi/
├── index.html          # Structure HTML principale
├── styles.css          # Styles et animations CSS
├── script.js           # JavaScript pour interactions
├── translations.js     # Traductions FR/ES-MX
└── README.md           # Documentation
```

## ✨ Fonctionnalités

### Design & UX
- ✅ **Curseur personnalisé** - Curseur élégant et bohème
- ✅ **Animations smooth** - Fade-in au scroll, hover effects, parallax
- ✅ **Glassmorphism** - Effets de verre sur les cartes
- ✅ **Typographie élégante** - Google Fonts (Cormorant Garamond + Montserrat)
- ✅ **Responsive** - Mobile-first, adapté à tous les écrans
- ✅ **Navigation sticky** - Menu qui s'affiche/cache au scroll

### Sections
1. **Hero** - Photo de couple, noms animés, date et lieu
2. **À Propos** - Histoire du couple et des jumelles
3. **Programme** - Timeline détaillée du week-end (Vendredi-Dimanche)
4. **Informations Pratiques** - Hébergement, draps, météo, lieu
5. **RSVP** - Formulaire de confirmation (intégration Notion)
6. **Galerie** - Photos avec lightbox
7. **FAQ** - Questions fréquentes en accordion
8. **Footer** - Contact et informations

### Fonctionnalités Techniques
- ✅ **Bilingual FR/ES-MX** - Bascule entre français et espagnol mexicain
- ✅ **Scroll Reveal** - Animations au défilement
- ✅ **Lazy Loading** - Chargement optimisé des images
- ✅ **Accessibilité** - Navigation clavier, contraste, ARIA
- ✅ **Performance** - Optimisations diverses

## 🚀 Installation et Utilisation

### Ouvrir le site localement

1. **Cloner ou télécharger** le projet
2. **Ouvrir** `index.html` dans votre navigateur web

C'est tout ! Aucune installation ou serveur requis.

### Serveur de développement (optionnel)

Pour un développement avec rechargement automatique :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrez : `http://localhost:8000`

## 🌐 Système de Traduction

Le site supporte **français** et **espagnol mexicain**.

### Changer la langue
- Cliquez sur les boutons **FR** / **ES** dans la navigation
- La langue du navigateur est détectée automatiquement au chargement

### Ajouter/Modifier des traductions
Éditez le fichier `translations.js` :

```javascript
const translations = {
    fr: {
        nav: {
            home: "Accueil",
            // ...
        }
    },
    es: {
        nav: {
            home: "Inicio",
            // ...
        }
    }
};
```

## 📝 Personnalisation

### 1. Ajouter des photos

Remplacez les placeholders dans `index.html` :

```html
<!-- Remplacer -->
<div class="photo-placeholder">Photo du couple</div>

<!-- Par -->
<img src="images/couple.jpg" alt="Samuel et Viviana">
```

### 2. Intégrer le formulaire RSVP Notion

Dans `index.html`, section RSVP, remplacez :

```html
<div class="notion-embed-placeholder">
    <!-- ... -->
</div>
```

Par votre iframe Notion :

```html
<iframe 
    src="VOTRE_URL_FORMULAIRE_NOTION" 
    width="100%" 
    height="600" 
    frameborder="0">
</iframe>
```

### 3. Modifier la carte Google Maps

Dans `index.html`, section Info, mettez à jour l'URL de l'iframe :

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=VOTRE_EMBED_CODE"
    width="100%" 
    height="300">
</iframe>
```

**Comment obtenir le code :**
1. Allez sur [Google Maps](https://maps.google.com)
2. Cherchez votre adresse
3. Cliquez "Partager" → "Intégrer une carte"
4. Copiez le code iframe

### 4. Ajuster les couleurs

Modifiez les variables CSS dans `styles.css` :

```css
:root {
    --navy-blue: #1B3A5F;
    --rust: #B7410E;
    /* ... autres couleurs ... */
}
```

### 5. Activer le compte à rebours

Décommentez dans `script.js` :

```javascript
// Dans la fonction DOMContentLoaded
initCountdown(); // Décommenter cette ligne
```

Ajoutez dans `index.html` (Hero section) :

```html
<div id="countdown" class="countdown-container"></div>
```

## 🎯 Checklist Avant Mise en Ligne

- [ ] Remplacer tous les placeholders de photos
- [ ] Intégrer le formulaire RSVP Notion
- [ ] Mettre à jour l'adresse Google Maps
- [ ] Vérifier les traductions FR/ES
- [ ] Tester sur mobile/tablette/desktop
- [ ] Vérifier tous les liens
- [ ] Optimiser les images (compression)
- [ ] Tester les formulaires
- [ ] Vérifier l'accessibilité
- [ ] Ajouter l'adresse email de contact dans le footer

## 📱 Compatibilité

- ✅ Chrome / Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (iOS & macOS)
- ✅ Responsive : Mobile, Tablette, Desktop
- ✅ Accessibilité : Navigation clavier, lecteurs d'écran

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Variables CSS, Flexbox, Grid, Animations
- **JavaScript (Vanilla)** - Aucune dépendance externe
- **Google Fonts** - Cormorant Garamond & Montserrat

## 📈 Performance

- ✅ Site statique (chargement ultra-rapide)
- ✅ Lazy loading des images
- ✅ Animations optimisées (GPU)
- ✅ Code minimaliste (pas de framework lourd)
- ✅ Mobile-first

## 📧 Support

Pour toute question concernant le code ou la personnalisation du site, contactez :
- **Email de contact** : À définir dans le footer

## 📄 Licence

Ce site est créé spécifiquement pour le mariage de Samuel & Viviana.  
© 2026 - Tous droits réservés.

---

**Fait avec ❤️ pour Samuel & Viviana**

*Que votre amour soit aussi éternel que ce site web ! 💕*
