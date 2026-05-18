# DX Facilities — Design System Reference

Ce fichier est la référence technique complète pour le design system. Importé par `CLAUDE.md`.

## Couleurs — Tokens Tailwind

```js
// tailwind.config.ts — extend.colors
'dx-blue': {
  50: '#EAF2FB', 100: '#CFE0F4', 200: '#9EC1E8', 300: '#6BA0DC',
  400: '#3D82CD', 500: '#1F68B1', 600: '#155291', 700: '#0F4074',
  800: '#0B3058', 900: '#07203D'
},
'dx-navy': {
  50: '#E7E8EC', 100: '#C3C5CE', 200: '#8A8DA0', 300: '#4F5470',
  400: '#2A3052', 500: '#13182E', 600: '#0F1426', 700: '#0B0F1D',
  800: '#080B16', 900: '#04060E'
},
'dx-steel': {
  50: '#F6F7F8', 100: '#ECEEF1', 200: '#D8DCE2', 300: '#BAC0CB',
  400: '#929AAA', 500: '#6B7383', 600: '#4E5563', 700: '#383E4A',
  800: '#262B34', 900: '#161A20'
},
'dx-paper': '#FAFBFC'
```

Sémantiques (réservées aux statuts opérationnels uniquement) :
- Success : `#1E8E55` — Warning : `#C98318` — Danger : `#C8331F` — Energy : `#29A07A`

## Couleurs — Mapping sémantique

| Rôle | Token |
|---|---|
| Fond page | `dx-paper` (#FAFBFC) |
| Fond carte | white |
| Fond inversé | `dx-navy-500` (#13182E) |
| Fond brand | `dx-blue-500` (#1F68B1) |
| Titre | `dx-navy-500` |
| Body | `dx-navy-700` (#0B0F1D) |
| Texte muted | `dx-steel-600` (#4E5563) |
| Texte subtle | `dx-steel-400` (#929AAA) |
| Lien | `dx-blue-500`, hover `dx-blue-700` |
| Bordure default | `dx-steel-200` (#D8DCE2) |
| Bordure hover | `dx-steel-300` (#BAC0CB) |
| Bordure brand | `dx-blue-500` |

## Typographie — Classes CSS

| Classe | Police | Size | Weight | Usage |
|---|---|---|---|---|
| dx-display | Barlow Condensed | 84px | 700 | Héros |
| dx-h1 | Barlow Condensed | 48px | 700 | Titres page |
| dx-h2 | Barlow Condensed | 36px | 700 | Titres section |
| dx-h3 | Barlow | 30px | 600 | Titres carte |
| dx-h4 | Barlow | 24px | 600 | Sous-titres |
| dx-lead | Barlow | 20px | 400 | Paragraphe intro |
| dx-body | Barlow | 16px | 400 | Texte courant |
| dx-caption | Barlow | 14px | 500 | Texte secondaire |
| dx-eyebrow | Barlow | 12px | 600, uppercase, tracking 0.14em | Labels catégorie |
| dx-mono | JetBrains Mono | 14px | 400, tabular-nums | Data, IDs |

## Spacing

Base 4px. Échelle : 4 8 12 16 20 24 32 40 48 64 80 96 128.

Sections marketing : padding-y 80–128px. Container max : 1280px. Gutter : 24px.

## Shadows (teintées navy)

```css
--shadow-xs:  0 1px 2px rgba(19,24,46,0.06);
--shadow-sm:  0 2px 4px rgba(19,24,46,0.08), 0 1px 2px rgba(19,24,46,0.04);
--shadow-md:  0 6px 16px rgba(19,24,46,0.10), 0 2px 4px rgba(19,24,46,0.05);
--shadow-lg:  0 18px 40px rgba(19,24,46,0.14), 0 4px 10px rgba(19,24,46,0.06);
--shadow-focus: 0 0 0 3px rgba(31,104,177,0.30);
```

## Composants — Spécifications

### Nav sticky
- H : 72px
- Fond : `rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)`
- Logo H : 36px à gauche
- Liens : Barlow 14px/500, couleur `dx-navy-700`, hover `dx-blue-700`
- Lien actif : couleur `dx-blue-500` + barre 2px cobalt dessous
- CTA à droite : `.btn--primary`
- Bordure basse : `1px solid dx-steel-100`

### Boutons
| Variante | Fond | Texte | Bordure | Hover |
|---|---|---|---|---|
| primary | `dx-blue-500` | white | none | `dx-blue-600` |
| secondary | white | `dx-navy-500` | `dx-steel-200` | bordure `dx-navy-500` |
| ghost | transparent | `dx-blue-500` | none | fond `dx-blue-50` |
| inverse | white | `dx-navy-500` | none | fond `dx-steel-50` |

Tous : padding 10px 18px, radius 6px, font 15px/600. Taille lg : 14px 22px, font 16px.

### Eyebrow
- Barlow 12px SemiBold, uppercase, tracking 0.14em, couleur `dx-blue-500`
- Précédé d'un trait horizontal : 24px × 2px `dx-blue-500`

### Carte service
- Fond white, bordure `1px solid dx-steel-100`, radius 10px
- Padding 24px, min-height 240px, flex column, gap 14px
- Icône : 42×42px, fond `dx-navy-500`, texte white, radius 8px
- Titre : Barlow 18px/600
- Description : 14px, couleur `dx-steel-500`
- Hover : bordure `dx-steel-300`, shadow-md, border-top 2px `dx-blue-500`

### KPI Band
- Fond : `dx-navy-500`, full-width
- Grille 4 colonnes, gap 32px
- Valeur : Barlow Condensed Bold 64px, white, tabular-nums
- Unité : 28px, couleur `dx-blue-300`
- Label : 13px, `rgba(255,255,255,0.6)`
- Bande diagonale décorative en accent

### Hero
- Fond : `dx-navy-500`, overflow hidden
- Grille : `1.1fr 1fr`, gap 64px, padding 120px 32px
- H1 : Barlow Condensed Bold 72px, leading 1.0
- Accent dans H1 : couleur `dx-blue-300`
- Sous-titre : 18px, `rgba(255,255,255,0.75)`, max-w 520px
- Image : radius 16px, aspect 4/5, scrim gradient en bas
- 3 bandes diagonales cobalt (`rotate(-50deg)`) en décoration

### CTA Band
- Fond : `dx-blue-500`, texte white, padding 80px 0
- Flex justify-between, align center
- H2 : Barlow Condensed Bold 42px, max-w 640px
- Boutons : `.btn--inverse` (blanc sur cobalt)

### Footer
- Fond : `dx-navy-500`, texte `rgba(255,255,255,0.7)`
- Grille : `1.4fr 1fr 1fr 1fr`, gap 32px
- Colonne brand : logo H 32px + description 14px
- Titres colonnes : 12px, 600, uppercase, tracking 0.14em, white
- Liens : 14px, hover white
- Séparateur : `1px solid rgba(255,255,255,0.08)`
- Bottom bar : flex between, 13px, `rgba(255,255,255,0.5)`

### Formulaire contact
- Layout : grille `1.2fr 1fr`, gap 80px
- Labels : 13px/600
- Inputs : padding 10px 12px, H 42px, radius 6px, bordure `dx-steel-200`, shadow-xs
- Focus : bordure `dx-blue-500`, shadow-focus
- Sidebar : fond `dx-navy-500`, radius 12px, padding 32px

### Placeholder photo
- Fond : `dx-steel-100`
- Bordure : `1px dashed dx-steel-200`
- Icône caméra centrée + label "Photo · 16:9"
- Utiliser quand aucune photo réelle n'est disponible

## Icônes Lucide — Mapping services

| Service | Icône Lucide |
|---|---|
| Maintenance technique | `Wrench` |
| Gestion d'actifs | `BarChart3` |
| Smart buildings | `Cpu` |
| Maintenance prédictive | `Activity` |
| Efficacité énergétique | `Zap` |
| Sécurité | `Shield` |
| Nettoyage professionnel | `Sparkles` |
| Accueil & courrier | `Users` |

Tailles : 20px inline, 24px cartes, 28px nav. Stroke 1.75px. Couleur : `currentColor`.
