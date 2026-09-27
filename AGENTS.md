# Consignes pour les agents

## Projet et périmètre

Sudomarchy est le blog personnel de PO Martel, publié sur <https://sudomarchy.com>.
Il présente ses astuces et personnalisations d’Omarchy et de Hyprland : raccourcis,
fenêtres, outils Bash, autonomie, audio, sauvegardes et installation de ses machines.
Le site statique utilise Astro, TypeScript et Tailwind CSS, sur une base AstroPaper.

- Ne créer ni proposer de nouvel article sans demande explicite. Modifier les articles uniquement dans le cadre demandé.
- Les commandes et chemins présents dans les articles sont des exemples pour les lecteurs. Leur édition n’autorise pas à les exécuter ni à modifier la configuration de la machine.
- Limiter les changements au besoin exprimé ; préserver le travail déjà présent dans le dépôt.
- Après les changements, committer et pousser uniquement les fichiers concernés. Présenter les différences importantes et un lien vers le commit GitHub.
- Ne jamais ajouter de secrets ou de fichiers `.env` au dépôt.

## Voix et contenu

- Conserver l’anglais des articles et de l’interface, sauf demande de traduction.
- Préserver la voix personnelle à la première personne : ton direct, amical, concret, parfois humoristique, sans discours promotionnel.
- Les tutoriels partent généralement d’un problème vécu, expliquent la solution et donnent de courts exemples de configuration ou de commandes.
- Ne pas inventer d’expérience personnelle, de résultat de test ou de compatibilité avec une version d’Omarchy ou de Hyprland. Vérifier les affirmations techniques modifiées à partir des sources pertinentes.
- Conserver les crédits, liens vers les sources et notes de mise à jour. Éviter une réécriture générale pour une correction ponctuelle.

## Repères dans le dépôt

| Chemin | Rôle |
| --- | --- |
| `src/content/blog/_YYYY/` | Articles Markdown classés par année |
| `src/content.config.ts` | Collection et schéma des métadonnées |
| `src/consts.ts` | Identité du site, langue, fuseau horaire et options globales |
| `src/constants.ts` | Liens sociaux complémentaires |
| `src/config.ts` | Réexportation des constantes |
| `src/pages/` | Pages, routes des articles, RSS et recherche |
| `src/layouts/`, `src/components/` | Gabarits et composants Astro |
| `src/styles/` | Styles globaux, typographie, code et alertes |
| `src/assets/images/` | Images des articles traitées par Astro |
| `public/` | Fichiers servis tels quels, dont vidéos, polices et favicon |
| `src/utils/` | URLs, filtrage des articles, images et transformations Markdown |
| `tests/` | Tests Node de résolution des images et de transformation Markdown |
| `astro.config.mjs` | Intégrations, Markdown, Shiki et sitemap |
| `vercel.json` | Construction, redirections et en-têtes HTTP pour Vercel |

## Conventions des articles

- Utiliser un fichier `.md` au nom descriptif en kebab-case dans `src/content/blog/_YYYY/`.
- Les champs obligatoires sont `title`, `description` et `pubDatetime` — pas `pubDate`. Le schéma de `src/content.config.ts` fait autorité.
- Employer des dates ISO 8601. `pubDatetime` accepte une chaîne ; écrire `modDatetime` comme une date YAML non citée, par exemple `modDatetime: 2026-09-27`.
- Préserver la date de publication ; utiliser `modDatetime` pour une mise à jour substantielle. Ne pas changer `draft` ou `unlisted` sans raison liée à la demande.
- `draft: true` exclut l’article de la production. `unlisted: true` le masque des listes et du RSS, mais laisse sa page accessible ; ce n’est pas une protection d’accès.
- Les répertoires préfixés par `_` sont omis de l’URL : `_2026/colour-the-cat.md` donne `/posts/colour-the-cat`. Éviter les noms identiques entre années et préserver les URLs publiées ; prévoir une redirection dans `vercel.json` si un renommage est nécessaire.
- Une date future filtre les listes en production via `postFilter.ts`, mais n’empêche pas la génération de la page. Ne pas la considérer comme équivalente à un brouillon.
- Placer les nouvelles images d’articles dans `src/assets/images/`. Dans le Markdown, `![Texte alternatif](image.png)` est résolu depuis ce dossier ; `heroImage: image.png` et `ogImage: image.png` utilisent aussi cette convention. Fournir les textes alternatifs appropriés.
- Les chemins commençant par `/` désignent des fichiers de `public/` ; les chemins relatifs explicites et les URLs distantes restent possibles. Ne pas déplacer les médias existants sans mettre à jour leurs références.
- Conserver les langages des blocs de code, l’attribut `file=...` et les annotations Shiki (`[!code ++]`, `[!code --]`, `[!code highlight]`). Le brouillon `code-block-highlights.md` fournit des exemples.

## Commandes et validation

Utiliser npm et conserver `package-lock.json` cohérent avec `package.json`.

- `npm ci` : installer les dépendances verrouillées.
- `npm test` : exécuter les tests existants.
- `npm run build` : construire le site dans `dist/`, puis son index Pagefind.
- `npm run build:check` : vérifier les types Astro avant la construction et l’indexation.
- `npm run lint` / `npm run check` : contrôles Biome sur `src/`.

Pour une modification de contenu ou de rendu, lancer la construction. Pour une
modification de logique, lancer aussi les tests concernés ; utiliser
`build:check` pour les changements Astro ou TypeScript. Pour de la documentation
seule, relire les chemins, commandes et exemples, puis lancer `git diff --check`.
Signaler les échecs et leurs limites sans les présenter comme des validations réussies.

Ne pas lancer de serveur persistant en mode agent par défaut ; privilégier la
construction et ne lancer un aperçu que si demandé. Éviter les commandes de
formatage global qui modifieraient des fichiers hors périmètre.

Ne pas mettre à jour les dépendances pour une simple édition de contenu. Si une
mise à jour est demandée, vérifier les versions avec `npm outdated` et
`npm view <paquet> version`, viser les versions stables compatibles et ne pas
rétrograder pour contourner une erreur. Certains scripts déclarés (`deploy`,
`add-source-metadata`, `remove-tags`) pointent vers des fichiers absents : ne pas
les recommander comme commandes opérationnelles.
