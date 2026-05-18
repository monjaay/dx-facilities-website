# DX Facilities — Site Web Marketing

Site vitrine B2B pour DX Facilities, société de facility management intégrée au Sénégal (membre de DEXTERA GROUP). Audience : facility managers, COOs, directeurs immobiliers. Langue principale : français.

## Stack

- Next.js 14+ (App Router)
- TypeScript strict
- Tailwind CSS (tokens custom DX — voir `tailwind.config.ts`)
- `lucide-react` pour les icônes
- Polices self-hosted : Barlow, Barlow Condensed, JetBrains Mono (fichiers woff2 dans `public/fonts/`)

## Commands

- `npm run dev` — serveur local
- `npm run build` — build production
- `npm run lint` — ESLint + Prettier
- `npx next lint` — lint Next.js

## Key Directories

- `src/app/` — pages (App Router)
- `src/components/` — composants React (layout/, sections/, ui/)
- `src/data/` — fichiers de données TS (services, team, kpis)
- `public/fonts/` — polices woff2 self-hosted
- `public/images/` — logos et assets visuels
- `docs/` — brief et design system de référence

## Pages

```
/ → Accueil (hero, services grid, KPI band, case study, CTA band)
/services → Liste des 8 services
/services/[slug] → Détail service (8 pages dynamiques)
/a-propos → Mission, valeurs, équipe leadership
/dextera-group → Présentation écosystème groupe
/contact → Formulaire + coordonnées
```

## Design System — Règles critiques

Référence complète : @docs/DESIGN_SYSTEM.md

**Couleurs** — UNE SEULE couleur de marque par écran : DX Cobalt `#1F68B1`. Navy `#13182E` pour titres et sections inversées. Neutres acier pour le reste. JAMAIS de violet, teal, ou gradients en fond.

**Typo** — Barlow Condensed Bold pour display/H1/H2. Barlow Regular pour body. JetBrains Mono pour data/KPIs. Eyebrows en Barlow SemiBold 12px uppercase tracking 0.14em, couleur cobalt.

**Composants** — Bordures fines 1px (pas d'ombres lourdes). Cartes avec border-top 2px cobalt au hover. Boutons radius 6px, jamais ALL-CAPS. Coins arrondis : 6px CTAs, 10px cartes, 16px images hero.

**Motif diagonal** — Bandes diagonales `rotate(-50deg)` issues du logo, utilisées dans hero et KPI band. UNE SEULE instance par surface.

**Animation** — Ease `cubic-bezier(0.2, 0, 0, 1)`. 120ms hover, 180ms transitions, 240-360ms entrées. Fade-rise 8px au scroll. JAMAIS de parallax, 3D, ou bounce.

## Conventions de code

- Named exports uniquement, pas de `export default` (sauf pages Next.js)
- Composants : un fichier par composant, PascalCase
- Données centralisées dans `src/data/` — jamais de texte hardcodé dans les composants
- Tous les textes en français dans les composants. Commentaires code en anglais
- Tailwind : utiliser les classes custom `dx-*` pour les couleurs/fonts
- Images : toujours `next/image` avec alt text descriptif
- Pas de `any` en TypeScript — utiliser `unknown` et narrower

## Conventions de contenu

- Vouvoiement systématique, jamais "tu"
- Ton pragmatique, opérationnel, confiant. Pas de jargon corporate
- Le client est le héros : "Vous gagnez..." pas "Nous vendons..."
- Casing titres : sentence case en français
- Nombres ≥ 1000 : espace fine (`312 000 m²`)
- JAMAIS d'emoji — nulle part

## Responsive

- Mobile-first. Breakpoints : sm(640) md(768) lg(1024) xl(1280) 2xl(1440)
- Grille services : `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`
- Hero : `grid-cols-1 lg:grid-cols-2`
- Nav : hamburger menu sur mobile (slide-in, fond navy)
- Footer : 4 colonnes → 2 → 1

## SEO

- Balises meta en français sur chaque page
- Open Graph + Twitter Cards
- Schema.org LocalBusiness
- `lang="fr"` sur `<html>`
- Alt text sur toutes les images
- Sitemap.xml + robots.txt

## Avoid

- JAMAIS `Inter`, `Roboto`, `Arial` ou polices système — utiliser Barlow uniquement
- JAMAIS de gradients colorés en fond — seuls les scrims sur images sont autorisés
- JAMAIS de coins arrondis > 16px (sauf status chips pill à 999px)
- JAMAIS de stock photos "smiles in suits" — placeholders avec icône caméra si pas de photo
- JAMAIS de localStorage/sessionStorage dans les composants
- JAMAIS de `<form>` HTML brut — utiliser React event handlers
- Ne pas installer Google Fonts — polices self-hosted uniquement
- Ne pas utiliser de bibliothèques d'animation (Framer Motion, GSAP) — CSS transitions uniquement

## Workflow

- Toujours `npm run build` pour vérifier avant de commit
- Créer les pages dans l'ordre : Layout global → Accueil → Services → Contact → À propos → Groupe
- Tester le responsive à chaque composant créé
- Vérifier les contrastes WCAG AA sur les textes muted

## Logo

- URL Cloudinary : `https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png`
- Fichiers locaux dans `public/images/` : logo.png, logo-dark.png, logo-mark.png
- Hauteur nav : 36px. Ne jamais recolorer, étirer, ou placer sur fond cobalt

## Contact

- Tél fixe : +221 33 843 14 64
- Mobile : +221 77 547 03 46
- Adresse : Rte de l'aéroport, lot N°88106, Yoff ONOMO, Dakar
- Email : info@dxfacilities.com
