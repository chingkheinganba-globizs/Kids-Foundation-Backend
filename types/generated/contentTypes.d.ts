import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    adminPermissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::permission'
    >;
    adminUserOwner: Schema.Attribute.Relation<'manyToOne', 'admin::user'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    kind: Schema.Attribute.Enumeration<['content-api', 'admin']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'content-api'>;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    apiToken: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    apiTokens: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordTokenExpiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutPageAboutPage extends Struct.SingleTypeSchema {
  collectionName: 'about_pages';
  info: {
    description: 'About Us page content: Story, Pillars, and Founder Message';
    displayName: 'About Page';
    pluralName: 'about-pages';
    singularName: 'about-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    breadcrumb: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    founderClosing: Schema.Attribute.Text;
    founderHeading: Schema.Attribute.String;
    founderImage: Schema.Attribute.Media<'images'>;
    founderInstitution: Schema.Attribute.String;
    founderName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Founder's Name">;
    founderParagraphs: Schema.Attribute.JSON;
    founderQuote: Schema.Attribute.Text;
    founderRole: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Founder & Chairman'>;
    founderTag: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"FOUNDER'S MESSAGE">;
    founderWelcome: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::about-page.about-page'
    > &
      Schema.Attribute.Private;
    pageTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'About Us'>;
    pillars: Schema.Attribute.Component<'shared.text-item', true>;
    publishedAt: Schema.Attribute.DateTime;
    storyBottomParagraphs: Schema.Attribute.JSON;
    storyHeading: Schema.Attribute.String & Schema.Attribute.Required;
    storyImage: Schema.Attribute.Media<'images'>;
    storyImageAlt: Schema.Attribute.String;
    storyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR STORY'>;
    storyTopParagraphs: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAdmissionPageAdmissionPage extends Struct.SingleTypeSchema {
  collectionName: 'admission_pages';
  info: {
    description: 'Admission page: Enquiry, Procedures, and Fee Structure sections';
    displayName: 'Admission Page';
    pluralName: 'admission-pages';
    singularName: 'admission-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bannerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Admission'>;
    breadcrumb: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    enquiry: Schema.Attribute.Component<'admission.enquiry-section', false> &
      Schema.Attribute.Required;
    feeStructure: Schema.Attribute.Component<
      'admission.fee-structure-section',
      false
    > &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::admission-page.admission-page'
    > &
      Schema.Attribute.Private;
    procedures: Schema.Attribute.Component<
      'admission.procedures-section',
      false
    > &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCampusPageCampusPage extends Struct.SingleTypeSchema {
  collectionName: 'campus_pages';
  info: {
    description: 'Campus facilities, gallery, and virtual tour video';
    displayName: 'Campus Page';
    pluralName: 'campus-pages';
    singularName: 'campus-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    breadcrumb: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    facilities: Schema.Attribute.JSON;
    galleryImages: Schema.Attribute.Component<'shared.gallery-card', true>;
    introDescription: Schema.Attribute.Text;
    introHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CAMPUS'>;
    introTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our campus at a glance'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::campus-page.campus-page'
    > &
      Schema.Attribute.Private;
    pageTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Campus'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Take a virtual tour of our campus'>;
    videoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'School Campus'>;
    youtubeId: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'2W6amTtl77s'>;
  };
}

export interface ApiClubsPageClubsPage extends Struct.SingleTypeSchema {
  collectionName: 'clubs_pages';
  info: {
    description: 'Clubs and Activities page: banner, philosophy overview, category filters, and club cards';
    displayName: 'Clubs and Activities Page';
    pluralName: 'clubs-pages';
    singularName: 'clubs-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<'images'>;
    bannerImageUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/images/pages_hero_background_image/sports_and_arts_hero.jpg'>;
    bannerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Clubs & Activities'>;
    breadcrumb: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    clubs: Schema.Attribute.Component<'clubs.club-item', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::clubs-page.clubs-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactPageContactPage extends Struct.SingleTypeSchema {
  collectionName: 'contact_pages';
  info: {
    description: 'Contact page: banner, contact details, form info, and campus map';
    displayName: 'Contact Page';
    pluralName: 'contact-pages';
    singularName: 'contact-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<'images'>;
    bannerImageUrl: Schema.Attribute.String;
    bannerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contact Us'>;
    breadcrumb: Schema.Attribute.JSON;
    contactItems: Schema.Attribute.Component<'contact.contact-item', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    formDescription: Schema.Attribute.Text;
    formHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Send Us a Message'>;
    formSubmitLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Send Message'>;
    getInTouchDescription: Schema.Attribute.Text;
    getInTouchHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"We'd love to hear from you">;
    getInTouchLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GET IN TOUCH'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-page.contact-page'
    > &
      Schema.Attribute.Private;
    mapAddress: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Airport Road, NH 150, Ghari, Imphal, Manipur 795001'>;
    mapDirectUrl: Schema.Attribute.Text;
    mapEmbedUrl: Schema.Attribute.Text;
    mapHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Visit Our Campus'>;
    mapLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FIND US'>;
    mapTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Kids\u2019 Foundation School | Manipur Location'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventsPageEventsPage extends Struct.SingleTypeSchema {
  collectionName: 'events_pages';
  info: {
    description: 'Events page: banner, header, category filters, and event cards';
    displayName: 'Events Page';
    pluralName: 'events-pages';
    singularName: 'events-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bannerTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Events'>;
    breadcrumb: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    events: Schema.Attribute.Component<'events.event-item', true>;
    filterOptions: Schema.Attribute.JSON;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::events-page.events-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sectionHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"What's happening at Kids' Foundation">;
    sectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ALL EVENTS'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFooterFooter extends Struct.SingleTypeSchema {
  collectionName: 'footers';
  info: {
    description: 'Global website footer, school credentials, links, contacts and branding';
    displayName: 'Footer';
    pluralName: 'footers';
    singularName: 'footer';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    cbseAffiliationNo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1230049'>;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    footerBg: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    importantLinks: Schema.Attribute.Component<'elements.link-button', true>;
    landline: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::footer.footer'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    phones: Schema.Attribute.Component<'elements.phone-entry', true>;
    publishedAt: Schema.Attribute.DateTime;
    quickLinks: Schema.Attribute.Component<'elements.link-button', true>;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
    tagline: Schema.Attribute.Text & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGalleryPageGalleryPage extends Struct.SingleTypeSchema {
  collectionName: 'gallery_pages';
  info: {
    description: 'Photo Gallery page: banner, header, category filters, and curated photos';
    displayName: 'Gallery Page';
    pluralName: 'gallery-pages';
    singularName: 'gallery-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bannerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Photo Gallery'>;
    breadcrumb: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    images: Schema.Attribute.Component<'gallery.gallery-image', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gallery-page.gallery-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sectionDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'A glimpse into the moments, experiences and achievements that make school life memorable.'>;
    sectionHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Life at Kids' Foundation">;
    sectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MOMENTS & MEMORIES'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGlobalSettingGlobalSetting extends Struct.SingleTypeSchema {
  collectionName: 'global_settings';
  info: {
    description: 'Global school identity, CBSE compliance, contacts and branding used across Header and Footer';
    displayName: 'Global Setting';
    pluralName: 'global-settings';
    singularName: 'global-setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    cbseAffiliationNo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1230049'>;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    estdYear: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2005'>;
    footerBg: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    landline: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global-setting.global-setting'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Imphal, Manipur'>;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    phones: Schema.Attribute.Component<'elements.phone-entry', true> &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    schoolName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Kids' Foundation">;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
    tagline: Schema.Attribute.Text & Schema.Attribute.Required;
    topNoticeLink: Schema.Attribute.String;
    topNoticeText: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Struct.SingleTypeSchema {
  collectionName: 'headers';
  info: {
    description: 'Global website header, navigation menu, branding and announcement bar';
    displayName: 'Header';
    pluralName: 'headers';
    singularName: 'header';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actionButtons: Schema.Attribute.Component<'elements.link-button', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header.header'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Imphal, Manipur'>;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    moreLinks: Schema.Attribute.Component<'elements.link-button', true>;
    navigation: Schema.Attribute.Component<'elements.link-button', true>;
    publishedAt: Schema.Attribute.DateTime;
    schoolName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Kids' Foundation">;
    topNoticeLink: Schema.Attribute.String;
    topNoticeText: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomePageHomePage extends Struct.SingleTypeSchema {
  collectionName: 'home_pages';
  info: {
    description: 'Homepage singleton managing hero, excellence banner, about, headers, founder message, and admissions CTA';
    displayName: 'Home Page';
    pluralName: 'home-pages';
    singularName: 'home-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    excellenceBanner: Schema.Attribute.Component<
      'home.excellence-banner',
      false
    > &
      Schema.Attribute.Required;
    hero: Schema.Attribute.Component<'home.hero-section', false> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::home-page.home-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLearningPageLearningPage extends Struct.SingleTypeSchema {
  collectionName: 'learning_pages';
  info: {
    description: 'Learning / Academic approach page content';
    displayName: 'Learning Page';
    pluralName: 'learning-pages';
    singularName: 'learning-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    breadcrumb: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    introHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Building the right foundation through learning'>;
    introLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR APPROACH'>;
    introText: Schema.Attribute.Text & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::learning-page.learning-page'
    > &
      Schema.Attribute.Private;
    pageTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Learning'>;
    publishedAt: Schema.Attribute.DateTime;
    stages: Schema.Attribute.Component<'shared.learning-stage', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsPageNewsPage extends Struct.SingleTypeSchema {
  collectionName: 'news_pages';
  info: {
    description: 'News, updates, circulars, and announcements page';
    displayName: 'News and Updates Page';
    pluralName: 'news-pages';
    singularName: 'news-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    articles: Schema.Attribute.Component<'news.news-item', true>;
    bannerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'News & Updates'>;
    breadcrumb: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    latestDaysThreshold: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<14>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-page.news-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sectionHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'News, Circulars & Official Notices'>;
    sectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LATEST ANNOUNCEMENTS'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPublicationsPagePublicationsPage
  extends Struct.SingleTypeSchema {
  collectionName: 'publications_pages';
  info: {
    description: 'School publications, annual magazines, academic handbooks and reports';
    displayName: 'Publications Page';
    pluralName: 'publications-pages';
    singularName: 'publications-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<'images'>;
    bannerImageUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/images/pages_hero_background_image/news_hero.jpg'>;
    bannerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Publications'>;
    breadcrumb: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::publications-page.publications-page'
    > &
      Schema.Attribute.Private;
    publications: Schema.Attribute.Component<
      'publications.publication-card',
      true
    >;
    publishedAt: Schema.Attribute.DateTime;
    sectionDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Browse and download official school publications, annual magazines, academic handbooks, and guides.'>;
    sectionHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'School Publications & Handbooks'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSportsAndArtsPageSportsAndArtsPage
  extends Struct.SingleTypeSchema {
  collectionName: 'sports_and_arts_pages';
  info: {
    description: 'Sports and Arts page: activities, facilities callout, and gallery';
    displayName: 'Sports and Arts Page';
    pluralName: 'sports-and-arts-pages';
    singularName: 'sports-and-arts-page';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    activities: Schema.Attribute.Component<'shared.activity-item', true>;
    breadcrumb: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    facilitiesCallout: Schema.Attribute.JSON;
    gallery: Schema.Attribute.Component<'shared.gallery-card', true>;
    introLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SPORTS & ARTS'>;
    introLead: Schema.Attribute.Text;
    introTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sports & Arts'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sports-and-arts-page.sports-and-arts-page'
    > &
      Schema.Attribute.Private;
    pageTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sports & Arts'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    focalPoint: Schema.Attribute.JSON;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about-page.about-page': ApiAboutPageAboutPage;
      'api::admission-page.admission-page': ApiAdmissionPageAdmissionPage;
      'api::campus-page.campus-page': ApiCampusPageCampusPage;
      'api::clubs-page.clubs-page': ApiClubsPageClubsPage;
      'api::contact-page.contact-page': ApiContactPageContactPage;
      'api::events-page.events-page': ApiEventsPageEventsPage;
      'api::footer.footer': ApiFooterFooter;
      'api::gallery-page.gallery-page': ApiGalleryPageGalleryPage;
      'api::global-setting.global-setting': ApiGlobalSettingGlobalSetting;
      'api::header.header': ApiHeaderHeader;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::learning-page.learning-page': ApiLearningPageLearningPage;
      'api::news-page.news-page': ApiNewsPageNewsPage;
      'api::publications-page.publications-page': ApiPublicationsPagePublicationsPage;
      'api::sports-and-arts-page.sports-and-arts-page': ApiSportsAndArtsPageSportsAndArtsPage;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
