# Money Manager

A personal finance management web application for tracking income, expenses, and budgets across customizable categories.

## Features

- **Authentication** — Register with email activation, JWT-based login
- **Dashboard** — Balance overview, recent transactions, finance charts
- **Income & Expense Tracking** — Add, view, and delete transactions with category assignment
- **Category Management** — Create custom income/expense categories with emoji icons
- **Advanced Filtering** — Filter by date range, keyword, category, with sort options
- **Excel Export** — Download income or expense reports as `.xlsx` files
- **Email Reports** — Send Excel report attachments directly to your email
- **Profile Management** — Update profile info and upload avatar via Cloudinary

## Tech Stack

| Layer          | Technology                                               |
| -------------- | -------------------------------------------------------- |
| Frontend       | React 19, Vite, Tailwind CSS, Recharts, React Router     |
| Backend        | Spring Boot 3.5, Java 21, Spring Security, JPA/Hibernate |
| Database       | MariaDB 11                                               |
| Auth           | JWT (JJWT), BCrypt, Email activation                     |
| Email          | SMTP (Brevo, Gmail, or any provider)                     |
| File Storage   | Cloudinary (profile images)                              |
| Infrastructure | Docker, Docker Compose, Nginx, Cloudflare Tunnel         |

## Architecture

```
Internet → Cloudflare Tunnel → frontend (Nginx :80)
                                     │
                        /api/* proxy │
                                     ▼
                           backend (Spring Boot :8080)
                                     │
                                     ▼
                            db (MariaDB :3306)
```

- **Nginx** serves the React SPA and reverse-proxies `/api/*` to the backend
- **Cloudflare Tunnel** exposes the app publicly without opening any server ports
- **MariaDB** data is persisted in a named Docker volume

## Project Structure

```
money-manager/
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/vn/syvh/moneymanager/
│   │   ├── controller/         # REST endpoints
│   │   ├── service/            # Business logic
│   │   ├── repository/         # JPA data access
│   │   ├── entity/             # JPA entities
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── security/           # JWT filter & Spring Security config
│   │   └── util/               # JWT utility
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-prod.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                   # React + Vite SPA
│   ├── src/
│   │   ├── pages/              # Page components (Login, Home, Income, ...)
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   ├── context/            # Global state (AppContext)
│   │   └── utils/              # Axios config, helpers, validation
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
└── .env                        # Secrets (git-ignored)
```

## API Endpoints

Base path: `/api/v1.0`

### Auth & Profile

| Method | Endpoint           | Auth     | Description                     |
| ------ | ------------------ | -------- | ------------------------------- |
| POST   | `/register`        | Public   | Register new account            |
| GET    | `/activate?token=` | Public   | Activate account via email link |
| POST   | `/login`           | Public   | Login, returns JWT token        |
| GET    | `/profile`         | Required | Get current user profile        |

### Categories

| Method | Endpoint             | Auth     | Description                        |
| ------ | -------------------- | -------- | ---------------------------------- |
| GET    | `/categories`        | Required | Get all categories                 |
| GET    | `/categories/{type}` | Required | Get by type (`income` / `expense`) |
| POST   | `/categories`        | Required | Create category                    |
| PUT    | `/categories/{id}`   | Required | Update category                    |

### Income

| Method | Endpoint        | Auth     | Description                 |
| ------ | --------------- | -------- | --------------------------- |
| GET    | `/incomes`      | Required | Get current month's incomes |
| POST   | `/incomes`      | Required | Add income                  |
| DELETE | `/incomes/{id}` | Required | Delete income               |

### Expense

| Method | Endpoint         | Auth     | Description                  |
| ------ | ---------------- | -------- | ---------------------------- |
| GET    | `/expenses`      | Required | Get current month's expenses |
| POST   | `/expenses`      | Required | Add expense                  |
| DELETE | `/expenses/{id}` | Required | Delete expense               |

### Dashboard & Utilities

| Method | Endpoint                   | Auth     | Description               |
| ------ | -------------------------- | -------- | ------------------------- |
| GET    | `/dashboard`               | Required | Aggregated dashboard data |
| POST   | `/filter`                  | Required | Filter transactions       |
| GET    | `/excel/download/incomes`  | Required | Export incomes to Excel   |
| GET    | `/excel/download/expenses` | Required | Export expenses to Excel  |
| POST   | `/email/income-excel`      | Required | Email income report       |
| POST   | `/email/expense-excel`     | Required | Email expense report      |
| GET    | `/status`                  | Public   | Health check              |

## Authentication Flow

1. User **registers** → backend sends activation email
2. User **clicks activation link** → account is activated
3. User **logs in** → receives JWT token
4. Frontend stores token in `localStorage` and sends it as `Authorization: Bearer <token>` on every request
5. Backend `JwtRequestFilter` validates the token on each protected request

## Deployment

### Prerequisites

- Docker & Docker Compose installed on the server
- A domain managed by Cloudflare
- A Cloudflare Tunnel created in [Zero Trust Dashboard](https://one.dash.cloudflare.com) → **Networks → Tunnels**
- SMTP credentials (Brevo, Gmail App Password, etc.)

### Steps

**1. Clone / copy the project to the server**

```bash
# From local machine
rsync -avz --exclude='.git' --exclude='target/' --exclude='node_modules/' \
  ./money-manager/ user@server:~/money-manager/
```

**2. Configure environment variables**

```bash
cd ~/money-manager
cp .env.example .env
nano .env
```

Fill in all values (see [Environment Variables](#environment-variables) below).

**3. Configure Cloudflare Tunnel public hostname**

In the Cloudflare Zero Trust Dashboard, set the tunnel's public hostname:

| Field        | Value                  |
| ------------ | ---------------------- |
| Subdomain    | `money` (or any name)  |
| Domain       | your Cloudflare domain |
| Service Type | `HTTP`                 |
| URL          | `frontend:80`          |

**4. Deploy**

```bash
docker compose up -d --build
```

**5. Verify**

```bash
docker compose ps          # all services should be Up
docker compose logs -f     # watch logs
```

The app is live at the domain configured in `APP_URL`.

---

**Updating the app**

```bash
rsync ...                          # sync new code
ssh server
cd ~/money-manager
docker compose up -d --build       # rebuilds changed images
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# ── MariaDB ───────────────────────────────────────────────
MYSQL_DB=moneymanager
MYSQL_DB_USERNAME=moneymanager
MYSQL_DB_PASSWORD=strong_password_here
MYSQL_ROOT_PASSWORD=strong_root_password_here

# ── JWT ───────────────────────────────────────────────────
# Generate with: openssl rand -hex 64
JWT_SECRET=your_64_char_hex_secret
JWT_EXPIRATION_MS=86400000          # 24 hours (in milliseconds)

# ── Mail (SMTP) ───────────────────────────────────────────
MAIL_HOST=smtp-relay.brevo.com      # or smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_smtp_username
MAIL_PASSWORD=your_smtp_password
MAIL_FROM=noreply@yourdomain.com

# ── Public URL ────────────────────────────────────────────
APP_URL=https://money.yourdomain.com

# ── Cloudflare Tunnel ─────────────────────────────────────
CLOUDFLARE_TUNNEL_TOKEN=your_tunnel_token
```

**Generate a secure JWT secret:**

```bash
openssl rand -hex 64
```

## Local Development

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080/api/v1.0`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` with API proxied to `http://localhost:8080`.

### Database (Docker only)

```bash
docker compose up db -d
```

## Docker Images

| Service     | Base Image                                       | Size Optimization |
| ----------- | ------------------------------------------------ | ----------------- |
| backend     | `maven:3.9.14` → `eclipse-temurin:21-jre-alpine` | Multi-stage build |
| frontend    | `node:22-alpine` → `nginx:alpine`                | Multi-stage build |
| db          | `mariadb:11`                                     | Official image    |
| cloudflared | `cloudflare/cloudflared:latest`                  | Official image    |

## Security Notes

- Never commit `.env` to version control (it is git-ignored)
- Use a strong, random `JWT_SECRET` (minimum 64 characters)
- Use SMTP App Passwords instead of real account passwords
- Database is not exposed on any host port — only accessible within Docker network
- No server ports are opened to the internet — traffic goes exclusively through Cloudflare Tunnel
