# 🌱 EcoTrade - Plateforme d'Échange Durable pour Étudiants Internationaux

##  À Propos du Projet

**EcoTrade** est une application web full-stack d'économie circulaire conçue pour répondre à un défi critique de durabilité rencontré par les étudiants d'échange à l'INSA Lyon et dans des institutions similaires dans le monde entier.

##  Objectifs du Projet

### Objectif Principal
Créer une plateforme numérique qui facilite la **réutilisation et le partage d'objets** entre générations successives d'étudiants internationaux, transformant le cycle "acheter-jeter-racheter" en un modèle d'économie circulaire durable.

### Objectifs Spécifiques

1. **Environnemental** 
   - Réduire drastiquement les déchets générés lors des changements semestriels d'étudiants
   - Diminuer l'empreinte carbone liée à la production et au transport de nouveaux biens
   - Promouvoir une culture de réutilisation et de durabilité

2. **Économique** 
   - Réduire les coûts d'installation pour les étudiants arrivants (200-500€ d'économies)
   - Permettre aux étudiants sortants de récupérer une partie de leur investissement
   - Créer un écosystème économique local et solidaire

3. **Social** 
   - Faciliter l'intégration des nouveaux étudiants
   - Créer des liens entre les cohortes d'étudiants
   - Construire une communauté basée sur l'entraide et la durabilité

4. **Pratique** 
   - Centraliser les offres et demandes en une seule plateforme
   - Simplifier le processus d'achat/vente entre étudiants
   - Assurer la transparence et la traçabilité des transactions

###  La Problématique

Chaque semestre, des milliers d'étudiants internationaux arrivent et repartent des établissements académiques. Cette rotation constante crée des défis environnementaux et économiques importants :

- **Génération massive de déchets** : Les étudiants quittant leur programme d'échange jettent souvent des objets parfaitement fonctionnels (meubles, ustensiles de cuisine, électronique, manuels scolaires) car ils ne peuvent pas les transporter chez eux
- **Coûts élevés pour les nouveaux arrivants** : Les étudiants d'échange entrants doivent acheter tous ces mêmes articles, créant des dépenses inutiles de 500€ à 1000€
- **Impact environnemental** : Des biens parfaitement utilisables finissent dans les décharges, contribuant aux déchets et à l'épuisement des ressources
- **Manque de coordination** : Aucune plateforme centralisée n'existe pour connecter les étudiants sortants avec ceux qui arrivent
- **Gaspillage systémique** : Le cycle se répète chaque semestre, générant un impact cumulatif considérable

### La Solution EcoTrade

EcoTrade comble cette lacune en créant une **marketplace peer-to-peer** spécialement conçue pour le cycle de vie des étudiants d'échange :

-  **Économie Circulaire** : Les articles restent en circulation au sein de la communauté étudiante au lieu d'être jetés
-  **Abordable** : Les étudiants entrants peuvent acheter des articles d'occasion de qualité à prix réduits
-  **Durable** : Réduit les déchets et l'empreinte carbone associée à la fabrication et à l'expédition de nouveaux produits
-  **Communautaire** : Facilite les connexions entre les étudiants sortants et entrants
-  **Simple et Rapide** : Interface intuitive en français pour une adoption facile

##  Fonctionnalités Implémentées

### Frontend (React)
-   **Page d'accueil** avec galerie de tous les produits disponibles
-   **Système d'authentification** : Inscription et connexion des utilisateurs
-   **Interface dynamique** : Affichage conditionnel selon l'état de connexion
-   **Ajout de produits** : Formulaire complet pour publier des annonces
-   **Cartes de produits** : Affichage attractif avec prix, description, durée d'utilisation et propriétaire
-   **Design responsive** : Compatible mobile, tablette et desktop
-   **Interface en français** : Adaptée au contexte INSA Lyon

### Backend (Spring Boot)
-   **API RESTful** complète pour utilisateurs et produits
-   **Base de données PostgreSQL** hébergée sur Supabase
-   **DTOs** pour éviter les références circulaires
-   **Validation** et gestion d'erreurs
-   **Architecture MVC** : Modèles, Services, Repositories, Controllers

## 🛠️ Stack Technologique Complet

### Backend
- **Java 25** avec **Spring Boot 4.0.1**
- **Spring Data JPA** pour les opérations de base de données
- **PostgreSQL** via **Supabase** pour l'hébergement cloud
- Architecture **API RESTful**
- **Maven** pour la gestion des dépendances
- **DTOs** pour optimisation des réponses

### Frontend
- **React 19** avec **Hooks** (useState, useEffect)
- **Vite** pour le build et développement rapide
- **Axios** pour les requêtes HTTP
- **CSS3** avec animations et design moderne
- **LocalStorage** pour la persistance de session

### Infrastructure
- **Supabase** : Base de données PostgreSQL cloud
- **CORS** configuré pour communication frontend-backend
- **Git** pour le contrôle de version

### Schéma de Base de Données
```
Users (id, created_at, name, email, nationality, password)
   |
   | 1:N
   |
Products (id, created_at, name, price, description, use_time, user_id)
```

##  Installation et Démarrage

### Backend

1. **Prérequis**
   - Java 25 ou supérieur
   - Maven 3.6+

2. **Configuration**
   ```bash
   cd backend
   cp src/main/resources/application.properties.example application.properties
   # Éditer application.properties avec vos credentials Supabase
   ```

3. **Lancer le backend**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   Le serveur démarre sur `http://localhost:8080`

### Frontend

1. **Prérequis**
   - Node.js 18+
   - npm ou yarn

2. **Installation**
   ```bash
   cd frontend/ecotrade-frontend
   npm install
   ```

3. **Lancer le frontend**
   ```bash
   npm run dev
   ```
   L'application s'ouvre sur `http://localhost:5173`

### Démarrage Complet
```bash
# Terminal 1 - Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2 - Frontend
cd frontend/ecotrade-frontend && npm run dev
```

## 📡 API Endpoints

### Utilisateurs
- `GET /api/users` - Liste tous les utilisateurs
- `GET /api/users/{id}` - Détails d'un utilisateur
- `GET /api/users/email/{email}` - Recherche par email
- `POST /api/users` - Créer un compte
- `PUT /api/users/{id}` - Modifier un profil
- `DELETE /api/users/{id}` - Supprimer un compte

### Produits
- `GET /api/products` - Liste tous les produits
- `GET /api/products/{id}` - Détails d'un produit
- `GET /api/products/user/{userId}` - Produits d'un utilisateur
- `POST /api/products/user/{userId}` - Publier un produit
- `PUT /api/products/{id}` - Modifier un produit
- `DELETE /api/products/{id}` - Supprimer un produit

##  Impact Environnemental Estimé

### À l'INSA Lyon (~500 étudiants d'échange/an)

- **Réduction des déchets** : 10-15 tonnes de biens réutilisables sauvés des décharges annuellement
- **Économies financières** : 100 000€ à 250 000€ économisés collectivement par an
- **Réduction CO2** : Équivalent à ~20-30 tonnes de CO2 évitées (fabrication + transport)
- **Objets réutilisés** : 500-1000 articles remis en circulation par an

### Impact Potentiel (Déploiement National)

Si déployé dans les 50+ institutions d'accueil en France :
- **2500+ tonnes** de déchets évités par an
- **15-20 millions €** économisés par les étudiants
- **Impact social** : 25 000+ étudiants aidés annuellement

## 💭 Motivation Personnelle

### L'histoire derrière EcoTrade

Arrivé à l'INSA Lyon en septembre 2024 dans le cadre d'un **double diplôme**, j'ai rapidement observé un problème récurrent parmi mes amis étudiants d'échange.

À la fin de chaque semestre, la même scène se répétait : des étudiants ne savaient pas quoi faire de leurs affaires avant de rentrer chez eux. Les conversations tournaient autour de questions comme :

- *"Je ne peux pas ramener mon micro-ondes en avion, qu'est-ce que je fais ?"*
- *"J'ai acheté tous ces meubles, mais je n'ai nulle part où les stocker..."*
- *"Je vais devoir jeter ma lampe de bureau qui fonctionne parfaitement"*

Les solutions de mes camarades étaient souvent les mêmes :
- 🗑️ **Jeter à la poubelle** : Des objets parfaitement fonctionnels finissaient dans les déchets
- 📦 **Abandonner dans la rue** : Laisser les affaires dehors en espérant que quelqu'un les prenne
- 🤷 **Ne rien faire** : Laisser tout dans la chambre pour le prochain occupant sans coordination

### Le déclic

C'est en voyant cette situation se répéter semestre après semestre que l'idée d'**EcoTrade** est née. Je me suis dit : 

> *"Il doit y avoir une meilleure solution. Et si nous pouvions connecter les étudiants qui partent avec ceux qui arrivent ?"*

Cette observation m'a poussé à créer une plateforme qui :
- ✅ Donne une **seconde vie** aux objets au lieu de les jeter
- ✅ Permet aux étudiants sortants de **récupérer une partie de leur investissement**
- ✅ Aide les nouveaux arrivants à **s'équiper à moindre coût**
- ✅ Réduit l'**impact environnemental** du turnover étudiant
- ✅ Crée une **communauté solidaire** entre générations d'étudiants

EcoTrade n'est pas juste un projet technique, c'est une **réponse concrète** à un problème réel que j'ai vécu et observé au quotidien.

## 🎓 Contexte et Démonstration de Compétences

Ce projet a été développé comme une **initiative personnelle** pour répondre à un besoin réel observé à l'INSA Lyon. Il démontre :

### Compétences Techniques
-  Développement **Full-Stack** (Backend Java + Frontend React)
-   Architecture **RESTful** et **MVC**
-   Gestion de **bases de données relationnelles**
-   Intégration **Cloud** (Supabase)
-   **Version control** avec Git
-   **Responsive design** et UX moderne

### Compétences Transversales
-  **Identification de problèmes** : Observation d'un besoin réel
-  **Innovation** : Solution technologique à un défi social
-  **Conscience environnementale** : Application des principes d'économie circulaire
-  **Analyse d'impact** : Quantification des bénéfices environnementaux et économiques
- **Initiative** : Projet mené de A à Z de manière autonome

##  Améliorations Futures

### Court Terme
- [ ] Upload d'images pour les produits
- [ ] Système de recherche et filtres avancés
- [ ] Profil utilisateur avec historique

### Moyen Terme
- [ ] Messagerie intégrée entre acheteurs et vendeurs
- [ ] Système de notation et avis
- [ ] Notifications par email
- [ ] Mode sombre

### Long Terme
- [ ] Application mobile (iOS/Android)
- [ ] Intégration avec l'authentification INSA
- [ ] Système de réservation
- [ ] Analytics et statistiques d'impact
- [ ] Extension à d'autres universités

##  Auteur

**Josue Vega**
-  Étudiant à l'INSA Lyon
-  Passionné par les solutions technologiques durables
-  Développeur Full-Stack
-  Engagé pour l'économie circulaire

##  Licence

Ce projet est open-source et disponible à des fins éducatives.

##  Contribution

Ce projet est ouvert aux contributions ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Partager vos retours d'expérience

---

*Construire un avenir plus durable, un étudiant d'échange à la fois* 🌱

**EcoTrade** - Économie Circulaire • Innovation Sociale • Impact Environnemental
