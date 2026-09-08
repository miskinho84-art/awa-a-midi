# 🍽️ AWA à Midi — Site web & commande WhatsApp

> **Le goût qui vous donne rendez-vous à midi.**

Site premium, mobile-first, pour le restaurant **AWA à Midi** : menu filtrable avec fiches détaillées,
panier multi-produits, commande WhatsApp pré-remplie, plat vedette 3D, avis clients, galerie,
horaires, localisation et contact.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Générer la version de production (→ dist/index.html, fichier unique)
npm run build
```

> Prérequis : [Node.js](https://nodejs.org) 18 ou supérieur.
> Les images sont automatiquement optimisées avant chaque build (`npm run images` pour le faire à la main).

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Optimise les images puis génère `dist/index.html` |
| `npm run preview` | Prévisualise le build de production |
| `npm run images` | Génère les images optimisées (`src/assets/images/optimized/`) |
| `npm run typecheck` | Vérification TypeScript |

---

## 🔧 Administrer le site (sans toucher aux composants)

Toutes les informations susceptibles de changer sont centralisées :

| Quoi modifier | Fichier |
| --- | --- |
| **Numéro WhatsApp** (`WHATSAPP_NUMBER`), téléphone, email, adresse, horaires, réseaux sociaux, chiffres clés | `src/config/restaurant.ts` |
| **Plats** : nom, description, prix FCFA, catégorie, image, badge, disponibilité, plat vedette + fiche détail (`longDescription`, `ingredients`, `prepTime`, `spiceLevel`) | `src/data/menu.ts` |
| **Avis clients** | `src/data/reviews.ts` |
| **Photos de la galerie** | `src/data/gallery.ts` |
| Liens de navigation | `src/config/navigation.ts` |
| Couleurs, polices, ombres, animations | `src/index.css` (bloc `@theme`) |
| Titre, description SEO, balises Open Graph | `index.html` |

### 📱 Numéro WhatsApp

Dans `src/config/restaurant.ts`, format international **sans `+` ni espaces** :

```ts
export const WHATSAPP_NUMBER = "2250701020304";
```

### 🍗 Ajouter un plat

1. Déposez la photo dans `src/assets/images/` (la version optimisée sera générée au build).
2. Ajoutez l'entrée dans `src/data/menu.ts`.

---

## 🌐 Déploiement

Le build produit **un seul fichier** `dist/index.html` : il se déploie n'importe où.

### Vercel (recommandé) ⚡

Le projet est prêt pour Vercel (`vercel.json` inclus).

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importez le dépôt.
3. Vercel détecte automatiquement Vite. Cliquez sur **Deploy**.

Chaque `push` sur `main` redéploie automatiquement le site.

### GitHub Pages

Un workflow est fourni dans `.github/workflows/deploy.yml`. Après avoir poussé le dépôt :

1. Sur GitHub : **Settings → Pages → Source : GitHub Actions**.
2. Chaque `push` sur `main` déploie automatiquement le site.

---

## 📄 Licence

© 2026 AWA à Midi — Tous droits réservés.
