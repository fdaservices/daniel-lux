# Daniel-Lux — site one-pager

Site vitrine **one-pager** pour **Daniel-Lux Sàrl-s**, entreprise de
construction, rénovation et aménagement à Perlé (Luxembourg).

Construit avec **Next.js 16**, **React 19** et **Tailwind CSS 4**.

## Démarrer

```bash
npm install
node --env-file=.env.local scripts/generate-images.mjs   # génère les visuels (OpenAI)
npm run dev                                               # http://localhost:3000
```

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `node --env-file=.env.local scripts/generate-images.mjs` | Génère le héros, les 8 visuels métiers, l'image OG et les icônes (`--force` pour tout régénérer) |

## Variables d'environnement (`.env.local`)

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Clé Resend pour l'envoi du formulaire de contact |
| `CONTACT_FROM` | Expéditeur (domaine vérifié `wedo.lu`) |
| `CONTACT_TO` | Destinataire (`contact@daniel-lux.lu`) |
| `OPENAI_API_KEY` | Génération d'images (script uniquement) |
| `OPENAI_IMAGE_MODEL` | Optionnel, défaut `gpt-image-1` |

## Architecture

- `src/lib/site.ts` — source unique de vérité (SEO, contact, tracking). **Changer `url`** pour passer au domaine final.
- `src/lib/services.ts` — les 8 corps de métier (grille, schema, footer).
- `src/lib/schema.ts` — données structurées JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb).
- `src/app/page.tsx` — le one-pager (toutes les sections + ancres).
- `src/app/api/contact/route.ts` — endpoint Resend (validation + e-mail HTML).

## SEO & conformité

Métadonnées par page · Open Graph / Twitter · `sitemap.xml` · `robots.txt`
(accueillant pour les IA) · `llms.txt` / `llms-full.txt` · `humans.txt` ·
JSON-LD (rich results) · fil d'Ariane · page 404 · page de remerciement ·
Google Tag Manager (`GTM-TJ8BW6SX`) · Iubenda (consentement cookies).

---

Réalisé par **Cesar Augusto Castrejon Rossier** — [Wedo](https://wedo.lu).
