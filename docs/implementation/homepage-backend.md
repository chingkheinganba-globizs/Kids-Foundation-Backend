# Kids' Foundation — Homepage Backend Implementation Report

**Document Version**: 1.0 (Step 3 Implemented & Verified Live)  
**Target CMS**: Strapi v5.59.0 (Headless CMS)  
**Database**: MySQL 8.0 (`kidsfoundation` via `mysql2`)  
**Server Status**: Running Live on `http://localhost:1337`  
**Admin Panel**: `http://localhost:1337/admin`  
**Document Status**: Implementation Verified Live (Foundation for Step 4)

---

## 1. Verified Architecture & Runtime

The Strapi v5 CMS backend is running locally with pure CommonJS module resolution, executing directly against `src/api/` and `src/components/` without intermediary compilation or build discrepancies.

| Component | Verified Specification |
| :--- | :--- |
| **Node.js Runtime** | `v24.18.0` |
| **Strapi Framework** | `@strapi/strapi@^5.59.0` |
| **Database Engine** | MySQL 8.0 (`127.0.0.1:3306`) |
| **Database Name** | `kidsfoundation` |
| **Database Pool** | Min: 2, Max: 10 connections (`mysql2@^3.11.3`) |
| **CORS Origins** | `http://localhost:3000` (Next.js frontend), `http://localhost:1337` (Admin) |

---

## 2. Implemented Schema Inventory

### 2.1 Reusable Components (`src/components/`)
1. **`elements.link-button`** (`src/components/elements/link-button.json`):
   * `label`: String (Required)
   * `href`: String (Required)
   * `isExternal`: Boolean (Default: `false`)
2. **`elements.phone-entry`** (`src/components/elements/phone-entry.json`):
   * `label`: String (Optional)
   * `number`: String (Required)
3. **`elements.social-link`** (`src/components/elements/social-link.json`):
   * `platform`: Enumeration (`facebook`, `instagram`, `youtube`, `twitter`, `linkedin`)
   * `url`: String (Required)
4. **`home.hero-slide`** (`src/components/home/hero-slide.json`):
   * `media`: Single Media (images, Required)
   * `alt`: String (Required)
   * `caption`: String (Optional)
5. **`home.hero-section`** (`src/components/home/hero-section.json`):
   * `badge`: String (Required, default `"KIDS' FOUNDATION • IMPHAL"`)
   * `headingLine1`: String (Required)
   * `headingLine2`: String (Required)
   * `description`: Text (Required)
   * `primaryCta`: Component `elements.link-button` (Single, Required)
   * `secondaryCta`: Component `elements.link-button` (Single, Required)
   * `scrollIndicator`: String (Default: `"SCROLL TO DISCOVER"`)
   * `slides`: Component `home.hero-slide` (Repeatable, Min 1, Max 10)
6. **`home.excellence-banner`** (`src/components/home/excellence-banner.json`):
   * `yearsEmblem`: String (Required, default `"20+"`)
   * `yearsLabel`: String (Required, default `"Years"`)
   * `subtitle`: String (Required, default `"Excellence in Education"`)
   * `heading`: String (Required, default `"20+ Years of Academic Excellence"`)
   * `description`: Text (Required)
7. **`home.about-section`** (`src/components/home/about-section.json`):
   * `label`: String (Required)
   * `heading`: String (Required)
   * `paragraph1`: Text (Required)
   * `paragraph2`: Text (Required)
   * `cta`: Component `elements.link-button` (Single, Required)
   * `image`: Single Media (images, Required)
8. **`home.founder-message`** (`src/components/home/founder-message.json`):
   * `heading`: String (Required, default `"Message from the Founder,"`)
   * `paragraph1`: Text (Required)
   * `paragraph2`: Text (Required)
   * `cta`: Component `elements.link-button` (Single, Required)
   * `photo`: Single Media (images, Required)
9. **`home.section-header`** (`src/components/home/section-header.json`):
   * `label`: String (Required)
   * `heading`: String (Required)
   * `description`: Text (Optional)
   * `bottomLinkText`: String (Optional)
   * `bottomLinkHref`: String (Optional)
10. **`home.admissions-cta`** (`src/components/home/admissions-cta.json`):
    * `label`: String (Required, default `"ADMISSIONS"`)
    * `heading`: Text (Required)
    * `description`: Text (Required)
    * `primaryCta`: Component `elements.link-button` (Single, Required)
    * `secondaryCta`: Component `elements.link-button` (Single, Required)

### 2.2 Content Types (`src/api/`)
Each type is fully wired with its `routes/*.js`, `controllers/*.js`, `services/*.js`:

| Type | Kind | Database Table | Draft & Publish | Live Endpoint | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `api::global-setting.global-setting` | Single Type | `global_settings` | `false` | `GET /api/global-setting` | Active |
| `api::home-page.home-page` | Single Type | `home_pages` | `true` | `GET /api/home-page` | Active |
| `api::academic-stage.academic-stage` | Collection Type | `academic_stages` | `true` | `GET /api/academic-stages` | 200 OK |
| `api::news-article.news-article` | Collection Type | `news_articles` | `true` | `GET /api/news-articles` | 200 OK |
| `api::gallery-item.gallery-item` | Collection Type | `gallery_items` | `true` | `GET /api/gallery-items` | 200 OK |

---

## 3. Permissions & Security

* **Public Read Access**: Automated inside [`backend/src/index.js`](file:///d:/Globizs/Projects/Kids_Foundation/backend/src/index.js) via the `bootstrap` lifecycle hook. On every server startup, Strapi assigns `find` and `findOne` permissions on all approved content types to the `public` role if not already present.
* **Administrative Credentials**: Kept strictly in `backend/.env`. No secrets or write permissions are exposed to the public API.
