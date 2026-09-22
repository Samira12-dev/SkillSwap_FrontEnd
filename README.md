

## 1. Présentation du projet

**SkillSwap** est une plateforme web d'échange de compétences permettant aux utilisateurs de partager leurs connaissances et d'apprendre de nouvelles compétences à travers des échanges organisés.

Le frontend de l'application est développé avec **React et Vite**. Il fournit une interface utilisateur permettant de gérer les profils, les compétences, les demandes d'échange, les conversations, les sessions et les notifications.

Le frontend communique avec le backend **Spring Boot** à travers des API REST et utilise **WebSocket / STOMP** pour la messagerie en temps réel.

---

## 2. Problématique

Les utilisateurs peuvent posséder certaines compétences qu'ils souhaitent partager tout en recherchant d'autres compétences à apprendre.

L'interface frontend permet de réaliser facilement le parcours principal :

```text
Inscription
    ↓
Connexion
    ↓
Profil
    ↓
Compétences
    ↓
Découverte
    ↓
Demande d'échange
    ↓
Acceptation
    ↓
Chat
    ↓
Session
    ↓
Avis
```

L'objectif du frontend est de proposer une interface simple, claire et intuitive pour accompagner l'utilisateur dans toutes les étapes de l'échange.

---

## 3. Fonctionnalités principales

### Authentification

Le frontend permet à l'utilisateur de :

* créer un compte ;
* se connecter ;
* se déconnecter ;
* conserver son authentification grâce au JWT ;
* accéder uniquement aux pages protégées après connexion.

Les pages principales sont :

```text
/login
/register
/access-denied
```

---

### Gestion du profil

L'utilisateur peut consulter et modifier son profil.

Fonctionnalités :

* prénom ;
* nom ;
* email ;
* ville ;
* bio ;
* photo de profil.

Pages :

```text
/profile
/profile/edit
```

---

### Gestion des compétences

L'utilisateur peut gérer ses compétences et préciser s'il souhaite :

* proposer une compétence ;
* apprendre une compétence.

Les compétences utilisent les types :

```text
OFFER
WANTED
```

Les niveaux de compétence sont également gérés.

Pages :

```text
/skills
/skills/add
```

---

### Découverte des compétences

La page **Discover** permet de consulter les compétences proposées par les autres utilisateurs.

L'utilisateur peut découvrir :

* les compétences disponibles ;
* les utilisateurs qui les proposent ;
* le type de compétence ;
* le niveau ;
* les informations nécessaires pour envoyer une demande d'échange.

Page :

```text
/discover
```

---

### Demandes d'échange

L'utilisateur peut gérer ses demandes d'échange.

Il peut consulter :

* les demandes reçues ;
* les demandes envoyées ;
* les demandes en attente ;
* les demandes acceptées ;
* les demandes refusées ;
* les demandes annulées.

Actions disponibles :

```text
Accept
Reject
Cancel
```

Page :

```text
/swap-requests
```

---

### Messagerie

Le frontend intègre un système de chat en temps réel.

La communication utilise :

```text
WebSocket
STOMP
```

Les utilisateurs peuvent échanger des messages après l'acceptation d'une demande d'échange.

Page :

```text
/messages
```

Le frontend se connecte au WebSocket du backend :

```text
/ws
```

Les messages d'une conversation sont reçus à travers :

```text
/topic/conversation/{conversationId}
```

---

### Sessions d'échange

Après l'acceptation d'une demande, les utilisateurs peuvent organiser une session d'échange.

Les informations principales sont :

* date ;
* durée ;
* mode ;
* statut ;
* conversation associée ;
* lien de réunion si nécessaire.

Modes :

```text
ONLINE
PRESENTIEL
```

Statuts :

```text
PROPOSED
CONFIRMED
CANCELLED
COMPLETED
```

Pages :

```text
/sessions
/sessions/:sessionId
```

---

### Notifications

L'utilisateur peut consulter ses notifications concernant les différentes actions de la plateforme.

Page :

```text
/notifications
```

Les notifications peuvent notamment concerner :

* les demandes d'échange ;
* l'acceptation d'une demande ;
* les messages ;
* les sessions ;
* les autres événements importants.

---

### Avis

Après la réalisation d'une session, l'utilisateur peut donner une note à son partenaire.

La note est comprise entre :

```text
1 à 5
```

Cette fonctionnalité permet de conserver une évaluation des échanges réalisés.

---

### Dashboard

Le dashboard fournit une vue globale des informations importantes de l'utilisateur.

Il affiche notamment :

* demandes en attente ;
* prochaines sessions ;
* messages non lus ;
* notifications ;
* actions rapides.

Page :

```text
/dashboard
```

---

### Administration

Le frontend contient également des interfaces destinées à l'administrateur.

Pages :

```text
/admin/users
/admin/skills
```

L'administrateur peut notamment consulter et gérer :

* les utilisateurs ;
* les compétences.

---

## 4. Technologies utilisées

| Technologie          | Utilisation                             |
| -------------------- | --------------------------------------- |
| React                | Création de l'interface utilisateur     |
| Vite                 | Environnement de développement et build |
| JavaScript           | Langage de développement                |
| React Router         | Navigation entre les pages              |
| Axios                | Communication avec l'API REST           |
| JWT                  | Authentification                        |
| jwt-decode           | Décodage du token JWT                   |
| React Context        | Gestion globale de l'authentification   |
| STOMP                | Communication avec WebSocket            |
| WebSocket            | Chat en temps réel                      |
| React Icons / Lucide | Icônes de l'interface                   |
| CSS                  | Mise en forme de l'interface            |
| Git / GitHub         | Gestion de versions                     |

---

## 5. Architecture du frontend

Le frontend est organisé autour de plusieurs composants et responsabilités.

```text
Pages
  ↓
Components
  ↓
Services
  ↓
Axios
  ↓
Spring Boot API
```

### Pages

Les pages représentent les différentes interfaces accessibles dans l'application.

Exemples :

```text
Login
Register
Dashboard
Profile
EditProfile
MySkills
DiscoverSkills
SwapRequests
Messages
Sessions
SessionDetails
Notifications
AdminUsers
AdminSkills
```

---

### Components

Les composants React permettent de réutiliser les différentes parties de l'interface.

Exemples :

```text
Navbar
Sidebar
ProtectedRoute
SkillCard
SkillList
SwapRequestCard
```

---

### Context

L'application utilise **React Context** pour gérer l'état global de l'authentification.

Le contexte permet notamment de gérer :

* l'utilisateur connecté ;
* le token JWT ;
* les informations utilisateur ;
* la déconnexion ;
* l'expiration du token ;
* certaines informations du dashboard.

Exemple :

```text
AuthContext
```

---

### Services

Les services permettent de centraliser les appels vers le backend.

Les principales fonctionnalités communiquent avec l'API à travers Axios.

Exemples de services :

```text
authService
userService
skillService
skillDetailsService
swapRequestService
conversationService
sessionService
reviewService
notificationService
dashboardService
```

---

## 6. Routage

La navigation est gérée avec **React Router**.

### Routes publiques

```text
/
 /login
 /register
 /access-denied
```

### Routes protégées

```text
/dashboard
/profile
/profile/edit
/skills
/skills/add
/discover
/swap-requests
/messages
/notifications
/sessions
/sessions/:sessionId
```

### Routes administrateur

```text
/admin/users
/admin/skills
```

L'accès aux pages protégées est contrôlé avec :

```text
ProtectedRoute
```

---

## 7. Authentification JWT

Le frontend utilise le token JWT fourni par le backend après la connexion.

Le processus est :

```text
Login
   ↓
Backend
   ↓
JWT Token
   ↓
Frontend
   ↓
AuthContext
   ↓
Protected Routes
```

Le token permet notamment de récupérer les informations de l'utilisateur connecté.

Le frontend utilise `jwt-decode` pour décoder les informations nécessaires.

Les informations peuvent notamment inclure :

```text
id
firstName
lastName
email
city
photo
role
```

Lorsqu'un token expire, l'utilisateur est automatiquement redirigé vers la page de connexion.

---

## 8. Communication avec le Backend

Le frontend communique avec le backend Spring Boot grâce à **Axios**.

URL principale du backend en développement :

```text
http://localhost:8080/api
```

Les requêtes sont utilisées pour :

* authentification ;
* utilisateurs ;
* compétences ;
* demandes d'échange ;
* conversations ;
* sessions ;
* avis ;
* notifications ;
* dashboard.

Exemple :

```javascript
axios.get("/skills")
```

Les données reçues du backend sont ensuite utilisées pour afficher les informations dans les composants React.

---

## 9. Chat en temps réel

Le système de messagerie utilise :

```text
WebSocket
+
STOMP
```

Le frontend établit une connexion avec :

```text
/ws
```

Les messages sont envoyés vers :

```text
/chat/{conversationId}/{userId}
```

Et reçus depuis :

```text
/topic/conversation/{conversationId}
```

Cela permet aux utilisateurs d'échanger des messages en temps réel sans avoir besoin de recharger la page.

---

## 10. Installation et lancement

### Prérequis

Avant de lancer le frontend, il faut installer :

* Node.js
* npm
* Git

Le backend Spring Boot doit également être lancé pour utiliser les fonctionnalités connectées à l'API.

---

### Cloner le projet

```bash
git clone <URL_DU_REPOSITORY>
```

### Accéder au frontend

```bash
cd skillswap_frontend
```

### Installer les dépendances

```
```
