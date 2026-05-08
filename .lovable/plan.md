

# Site web ASOMOVIT SYNDIC – Plan

Site vitrine moderne et responsive en français pour une société de syndic de copropriété à Marrakech, avec génération de leads.

## Identité visuelle
- **Couleurs** (dérivées du logo) : bleu profond `#1E3A8A`, orange chaleureux `#F59E0B`, blanc, gris clair pour les fonds
- **Typographie** : Inter (corps) + Poppins (titres), claires et professionnelles
- **Style** : épuré, généreux en espace, cartes douces, animations subtiles au scroll
- **Logo ASOMOVIT** intégré dans le header et footer

## Architecture des pages (routes séparées pour SEO)
1. **Accueil** `/` – Hero + engagements + pourquoi nous + services aperçu + méthode + résidences gérées + témoignages + CTA
2. **À propos** `/a-propos` – Qui sommes-nous, mission, valeurs, équipe
3. **Services** `/services` – Détail des 6 services (administrative, financière, AG, travaux, juridique, entretien)
4. **Contact / Devis** `/contact` – Formulaire devis, coordonnées, horaires, carte Google Maps embarquée

Le **Blog est exclu** pour l'instant comme demandé.

## Composants partagés
- **Header sticky** avec logo + menu (Accueil, À propos, Services, Contact) + bouton CTA orange "Demander un devis"
- **Menu mobile** hamburger fluide
- **Footer** : logo, liens rapides, coordonnées, mentions légales, réseaux sociaux, copyright 2025
- Bouton flottant **WhatsApp/Téléphone** sur mobile (+212 661-901209)

## Sections clés de l'accueil
- **Hero** plein écran : titre "Votre syndic de confiance à Marrakech", sous-titre, deux CTA (Devis / Contact), image de fond résidence
- **Engagements** (4 cartes icônes) : transparence loi 18-00, réactivité 7j/7, suivi complet, communication
- **Pourquoi nous choisir** : 5 cartes (expertise, transparence, proximité, personnalisation, conformité légale)
- **Nos services** : 6 cartes avec icônes, lien vers /services
- **Notre méthode** : 4 étapes numérotées (analyse → proposition → prise en charge → contrôle)
- **Résidences gérées** : galerie de 6 résidences (Appel Garden, Riad des Oliviers, Yasmina, Warda, Rayhana, Al Horiya)
- **Témoignages** clients en carrousel
- **CTA final** orange : "Confiez-nous votre copropriété"

## Page Contact / Devis
- **Formulaire de devis** : nom, email, téléphone, nom de la résidence, nombre de lots, message
- Soumissions **stockées dans Lovable Cloud** (table `quote_requests`) + **email de notification** envoyé à direction@asomovitmultiservices.com via une edge function (Resend)
- Bloc coordonnées : téléphone cliquable, email, adresse Marrakech, horaires
- Carte Google Maps embarquée

## SEO & métadonnées
- Chaque route a son propre `head()` : title, description, og:title, og:description en français
- Meta description orientée Marrakech / syndic / copropriété / loi 18-00

## Images
- Utilisation des **images extraites du PDF** (résidences, hero) copiées dans `src/assets/`
- Logo ASOMOVIT dans le header et footer

## Stack technique
- TanStack Start + Tailwind v4 + shadcn/ui (cards, buttons, form, sheet pour menu mobile, sonner pour toasts)
- Lovable Cloud pour stockage des leads + edge function pour email
- Lucide icons

