# Kids' Foundation — Exact Strapi Schema Architecture Plan

**Document Version**: 4.0 (Step 3 Configured, Implemented & Verified Live)  
**Target CMS**: Strapi v5.59.0 (Headless CMS)  
**Database Dialect**: MySQL 8.0 (`kidsfoundation` via `mysql2`)  
**Primary Consumer**: Next.js 16.4.3 (App Router)  
**Scope**: Complete Homepage Vertical Slice & Full-Site Integration Roadmap  
**Document Status**: Step 3 Backend Configured & Live (Awaiting Initial Admin Setup / Step 4)

---

## 1. Schema Reconciliation & Architectural Evaluation

Every existing schema in `backend/src/` has been cross-referenced against the actual frontend source files and the Step 1 Audit.

### 1.1 Existing APIs & Components Mapping
| API / Component Identifier | System Path | Frontend Sections Using It | Retention & Status | Evidence & Frontend Source |
| :--- | :--- | :--- | :--- | :--- |
| `elements.link-button` | `components/elements/link-button.json` | Hero, About, Founder, Admissions CTA, Academic Stages | **Retained in full** | Confirmed by button props in `HeroSection.tsx`, `AboutSection.tsx`, etc. |
| `elements.phone-entry` | `components/elements/phone-entry.json` | Header, Footer, Contact info | **Retained in full** | Confirmed by `SITE_CONFIG.contact.mobile` (array of numbers) |
| `elements.social-link` | `components/elements/social-link.json` | Footer | **Retained in full** | Confirmed by `SITE_CONFIG.footer.socialLinks` (Facebook, Instagram, YouTube) |
| `home.hero-slide` | `components/home/hero-slide.json` | Hero Section | **Retained in full** | Confirmed by `SLIDES` array in `HeroSection.tsx` (supports image/gif) |
| `home.hero-section` | `components/home/hero-section.json` | Hero Section | **Retained in full** | Confirmed by `SITE_CONFIG.hero` fields in `HeroSection.tsx` |
| `home.excellence-banner`| `components/home/excellence-banner.json`| Milestone Ribbon | **Retained in full** | Confirmed by static text in `ExcellenceBanner.tsx` |
| `home.about-section` | `components/home/about-section.json` | About Kids' Foundation | **Retained in full** | Confirmed by `SITE_CONFIG.about` in `AboutSection.tsx` |
| `home.founder-message` | `components/home/founder-message.json` | Founder's Message | **Retained in full** | Confirmed by `SITE_CONFIG.founder` in `FounderMessage.tsx` |
| `home.section-header` | `components/home/section-header.json` | Academic Stages, News, Gallery | **Retained in full** | Confirmed by section headings in `AcademicStages.tsx`, `NewsSection.tsx`, `GallerySection.tsx` |
| `home.admissions-cta` | `components/home/admissions-cta.json` | Admissions CTA (Footer) | **Retained in full** | Confirmed by `SITE_CONFIG.admissions` in `AdmissionsSection.tsx` |
| `api::global-setting.global-setting` | `api/global-setting/.../schema.json` | Header, Footer, Contact Info across all 15 routes | **Retained in full** | Confirmed by `SITE_CONFIG.contact`, `SITE_CONFIG.footer`, `SITE_CONFIG.name` |
| `api::home-page.home-page` | `api/home-page/.../schema.json` | Homepage (`/`) | **Retained in full** | Confirmed by 10 homepage sections in `src/app/page.tsx` |
| `api::academic-stage.academic-stage` | `api/academic-stage/.../schema.json` | Academic Stages tab panel (Home & `/learning`) | **Retained in full** | Confirmed by `academicStages.ts` (4 stages: Early Years to Secondary) |
| `api::news-article.news-article` | `api/news-article/.../schema.json` | News & Events (Home, `/news`, `/events`) | **Retained in full** | Confirmed by `news.ts` and `newsUpdatesData.ts` |
| `api::gallery-item.gallery-item` | `api/gallery-item/.../schema.json` | Photo Gallery (Home, `/gallery`, `/campus`) | **Retained in full** | Confirmed by `gallery.ts` and `galleryPage.ts` |

### 1.2 Reconciliation Findings
1. **Zero Duplicate Structures**: No duplicate content types exist. News and events share `NewsArticle` differentiated by the `category` enumeration (`events`, `news`, `circular`, `notice`). Photo gallery items across Home, Campus, and Gallery share `GalleryItem`.
2. **Unsupported Fields Avoided**: No arbitrary generic page builders or dynamic zones were created. Fixed layout constraints, navigation structures, and CSS animations remain in Next.js code.
3. **No Database Migration Risk**: The `backend/` directory is clean; no existing database tables exist to conflict.

---

## 2. Complete Content Model Specifications

### 2.1 Single Types

#### 1. `HomePage` (`api::home-page.home-page`)
* **Display Name**: Home Page
* **API ID**: `home-page` (Singular: `home-page`, Plural: `home-pages`)
* **Purpose**: Primary singleton managing section-specific text, banners, and section headers for `/`.
* **Draft & Publish**: `true`
* **Fields & Attributes**:
  * `hero`: Component `home.hero-section` (Single, Required)
  * `excellenceBanner`: Component `home.excellence-banner` (Single, Required)
  * `about`: Component `home.about-section` (Single, Required)
  * `academicStagesHeader`: Component `home.section-header` (Single, Required)
  * `founderMessage`: Component `home.founder-message` (Single, Required)
  * `newsSectionHeader`: Component `home.section-header` (Single, Required)
  * `gallerySectionHeader`: Component `home.section-header` (Single, Required)
  * `admissionsCta`: Component `home.admissions-cta` (Single, Required)
* **Sorting & Query**: Queried via `GET /api/home-page?populate=*`.
* **Status**: **Confirmed by source code**.

#### 2. `GlobalSetting` (`api::global-setting.global-setting`)
* **Display Name**: Global Setting
* **API ID**: `global-setting` (Singular: `global-setting`, Plural: `global-settings`)
* **Purpose**: Cross-site singleton governing Header, Footer, contact information, CBSE compliance numbers, and social links.
* **Draft & Publish**: `false` (Direct live publish for operational contacts)
* **Fields & Attributes**:
  * `schoolName`: Short Text (Required, Default: `"Kids' Foundation"`)
  * `location`: Short Text (Required, Default: `"Imphal, Manipur"`)
  * `tagline`: Long Text (Required, e.g. `"A strong foundation for curious, confident and capable learners." Estd. 2005.`)
  * `cbseAffiliationNo`: Short Text (Required, Default: `"1230049"`)
  * `estdYear`: Short Text (Required, Default: `"2005"`)
  * `address`: Long Text (Required, `"Airport Road, Ghari, Imphal-West, Manipur - 795001, India"`)
  * `phones`: Component `elements.phone-entry` (Repeatable, Min: 1)
  * `landline`: Short Text (Optional, e.g. `"0385-2456231"`)
  * `email`: Email (Required, `"kidsfoundationghari@gmail.com"`)
  * `topNoticeText`: Short Text (Optional header announcement bar)
  * `topNoticeLink`: Short Text (Optional destination URL)
  * `logo`: Single Media (Allowed: `images`, Formats: png, svg, webp, Required)
  * `footerBg`: Single Media (Allowed: `images`, Formats: jpg, webp, Required — grass hill scenic backdrop)
  * `socialLinks`: Component `elements.social-link` (Repeatable)
  * `copyright`: Short Text (Required, e.g. `"© 2026 Kids' Foundation School, Imphal. All rights reserved."`)
* **Sorting & Query**: Queried via `GET /api/global-setting?populate=*`.
* **Status**: **Confirmed by source code**.

---

### 2.2 Collection Types

#### 1. `AcademicStage` (`api::academic-stage.academic-stage`)
* **Display Name**: Academic Stage
* **API ID**: `academic-stage` (Singular: `academic-stage`, Plural: `academic-stages`)
* **Purpose**: Manages the 4 sequential academic curriculum stages displayed on the homepage tabs and expanded on `/learning`.
* **Draft & Publish**: `true`
* **Repeatable Records**: Exactly 4 records initially (`Early Years`, `Primary School`, `Middle School`, `Secondary School`).
* **Fields & Attributes**:
  * `stageId`: Short Text (Required, Unique, e.g. `early-years`, `primary-school`, `middle-school`, `secondary-school`)
  * `tabNumber`: Short Text (Required, e.g. `"01."`, `"02."`)
  * `tabLabel`: Short Text (Required, e.g. `"Early Years"`)
  * `subLabel`: Short Text (Required, e.g. `"FOUNDATIONAL STAGE • AGES 3–8"`)
  * `heading`: Short Text (Required, e.g. `"Igniting Curiosity Through Play & Inquiry"`)
  * `description`: Long Text (Required)
  * `tags`: JSON (Array of badge strings, e.g. `["Ages 3-5", "Play-Based", "Phonics"]`)
  * `cta`: Component `elements.link-button` (Single, Required)
  * `image`: Single Media (Allowed: `images`, Required)
  * `sortOrder`: Integer (Required, Default: `0`, used for sorting `sort=sortOrder:asc`)
* **Sorting & Query**: `GET /api/academic-stages?sort=sortOrder:asc&populate=*`.
* **Status**: **Confirmed by source code**.

#### 2. `NewsArticle` (`api::news-article.news-article`)
* **Display Name**: News Article
* **API ID**: `news-article` (Singular: `news-article`, Plural: `news-articles`)
* **Purpose**: Normalized collection powering the Homepage Events cards, Homepage News scroller, `/events`, and `/news`.
* **Draft & Publish**: `true`
* **Fields & Attributes**:
  * `title`: Short Text (Required)
  * `slug`: UID (Target field: `title`, Required, Unique)
  * `category`: Enumeration (`events`, `news`, `circular`, `notice`, Required)
  * `publishedDate`: Date (Required, format: `YYYY-MM-DD`)
  * `excerpt`: Long Text (Required for cards and previews)
  * `content`: Rich Text / Blocks (Optional, for detail view)
  * `coverImage`: Single Media (Allowed: `images`, Required for `events`)
  * `externalOrDownloadUrl`: Short Text (Optional)
  * `noticePdf`: Single Media (Allowed: `files`, Optional for downloadable circulars)
  * `isFeatured`: Boolean (Default: `false`)
* **Homepage Queries**:
  * Events Tab: `GET /api/news-articles?filters[category][$eq]=events&sort=publishedDate:desc&pagination[limit]=3&populate=*`
  * News List: `GET /api/news-articles?filters[category][$eq]=news&sort=publishedDate:desc&pagination[limit]=10`
* **Status**: **Confirmed by source code**.

#### 3. `GalleryItem` (`api::gallery-item.gallery-item`)
* **Display Name**: Gallery Item
* **API ID**: `gallery-item` (Singular: `gallery-item`, Plural: `gallery-items`)
* **Purpose**: Manages curated photographs displayed across the Homepage 6-photo grid, `/gallery`, and `/campus`.
* **Draft & Publish**: `true`
* **Fields & Attributes**:
  * `title`: Short Text (Required)
  * `category`: Enumeration (`Campus`, `Activities`, `Sports`, `Arts`, `Celebrations`, Required)
  * `image`: Single Media (Allowed: `images`, Required)
  * `isFeaturedOnHome`: Boolean (Default: `false`, Homepage filter flag)
  * `sortOrder`: Integer (Default: `0`)
* **Homepage Query**: `GET /api/gallery-items?filters[isFeaturedOnHome][$eq]=true&sort=sortOrder:asc&pagination[limit]=6&populate=*`.
* **Status**: **Confirmed by source code**.

---

### 2.3 Reusable Components Registry

| Category | Component Name | System Identifier | Fields, Types & Validations | Content Types Reusing It |
| :--- | :--- | :--- | :--- | :--- |
| **`elements`** | **Link Button** | `elements.link-button` | `label` (String, Req), `href` (String, Req), `isExternal` (Bool, Default: false) | `home.hero-section`, `home.about-section`, `home.founder-message`, `home.admissions-cta`, `academic-stage` |
| **`elements`** | **Phone Entry** | `elements.phone-entry` | `label` (String, Opt), `number` (String, Req) | `global-setting` |
| **`elements`** | **Social Link** | `elements.social-link` | `platform` (Enum: facebook, instagram, youtube, twitter, linkedin, Req), `url` (String, Req) | `global-setting` |
| **`home`** | **Hero Slide** | `home.hero-slide` | `media` (Media: image/gif, Req), `alt` (String, Req), `caption` (String, Opt) | `home.hero-section` |
| **`home`** | **Hero Section** | `home.hero-section` | `badge` (String, Req), `headingLine1` (String, Req), `headingLine2` (String, Req), `description` (Text, Req), `primaryCta` (Component: `elements.link-button`, Req), `secondaryCta` (Component: `elements.link-button`, Req), `scrollIndicator` (String), `slides` (Repeatable Component: `home.hero-slide`, Min: 1, Max: 10) | `home-page` |
| **`home`** | **Excellence Banner**| `home.excellence-banner`| `yearsEmblem` (String, Req), `yearsLabel` (String, Req), `subtitle` (String, Req), `heading` (String, Req), `description` (Text, Req) | `home-page` |
| **`home`** | **About Section** | `home.about-section` | `label` (String, Req), `heading` (String, Req), `paragraph1` (Text, Req), `paragraph2` (Text, Req), `cta` (Component: `elements.link-button`, Req), `image` (Media: image, Req) | `home-page` |
| **`home`** | **Founder Message** | `home.founder-message` | `heading` (String, Req), `paragraph1` (Text, Req), `paragraph2` (Text, Req), `cta` (Component: `elements.link-button`, Req), `photo` (Media: image, Req) | `home-page` |
| **`home`** | **Section Header** | `home.section-header` | `label` (String, Req), `heading` (String, Req), `description` (Text, Opt), `bottomLinkText` (String, Opt), `bottomLinkHref` (String, Opt) | `home-page` (reused for Academics, News, Gallery) |
| **`home`** | **Admissions CTA** | `home.admissions-cta` | `label` (String, Req), `heading` (Text, Req), `description` (Text, Req), `primaryCta` (Component: `elements.link-button`, Req), `secondaryCta` (Component: `elements.link-button`, Req) | `home-page` |

---

## 3. Section-by-Section Homepage Mapping Matrix

| Section Order | Visible Section | Frontend Component/File | Editable Fields | Static Elements | Strapi Source | API ID | Data Relationship | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Navigation Header** | `Header.tsx` | School title, location, logo, phone numbers, email, top announcement bar text/link | Navigation tree, desktop dropdowns, search toggle, mobile menu drawer, blur backdrop | `GlobalSetting` | `api::global-setting.global-setting` | Singleton attribute query | `SITE_CONFIG.contact`, `SITE_CONFIG.name`, `IMAGES.logo` |
| **2** | **Hero Carousel** | `HeroSection.tsx` | Badge, heading lines 1 & 2, description, primary & secondary button labels/URLs, slide images | 5000ms autoplay interval, pause-on-hover, slide transition animations, arrow icons, dot indicators, gradient overlay | `HomePage.hero` | `home.hero-section` (in `home-page`) | Component embedded on `HomePage` singleton | `SITE_CONFIG.hero`, local `SLIDES` array |
| **3** | **Milestone Ribbon** | `ExcellenceBanner.tsx`| Years counter ("20+"), years label ("Years"), subtitle ("Excellence in Education"), headline, description | Gradient background, amber glow, Lucide sparkles icon, layout container | `HomePage.excellenceBanner` | `home.excellence-banner` (in `home-page`) | Component embedded on `HomePage` singleton | Static inline TSX markup |
| **4** | **About Section** | `AboutSection.tsx` | Eyebrow label, main heading, 2 body paragraphs, CTA link text/href, aerial campus image | Organic wave background texture, 12-column responsive grid, hover zoom effect | `HomePage.about` | `home.about-section` (in `home-page`) | Component embedded on `HomePage` singleton | `SITE_CONFIG.about`, `IMAGES.aboutCampus` |
| **5** | **Academic Stages** | `AcademicStages.tsx` | Section header (label, heading, description), 4 curriculum stage cards (tabs, sub-labels, headlines, descriptions, tags, photos, CTA links) | Tab switching state (`activeTabId`), underline pill animation, equal-height column layout | `HomePage.academicStagesHeader` & `AcademicStage` | `home.section-header` & `api::academic-stage.academic-stage` | Header on `HomePage`; Collection query `sort=sortOrder:asc` | `ACADEMIC_STAGES_HEADER`, `ACADEMIC_STAGES` |
| **6** | **Founder's Message** | `FounderMessage.tsx` | Headline, 2 body paragraphs, learn more link text/href, transparent founder portrait photo | Pop-out card styling, negative margin positioning (`-mt-44`), drop shadows, layout grid | `HomePage.founderMessage` | `home.founder-message` (in `home-page`) | Component embedded on `HomePage` singleton | `SITE_CONFIG.founder`, `IMAGES.founder` |
| **7** | **News & Events** | `NewsSection.tsx` | Section header, 3 latest event cards (dates, titles, excerpts, thumbnails), scrollable news list items (dates, titles, links) | Tabs toggle (`events` vs `news`), custom scrollbar drag physics, scroll step buttons, card hover effects | `HomePage.newsSectionHeader` & `NewsArticle` | `home.section-header` & `api::news-article.news-article` | Header on `HomePage`; Filtered queries by category (`events` limit 3, `news` limit 10) | `NEWS_HEADER`, `NEWS_ITEMS` |
| **8** | **Photo Gallery** | `GallerySection.tsx` | Section header, 6 curated gallery photos (images, titles, categories), bottom "View all" link | Uniform 16:10 grid, gradient overlay, Image Lightbox modal, keyboard navigation | `HomePage.gallerySectionHeader` & `GalleryItem` | `home.section-header` & `api::gallery-item.gallery-item` | Header on `HomePage`; Filtered query `isFeaturedOnHome=true` limit 6 | `GALLERY_HEADER`, `GALLERY_ITEMS` |
| **9** | **Admissions CTA & Footer**| `AdmissionsSection.tsx` & `Footer.tsx` | Admissions headline, description, 2 CTA buttons; Footer tagline, CBSE badge, contact numbers, email, social URLs, copyright | Shared grass-hill background positioning (`center 72%`), white card layout, Quick Links and Important Links navigation columns | `HomePage.admissionsCta` & `GlobalSetting` | `home.admissions-cta` & `api::global-setting.global-setting` | Admissions component on `HomePage`; Footer bound to `GlobalSetting` | `SITE_CONFIG.admissions`, `SITE_CONFIG.footer`, `SITE_CONFIG.contact` |
| **10** | **Floating Enquire Drawer**| `FloatingEnquireTab.tsx`| Fallback phone numbers bound to `GlobalSetting.phones` | Sticky right tab trigger, drawer open/close state, escape key listener, input validation, Nodemailer email submission | **Frontend Managed** (Form) & `GlobalSetting` (Phones) | `api::global-setting.global-setting` (for phone numbers only) | Read-only phone numbers | Local client component state & `/api/contact` route |

---

## 4. Full-Site Roadmap (Route-by-Route)

| Route | Current Section Order | Proposed CMS Source | Reused Existing Structures | Missing Dependencies (Deferred) | Deferrable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/` (Home)** | **10 Sections** (Header &rarr; Hero &rarr; Excellence &rarr; About &rarr; Stages &rarr; Founder &rarr; News &rarr; Gallery &rarr; Admissions & Footer &rarr; Enquire) | `HomePage`, `GlobalSetting`, `AcademicStage`, `NewsArticle`, `GalleryItem` | All 8 homepage components, `GlobalSetting`, 3 collections | **None** &mdash; 100% covered | **No (Target 1)** |
| **`/about`** | 1. Banner<br/>2. Our Story<br/>3. Core Pillars (Mission, Philosophy, Vision)<br/>4. Founder Message | Single Type `AboutPage` & shared `FounderMessage` | `elements.link-button`, `home.founder-message`, `GlobalSetting` | Single Type `AboutPage` | Yes |
| **`/about/sports-and-arts`** | 1. Intro<br/>2. 6 Activities Grid<br/>3. Facilities Callout<br/>4. Photo Gallery | Single Type `SportsArtsPage` & Collection `GalleryItem` | Collection `GalleryItem`, `GlobalSetting` | Single Type `SportsArtsPage` | Yes |
| **`/admission`** | 1. Enquiry Card<br/>2. Procedures<br/>3. Fee Structure Tables (Tuition & Admission)<br/>4. Required Documents | Single Type `AdmissionPage` | `elements.link-button`, `GlobalSetting` | Single Type `AdmissionPage` | Yes |
| **`/campus`** | 1. Campus Overview & Facilities Checklist<br/>2. Photo Showcase (7 photos)<br/>3. YouTube Virtual Tour | Single Type `CampusPage` & Collection `GalleryItem` | Collection `GalleryItem` (filter `Campus`), `GlobalSetting` | Single Type `CampusPage` | Yes |
| **`/clubs-and-activities`**| 1. Filter Tabs<br/>2. 7 Club Directory Cards | Collection Type `Club` | `elements.link-button`, `GlobalSetting` | Collection `Club` | Yes |
| **`/contact`** | 1. Info Cards<br/>2. Interactive Form<br/>3. Google Map Embed | `GlobalSetting` (Info cards & Map) | `GlobalSetting`, `/api/contact` | None (Directly reuses `GlobalSetting`) | Yes |
| **`/events`** | 1. Upcoming/Past Filter<br/>2. Event Cards Grid | Collection Type `NewsArticle` (`category: events`) | Collection `NewsArticle`, `GlobalSetting` | None (Directly reuses `NewsArticle`) | Yes |
| **`/gallery`** | 1. Filter Pills<br/>2. 12 Photos Grid | Collection Type `GalleryItem` | Collection `GalleryItem`, `GlobalSetting` | None (Directly reuses `GalleryItem`) | Yes |
| **`/learning`** | 1. Pedagogy Intro<br/>2. 3 Curriculum Stages (Pre-Primary, Primary, Secondary) | Single Type `LearningPage` & Collection `AcademicStage` | Collection `AcademicStage`, `GlobalSetting` | Single Type `LearningPage` | Yes |
| **`/mandatory-public-disclosure`**| 1. General Info Table<br/>2. 12 Compliance Documents<br/>3. Staff Table<br/>4. Infrastructure Table | Single Type `DisclosurePage` & Collection `DisclosureDocument` | `GlobalSetting` | Single Type `DisclosurePage`, Collection `DisclosureDocument` | Yes |
| **`/news`** | 1. Category Filter Pills<br/>2. Announcements & Notices List with PDF / Modal | Collection Type `NewsArticle` (`category: news / circular / notice`) | Collection `NewsArticle`, `GlobalSetting` | None (Directly reuses `NewsArticle`) | Yes |
| **`/news/publications`** | 1. Publications Directory (4 publications with PDF downloads) | Collection Type `Publication` | `GlobalSetting` | Collection `Publication` | Yes |
| **`/search`** | 1. Search Query Input & Real-Time Suggestions | Next.js Client Search Index | Sourced from Strapi API aggregation | None | Yes |

---

## 5. MySQL & Database Compatibility Requirements

### 5.1 Environment Configuration & Database Client
* **Installed Strapi Version Target**: **Strapi v5.x** (Current stable standard).
* **Development Client**: `better-sqlite3` (dialect: SQLite, file path: `backend/.tmp/data.db`).
* **Production Client**: `mysql2` (dialect: MySQL 8.x, engine: InnoDB, charset: `utf8mb4`).
* **Target Configuration File**: `backend/config/database.ts`.

### 5.2 Required Environment Variables (By Name Only)
* **Application Security**:
  * `HOST`
  * `PORT`
  * `APP_KEYS`
  * `API_TOKEN_SALT`
  * `ADMIN_JWT_SECRET`
  * `TRANSFER_TOKEN_SALT`
* **Database Connection**:
  * `DATABASE_CLIENT` (e.g. `sqlite` or `mysql`)
  * `DATABASE_HOST`
  * `DATABASE_PORT`
  * `DATABASE_NAME`
  * `DATABASE_USERNAME`
  * `DATABASE_PASSWORD`
  * `DATABASE_SSL`
  * `DATABASE_FILENAME` (for SQLite)
* **Public URL**:
  * `STRAPI_ADMIN_BACKEND_URL` / `PUBLIC_URL`

### 5.3 Compatibility & Data Risk Analysis
* **Table Naming Conventions**: All collection names use standard lowercase snake_case plural identifiers (`home_pages`, `global_settings`, `academic_stages`, `news_articles`, `gallery_items`). This guarantees zero conflicts on case-sensitive Linux MySQL servers.
* **Foreign Key & UTF-8 Compliance**: Field character limits (`string` &le; 255 chars, `text` for unbounded copy) adhere to MySQL InnoDB index limits under `utf8mb4_unicode_ci`.

---

## 6. Implementation Tracking Checklist

### Schemas & Content Checklist (Step 3 & Step 4 Verified)
* [x] `elements.link-button` &mdash; **Verified live** (`components/elements/link-button.json`)
* [x] `elements.phone-entry` &mdash; **Verified live** (`components/elements/phone-entry.json`)
* [x] `elements.social-link` &mdash; **Verified live** (`components/elements/social-link.json`)
* [x] `home.hero-slide` &mdash; **Verified live & populated** (4 slides with `/uploads/` URLs)
* [x] `home.hero-section` &mdash; **Verified live & populated** (`badge`, headings, CTAs, slides)
* [x] `home.excellence-banner` &mdash; **Verified live & populated** ("20+", "Years", headline, description)
* [x] `home.about-section` &mdash; **Verified live & populated** (Headings, 2 paragraphs, CTA, aerial image)
* [x] `home.founder-message` &mdash; **Verified live & populated** (Message, 2 paragraphs, CTA, founder portrait)
* [x] `home.section-header` &mdash; **Verified live & populated** (Reused across Academics, News, Gallery)
* [x] `home.admissions-cta` &mdash; **Verified live & populated** (Headings, description, 2 CTAs)
* [x] `api::global-setting.global-setting` &mdash; **Verified live & populated** (Single Type: Published with logo, footerBg, 2 mobile lines, social links)
* [x] `api::home-page.home-page` &mdash; **Verified live & populated** (Single Type: Published with all 8 homepage components and media)
* [x] `api::academic-stage.academic-stage` &mdash; **Verified live & populated** (Collection Type: 4 stages published in 1–4 sort order with images)
* [x] `api::news-article.news-article` &mdash; **Verified live & populated** (Collection Type: 6 articles/events published with dates and covers)
* [x] `api::gallery-item.gallery-item` &mdash; **Verified live & populated** (Collection Type: 6 curated photos published in 1–6 sort order)

### Homepage Sections Integration Checklist
* [x] **Section 1: Header / Navigation Bar** &mdash; **Implemented & Tested** (Bound to `globalData` with local fallback)
* [x] **Section 2: Hero Carousel** &mdash; **Implemented & Tested** (Bound to `homeData.hero` with local fallback)
* [x] **Section 3: Milestone Ribbon** &mdash; **Implemented & Tested** (Bound to `homeData.excellenceBanner` with local fallback)
* [x] **Section 4: About Section** &mdash; **Implemented & Tested** (Bound to `homeData.about` with local fallback)
* [x] **Section 5: Academic Stages** &mdash; **Implemented & Tested** (Bound to `homeData.academicStagesHeader` & `academicStagesData` with local fallback)
* [x] **Section 6: Founder's Message** &mdash; **Implemented & Tested** (Bound to `homeData.founderMessage` with local fallback)
* [x] **Section 7: News & Events** &mdash; **Implemented & Tested** (Bound to `homeData.newsSectionHeader` & `newsArticlesData` with local fallback)
* [x] **Section 8: Photo Gallery** &mdash; **Implemented & Tested** (Bound to `homeData.gallerySectionHeader` & `galleryItemsData` with local fallback)
* [x] **Section 9: Admissions CTA & Footer** &mdash; **Implemented & Tested** (Bound to `globalData` & `homeData.admissionsCta` with local fallback)
* [x] **Section 10: Floating Enquire Drawer** &mdash; **Implemented & Tested** (Frontend Managed interactive drawer)
