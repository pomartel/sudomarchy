# Sudomarchy

Le blog personnel de **PO Martel**, enseignant en informatique à Montréal,
développeur et passionné de Linux : **<https://sudomarchy.com>**.

Les articles, rédigés en anglais, partagent des astuces et des personnalisations
d’Omarchy et de Hyprland : raccourcis clavier, gestion des fenêtres, outils en
ligne de commande, autonomie, audio, sauvegardes et scripts d’installation.

Le site repose sur **Astro**, **TypeScript** et **Tailwind CSS**, à partir du thème
[AstroPaper](https://github.com/satnaing/astro-paper). Il comprend une recherche
Pagefind, un [flux RSS](https://sudomarchy.com/rss.xml) et des thèmes clair et sombre.

## Développement local

Prérequis : Node.js 22.12.0 ou supérieur, et npm.
TypeScript reste en version 6, compatible avec `@astrojs/check`.

```bash
npm ci
npm run dev
```

Le serveur de développement est accessible par défaut à <http://localhost:4321>.

| Commande | Fonction |
| --- | --- |
| `npm run build` | Générer le site dans `dist/` et l’index de recherche Pagefind |
| `npm run build:check` | Vérifier les types Astro, construire et indexer le site |
| `npm run preview` | Prévisualiser la dernière construction |
| `npm test` | Exécuter les tests Node |
| `npm run lint` | Vérifier le code de `src/` avec Biome |
| `npm run check` | Vérifier le code et le formatage de `src/` avec Biome |

Pour vérifier la recherche Pagefind, construire le site puis utiliser l’aperçu.

## Organisation

```text
src/
  content/blog/_YYYY/  Articles Markdown classés par année
  content.config.ts   Schéma des métadonnées des articles
  assets/images/      Images des articles
  pages/              Pages, routes, RSS et recherche
  layouts/            Gabarits de pages
  components/         Composants Astro
  styles/             Styles et typographie
  utils/              Traitement du contenu et des images
  consts.ts           Identité et options du site
public/               Fichiers statiques, vidéos et polices
tests/                Tests des utilitaires d’images
astro.config.mjs      Configuration Astro et Markdown
vercel.json           Configuration Vercel et redirections
```

Les articles utilisent les champs `title`, `description` et `pubDatetime`.
Les dossiers `_YYYY` servent au classement et n’apparaissent pas dans les URLs :
`src/content/blog/_2026/colour-the-cat.md` correspond à `/posts/colour-the-cat`.
Les images peuvent être référencées par leur nom depuis `src/assets/images/`.
Les conventions éditoriales et les consignes pour les agents sont dans
[AGENTS.md](AGENTS.md).

## Hébergement

Le dépôt contient une configuration Vercel qui utilise `npm run build` et publie
le dossier `dist/`. Les redirections et les en-têtes HTTP sont définis dans
`vercel.json`. Le script `npm run deploy` référence un fichier absent du dépôt ;
il ne constitue pas une procédure de déploiement utilisable en l’état.

## Licences

- Documentation et articles : **CC BY 4.0**.
- Code : **MIT**. Les exemples de code des articles sont utilisables sous l’une ou l’autre licence.

Voir [LICENSE](LICENSE) pour les conditions complètes.
