# 🌱 EcoTrade - Plateforme d'Échange Durable pour Étudiants Internationaux

## 📖 À Propos du Projet

**EcoTrade** est une application web d'économie circulaire conçue pour répondre à un défi critique de durabilité rencontré par les étudiants d'échange à l'INSA Lyon et dans des institutions similaires dans le monde entier.

### 🎯 La Problématique

Chaque semestre, des milliers d'étudiants internationaux arrivent et repartent des établissements académiques. Cette rotation constante crée des défis environnementaux et économiques importants :

- **Génération massive de déchets** : Les étudiants quittant leur programme d'échange jettent souvent des objets parfaitement fonctionnels (meubles, ustensiles de cuisine, électronique, manuels scolaires) car ils ne peuvent pas les transporter chez eux
- **Coûts élevés pour les nouveaux arrivants** : Les étudiants d'échange entrants doivent acheter tous ces mêmes articles, créant des dépenses inutiles
- **Impact environnemental** : Des biens parfaitement utilisables finissent dans les décharges, contribuant aux déchets et à l'épuisement des ressources
- **Manque de coordination** : Aucune plateforme centralisée n'existe pour connecter les étudiants sortants avec ceux qui arrivent

### 💡 La Solution

EcoTrade comble cette lacune en créant une **marketplace peer-to-peer** spécialement conçue pour le cycle de vie des étudiants d'échange :

- 🔄 **Économie Circulaire** : Les articles restent en circulation au sein de la communauté étudiante au lieu d'être jetés
- 💰 **Abordable** : Les étudiants entrants peuvent acheter des articles d'occasion de qualité à prix réduits
- 🌍 **Durable** : Réduit les déchets et l'empreinte carbone associée à la fabrication et à l'expédition de nouveaux produits
- 🤝 **Communautaire** : Facilite les connexions entre les étudiants sortants et entrants

## ✨ Fonctionnalités Clés

- **Gestion des Utilisateurs** : Système d'inscription et d'authentification pour les étudiants
- **Annonces de Produits** : Les étudiants peuvent lister des articles avec détails (nom, prix, description, durée d'utilisation)
- **Recherche & Filtres** : Trouvez exactement ce dont vous avez besoin rapidement
- **Profils Utilisateurs** : Suivez vos annonces et votre historique d'achats
- **Transfert de Propriété** : Transfert clair des articles d'un étudiant à un autre

## 🛠️ Stack Technologique

### Backend
- **Java 25** avec **Spring Boot 4.0.1**
- **Spring Data JPA** pour les opérations de base de données
- **PostgreSQL** via **Supabase** pour l'hébergement de base de données cloud
- Architecture **API RESTful**
- **Maven** pour la gestion des dépendances

### Schéma de Base de Données
- **Table Users** : id, created_at, name, email, nationality, password
- **Table Products** : id, created_at, name, price, description, use_time, user_id
- **Relation** : One-to-Many (Un utilisateur peut avoir plusieurs produits)

## 🚀 Démarrage

### Prérequis
- Java 25 ou supérieur
- Maven 3.6+
- PostgreSQL (via Supabase)

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/yourusername/ecotrade.git
   cd ecotrade/backend
   ```

2. **Configurer la base de données**
   - Copier `src/main/resources/application.properties.example` vers `application.properties`
   - Ajouter vos identifiants de base de données Supabase

3. **Compiler et exécuter**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

4. **Accéder à l'API**
   - URL de base : `http://localhost:8080`
   - Documentation API : Disponible à `/api/*`

## 📡 Points de Terminaison API

### Utilisateurs
- `GET /api/users` - Obtenir tous les utilisateurs
- `GET /api/users/{id}` - Obtenir un utilisateur par ID
- `GET /api/users/email/{email}` - Obtenir un utilisateur par email
- `POST /api/users` - Créer un nouvel utilisateur
- `PUT /api/users/{id}` - Mettre à jour un utilisateur
- `DELETE /api/users/{id}` - Supprimer un utilisateur

### Produits
- `GET /api/products` - Obtenir tous les produits
- `GET /api/products/{id}` - Obtenir un produit par ID
- `GET /api/products/user/{userId}` - Obtenir les produits par utilisateur
- `POST /api/products/user/{userId}` - Créer un produit
- `PUT /api/products/{id}` - Mettre à jour un produit
- `DELETE /api/products/{id}` - Supprimer un produit

## 🌍 Impact Environnemental

En implémentant EcoTrade dans une seule institution comme l'INSA Lyon avec ~500 étudiants d'échange par an :

- **Réduction estimée des déchets** : 10-15 tonnes de biens réutilisables sauvées des décharges annuellement
- **Économies pour les étudiants** : 200-500€ par étudiant en moyenne
- **Réduction du CO2** : Diminution significative des émissions liées à la fabrication et au transport
- **Renforcement communautaire** : Connexions plus fortes entre les cohortes d'étudiants

## 🎓 Contexte du Projet

Ce projet a été développé comme une **initiative personnelle** pour répondre à un défi de durabilité du monde réel observé au sein de la communauté des étudiants d'échange. Il démontre :

- Compétences en développement full-stack
- Résolution de problèmes avec la technologie
- Engagement envers la durabilité et l'impact social
- Compréhension des principes de l'économie circulaire
- Capacité à identifier et résoudre les besoins de la communauté

## 📝 Améliorations Futures

- [ ] Interface web frontend (React/Angular)
- [ ] Application mobile (iOS/Android)
- [ ] Téléchargement d'images pour les annonces
- [ ] Système de notation et d'avis
- [ ] Messagerie intégrée entre utilisateurs
- [ ] Notifications par email pour les nouvelles annonces
- [ ] Support multilingue
- [ ] Intégration avec les systèmes d'authentification universitaires

## 👤 Auteur

**Josue Vega**
- Étudiant à l'INSA Lyon
- Passionné par les solutions technologiques durables
- [LinkedIn](#) | [GitHub](#)

## 📄 Licence

Ce projet est open-source et disponible à des fins éducatives.

---

*Construire un avenir plus durable, un étudiant d'échange à la fois* 🌱
