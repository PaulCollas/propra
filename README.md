<div align="center">

![Propra Banner](./public/propra.jpeg)


**La gestion immobilière réinventée.**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Node](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-2dd4bf?style=flat-square)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-Beta-f97316?style=flat-square)]()
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://propra-delta.vercel.app)

[🌐 Landing page](https://propra-delta.vercel.app) · [🚀 Voir l'application](https://propra-delta.vercel.app/app/) · [🐛 Signaler un bug](../../issues) · [💡 Proposer une feature](../../issues)

</div>

---

## À propos

**Propra** est une application web moderne et gratuite dédiée à la gestion immobilière. Conçue pour les particuliers comme pour les professionnels, elle centralise biens, locataires, finances et tâches en un seul espace épuré et intuitif.

Inspirée des meilleures UX du marché — Airbnb, Notion, Revolut — Propra mise sur la fluidité, les micro-animations et un design dark mode premium pour rendre la gestion immobilière aussi agréable qu'efficace.

---

## Fonctionnalités

| Module | Détail |
|--------|--------|
| 🏢 **Biens** | Ajout, modification, suivi par type (appartement, maison, commercial) avec sparklines de tendance |
| 👥 **Locataires** | Base de données, historique des paiements, statuts, communication directe |
| 💰 **Finances** | Loyers, charges, rapports graphiques, alertes d'échéance |
| 🔧 **Tâches** | Suivi des interventions, priorités, assignation prestataires |
| 📊 **Dashboard** | Vue d'ensemble animée avec compteurs, sparklines et alertes temps réel |

---

## Stack technique

- **Framework** — [React 19](https://react.dev) avec hooks custom
- **Bundler** — [Vite 6](https://vitejs.dev)
- **Animations** — Inspirées de [ReactBits](https://reactbits.dev) (inline, zéro dépendance)
- **Typographie** — Montserrat + Poppins via Google Fonts
- **Styles** — CSS-in-JS inline, variables CSS, responsive natif
- **Déploiement** — Compatible Vercel, Netlify, Cloudflare Pages

---

## Démarrage rapide

### Prérequis

- Node.js **22.x** ou supérieur
- npm **9+**

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/ton-username/propra.git
cd propra

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'app est disponible sur [http://localhost:5173](http://localhost:5173).

### Build de production

```bash
npm run build
npm run preview
```

---

## Structure du projet

```
propra/
├── public/
│   └── mockup-banner.jpeg       # Image bannière README
├── src/
│   ├── App.jsx                  # Application complète (composants + animations)
│   ├── main.jsx                 # Point d'entrée React
│   └── index.css                # Reset CSS global
├── index.html                   # Template HTML + Google Fonts
├── vite.config.js
└── package.json
```

---

## Aperçu des pages

```
/ Dashboard     → Vue globale, stats animées, alertes
/ Biens         → Cartes propriétés, sparklines, détail dépliable
/ Locataires    → Liste, statuts paiement, contact direct
/ Finances      → Graphique 6 mois, revenus / charges / solde
/ Tâches        → Checklist interactive, priorités, click spark
```

---

## Animations intégrées (ReactBits)

Toutes les animations sont implémentées directement dans le code, sans dépendance externe :

- `useFadeIn` — apparition en stagger au montage des composants
- `AnimatedCounter` — compteurs qui s'incrémentent à l'affichage
- `SparkLine` — mini graphiques SVG de tendance
- `StarBorder` — bordure tournante sur les boutons CTA
- `ClickSpark` — particules au clic (checkboxes, boutons)
- `ShimmerText` — effet shimmer sur les titres
- `AuroraBackground` — blobs lumineux animés en arrière-plan

---

## Déploiement

L'application est déployée en production sur Vercel :

| | URL |
|---|---|
| 🌐 **Landing page** | [propra-delta.vercel.app](https://propra-delta.vercel.app) |
| 🚀 **Application** | [propra-delta.vercel.app/app/](https://propra-delta.vercel.app/app/) |

Chaque `git push` sur `main` déclenche un redéploiement automatique.

```bash
# Déployer manuellement avec la CLI
npm i -g vercel
vercel --prod
```

---

## Roadmap

- [ ] Authentification (Supabase / Clerk)
- [ ] Base de données réelle (Supabase / PlanetScale)
- [ ] Upload de documents et photos par bien
- [ ] Notifications push (loyers en retard, échéances)
- [ ] Export PDF des rapports financiers
- [ ] Mode multi-utilisateur / équipe
- [ ] Application mobile (React Native / Expo)
- [ ] Version PWA installable

---

## Contribuer

Les contributions sont les bienvenues ! Pour proposer une amélioration :

1. Fork le projet
2. Crée une branche — `git checkout -b feat/ma-feature`
3. Commit — `git commit -m "feat: description"`
4. Push — `git push origin feat/ma-feature`
5. Ouvre une Pull Request

---

## Licence

Distribué sous licence **MIT**. Voir [LICENSE](./LICENSE) pour plus d'informations.