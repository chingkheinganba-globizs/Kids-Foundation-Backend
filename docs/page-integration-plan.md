# Kids' Foundation — Homepage Strapi Integration Plan

**Document Version**: 2.0 (Step 2 Integration Pipeline & Boundaries)  
**Target File**: `frontend/src/app/page.tsx` and child components  
**Execution Strategy**: Next.js App Router Async Server Component with Incremental Static Regeneration (ISR) and Local Prop Fallbacks.

---

## 1. Integration Principles & Stable Boundaries

To guarantee **zero downtime**, avoid breaking existing design, and permit independent section migration:
1. **Isolated Section Boundaries**: Each homepage section component receives a typed prop (e.g. `data?: HeroSectionData | null`) with a built-in fallback to the static `src/data/` source. If Strapi is offline, during build time, or if an editor leaves a field blank, the component automatically displays the hardcoded default.
2. **Server-Side Parallel Aggregation**: `src/app/page.tsx` acts as the single data orchestrator, issuing parallel non-blocking `fetch` calls. No API tokens or raw backend URLs are exposed to client bundles.
3. **Preserved Interactivity**: Client components (`HeroSection`, `NewsSection`, `AcademicStages`, `GallerySection`, `FloatingEnquireTab`) retain all local animations, timers, and React state; they merely receive serialized CMS data as plain props.

---

## 2. Section-by-Section Integration Boundaries & Data Contracts

### Section 1: Navigation Header (`<Header />`)
* **Component**: [frontend/src/components/layout/Header.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/layout/Header.tsx)
* **Status**: **Implemented & Tested**
* **Injected Prop**: `globalData?: GlobalSettingData | null`
* **Boundary Contract**:
  * Logo: `globalData?.logo ? getStrapiMediaUrl(globalData.logo) : IMAGES.logo`
  * School Name: `globalData?.schoolName || "KIDS' FOUNDATION"`
  * Location: `globalData?.location || "IMPHAL, MANIPUR"`
  * Top Notice Strip: Displayed conditionally when `globalData?.topNoticeText` is present.
  * Static Boundary: Navigation links (`navigation.ts`), dropdown states, search modal, and responsive toggle remain in `Header.tsx`.

### Section 2: Hero Carousel (`<HeroSection />`)
* **Component**: [frontend/src/components/home/HeroSection.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/HeroSection.tsx)
* **Status**: **Ready for Implementation**
* **Injected Prop**: `data?: HeroSectionData | null`
* **Boundary Contract**:
  * Badge: `data?.badge || hero.badge`
  * Heading 1: `data?.headingLine1 || hero.headingLine1`
  * Heading 2: `data?.headingLine2 || hero.headingLine2`
  * Description: `data?.description || hero.description`
  * Buttons: `data?.primaryCta` and `data?.secondaryCta` (falling back to `hero.primaryBtn` & `hero.secondaryBtn`)
  * Slides: If `data?.slides && data.slides.length > 0`, maps to `{ src: getStrapiMediaUrl(slide.media), alt: slide.alt }`. Falls back to local `SLIDES` array.
  * Static Boundary: 5000ms auto-play interval, pause-on-hover, arrow controls, and dot navigation state stay in `HeroSection.tsx`.

### Section 3: Milestone Ribbon (`<ExcellenceBanner />`)
* **Component**: [frontend/src/components/home/ExcellenceBanner.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/ExcellenceBanner.tsx)
* **Status**: **Ready for Implementation**
* **Injected Prop**: `data?: ExcellenceBannerData | null`
* **Boundary Contract**:
  * Emblem Value: `data?.yearsEmblem || "20+"`
  * Emblem Label: `data?.yearsLabel || "Years"`
  * Subtitle: `data?.subtitle || "Excellence in Education"`
  * Heading: `data?.heading || "20+ Years of Academic Excellence"`
  * Description: `data?.description || "Nurturing curious, confident, and capable learners in Manipur since 2005."`
  * Static Boundary: CSS amber glow effect and Sparkles icon layout remain in `ExcellenceBanner.tsx`.

### Section 4: About Kids' Foundation (`<AboutSection />`)
* **Component**: [frontend/src/components/home/AboutSection.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/AboutSection.tsx)
* **Status**: **Ready for Implementation**
* **Injected Prop**: `data?: AboutSectionData | null`
* **Boundary Contract**:
  * Label: `data?.label || about.label`
  * Heading: `data?.heading || about.heading`
  * Paragraph 1: `data?.paragraph1 || about.paragraph1`
  * Paragraph 2: `data?.paragraph2 || about.paragraph2`
  * CTA: `data?.cta?.label || about.linkText`, `data?.cta?.href || about.linkHref`
  * Campus Image: `data?.image ? getStrapiMediaUrl(data.image) : IMAGES.aboutCampus`
  * Static Boundary: 12-column grid and wavy background texture remain in `AboutSection.tsx`.

### Section 5: Academic Stages (`<AcademicStages />`)
* **Component**: [frontend/src/components/home/AcademicStages.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/AcademicStages.tsx)
* **Status**: **Ready for Implementation**
* **Injected Props**:
  * `header?: SectionHeaderData | null`
  * `stages?: AcademicStageData[] | null`
* **Boundary Contract**:
  * Section Header: `header` falls back to `ACADEMIC_STAGES_HEADER`.
  * Stages Array: If `stages && stages.length > 0`, normalizes stages to match internal stage format. Falls back to `ACADEMIC_STAGES`.
  * Static Boundary: Client tab selection state (`activeTabId`), active pill animation, and tags layout remain in `AcademicStages.tsx`.

### Section 6: Founder's Message (`<FounderMessage />`)
* **Component**: [frontend/src/components/home/FounderMessage.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/FounderMessage.tsx)
* **Status**: **Ready for Implementation**
* **Injected Prop**: `data?: FounderMessageData | null`
* **Boundary Contract**:
  * Heading: `data?.heading || founder.heading`
  * Paragraph 1: `data?.paragraph1 || founder.paragraph1`
  * Paragraph 2: `data?.paragraph2 || founder.paragraph2`
  * CTA Link: `data?.cta?.label || founder.linkText`, `data?.cta?.href || founder.linkHref`
  * Photo: `data?.photo ? getStrapiMediaUrl(data.photo) : IMAGES.founder`
  * Static Boundary: Negative-margin pop-out card layout (`-mt-44`) remains in `FounderMessage.tsx`.

### Section 7: News and Events (`<NewsSection />`)
* **Component**: [frontend/src/components/home/NewsSection.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/NewsSection.tsx)
* **Status**: **Ready for Implementation**
* **Injected Props**:
  * `header?: SectionHeaderData | null`
  * `events?: NewsArticleData[] | null`
  * `news?: NewsArticleData[] | null`
* **Boundary Contract**:
  * Header: `header` falls back to `NEWS_HEADER`.
  * Events: 3 latest items categorized as `events`. Falls back to `NEWS_ITEMS.filter(c => c.category === 'events')`.
  * News: 10 latest items categorized as `news`. Falls back to `NEWS_ITEMS.filter(c => c.category === 'news')`.
  * Static Boundary: Tab switching (`events` vs `news`), custom scrollbar drag calculations, and scroll buttons stay in `NewsSection.tsx`.

### Section 8: Photo Gallery Grid (`<GallerySection />`)
* **Component**: [frontend/src/components/home/GallerySection.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/GallerySection.tsx)
* **Status**: **Ready for Implementation**
* **Injected Props**:
  * `header?: SectionHeaderData | null`
  * `items?: GalleryItemData[] | null`
* **Boundary Contract**:
  * Header: `header` falls back to `GALLERY_HEADER`.
  * Gallery Items: 6 featured images (`isFeaturedOnHome=true`). Falls back to `GALLERY_ITEMS`.
  * Static Boundary: 16:10 grid layout, lightbox modal state, and keyboard navigation stay in `GallerySection.tsx`.

### Section 9: Admissions CTA & Footer (`<AdmissionsSection />` + `<Footer />`)
* **Components**: `src/components/home/AdmissionsSection.tsx` & `src/components/layout/Footer.tsx`
* **Status**: **Ready for Implementation**
* **Injected Props**:
  * Admissions: `data?: AdmissionsCtaData | null`
  * Footer: `globalData?: GlobalSettingData | null`
* **Boundary Contract**:
  * Admissions: Label, heading, description, buttons fall back to `SITE_CONFIG.admissions`.
  * Footer: School brand, CBSE Affiliation (`cbseAffiliationNo`), tagline, contact info, social links fall back to `SITE_CONFIG.footer` and `SITE_CONFIG.contact`.
  * Static Boundary: Grass-hill continuous background (`bgPosition="center 72%"`), navigation links, and layout grid stay in `Footer.tsx`.

### Section 10: Floating Enquire Drawer (`<FloatingEnquireTab />`)
* **Component**: [frontend/src/components/home/FloatingEnquireTab.tsx](file:///d:/Globizs/Projects/Kids_Foundation/frontend/src/components/home/FloatingEnquireTab.tsx)
* **Status**: **Existing—verified (Frontend Managed)**
* **Injected Prop**: `globalData?: GlobalSettingData | null` (for phone number fallbacks)
* **Boundary Contract**:
  * 100% frontend interactive form, slide-over drawer animation, input state, Honeypot check, and `/api/contact` submission.

---

## 3. Server Orchestration (`frontend/src/app/page.tsx`)

When all sections are connected, `src/app/page.tsx` executes parallel non-blocking queries:

```tsx
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ExcellenceBanner } from "@/components/home/ExcellenceBanner";
import { AboutSection } from "@/components/home/AboutSection";
import { AcademicStages } from "@/components/home/AcademicStages";
import { FounderMessage } from "@/components/home/FounderMessage";
import { NewsSection } from "@/components/home/NewsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { FloatingEnquireTab } from "@/components/home/FloatingEnquireTab";
import {
  getGlobalSettings,
  getHomePageData,
  getAcademicStages,
  getFeaturedEvents,
  getLatestNews,
  getFeaturedGallery,
} from "@/lib/strapi";

export default async function Home() {
  const [
    globalData,
    homeData,
    stages,
    events,
    news,
    gallery,
  ] = await Promise.all([
    getGlobalSettings(),
    getHomePageData(),
    getAcademicStages(),
    getFeaturedEvents(3),
    getLatestNews(10),
    getFeaturedGallery(6),
  ]);

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-[#F47C61] selection:text-white">
      {/* 1. Header */}
      <Header globalData={globalData} />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section */}
        <HeroSection data={homeData?.hero} />

        {/* 3. Milestone Ribbon */}
        <ExcellenceBanner data={homeData?.excellenceBanner} />

        {/* 4. About Section */}
        <AboutSection data={homeData?.about} />

        {/* 5. Academic Stages */}
        <AcademicStages
          header={homeData?.academicStagesHeader}
          stages={stages}
        />

        {/* 6. Message from the Founder */}
        <FounderMessage data={homeData?.founderMessage} />

        {/* 7. News and Updates */}
        <NewsSection
          header={homeData?.newsSectionHeader}
          events={events}
          news={news}
        />

        {/* 8. Photo Gallery */}
        <GallerySection
          header={homeData?.gallerySectionHeader}
          items={gallery}
        />

        {/* 9. Admissions + Footer */}
        <Footer
          admissionsData={homeData?.admissionsCta}
          globalData={globalData}
        />
      </main>

      {/* 10. Floating Enquire Now Tab */}
      <FloatingEnquireTab globalData={globalData} />
    </div>
  );
}
```

---

## 4. Implementation Tracking Checklist

### Schema Definitions
* [x] `elements.link-button` &mdash; **Existing—verified**
* [x] `elements.phone-entry` &mdash; **Existing—verified**
* [x] `elements.social-link` &mdash; **Existing—verified**
* [x] `home.hero-slide` &mdash; **Existing—verified**
* [x] `home.hero-section` &mdash; **Existing—verified**
* [x] `home.excellence-banner` &mdash; **Existing—verified**
* [x] `home.about-section` &mdash; **Existing—verified**
* [x] `home.founder-message` &mdash; **Existing—verified**
* [x] `home.section-header` &mdash; **Existing—verified**
* [x] `home.admissions-cta` &mdash; **Existing—verified**
* [x] `api::global-setting.global-setting` &mdash; **Existing—verified**
* [x] `api::home-page.home-page` &mdash; **Existing—verified**
* [x] `api::academic-stage.academic-stage` &mdash; **Existing—verified**
* [x] `api::news-article.news-article` &mdash; **Existing—verified**
* [x] `api::gallery-item.gallery-item` &mdash; **Existing—verified**

### Homepage Section Integrations
* [x] **Section 1: Header / Navigation Bar** &mdash; **Implemented & Tested**
* [x] **Section 2: Hero Carousel** &mdash; **Implemented & Tested**
* [x] **Section 3: Milestone Ribbon** &mdash; **Implemented & Tested**
* [x] **Section 4: About Section** &mdash; **Implemented & Tested**
* [x] **Section 5: Academic Stages** &mdash; **Implemented & Tested**
* [x] **Section 6: Founder's Message** &mdash; **Implemented & Tested**
* [x] **Section 7: News & Events** &mdash; **Implemented & Tested**
* [x] **Section 8: Photo Gallery** &mdash; **Implemented & Tested**
* [x] **Section 9: Admissions CTA & Footer** &mdash; **Implemented & Tested**
* [x] **Section 10: Floating Enquire Drawer** &mdash; **Implemented & Tested** (Frontend Managed)
