import type { Schema, Struct } from '@strapi/strapi';

export interface AdmissionEnquirySection extends Struct.ComponentSchema {
  collectionName: 'components_admission_enquiry_sections';
  info: {
    displayName: 'Admission Enquiry Section';
    icon: 'mail';
  };
  attributes: {
    admissionFormFile: Schema.Attribute.Media<'files' | 'images'>;
    description: Schema.Attribute.Text;
    downloadHref: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    downloadLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Download Admission Form'>;
    email: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'kidsfoundationghari@gmail.com'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Admission Enquiry'>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'ADMISSIONS'>;
    phone: Schema.Attribute.String & Schema.Attribute.DefaultTo<'0385-2456231'>;
  };
}

export interface AdmissionFeeRow extends Struct.ComponentSchema {
  collectionName: 'components_admission_fee_rows';
  info: {
    displayName: 'Fee Row';
    icon: 'credit-card';
  };
  attributes: {
    amount: Schema.Attribute.String & Schema.Attribute.Required;
    level: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AdmissionFeeStructureSection extends Struct.ComponentSchema {
  collectionName: 'components_admission_fee_structure_sections';
  info: {
    displayName: 'Fee Structure Section';
    icon: 'table';
  };
  attributes: {
    admissionFees: Schema.Attribute.Component<'admission.fee-row', true>;
    admissionFeesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Admission Fees'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Admission Fee Structure'>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FEE DETAILS'>;
    tuitionFees: Schema.Attribute.Component<'admission.tuition-fee-row', true>;
    tuitionFeesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TUITION FEES'>;
  };
}

export interface AdmissionProceduresSection extends Struct.ComponentSchema {
  collectionName: 'components_admission_procedures_sections';
  info: {
    displayName: 'Admission Procedures Section';
    icon: 'clipboard-list';
  };
  attributes: {
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Admission Procedures'>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'GUIDELINES'>;
    registrationDescription: Schema.Attribute.Text;
    registrationTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Registration for Admission:'>;
    testsDescription: Schema.Attribute.Text;
    testsTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Admission Tests and Interviews:'>;
  };
}

export interface AdmissionTuitionFeeRow extends Struct.ComponentSchema {
  collectionName: 'components_admission_tuition_fee_rows';
  info: {
    displayName: 'Tuition Fee Row';
    icon: 'file-invoice';
  };
  attributes: {
    amount: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String;
    level: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ClubsClubItem extends Struct.ComponentSchema {
  collectionName: 'components_clubs_club_items';
  info: {
    description: 'Student club or co-curricular society card';
    displayName: 'Club Item';
    icon: 'trophy';
  };
  attributes: {
    accentGradient: Schema.Attribute.String;
    badgeColor: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      [
        'Academic & Innovation',
        'Cultural & Arts',
        'Sports & Fitness',
        'Leadership & Service',
      ]
    > &
      Schema.Attribute.Required;
    clubId: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    location: Schema.Attribute.String;
    meetingSchedule: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactContactItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_items';
  info: {
    description: 'School contact info item (address, phone, email, hours)';
    displayName: 'Contact Item';
    icon: 'phone';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Text;
    values: Schema.Attribute.JSON;
  };
}

export interface ElementsLinkButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_link_buttons';
  info: {
    displayName: 'Link Button';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsPhoneEntry extends Struct.ComponentSchema {
  collectionName: 'components_elements_phone_entries';
  info: {
    displayName: 'Phone Entry';
    icon: 'phone';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'share';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'youtube', 'twitter', 'linkedin']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventsEventItem extends Struct.ComponentSchema {
  collectionName: 'components_events_event_items';
  info: {
    displayName: 'Event Item';
    icon: 'calendar';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'School Events',
        'Academic',
        'Sports',
        'Cultural',
        'Community',
        'Ceremony',
      ]
    > &
      Schema.Attribute.Required;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    day: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eventId: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    imageUrl: Schema.Attribute.String;
    month: Schema.Attribute.String;
    tag: Schema.Attribute.Enumeration<['upcoming', 'past']> &
      Schema.Attribute.DefaultTo<'upcoming'>;
    time: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    venue: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface GalleryGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_gallery_gallery_images';
  info: {
    displayName: 'Gallery Image';
    icon: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      ['Campus', 'Activities', 'Sports', 'Arts', 'Celebrations']
    > &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_home_about_sections';
  info: {
    displayName: 'About Section';
    icon: 'information';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link-button', false> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    paragraph1: Schema.Attribute.Text & Schema.Attribute.Required;
    paragraph2: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeAdmissionsCta extends Struct.ComponentSchema {
  collectionName: 'components_home_admissions_ctas';
  info: {
    displayName: 'Admissions CTA';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.Text & Schema.Attribute.Required;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'ADMISSIONS'>;
    primaryCta: Schema.Attribute.Component<'elements.link-button', false> &
      Schema.Attribute.Required;
    secondaryCta: Schema.Attribute.Component<'elements.link-button', false> &
      Schema.Attribute.Required;
  };
}

export interface HomeExcellenceBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_excellence_banners';
  info: {
    displayName: 'Excellence Banner';
    icon: 'award';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'20+ Years of Academic Excellence'>;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Excellence in Education'>;
    yearsEmblem: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'20+'>;
    yearsLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Years'>;
  };
}

export interface HomeFounderMessage extends Struct.ComponentSchema {
  collectionName: 'components_home_founder_messages';
  info: {
    displayName: 'Founder Message';
    icon: 'user';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link-button', false> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Message from the Founder,'>;
    paragraph1: Schema.Attribute.Text & Schema.Attribute.Required;
    paragraph2: Schema.Attribute.Text & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface HomeHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'layout';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"KIDS' FOUNDATION \u2022 IMPHAL">;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    headingLine1: Schema.Attribute.String & Schema.Attribute.Required;
    headingLine2: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.Component<'elements.link-button', false> &
      Schema.Attribute.Required;
    scrollIndicator: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SCROLL TO DISCOVER'>;
    secondaryCta: Schema.Attribute.Component<'elements.link-button', false> &
      Schema.Attribute.Required;
    slides: Schema.Attribute.Component<'home.hero-slide', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
  };
}

export interface HomeHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_slides';
  info: {
    displayName: 'Hero Slide';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    caption: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface HomeSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_home_section_headers';
  info: {
    displayName: 'Section Header';
    icon: 'bulletList';
  };
  attributes: {
    bottomLinkHref: Schema.Attribute.String;
    bottomLinkText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NewsNewsItem extends Struct.ComponentSchema {
  collectionName: 'components_news_news_items';
  info: {
    displayName: 'News Item';
    icon: 'newspaper';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'Circulars & Notices',
        'Academic & Exams',
        'Admissions',
        'Achievements',
        'Events & Culture',
      ]
    > &
      Schema.Attribute.Required;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    daysToShowLatest: Schema.Attribute.Integer;
    documentName: Schema.Attribute.String;
    documentSize: Schema.Attribute.String;
    documentType: Schema.Attribute.String;
    fullContent: Schema.Attribute.JSON;
    hasDocument: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isLatest: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    newsId: Schema.Attribute.String;
    noticeImage: Schema.Attribute.Media<'images'>;
    noticeImageUrl: Schema.Attribute.String;
    noticePdf: Schema.Attribute.Media<'files'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PublicationsPublicationCard extends Struct.ComponentSchema {
  collectionName: 'components_publications_publication_cards';
  info: {
    displayName: 'Publication Card';
    icon: 'book';
  };
  attributes: {
    academicYear: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      [
        'Magazine & Newsletter',
        'Academic Handbook',
        'Annual Report',
        'Parent & Student Guide',
      ]
    > &
      Schema.Attribute.Required;
    coverImage: Schema.Attribute.Media<'images'>;
    coverImageUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    downloadFileName: Schema.Attribute.String;
    edition: Schema.Attribute.String;
    editorOrAuthor: Schema.Attribute.String;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    fileSize: Schema.Attribute.String;
    format: Schema.Attribute.String & Schema.Attribute.DefaultTo<'PDF'>;
    highlights: Schema.Attribute.JSON;
    language: Schema.Attribute.String;
    pages: Schema.Attribute.Integer;
    pdfFile: Schema.Attribute.Media<'files'>;
    pubId: Schema.Attribute.String;
    publishedDate: Schema.Attribute.Date;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedActivityItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_activity_items';
  info: {
    displayName: 'Activity Item';
    icon: 'heart';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedGalleryCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_cards';
  info: {
    displayName: 'Gallery Card';
    icon: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      ['Sports', 'Culture', 'Education', 'Arts']
    >;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedLearningStage extends Struct.ComponentSchema {
  collectionName: 'components_shared_learning_stages';
  info: {
    displayName: 'Learning Stage';
    icon: 'book';
  };
  attributes: {
    activities: Schema.Attribute.JSON;
    boldIntro: Schema.Attribute.String;
    description: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    stageId: Schema.Attribute.String;
    subLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    displayName: 'Text Item';
    icon: 'file';
  };
  attributes: {
    description: Schema.Attribute.Text;
    keyId: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'admission.enquiry-section': AdmissionEnquirySection;
      'admission.fee-row': AdmissionFeeRow;
      'admission.fee-structure-section': AdmissionFeeStructureSection;
      'admission.procedures-section': AdmissionProceduresSection;
      'admission.tuition-fee-row': AdmissionTuitionFeeRow;
      'clubs.club-item': ClubsClubItem;
      'contact.contact-item': ContactContactItem;
      'elements.link-button': ElementsLinkButton;
      'elements.phone-entry': ElementsPhoneEntry;
      'elements.social-link': ElementsSocialLink;
      'events.event-item': EventsEventItem;
      'gallery.gallery-image': GalleryGalleryImage;
      'home.about-section': HomeAboutSection;
      'home.admissions-cta': HomeAdmissionsCta;
      'home.excellence-banner': HomeExcellenceBanner;
      'home.founder-message': HomeFounderMessage;
      'home.hero-section': HomeHeroSection;
      'home.hero-slide': HomeHeroSlide;
      'home.section-header': HomeSectionHeader;
      'news.news-item': NewsNewsItem;
      'publications.publication-card': PublicationsPublicationCard;
      'shared.activity-item': SharedActivityItem;
      'shared.gallery-card': SharedGalleryCard;
      'shared.learning-stage': SharedLearningStage;
      'shared.text-item': SharedTextItem;
    }
  }
}
