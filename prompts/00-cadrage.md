# Prompt 00 — Cadrage

> À coller tel quel dans Claude Code, en **mode plan** (Maj + Tab), depuis la racine du dossier `name-poc`.

---

Tu vas construire le POC du site e-commerce de NAME. pour des tests utilisateurs. Cette première session pose le cadre, sans coder d'écran.

1. Lis `CLAUDE.md`, puis tous les fichiers qu'il référence. Lis aussi `docs/protocole-test.pdf` et `docs/personas.pdf`. Ignore les fichiers qui commencent par « À remplir ».
2. Vérifie que le serveur MCP de Figma répond, en lisant seulement la frame « Lisez-moi » (lien dans `design/liens-figma.md`).
3. Résume-moi en 10 lignes maximum ce que tu as compris : la marque, les missions du test, les règles qui ne se discutent pas.
4. Liste les incohérences ou les manques que tu repères entre les maquettes, le catalogue, les routes et le PRD.
5. Propose l'arborescence de `site/` (pages, CSS, modules JS) et l'ordre de construction, en suivant les fichiers de `prompts/`.

Ensuite, après ma validation seulement :

6. Initialise Git et crée un `.gitignore`.
7. Crée la structure de `site/` avec : `tokens.css` vide mais commenté, l'en-tête et le pied de page communs, la page `indisponible.html`, et un module qui charge `data/catalogue.json`.
8. Lance le serveur local et vérifie que `site/index.html` s'ouvre sans erreur dans la console.
9. Ajoute la première entrée de `docs/journal.md`, puis propose le commit.

Ne construis aucun écran des maquettes dans cette session : le design system vient au prompt 01, les flows ensuite.
