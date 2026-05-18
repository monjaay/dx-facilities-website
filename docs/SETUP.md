# DX Facilities — Guide de Setup Projet

Étapes pour initialiser le projet. Exécuter dans l'ordre.

## 1. Créer le projet Next.js

```bash
npx create-next-app@latest dx-facilities-website \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
cd dx-facilities-website
```

## 2. Installer les dépendances

```bash
npm install lucide-react
npm install -D prettier eslint-config-prettier
```

## 3. Copier les assets

```bash
# Polices → public/fonts/
mkdir -p public/fonts public/images

# Copier les woff2 depuis le design system :
# Barlow-Regular.woff2, Barlow-Medium.woff2, Barlow-SemiBold.woff2,
# Barlow-Bold.woff2, BarlowCondensed-SemiBold.woff2,
# BarlowCondensed-Bold.woff2, JetBrainsMono-Regular.woff2

# Copier les logos dans public/images/ :
# logo.png, logo-dark.png, logo-mark.png
```

## 4. Créer la structure des dossiers

```bash
mkdir -p src/components/{layout,sections,ui,shared}
mkdir -p src/data
mkdir -p docs
```

## 5. Placer les fichiers d'instructions

```
Racine du projet :
├── CLAUDE.md            ← Instructions projet Claude Code
├── docs/
│   ├── DESIGN_SYSTEM.md ← Référence design system
│   └── BRIEF.md         ← Brief complet du site
```

## 6. Configurer tailwind.config.ts

Ajouter les tokens DX dans `theme.extend` — voir `docs/DESIGN_SYSTEM.md` pour les valeurs exactes.

## 7. Configurer globals.css

Ajouter les `@font-face` pour les 7 polices woff2 avec `font-display: swap`.

## 8. Ordre de développement recommandé

1. `globals.css` — reset + @font-face + classes utilitaires DX
2. `tailwind.config.ts` — tokens couleurs, fonts, shadows, radii
3. `src/data/` — services.ts, team.ts, kpis.ts
4. `src/components/layout/` — Navbar, Footer, Container
5. `src/app/layout.tsx` — layout global avec nav + footer
6. `src/app/page.tsx` — page accueil (hero → services → KPI → case study → CTA)
7. `src/app/services/page.tsx` — liste services
8. `src/app/services/[slug]/page.tsx` — détail service
9. `src/app/contact/page.tsx` — formulaire + sidebar
10. `src/app/a-propos/page.tsx` — mission + équipe
11. `src/app/dextera-group/page.tsx` — écosystème groupe
12. Responsive pass sur tous les composants
13. SEO : meta tags, OG, sitemap, robots.txt
14. Performance : lighthouse audit, optimisation images
