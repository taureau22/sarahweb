# Le Panier d'Elif — Site e-commerce Next.js 14

Site e-commerce complet pour pastels artisanaux et jus frais. Next.js 14 App Router + Tailwind CSS. Déployable sur Vercel.

## Stack

- **Framework** : Next.js 14 (App Router)
- **Style** : Tailwind CSS
- **Panier** : Context API React + localStorage
- **Paiement** : CinetPay (MTN, Orange, Wave, Moov)
- **Images** : Next.js Image (optimisation automatique)
- **Déploiement** : Vercel

---

## Installation et démarrage

```bash
cd panier-elif
npm install
npm run dev
```

Site accessible sur **http://localhost:3000**

---

## Configuration CinetPay

### 1. Obtenir vos clés

1. Créez un compte sur [dashboard.cinetpay.com](https://dashboard.cinetpay.com)
2. Allez dans **Mes applications** → **Créer une application**
3. Notez votre **API Key** et votre **Site ID**

### 2. Configurer les variables d'environnement

Modifiez le fichier `.env.local` :

```env
CINETPAY_API_KEY=votre_vraie_cle_api
CINETPAY_SITE_ID=votre_vrai_site_id
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_WHATSAPP_NUMBER=22507XXXXXXXX
```

### 3. Passer en production

Dans `.env.local`, assurez-vous que `NEXT_PUBLIC_SITE_URL` pointe vers votre domaine Vercel.

---

## Déploiement sur Vercel

### Option 1 — Interface Vercel (recommandé)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Cliquez **Add New Project** → importez votre repo GitHub
3. Dans **Environment Variables**, ajoutez :
   - `CINETPAY_API_KEY`
   - `CINETPAY_SITE_ID`
   - `NEXT_PUBLIC_SITE_URL` (ex: `https://panier-elif.vercel.app`)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Cliquez **Deploy** — votre site est en ligne en 2 minutes

### Option 2 — CLI Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Pousser sur GitHub

```bash
cd panier-elif
git init
git add .
git commit -m "feat: site e-commerce Le Panier d'Elif"
git branch -M main
git remote add origin https://github.com/votre-compte/panier-elif.git
git push -u origin main
```

---

## Ajouter ou modifier un produit

Dans `data/products.js` :

```js
{
  id: 11,
  category: 'pastel',         // 'pastel' ou 'jus'
  name: 'Nouveau Pastel',
  shortName: 'Nouveau',
  description: 'Description appétissante…',
  price: 3500,
  unit: '10 pièces / paquet',
  image: '/images/mon-image.jpg',  // null pour les jus
  emoji: null,                      // emoji pour les jus sans image
  color: null,                      // gradient Tailwind pour les jus
  badges: ['Fait main'],
  bestseller: false,
}
```

---

## Structure des fichiers

```
panier-elif/
├── app/
│   ├── layout.jsx            → Layout global (Navbar + Footer)
│   ├── providers.jsx         → CartProvider wrapper
│   ├── globals.css           → Tailwind directives
│   ├── page.jsx              → Page d'accueil
│   ├── boutique/page.jsx     → Catalogue produits
│   ├── panier/page.jsx       → Panier + formulaire + paiement
│   ├── merci/page.jsx        → Confirmation commande
│   ├── annulation/page.jsx   → Paiement annulé
│   └── api/payment/route.js  → API CinetPay (serveur)
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartSummary.jsx
│   └── WhatsAppButton.jsx
├── context/
│   └── CartContext.jsx       → Gestion panier global
├── data/
│   └── products.js           → Catalogue produits
└── public/images/
    ├── pastels-frits.jpg
    ├── pastel-viande-coupe.jpg
    ├── pastels-handmade.jpg
    └── pastels-surgeles.jpg
```
