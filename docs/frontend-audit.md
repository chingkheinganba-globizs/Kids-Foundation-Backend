# Kids' Foundation — Complete Frontend and Backend Audit

**Document Version**: 2.0 (Step 1 Complete Inspection)  
**Date**: October 2026  
**Auditor**: Senior Next.js & Strapi Architect  
**Project**: Kids' Foundation School Web Platform  
**Frontend Stack**: Next.js 16.4.3 (App Router), React 19.3.0, Tailwind CSS v4, TypeScript 5  
**Backend Stack**: Target Strapi v5 (Headless CMS)  
**Reference Live Deployment**: [https://kids-foundation-bpji-cv042o1yn-chingkhei-globizs.vercel.app/](https://kids-foundation-bpji-cv042o1yn-chingkhei-globizs.vercel.app/)

---

## 1. Workspace & Architecture State

### 1.1 Project Structure
* **`frontend/`**: Complete Next.js application containing:
  * Application root: `frontend/package.json` (Scripts: `dev`, `build`, `start`, `lint`).
  * Dependencies: `next: 16.4.3`, `react: 19.3.0`, `react-dom: 19.3.0`, `nodemailer: ^10.2.1`, `pdf-lib: ^1.17.1`, `clsx: ^2.1.1`, `lucide-react: ^1.61.0`.
  * Configuration: `next.config.ts` (configured with Turbopack, experimental caching, and image `remotePatterns` for Strapi).
  * Environment files: `frontend/.env.example`, `frontend/.env.local` (containing SMTP config and `NEXT_PUBLIC_STRAPI_API_URL`).
* **`backend/`**:
  * Root path: `Kids_Foundation/backend/`.
  * Status: Contains `docs/` and `src/` (holding verified schema definitions in `src/api/` and `src/components/`).
  * Runtime engine status: No `package.json` or `node_modules` installed yet. All schemas adhere natively to **Strapi v5** conventions.
  * Environment files: No `.env` or `.env.example` in `backend/` yet.

### 1.2 Git Repository Status
* **Workspace Git Root (`Kids_Foundation/`)**:
  * `frontend/` has uncommitted non-breaking changes (`next.config.ts`, `src/app/page.tsx`, `src/components/layout/Header.tsx`, untracked `src/lib/strapi.ts`, `src/types/strapi.ts`).
  * `backend/` is an untracked directory containing architecture documentation and pre-built schema definitions.

---

## 2. Route Inventory & Page-by-Page Audit

Every route was audited directly from source code and verified against the live reference site.

### 2.1 Route: `/` — Homepage
* **Source File**: [frontend/src/app/page.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/app/page.tsx)
* **Layout**: [frontend/src/app/layout.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/app/layout.tsx)

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | 1. Header & Navigation | `src/components/layout/Header.tsx` | `navigation.ts`, `siteConfig.ts` (`contact`), `images.ts` | Yes (Hybrid) | `GlobalSetting` | **Confirmed by source code**: School title, logo, contact numbers, email, and top notice bar bind to CMS. Menu hierarchy remains in Next.js code. |
| `/` | 2. Hero Carousel | `src/components/home/HeroSection.tsx` | `siteConfig.ts` (`hero`), local `SLIDES` array | Yes (Hybrid) | `HomePage.hero` (`home.hero-section`) | **Confirmed by source code**: Headings, badge, description, CTAs, and 4 slide images/GIFs are CMS-managed. 5s autoplay and transitions stay in Next.js. |
| `/` | 3. Excellence Milestone | `src/components/home/ExcellenceBanner.tsx` | Static inline JSX | Yes | `HomePage.excellenceBanner` (`home.excellence-banner`) | **Confirmed by source code**: Years counter ("20+"), subtitle, heading, and description should be editable for annual milestone updates. |
| `/` | 4. About Kids' Foundation | `src/components/home/AboutSection.tsx` | `siteConfig.ts` (`about`), `images.ts` | Yes | `HomePage.about` (`home.about-section`) | **Confirmed by source code**: Label, heading, 2 paragraphs, CTA link, and campus aerial photo. |
| `/` | 5. Academic Stages | `src/components/home/AcademicStages.tsx` | `academicStages.ts` | Yes | `HomePage.academicStagesHeader` & Collection `AcademicStage` | **Confirmed by source code**: Section header in `HomePage`; 4 stages (Early Years to Secondary) queried from `AcademicStage` collection (sorted by `sortOrder:asc`). |
| `/` | 6. Message from Founder | `src/components/home/FounderMessage.tsx` | `siteConfig.ts` (`founder`), `images.ts` | Yes | `HomePage.founderMessage` (`home.founder-message`) | **Confirmed by source code**: Headline, 2 body paragraphs, learn more link, and transparent founder portrait photo. |
| `/` | 7. News & Events | `src/components/home/NewsSection.tsx` | `news.ts` | Yes | `HomePage.newsSectionHeader` & Collection `NewsArticle` | **Confirmed by source code**: Tab 1 displays 3 latest events; Tab 2 displays scrollable news items. Custom scrollbar physics remain in Next.js. |
| `/` | 8. Photo Gallery | `src/components/home/GallerySection.tsx` | `gallery.ts` | Yes | `HomePage.gallerySectionHeader` & Collection `GalleryItem` | **Confirmed by source code**: Header in `HomePage`; 6 featured images queried from `GalleryItem` (`filters[isFeaturedOnHome]=true`). Lightbox modal stays in Next.js. |
| `/` | 9. Admissions CTA & Footer | `AdmissionsSection.tsx` & `Footer.tsx` | `siteConfig.ts` (`admissions`, `footer`, `contact`), `images.ts` | Yes (Hybrid) | `HomePage.admissionsCta` & `GlobalSetting` | **Confirmed by source code**: Admissions CTA heading/buttons in `HomePage`; Footer contact details, CBSE badge, copyright, and socials in `GlobalSetting`. |
| `/` | 10. Enquire Drawer | `src/components/home/FloatingEnquireTab.tsx` | Local React client state, fallback contacts | No (Except phone fallback) | Next.js Client Component & API | **Confirmed by source code**: Slide-out drawer animation, input state, form validation, and submit handler remain strictly frontend code. Fallback telephone numbers bind to `GlobalSetting.phones`. |

---

### 2.2 Route: `/about` — About Us
* **Source File**: `frontend/src/app/about/page.tsx`
* **Data Sources**: `src/data/aboutPage.ts`, `src/data/siteConfig.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/about` | 1. Page Banner | Shared banner block | `aboutPage.ts` (`banner`) | Recommended | `AboutPage.banner` | **Confirmed by source code**: Page title and breadcrumbs. |
| `/about` | 2. Our Story | Story narrative & campus aerial photo | `aboutPage.ts` (`story`), `/images/campus-aerial.jpg` | Yes | `AboutPage.story` | **Confirmed by source code**: 5 narrative paragraphs, CBSE affiliation statement, and campus photo. |
| `/about` | 3. Core Pillars | 3 Pillar cards (Mission, Philosophy, Vision) | `aboutPage.ts` (`pillars`) | Yes | `AboutPage.pillars` | **Confirmed by source code**: 3 pillars with title and description. |
| `/about` | 4. Founder's Message | Extended founder statement & quote card | `aboutPage.ts` (`founderMessage`) | Yes | Shared `FounderMessage` | **Confirmed by source code**: Reuses founder content from homepage with extended closing paragraphs and quote. |

---

### 2.3 Route: `/about/sports-and-arts` (and alias `/sports-and-arts`)
* **Source File**: `frontend/src/app/about/sports-and-arts/page.tsx` (re-exported by `src/app/sports-and-arts/page.tsx`)
* **Data Sources**: `src/data/sportsArtsData.ts`, `src/data/images.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/about/sports-and-arts` | 1. Intro & Philosophy | Header & lead statement | `sportsArtsData.ts` (`intro`) | Yes | `SportsArtsPage.intro` | **Confirmed by source code**: Physical Education curriculum rationale. |
| `/about/sports-and-arts` | 2. Activities Grid | 6 Activity cards (Yoga, Aerobics, Martial Arts, Water-Pool, Fine Arts, Performing Arts) | `sportsArtsData.ts` (`activities`) | Yes | Collection `ActivityItem` or repeatable component | **Confirmed by source code**: Name and pedagogical description for each activity. |
| `/about/sports-and-arts` | 3. Facilities Callout | High-standard infrastructure narrative | `sportsArtsData.ts` (`facilitiesCallout`) | Yes | `SportsArtsPage.facilities` | **Confirmed by source code**: 2 explanatory paragraphs. |
| `/about/sports-and-arts` | 4. Photo Gallery | Curated sports & arts photos | `sportsArtsData.ts` | Yes | Collection `GalleryItem` (filter `Sports` / `Arts`) | **Recommended design decision**: Sourced from normalized `GalleryItem` collection. |

---

### 2.4 Route: `/admission` — Admissions Information
* **Source File**: `frontend/src/app/admission/page.tsx`
* **Data Sources**: `src/data/admissionPage.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/admission` | 1. Admission Enquiry Card | Office hours, contact numbers, Download Form CTA | `admissionPage.ts` (`enquiry`) | Yes | `AdmissionPage.enquiry` & `GlobalSetting` | **Confirmed by source code**: Visiting hours (9 AM - 3 PM), phone, email, and admission form PDF link. |
| `/admission` | 2. Admission Procedures | Registration timeline & entrance assessment rules | `admissionPage.ts` (`procedures`) | Yes | `AdmissionPage.procedures` | **Confirmed by source code**: Prospectus dates (1st Nov) and panel evaluation guidelines. |
| `/admission` | 3. Fee Structure Tables | Tuition Fees (4 tiers) and Admission Fees (3 tiers) | `admissionPage.ts` (`feeStructure`) | Yes | `AdmissionPage.feeStructure` (repeatable components) | **Confirmed by source code**: Class-wise fee tiers require annual administrative updates. |
| `/admission` | 4. Required Documents | Checklist of 5 certificates | `admissionPage.ts` (`requiredDocuments`) | Yes | `AdmissionPage.requiredDocuments` | **Confirmed by source code**: Birth certificate, report card, transfer cert, photos, immunization record. |

---

### 2.5 Route: `/campus` — Campus Facilities
* **Source File**: `frontend/src/app/campus/page.tsx`
* **Data Sources**: `src/data/campusPage.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/campus` | 1. Campus Overview | 1 lakh sq. ft. campus overview & 9 facility bullet points | `campusPage.ts` (`intro`) | Yes | `CampusPage.intro` | **Confirmed by source code**: Area description, airport proximity, and list of blocks/courts. |
| `/campus` | 2. Photo Showcase | 7 campus photos (aerial, building, labs, fields) | `campusPage.ts` (`galleryImages`) | Yes | Collection `GalleryItem` (filter `Campus`) | **Confirmed by source code**: Sourced from normalized `GalleryItem` collection. |
| `/campus` | 3. Virtual Tour Video | YouTube embedded player (`youtubeId: 2W6amTtl77s`) | `campusPage.ts` (`video`) | Yes | `CampusPage.video` | **Confirmed by source code**: Embedded YouTube iframe with title and description. |

---

### 2.6 Route: `/clubs-and-activities` (and alias `/clubs`)
* **Source File**: `frontend/src/app/clubs-and-activities/page.tsx` (re-exported by `src/app/clubs/page.tsx`)
* **Data Sources**: `src/data/clubsData.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/clubs-and-activities` | 1. Category Filter Tabs | Filter buttons (All, STEM, Arts, Sports, Literary, Social) | Client state in `ClubsClient` | No | Frontend logic | **Confirmed by source code**: Client-side filtering state. |
| `/clubs-and-activities` | 2. Clubs Directory | 7 detailed club cards | `clubsData.ts` (`CLUBS_DATA`) | Yes | Collection `Club` | **Confirmed by source code**: Contains mentor, grade level, schedule, location, member count, activities list, learning outcomes, and highlight. |

---

### 2.7 Route: `/contact` — Contact & Enquiry
* **Source File**: `frontend/src/app/contact/page.tsx`
* **Data Sources**: `src/data/contactPage.ts`, `src/data/siteConfig.ts`
* **API Handler**: `frontend/src/app/api/contact/route.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/contact` | 1. Contact Info Cards | Address, phones, email, office hours | `contactPage.ts` (`info`), `siteConfig.ts` | Yes | `GlobalSetting` | **Confirmed by source code**: Single source of truth across Header, Footer, and Contact page. |
| `/contact` | 2. Contact Message Form | Full name, email, phone, subject, message inputs | `contactPage.ts` (`form`) | No | Next.js Server Action / API Route | **Confirmed by source code**: Nodemailer SMTP integration, anti-spam honeypot, validation logic remain in Next.js code. |
| `/contact` | 3. Google Maps Embed | Interactive iframe & directions link | `contactPage.ts` (`map`) | Recommended | `GlobalSetting.mapEmbedUrl` | **Confirmed by source code**: Embedded Google Map coordinates. |

---

### 2.8 Route: `/events` — School Events
* **Source File**: `frontend/src/app/events/page.tsx`
* **Data Sources**: `src/data/news.ts`, `src/data/newsUpdatesData.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/events` | 1. Events Filter & Tabs | Upcoming vs Past events | Client state | No | Frontend logic | **Confirmed by source code**: Tab toggle state. |
| `/events` | 2. Event Cards Grid | Event cards with cover image, category, title, date, excerpt | `news.ts` (`NEWS_ITEMS` with `category: 'events'`) | Yes | Collection `NewsArticle` (`filters[category][$eq]=events`) | **Confirmed by source code**: Shared collection powers homepage events tab and this dedicated page. |

---

### 2.9 Route: `/gallery` — Photo Gallery
* **Source File**: `frontend/src/app/gallery/page.tsx`
* **Data Sources**: `src/data/galleryPage.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/gallery` | 1. Category Filter Pills | All, Campus, Academics, Sports, Culture, Events | `galleryPage.ts` (`categories`) | No | Frontend filter state | **Confirmed by source code**: Client-side filtering. |
| `/gallery` | 2. Photo Gallery Grid | 12 categorized photos | `galleryPage.ts` (`images`) | Yes | Collection `GalleryItem` | **Confirmed by source code**: Title, category, photo URL. Lightbox modal stays in Next.js. |

---

### 2.10 Route: `/learning` — Academic Curriculum
* **Source File**: `frontend/src/app/learning/page.tsx`
* **Data Sources**: `src/data/learningPage.ts`, `src/data/academicStages.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/learning` | 1. Educational Philosophy | Constructivism & holistic learning intro | `learningPage.ts` (`intro`) | Yes | `LearningPage.intro` | **Confirmed by source code**: 1 narrative paragraph. |
| `/learning` | 2. Detailed Stages Breakdown | Pre-Primary (with activities list), Primary, Secondary | `learningPage.ts` (`stages`) | Yes | Collection `AcademicStage` (extended fields) | **Confirmed by source code**: Reuses and expands the academic stages displayed on the homepage. |

---

### 2.11 Route: `/mandatory-public-disclosure` — CBSE Compliance
* **Source File**: `frontend/src/app/mandatory-public-disclosure/page.tsx`
* **Data Sources**: `src/data/disclosurePage.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/mandatory-public-disclosure` | 1. General Info Table | School Name, Affiliation No, School Code, Address, Principal | `disclosurePage.ts` | Yes | `GlobalSetting` & Single Type `DisclosurePage` | **Confirmed by source code**: Official CBSE SARAS compliance data. |
| `/mandatory-public-disclosure` | 2. Documents & Information | 12 Compliance documents with PDF download links | `disclosurePage.ts` (`DISCLOSURE_DOCUMENTS`) | Yes | Collection `DisclosureDocument` | **Confirmed by source code**: Ref No, issue date, authority, validity, and PDF download attachments. |
| `/mandatory-public-disclosure` | 3. Staff & Results Tables | PGT/TGT/PRT counts, student-teacher ratio, 3-year board results | `disclosurePage.ts` | Yes | `DisclosurePage.staff` | **Confirmed by source code**: Compliance metrics required by CBSE. |
| `/mandatory-public-disclosure` | 4. Infrastructure Table | Classrooms, composite lab, internet facility | `disclosurePage.ts` | Yes | `DisclosurePage.infrastructure` | **Confirmed by source code**: Numerical campus safety and space specifications. |

---

### 2.12 Route: `/news` — Announcements & Notices
* **Source File**: `frontend/src/app/news/page.tsx`
* **Data Sources**: `src/data/newsUpdatesData.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/news` | 1. Category Filter Pills | Circulars, Academic, Admissions, Achievements, Events, Governance | Client state in `NewsPageClient` | No | Frontend logic | **Confirmed by source code**: Client-side filtering. |
| `/news` | 2. Notices & Circulars List | Date, title, subtitle, full content, document download | `newsUpdatesData.ts` (`NEWS_UPDATES_DATA`) | Yes | Collection `NewsArticle` | **Confirmed by source code**: Supports downloadable PDFs and in-page modal document views (e.g., Class XI exam timetable image). |

---

### 2.13 Route: `/news/publications` (and alias `/publications`)
* **Source File**: `frontend/src/app/news/publications/page.tsx` (re-exported by `src/app/publications/page.tsx`)
* **Data Sources**: `src/data/publicationsData.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/news/publications` | 1. Publications Directory | 4 Official publications (The Budding Sprouts, Academic Handbook, Annual Report, Parent Guide) | `publicationsData.ts` (`PUBLICATIONS_DATA`) | Yes | Collection `Publication` | **Confirmed by source code**: Cover image, title, edition, pages, file size, highlights list, and downloadable PDF. |

---

### 2.14 Route: `/search` — Client-Side Site Search
* **Source File**: `frontend/src/app/search/page.tsx`
* **Component**: `src/components/search/SearchPageClient.tsx`
* **Data Sources**: `src/data/searchData.ts`

| Route | Section | Source file/component | Current content source | CMS required? | Proposed source | Evidence/uncertainty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/search` | Global Search Index | Search input, quick filter tags, result list | `searchData.ts` | Hybrid | Dynamic client index from Strapi records | **Recommended design decision**: Search index currently static; can dynamically aggregate fetched Strapi records or maintain static fallback. |

---

### 2.15 Route: `/api/contact` — Nodemailer Endpoint
* **Source File**: `frontend/src/app/api/contact/route.ts`
* **Role**: Serverless POST handler for sending emails via SMTP.
* **CMS Required**: **No**. Stays 100% in Next.js server code.

---

## 3. Shared Components Inventory

| Component | Path | Consumers | Content Origin |
| :--- | :--- | :--- | :--- |
| **`Header`** | `src/components/layout/Header.tsx` | All 15 routes | `siteConfig.ts` &rarr; `GlobalSetting` |
| **`Footer`** | `src/components/layout/Footer.tsx` | All 15 routes | `siteConfig.ts` &rarr; `GlobalSetting` |
| **`SectionHeading`** | `src/components/ui/SectionHeading.tsx` | Homepage (`AcademicStages`, `NewsSection`, `GallerySection`) | Props from parent component |
| **`NewsCard`** | `src/components/ui/NewsCard.tsx` | Homepage & `/events` | `NewsArticle` collection item |
| **`ImageLightbox`** | `src/components/ui/ImageLightbox.tsx` | Homepage & `/gallery` | `GalleryItem` array + Next.js client state |
| **`FloatingEnquireTab`**| `src/components/home/FloatingEnquireTab.tsx`| Homepage | Next.js client state + `GlobalSetting.phones` |
| **`BackToTopButton`**| `src/components/ui/BackToTopButton.tsx` | `layout.tsx` (Global) | Next.js client scroll listener |

---

## 4. Media & Document Assets Inventory

### 4.1 Local Images (`frontend/public/images/`)
* **Branding**: `logo.png`
* **Backgrounds**: `curved-bg.jpg`, `footer.jpg`, `hero-bg.jpg`, `hero-clean.jpg`
* **Hero Carousel Slides**: `banner_images/slider1.gif`, `banner_images/slide1.jpg`, `banner_images/banner.jpg`, `banner_images/banner-1.jpg`
* **Founder Portrait**: `founder.png` (transparent background cutout)
* **Campus Aerial Shots**: `drone_shots/drone.jpg`, `campus-aerial.jpg`
* **Academic Classes**: `classes/kindergarten.jpg`, `classes/primary.jpg`, `classes/middle_school.jpg`, `classes/high_school.jpg`
* **Gallery & Events**: `gallery-science-lab.jpg`, `gallery-taekwondo.jpg`, `gallery-dance.jpg`, `gallery-exam-hall.jpg`, `gallery-school-group.jpg`, `news-cultural-meet.jpg`, `news-teaching-workshop.jpg`
* **Notice Documents**: `news/time-table-class-xi.png`

### 4.2 Document Files
* CBSE Disclosure PDFs, Prospectus, Academic Handbooks, and School Magazines currently link to placeholder paths (`#`) or local mock names. In production Strapi, these will be managed as Single Media (`files` allowed).

---

## 5. Existing Backend Schema Inventory (`backend/src/`)

All 15 schemas created in Step 0 were inspected and validated:

| System Path | Type | API Name | Fields & Media | Validation Status |
| :--- | :--- | :--- | :--- | :--- |
| `src/components/elements/link-button.json` | Component | `elements.link-button` | `label` (str), `href` (str), `isExternal` (bool) | Correct & Verified |
| `src/components/elements/phone-entry.json` | Component | `elements.phone-entry` | `label` (str), `number` (str) | Correct & Verified |
| `src/components/elements/social-link.json` | Component | `elements.social-link` | `platform` (enum), `url` (str) | Correct & Verified |
| `src/components/home/hero-slide.json` | Component | `home.hero-slide` | `media` (image/gif), `alt` (str), `caption` (str) | Correct & Verified |
| `src/components/home/hero-section.json` | Component | `home.hero-section` | `badge`, `headingLine1`, `headingLine2`, `description`, `primaryCta`, `secondaryCta`, `scrollIndicator`, `slides` (repeatable) | Correct & Verified |
| `src/components/home/excellence-banner.json`| Component | `home.excellence-banner`| `yearsEmblem`, `yearsLabel`, `subtitle`, `heading`, `description` | Correct & Verified |
| `src/components/home/about-section.json` | Component | `home.about-section` | `label`, `heading`, `paragraph1`, `paragraph2`, `cta`, `image` (image) | Correct & Verified |
| `src/components/home/founder-message.json` | Component | `home.founder-message` | `heading`, `paragraph1`, `paragraph2`, `cta`, `photo` (image) | Correct & Verified |
| `src/components/home/section-header.json` | Component | `home.section-header` | `label`, `heading`, `description`, `bottomLinkText`, `bottomLinkHref` | Correct & Verified |
| `src/components/home/admissions-cta.json` | Component | `home.admissions-cta` | `label`, `heading`, `description`, `primaryCta`, `secondaryCta` | Correct & Verified |
| `src/api/global-setting/.../schema.json` | Single Type | `api::global-setting.global-setting` | School identity, CBSE affiliation, address, phones, email, logo, footerBg, socials | Correct & Verified |
| `src/api/home-page/.../schema.json` | Single Type | `api::home-page.home-page` | Singleton composing all 8 homepage section components | Correct & Verified |
| `src/api/academic-stage/.../schema.json` | Collection | `api::academic-stage.academic-stage` | `stageId`, `tabNumber`, `tabLabel`, `subLabel`, `heading`, `description`, `tags`, `cta`, `image`, `sortOrder` | Correct & Verified |
| `src/api/news-article/.../schema.json` | Collection | `api::news-article.news-article` | `title`, `slug`, `category`, `publishedDate`, `excerpt`, `content`, `coverImage`, `noticePdf`, `isFeatured` | Correct & Verified |
| `src/api/gallery-item/.../schema.json` | Collection | `api::gallery-item.gallery-item` | `title`, `category`, `image`, `isFeaturedOnHome`, `sortOrder` | Correct & Verified |

---

## 6. Audit Evaluation & Step 2 Alignment

1. **Homepage Scope Confirmation**: The existing schemas in `backend/src/` cover 100% of the homepage requirements. No additional types or components are required for the homepage vertical slice.
2. **Multi-Page Normalization**: The 3 collection types (`AcademicStage`, `NewsArticle`, `GalleryItem`) cleanly decouple shared records so the homepage queries only what it displays without duplicating content.
3. **Identified Uncertainty for Step 2**:
   * Strapi runtime setup in `backend/`: The schema files exist, but `backend/package.json` and Strapi server configuration files (`config/server.ts`, `config/database.ts`, `config/admin.ts`) need to be created before `npm run develop` can be executed.
