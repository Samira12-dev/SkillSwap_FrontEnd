# 📘 SKILLSWAP — Complete Learning Guide

This file is my **personal course** about the SkillSwap project.

It is built **from the real code** of the project. Nothing here is invented.

The goal: after this jury, I should be able to open this file, revise the whole project,
and answer questions in **English** about my own code.

> **Important rule:** this file is the ONLY file I am allowed to create / modify.
> The SkillSwap source code is never changed during this learning process.

---

## 🧭 How to use this file

The file is built following this fixed process for every part:

```text
1. Analyze the real code
2. Explain it in the conversation
3. Write the important explanation in explication.md
4. Keep previous explanations
5. Continue enriching this same file
```

Every part ends with the same message:

> **This part is finished. Ask me any questions you have. When you are ready, write "on passe".**

---

# PART 1 — GLOBAL BACKEND OVERVIEW OF SKILLSWAP

---

## 1.1 The two parts of the project

SkillSwap is made of **two independent applications** that talk to each other:

```text
SkillSwap_Backend    →   the server (API)      →  Java 21 + Spring Boot 3.4.1
skillswap_frontend   →   the application (UI)  →  React 19 + Vite (JavaScript)
```

They communicate over **HTTP** (normal requests) and **WebSocket** (live chat).

```text
┌──────────────────────┐         HTTP + JWT          ┌──────────────────────┐
│   React Frontend     │ ──────────────────────────▶ │   Spring Boot Backend│
│   port 5173          │ ◀────────────────────────── │   port 8080          │
└──────────────────────┘         JSON responses      └──────────────────────┘
                                                             │
                                                             ▼
                                                       ┌──────────────┐
                                                       │    MySQL 8   │
                                                       │ skillswap_db │
                                                       └──────────────┘
```

The backend is a **REST API**: it exposes **endpoints** (URLs) that the frontend calls.
The backend does not show pages to the user — it only receives requests and sends **JSON**.

---

## 1.2 The backend at a glance

Entry point of the application:

```text
src/main/java/com/example/skillswap/SkillSwapApplication.java
```

This file contains `@SpringBootApplication` and the `main` method that starts everything.

The three-letter name of the package is: `com.example.skillswap`.

### Why is the package called `com.example.skillswap`?

- `com.example` is a **default / generated** prefix often used as a starting point.
- `skillswap` is the name of the application.
- A package is a **folder structure** in Java that groups related classes together.
- It also guarantees that Java class names are **unique** in the whole application.

### The package structure

```text
com.example.skillswap
│
├── SkillSwapApplication.java        → entry point (main method)
│
├── config/                          → configuration classes
│   ├── SecurityConfig.java          → Spring Security configuration
│   ├── JwtUtils.java                → JWT creation + validation
│   └── WebSocketConfig.java         → WebSocket / STOMP configuration
│
├── controller/                      → REST endpoints (HTTP entry points)
│   ├── AuthController.java
│   ├── ChatWebSocketController.java
│   ├── ConversationController.java
│   ├── DashboardController.java
│   ├── MessageController.java
│   ├── NotificationController.java
│   ├── ReviewController.java
│   ├── SessionController.java
│   ├── SkillController.java
│   ├── SwapRequestController.java
│   └── UserController.java
│
├── service/                         → business logic
│   ├── AuthService.java
│   ├── ConversationService.java
│   ├── CustomUserDetailsService.java
│   ├── DashboardService.java
│   ├── MessageService.java
│   ├── NotificationService.java
│   ├── ReviewService.java
│   ├── SessionService.java
│   ├── SkillService.java
│   ├── SwapRequestService.java
│   └── UserService.java
│
├── repository/                      → database access (JPA)
│   ├── UserRepo.java
│   ├── SkillRepo.java
│   ├── SkillDetailsRepo.java
│   ├── SwapRequestRepo.java
│   ├── ConversationRepo.java
│   ├── MessageRepo.java
│   ├── SessionRepo.java
│   ├── ReviewRepo.java
│   └── NotificationRepo.java
│
├── entity/                          → Java classes that map database tables
│   ├── User.java
│   ├── Skill.java
│   ├── SkillDetails.java
│   ├── SwapRequest.java
│   ├── Conversation.java
│   ├── Message.java
│   ├── Session.java
│   ├── Review.java
│   └── Notification.java
│
├── dto/
│   ├── request/                     → data COMING IN from the frontend
│   │   ├── RegisterRequestDTO.java
│   │   ├── LoginRequestDTO.java
│   │   ├── UpdateProfileRequestDTO.java
│   │   ├── SkillRequestDto.java
│   │   ├── SkillDetailsRequestDto.java
│   │   ├── SwapRequestRequestDto.java
│   │   ├── ConversationRequestDto.java
│   │   ├── MessageRequestDto.java
│   │   ├── SessionRequestDto.java
│   │   ├── ReviewRequestDto.java
│   │   └── NotificationRequestDto.java
│   └── response/                    → data GOING OUT to the frontend
│       ├── AuthResponse.java
│       ├── UserResponseDTO.java
│       ├── SkillResponseDto.java
│       ├── SkillDetailsResponseDto.java
│       ├── SwapRequestResponseDto.java
│       ├── ConversationResponseDto.java
│       ├── MessageResponseDto.java
│       ├── SessionResponseDto.java
│       ├── ReviewResponseDto.java
│       ├── NotificationResponseDto.java
│       ├── DashboardResponseDto.java
│       └── AdminDashboardResponseDto.java
│
├── enums/                           → lists of fixed values
│   ├── Role.java                    → USER, ADMIN
│   ├── SkillType.java               → OFFER / WANTED
│   ├── SkillLevel.java              → level of a skill
│   ├── SwapStatus.java              → status of a swap request
│   ├── SessionMode.java             → ONLINE / ON_SITE
│   ├── SessionStatus.java           → status of a session
│   └── NotificationType.java        → type of a notification
│
├── mapper/                          → MapStruct mappers (Entity ⇄ DTO)
│   ├── UserMapper.java
│   ├── SkillMapper.java
│   ├── SkillDetailsMapper.java
│   ├── SwapRequestMapper.java
│   ├── ConversationMapper.java
│   ├── MessageMapper.java
│   ├── SessionMapper.java
│   ├── ReviewMapper.java
│   └── NotificationMapper.java
│
├── filter/
│   └── JwtFilter.java               → intercepts every request to check the JWT
│
└── exception/
    └── GlobalExceptionHandler.java  → catches errors and returns clean JSON errors
```

> ⚠️ Note: the naming style is not 100% consistent (some files end with `DTO` in
> uppercase like `RegisterRequestDTO`, some end with `Dto` like `MessageRequestDto`).
> This is the actual state of the current SkillSwap code. We document it as it is.
> We are not changing it.

---

## 1.3 The role of each package / layer

| Layer / package | Role in SkillSwap |
|---|---|
| `controller` | Receives HTTP requests, returns HTTP responses. Does NOT contain business rules. |
| `service` | Contains the business logic and rules of the application. |
| `repository` | Talks to MySQL through Spring Data JPA. |
| `entity` | Java objects that mirror the database tables. |
| `dto/request` | Objects that receive data from the frontend. |
| `dto/response` | Objects that send data to the frontend. |
| `mapper` | Converts Entities into DTOs and DTOs into Entities (MapStruct). |
| `enums` | Fixed lists of values (statuses, roles, types). |
| `config` | Configuration of Security, JWT and WebSocket. |
| `filter` | The JWT filter: checks the token on every protected request. |
| `exception` | Global error handling (returns clean JSON errors). |

---

## 1.4 The layered architecture

SkillSwap follows the classic **3-layer architecture** (plus the security filter):

```text
User (React frontend)
        │  HTTP request (with JWT)
        ▼
┌───────────────────────────────┐
│   JwtFilter  (security)       │  → checks "does the user have a valid token?"
└───────────────────────────────┘
        ▼
┌───────────────────────────────┐
│   Controller  (API layer)     │  → receives the request
└───────────────────────────────┘
        ▼
┌───────────────────────────────┐
│   Service  (business layer)   │  → applies the business rules
└───────────────────────────────┘
        ▼
┌───────────────────────────────┐
│   Repository  (data layer)    │  → asks the database
└───────────────────────────────┘
        ▼
        MySQL
```

### Why these layers at all?

Each layer has **one clear job**. This is called **separation of concerns**:

- The **Controller** must only handle HTTP (JSON in, JSON out).
- The **Service** must only contain business logic (rules like "can this swap request
  really be accepted?").
- The **Repository** must only talk to the database.

Because of this separation, each layer can be tested and understood separately.
This is also why a Controller never writes directly to the database: it calls a Service,
and the Service calls the Repository.

> ### 🎤 How can I explain this to the jury?
> "I use a layered architecture in SkillSwap. The Controller receives the HTTP request,
> the Service contains the business rules, and the Repository communicates with MySQL.
> This separation keeps each layer simple and easy to test."

---

## 1.5 Communication between layers

Spring creates all these objects and connects them automatically. We call this
**dependency injection**.

- The Controller holds a reference to a Service (`private final AuthService authService;`).
- The Service holds references to Repositories and other helpers.
- Spring Boot looks at the annotations (`@Component`, `@Service`, `@Repository`)
  and gives each class what it needs.

Example from `AuthController.java`:

```java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequestDTO request){
        return ResponseEntity.ok( authService.register(request) );
    }
}
```

- `@RestController` → "this class is a Controller".
- `@RequestMapping("/api/auth")` → all endpoints of this Controller start with `/api/auth`.
- `@RequiredArgsConstructor` → Lombok generates a constructor with the `private final`
  fields (here: `authService`). Spring uses this constructor to inject the dependency.
- `@PostMapping("/register")` → the endpoint `POST /api/auth/register`.
- `@RequestBody` → take the JSON body and convert it into `RegisterRequestDTO`.
- The method **delegates** the real work to `authService.register(request)`, then wraps
  the result in `ResponseEntity.ok(...)` (HTTP 200).

> ### 🎤 How can I explain this to the jury?
> "The Controller is thin. It just receives the HTTP request and forwards it to the
> Service. The real login and registration logic lives in `AuthService`."

---

## 1.6 General request flow — a complete example

Let's follow one real request: `POST /api/auth/login`.

```text
1.  The React frontend calls the URL  http://localhost:8080/api/auth/login
    with a JSON body and header  Content-Type: application/json.

2.  Spring Security receives the request.
    For /api/auth/** the request is allowed (permitAll), so no token is needed.

3.  The AuthController receives the request.
    Spring converts the JSON body into a LoginRequestDTO.

4.  AuthController calls authService.login(request).

5.  AuthService:
       a. calls authenticationManager to verify the email + password,
       b. asks UserRepo to find the User by email,
       c. asks JwtUtils to generate a JWT token for this user.

6.  The token and user information are packed into an AuthResponse DTO.

7.  The Controller returns it with HTTP status 200.

8.  Spring converts the AuthResponse object into JSON.

9.  The frontend receives the JSON, keeps the token, and uses it for all future requests.
```

For a **protected** request (for example listing skills), the flow adds the filter:

```text
1.  Frontend sends request with header:
        Authorization: Bearer <JWT token>

2.  JwtFilter reads the header and validates the token.

3.  If valid, JwtFilter loads the User and places the authentication
    into the SecurityContextHolder.

4.  Spring Security now knows WHO is making the request.

5.  The request continues to the Controller → Service → Repository → MySQL.

6.  The response returns to the frontend.
```

---

## 1.7 The database at a glance

The database is **MySQL** (`skillswap_db`).

The **schema is created and versioned by Flyway** — the SQL files are in:

```text
src/main/resources/db/migration
```

| Migration | What it does |
|---|---|
| `V1__init.sql` | Creates all 9 base tables |
| `V2__add_is_read_to_messages.sql` | Adds column `is_read` to messages |
| `V3__add_meetingUrl.sql` | Adds a meeting URL (for online sessions) |
| `V4__add_unique_constraints.sql` | Adds unique constraints |

### The 9 tables (from `V1__init.sql`)

| Table | Meaning in the business |
|---|---|
| `users` | The registered users (profile, role, rating…) |
| `skills` | The list of skills that exist in the platform |
| `skill_details` | Links a user to a skill + type (OFFER/WANTED) + level |
| `swap_requests` | A request to exchange skills between two users |
| `conversations` | A chat conversation linked to a swap request |
| `messages` | The messages inside a conversation |
| `sessions` | A scheduled session (online or on-site) |
| `reviews` | A review left after a session |
| `notifications` | Notifications stored for a user |

Relationships (foreign keys), business meaning and cardinalities are studied in **Part 2**.

---

## 1.8 The enums (fixed value lists)

| Enum | Values used in the codebase | Meaning |
|---|---|---|
| `Role` | `USER`, `ADMIN` | Who the user is |
| `SkillType` | `OFFER`, `WANTED` | Does the user offer this skill or want it? |
| `SkillLevel` | levels such as beginner / intermediate / advanced | Skill mastery level |
| `SwapStatus` | e.g. `PENDING`, `ACCEPTED`, `REJECTED` | State of a swap request |
| `SessionMode` | e.g. `ONLINE`, `ON_SITE` | Where the session happens |
| `SessionStatus` | states of a session | Lifecycle of a session |
| `NotificationType` | types of notifications | What the notification is about |

> The exact values are verified when we study the enums themselves in Part 2.

---

## 1.9 Configuration & infrastructure

### `application.properties` (main configuration)

```properties
spring.application.name=SkillSwap

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

app.jwt.secret=${JWT_SECRET}
app.jwt.expiration=${JWT_EXPIRATION}
```

Important points:

- The **database credentials and JWT secret are NOT hard-coded**.
  They come from environment variables (`${DB_URL}`, `${DB_USERNAME}`, `JWT_SECRET`…).
  This is safer for secrets.
- `ddl-auto=validate` → Hibernate does NOT create/change the schema.
  It only **checks** that the entities match the tables created by Flyway.
- Flyway is enabled and runs the migrations in `classpath:db/migration`.
- `show-sql=true` → we see the SQL queries in the logs (useful for learning).

### Docker

`docker-compose.yml` starts three containers:

```text
mysql  (port 3310 → 3306)
app    (the Spring Boot backend, port 8080)
frontend (the React app, port 5173)
```

### GitHub Actions CI

`.github/workflows/ci.yml` runs tests automatically on push / pull-request to `main`:
it starts a MySQL service, installs Java 21, and runs `mvn test`.

### Swagger / OpenAPI

The dependency `springdoc-openapi-starter-webmvc-ui` is present:
the API documentation is available (URLs like `/swagger-ui.html`, `/v3/api-docs/**`
are marked `permitAll` in the security configuration).

---

## 1.10 The frontend at a glance (studied later)

The frontend is a **React** application built with **Vite**:

| Folder | Content |
|---|---|
| `pages/` | The pages (Home, Login, Register, DiscoverSkills, MySkills, SwapRequests, Messages, Sessions, Notifications, Dashboard, Profile…) |
| `components/` | Reusable pieces of UI (skills, swap requests, sessions, reviews, notifications…) |
| `layouts/` | The common page layouts (Header, Footer, private/public layout) |
| `services/` | The files that call the backend API with Axios |
| `context/` | `AuthContext.jsx` — global authentication state |
| `App.jsx` | The root component, contains the routes |

The frontend uses, among others: **Axios** (HTTP), **React Router** (navigation),
**React Hook Form + Yup** (forms + validation), **@stomp/stompjs** (chat WebSocket).

We will study the frontend only **after all backend parts are finished**.

---

## 1.11 Important files we will study later

| Part | What we will study |
|---|---|
| Part 2 | All 9 entities + 7 enums + relationships |
| Part 3 | The DTOs (request + response), Entity vs DTO, validation |
| Part 4 | The repositories (methods, queries, MySQL) |
| Part 5 | The MapStruct mappers (Entity ⇄ DTO) |
| Part 6 | The services (business logic in detail) |
| Part 7 | The controllers (every endpoint, flow, statuses) |
| Part 8 | Security: `SecurityConfig`, `JwtUtils`, `JwtFilter`, roles, authentication |
| Part 9 | Business workflows (register, login, skills, swap, chat, sessions…) |
| Part 10 | Error handling (`GlobalExceptionHandler`, validations) |
| Part 11 | Configuration (application.properties, Flyway, Docker, CI) |
| Part 12 | Tests (the `src/test` folder, JUnit + Mockito) |
| Part 13 | Final backend revision |
| Frontend | React structure, pages, components, routing, Axios, chat, workflows |

---

## 1.12 Part 1 — questions I should be able to answer

- Which technologies does the SkillSwap backend use?
- What is the main package of the backend?
- What are the layers of the architecture and what does each one do?
- Why does the Controller call the Service instead of the database?
- How does the data travel from React to MySQL and back?
- Where does the JWT filter intervene in the request flow?
- What does `@RestController`, `@RequestMapping`, `@PostMapping`, `@RequestBody` do?
- What is `application.properties` and why are the values in `#...{}`?
- What does Flyway do in this project?
- What does `docker-compose.yml` start?

---

*End of Part 1. The document will be enriched with the next parts as we study them.*

---

# PART 2 — ENTITIES AND BUSINESS MODEL

---

## 2.1 What is an Entity?

In SkillSwap, an **Entity** is a Java class that represents a **table in the MySQL database**.

Example rule: one row in the `users` table = one `User` object in Java.

```text
Java Entity  (User.java)          Database  (users table)
─────────────────────────         ──────────────────────
User user = new User();           INSERT INTO users ...
JPA saves it                       a new row is created
```

The connection between the Entity and the table is done by **JPA / Hibernate**
(the ORM — Object-Relational Mapping). We write Java, and Hibernate transforms
our Java calls into SQL for MySQL.

### The annotations that make a class an Entity

```java
@Entity
@Table(name = "users")
public class User { ... }
```

- `@Entity` → "this Java class maps to a database table".
- `@Table(name = "users")` → "the exact table name is `users`".
  (If `@Table` is missing, Hibernate uses the class name — e.g. `skill_details`
  would be guessed from `SkillDetails`; the table name is important for our reads.)

---

## 2.2 JPA + Lombok annotations used in the entities

### Identity and columns

| Annotation | Example in SkillSwap | What it does |
|---|---|---|
| `@Id` | `@Id private Long id;` (all entities) | Marks the primary key of the row |
| `@GeneratedValue(strategy = GenerationType.IDENTITY)` | all entities | MySQL fills the `id` automatically (AUTO_INCREMENT) |
| `@Column(unique = true)` | `email` in `User` | Adds a UNIQUE constraint: two users cannot have the same email |
| `@Column(length = 1000)` | `bio` in `User` | Limits the column size to 1000 characters |
| `@Column(nullable = false, length = 2000)` | `content` in `Message` | The column cannot be null and max length is 2000 |
| `@Enumerated(EnumType.STRING)` | `role`, `swapStatus`, `type`… | Saves an enum as its NAME (`"USER"`, `"PENDING"`) instead of a number |

### Relationships

| Annotation | Example in SkillSwap | What it does |
|---|---|---|
| `@ManyToOne` | `SkillDetails.user`, `Message.sender` | Many rows point to one row |
| `@OneToMany` | `User.skillDetails` | One row is pointed at by many rows |
| `@OneToOne` | `SwapRequest.conversation`, `Conversation.swapRequest` | One-to-one link |
| `@JoinColumn(name = "user_id")` | `SkillDetails` | The foreign key that is stored in this table |
| `mappedBy = "user"` | `User.skillDetails` | "I am the inverse side; the owner is the field `user` in `SkillDetails`" |
| `fetch = FetchType.LAZY` | most `@ManyToOne` | Load the linked object only when it is really needed |
| `cascade = CascadeType.ALL` | `Conversation.messages` | Save/delete child objects together with the parent |
| `orphanRemoval = true` | `Conversation.messages` | If a child is removed from the list, it is deleted |

### Lombok

| Annotation | What it does |
|---|---|
| `@Getter` / `@Setter` | Generates all getters and setters at compile time |
| `@NoArgsConstructor` | Generates a constructor with no arguments (required by JPA) |
| `@AllArgsConstructor` | Generates a constructor with ALL fields |

Lombok works **at compile time**: it adds the code before the class is compiled,
so we do not have to write long boilerplate code ourselves.

> ### 🎤 How can I explain this to the jury?
> "I use Lombok to avoid writing getters and setters by hand. And I use JPA
> annotations so Hibernate knows exactly how to map my Java classes to the MySQL tables."

---

## 2.3 Entity one-by-one

For each entity: the file location, the table, the fields, and the relationships.

---

### 2.3.1 `User.java` → table `users`

**Business meaning:** a registered person on the platform.

**Attributes:**

| Field | Type | Constraint | Meaning |
|---|---|---|---|
| `id` | `Long` | `@Id`, auto | Primary key |
| `firstName` | `String` | – | First name |
| `lastName` | `String` | – | Last name |
| `email` | `String` | `@Column(unique = true)` | Login identifier, must be unique |
| `password` | `String` | – | Encrypted password (BCrypt) — never stored as plain text |
| `city` | `String` | – | City of the user |
| `bio` | `String` | `length = 1000` | Short description |
| `photo` | `String` | – | Photo URL / file name |
| `rating` | `Double` | – | Average rating (updated by reviews) |
| `createdAt` | `LocalDateTime` | set by `@PrePersist` | Account creation date |
| `role` | `Role` | `@Enumerated(STRING)` | `USER` or `ADMIN` |

**Relationships (all `@OneToMany`, all with `mappedBy`):**

| Field | Mapped by | Target table | Meaning |
|---|---|---|---|
| `skillDetails` | `user` in `SkillDetails` | `skill_details` | The skills this user offers/wants |
| `sentSwapRequests` | `sender` in `SwapRequest` | `swap_requests` | Requests this user sent |
| `receivedSwapRequests` | `receiver` in `SwapRequest` | `swap_requests` | Requests this user received |
| `notifications` | `user` in `Notification` | `notifications` | Notifications for this user |
| `givenReviews` | `reviewer` in `Review` | `reviews` | Reviews this user wrote |
| `receivedReviews` | `reviewee` in `Review` | `reviews` | Reviews this user received |
| `sentMessages` | `sender` in `Message` | `messages` | Messages this user wrote |

**Special point 1 — `User implements UserDetails`:**

```java
public class User implements UserDetails
```

`UserDetails` is an interface provided by **Spring Security**. It allows our own
`User` to be the user used by the security system. Because of this, Spring Security
knows how to load the user during login with:

- `getUsername()` → returns `email` (so the email is the login).
- `getAuthorities()` → returns `ROLE_USER` or `ROLE_ADMIN`:

```java
return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name().toUpperCase()));
```

This method is what allows `@PreAuthorize("hasRole('ADMIN')")` to work later.

> ### 🎤 How can I explain this to the jury?
> "My `User` entity implements Spring Security's `UserDetails` interface. That way
> Spring Security can use my own user entity for authentication. `getUsername()`
> returns the email, and `getAuthorities()` returns the role with the prefix `ROLE_`."

**Special point 2 — `@PrePersist`:**

```java
@PrePersist
protected void onCreated(){
    this.createdAt = LocalDateTime.now();
}
```

`@PrePersist` means: "just before this row is inserted into MySQL, run this method".
So the creation date is set automatically. We never have to write it by hand.

---

### 2.3.2 `Skill.java` → table `skills`

**Business meaning:** a skill that exists in the platform (e.g. "Guitar", "Java").

**Attributes:**

| Field | Type | Meaning |
|---|---|---|
| `id` | `Long` | Primary key |
| `name` | `String` | The skill name |
| `category` | `String` | Category (e.g. Music, IT, Sport) |

**Relationships:**

| Field | Mapped by | Meaning |
|---|---|---|
| `skillDetails` | `skill` in `SkillDetails` | All user+skill links for this skill |
| `offeredSwapRequests` | `skillOffered` in `SwapRequest` | Swap requests where this skill is the one offered |
| `wantedSwapRequests` | `skillWanted` in `SwapRequest` | Swap requests where this skill is the one wanted |

> A `Skill` is a **shared catalog** entry. It is NOT owned by one user:
> many users can link themselves to the same skill through `SkillDetails`.

---

### 2.3.3 `SkillDetails.java` → table `skill_details`

**Business meaning:** the link between a **User**, a **Skill**, a **type**
(OFFER or WANTED) and a **level**.

This is the entity that makes a skill *personal* to a user.

**Attributes:**

| Field | Type | Constraint | Meaning |
|---|---|---|---|
| `id` | `Long` | `@Id` | Primary key |
| `type` | `SkillType` | `@Enumerated(STRING)` | `OFFER` (I can teach it) or `WANTED` (I want to learn it) |
| `level` | `SkillLevel` | `@Enumerated(STRING)` | `BEGINNER`, `INTERMEDIATE`, `ADVANCED` |

**Relationships (owning side of both):**

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "skill_id", nullable = false)
private Skill skill;
```

- `@JoinColumn(name = "user_id", nullable = false)` → this table holds the foreign
  key `user_id`, and it is mandatory.
- `nullable = false` → a `SkillDetails` MUST have a user and a skill.

**Unique constraint (added by Flyway V4):**

```sql
UNIQUE (user_id, skill_id, type)
```

A user cannot have the same skill+type twice.

```text
User ──────< SkillDetails >────── Skill
                  │
               type: OFFER / WANTED
              level: BEGINNER / INTERMEDIATE / ADVANCED
```

---

### 2.3.4 `SwapRequest.java` → table `swap_requests`

**Business meaning:** the core of SkillSwap — user A asks user B to exchange skills.

**Attributes:**

| Field | Type | Meaning |
|---|---|---|
| `id` | `Long` | Primary key |
| `swapStatus` | `SwapStatus` | `PENDING`, `ACCEPTED`, `REJECTED`, `COMPLETED`, `CANCELLED` |
| `message` | `String` | A message from the sender |
| `createdAt` | `LocalDateTime` | set by `@PrePersist` |

**Relationships:**

```java
@ManyToOne                                          // no fetch → default EAGER
@JoinColumn(name = "sender_id")
private User sender;

@ManyToOne                                          // no fetch → default EAGER
@JoinColumn(name = "receiver_id")
private User receiver;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "skill_offered_id")
private Skill skillOffered;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "skill_wanted_id")
private Skill skillWanted;

@OneToOne(mappedBy = "swapRequest", cascade = CascadeType.ALL, orphanRemoval = true)
private Conversation conversation;
```

- `sender` / `receiver` → the two users involved.
- `skillOffered` → what the sender proposes to teach (from their OFFER skills).
- `skillWanted` → what the sender wants to learn (from their WANTED skills).
- `conversation` → the one chat connected to this request (created when the request is accepted).

**`@PrePersist` — automatic defaults:**

```java
createdAt = LocalDateTime.now();
if (swapStatus == null) {
    swapStatus = SwapStatus.PENDING;
}
```

A new request starts with status **PENDING** automatically.

---

### 2.3.5 `Conversation.java` → table `conversations`

**Business meaning:** a chat thread. In the current implementation a conversation
is **always connected to one swap request** (`@OneToOne` + `unique`).

**Attributes:**

| Field | Type | Meaning |
|---|---|---|
| `id` | `Long` | Primary key |
| `createdAt` | `LocalDateTime` | set by `@PrePersist` |

**Relationships:**

```java
@OneToOne
@JoinColumn(name = "swap_request_id", nullable = false, unique = true)
private SwapRequest swapRequest;

@OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Message> messages;

@OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Session> sessions;
```

- `swapRequest` with `unique = true` → one conversation per swap request.
- `cascade = ALL` + `orphanRemoval = true` → when the conversation is deleted,
  its messages and sessions are deleted too.

> ⚠️ Interesting detail: `Conversation` does NOT have its own participants list.
> The two participants are deduced from the `SwapRequest` (its `sender` and `receiver`).

---

### 2.3.6 `Message.java` → table `messages`

**Business meaning:** one text message inside a conversation.

**Attributes:**

| Field | Type | Constraint | Meaning |
|---|---|---|---|
| `id` | `Long` | `@Id` | Primary key |
| `content` | `String` | `nullable = false`, `length = 2000` | The text |
| `createdAt` | `LocalDateTime` | `@PrePersist` | Sending date |
| `isRead` | `boolean` | `@PrePersist` = false | Read / unread flag |

**Relationships:**

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "conversation_id")
private Conversation conversation;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "sender_id")
private User sender;
```

The message belongs to a conversation and to the user who wrote it.

**`@PrePersist`:**
```java
createdAt = LocalDateTime.now();
isRead = false;
```

---

### 2.3.7 `Session.java` → table `sessions`

**Business meaning:** a scheduled teaching/learning session between the two users
of a conversation.

**Attributes:**

| Field | Type | Meaning |
|---|---|---|
| `id` | `Long` | Primary key |
| `date` | `LocalDateTime` | When the session happens |
| `duration` | `Integer` | Length in minutes |
| `mode` | `SessionMode` | `ONLINE` or `PRESENTIEL` |
| `status` | `SessionStatus` | `PROPOSED`, `CONFIRMED`, `CANCELLED`, `COMPLETED` |
| `meetingUrl` | `String` | Added by Flyway V3 — the link for ONLINE sessions |

**Relationships:**

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "conversation_id", nullable = false)
private Conversation conversation;

@OneToMany(mappedBy = "session")
private List<Review> reviews;
```

Every session belongs to one conversation; a session can receive several reviews.

---

### 2.3.8 `Review.java` → table `reviews`

**Business meaning:** a review given AFTER a session. Whoever participated
can rate the other participant.

**Attributes:**

| Field | Type | Meaning |
|---|---|---|
| `id` | `Long` | Primary key |
| `rating` | `Integer` | The rating (1–5, values are not constrained by an enum) |
| `comment` | `String` | Text comment |

**Relationships (all `@ManyToOne`, all `nullable = false`):**

```java
private User reviewer;   // who writes the review   → reviewer_id
private User reviewee;   // who is reviewed         → reviewee_id
private Session session; // the related session     → session_id
```

**Unique constraint (Flyway V4):** `UNIQUE (reviewer_id, session_id)`
→ a user can review the same session only once.

---

### 2.3.9 `Notification.java` → table `notifications`

**Business meaning:** an alert stored for one user (new swap request, request
accepted…). Notifications are stored in the database, not only shown live.

**Attributes:**

| Field | Type | Meaning |
|---|---|---|
| `id` | `Long` | Primary key |
| `type` | `NotificationType` | `NEW_SWAP_REQUEST`, `REQUEST_ACCEPTED`, `REQUEST_REJECTED`, `NEW_MESSAGE`, `SESSION_REMINDER` |
| `message` | `String` | The text |
| `isRead` | `boolean` | Read / unread flag |

**Relationship:**

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;
```

Each notification belongs to exactly one user.

---

## 2.4 The 7 enums (with their real values)

| Enum | Real values | Where it is used |
|---|---|---|
| `Role` | `USER`, `ADMIN` | `User.role` |
| `SkillType` | `OFFER`, `WANTED` | `SkillDetails.type` |
| `SkillLevel` | `BEGINNER`, `INTERMEDIATE`, `ADVANCED` | `SkillDetails.level` |
| `SwapStatus` | `PENDING`, `ACCEPTED`, `REJECTED`, `COMPLETED`, `CANCELLED` | `SwapRequest.swapStatus` |
| `SessionMode` | `ONLINE`, `PRESENTIEL` | `Session.mode` |
| `SessionStatus` | `PROPOSED`, `CONFIRMED`, `CANCELLED`, `COMPLETED` | `Session.status` |
| `NotificationType` | `NEW_SWAP_REQUEST`, `REQUEST_ACCEPTED`, `REQUEST_REJECTED`, `NEW_MESSAGE`, `SESSION_REMINDER` | `Notification.type` |

> ⚠️ Note: `SessionMode` uses `PRESENTIEL` (a French word) and not `ON_SITE`.
> This is the real value in the current code. We are not changing it.

### Why do enums exist?

Enums guarantee that a value can only be one of a **fixed list**. This avoids
mistakes like typing `"Pendng"` into the database. Spring Security will also use
`Role` (`USER`/`ADMIN`) to decide authorization later.

`@Enumerated(EnumType.STRING)` saves the **name** in the database
(e.g. `"ACCEPTED"`), which is more readable than a number.

---

## 2.5 The complete relationship map

### Diagram (with cardinalities)

```text
                        ┌────────────┐
                        │    Skill   │  (shared catalog of skills)
                        └─────┬──────┘
                              │ 1
                              ▼ n
    ┌──────────┐  1 ──── n  ┌────────────────┐
    │   User   │ ────────── │  SkillDetails  │   type: OFFER / WANTED
    └──────────┘            └────────────────┘   level: BEGINNER / …
```

```text
    ┌──────────┐   sender   ┌─────────────┐  receiver   ┌──────────┐
    │  User A  │ ────────▶  │ SwapRequest │  ◀────────  │  User B  │
    └──────────┘            └─────────────┘             └──────────┘
                                  │  skillOffered / skillWanted
                                  ▼
                           ┌──────────────┐
                           │    Skill     │
                           └──────────────┘
```

```text
    SwapRequest ── 1 ── 1 ──▶  Conversation  ──┬─ 1 ── n ──▶  Message
      (one conversation        (chat thread)  │              (has a sender User)
       per swap request)                      │
                                              └─ 1 ── n ──▶  Session
                                                             │ 1
                                                             ▼ n
                                                           Review
                                          (reviewer_user_id ─ n ─ User
                                           reviewee_user_id ─ n ─ User)
```

```text
    User ── 1 ── n ── Notification
```

### Relationships summary table

| Relationship | Cardinality | Owning side (holds FK) | Foreign key / join | Link field |
|---|---|---|---|---|
| User → SkillDetails | 1 ─ n | SkillDetails | `skill_details.user_id` | `SkillDetails.user` |
| Skill → SkillDetails | 1 ─ n | SkillDetails | `skill_details.skill_id` | `SkillDetails.skill` |
| User (sender) → SwapRequest | 1 ─ n | SwapRequest | `swap_requests.sender_id` | `SwapRequest.sender` |
| User (receiver) → SwapRequest | 1 ─ n | SwapRequest | `swap_requests.receiver_id` | `SwapRequest.receiver` |
| Skill (offered) → SwapRequest | 1 ─ n | SwapRequest | `swap_requests.skill_offered_id` | `SwapRequest.skillOffered` |
| Skill (wanted) → SwapRequest | 1 ─ n | SwapRequest | `swap_requests.skill_wanted_id` | `SwapRequest.skillWanted` |
| SwapRequest → Conversation | 1 ─ 1 | Conversation | `conversations.swap_request_id` (unique) | `Conversation.swapRequest` |
| Conversation → Message | 1 ─ n | Message | `messages.conversation_id` | `Message.conversation` |
| User (sender) → Message | 1 ─ n | Message | `messages.sender_id` | `Message.sender` |
| Conversation → Session | 1 ─ n | Session | `sessions.conversation_id` | `Session.conversation` |
| Session → Review | 1 ─ n | Review | `reviews.session_id` | `Review.session` |
| User (reviewer) → Review | 1 ─ n | Review | `reviews.reviewer_id` | `Review.reviewer` |
| User (reviewee) → Review | 1 ─ n | Review | `reviews.reviewee_id` | `Review.reviewee` |
| User → Notification | 1 ─ n | Notification | `notifications.user_id` | `Notification.user` |

---

## 2.6 Business meaning of the main relationships

- **User ↔ SkillDetails**: "which skills does THIS user offer or want, and at which level".
- **Skill ↔ SkillDetails**: a skill is a shared catalog entry that many users can use.
- **SwapRequest ↔ User (sender / receiver)**: two foreign keys in one table allow
  one user to appear on either side of the exchange.
- **SwapRequest ↔ Conversation (one-to-one)**: one exchange = one chat thread.
  This is why a conversation is created when a request is accepted (verified in Part 9).
- **Conversation ↔ Message**: a chat contains many messages.
- **Conversation ↔ Session**: a chat can have several planned sessions.
- **Session ↔ Review**: after a session, participants can leave reviews.
- **Review ↔ User (twice)**: the reviewer (who writes) and the reviewee (who is rated).
  This gives each user a `rating` (stored on `User`).
- **User ↔ Notification**: notifications are stored per user.

> ### 🎤 How can I explain the model to the jury?
> "The model is built around the exchange. A swap request links a sender and a
> receiver with the skill offered and the skill wanted. If it is accepted, we create
> one conversation (one-to-one), where they can chat and plan sessions. After a session,
> they can leave a review, which feeds the user's rating."

---

## 2.7 Useful details to remember

### EAGER vs LAZY

- In `SwapRequest`, `sender` and `receiver` have **no `fetch`**, so Spring Data loads
  them **EAGER** (immediately, together with the request).
- All the other `@ManyToOne` use `FetchType.LAZY` (loaded only when the field is
  actually used, which is more efficient).

### Cascade and orphanRemoval

- `Conversation` has `cascade = ALL` + `orphanRemoval = true` on `messages` and
  `sessions`: deleting a conversation deletes its messages and sessions.
- `SwapRequest.conversation` also has `cascade = ALL`: deleting the request could
  delete the conversation (and through it the messages/sessions).

### `@PrePersist` automatic fields

| Entity | Automatically set before insert |
|---|---|
| `User` | `createdAt` |
| `SwapRequest` | `createdAt` + `swapStatus = PENDING` |
| `Conversation` | `createdAt` |
| `Message` | `createdAt` + `isRead = false` |
| `Notification` | `createdAt` + `isRead = false` |

### Flyway columns added later

- `messages.is_read` (V2) → read/unread indicator for messages.
- `sessions.meeting_url` (V3) → link for online sessions.
- Unique constraints on `skill_details` and `reviews` (V4).

---

## 2.8 Part 2 — questions I should be able to answer

- What is an Entity? How does it map to MySQL?
- What do `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`, `@Enumerated` do?
- What is the difference between `@ManyToOne` and `@OneToMany`? Where are they in SkillSwap?
- What is `mappedBy`? What is the owning side?
- Why does `SkillDetails` exist? Why not just put type/level on `Skill`?
- Why does `SwapRequest` have two user foreign keys?
- Why is Conversation one-to-one with SwapRequest?
- What does `User implements UserDetails` mean for security?
- Which statuses exist for a swap request, a session, a notification?
- What is `@PrePersist` and which fields rely on it?
- What did migrations V2, V3, V4 add?

---

*End of Part 2.*

---

# PART 3 — DTOs

---

## 3.1 What is a DTO?

**DTO = Data Transfer Object.**

A DTO is a simple Java class used **only to carry data** between the frontend
(React) and the backend. It has **no business logic**, only fields
(+ getters and setters generated by Lombok).

In SkillSwap there are two families:

```text
dto/request/    → data that COMES IN from the frontend
dto/response/   → data that GOES OUT to the frontend
```

---

## 3.2 Why do DTOs exist? (Entity vs DTO)

The **Entity** (Part 2) is the Java image of the **database table**.
The **DTO** is the Java image of the **JSON message** exchanged with React.

| | Entity | DTO |
|---|---|---|
| Represents | A row in MySQL | A JSON body in an HTTP request/response |
| Contains | JPA annotations, relationships, lazy fields | Only plain fields |
| Can expose passwords? | Yes (it holds `password`) | We choose NOT to include it |
| Knows the database? | Yes | No |

### Example: why do we NOT send the `User` entity directly?

The `User` entity has a `password` field. If we sent the entity directly as JSON,
the password would go to the frontend — a **security problem**.

So we use DTOs, for example:

- `AuthResponse` → token + basic user info (NO password).
- `UserResponseDTO` → public profile info (NO password).

Another reason: `User` has lazy relationships (`skillDetails`, `sentSwapRequests`…).
Sending the entity directly could trigger loading many extra objects. A DTO contains
**exactly the fields the frontend needs**.

> ### 🎤 How can I explain this to the jury?
> "I never send the JPA entity directly to the frontend. I use DTOs. The entity
> knows about the database and even contains the password, so I build response
> DTOs that contain only the safe data the React app needs. And with request DTOs,
> I control exactly what the frontend is allowed to send me."

---

## 3.3 Request DTOs — data coming in

A request DTO receives the JSON body of a request from React.
Spring converts JSON → DTO automatically (via Jackson).

### `RegisterRequestDTO` (register)

| Field | Validation | Meaning |
|---|---|---|
| `firstName` | `@NotBlank` | Required |
| `lastName` | `@NotBlank` | Required |
| `email` | `@NotBlank` + `@Email` | Required, must look like an email |
| `password` | `@NotBlank` + `@Size(min = 8)` | Required, at least 8 characters |
| `city` | `@NotBlank` | Required |
| `bio` | `@Size(max = 1000)` | Optional, max 1000 chars |
| `photo` | – | Optional |

### `LoginRequestDTO` (login)

| Field | Validation | Meaning |
|---|---|---|
| `email` | `@NotBlank` + `@Email` | Required |
| `password` | `@NotBlank` | Required |

### `UpdateProfileRequestDTO` (edit profile)

| Field | Validation |
|---|---|
| `firstName` | `@NotBlank` |
| `lastName` | `@NotBlank` |
| `email` | `@Email` |
| `city` | `@NotBlank` |
| `bio` | `@Size(max = 1000)` |
| `photo` | – |

### `SkillRequestDto` (create/update a catalog skill)

| Field | Validation |
|---|---|
| `name` | `@NotBlank` |
| `category` | `@NotBlank` |

### `SkillDetailsRequestDto` (link a skill to the current user)

| Field | Validation | Meaning |
|---|---|---|
| `skillId` | `@NotNull` | The ID of the skill from the catalog |
| `type` | `@NotNull` | `OFFER` or `WANTED` |
| `level` | `@NotNull` | `BEGINNER` / `INTERMEDIATE` / `ADVANCED` |

> Note: the frontend sends IDs and enums, not full objects. The Service will load
> the real objects from the IDs.

### `SwapRequestRequestDto` (create a swap request)

| Field | Validation | Meaning |
|---|---|---|
| `receiverId` | `@NotNull` | The ID of the person who receives the request |
| `skillOfferedId` | `@NotNull` | The skill I want to teach |
| `skillWantedId` | `@NotNull` | The skill I want to learn |
| `message` | `@NotBlank` | A message written by the sender |

### `ConversationRequestDto`

| Field | Validation |
|---|---|
| `swapRequestId` | `@NotNull` |

> ⚠️ Observation: this DTO exists in the code, but **no controller uses it** in the
> current version. We keep it in the file structure; it is simply not wired to an endpoint.

### `MessageRequestDto`

| Field | Validation | Meaning |
|---|---|---|
| `content` | `@NotBlank` + `@Size(max = 2000)` | The message text |
| `conversationId` | `@NotNull` | The conversation it belongs to |

Also used by the WebSocket chat controller.

### `SessionRequestDto`

| Field | Validation | Meaning |
|---|---|---|
| `date` | `@NotNull` + `@Future` | Must be in the future |
| `duration` | `@NotNull` + `@Positive` | Minutes, must be > 0 |
| `mode` | `@NotNull` | `ONLINE` / `PRESENTIEL` |
| `conversationId` | `@NotNull` | The conversation |
| `meetingUrl` | – | Link for online sessions |

### `ReviewRequestDto`

| Field | Validation | Meaning |
|---|---|---|
| `rating` | `@NotNull` + `@Min(1)` + `@Max(5)` | 1 to 5 |
| `comment` | `@Size(max = 1000)` | Optional text |
| `revieweeId` | `@NotNull` | Who is reviewed |
| `sessionId` | `@NotNull` | Which session |

### `NotificationRequestDto`

| Field | Validation |
|---|---|
| `type` | `@NotNull` |
| `message` | `@NotBlank` + `@Size(max = 500)` |
| `userId` | `@NotNull` |

> ⚠️ Observation: this DTO is not used as an `@Valid` request body in a controller
> in the current code. Notifications are created internally by services.

---

## 3.4 Response DTOs — data going out

Response DTOs answer one important question:

> "What does the frontend need to display this feature?"

### `AuthResponse` — login / register

Returns the **JWT token** + basic user info (no password):

```json
{ "token": "...", "id": 1, "firstName": "...", "lastName": "...",
  "email": "...", "city": "...", "photo": "...", "role": "USER" }
```

### `UserResponseDTO` — public profile

```json
{ "id": 1, "firstName": "...", "lastName": "...", "email": "...", "city": "...",
  "bio": "...", "photo": "...", "rating": 4.5, "createdAt": "...", "role": "USER" }
```

### `SkillResponseDto` — catalog skill

```json
{ "id": 1, "name": "Guitar", "category": "Music" }
```

### `SkillDetailsResponseDto` — a user's skill entry

This DTO **flattens** the relationships into simple fields:

| Field | Comes from |
|---|---|
| `id` | `SkillDetails.id` |
| `type` / `level` | `SkillDetails` |
| `userId` / `userName` | `SkillDetails.user` |
| `skillId` / `skillName` | `SkillDetails.skill` |
| `category` | `SkillDetails.skill.category` |

The frontend gets a **ready-to-display** object (names + ids together)
instead of having to follow relationships itself.

### `SwapRequestResponseDto` (also flattened)

```java
id, swapStatus, message, createdAt,
senderId, senderName,
receiverId, receiverName,
skillOfferedId, skillOfferedName,
skillWantedId, skillWantedName,
conversationId
```

### `ConversationResponseDto`

```java
id, createdAt, swapRequestId,
senderId, senderName,
receiverId, receiverName
```

### `MessageResponseDto`

```java
id, content, createdAt, conversationId,
senderId, senderName, isRead
```

### `SessionResponseDto`

```java
id, date, duration, mode, status, conversationId, meetingUrl
```

### `ReviewResponseDto`

```java
id, rating, comment,
reviewerId, reviewerName,
revieweeId, revieweeName,
sessionId
```

### `NotificationResponseDto`

```java
id, type, message, isRead, createdAt, userId, userName
```

### `DashboardResponseDto` (user dashboard)

```java
pendingRequests, upcomingSessions, unreadMessages, notifications
```

### `AdminDashboardResponseDto` (admin dashboard)

```java
totalUsers, totalSkills, totalSwapRequests, activeSessions, completedSessions
```

### Why are response DTOs "flattened"?

Because the frontend is JavaScript: it is easier and faster to read
`dto.senderName` than to ask the API for the sender, then the name, etc.
The Service/Mapper layer does this "flattening" work (Mappers = Part 5).

---

## 3.5 The validation system

### The annotations

| Annotation | Meaning | Used in SkillSwap for |
|---|---|---|
| `@NotBlank` | String must not be empty/whitespace | required text fields |
| `@NotNull` | Value must be present | IDs and enums |
| `@Email` | Must look like an email | email fields |
| `@Size(min/max)` | Length limit | bio (1000), message (2000/500), password (min 8) |
| `@Min(1)` / `@Max(5)` | Number range | rating (1–5) |
| `@Positive` | Must be > 0 | session duration |
| `@Future` | Must be a future date | session date |

### Who activates these validations? The `@Valid` annotation

Putting `@NotBlank` on a field does nothing by itself.
We must also put **`@Valid`** on the method parameter of the Controller.
Then Spring checks the rules BEFORE the method runs
(if a rule fails → HTTP 400 Bad Request).

Real usage in SkillSwap (verified):

| Controller | Method using `@Valid` |
|---|---|
| `SkillController` | `createSkill`, `updateSkill`, `addSkillToUser`, `updateUserSkill` |
| `UserController` | `updateProfile` |
| `SwapRequestController` | `createSwap` |
| `SessionController` | `createSession`, `updateSession` |
| `MessageController` | `createMessage` |
| `ReviewController` | `createReview` |

> ⚠️ Important observation: `AuthController.register()` and `AuthController.login()`
> receive `RegisterRequestDTO` / `LoginRequestDTO` **without `@Valid`**. So even
> though those DTOs have validation annotations, the validations are **not triggered**
> on those two endpoints in the current code.
> Also `GlobalExceptionHandler` currently handles `RuntimeException` and
> `AccessDeniedException` only — not `MethodArgumentNotValidException`.
> So a validation failure currently falls back to Spring's default 400 error body.
> This is the current behavior; we are not changing it.

> ### 🎤 How can I explain this to the jury?
> "I validate the data at the edge of my API. The request DTOs carry annotations
> like `@NotBlank` and `@Size`, and the controllers trigger them with `@Valid`.
> That way invalid data is rejected before my services run."

---

## 3.6 The data flow around a DTO

For a request (data in):

```text
React (JSON body)
   │
   ▼
Spring (Jackson) converts JSON → RequestDTO object
   │
   ▼
@Valid checks the annotations (if present)
   │
   ▼
Controller passes the DTO to the Service
   │
   ▼
Service uses the DTO fields to build/update entities
```

For a response (data out):

```text
Entity (from the database)
   │
   ▼
Mapper converts Entity → ResponseDTO (flattened)
   │
   ▼
Controller returns the ResponseDTO
   │
   ▼
Spring converts it to JSON
   │
   ▼
React receives clean JSON
```

---

## 3.7 Naming notes (actual code)

- Some files use the suffix `DTO` in capitals: `RegisterRequestDTO`, `LoginRequestDTO`,
  `UpdateProfileRequestDTO`, `UserResponseDTO`, `AuthResponse`.
- Others use `Dto`: `SkillRequestDto`, `SwapRequestRequestDto`, `MessageResponseDto`…
- This is the real inconsistency of the project. Nothing to fix: it is only a name.

---

## 3.8 Part 3 — questions I should be able to answer

- What is a DTO and why do we not send Entities directly?
- Why must the password never appear in a response DTO?
- What is the difference between `dto/request` and `dto/response`?
- Why are response DTOs "flattened" (ids + names together)?
- What do `@NotBlank`, `@NotNull`, `@Email`, `@Size`, `@Min/@Max`, `@Positive`, `@Future` check?
- What does `@Valid` do and which controllers use it?
- What happens if `@Valid` is missing (as in `AuthController`)?
- How does Jackson convert JSON into a DTO?

---

*End of Part 3.*

---

# PART 4 — REPOSITORIES

---

## 4.1 What is a Repository?

A **Repository** is the layer that talks to MySQL. In SkillSwap, a repository is a
Java **interface** (not a class) that extends **`JpaRepository<Entity, Long>`**.

```java
@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
```

- `@Repository` → "this is a Spring bean (data access component)".
- `JpaRepository<User, Long>` → "I work with the `User` entity, whose `id` is a `Long`".

We don't write the implementation: **Spring Data JPA creates it automatically** at
runtime. We only declare the methods we need.

---

## 4.2 What does `JpaRepository` give us for free?

Because every repository extends `JpaRepository`, we already have (without writing
anything):

| Method | SQL that Hibernate performs |
|---|---|
| `findById(id)` | `SELECT * FROM ... WHERE id = ?` |
| `findAll()` | `SELECT * FROM ...` |
| `findAll(pageable)` | `SELECT * FROM ...` + pagination (`LIMIT`, `OFFSET`) |
| `save(entity)` | `INSERT` if id is null, `UPDATE` if id exists |
| `deleteById(id)` | `DELETE FROM ... WHERE id = ?` |
| `delete(entity)` | `DELETE FROM ...` |
| `count()` | `SELECT COUNT(*) FROM ...` |

**`save()` is interesting:** Hibernate decides between INSERT and UPDATE by looking
at the `id`:
- id is `null` → new row (`INSERT`),
- id exists → refresh the row (`UPDATE`).

---

## 4.3 Derived queries — Spring reads the method name

A method like `findByEmail` or `existsBySkillId` is called a **derived query**:
Spring Data JPA parses the method name and builds the SQL from it.

How to read a name:

```text
find | By | Email
 │         │
 │         └──  the column/field to filter on
 └────────────  the action (find / exists / count / delete)
```

| Name part | Meaning |
|---|---|
| `find` | SELECT |
| `exists` | "does any row match?" → returns boolean |
| `count` | how many rows match → returns number |
| `delete` | DELETE |
| `ByFieldName` | the WHERE clause (`WHERE field_name = ?`) |
| `And` | combines conditions with AND |
| `Or` | combines conditions with OR |
| `IsReadFalse` | `is_read = false` |
| Path like `ConversationSwapRequestSenderId` | follows relationships: `conversation.swapRequest.sender.id` |

Example with several conditions:

```java
boolean existsByUserIdAndSkillIdAndType(Long userId, Long skillId, SkillType type);
```
→ `SELECT COUNT(*) > 0 FROM skill_details WHERE user_id = ? AND skill_id = ? AND type = ?`

### Following relationships in the name

```java
Page<Session> findByConversationSwapRequestSenderIdOrConversationSwapRequestReceiverId(Long senderId, Long receiverId, Pageable pageable);
```

This means:
`WHERE conversation.swapRequest.sender.id = ?1 OR conversation.swapRequest.receiver.id = ?2`
(from `Session` → `conversation` → `swapRequest` → `sender/receiver`).

> ### 🎤 How can I explain this to the jury?
> "I use Spring Data JPA repositories. I only declare interface methods with names
> like `findByEmail`. Spring parses the method name and generates the SQL query
> automatically — so I never write SQL by hand."

---

## 4.4 Pagination with `Page` and `Pageable`

Several methods take a **`Pageable`** parameter and return a **`Page`**:

```java
Page<SkillDetails> findByUserId(Long userId, Pageable pageable);
```

- `Pageable` → tells the database "how many rows" and "which page".
- `Page` → the result = one slice of rows + total count + the `Pageable` used.

This is useful for lists (skills, swap requests, messages, notifications)
so the frontend does not load the whole table at once.
The frontend will call these endpoints with parameters like `page` and `size`.

---

## 4.5 The repositories one by one

### `UserRepo` → table `users`

| Method | Question to the database | Called by |
|---|---|---|
| `findByEmail(email)` | "Give me the user with this email" (Optional) | `AuthService`, `CustomUserDetailsService`, `UserService` |
| `existsByEmail(email)` | "Does a user with this email exist?" | `AuthService` (register) |

`Optional<User>` means: "the result may or may not exist". We then use
`.orElseThrow(...)` to handle the "not found" case.

> `CustomUserDetailsService` also uses `findByEmail` — this is how Spring Security
> loads the user at **login** time (we study it in Part 8).

### `SkillRepo` → table `skills`

| Method | Question | Called by |
|---|---|---|
| `existsByName(name)` | "Does a skill with this name already exist?" | `SkillService` |

### `SkillDetailsRepo` → table `skill_details`

| Method | Question | Called by |
|---|---|---|
| `findByUserId(userId, pageable)` | "All skill entries of a user" (paged) | `SkillService`, `UserService` |
| `findByUserIdAndSkillId(userId, skillId)` | "The user's entry for one specific skill" | `SkillService` |
| `existsByUserIdAndSkillId(...)` | "Does this user already have this skill?" | `SwapRequestService` |
| `existsByUserIdAndSkillIdAndType(...)` | "Same skill with the same type?" | `SkillService` (checks duplicates) |
| `existsBySkillId(skillId)` | "Is this skill used by any user?" | `SkillService` (protection before deleting a catalog skill) |

### `SwapRequestRepo` → table `swap_requests`

| Method | Question | Called by |
|---|---|---|
| `findByReceiverId(receiverId, pageable)` | "Requests received by this user" (paged) | `SwapRequestService`, `DashboardService` |
| `findBySenderId(senderId, pageable)` | "Requests sent by this user" (paged) | `SwapRequestService`, `DashboardService`, `UserService` |
| `findByReceiverIdAndSwapStatus(receiverId, status)` | "Requests received with a given status" | `DashboardService` |
| `existsBySkillOfferedId(skillId)` | "Is this skill offered in any request?" | `SkillService` (protection before deleting a skill) |
| `existsBySkillWantedId(skillId)` | "Is this skill wanted in any request?" | `SkillService` |

### `ConversationRepo` → table `conversations`

| Method | Question | Called by |
|---|---|---|
| `findBySwapRequestId(swapRequestId)` | "The conversation of a given swap request" | `ConversationService` |
| `findBySwapRequestSenderIdAndSwapRequestReceiverId(senderId, receiverId)` | "Conversation between two users (regardless of direction of the request)" | `ConversationService` |
| `findBySwapRequestSenderId(senderId, pageable)` | "Conversations where the sender is this user" | `ConversationService` |
| `findBySwapRequestReceiverId(receiverId, pageable)` | "Conversations where the receiver is this user" | `ConversationService` |

### `MessageRepo` → table `messages`

| Method | Question | Called by |
|---|---|---|
| `findByConversationId(conversationId, pageable)` | "The messages of one conversation" (paged) | `MessageService`, `DashboardService` |

### `SessionRepo` → table `sessions`

| Method | Question | Called by |
|---|---|---|
| `findByConversationSwapRequestId(swapId, pageable)` | "Sessions of a swap request" | `SessionService`, `DashboardService` |
| `findByConversationSwapRequestSenderIdOrConversationSwapRequestReceiverId(senderId, receiverId, pageable)` | "Sessions where I participate (as sender OR receiver of the swap)" | `SessionService` |

### `ReviewRepo` → table `reviews`

| Method | Question | Called by |
|---|---|---|
| `findByRevieweeId(userId, pageable)` | "Reviews that a user received" | `ReviewService`, `UserService` |
| `findByReviewerId(userId, pageable)` | "Reviews that a user wrote" | `ReviewService`, `UserService` |

### `NotificationRepo` → table `notifications`

| Method | Question | Called by |
|---|---|---|
| `findByUserId(userId, pageable)` | "Notifications of a user" (paged) | `NotificationService`, `DashboardService`, `UserService` |
| `countByUserIdAndIsReadFalse(userId)` | "How many notifications are unread?" | `NotificationService` (badge count) |

---

## 4.6 Summary — which service uses which repository

| Repository | Used by services |
|---|---|
| `UserRepo` | AuthService, CustomUserDetailsService, DashboardService, MessageService, NotificationService, ReviewService, SkillService, SwapRequestService, UserService |
| `SkillRepo` | DashboardService, SkillService, SwapRequestService |
| `SkillDetailsRepo` | SkillService, SwapRequestService, UserService |
| `SwapRequestRepo` | ConversationService, DashboardService, SessionService, SkillService, SwapRequestService, UserService |
| `ConversationRepo` | ConversationService, MessageService, SessionService |
| `MessageRepo` | DashboardService, MessageService |
| `SessionRepo` | DashboardService, ReviewService, SessionService |
| `ReviewRepo` | ReviewService, UserService |
| `NotificationRepo` | DashboardService, NotificationService, UserService |

---

## 4.7 How the Repository is injected into a Service

Example pattern (seen in the services):

```java
@Service
@RequiredArgsConstructor
public class SwapRequestService {

    private final SwapRequestRepo swapRequestRepo;
    private final UserRepo userRepo;
    ...
}
```

- `@Service` → Spring registers the class as a bean.
- `@RequiredArgsConstructor` → Lombok writes a constructor with the `final` fields.
- Spring finds `SwapRequestRepo`, `UserRepo`… and **injects** them automatically
  (dependency injection). The Service can then call `swapRequestRepo.findBySenderId(...)`.

> ### 🎤 How can I explain this to the jury?
> "My services never connect to the database directly. They receive the repositories
> through dependency injection — Spring gives each service exactly the repositories
> it declares. The repository is then the only place that talks to MySQL."

---

## 4.8 Big picture — where the repository sits

```text
Controller
   → Service (business rules)
       → Repository (Spring Data JPA interface)
           → Hibernate generates the SQL
               → MySQL
```

What flows back:

```text
MySQL rows
   → Hibernate converts each row into an Entity object
       → Service / Mapper
           → DTO → JSON → React
```

---

## 4.9 Part 4 — questions I should be able to answer

- What is a Repository and what does `JpaRepository<User, Long>` mean?
- Why don't we write the implementation of a repository?
- What is a derived query? Give examples from SkillSwap.
- Write the SQL that `existsByUserIdAndSkillIdAndType` would produce.
- What does a method name like `findByConversationSwapRequestSenderId` mean?
- What are `Page` and `Pageable` and why are they used?
- What does `Optional<User>` represent and how do we use it?
- Which repository does `CustomUserDetailsService` use and why is that important for login?
- Which repository methods protect the deletion of a `Skill`?

---

*End of Part 4.*

---

# PART 5 — MAPPERS (MapStruct)

---

## 5.1 What is a Mapper?

A **Mapper** converts one object type into another. In SkillSwap, mappers move data
between the **Entities** (Part 2) and the **DTOs** (Part 3).

```text
Entity      ↔      DTO
(MySQL)            (JSON for React)
```

SkillSwap uses **MapStruct**, a code generator. We only write an **interface** with
method signatures and annotations; MapStruct **writes the implementation for us**
at compile time.

Example (`UserMapper.java`):

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO toResponse(User user);

    void updateUser(UpdateProfileRequestDTO dto, @MappingTarget User user);
}
```

At compile time, MapStruct generates a `UserMapperImpl` class containing:

```java
UserResponseDTO toResponse(User user) {
    UserResponseDTO dto = new UserResponseDTO();
    dto.setId(user.getId());
    dto.setFirstName(user.getFirstName());
    ...
    return dto;
}
```

We never see or write this implementation — the compiler produces it
(you can find it in the `target/generated-sources` folder after `mvn compile`).

### Why "spring" in `@Mapper(componentModel = "spring")`?

It means: "register the generated mapper as a **Spring bean** (component)".
Then we can inject it like any other dependency:

```java
@Service
public class SkillService {
    private final SkillMapper mapper;
    // constructor injection by Spring
}
```

---

## 5.2 Why use a Mapper at all?

- **Entity ↔ DTO conversion is repetitive.** Writing `dto.setSkillName(skill.getName())`
  for every field is long, boring code.
- MapStruct does it **automatically when names match**, and lets us fix the
  differences with `@Mapping`.
- Because it runs **at compile time**, it is fast and errors are found at build time
  (not at runtime).

> ### 🎤 How can I explain this to the jury?
> "I use MapStruct to convert entities into DTOs. I declare an interface, MapStruct
> generates the implementation during compilation, and with `@Mapping` I tell it how
> to flatten relationships, like taking `user.firstName` and placing it into `userName`."

---

## 5.3 The three kinds of mapper methods

### 1. `toResponse(Entity)` → Response DTO (the most used)

Converts a database object into the safe, flattened JSON object.

When field names match, MapStruct copies them automatically.
When they do NOT match, we use `@Mapping(source = "user.firstName", target = "userName")`.

This is how the "flattening" from Part 3 really happens:

```java
@Mapping(source = "user.id", target = "userId")
@Mapping(source = "user.firstName", target = "userName")
@Mapping(source = "skill.id", target = "skillId")
@Mapping(source = "skill.name", target = "skillName")
@Mapping(source = "skill.category", target = "category")
SkillDetailsResponseDto toResponse(SkillDetails skillDetails);
```

### 2. `toEntity(Request DTO)` → Entity

Converts the incoming JSON into an entity.

> ⚠️ Important observation: In the current code, `toEntity` is **only used by
> `SkillService`** (for `SkillRequestDto`). For all the other resources, the Entity
> is built **manually with `new`** inside the Service. The `toEntity` methods exist
> in the mappers, but the services do not call them. We keep this as the real code.

### 3. Update methods with `@MappingTarget`

```java
void updateUser(UpdateProfileRequestDTO dto, @MappingTarget User user);
```

MapStruct takes the DTO values and applies them **onto an existing object** instead
of creating a new one. This is perfect for update endpoints (edit profile, update skill…).

`@MappingTarget` = "this object is the target to update, don't create a new one".

---

## 5.4 The mappers one by one

| Mapper | `toResponse` uses `@Mapping` for | Used by |
|---|---|---|
| `UserMapper` | (names match: user → UserResponseDTO) | `UserService` |
| `SkillMapper` | (names match: skill → SkillResponseDto) | `SkillService` |
| `SkillDetailsMapper` | user.id→userId, user.firstName→userName, skill.id→skillId, skill.name→skillName, skill.category→category | `SkillService` |
| `SwapRequestMapper` | sender/receiver/skillOffered/skillWanted → id/name + conversation.id→conversationId | `SwapRequestService` |
| `ConversationMapper` | swapRequest.id, swapRequest.sender.id/name, swapRequest.receiver.id/name | `ConversationService` |
| `MessageMapper` | conversation.id, sender.id, sender.firstName→senderName | `MessageService` |
| `SessionMapper` | conversation.id→conversationId | `SessionService` |
| `ReviewMapper` | reviewer.id/name, reviewee.id/name, session.id | `ReviewService` |
| `NotificationMapper` | user.id→userId, user.firstName→userName | `NotificationService` |

### Update methods used in the code

| Mapper | Update method | Used by |
|---|---|---|
| `UserMapper` | `updateUser(dto, user)` | `UserService.updateProfile` |
| `SkillMapper` | `updateSkill(dto, skill)` | `SkillService.updateSkill` |
| `SessionMapper` | `updateSession(dto, session)` | `SessionService.updateSession` |

---

## 5.5 Real business example — `SwapRequestMapper.toResponse`

A `SwapRequest` Entity has linked objects (sender, receiver, skills, conversation).
The frontend needs ONE flat JSON object:

```java
@Mapping(source = "sender.id",          target = "senderId")
@Mapping(source = "sender.firstName",   target = "senderName")
@Mapping(source = "receiver.id",        target = "receiverId")
@Mapping(source = "receiver.firstName", target = "receiverName")
@Mapping(source = "skillOffered.id",    target = "skillOfferedId")
@Mapping(source = "skillOffered.name",  target = "skillOfferedName")
@Mapping(source = "skillWanted.id",     target = "skillWantedId")
@Mapping(source = "skillWanted.name",   target = "skillWantedName")
@Mapping(source = "conversation.id",    target = "conversationId")
SwapRequestResponseDto toResponse(SwapRequest swapRequest);
```

- `source = "sender.firstName"` → JPA navigates `swapRequest.getSender().getFirstName()`.
- `target = "senderName"` → the value goes into the DTO field `senderName`.

> ⚠️ Note: if `firstName` can be null, the field will simply be null in the DTO.
> `@Mapping(source = "conversation.id", ...)` is applied on the saved swap request
> in `acceptSwapRequest`, after the conversation was set.

---

## 5.6 How MapStruct works technically (build time)

MapStruct is a **Java annotation processor**:

1. It is declared in `pom.xml` inside `maven-compiler-plugin`:
   `annotationProcessorPaths` (Lombok + `mapstruct-processor`).
2. During compilation, it reads the `@Mapper` interfaces.
3. It generates `XXXMapperImpl` classes next to the interfaces
   (`target/generated-sources/annotations/...`).
4. The application uses those generated implementations as Spring beans.

The order of the annotation processors matters: Lombok is processed **before**
MapStruct, so MapStruct can read the getters/setters that Lombok creates.

---

## 5.7 Manual DTO construction (current behavior — important)

Not everything goes through mappers in the current code:

| Place | Real behavior |
|---|---|
| `AuthService` | builds `AuthResponse` **manually with `new AuthResponse(...)`** (no mapper) |
| `DashboardService` | builds `DashboardResponseDto` / `AdminDashboardResponseDto` manually |
| `CustomUserDetailsService` | returns the `User` entity directly (no DTO) |
| `SwapRequestService.acceptSwapRequest` | uses `mapper.toResponse(...)` then manually sets the `conversationId` on the response |
| `SkillService.addSkillToUser` | builds `SkillDetails` manually (does not use `SkillDetailsMapper.toEntity`) |

This shows that the mappers are used mostly for **Entity → Response DTO**.

> ### 🎤 How can I explain this to the jury?
> "My services use the mappers mainly to convert entities into response DTOs, so the
> frontend receives one clean flat object. In my auth service I build the auth response
> directly, because it contains specific data like the JWT. I follow a pragmatic
> approach: I use MapStruct where it saves repetitive code."

---

## 5.8 Mapper in the whole flow

```text
MySQL row
   → Entity (Hibernate)
       → Mapper.toResponse(entity)      (Service layer)
           → ResponseDTO
               → JSON  → React
```

And for updates:

```text
React JSON
   → RequestDTO
       → Mapper.updateX(dto, existingEntity)   (@MappingTarget)
           → save(entity) in Repository
```

---

## 5.9 Part 5 — questions I should be able to answer

- What is MapStruct and what does `@Mapper(componentModel = "spring")` do?
- Where does MapStruct generate the implementation? (compile time)
- What is the difference between `toResponse`, `toEntity` and update methods with `@MappingTarget`?
- What does `@Mapping(source = "user.firstName", target = "userName")` do?
- Why is the mapper ONLY used for Entity → Response in most services?
- Which services use the update methods?
- Why does `AuthService` build `AuthResponse` manually?
- What is the role of `annotationProcessorPaths` in the Maven build?

---

*End of Part 5.*

---

# PART 6 — SERVICES

---

## 6.1 What is a Service?

A **Service** is the layer that contains the **business logic** of SkillSwap.
It sits between the **Controller** and the **Repository**.

```text
Controller  →  Service (rules + decisions)  →  Repository
```

In SkillSwap, services are **concrete classes** annotated with `@Service`
(there are no separate interfaces + implementations).

Real example (`AuthService`):

```java
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthResponse register(RegisterRequestDTO request) { ... }
    public AuthResponse login(LoginRequestDTO request) { ... }
}
```

---

## 6.2 Why does the Service layer exist?

The Controller must only handle HTTP. The **business rules** belong to the Service:

- "Is this email already used?"
- "Can I accept this swap request?"  (only the receiver, only if PENDING)
- "Can I review this session?" (only if the session is COMPLETED)
- "Can I delete this user?" (never an ADMIN)

If the Controller did all this, it would mix HTTP concerns with business concerns.
Splitting them makes the code **understandable, testable and reusable**.

> ### 🎤 How can I explain this to the jury?
> "The Controller receives the HTTP request, but all the business rules are in the
> Service. For example, before accepting a swap request, the Service verifies that
> the caller is the receiver and that the request is still pending."

---

## 6.3 `@Service` and dependency injection

- `@Service` → "this class is a Spring bean".
- `@RequiredArgsConstructor` (Lombok) → generates a constructor with all `final` fields.
- Spring reads that constructor and **injects** the dependencies automatically.

The Service declares exactly what it needs:

```java
private final SwapRequestRepo repo;
private final SwapRequestMapper mapper;
private final UserRepo userRepo;
private final SkillRepo skillRepo;
private final SkillDetailsRepo detailsRepo;
private final NotificationService notificationService;
private final ConversationService conversationService;
```

Note: a Service can even inject **other Services**
(`SwapRequestService` uses `NotificationService` + `ConversationService`).
Spring builds the whole object graph automatically.

---

## 6.4 `@Transactional`

Many service methods have `@Transactional`:

```java
@Transactional
public SwapRequestResponseDto acceptSwapRequest(Long swapId, Long userId) { ... }
```

Meaning: all the database operations inside this method run inside **one transaction**.
Either everything succeeds, or everything is rolled back together
**(all-or-nothing)**. If an exception occurs in the middle, the partial changes are undone.

> ⚠️ Technical note: SkillSwap imports `jakarta.transaction.Transactional`
> (the JTA one), not `org.springframework.transaction.annotation.Transactional`.
> Both do the same job; this is the import used in the current code.

---

## 6.5 The pattern inside the service methods

Almost every service method follows this pattern:

```text
Input (from Controller / other services)
   ↓
Load objects (UserRepo, SkillRepo… .findById or orElseThrow)
   ↓
Business rules / authorization checks  (throw RuntimeException / AccessDeniedException)
   ↓
Build or modify the entity (manually with new, or with a mapper)
   ↓
Save via repository (repo.save(...))
   ↓
Mapper → Response DTO
   ↓
Return to the Controller
```

`orElseThrow` is the key trick: if the object is not found, the service stops
immediately with an error.

```java
User receiver = userRepo.findById(...)
        .orElseThrow(() -> new RuntimeException("Receiver not found"));
```

---

## 6.6 The services one by one

---

### 6.6.1 `AuthService` — register + login

| Method | Flow |
|---|---|
| `register(request)` | 1. `existsByEmail` → if true, error "Email already exists". 2. Build `User`, set `password = passwordEncoder.encode(...)` (BCrypt), `role = USER`. 3. `userRepo.save`. 4. `jwtUtils.generateToken(user)`. 5. Return `AuthResponse` (token + user info). |
| `login(request)` | 1. `authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password))` → Spring verifies the credentials. 2. `userRepo.findByEmail(...)` → orElseThrow "User not found". 3. `jwtUtils.generateToken(user)`. 4. Return `AuthResponse`. |

Key point: **the password is never stored as plain text** — BCrypt encrypts it
before saving. And it is **never returned** in a response.

---

### 6.6.2 `CustomUserDetailsService` — the login bridge

```java
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
```

- Implements Spring Security's `UserDetailsService`.
- Returns our `User` entity (which implements `UserDetails`).
- Used by the `AuthenticationManager` during login AND by the `JwtFilter` to reload
  the user from a token. (Studied in depth in Part 8.)

---

### 6.6.3 `UserService` — user CRUD + profile

| Method | Rules and flow |
|---|---|
| `getUserById(userId)` | `findById` → toResponse |
| `getAllUsers(pageable)` | `findAll` paged → each user toResponse |
| `updateProfile(userId, email, dto)` | The `email` is the authenticated user's email. **Check:** the email's user id must equal `userId` → "you can only update your profile". Then `mapper.updateUser(dto, user)`, save, toResponse. |
| `deleteUser(userId)` | **Rules:** cannot delete an ADMIN. Collects all reviewee ids of the reviews written by the user. Deletes the user's reviews (written + received), notifications, swap requests (sent + received), skill details. **Recalculates the rating** of every affected reviewee. Finally deletes the user. All in one transaction. |

> ### 🎤 How can I explain `deleteUser` to the jury?
> "Deleting a user is complex because the user is related to many tables. In
> `UserService.deleteUser`, inside one transaction, I delete the user's reviews,
> notifications, swap requests and skill details, then I recompute the average rating
> of the people they reviewed so the ratings stay correct."

---

### 6.6.4 `SkillService` — catalog skills + user skills

**Catalog skill methods:**

| Method | Rules and flow |
|---|---|
| `createSkill` | `existsByName` → duplicate error. `mapper.toEntity`, save, toResponse. |
| `updateSkill(id, dto)` | findById → error if missing; `mapper.updateSkill(dto, skill)`, toResponse. |
| `findAll(page, size)` | paged list of skills. |
| `findSkillById` | findById → toResponse. |
| `deleteSkill(id)` | **Protection rules:** cannot delete a skill used by users (`existsBySkillId`) or used in swap requests (`existsBySkillOfferedId` / `existsBySkillWantedId`). |

**User-skill methods** (they all verify "you can only modify your own skills,
unless you are ADMIN"):

| Method | Rules and flow |
|---|---|
| `addSkillToUser(userId, dto, currentUser)` | Authorization: ADMIN or the owner (**else `AccessDeniedException` → 403**). Duplicate check (`existsByUserIdAndSkillIdAndType`). Builds `SkillDetails` manually (user, skill, type, level), saves. |
| `updateSkillDetails(userId, skillId, dto, currentUser)` | Same authorization. Finds the entry, changes type/level, saves, toResponse. |
| `removeSkillFromUser(userId, skillId, currentUser)` | Same authorization, deletes the entry. |
| `getUserSkills(userId, pageable, currentUser)` | Authorization. Paged list of one user's skills. |
| `getAllSkillDetails(pageable)` | ALL skill entries (probably admin usage). |
| `getUserProfileSkills(userId, pageable)` | One user's skills **without authorization** — used to display a public profile. |

> Interesting: `AccessDeniedException` is thrown from the Service and caught by the
> `GlobalExceptionHandler` to return HTTP **403 Forbidden** (Part 10).

---

### 6.6.5 `SwapRequestService` — the core of SkillSwap

| Method | Rules and flow |
|---|---|
| `createSwapRequest(senderId, dto)` | sender + receiver must exist. **Rule:** you can't send to yourself. Offered and wanted skills must exist. **Rule:** the receiver MUST have the wanted skill (`existsByUserIdAndSkillId`). Build `SwapRequest`, save (status = PENDING via `@PrePersist`), create a `NEW_SWAP_REQUEST` notification for the receiver. |
| `getSwapRequestById(swapId, userId)` | **Rule:** only sender or receiver can see it. |
| `getAllSwapRequests(pageable)` | all requests (used by admin). |
| `getReceivedRequests(userId, pageable)` | requests where I am the receiver. |
| `getSentRequests(userId, pageable)` | requests where I am the sender. |
| `acceptSwapRequest(swapId, userId)` | **Rules:** only the receiver; status must be PENDING. Set status = ACCEPTED, save. **Then create the conversation** (`conversationService.createCoersation`). Send `REQUEST_ACCEPTED` notification to the sender. Manually set `conversationId` on the response. |
| `rejectSwapRequest(swapId, userId)` | only the receiver; must be PENDING → REJECTED; `REQUEST_REJECTED` notification to sender. |
| `cancelSwapRequest(swapId, userId)` | only the **sender**; must be PENDING → CANCELLED. |
| `completeSwapRequest(swapId, userId)` | sender OR receiver; must be ACCEPTED → COMPLETED. |

> ### 🎤 How can I explain `acceptSwapRequest` to the jury?
> "When a receiver accepts a swap request, the service checks that the request is
> still pending and that the caller really is the receiver. Then it sets the status
> to ACCEPTED and creates the one-to-one conversation. This is exactly why each
> conversation is linked to one swap request."

---

### 6.6.6 `ConversationService`

| Method | Rules and flow |
|---|---|
| `createCoersation(swapId, userId)` | ⚠️ the real method name has a typo ("Coersation") — we keep the actual code. **Rules:** the swap must be ACCEPTED; the caller must be part of the swap; a conversation must not already exist. Then create + save the conversation. |
| `getConversationById(id, userId)` | rule: must be part of the swap. |
| `getMyConversations(userId, pageable)` | collects conversations where I am sender + where I am receiver, then **paginates manually** using `subList` and `new PageImpl<>(...)`. |
| `getConversationBetweenUsers(u1, u2, requestUser)` | rule: requestUser must be one of the two. Scans all conversations to find one between the two users in either direction. |

---

### 6.6.7 `MessageService`

| Method | Rules and flow |
|---|---|
| `createMessage(dto, conversationId, userId)` | conversation must exist; **rule:** userId must be part of the swap. Build `Message` (sender, content, conversation), save. Then find the "other participant" and create a `NEW_MESSAGE` notification for them. |
| `getMessageById(id, userId)` | rule: must be part of the conversation. |
| `getMessagesByConversation(conversationId, userId, pageable)` | rule: part of conversation; paged messages. |
| `deleteMessage(id, userId)` | **rule: only the sender can delete their own message.** |
| `markAsRead(id, userId)` | rule: part of conversation; `message.setRead(true)` + save. |

---

### 6.6.8 `SessionService`

| Method | Rules and flow |
|---|---|
| `createSession(dto, userId)` | conversation + part checks. Build `Session`, default `status = PROPOSED`, save. |
| `updateSession(sessionId, dto, userId)` | part check; `mapper.updateSession(dto, session)`, toResponse. |
| `getSessionById` / `getSessionsBySwap` | part checks, paged. |
| `acceptSession(sessionId, userId)` | **Rules:** status must be PROPOSED; **only the receiver** of the swap can accept → CONFIRMED. |
| `cancelSession(sessionId, userId)` | **Rule:** a COMPLETED session cannot be cancelled; both participants can cancel → CANCELLED. |
| `completeSession(sessionId, userId)` | **Rule:** only CONFIRMED sessions can be completed → COMPLETED. |
| `getMySessions(userId, pageable)` | sessions where I am sender OR receiver of the swap. |
| `getAllSessions(pageable)` | all sessions (admin). |

Session lifecycle:

```text
PROPOSED  → (receiver accepts) →  CONFIRMED → (participant completes) → COMPLETED
    │                                    │
    └─────────────── CANCELLED ◄─────────┘   (before completion)
```

---

### 6.6.9 `ReviewService`

`createReview(dto, reviewerId)` is the most important:

```text
DTO (rating, comment, revieweeId, sessionId) + authenticated reviewerId
   ↓
Session must be COMPLETED          ("A review can only be done if the session has been completed")
   ↓
Reviewer must be sender or receiver of that session's swap
   ↓
The reviewee must be the OTHER participant (you can't review yourself)
   ↓
Build Review + save
   ↓
Recompute the reviewee's average rating (calculateAverageRating + userRepo.save)
```

Other methods:

| Method | Purpose |
|---|---|
| `getReviewsByUser(userId, pageable)` | reviews received by a user (findByRevieweeId). |
| `getReviewById` | one review. |
| `calculateAverageRating(userId)` | sum of ratings / number of reviews; 0 if none. Used by `ReviewService` and by `UserService.deleteUser`. |

> ### 🎤 How can I explain `createReview` to the jury?
> "A review is only allowed after a session is completed, and you can only review the
> other participant. After saving the review I recompute the average rating of the
> reviewee and I update it on the user. That's why each user has a `rating` field."

---

### 6.6.10 `NotificationService`

| Method | Purpose |
|---|---|
| `createNotification(userId, message, type)` | creates and saves a notification for a user; called **by other services** on events. |
| `getNotificationById(id, userId)` | owner check. |
| `getAllNotifications(pageable)` | all (admin). |
| `getNotificationsByUser(userId, pageable)` | my notifications. |
| `markAsRead(id, userId)` | owner check; setRead(true). |
| `getUnreadCount(userId)` | unread badge: `countByUserIdAndIsReadFalse`. |

Notifications are **created inside the business flow**: new swap request,
request accepted, request rejected, new message (the `NotificationType` values).
They are stored in the database and fetched later by the frontend.

---

### 6.6.11 `DashboardService`

Builds the summary numbers for the dashboards **manually** (no mapper).

| Method | What it computes |
|---|---|
| `getUserDashboard(userId)` | `pendingRequests` (received, PENDING), `upcomingSessions` (sessions with `date > now` in any of my swaps), `unreadMessages` (messages not read and not sent by me), `notifications` (unread notifications). |
| `getAdminDashboard()` | `totalUsers`, `totalSkills`, `totalSwapRequests`, `activeSessions` (status CONFIRMED), `completedSessions` (status COMPLETED). |

---

## 6.7 Where is the authorization done?

Interesting and important point:

- SkillSwap does NOT protect every endpoint with `@PreAuthorize` at the controller.
- Instead, the **Service layer does its own checks** using the authenticated user:
  - a `User currentUser` parameter passed from the Controller (via `@AuthenticationPrincipal`),
  - or a `userId` taken from the path/request and compared.
- Checks like "you can only update your profile", "you are not part of this swap",
  "you are not allowed to accept this request" are **business rules inside the services**.
- When a rule fails, the service throws:
  - `new RuntimeException("...")` → GlobalExceptionHandler returns **400 Bad Request**,
  - `new AccessDeniedException("...")` → **403 Forbidden**.

Rule of thumb for the jury: in SkillSwap, **authorization is enforced at the
service level**, not only in Spring Security.

---

## 6.8 Summary of service responsibilities

| Service | Main responsibility |
|---|---|
| `AuthService` | register + login + JWT |
| `CustomUserDetailsService` | load user for Spring Security |
| `UserService` | user profiles, update, delete, ratings recalculation |
| `SkillService` | skill catalog + user skills management |
| `SwapRequestService` | swap request lifecycle (PENDING → ACCEPTED/REJECTED/CANCELLED/COMPLETED) |
| `ConversationService` | one conversation per accepted swap request |
| `MessageService` | messages + read/unread + notifications |
| `SessionService` | session lifecycle (PROPOSED → CONFIRMED → COMPLETED/CANCELLED) |
| `ReviewService` | reviews + average rating |
| `NotificationService` | create/read notifications |
| `DashboardService` | dashboard numbers |

---

## 6.9 Part 6 — questions I should be able to answer

- What is the Service and why is it between Controller and Repository?
- What does `@Transactional` guarantee?
- Give the general flow used by most service methods.
- Which rules are checked in `createSwapRequest`?
- What exactly happens in `acceptSwapRequest`? Who can do it and since when?
- When is a conversation created?
- Who can accept a session? Who can complete it?
- When is a review allowed? What happens to the rating afterwards?
- Where does SkillSwap do its authorization checks?
- Why does `deleteUser` need one transaction?
- Which services call `NotificationService.createNotification`?

---

*End of Part 6.*

---

# PART 7 — CONTROLLERS

---

## 7.1 What is a Controller?

A **Controller** is the HTTP entry point of the backend. It receives HTTP requests
from React, extracts the data (path, parameters, JSON body), calls the **Service**,
and returns the response (as a DTO that Spring converts to JSON).

Controllers are "thin": all the real work and rules are in the services (Part 6).

There are **11 controllers** in `com.example.skillswap.controller`.

---

## 7.2 The annotations used

| Annotation | What it does |
|---|---|
| `@RestController` | This class is a web controller; returned objects → JSON automatically |
| `@RequestMapping("/api/users")` | Base URL of all endpoints of this controller |
| `@GetMapping` / `@PostMapping` / `@PutMapping` / `@DeleteMapping` | HTTP method + (extra) path |
| `@PathVariable Long userId` | Reads a value from the URL: `.../{userId}` |
| `@RequestParam Long userId` | Reads a query parameter: `?...userId=5` |
| `@RequestBody DTO dto` | Converts the JSON body into a DTO |
| `@AuthenticationPrincipal User principal` | Gives the **currently authenticated user** (from the JWT/security context) |
| `@PreAuthorize("hasRole('ADMIN')")` | Spring Security authorization: only ADMIN can call this endpoint |
| `@PageableDefault(page = 0, size = 10) Pageable pageable` | Auto-builds pagination from `?page=&size=` |
| `@Operation(summary = "...")` | Swagger documentation for the endpoint |
| `ResponseEntity` | Returns a response with an explicit HTTP status |

### How `@AuthenticationPrincipal` works

When the JWT filter authenticates a request, Spring Security stores the `User`
object in the SecurityContext (Part 8). The controller can then inject it directly:

```java
public SwapRequestResponseDto acceptSwapRequest(@PathVariable Long swapId,
                                                @PathVariable Long userId,
                                                @AuthenticationPrincipal User principal) {
```

`principal` IS the logged-in user. The controller then compares
`principal.getId().equals(userId)` to verify the user is acting on their own account.

### `@PreAuthorize` — authorization at the endpoint level

```java
@PreAuthorize("hasRole('ADMIN')")
```

- `hasRole('ADMIN')` → only users whose authority is `ROLE_ADMIN`.
- Remember `User.getAuthorities()` returns `ROLE_USER` / `ROLE_ADMIN` (Part 2).
- This works because `SecurityConfig` has `@EnableMethodSecurity`.
- In SkillSwap the level of control = `@PreAuthorize` (who can reach the endpoint)
  + service checks (ownership/participation rules).

---

## 7.3 `AuthController` — `/api/auth`

Public endpoints (no token needed — allowed by `SecurityConfig`).

| Method | URL | Body | Security | Service call | Response |
|---|---|---|---|---|---|
| POST | `/api/auth/register` | `RegisterRequestDTO` | public | `authService.register(request)` | `AuthResponse` (token) |
| POST | `/api/auth/login` | `LoginRequestDTO` | public | `authService.login(request)` | `AuthResponse` (token) |

> ⚠️ No `@Valid` here (already noted in Part 3).

Flow: JSON → DTO → `AuthService` → `AuthResponse` JSON.

---

## 7.4 `UserController` — `/api/users`

| Method | URL | Security | Service call | Response/Status |
|---|---|---|---|---|
| GET | `/api/users/{userId}` | USER or ADMIN | `getUserById` | `UserResponseDTO` (200) |
| GET | `/api/users` | **ADMIN** | `getAllUsers(pageable)` | `Page<UserResponseDTO>` (200) |
| PUT | `/api/users/{userId}` | USER or ADMIN | `updateProfile(userId, authentication.getName(), dto)` | `UserResponseDTO` (200) |
| DELETE | `/api/users/{userId}` | **ADMIN** | `deleteUser(userId)` | `204 No Content` |

Note: for `updateProfile`, the email comes from `authentication.getName()`
(the email is the username, part 2) and the service checks that this email's user
is really the logged-in user.

---

## 7.5 `SkillController` — `/api/skills`

| Method | URL | Security | Purpose |
|---|---|---|---|
| POST | `/api/skills` | ADMIN | create catalog skill |
| PUT | `/api/skills/{id}` | ADMIN | update catalog skill |
| GET | `/api/skills?page&size` | USER or ADMIN | list skills (paged) |
| GET | `/api/skills/{id}` | USER or ADMIN | skill by id |
| DELETE | `/api/skills/{id}` | ADMIN | delete skill (protected) |
| POST | `/api/skills/users/{userId}/skill` | USER or ADMIN | add skill to user (201 Created) |
| PUT | `/api/skills/users/{userId}/skills/{skillId}` | USER or ADMIN | update user skill |
| DELETE | `/api/skills/users/{userId}/skills/{skillId}` | USER or ADMIN | remove user skill |
| GET | `/api/skills/users/{userId}/skills` | USER or ADMIN | user's skills |
| GET | `/api/skills/discover` | USER (only) | **Discover** page: all skill details |
| GET | `/api/skills/users/{userId}/profile-skills` | USER or ADMIN | public profile skills |
| GET | `/api/skills/admin/details` | ADMIN | all skill details |

### The Discover flow (important for the jury)

```text
React (Discover page)
   ↓  GET /api/skills/discover?page=0&size=12
   ↓  with Bearer JWT
SkillController.discoverSkills()
   ↓
SkillService.getAllSkillDetails(pageable)
   ↓
SkillDetailsRepo.findAll(pageable)
   ↓
MySQL (skill_details + user + skill)
   ↓
Wrapped in SkillDetailsResponseDto (flattened) → JSON → React
```

---

## 7.6 `SwapRequestController` — `/api/swaprequests`

All endpoints are USER-only (`hasRole('USER')`). They all check
`principal.getId().equals(userId)` and throw `AccessDeniedException` otherwise
(→ 403). The business rules themselves are in the Service (Part 6).

| Method | URL | Purpose |
|---|---|---|
| POST | `/api/swaprequests/{senderId}` | create a swap request |
| GET | `/api/swaprequests/{swapId}` | get one request |
| GET | `/api/swaprequests?page&size` | **ADMIN**: all requests |
| GET | `/api/swaprequests/received/{userId}` | my received requests |
| GET | `/api/swaprequests/sent/{userId}` | my sent requests |
| PUT | `/api/swaprequests/{swapId}/accept/{userId}` | accept → creates conversation |
| PUT | `/api/swaprequests/{swapId}/reject/{userId}` | reject |
| PUT | `/api/swaprequests/{swapId}/cancel/{userId}` | cancel (sender) |
| PUT | `/api/swaprequests/{swapId}/complete/{userId}` | complete |

Example — accepting:

```java
if (!principal.getId().equals(userId)) {
    throw new AccessDeniedException("You can only accept requests on your own behalf");
}
return service.acceptSwapRequest(swapId, userId);
```

---

## 7.7 `ConversationController` — `/api/conversations`

| Method | URL | Purpose |
|---|---|---|
| POST | `/api/conversations/{swapId}/user/{userId}` | create conversation (calls `createCoersation` — real typo) |
| GET | `/api/conversations/{id}/user/{userId}` | get one conversation |
| GET | `/api/conversations/my/{userId}` | my conversations (paged) |
| GET | `/api/conversations/user1/{userId1}/user2/{userId2}/user/{requestuser}` | find conversation between two users |

---

## 7.8 `MessageController` — `/api/messages`

| Method | URL | Purpose |
|---|---|---|
| POST | `/api/messages/{conversationid}/user/{userId}` | send a message (HTTP) |
| GET | `/api/messages/{id}?userId=` | one message |
| GET | `/api/messages/conversation/{conversationId}?userId=` | messages of a conversation (paged) |
| DELETE | `/api/messages/{id}?userId=` | delete my message |
| PUT | `/api/messages/{id}/read?userId=` | mark as read |

All require the user to be acting on their own account (`principal.getId().equals(userId)`).

---

## 7.9 `SessionController` — `/api/sessions`

| Method | URL | Purpose |
|---|---|---|
| POST | `/api/sessions?userId=` | create a session (status = PROPOSED) |
| PUT | `/api/sessions/{sessionId}?userId=` | update a session |
| GET | `/api/sessions/{sessionId}` | one session |
| GET | `/api/sessions/swap/{swapId}` | sessions of a swap |
| PUT | `/api/sessions/{sessionId}/accept/user/{userId}` | accept (only receiver) |
| PUT | `/api/sessions/{sessionId}/cancel/user/{userId}` | cancel |
| PUT | `/api/sessions/{sessionId}/complete/{userId}` | complete |
| GET | `/api/sessions/my?userId=` | my sessions |
| GET | `/api/sessions` | **ADMIN**: all sessions |

---

## 7.10 `ReviewController` — `/api/reviews`

| Method | URL | Purpose |
|---|---|---|
| POST | `/api/reviews/{userId}` | write a review (only after COMPLETED session) |
| GET | `/api/reviews/user/{userId}` | reviews received by a user (paged) |
| GET | `/api/reviews/{reviewId}` | one review |
| GET | `/api/reviews/user/{userId}/average` | average rating of a user |

---

## 7.11 `NotificationController` — `/api/notifications`

| Method | URL | Purpose |
|---|---|---|
| POST | `/api/notifications?userId=&message=&type=` | create a notification (uses query params) |
| GET | `/api/notifications/{id}?userId=` | one notification (owner check) |
| GET | `/api/notifications` | **ADMIN**: all |
| GET | `/api/notifications/user/{userId}` | my notifications (paged) |
| PUT | `/api/notifications/{notificationId}/read?userId=` | mark as read |
| GET | `/api/notifications/user/{userId}/unread-count` | unread badge count |

---

## 7.12 `DashboardController` — `/api/dashboard`

| Method | URL | Security | Purpose |
|---|---|---|---|
| GET | `/api/dashboard/user/{userId}` | USER (own dashboard only) | `DashboardResponseDto` |
| GET | `/api/dashboard/admin` | ADMIN | `AdminDashboardResponseDto` |

---

## 7.13 `ChatWebSocketController` — the real-time chat

This controller is **not REST**: it handles **STOMP messages** over WebSocket.

```java
@Controller
public class ChatWebSocketController {

    @MessageMapping("/chat/{conversationId}/{userId}")
    @SendTo("/topic/conversation/{conversationId}")
    public MessageResponseDto sendMessage(MessageRequestDto dto,
                                          @DestinationVariable Long conversationId,
                                          @DestinationVariable Long userId) {
        return messageService.createMessage(dto, conversationId, userId);
    }
}
```

- `@MessageMapping("/chat/{conversationId}/{userId}")` → messages sent to
  `/app/chat/{conversationId}/{userId}` (the `/app` prefix comes from the WebSocket config).
- `@SendTo("/topic/conversation/{conversationId}")` → the result is broadcast to all
  subscribers of that topic, so the second user receives the message live.
- It reuses the **same** `MessageService.createMessage` as the HTTP endpoint:
  the message is saved in MySQL and a `NEW_MESSAGE` notification is created.
  (Details in Part 9.)
- `@Controller` (not `@RestController`) because it does not produce a REST response —
  it uses STOMP frames.

The WebSocket endpoints `/ws` are `permitAll` in the SecurityConfig,
because the SockJS/STOMP handshake cannot send an HTTP Authorization header easily.

---

## 7.14 Common patterns in the controllers

1. **"Act on your own account" pattern**: every protected action receives a
   `userId` (path or query) AND `@AuthenticationPrincipal User principal`, then:

```java
if (!principal.getId().equals(userId)) {
    throw new AccessDeniedException("...");
}
```

This double-checks that a user cannot do actions as another user (→ 403).

2. **Role control**: `@PreAuthorize("hasRole('USER')")` vs `hasRole('ADMIN')`
   limits WHO can call the endpoint.

3. **Status codes**: most endpoints return the DTO directly → HTTP 200.
   `addSkillToUser` → 201 Created; `deleteUser` → 204 No Content.
   Errors → handled by `GlobalExceptionHandler` (Part 10).

4. **Pagination** via `@PageableDefault(page = 0, size = 10)`.

---

## 7.15 All REST base URLs (summary)

| Base URL | Controller |
|---|---|
| `/api/auth` | AuthController |
| `/api/users` | UserController |
| `/api/skills` | SkillController |
| `/api/swaprequests` | SwapRequestController |
| `/api/conversations` | ConversationController |
| `/api/messages` | MessageController |
| `/api/sessions` | SessionController |
| `/api/reviews` | ReviewController |
| `/api/notifications` | NotificationController |
| `/api/dashboard` | DashboardController |
| (WebSocket) `/ws` + `/app/...` ↔ `/topic/...` | ChatWebSocketController |

---

## 7.16 Complete request flow (protected endpoint example)

Let's follow `GET /api/skills/discover`:

```text
1. React sends: GET http://localhost:8080/api/skills/discover
                    Authorization: Bearer <JWT>

2. JwtFilter validates the token and puts the User in the SecurityContext.

3. Spring Security checks @PreAuthorize("hasRole('USER')") → OK.

4. SkillController.discoverSkills(...) is called.

5. Controller calls service.getAllSkillDetails(pageable).

6. Service → SkillDetailsRepo.findAll(pageable) → MySQL.

7. Each SkillDetails is mapped to SkillDetailsResponseDto.

8. Spring serializes the Page<DTO> to JSON → HTTP 200 → React.
```

---

## 7.17 Part 7 — questions I should be able to answer

- What is the Controller responsible for? Why is it "thin"?
- What do `@PathVariable`, `@RequestParam`, `@RequestBody` mean? Give examples.
- What does `@AuthenticationPrincipal User principal` give us?
- What does `@PreAuthorize` do and which roles exist?
- List the DISCOVER flow from React to MySQL.
- What happens when a user calls accept with a userId that is not their own?
- Which endpoints are ADMIN-only?
- How does the WebSocket controller receive and re-send a chat message?
- What is the difference between `@RestController` and `@Controller` in this chat context?
- Which status codes does SkillSwap return and when?

---

*End of Part 7.*

---

# PART 8 — SECURITY AND JWT

This is one of the most important parts for the jury.

---

## 8.1 The big picture

SkillSwap is a **stateless** API secured with **JWT**:

```text
Login     →  the server gives back a JWT token
Every request  →  the client sends  Authorization: Bearer <JWT>
```

The server does NOT keep a session in memory (no "remember me" cookie server-side).
The security information travels **inside the token itself**.
That is why `SecurityConfig` sets:

```java
sessionManagement(session ->
    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
);
```

The 4 pillars of SkillSwap security:

| Pillar | File |
|---|---|
| Security rules | `config/SecurityConfig.java` |
| Token creation + validation | `config/JwtUtils.java` |
| Token checking on every request | `filter/JwtFilter.java` |
| Loading the user for Spring Security | `service/CustomUserDetailsService.java` + `entity/User.java` (implements `UserDetails`) |

---

## 8.2 The login flow (register too)

When the user logs in with email + password:

```text
React
  ↓  POST /api/auth/login   (email, password)
AuthController
  ↓
AuthService.login(request)
  ↓
authenticationManager.authenticate(  username=email, password )
  │
  ├─► CustomUserDetailsService.loadUserByUsername(email)
  │       → UserRepo.findByEmail(email)  → the User (UserDetails)
  │       → then the AuthenticationProvider checks the password
  │       → PasswordEncoder (BCrypt) verifies the password hash
  │
  ↓ if password is correct:
userRepo.findByEmail(email)  →  the User
  ↓
jwtUtils.generateToken(user)   →  creates the JWT
  ↓
AuthResponse{ token, id, firstName, ..., role }   → JSON
  ↓
React keeps the token (AuthContext) and sends it on every request
```

`AuthenticationManager` is configured in `SecurityConfig` via the beans
`authenticationProvider()` and `authenticationManager()`.

---

## 8.3 `SecurityConfig.java` — the security rules

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/ws/**").permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

Explanation of each piece:

| Bean / line | What it does in SkillSwap |
|---|---|
| `@Configuration` | "this class provides beans (configuration)". |
| `@EnableWebSecurity` | turns on Spring Security's web filter chain. |
| `@EnableMethodSecurity` | enables `@PreAuthorize("hasRole(...)")` on controllers (Part 7). |
| `passwordEncoder()` | `BCryptPasswordEncoder` = the class that hashes/verifies passwords. |
| `authenticationProvider()` | `DaoAuthenticationProvider`: uses OUR `CustomUserDetailsService` + the password encoder during login. |
| `authenticationManager()` | the entry point that performs the authentication. |
| `corsConfigurationSource()` | allows the React app (`http://localhost:5173`) to call the API from the browser (Cross-Origin). |
| `csrf(csrf -> csrf.disable())` | no CSRF needed because the API uses tokens, not cookies. |
| `sessionManagement(...STATELESS)` | no server-side session — the JWT is the state. |
| `permitAll()` paths | swagger, `/api/auth/**` (register/login), actuator, `/ws/**` are open. |
| `.anyRequest().authenticated()` | everything else requires a valid authenticated user. |
| `addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)` | inserts OUR `JwtFilter` BEFORE the default filter that would look for a session. |

### What is BCrypt?

BCrypt is a **one-way hash function** designed for passwords:
- It produces a random-looking hash, e.g. `$2a$10$OMXiSN...`.
- It adds a **salt** (random data) so the same password gives different hashes.
- It is deliberately **slow**, which makes brute-force attacks expensive.
- We only ever STORE the hash; we NEVER store or return the plain password.
- Verification: BCrypt re-hashes the typed password and compares with the stored hash.

---

## 8.4 `JwtUtils.java` — create and validate the token

```java
@Component
@Slf4j
public class JwtUtils {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    private Key key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(UserDetails userDetails) {
        User user = (User) userDetails;
        return Jwts.builder()
                .setSubject(user.getUsername())          // subject = email
                .claim("role", user.getRole().name())    // custom claim: role
                .claim("id", user.getId())               // custom claim: id
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("email", user.getEmail())
                .claim("city", user.getCity())
                .claim("photo", user.getPhoto())
                .claim("bio", user.getBio())
                .claim("rating", user.getRating())
                .claim("createdAt", user.getCreatedAt().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    public String getUserFromToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret)
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.error("JWT validation error: {}", e.getMessage());
            return false;
        }
    }
}
```

Notes:

- The secret and expiration time come from configuration
  (`app.jwt.secret` / `app.jwt.expiration` in `application.properties`, filled from
  environment variables `JWT_SECRET` / `JWT_EXPIRATION`).
- `generateToken` puts the user's **email as SUBJECT** and user data as **claims**.
  The frontend can even decode these claims to know the user without another request.
- `.signWith(SignatureAlgorithm.HS256, jwtSecret)` → HS256 = symmetric signature with
  the secret key: the server signs the token and can verify it later.
- `setExpiration(...)` → the token dies after `jwtExpiration` milliseconds.
- `validateJwtToken` returns true only if the signature is valid and not expired.

### What is a JWT really?

A JWT is a string with 3 parts separated by dots:

```text
header.payload.signature
```

```text
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGIuY29tIiwicm9sZSI6IlVTRVIifQ.abcdef...
   │         │                    │                              │
   header    encoded claims       signature (proves authenticity)
   (HS256)   ("body")             (HMAC with the secret)
```

- The **header** says which algorithm was used.
- The **payload** contains the claims (email, role, id…).
- The **signature** guarantees nobody modified the token (only the server knows the secret).

> ### 🎤 How can I explain JWT to the jury?
> "A JWT is a signed token. When a user logs in, the server creates a token that
> contains the email and the role, and signs it with a secret. On every request the
> client sends it in the Authorization header. Because the token is signed, the server
> can trust it. It also expires, so a stolen token is not valid forever."

---

## 8.5 `JwtFilter.java` — checking every request

```java
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.validateJwtToken(token)) {
                String username = jwtUtil.getUserFromToken(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(request, response);
    }
}
```

Step by step:

1. `OncePerRequestFilter` → this filter runs **once per request**.
2. It reads the header `Authorization`.
3. If it starts with `"Bearer "`, it takes the token (substring after the 7 letters).
4. `validateJwtToken(token)` → checks the signature + expiration.
5. `getUserFromToken(token)` → reads the email (the subject).
6. `userDetailsService.loadUserByUsername(email)` → reloads the real `User` from MySQL.
7. It builds a `UsernamePasswordAuthenticationToken` with the user + authorities.
8. **`SecurityContextHolder.getContext().setAuthentication(auth)`** → NOW Spring
   Security knows who is making this request. `@AuthenticationPrincipal` will work.
9. `filterChain.doFilter(...)` → continue the request towards the controller.

### Why does the filter reload the user from the database?

To always use the **fresh** user data (current role, current password hash)
instead of trusting only the claims in the token.

### What are 401 and 403?

- **401 Unauthorized** → no valid token / not authenticated ("who are you?").
  Default Spring Security answer when a protected endpoint is called by an
  anonymous or invalid user.
- **403 Forbidden** → authenticated but NOT allowed (wrong role, or an
  `AccessDeniedException` was thrown). In SkillSwap the `GlobalExceptionHandler`
  returns 403 for `AccessDeniedException` (Part 10).

---

## 8.6 `User` as the `UserDetails` (already seen in Part 2)

```java
public class User implements UserDetails {
    ...
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name().toUpperCase()));
    }

    @Override
    public String getUsername() {
        return email;   // login identifier = email
    }
}
```

- `getAuthorities()` → for `role = USER` it produces `ROLE_USER`; for ADMIN → `ROLE_ADMIN`.
  This is exactly what `@PreAuthorize("hasRole('USER')")` looks for.
- `getUsername()` returns the email → the `authentication`'s `getName()` is the email,
  which is why `UserController.updateProfile` uses `authentication.getName()`.

---

## 8.7 Protected request flow — complete

```text
React
  ↓ headers: { Authorization: "Bearer <JWT>" }
JwtFilter
  ↓ validate token → load User → set Authentication in SecurityContextHolder
Spring Security
  ↓ @PreAuthorize("hasRole(...)")  →  authorized?  (401 / 403 if not)
Controller
  ↓ @AuthenticationPrincipal User principal  (from the SecurityContext)
Service  (rules + ownership checks)
Repository → MySQL
  ↓
Response JSON → React
```

---

## 8.8 What happens with the token inside the frontend? (preview)

The frontend keeps the token (e.g. in **localStorage** via `AuthContext`), sends it
with Axios in an interceptor, and decodes it with `jwt-decode` to know the current user.
This will be studied in detail in the Frontend part.

---

## 8.9 Security summary table

| Concept | Where in SkillSwap |
|---|---|
| Stateless API | `SecurityConfig` → `STATELESS` |
| Password hash | `PasswordEncoder` bean = `BCryptPasswordEncoder`, used in `AuthService.register` |
| User loading | `CustomUserDetailsService` → `UserRepo.findByEmail` |
| Authentication | `AuthenticationManager` + `DaoAuthenticationProvider` |
| Token creation | `JwtUtils.generateToken` (subject = email, claims = user) |
| Token validation | `JwtUtils.validateJwtToken` |
| Filter | `JwtFilter` (before `UsernamePasswordAuthenticationFilter`) |
| SecurityContext | `SecurityContextHolder.setAuthentication(...)` |
| Roles | `Role` enum (USER / ADMIN) → `ROLE_USER` / `ROLE_ADMIN` |
| Endpoint roles | `@PreAuthorize("hasRole(...)")` |
| Current user | `@AuthenticationPrincipal User principal` |
| Errors | 401 (no/invalid auth), 403 (AccessDeniedException) |

---

## 8.10 Part 8 — questions I should be able to answer

- Why is SkillSwap "stateless" and what does the token replace?
- Describe the login flow from React to the JWT creation.
- What does `DaoAuthenticationProvider` do and which components feed it?
- What is BCrypt and why do we only store the hash?
- What is inside a JWT (header / payload / signature)?
- What claims does `generateToken` put in the JWT and why?
- How does `JwtFilter` authenticate a request step by step?
- Why does the filter re-load the user from the database?
- Where does `@PreAuthorize` find the roles?
- Explain the difference between 401 and 403.

---

*End of Part 8.*

---

# PART 9 — BUSINESS WORKFLOWS

This part walks through the **complete real workflows** of SkillSwap, from the React
service file to MySQL and back. All URLs, functions and rules are taken from the
actual code.

> Before the workflows: every frontend call goes through `src/services/api.js`,
> an **Axios instance**:
> - `baseURL` comes from `VITE_API_URL` (environment variable).
> - a **request interceptor** automatically adds
>   `Authorization: Bearer <token>` from localStorage,
> - a **response interceptor** handles statuses: 401 → back to login,
>   403 → `/access-denied`, 404 → `/not-found`, 500 → log.
>
> So the React services only write `api.get/post/put/delete(...)`; the JWT header is automatic.

---

## 9.1 Registration

```text
React: authService.register(data)  →  POST /api/auth/register
Backend: AuthController.register → AuthService.register
```

| Step | Real code |
|---|---|
| Frontend form | sends `{ firstName, lastName, email, password, city, bio, photo }` |
| HTTP | `POST /auth/register` (public, no token) |
| `AuthService.register` | checks `userRepo.existsByEmail(email)` → "Email already exists" if taken |
| User creation | new `User`, `password = passwordEncoder.encode(...)` (BCrypt), `role = USER` |
| Save | `userRepo.save(user)` (+ `@PrePersist` sets `createdAt`) |
| Token | `jwtUtils.generateToken(user)` |
| Response | `AuthResponse` (token + profile) → 200 |

The user is now **logged in automatically** (we get a token immediately after register).

---

## 9.2 Login

```text
React: authService.login(data)  →  POST /api/auth/login
Backend: AuthController.login → AuthService.login
```

| Step | Real code |
|---|---|
| Frontend | sent `{ email, password }` |
| HTTP | `POST /auth/login` (public) |
| `AuthService.login` | `authenticationManager.authenticate(email, password)` → `CustomUserDetailsService.loadUserByUsername` → BCrypt verifies the password |
| If wrong credentials | Spring Security rejects → authentication error (401) |
| If correct | `userRepo.findByEmail(email)` → `jwtUtils.generateToken(user)` |
| Response | `AuthResponse` (token + role + profile) → 200 → React stores the token in localStorage |
| Next requests | the Axios interceptor adds `Authorization: Bearer <token>` automatically |

---

## 9.3 User profile

```text
React: userService.getUserById(userId)       → GET /api/users/{userId}
       userService.updateProfile(userId, data) → PUT /api/users/{userId}
Admin: userService.getAllUsers(page,size)      → GET /api/users  (ADMIN only)
       userService.deleteUser(userId)          → DELETE /api/users/{userId}  (ADMIN only)
```

- `updateProfile` sends `UpdateProfileRequestDTO` (`@Valid`!). The service refuses if
  the authenticated email does not match the userId: "you can only update your profile".
- `deleteUser` deletes reviews, notifications, swap requests, skill details and
  recomputes the affected users' ratings (one transaction, ADMIN only, ADMIN users protected).

---

## 9.4 Skills — the catalog and the user's skills

### Catalog (admin manages it)

```text
React: skillService.createSkill(data)  → POST /api/skills       (ADMIN)
       skillService.updateSkill(...)   → PUT /api/skills/{id}    (ADMIN)
       skillService.deleteSkill(...)   → DELETE /api/skills/{id} (ADMIN)
       skillService.getAllSkills(...)  → GET /api/skills        (USER or ADMIN)
```

`deleteSkill` is **protected**: it fails if the skill is used by users
(`existsBySkillId`) or by any swap request (`existsBySkillOfferedId`/`WantedId`).

### User skills (My Skills page)

```text
skillService.getUserSkills(userId,page,size)   → GET  /api/skills/users/{userId}/skills
skillService.addSkillToUser(userId, data)       → POST /api/skills/users/{userId}/skill  (201)
skillService.updateUserSkill(...)               → PUT  /api/skills/users/{userId}/skills/{skillId}
skillService.removeSkillFromUser(...)           → DELETE /api/skills/users/{userId}/skills/{skillId}
```

Data sent for add/update: `{ skillId, type (OFFER|WANTED), level }`.

Rules:
- only the owner or an ADMIN can modify (`AccessDeniedException` otherwise),
- duplicate check: `existsByUserIdAndSkillIdAndType` → "This skill is already added",
- the catalog skill and the user must exist.

---

## 9.5 Discover

```text
React: skillService.getDiscoverSkills(page,size)  → GET /api/skills/discover?page=0&size=12
Backend: SkillController.discoverSkills (USER only)
            → SkillService.getAllSkillDetails(pageable)
            → SkillDetailsRepo.findAll(pageable)
            → each mapped to SkillDetailsResponseDto
```

This is how a user finds potential partners: the Discover page shows all
`SkillDetails` (user + skill + type + level) with the **user name** and **skill name**
already flattened in the DTO.

---

## 9.6 Swap Request — full lifecycle

### Creation

```text
React: swapRequestService.createSwapRequest(senderId, data)
       → POST /api/swaprequests/{senderId}
```

Body: `{ receiverId, skillOfferedId, skillWantedId, message }`

Rules checked in `SwapRequestService.createSwapRequest`:
1. sender and receiver exist,
2. **you cannot send to yourself**,
3. offered and wanted skills exist,
4. **the receiver must have the wanted skill** (`detailsRepo.existsByUserIdAndSkillId`).

Then: save (`swapStatus = PENDING` via `@PrePersist`), and a **notification**
`NEW_SWAP_REQUEST` is created for the receiver → response 200.

### Lists for the user

```text
swapRequestService.getReceivedRequests(userId)  → GET /api/swaprequests/received/{userId}
swapRequestService.getSentRequests(userId)      → GET /api/swaprequests/sent/{userId}
swapRequestService.getAllSwapRequest(page,size) → GET /api/swaprequests  (ADMIN)
```

### Accept (→ this creates the conversation!)

```text
React: swapRequestService.acceptSwapRequest(swapId, userId)
       → PUT /api/swaprequests/{swapId}/accept/{userId}
```

```text
SwapRequestService.acceptSwapRequest
   ├─ only the RECEIVER (else RuntimeException)
   ├─ status must be PENDING (else "swap is not pending")
   ├─ status = ACCEPTED → save
   ├─ ConversationService.createCoersation(swapId, userId)   ← creates the chat!
   │     (swap accepted ✓, user is part ✓, no existing conversation ✓)
   ├─ notification REQUEST_ACCEPTED → sender
   └─ response with conversationId set manually
```

**So the rule is confirmed:** a conversation is created **when a swap request is accepted**,
and only ONE conversation per swap request (unique constraint).

### Reject / Cancel / Complete

| Action | Who can | Condition | New status | Notification |
|---|---|---|---|---|
| `reject` | receiver | PENDING | REJECTED | REQUEST_REJECTED → sender |
| `cancel` | **sender** | PENDING | CANCELLED | – |
| `complete` | sender or receiver | ACCEPTED | COMPLETED | – |

The complete swap lifecycle:

```text
PENDING ──receiver─accept──▶ ACCEPTED ──participant─complete──▶ COMPLETED
   │  ▲                         ▲
   │  └── sender cancel ────────┘
   ▼
   └── receiver reject ─▶ REJECTED
```

---

## 9.7 Conversation

- Created automatically when a swap request is **accepted** (see 9.6).
- It links the swap request (one-to-one) and therefore the two users.

```text
React: conversationService.getMyConversations(userId) → GET /api/conversations/my/{userId}
       conversationService.getConversationById(id, userId)
                                                     → GET /api/conversations/{id}/user/{userId}
```

---

## 9.8 Chat — two ways to send a message

### 1. HTTP way (stored + readable)

```text
React: messageService...  →  MessageController
GET /api/messages/conversation/{conversationId}?userId= &page=0 &size=50  → get history
PUT /api/messages/{id}/read?userId=                                        → mark as read
```

### 2. WebSocket / STOMP way (live)

```text
ChatWebSocketController
   @MessageMapping("/chat/{conversationId}/{userId}")   →  receives at  /app/chat/...
   @SendTo("/topic/conversation/{conversationId}")      →  broadcasts to subscribers
   reuses MessageService.createMessage(...)
```

`MessageService.createMessage`:
1. conversation must exist,
2. the sender must be part of the swap,
3. saves the message (content, sender, conversation, `isRead=false` via `@PrePersist`),
4. creates a `NEW_MESSAGE` notification for the **other** participant,
5. returns `MessageResponseDto` (broadcast by STOMP to the other user's screen).

Reading/unread: `markAsRead` sets `isRead = true`; the dashboard counts unread
messages that are **not sent by me**.

---

## 9.9 Session — full lifecycle

```text
React: sessionService.createSession(data, userId)  → POST /api/sessions?userId=
       { date, duration, mode, conversationId, meetingUrl }
```

Rules in `SessionService.createSession`: conversation exists, caller is part of
the swap, `status = PROPOSED` by default.

Then the lifecycle (enforced by the service):

```text
PROPOSED ──(receiver only)──▶ CONFIRMED ──(both)──▶ COMPLETED
    │                                              (cannot cancel after COMPLETED)
    └────────────▶ CANCELLED  (both, before completion)
```

CRM session endpoints (React `sessionService`):
`acceptSession` / `cancelSession` / `completeSession` / `getMySessions` / `getSessionById` / `getAllSessions` (ADMIN).

---

## 9.10 Review

```text
React: reviewService.createReview(reviewerId, data)  → POST /api/reviews/{reviewerId}
       body: { rating (1–5), comment, revieweeId, sessionId }
```

Conditions in `ReviewService.createReview` (all must hold):
1. reviewer and reviewee exist, session exists,
2. **session status = COMPLETED**,
3. reviewer is the sender or the receiver of that session's swap,
4. **the reviewee is the OTHER participant** (can't review yourself).

Then the average rating is recalculated and saved on the reviewee:

```java
reviewee.setRating(calculateAverageRating(reviewee.getId()));
userRepo.save(reviewee);
```

Other endpoints:
`getReviewsByUser(userId,page,size)` → reviews received; `getAverageRating(userId)` → number.

Rating rule: unique `(reviewer_id, session_id)` → one review per session (Flyway V4).

---

## 9.11 Notifications

How notifications are born (all in services):

| Event | Created in | Type | Receiver |
|---|---|---|---|
| swap request created | `SwapRequestService.createSwapRequest` | NEW_SWAP_REQUEST | receiver |
| swap request accepted | `SwapRequestService.acceptSwapRequest` | REQUEST_ACCEPTED | sender |
| swap request rejected | `SwapRequestService.rejectSwapRequest` | REQUEST_REJECTED | sender |
| new chat message | `MessageService.createMessage` | NEW_MESSAGE | other participant |

`SESSION_REMINDER` exists in the enum but is not created by the services in the current code.

Reading notification (React `notificationService`):

```text
getNotificationsByUser(userId, page, size)      → GET /api/notifications/user/{userId}
markNotificationAsRead(id, userId)              → PUT /api/notifications/{id}/read?userId=
getUnreadNotificationCount(userId)              → GET /api/notifications/user/{userId}/unread-count
getAllNotifications(page, size)                 → GET /api/notifications  (ADMIN)
```

`@PrePersist` sets `isRead = false` automatically on each notification.

---

## 9.12 Dashboards

```text
React: dashboardService.getUserDashboard(userId)  → GET /api/dashboard/user/{userId}
       dashboardService.getAdminDashboard()       → GET /api/dashboard/admin
```

- User dashboard: `pendingRequests`, `upcomingSessions`, `unreadMessages`,
  `notifications` (computed in `DashboardService`).
- Admin dashboard: `totalUsers`, `totalSkills`, `totalSwapRequests`,
  `activeSessions` (CONFIRMED), `completedSessions`.

---

## 9.13 The complete SkillSwap happy path (for the jury)

```text
Register → Login → token
  → add skills to my profile (OFFER + WANTED)
  → Discover: see other users' skills
  → send a SwapRequest to a user who has a WANTED skill
  → receiver accepts → a Conversation is created (+ notification)
  → chat via WebSocket (live) and via HTTP (history/token)
  → propose a Session → receiver accepts → session CONFIRMED
  → session COMPLETED
  → write a Review (1–5) → the reviewee's rating recalculated
```

---

## 9.14 Part 9 — questions I should be able to answer

- Describe registration end-to-end (form → PostgreSQL/MySQL → token → localStorage).
- What happens when a user creates a swap request? Which rules are checked?
- Who can accept a swap request and what gets created at that moment?
- When and how is a conversation created? Why one-to-one?
- Describe the two chat mechanisms and which one gives "live" updates.
- Walk through the session lifecycle with the roles involved.
- What conditions allow a review? What happens to the rating after?
- List the 4 events that create notifications in the current code.

---

*End of Part 9.*

---

# PART 10 — ERROR HANDLING

## 10.1 The philosophy of SkillSwap's errors

The project uses **one central place for error answers**: `GlobalExceptionHandler`.
It is annotated with **`@RestControllerAdvice`** = "intercept exceptions thrown by
ALL controllers and turn them into a JSON answer, WITHOUT repetitive try/catch".

There is exactly ONE exception class file in the project: the handler itself.
SkillSwap does NOT create custom exception classes — it throws the **standard**
`RuntimeException` (or its subtypes) and `AccessDeniedException`, and the handler
formats them.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntime(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDenied(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
```

## 10.2 What the two handlers do

| Exception handled | HTTP status | Body | Used for |
|---|---|---|---|
| `RuntimeException` | **400 Bad Request** | the exception message (the real text from the services) | all the business rules: "Email already exists", "swap is not pending", "Skill not found", "you can only send to another user"... |
| `AccessDeniedException` | **403 Forbidden** | the exception message | the ownership checks: "You can only modify your own profile", "Only admin", "you can only accept your own incoming swap requests"... |

Because the handler writes `e.getMessage()` directly, **the exact sentence that the
service throws is the exact sentence the React app receives** and can display.

## 10.3 Where the errors come from

### Example 1 — a business rule (everywhere in the services)

```java
if (!sender.getId().equals(receiverId)) {
    throw new RuntimeException("You can't send a swap request to yourself");
}
// ..., then somewhere up the stack, when this RuntimeException escapes the service
// and the controller, the @RestControllerAdvice turns it into:
// HTTP 400  "You can't send a swap request to yourself"
```

### Example 2 — ownership check (security)

```java
if (!principal.getId().equals(userId)) {
    throw new AccessDeniedException("...");
}
// → HTTP 403 (every controller that receives @AuthenticationPrincipal does this)
```

### Example 3 — not found

```java
User user = userRepo.findById(userId)
    .orElseThrow(() -> new RuntimeException("User not found"));
// → HTTP 400 "User not found"
```

## 10.4 Why RuntimeException for "not found"?

Using `RuntimeException("... not found")` for a missing entity is not the classic
404 convention, but the project chose one simple handler:
`RuntimeException → 400`, `AccessDeniedException → 403`.
So missing users/skills/swap requests come back as 400, not 404.

> ### 🎤 How can I explain this honestly to the jury?
> "We have ONE global error handler. Business exceptions are thrown as
> RuntimeException and become HTTP 400 with the exact message; access problems
> become 403. It's simple and consistent, even if 'not found' is not
> semantically a 400. If I had more time I would add a
> NotFoundException → 404 handler and a MethodArgumentNotValidException handler
> to return validation errors with their field names."

## 10.5 What is NOT handled (real gaps, documented honestly)

| Case | Current behavior | Ideal behavior |
|---|---|---|
| Bean Validation failures (`@Valid` on DTOs) | NOT caught by the handler → Spring Security/Spring Boot default (usually 400 but not our format) | a `MethodArgumentNotValidException` handler returning field errors |
| EntityNotFound / DataIntegrityViolation | caught as RuntimeException → 400 | specific handlers (404, 409...) |
| 404 for missing resources | no dedicated handler | `NoHandlerFoundException` handler |
| 401 (bad token / expired token) | handled by Spring Security itself (default Spring JSON) | custom `AuthenticationEntryPoint` |

Memory check from Part 8: `AuthController.register`/`login` do not even use `@Valid`,
so validation on login/register is not triggered at all.

## 10.6 Error flow diagram

```text
Controller  →  Service throws RuntimeException / AccessDeniedException
                      ↓
          Spring Security filters (AccessDeniedException → 403)
                      ↓
            GlobalExceptionHandler (@RestControllerAdvice)
                      ↓
        ResponseEntity<String>  (HTTP 400 / 403 + the message)
                      ↓
          React api.js interceptor sees the status
                400 → default case (logged)
                403 → redirect /access-denied
                401 → clear token + redirect /login
```

## 10.7 Part 10 — questions I should be able to answer

- What does `@RestControllerAdvice` do?
- Which two exceptions does the project handle and with which statuses?
- Why does "User not found" come back as 400 instead of 404?
- Where do `RuntimeException` and `AccessDeniedException` get thrown in the code?
- Which validation errors are NOT formatted by this handler today?
- What are the consequences of the missing `@Valid` on auth?

---

*End of Part 10.*

---

# PART 11 — CONFIGURATION

This part explains how the project is configured: `application.properties`,
`docker-compose.yml`, `pom.xml`, the CI workflow and the environment variables.

## 11.1 `application.properties` (backend)

```properties
spring.application.name=SkillSwap

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

app.jwt.secret=${JWT_SECRET}
app.jwt.expiration=${JWT_EXPIRATION}
```

| Property | Meaning |
|---|---|
| `spring.application.name` | name shown for the app (actuator/swagger). |
| `spring.datasource.*` | the MySQL connection — all 3 come from **environment variables**. |
| `ddl-auto=validate` | Hibernate does NOT create tables. It only **checks** that the entities match the existing tables (managed by Flyway). |
| `show-sql=true` | logs every SQL query (useful for the demo/debug). |
| `hibernate.dialect` | tells Hibernate we use MySQL 8. |
| `spring.flyway.*` | enables Flyway, points to the migration folder `db/migration`. |
| `app.jwt.secret` / `app.jwt.expiration` | the JWT secret and validity, also from env vars — read by `JwtUtils` via `@Value`. |

### Why environment variables?

So the same code runs everywhere without secrets written in the repo:

```text
local development  →  a .env file / IDE variables    (DB_URL=jdbc:mysql://localhost:3310/skillswap_db)
docker compose     →  the environment section of the "app" service
GitHub Actions     →  SPRING_DATASOURCE_URL/USERNAME/PASSWORD in the "test" job
```

Spring maps them: `${DB_URL}` ↔ `SPRING_DATASOURCE_URL` (or `DB_URL`, depending on
the launcher). JWT vars: `JWT_SECRET`, `JWT_EXPIRATION`.

## 11.2 `docker-compose.yml` — the stack in 3 services

| Service | Image / build | Port (host:container) | Role |
|---|---|---|---|
| `mysql` | `mysql:8.0` | **3310**:3306 | database `skillswap_db`, data in a named volume |
| `app` | `build: .` (Dockerfile in the backend) | **8080**:8080 | Spring Boot, waits for mysql healthy |
| `frontend` | `build: ../skillswap_frontend` | **5173**:5173 | React/Vite, depends on app |

Key points:
- MySQL is exposed on **3310**, NOT 3306 (avoids conflicts with a local MySQL).
- The `app` service receives `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`,
  `JWT_EXPIRATION` from the environment of the machine running compose.
- `depends_on: condition: service_healthy` → the app only starts **after** MySQL
  answers a `mysqladmin ping` (healthcheck).
- A named volume `skillswap-db-data` keeps the data even if a container is recreated.
- All three services share the `skillswap-network` so `app` can reach `mysql` by its
  service name; the frontend calls the API through `http://localhost:8080`.

## 11.3 `pom.xml` — dependencies (what each one is for)

| Dependency | Purpose |
|---|---|
| `spring-boot-starter-web` | REST controllers, embedded Tomcat, JSON. |
| `spring-boot-starter-data-jpa` | Hibernate, repositories, `@Entity`. |
| `spring-boot-starter-security` | Spring Security chain, `@PreAuthorize`, filters. |
| `spring-boot-starter-validation` | `@Valid` + the DTO annotations. |
| `lombok` | `@Data`, `@Builder`, constructors... at compile time. |
| `mapstruct` | DTO mappers generation (Part 5). |
| `spring-boot-devtools` | hot reload during development. |
| `spring-boot-starter-test` + `spring-security-test` | `spring-boot-test` (testing framework), security test helpers. |
| `flyway-core` + `flyway-mysql` | database migrations. |
| `mysql-connector-j` | the JDBC driver to connect to MySQL. |
| `springdoc-openapi-starter-webmvc-ui` (2.8.13) | Swagger UI at `/swagger-ui.html` + api-docs `/v3/api-docs`. |
| `jjwt-api`/`jjwt-impl`/`jjwt-jackson` (0.11.5) | JWT creation/parsing (HH265). |
| `spring-boot-starter-websocket` | STOMP WebSocket for the chat. |

Build plugins:
- `spring-boot-maven-plugin` → packages the runnable jar.
- `maven-compiler-plugin` with `annotationProcessorPaths` listing **Lombok AND
  MapStruct** → both processors run during compilation, in the right order
  (`@Mapper` implementations are generated, Lombok getters are visible to them).

## 11.4 The entry point

```java
@SpringBootApplication   // = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class SkillSwapApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkillSwapApplication.class, args);
    }
}
```

`@SpringBootApplication` does three things:
1. **Configuration** — this class can declare beans,
2. **EnableAutoConfiguration** — Spring Boot configures databases, security, etc.
   automatically based on the classpath (e.g. sees WebSocket → configures it),
3. **ComponentScan** — scans the package `com.example.skillswap` (and below) for
   `@Component` / `@Service` / `@Repository` / `@Controller` / `@Configuration`.

If the beans were in another package, they would NOT be found (that's why everything
sits under `com.example.skillswap`).

## 11.5 GitHub Actions CI (`ci.yml`)

```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:  mysql:8.0 (skillswap_db, root/root, port 3306, healthcheck)
    steps:
      - checkout code
      - setup-java 21 (temurin)
      - run tests with SPRING_DATASOURCE_URL=... USERNAME=root PASSWORD=root  →  mvn test
```

What it does: every push/PR on `main` → a fresh Ubuntu machine starts a MySQL 8
container 3306 (with root/root), installs Java 21, and runs `mvn test` with the test
DB. This is **Continuous Integration**: the tests run on every change before merge.

> ### 🎤 Why does the CI DB use 3306 while local compose uses 3310?
> Because each environment decides its own ports. The important thing is the
> `SPRING_DATASOURCE_*` variables each environment provides.

## 11.6 The full configuration flow at startup

```text
docker compose up
   ↓
mysql (healthcheck ✓)
   ↓
app (Spring Boot starts)
   ├─ reads application.properties (env vars replaced)
   ├─ Hibernate: ddl-auto=validate → checks entities match the schema
   ├─ Flyway: applies db/migration V1...V4 if not yet applied
   ├─ Components scanned under com.example.skillswap
   ├─ Security config applied (filters, jwt, cors)
   └─ Tomcat listens on 8080  (+ /swagger-ui.html)
   ↓
frontend (Vite) on 5173 → calls http://localhost:8080 via VITE_API_URL
```

## 11.7 Part 11 — questions I should be able to answer

- What is in `application.properties` and which values come from env vars?
- Why `ddl-auto=validate` and not `update`, when Flyway manages the schema?
- Describe the 3 docker-compose services and their ports.
- Why does MySQL run on 3310 locally but on 3306 in CI?
- List the most important pom.xml dependencies and their purpose.
- Why are Lombok AND MapStruct listed in `annotationProcessorPaths`?
- What does `@SpringBootApplication` combine?
- What does the CI workflow do step by step?

---

*End of Part 11.*

---

# PART 12 — TESTS

## 12.1 Where the tests are

```text
src/test/java/com/example/skillswap/
├── SkillSwapApplicationTests.java        (context load test)
└── service/
    ├── SkillServiceTest.java
    ├── SwapRequestServiceTest.java
    ├── ConversationServiceTest.java
    ├── MessageServiceTest.java
    ├── SessionServiceTest.java
    ├── ReviewServiceTest.java
    └── NotificationServiceTest.java
```

There is **one test class per Service** (7 test classes). There are NO controller
tests and NO end-to-end tests with a real database.

## 12.2 The test style: classic unit tests with Mockito

Every service test uses the same pattern — **Mockito mocks**:

```java
@ExtendWith(MockitoExtension.class)          // 1. JUnit 5 + Mockito
class SwapRequestServiceTest {

    @Mock      private SwapRequestRepo swapRequestRepo;   // 2. fake repositories
    @Mock      private UserRepo userRepo;
    @Mock      private SkillRepo skillRepo;
    @Mock      private SkillDetailsRepo detailsRepo;
    @Mock      private SwapRequestMapper mapper;
    @Mock      private NotificationService notificationService;
    @Mock      private ConversationService conversationService;

    @InjectMocks private SwapRequestService service;      // 3. real service + the mocks injected

    @Test
    void createSwapRequest() {                             // 4. a test method
        // build fake entities
        User sender = new User(); sender.setId(1L);
        User receiver = new User(); receiver.setId(2L);
        ...
        // configure what each mock returns ("stubbing")
        when(userRepo.findById(1L)).thenReturn(Optional.of(sender));
        when(userRepo.findById(2L)).thenReturn(Optional.of(receiver));
        when(detailsRepo.existsByUserIdAndSkillId(2L, 20L)).thenReturn(true);
        when(swapRequestRepo.save(any(SwapRequest.class))).thenReturn(saved);
        when(mapper.toResponse(saved)).thenReturn(responseDto);
        // call the REAL service method
        SwapRequestResponseDto result = service.createSwapRequest(1L, requestDto);
        // assert the result
        assertEquals(responseDto, result);
    }
}
```

The idea:
- **`@Mock`** creates a fake dependency that does nothing real (no database!).
- **`@InjectMocks`** puts those fakes inside the REAL `SwapRequestService`.
- **`when(...).thenReturn(...)`** says "when the service asks the repo, answer this".
- We test the **service logic**, not Spring, not MySQL, not security.

## 12.3 What each test verifies (real examples)

| Test file | What it tests | Example assertions |
|---|---|---|
| `SkillServiceTest` | create skill, duplicate rule, add/update/remove user skill | `assertThrows(RuntimeException.class, ...)` when the skill name already exists; `verify(skillRepo).save(skill)` after `existsByName` returned false |
| `SwapRequestServiceTest` | create swap request (all the rules), accept flow | `assertEquals(SwapStatus.ACCEPTED, swapRequest.getSwapStatus())` + it calls `conversationService.createCoersation(100L, 2L)` (the typo using the real method name) |
| `ConversationServiceTest` | create conversation (only when accepted + no existing one), get by id | conversation returned after `findBySwapRequestId` returned empty |
| `MessageServiceTest` | create message, mark as read | `assertTrue(message.isRead())` after `markAsRead(20L, 2L)` |
| `SessionServiceTest` | accept session, complete session | `assertEquals(SessionStatus.CONFIRMED, ...)` / `COMPLETED` |
| `ReviewServiceTest` | create review, simple average | `calculateAverageRating(2L)` with ratings 5 and 4 → `assertEquals(4.5, result)` |
| `NotificationServiceTest` | create notification, mark as read | `assertTrue(notification.isRead())` |

Notice some quirks to know for the jury:
- `NotificationServiceTest` mocks `NotificationService` even though it also tests it
  (a `@Mock private NotificationService notificationService` next to
  `@InjectMocks private NotificationService service`) — harmless but unusual.
- The Conversation flow keeps the `createCoersation` misspelling everywhere.
- The tests are **happy-path + a few rules** (`createSkill` also has the
  `alreadyExists` case), but the error/exception branches of most services are NOT covered.

## 12.4 The context-load test

```java
@SpringBootTest
class SkillSwapApplicationTests { }
```

The famous "empty" test: it **starts the whole Spring context** (application
configuration + beans + connections) and passes if the context loads without error.
It acts as a smoke test — if a bean can't start, CI fails.

> ### 🎤 Why two kinds of tests?
> - the service tests are **fast unit tests** (no DB, milliseconds),
> - `@SpringBootTest` is a **context test** (full bootstrap, but here it does not
>   need a real MySQL for the CI because... actually the CI job provides a MySQL
>   service container just in case the context needs the datasource).

## 12.5 How the tests run

Local:

```bash
mvn test
```

CI (Github Actions, from Part 11): the workflow starts a MySQL 8 container,
sets `SPRING_DATASOURCE_URL/USERNAME/PASSWORD`, then runs `mvn test`.
Branches: `main` push and pull requests.

## 12.6 What is NOT tested (honest gaps)

| Gap | Explanation |
|---|---|
| No controller tests | `@WebMvcTest`/MockMvc tests with `@PreAuthorize` are not present. |
| No real-DB tests | the service tests mock everything; the only DB use is the CI MySQL for the context. |
| No security integration tests | login/token/filter flow is not tested in code. |
| No negative paths for most services | e.g. "cannot send to self", "swap not pending", "already reviewed" are not asserted in tests. |
| Exception-handler tests | `GlobalExceptionHandler` has no test. |

These gaps are a perfect subject to talk about with the jury: what is covered, and
what would be the NEXT tests to write.

## 12.7 Part 12 — questions I should be able to answer

- What is a Mock and an InjectMocks? Which real framework is used here?
- Why can these tests run without a database?
- What does `@SpringBootTest` do and when is it used in this project?
- List the 7 service test classes and one rule each tests.
- How does the test `calculateAverageRating` prove 4.5?
- Where does CI run the tests and with which database configuration?
- Which kind of tests are missing in this project?

---

*End of Part 12.*

---

# PART 13 — FINAL BACKEND REVIEW (synthesis for the jury)

This part is the "cheat sheet": the complete mental model, the strong points, the
honest weaknesses, and a presentation plan for the backend.

## 13.1 The mental model — the layered architecture

```text
BROWSER  (React)
   │  HTTP / WebSocket + JWT
   ▼
CONTROLLER layer      → receives, extracts, calls services, returns DTO   (thin)
   ▼
SECURITY layer        → JwtFilter → SecurityContext → @PreAuthorize       (guard)
   ▼
SERVICE layer         → business rules + transactions (the "brain")       (thick)
   ▼
REPOSITORY layer      → @Repository + derived queries → Spring Data       (data access)
   ▼
MAPPER layer          → entity ↔ DTO (MapStruct, generated at compile)    (converter)
   ▼
DATABASE (MySQL via Flyway migrations)                                    (source of truth)
```

One request in one sentence:

```text
Controller (which endpoint? who is the user?)
  → Service (is this allowed? what rules? save?)
  → Repository (ask MySQL via derived query)
  → DTO (the JSON the frontend receives)
```

## 13.2 The 30-second summary of the backend

"SkillSwap is a **Spring Boot 3** REST + WebSocket API for exchanging skills.
It has **9 entities** around swap requests (users, skills, conversations, messages,
sessions, reviews, notifications) whose lifecycles are fully managed by **service
classes**. Access control is **stateless JWT**: login gives a signed token, a
filter validates it on every request, and roles + ownership are enforced with
`@PreAuthorize` and `AccessDeniedException`. The schema is owned by **Flyway**
migrations, not Hibernate. The API is documented with **Swagger** and tested with
**JUnit + Mockito**, and the tests run in **GitHub Actions** on every push."

## 13.3 The strengths (say these proudly)

| Strength | Where |
|---|---|
| Clean layering (controller/service/repository/dto/mapper) | every package |
| Complete swap lifecycle with real business rules | `SwapRequestService`, `SessionService`, `ReviewService` |
| Stateless JWT + roles + ownership checks | `SecurityConfig`, `JwtFilter`, `@PreAuthorize` |
| No manual SQL — JPA + derived queries | repositories |
| Flyway owns the schema (`ddl-auto=validate`) | `application.properties` + `db/migration` |
| Real-time chat via STOMP (WebSocket) | `WebSocketConfig`, `ChatWebSocketController` |
| No secrets in the repo (env variables) | `application.properties` `$`{} |
| Swagger UI | springdoc starter |
| CI running the tests | `.github/workflows/ci.yml` |
| Enums for statuses instead of magic strings | `SwapStatus`, `SessionStatus`, `Role`... |
| Notifications created by the business events themselves | services call `NotificationService` |
| Duplicate rules at DB + service level | unique constraints in V2/V4 + checks in services |

## 13.4 The honest weaknesses (be ready to discuss)

| Weakness | Explanation |
|---|---|
| "not found" → 400 | `orElseThrow(RuntimeException)` returns 400 instead of 404 |
| `@Valid` missing on auth | `register`/`login` bypass DTO validation |
| Handler too generic | only `RuntimeException` (400) + `AccessDeniedException` (403); no `MethodArgumentNotValidException`, no 404/409 |
| Some DTOs unused | `ConversationRequestDto`, `NotificationRequestDto` are created but not used by controllers |
| `createCoersation` typo | real method name in code and tests |
| Mappers: `toEntity` unused | only `SkillService` really uses it; others map manually |
| Manual DTO building | `AuthService` and `DashboardService` build responses by hand |
| Tests: happy-path only | few negative branches, no controller/security tests |
| `SessionMode.PRESENTIEL` | English would be `ONSITE`/`IN_PERSON` |

> ### 🎤 How to phrase a weakness so it sounds professional
> Use this formula: what we did + why it was consistent + what I would improve.
> Example: "We chose ONE global handler that maps RuntimeException to 400, which
> is simple and consistent. Now that I look back, a dedicated NotFoundException
> returning 404, and a MethodArgumentNotValidException handler for validation,
> would be more correct."

## 13.5 The complete endpoint cheat sheet (one line each)

### Public (`permitAll`)
- `POST /api/auth/register` — register + return token
- `POST /api/auth/login` — login + return token
- `GET /swagger-ui.html` , `/v3/api-docs/**` , `/ws/**` , `/actuator/**` — open

### USER or ADMIN
- `GET/PUT/DELETE /api/users/{id}`, `GET /api/users` (ADMIN)
- `GET /api/skills/discover`, `/api/skills/users/{uid}/skills` + add/update/remove
- `POST /api/swaprequests/{uid}` ; `GET received/{uid}`, `sent/{uid}`
- `PUT accept/reject/cancel/complete /api/swaprequests/{sid}/{uid}`
- `GET /api/conversations/my/{uid}`, `/api/conversations/{cid}/user/{uid}`
- `GET /api/messages/conversation/{cid}`, `PUT /api/messages/{id}/read`
- `GET /api/sessions/my?userId=`, `POST /api/sessions?userId=`,
  `PUT accept/cancel/complete /api/sessions/{sid}/user/{uid}`
- `POST /api/reviews/{reviewerId}`, `GET /api/reviews/user/{uid}`,
  `GET /api/reviews/user/{uid}/average`
- `GET/PUT /api/notifications/user/{uid}`, `GET /api/notifications/user/{uid}/unread-count`
- `GET /api/dashboard/user/{uid}`

### ADMIN only
- `POST/PUT/DELETE /api/skills` and `/{id}` — the catalog
- `GET /api/swaprequests`, `GET /api/sessions`, `GET /api/notifications`
  (paged), `GET /api/dashboard/admin`

### WebSocket
- `@MessageMapping("/chat/{conversationId}/{userId}")` → `@SendTo("/topic/conversation/{id}")`

## 13.6 One sentence for each main class

| Class | One sentence |
|---|---|
| `SecurityConfig` | declares passwordEncoder / authenticationProvider / JWT chain + CORS + stateless session. |
| `JwtUtils` | creates and validates the signed HS256 tokens. |
| `JwtFilter` | reads the `Authorization` header and fills `SecurityContextHolder`. |
| `*Service` | the brain: business rules + transactions + notifications. |
| `*Repo` | interfaces with derived queries, Spring Data implements them. |
| `*Mapper` | MapStruct generates entity↔DTO conversion. |
| `GlobalExceptionHandler` | turns exceptions into 400/403 JSON. |
| `enums` | fixed status/role/type values used everywhere. |
| Flyway V1–V4 | schema + constraints + seed data. |

## 13.7 Presentation plan for the backend (5 minutes)

1. **0:00 – 0:30** Pitch: "SkillSwap = cashless exchange of skills. Backend:
   Spring Boot 3, JWT security, MySQL with Flyway, real-time chat with WebSocket."
2. **0:30 – 1:30** Architecture: show the layered diagram (13.1), take ONE example
   request (e.g. "accept a swap request") and describe each layer crossing it.
3. **1:30 – 2:30** The swap lifecycle: PENDING → ACCEPTED → COMPLETED; who can do
   what; conversation created on accept; notifications on each event. Shows the
   "brain" of the app.
4. **2:30 – 3:30** Security: login → JWT → filter → `@PreAuthorize` + ownership
   checks → 401/403. Show a 403 in practice.
5. **3:30 – 4:30** Live bonus: Swagger UI (contacts manager), or run the tests
   (`mvn test`) and show green, or show the DB schema.
6. **4:30 – 5:00** Improvements: the honest list from 13.4 + next ideas.

## 13.8 Likely jury questions and short answers

- **"Why JWT and not sessions?"** → stateless, no server memory, works for mobile
  too, token expires.
- **"Why Flyway and not ddl-auto=update?"** → versioned, reproducible migrations,
  `validate` guarantees entities match the schema.
- **"How do you know a user can only touch their own data?"** → every action
  receives `@AuthenticationPrincipal` and compares the id; else 403.
- **"Why MapStruct and not manual mapping?"** → less boilerplate, generated at
  compile time.
- **"How does the chat work live?"** → STOMP over WebSocket, `@MessageMapping`/
  `@SendTo` topics; still stored in MySQL via the same service as REST.
- **"What would you improve?"** → error handler refinement (404 + validation),
  `@Valid` on auth, controller/security tests, `toEntity` usage consistency.
- **"Does your API scale?"** → we designed small, but: stateless tokens, paging
  everywhere, MySQL hardened by Flyway; next steps = indexes review + more tests.

---

*End of Part 13. You now have a complete picture of the backend. Next: the frontend.*

---

# PART 14 — FRONTEND OVERVIEW (global)

## 14.1 The stack (from `package.json`)

| Dependency | Role |
|---|---|
| **React 19** + **react-dom** | the UI library |
| **Vite 8** | dev server + build tool (fast, modern) |
| **react-router-dom 7** | routing (public/private/admin areas) |
| **axios** | HTTP calls to the Spring Boot API |
| **@stomp/stompjs** + (SockJS not here) | real-time chat over STOMP/WebSocket |
| **jwt-decode** | decode the JWT to know the current user (no backend call needed) |
| **react-hook-form** + **@hookform/resolvers** + **yup** | forms + validation |
| **lucide-react** / **react-icons** | icons |
| **oxlint** | the linter (`npm run lint`) |

Scripts: `npm run dev` (dev server), `npm run build` (production build),
`npm run lint` (lint), `npm run preview` (show the built app).

Config files: `vite.config.js` (only the React plugin), `.env` →
`VITE_API_URL=http://localhost:8080/api`, `Dockerfile`, `index.html`.

> `.env` note: Vite only exposes variables starting with **`VITE_`** to the browser
> code. Here `VITE_API_URL` is the base URL used by `api.js`.

## 14.2 The entry point — `main.jsx`

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

The order = the dependencies:
- **`StrictMode`** → React dev double-rendering checks (development only),
- **`BrowserRouter`** → all routing works (URLs like `/dashboard`),
- **`AuthProvider`** → reads/decodes the JWT and shares the user with all pages,
- **`App`** → defines the routes.

## 14.3 The routing — `App.jsx`

Three areas:

```text
LayoutPublic  (no auth needed)
    /  /login  /register  /access-denied  /not-found(*)

ProtectedRoute  (must be logged in)
    └─ RoleGuard roles=["USER"]  →  LayoutPrivate
           /dashboard  /profile  /profile/edit  /skills  /discover
           /swap-requests  /sessions  /sessions/:sessionId
           /messages  /messages/:conversationId  /notifications
           /skills/add  /profile/:userId
    └─ RoleGuard roles=["ADMIN"]  →  LayoutPrivate
           /admin  /admin/profile(/edit)  /admin/skills
           /admin/swap-requests  /admin/sessions  /admin/notifications
           /admin/users  /admin/profile/:userId
```

- **Public pages** = the 4 outside routes.
- **`ProtectedRoute`** = if no user → redirect `/login`; else render the children.
- **`RoleGuard`** = if the user role is not in `roles` → redirect `/access-denied`.
  USER and ADMIN get DIFFERENT sidebars/menus because each has its own `Route` that
  wraps `LayoutPrivate` with the role guard.
- `setupNavigate(navigate)` is called once so the Axios interceptor (`api.js`) can
  redirect on 401/403/404.

## 14.4 Authentication state — `AuthContext.jsx`

This is the "brain" of the frontend authentication:

- **On load**: reads `token` from localStorage → `jwtDecode(token)` → stores the
  claims (id, firstName, lastName, email, city, photo, bio, rating, createdAt, role)
  directly in state. **If the token is already expired → it is deleted and the user is logged out.**
- **`login(token)`**: saves the token into localStorage and decodes it.
- **Automatic logout when the token expires**: `logoutTimerRef` + `setTimeout` → when
  `exp` is reached, `logout()` is called automatically. Cleans the timer on unmount.
- **`logout()`**: removes the token + user, goes to `/login`.
- **`updateUser(fields)`**: merges partial profile updates (used after editing).
- `unreadMessages` count is also shared here (used by the navbar/badge).

→ So the frontend NEVER calls a backend endpoint to know the user:
**the JWT itself is the user**.

## 14.5 The HTTP layer — `services/api.js`

- Axios instance, baseURL = `VITE_API_URL` (`http://localhost:8080/api`).
- **Request interceptor**: add `Authorization: Bearer <token>` if present.
- **Response interceptor**: 401 → clear token+user and redirect `/login`;
  403 → `/access-denied`; 404 → `/not-found`; 500 → log. (These match the backend
  answers from Part 10.)
- All the feature services (from Part 9) import this instance:
  `authService`, `userService`, `skillService`, `swapRequestService`,
  `conversationService`, `messageService`, `sessionService`, `reviewService`,
  `notificationService`, `dashboardService`.

## 14.6 The frontend architecture (folders)

```text
src/
├── api/                 (empty)
├── components/
│   ├── auth/            ProtectedRoute, RoleGuard
│   ├── layout/          Navbar, Sidebar
│   ├── skills/          SkillCard, SkillList, AddSkill
│   ├── swapRequests/    SwapRequestCard, SwapRequestList
│   ├── sessions/        SessionCard/Details/Form/List
│   ├── messages/        ConversationList, MessageCard/Form/List
│   ├── notifications/   NotificationCard/List
│   ├── reviews/         ReviewCard/Form/List
│   ├── dashboard/       UserDashboard, AdminDashboard
│   └── "Admin pages"/   AdminSkills/Sessions/SwapRequests/Notifications/Users
├── context/             AuthContext.jsx
├── layouts/             LayoutPublic, LayoutPrivate (+ empty Header/Footer)
├── pages/               Home, Login, Register, Dashboard, Profile, EditProfile,
│                        MySkills, DiscoverSkills, SwapRequests, Sessions,
│                        Messages, Notifications, UserProfile, AccessDenied, NotFound
├── services/            one file per feature (axios calls)
├── App.jsx              routes
└── main.jsx             entry
```

Interesting facts about the real code:
- `Header.jsx` and `Footer.jsx` are **empty stubs** (the layout is actually
  `Sidebar` + `Navbar` in `LayoutPrivate`).
- `LayoutPublic` is a simple `<main><Outlet/></main>`.
- `src/api/` folder exists but is empty.

## 14.7 Part 14 — questions I should be able to answer

- Which libraries does the frontend use and for what?
- What does `VITE_API_URL` do and why does the name start with `VITE_`?
- Explain the order of `<StrictMode>/<BrowserRouter>/<AuthProvider>/<App>`.
- How does `App.jsx` split PUBLIC / USER / ADMIN routes?
- What does `ProtectedRoute` do and what does `RoleGuard` do?
- How does `AuthContext` get the user without calling the backend?
- What happens automatically when the JWT expires?
- How does the Axios error interceptor react to 401/403/404?

---

*End of Part 14.*

---

# PART 15 — FRONTEND COMPONENTS AND STATE

## 15.1 The recurring pattern of every page

Almost every SkillSwap page follows the same skeleton. Take `MySkills` as the model:

```jsx
function MySkills() {
    const { user } = useContext(AuthContext);          // 1. current user

    const [skills, setSkills] = useState([]);          // 2. data state
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [editLevel, setEditLevel] = useState("BEGINNER");

    const loadSkills = () => {                          // 3. loader (calls a service)
        if (!user) return;
        getUserSkills(user.id)
            .then((data) => setSkills(data.content || []))
            .catch((error) => console.error("Error loading skills:", error));
    };

    useEffect(() => { loadSkills(); }, [user]);         // 4. run loader on mount

    const saveEdit = async (skill) => {                 // 5. action → service → refresh
        await updateUserSkill(user.id, skill.skillId, { ... });
        setEditingSkillId(null);
        loadSkills();
    };
    ...
    return ( <div> ... lists + buttons ... </div> );     // 6. render from state
}
```

Rules visible in the real code:
- **`data.content`** everywhere → the backend always answers a Spring `Page`
  (`content` + `totalPages` + ...). The frontend extracts `.content`.
- The user id used in URLs comes from `AuthContext` (the JWT), never from an input.
- Errors are `console.error`; the app does NOT show them as toasts on most pages.

## 15.2 Two ways to build forms (real code)

SkillSwap uses BOTH styles:

### Style 1 — `useState` controlled inputs (many pages)

Used by `Login`, `AddSkill`, `SessionForm`, `EditProfile`, `MessageForm`:

```jsx
const [formData, setFormData] = useState({ email: "", password: "" });

const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
const handleSubmit = (e) => { e.preventDefault(); ... };
```

Each `<input>` gets `name` + `value={formData.name}` + `onChange={handleChange}`.

### Style 2 — `react-hook-form` + `yup` (Register only)

```jsx
const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must contain at least 8 characters")...
});

const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { firstName: "", ... }
});

<form onSubmit={handleSubmit(onSubmit)}>
    <input type="text" {...register("firstName")} />
    {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
</form>
```

- `register("field")` binds the input automatically,
- the **yup schema** runs validation (`required`, `email`, `min 8`...),
- errors are displayed under the fields from `formState.errors`.

> Interesting: Register validates client-side but sends to a **public** endpoint
> (`/auth/register`) which (Part 10) does not use `@Valid` server-side.

## 15.3 Page = orchestrator, components = presenters

Pages don't repeat lists: they import **feature components** that receive data + callbacks via **props**:

```jsx
// DiscoverSkills (page) uses:
<SkillList users={groupedSkills} onRequestSwap={handleRequestSwap} />

// SwapRequests uses:
<SwapRequestList requests={displayedRequests} type={activeTab}
                 onAccept={handleAccept} onReject={handleReject} onCancel={handleCancel} />

// Sessions uses:
<SessionList sessions={enrichedSessions}
             onAccept={...} onCancel={...} onComplete={...} />

// Messages uses:
<ConversationList ... />  <MessageList messages={messages} currentUserId={user.id} />
                              <MessageForm onSend={sendMessage} />
```

Component folders mirror the features: `skills/`, `swapRequests/`, `sessions/`,
`messages/`, `notifications/`, `reviews/`, `dashboard/`, `auth/`.

## 15.4 DiscoverSkills — search + filters + the swap modal

This page is the most logic-rich:
- loads `getDiscoverSkills(page,size=9)` → `skills`,
- loads the CURRENT user's **OFFER** skills (`getUserSkills` filtered → `mySkills`) — the
  skills the user can propose during a request,
- **filters are CLIENT-SIDE**: a search box (skillName/userName/category) + 3 selects
  (category / level / type) computed from `[...new Set(skills.map(...))]` results in a
  `filteredSkills` array,
- results are **grouped by user** (`groupedSkills`) so one user shows all their skills,
- clicking "Request Swap" opens a **modal** (`selectedSkill`) with a form:
  choose one of `mySkills` (your offer) + a message,
- on send → `createSwapRequest(user.id, { receiverId, skillOfferedId:Number(...),
  skillWantedId, message })` → alert "Swap request sent successfully".

## 15.5 SwapRequests — tabs and actions

- Loads BOTH `getReceivedRequests` and `getSentRequests` once on mount,
- tabs `all` / `received` / `sent` filter in memory,
- stat cards (Total / Received / Sent),
- **accept** → `PUT /swaprequests/{id}/accept/{userId}` and replaces the request in state,
- **reject** → same with `reject`,
- **cancel** (sender) → removes the request from the sent list.

This matches the backend rules from Part 9: only the receiver accepts/rejects,
only the sender cancels.

## 15.6 Sessions — tabs, the schedule form, enrichment

- loads `getMySessions` + `getMyConversations`,
- tabs `upcoming` (PROPOSED + CONFIRMED) / `completed` / `cancelled`,
- **enrichment**: the API returns only `conversationId`, so the page builds
  `conversationMap` and adds the OTHER user's name (`userName`) to each session card,
- "Schedule Session" opens `SessionForm` (a modal) → builds `{ date: "YYYY-MM-DDTHH:mm",
  duration, mode, conversationId:Number, meetingUrl }` → `createSession(data, user.id)`,
- the actions accept/complete/cancel call the service and replace the session in state.
- quirk: the `mode` dropdown offers "Online" / **"Presentiel"** — matching the
  backend `SessionMode.PRESENTIEL` from Part 2. `meetingUrl` is required only for ONLINE.

## 15.7 Messages — the WebSocket chat (the flagship feature)

### Connection (stomp):

```js
const stompClient = useRef(null);                     // survives re-renders

useEffect(() => {
    if (!selectedConversation || !user?.id) return;

    const client = new Client({
        brokerURL: "ws://localhost:8080/ws",          // Spring WebSocket endpoint (Part 8/9)
        reconnectDelay: 5000                          // auto-reconnect after 5s
    });

    client.onConnect = () => {
        client.subscribe(`/topic/conversation/${selectedConversation.id}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMessage]);   // live append
            if (newMessage.senderId !== user.id) {          // auto mark-as-read
                markMessageAsRead(newMessage.id, user.id);
                setUnreadMessages((prev) => Math.max(0, prev - 1));
            }
        });
    };

    client.activate();
    return () => { client.deactivate(); };              // cleanup on unmount
}, [selectedConversation, user]);
```

### Sending:

```js
stompClient.current.publish({
    destination: `/app/chat/${selectedConversation.id}/${user.id}`,   // @MessageMapping
    body: JSON.stringify({ content: message })
});
```

### How it comes together with HTTP:

- **list of conversations**: `getMyConversations` (REST),
- **history**: `getMessagesByConversation(conversationId, userId)` (REST) — loaded
  when a conversation is selected,
- **unread marking**: on load and on each live message, `markMessageAsRead` → the
  badge in the Sidebar decrements,
- **live messages**: STOMP subscription on `/topic/conversation/{id}`,
  de-duplicated with `items.some(item => item.id === newMessage.id)`.

So: history via REST, new messages via WebSocket — the same `MessageService`
on the backend handles both (Part 9).

## 15.8 Notifications

- loads `getNotificationsByUser(user.id)`,
- formats `createdAt` to a locale string,
- "mark read" → `markNotificationAsRead(id, user.id)` → updates local state,
- part of the flow that powers the unread counter.

## 15.9 Shared UI pieces

- **`Sidebar`** (layout): shows different menus for USER vs ADMIN; shows the
  **unread messages badge** (from `AuthContext.unreadMessages`); has the avatar,
  name/email and the **Logout** button (calls `logout()` from context). Real quirk:
  it **polls `getUserDashboard(user.id)` every 3 seconds** with `setInterval` just to
  refresh the unread counter.
- **`Navbar`**: title + the user's photo/name (mostly visual).
- **`RoleGuard`**: logs `USER ROLE:` in the console on each render (visible in devtools).

## 15.10 Part 15 — questions I should be able to answer

- Describe the common page skeleton (context → state → loader → effect → render).
- Why does every page read `data.content`?
- Two form patterns: when is `useState` used and when `react-hook-form`+`yup`?
- How does DiscoverSkills filter and group the skills? Where is the swap created?
- How does SwapRequests keep received/sent up to date after an action?
- How does the Sessions page enrich the session with the other user's name?
- Explain the full STOMP chat flow (connect, subscribe, publish, mark-as-read).
- Which parts of Messages use REST and which use WebSocket?
- Why does the Sidebar poll every 3 seconds — and what is the cost of that choice?

---

*End of Part 15.*

---

# PART 16 — FRONT↔BACK INTEGRATION AND THE AUTH LIFECYCLE

This part connects everything: how the React app and the Spring API talk, how the
JWT is born, travels, expires and forces a logout.

## 16.1 The token lifecycle — end to end

```text
1. REGISTER
   Registration form (react-hook-form + yup) → authService.register(data)
   → POST /auth/register (no token needed) → token + profile returned
   → Page does NOT save it → navigates to /login

2. LOGIN
   Login form (useState) → authService.login(data)
   → POST /auth/login → { token, ... }
   → AuthContext.login(token)
        ├─ localStorage.setItem("token", token)
        └─ updateUserFromToken(token) → jwtDecode → setUser(claims)
   → navigate(decodedToken.role === "ADMIN" ? "/admin" : "/dashboard")

3. EVERY REQUEST
   api.js request interceptor:  config.headers.Authorization = `Bearer ${token}`
   → Axios adds the JWT to every call automatically
   → JwtFilter validates → Spring executes the endpoint

4. EXPIRY
   AuthProvider effect runs on every app start:
     decodedToken.exp * 1000 <= Date.now()  →  remove token, user = null (logged out)
   Plus a setTimeout set to the remaining lifetime → logout() fires automatically
   Plus 401 from the API → interceptor clears the token and redirects to /login

5. LOGOUT
   Sidebar "Logout" button → logout()
   → clearTimeout + remove token + user=null + redirect /login
```

So the frontend NEVER stores the password and NEVER asks the backend "who am I?"
The JWT IS the identity, restored from localStorage on reload.

## 16.2 The 3 layers that cooperate

| Layer | File | Responsibility |
|---|---|---|
| Persistence | `localStorage "token"` | keeps the session between page reloads |
| Identity | `AuthContext` (`jwtDecode`) | the `user` object shared everywhere |
| Transport | `api.js` interceptors | attaches the token; reacts to 401/403/404 |

### How the guards use them

```text
ProtectedRoute:  no user              → redirect /login
RoleGuard:       role not allowed     → redirect /access-denied
Right role       → render LayoutPrivate (USER or ADMIN menus)
```

The SAME protection exists twice in the project: React guards (UX) AND Spring
`@PreAuthorize` + ownership checks (real security) — never rely on the frontend alone.

## 16.3 What happens on each HTTP error (matching Part 10)

| Status | Backend origin | Frontend reaction |
|---|---|---|
| 401 | invalid/expired token (Spring Security) | clear token+user → navigate `/login` |
| 403 | `AccessDeniedException` (fake owner / wrong role) | `/access-denied` |
| 404 | missing page | `/not-found` |
| 500 | unhandled exception | only `console.log` |

Note the 400s (business rules like "swap is not pending") are NOT specially handled
by the interceptor — pages mostly `console.error(...)` and show a generic alert,
so the exact backend message is often lost in the UI (good improvement topic).

## 16.4 Role-based app — one SPA, two back-offices

USER area (`/dashboard`, `/skills`, `/discover`, `/swap-requests`, `/sessions`,
`/messages`, `/notifications`, `/profile`...) with menu: Profile, My Skills,
Discover, Swap Requests, Sessions, Messages (+badge), Notifications.

ADMIN area (`/admin`, `/admin/users`, `/admin/skills`, `/admin/swap-requests`,
`/admin/sessions`, `/admin/notifications`, `/admin/profile`...) with its own menu.

Both are guarded by `RoleGuard` + `LayoutPrivate`; they only reach the endpoints
that `@PreAuthorize("hasRole('ADMIN')")` allows (Part 7/13).

## 16.5 Dashboard as the integration example

`UserDashboard` aggregates several endpoints at once (each in its own `useEffect`):

- `getUserDashboard(user.id)` → the 4 stat numbers (backend aggregates),
- `getReceivedRequests(user.id)` → filter client-side `swapStatus === "PENDING"` → list,
- `getMySessions(user.id)` → filter client-side `new Date(session.date) > new Date()` → list.

And the Sidebar **polls the same `getUserDashboard` every 3 seconds** to refresh the
unread badge. Everything uses the SAME Axios instance → the token is always attached.

## 16.6 Be able to explain to the jury

- **Why localStorage and not a cookie?** — it's a token-based SPA; the interceptor
  puts it in the Authorization header; simple and stateless.
- **What if the tab is closed and reopened?** — the token is read from localStorage,
  decoded, verified (`exp`), and the user is restored instantly without any request.
- **Is frontend role hiding enough?** — NO. The real security is the backend
  (`@PreAuthorize` + ownership checks). The frontend guards are only UX.
- **Can the token be read by JavaScript?** — yes (it's in localStorage): a minor
  XSS risk, but acceptable for this project; a cookie with `httpOnly` is the
  enterprise alternative.

## 16.7 Part 16 — questions I should be able to answer

- Describe the full token lifecycle from register to forced logout.
- Where exactly is the `Authorization` header added?
- What happens to the app when the token expires while the user is browsing?
- How do `ProtectedRoute`, `RoleGuard` and `AuthContext` cooperate?
- What does the interceptor do for 401, 403, 404, 500?
- How is the Admin area protected on BOTH sides?
- Which endpoints does `UserDashboard` call and why 3 at once?
- Why is localStorage a risk, and what would be the alternative?

---

*End of Part 16.*

---

# PART 17 — THE ADMIN SECTION

## 17.1 Where everything lives

```text
/components/dashboard/AdminDashboard.jsx        → /admin
/components/"Admin pages"/
    ├── AdminUsers.jsx                          → /admin/users          (GET /api/users + view + delete)
    ├── AdminSkills.jsx                         → /admin/skills         (catalog CRUD)
    ├── AdminSwapRequests.jsx                   → /admin/swap-requests  (read-only list)
    ├── AdminSessions.jsx                       → /admin/sessions       (read-only list)
    └── AdminNotifications.jsx                  → /admin/notifications  (read-only list)
```

All of them sit behind `RoleGuard roles={["ADMIN"]}` + `LayoutPrivate` in `App.jsx`
(Part 14). The backend accepts them only via `@PreAuthorize("hasRole('ADMIN')")`
(Part 7/13).

## 17.2 The recurring "admin table" pattern

Read-only pages (Sessions, SwapRequests) are simple:

```jsx
const getSessions = async () => {
    const res = await getAllSessions(currentPage, size);   // paged endpoint
    setSessions(res.data.content);                         // Spring Page
    setTotalPages(res.data.totalPages);
};

useEffect(() => { getSessions(); }, [currentPage, size]);

<table className="admin-table">
    <thead>... columns ...</thead>
    <tbody>{sessions.map((s) => (
        <tr key={s.id}> <td>{s.date}</td> <td>{s.mode}</td> ... </tr>
    ))}</tbody>
</table>

<div className="pagination">
    Previous | Page X of Y | Next          // disabled at the edges
</div>
```

Note: admin services return the WHOLE Axios response (`res.data.content`), while
user services destructure `response.data` directly — a small inconsistency in the code.

## 17.3 AdminUsers — search + view + delete

- `getAllUsers(currentPage, 10)` fills the table,
- search is **client-side** over firstName/lastName/email,
- **View** opens a modal with `getUserById(userId)` details (name, email, city, role,
  bio, rating),
- **Delete** asks `window.confirm("Are you sure...")` then `deleteUser(userId)` →
  reloads the page; shows the backend's real message on failure
  (`error.response?.data`, remember that `GlobalExceptionHandler` sends the raw text),
- the Delete button is **disabled for `role === "ADMIN"`** rows — matching the
  backend protection "you cannot delete another ADMIN" (Part 6).

## 17.4 AdminSkills — full CRUD on the catalog

- table from `getAllSkills(page,size)` (the catalog),
- `getAllSkillsForSearch()` = `GET /skills?page=0&size=1000` → **all** the skills in
  one call, used as the searchable list,
- when the search box is non-empty, the page switches `displayedSkills` to the
  filtered full list and **hides the pagination**,
- **Add / Edit** open the same modal form (`name` + `category`);
  if `selectedSkill` exists → `updateSkill(id, data)`; otherwise `createSkill(data)`,
- **Delete** with `window.confirm` → `deleteSkill(id)` (backend refuses if the skill
  is used by users/swap requests, Part 6).

## 17.5 AdminDashboard — the platform overview

`getAdminDashboard()` → `{ totalUsers, totalSkills, totalSwapRequests, activeSessions,
completedSessions }` shown in 5 stat cards + a "Platform Overview" list + "Quick
Actions" links (→ swap requests, sessions). All values come from ONE backend endpoint
(`DashboardService` builds the counts, Part 6).

## 17.6 AdminNotifications — a remarkable mismatch (be honest!)

The page defines an icon map with type values:

```js
switch (type) {
    case "NEW_USER":        case "NEW_SWAP_REQUEST":   case "SWAP_ACCEPTED":
    case "NEW_SESSION":     case "SESSION_COMPLETED":  case "NEW_REVIEW":
    ...
}
```

But the **real backend enum** is `NotificationType` =
`NEW_SWAP_REQUEST / REQUEST_ACCEPTED / REQUEST_REJECTED / NEW_MESSAGE / SESSION_REMINDER`
(Part 2). Only `NEW_SWAP_REQUEST` matches. All the other cases (NEW_USER,
SWAP_ACCEPTED, NEW_SESSION, SESSION_COMPLETED, NEW_REVIEW) **never happen in the
current code** — so those icons are mostly decorative, and the default icon is used
for the real types. The type is also prettified with `replaceAll("_"," ")` +
title case for the header. Good improvement topic for the jury.

## 17.7 Part 17 — questions I should be able to answer

- How is the admin area protected on the frontend and on the backend?
- Describe the common "admin table" pattern (data → table → pagination).
- Why do admin services use `res.data` while user services use `response.data`?
- How does AdminUsers protect admin users from deletion?
- How does AdminSkills handle search without a server-side search endpoint?
- Which numbers does the AdminDashboard show and where do they come from?
- What is wrong with the notification icon map compared to the backend enum?

---

*End of Part 17.*

---

# PART 18 — FINAL GLOBAL REVIEW AND PRESENTATION PLAN

## 18.1 The complete full-stack picture

```text
                    USER (browser)                     ADMIN (browser)
                         │                                  │
              ┌──────────▼──────────────────────────────────▼──────────┐
              │   REACT (Vite)  —  skillswap_frontend                    │
              │   AuthContext (JWT decoded) · guards · pages · services │
              │   api.js (axios + Authorization + 401/403/404 handlers) │
              └────┬───────────────────────────────┬────────────────────┘
                   │ REST over HTTP                 │ STOMP over WebSocket
        baseURL http://localhost:8080/api     ws://localhost:8080/ws
                   ▼                                ▼
        ┌─────────────────── SPRING BOOT (8080) ───────────────────┐
        │  Controller layer  ←  JwtFilter + @PreAuthorize + CORS   │
        │  Service layer     ←  business rules + transactions      │
        │  Repository layer  ←  Spring Data JPA (derived queries)  │
        │  Mapper layer      ←  MapStruct (generated)              │
        │  GlobalExceptionHandler → 400 / 403                      │
        └──────────────────────────────┬───────────────────────────┘
                                       ▼
                         ┌──────────────────────────┐
                         │  MySQL 8 (port 3310)     │
                         │  Flyway V1..V4           │
                         └──────────────────────────┘
                                   ▲
                         Docker compose · GitHub Actions CI
```

A request always crosses: frontend service → axios (token) → controller → service
→ repo → DB, and back with a DTO → JSON → state → render.

## 18.2 The whole course in one paragraph

SkillSwap is a full-stack skill-exchange platform. The backend (Spring Boot 3, Java 21):
9 entities, DTOs validated with Bean Validation, paged repositories, MapStruct mappers,
services that enforce every business rule, 11 controllers + a WebSocket chat,
stateless JWT security with roles and ownership checks, Flyway-managed MySQL,
Swagger, and unit tests run by CI. The frontend (React 19 + Vite): JWT identity in
`AuthContext`, guarded routes, axios services, real-time STOMP chat, forms with
`useState` or `react-hook-form`+`yup`, a Discover/search/request flow, and a separate
admin area. Everything talks through the token and DTOs you studied.

## 18.3 The happy path mapped to REAL files (the story to tell)

| Step | React file | Service called | Backend endpoint |
|---|---|---|---|
| Register | `pages/auth/Register.jsx` | `authService.register` | `POST /auth/register` |
| Login | `pages/auth/Login.jsx` | `authService.login` → `AuthContext.login` | `POST /auth/login` |
| Add skill | `components/skills/AddSkill.jsx` | `skillService.addSkillToUser` | `POST /skills/users/{id}/skill` |
| Discover | `pages/DiscoverSkills.jsx` | `skillService.getDiscoverSkills` | `GET /skills/discover` |
| Send swap request | `pages/DiscoverSkills.jsx` (modal) | `swapRequestService.createSwapRequest` | `POST /swaprequests/{sender}` |
| Accept (+conversation) | `pages/SwapRequests.jsx` | `swapRequestService.acceptSwapRequest` | `PUT /swaprequests/{id}/accept/{uid}` |
| Chat live | `pages/Messages.jsx` | STOMP publish `/app/chat/{cid}/{uid}` | `@MessageMapping` |
| Chat history | `pages/Messages.jsx` | `messageService.getMessagesByConversation` | `GET /messages/conversation/{cid}` |
| Schedule session | `pages/Sessions.jsx` + `SessionForm` | `sessionService.createSession` | `POST /sessions?userId=` |
| Complete + review | `Sessions` + `components/reviews/ReviewForm` | `reviewService.createReview` | `POST /reviews/{reviewerId}` |

## 18.4 A 10-minute presentation script (full stack)

1. **0:00 Intro** — "SkillSwap: exchange skills, no money." Show the Home page.
   Stack in one line: Spring Boot + React, JWT, MySQL/Flyway, WebSocket chat.
2. **0:30 Architecture** — draw the 18.1 diagram; say "thin controllers, thick services".
3. **1:30 Live demo: register & login** — create an account, login, show the JWT in
   localStorage and the badge appearing. Mention: no session, the token is the user.
4. **3:00 My Skills** — add an OFFER skill + a WANTED skill; show the 3 filters working.
5. **4:00 Discover** — search + filters + "Request Swap" modal, send a request.
6. **5:00 Swap Requests** — the other user accepts → status ACCEPTED + a conversation exists.
7. **6:00 Messages** — show history loaded via REST and the LIVE message appearing in 2 tabs (WebSocket). Mark as read → badge.
8. **7:00 Sessions** — schedule a session (date/time/duration/mode/Meet link), accept, complete.
9. **8:00 Review** — leave a 5-star review → rating updates on the profile.
10. **8:30 Admin** — switch to an ADMIN account, show the dashboard numbers, the users/skills tables + a deletion.
11. **9:30 Security & honest improvements** — 30 seconds: what is protected and how; then the improvements list.
12. **10:00 Questions.**

## 18.5 The full-strength summary (for confidence)

- **Architecture**: const layers, no business logic in controllers.
- **Real-time**: WebSocket chat shares the SAME service as the REST endpoints.
- **Security**: double protection (guards + backend), ownership checks, stateless JWT with auto-logout.
- **Database**: Flyway owns the schema, unique constraints enforce the duplicate rules at DB level.
- **Ops**: Docker compose (3 services), env-var config, CI running tests.
- **UX**: filters, tabs, pagination, loading states, role-based menus, live badge.

## 18.6 Keep them honest — the improvement list (recap)

Backend: not-found → 400 instead of 404 · `@Valid` missing on auth · incomplete
`GlobalExceptionHandler` · unused DTOs · `createCoersation` typo · manual DTO
building · happy-path-only tests.

Frontend: business 400s not shown nicely (no toast system) · Sidebar polls every 3s ·
`RoleGuard` console-logs · admin notifications map uses types that don't exist ·
`Navbar`/`Footer` are empty stubs · error messages often just `console.error`.

Memory helper: "what would you improve?" →
**security** (ValidationException handler, `@Valid` on auth),
**UX** (toast errors, remove polling),
**tests** (controllers + negative branches).

## 18.7 Global questions & answers

- **Whole architecture in one sentence?** — "Presentation (React) + Business (Spring
  services) + Data (JPA/MySQL) with security and tests all the way through."
- **Why two repositories/languages?** — frontend and backend evolve independently;
  they only share the REST/WebSocket contract (DTOs + status codes).
- **How do you ensure the data is consistent?** — service rule + DB constraints
  (unique swap, unique conversation, one review per session) + `@Transactional`.
- **What if a swap is accepted twice?** — the service requires
  `PENDING` (else RuntimeException → 400) and V2/V4 add DB-level checks.
- **How scalable is this?** — paged endpoints everywhere, stateless API; the polling
  for the badge is the first thing to improve.
- **Your 3 proudest things?** — the clean swap lifecycle, the WebSocket chat shared
  with the REST service, the full-stack auth (JWT both sides).

## 18.8 Final checklist before the jury

- [ ] I can explain each part of the architecture diagram (18.1).
- [ ] I can walk the happy path through real files (18.3).
- [ ] I can demo register → login → skills → discover → swap → chat → session → review.
- [ ] I know the security flow: login → token → filter → roles → ownership (Part 8).
- [ ] I can honestly discuss the improvement list (18.6).
- [ ] I have 3 "proudest things" ready and 3 "improvements" ready (18.7).

---

# CONGRATULATIONS — THE COURSE IS DONE 🎉

You now have the complete picture of SkillSwap: frontend AND backend, with the real
code, the architecture, the security, the workflows, the tests, the admin area, and a
full presentation plan. Re-read the parts you are unsure of, practice the demo, and
talk to the jury like you built every file yourself — because now, you know how
every file works.

*End of Part 18. This is the end of the whole course.*