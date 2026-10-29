const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

async function uploadLocalFile(strapi, filePath, fileInfo = {}) {
  if (!fs.existsSync(filePath)) {
    strapi.log.warn(`[Seed] Local file not found: ${filePath}`);
    return null;
  }

  const stat = fs.statSync(filePath);
  const filename = path.basename(filePath);
  const mimetype = mime.lookup(filePath) || 'application/octet-stream';

  const fileData = {
    filepath: filePath,
    originalFilename: filename,
    size: stat.size,
    mimetype,
  };

  try {
    const uploadService = strapi.plugin('upload').service('upload');
    const [uploaded] = await uploadService.upload({
      data: {
        fileInfo: {
          name: fileInfo.name || filename,
          alternativeText: fileInfo.alternativeText || filename,
          caption: fileInfo.caption || '',
        },
      },
      files: fileData,
    });
    strapi.log.info(`[Seed] Uploaded media: ${filename} (ID: ${uploaded.id}, URL: ${uploaded.url})`);
    return uploaded;
  } catch (err) {
    strapi.log.error(`[Seed] Error uploading ${filename}: ${err.message}`);
    return null;
  }
}

async function seedHomepageContent(strapi) {
  const imagesBaseDir = path.resolve(strapi.dirs.app.root, '../frontend/public/images');
  strapi.log.info(`[Seed] Verified images base path: ${imagesBaseDir}`);

  // 1. Global Setting
  const globalCount = await strapi.documents('api::global-setting.global-setting').count();
  if (globalCount === 0) {
    strapi.log.info('[Seed] Populating Global Setting with real media...');
    const logoMedia = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'logo.png'), {
      name: 'Kids Foundation Logo',
      alternativeText: "Kids' Foundation School Crest Logo",
    });
    const footerBgMedia = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'grass-hill.png'), {
      name: 'Footer Grass Hill Landscape',
      alternativeText: 'Green grass hill scenic landscape',
    });

    await strapi.documents('api::global-setting.global-setting').create({
      data: {
        schoolName: "Kids' Foundation",
        location: "Imphal, Manipur",
        tagline: '"A strong foundation for curious, confident and capable learners." Estd. 2005.',
        cbseAffiliationNo: "1230049",
        estdYear: "2005",
        address: "Airport Road, Ghari, Imphal-West, Manipur - 795001, India",
        phones: [
          { label: "Mobile 1", number: "+91 8974426944" },
          { label: "Mobile 2", number: "+91 8787302983" },
        ],
        landline: "0385-2456231",
        email: "kidsfoundationghari@gmail.com",
        topNoticeText: "",
        topNoticeLink: "",
        logo: logoMedia?.id,
        footerBg: footerBgMedia?.id,
        socialLinks: [
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "instagram", url: "https://instagram.com" },
          { platform: "youtube", url: "https://youtube.com" },
        ],
        copyright: "© 2026 Kids' Foundation School, Imphal. All rights reserved. Designed with care.",
      },
    });
    strapi.log.info('[Seed] Global Setting created with logo and footerBg media.');
  } else {
    strapi.log.info('[Seed] Global Setting already exists, skipping.');
  }

  // 2. Academic Stages
  const stagesCount = await strapi.documents('api::academic-stage.academic-stage').count();
  if (stagesCount === 0) {
    strapi.log.info('[Seed] Populating Academic Stages with images...');
    const stageItems = [
      {
        stageId: "early-years",
        tabNumber: "01.",
        tabLabel: "Foundational",
        subLabel: "PRE-NURSERY • NURSERY • LKG • UKG • AGES 3–5",
        heading: "Nurturing wonder & play",
        description: "In the early years, we lay the foundation for school life through play, exploration and meaningful experiences. Children develop curiosity, confidence and early social-emotional skills in a warm, welcoming environment.",
        tags: ["Curiosity & Play", "Music & Movement", "Storytelling"],
        cta: { label: "Explore Early Years →", href: "/learning#pre-primary", isExternal: false },
        imageFile: "academic-early-years.jpg",
        imageAlt: "Happy early years child in Kids' Foundation school uniform smiling in classroom",
        sortOrder: 1,
      },
      {
        stageId: "primary",
        tabNumber: "02.",
        tabLabel: "Preparatory",
        subLabel: "CLASSES I – V • AGES 6–10",
        heading: "Building core skills & discovery",
        description: "Primary school deepens foundational literacy, numeracy, and scientific inquiry. Through experiential learning, interactive projects, and creative problem solving, students gain enthusiasm and lasting intellectual confidence.",
        tags: ["Experiential Learning", "Foundational Numeracy", "Creative Arts"],
        cta: { label: "Explore Primary School →", href: "/learning#primary", isExternal: false },
        imageFile: "academic-primary.jpg",
        imageAlt: "Primary students participating actively in group learning at Kids' Foundation",
        sortOrder: 2,
      },
      {
        stageId: "middle",
        tabNumber: "03.",
        tabLabel: "Middle School",
        subLabel: "CLASSES VI – VIII • AGES 11–13",
        heading: "Expanding horizons & inquiry",
        description: "Middle school strengthens conceptual understanding and independent thinking. Students explore diverse subjects, collaborate on projects, and develop problem-solving skills in a supportive environment.",
        tags: ["Inquiry-Based Learning", "Collaboration", "Project Work"],
        cta: { label: "Explore Middle School →", href: "/learning#middle", isExternal: false },
        imageFile: "academic-secondary.jpg",
        imageAlt: "Middle school students learning at Kids' Foundation",
        sortOrder: 3,
      },
      {
        stageId: "secondary",
        tabNumber: "04.",
        tabLabel: "Secondary",
        subLabel: "CLASSES VI – X • AGES 11–15",
        heading: "Fostering analytical thinking",
        description: "In the middle and secondary stages, students engage deeply with modern science, humanities, and technology. Rigorous academic frameworks combine with sports, arts, and leadership training to prepare students for real-world excellence.",
        tags: ["STEM Labs", "Critical Thinking", "Leadership & Sports"],
        cta: { label: "Explore Secondary School →", href: "/learning#secondary", isExternal: false },
        imageFile: "academic-senior-secondary.jpg",
        imageAlt: "Secondary school students conducting experiments in Kids' Foundation science lab",
        sortOrder: 4,
      },
    ];

    for (const stage of stageItems) {
      const media = await uploadLocalFile(strapi, path.join(imagesBaseDir, stage.imageFile), {
        name: stage.heading,
        alternativeText: stage.imageAlt,
      });

      await strapi.documents('api::academic-stage.academic-stage').create({
        data: {
          stageId: stage.stageId,
          tabNumber: stage.tabNumber,
          tabLabel: stage.tabLabel,
          subLabel: stage.subLabel,
          heading: stage.heading,
          description: stage.description,
          tags: stage.tags,
          cta: stage.cta,
          image: media?.id,
          sortOrder: stage.sortOrder,
        },
        status: 'published',
      });
      strapi.log.info(`[Seed] Created stage: ${stage.tabLabel}`);
    }
  } else {
    strapi.log.info('[Seed] Academic Stages already exist, skipping.');
  }

  // 3. News Articles
  const newsCount = await strapi.documents('api::news-article.news-article').count();
  if (newsCount === 0) {
    strapi.log.info('[Seed] Populating News Articles & Events with media...');
    const newsItems = [
      {
        title: "Inspiring better teaching, together",
        slug: "inspiring-better-teaching-together",
        category: "events",
        publishedDate: "2026-08-18",
        excerpt: "An inspiring workshop blended experience with modern teaching practices, offering fresh perspectives and practical strategies for creating stronger, more effective classrooms.",
        imageFile: "news-teaching-workshop.jpg",
        imageAlt: "Teachers participating in professional workshop at Kids' Foundation",
        isFeatured: true,
      },
      {
        title: "Celebrating culture, creativity & expression",
        slug: "celebrating-culture-creativity-expression",
        category: "events",
        publishedDate: "2026-07-30",
        excerpt: "Students came together for the Cultural and Literary Meet, celebrating creativity, language, culture and the confidence to express themselves.",
        imageFile: "news-cultural-meet.jpg",
        imageAlt: "Students dressed in traditional Manipuri attire at Cultural Meet",
        isFeatured: true,
      },
      {
        title: "Celebrating Our Scholarship Awardees",
        slug: "celebrating-our-scholarship-awardees",
        category: "events",
        publishedDate: "2026-07-15",
        excerpt: "We are proud to celebrate our scholarship awardees and their commitment to learning. May this achievement inspire them to keep reaching higher.",
        imageFile: "news-scholarship.jpg",
        imageAlt: "Scholarship awardee student receiving certificate at Kids' Foundation",
        isFeatured: true,
      },
      {
        title: "New Academic Year 2026–27 Orientation Seminar",
        slug: "new-academic-year-2026-27-orientation-seminar",
        category: "news",
        publishedDate: "2026-08-18",
        excerpt: "Registration is now officially open for Pre-Nursery through Grade XI. Explore our holistic values-led curriculum and modern campus facilities.",
        imageFile: "campus-aerial.jpg",
        imageAlt: "Kids' Foundation school building and campus grounds",
        isFeatured: false,
      },
      {
        title: "Pre-Board Examination Schedule Released for Class X & XII",
        slug: "pre-board-examination-schedule-released",
        category: "circular",
        publishedDate: "2026-08-05",
        excerpt: "The detailed timetable for CBSE pre-board evaluations has been circulated to all senior students and parents.",
        imageFile: "gallery-exam-hall.jpg",
        imageAlt: "Examination hall layout for senior exams",
        isFeatured: false,
      },
      {
        title: "Annual Sports Meet & Inter-House Athletic Championships",
        slug: "annual-sports-meet-inter-house-championships",
        category: "events",
        publishedDate: "2026-07-22",
        excerpt: "Join us for three thrilling days of track, field, taekwondo exhibitions and community spirit on the school grounds.",
        imageFile: "gallery-taekwondo.jpg",
        imageAlt: "Taekwondo demonstrations at annual sports meet",
        isFeatured: false,
      },
    ];

    for (const item of newsItems) {
      const media = await uploadLocalFile(strapi, path.join(imagesBaseDir, item.imageFile), {
        name: item.title,
        alternativeText: item.imageAlt,
      });

      await strapi.documents('api::news-article.news-article').create({
        data: {
          title: item.title,
          slug: item.slug,
          category: item.category,
          publishedDate: item.publishedDate,
          excerpt: item.excerpt,
          coverImage: media?.id,
          isFeatured: item.isFeatured,
        },
        status: 'published',
      });
      strapi.log.info(`[Seed] Created news article: ${item.title}`);
    }
  } else {
    strapi.log.info('[Seed] News Articles already exist, skipping.');
  }

  // 4. Gallery Items
  const galleryCount = await strapi.documents('api::gallery-item.gallery-item').count();
  if (galleryCount === 0) {
    strapi.log.info('[Seed] Populating Gallery Items with media...');
    const galleryItems = [
      {
        title: "Hands-on Science & Laboratory Inquiry",
        category: "Activities",
        imageFile: "gallery-science-lab.jpg",
        imageAlt: "Students performing chemistry and biology experiments in the science lab",
        isFeaturedOnHome: true,
        sortOrder: 1,
      },
      {
        title: "Taekwondo & Martial Arts Discipline",
        category: "Sports",
        imageFile: "gallery-taekwondo.jpg",
        imageAlt: "Students practicing taekwondo martial arts in the green school campus",
        isFeaturedOnHome: true,
        sortOrder: 2,
      },
      {
        title: "Classical Manipuri Cultural Dance",
        category: "Arts",
        imageFile: "gallery-dance.jpg",
        imageAlt: "Student performing classical Manipuri cultural dance at annual literary meet",
        isFeaturedOnHome: true,
        sortOrder: 3,
      },
      {
        title: "Academic Focus & Examination Hall",
        category: "Activities",
        imageFile: "gallery-exam-hall.jpg",
        imageAlt: "Students sitting attentively during examination in the school hall",
        isFeaturedOnHome: true,
        sortOrder: 4,
      },
      {
        title: "Faculty, Staff & Student Community",
        category: "Campus",
        imageFile: "gallery-school-group.jpg",
        imageAlt: "Kids' Foundation faculty members and students gathered in front of school building",
        isFeaturedOnHome: true,
        sortOrder: 5,
      },
      {
        title: "Eco-Friendly Sprawling Campus",
        category: "Campus",
        imageFile: "campus-aerial.jpg",
        imageAlt: "Aerial view of Kids' Foundation circular modern school campus",
        isFeaturedOnHome: true,
        sortOrder: 6,
      },
    ];

    for (const item of galleryItems) {
      const media = await uploadLocalFile(strapi, path.join(imagesBaseDir, item.imageFile), {
        name: item.title,
        alternativeText: item.imageAlt,
      });

      await strapi.documents('api::gallery-item.gallery-item').create({
        data: {
          title: item.title,
          category: item.category,
          image: media?.id,
          isFeaturedOnHome: item.isFeaturedOnHome,
          sortOrder: item.sortOrder,
        },
        status: 'published',
      });
      strapi.log.info(`[Seed] Created gallery item: ${item.title}`);
    }
  } else {
    strapi.log.info('[Seed] Gallery Items already exist, skipping.');
  }

  // 5. Home Page Singleton
  const homeCount = await strapi.documents('api::home-page.home-page').count();
  if (homeCount === 0) {
    strapi.log.info('[Seed] Populating Home Page Singleton with real media...');

    // Upload Hero Slides
    const bannerDir = path.join(imagesBaseDir, 'banner_images');
    const slide1Media = await uploadLocalFile(strapi, path.join(bannerDir, 'slider1.gif'), {
      name: "Kids' Foundation School - Welcome",
      alternativeText: "Kids' Foundation School - Welcome",
    });
    const slide2Media = await uploadLocalFile(strapi, path.join(bannerDir, 'slide1.jpg'), {
      name: "Kids' Foundation School - Campus Life",
      alternativeText: "Kids' Foundation School - Campus Life",
    });
    const slide3Media = await uploadLocalFile(strapi, path.join(bannerDir, 'banner.jpg'), {
      name: "Kids' Foundation School - Architecture",
      alternativeText: "Kids' Foundation School - Architecture",
    });
    const slide4Media = await uploadLocalFile(strapi, path.join(bannerDir, 'banner-1.jpg'), {
      name: "Kids' Foundation School - Students",
      alternativeText: "Kids' Foundation School - Students",
    });

    // Upload About Campus Aerial Image
    const aboutCampusMedia = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'campus-aerial.jpg'), {
      name: "Aerial view of Kids' Foundation school campus",
      alternativeText: "Aerial view of Kids' Foundation circular modern school campus",
    });

    // Upload Founder Photo
    const founderMedia = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'founder.png'), {
      name: "Founder Portrait",
      alternativeText: "Portrait of Kids' Foundation School Founder",
    });

    await strapi.documents('api::home-page.home-page').create({
      data: {
        hero: {
          badge: "KIDS' FOUNDATION • IMPHAL",
          headingLine1: "Where curious minds",
          headingLine2: "find their foundation.",
          description: "An engaging, values-led learning environment where children are encouraged to question, explore, create and grow with confidence.",
          primaryCta: { label: "Discover Our School", href: "/about", isExternal: false },
          secondaryCta: { label: "Admissions", href: "/admission", isExternal: false },
          scrollIndicator: "SCROLL TO DISCOVER",
          slides: [
            { media: slide1Media?.id, alt: "Kids' Foundation School - Welcome", caption: "Welcome to Kids' Foundation" },
            { media: slide2Media?.id, alt: "Kids' Foundation School - Campus Life", caption: "Vibrant Campus Life" },
            { media: slide3Media?.id, alt: "Kids' Foundation School - Architecture", caption: "State-of-the-art Infrastructure" },
            { media: slide4Media?.id, alt: "Kids' Foundation School - Students", caption: "Inspiring Young Minds" },
          ].filter(s => s.media),
        },
        excellenceBanner: {
          yearsEmblem: "20+",
          yearsLabel: "Years",
          subtitle: "Excellence in Education",
          heading: "20+ Years of Academic Excellence",
          description: "Nurturing curious, confident, and capable learners in Manipur since 2005.",
        },
        about: {
          label: "WELCOME TO KIDS' FOUNDATION",
          heading: "Learning that goes beyond the classroom.",
          paragraph1: "At Kids' Foundation, we believe education is about developing the whole child. Our learning environment encourages students to question, explore, collaborate and discover their own strengths.",
          paragraph2: "From the early years through senior school, we create opportunities for children to grow intellectually, socially, physically and emotionally — building not only knowledge, but the confidence and curiosity to use it.",
          cta: { label: "Discover Our Approach →", href: "/learning", isExternal: false },
          image: aboutCampusMedia?.id,
        },
        academicStagesHeader: {
          label: "ACADEMIC STAGES",
          heading: "A journey that grows with them.",
          description: "From their first steps into school to senior secondary, each stage builds curiosity, confidence and independence.",
          bottomLinkText: "",
          bottomLinkHref: "",
        },
        founderMessage: {
          heading: "Message from the Founder,",
          paragraph1: "The world is changing faster than ever. At Kids' Foundation, we believe education should go beyond academics — nurturing curiosity, confidence, creativity and the cognitive, social, physical, emotional and aesthetic growth of every child.",
          paragraph2: "With a world-class curriculum and supportive environment, we prepare children not just for examinations, but for life — as happy, lifelong learners ready to grow, adapt and contribute to the world.",
          cta: { label: "Learn more →", href: "/about#founder-message", isExternal: false },
          photo: founderMedia?.id,
        },
        newsSectionHeader: {
          label: "NEWS AND UPDATES",
          heading: "What's new at Kids' Foundation",
          description: "Stay up to date with important announcements, student achievements, school activities and events at Kids' Foundation.",
          bottomLinkText: "View all events →",
          bottomLinkHref: "/events",
        },
        gallerySectionHeader: {
          label: "GALLERY",
          heading: "Life at Kids' Foundation",
          description: "A glimpse into the moments, experiences and achievements that make school life memorable.",
          bottomLinkText: "View full gallery →",
          bottomLinkHref: "/gallery",
        },
        admissionsCta: {
          label: "ADMISSIONS",
          heading: "Give your child the\nFoundation to go further.",
          description: "Discover a school where learning is joyful, curiosity is encouraged, and every child is given room to grow.",
          primaryCta: { label: "Explore Admissions", href: "/admission", isExternal: false },
          secondaryCta: { label: "Get in Touch", href: "/contact", isExternal: false },
        },
      },
      status: 'published',
    });
    strapi.log.info('[Seed] Home Page singleton created and published with all media attached.');
  } else {
    strapi.log.info('[Seed] Home Page already exists, skipping.');
  }

  // 6. Header
  const headerCount = await strapi.documents('api::header.header').count();
  if (headerCount === 0) {
    strapi.log.info('[Seed] Populating Header single type...');
    const logoFile = await strapi.query('plugin::upload.file').findOne({ where: { name: { $contains: 'Logo' } } });
    await strapi.documents('api::header.header').create({
      data: {
        schoolName: "Kids' Foundation",
        location: "Imphal, Manipur",
        topNoticeText: "",
        topNoticeLink: "",
        logo: logoFile?.id,
        navigation: [
          { label: "Home", href: "/", isExternal: false },
          { label: "About", href: "/about", isExternal: false },
          { label: "Learning", href: "/learning", isExternal: false },
          { label: "Campus", href: "/campus", isExternal: false },
          { label: "Student life", href: "/gallery", isExternal: false },
          { label: "Admissions", href: "/admission", isExternal: false },
        ],
        moreLinks: [
          { label: "Clubs & Activities", href: "/clubs-and-activities", isExternal: false },
          { label: "Publications", href: "/news/publications", isExternal: false },
          { label: "Mandatory Public Disclosure", href: "/mandatory-public-disclosure", isExternal: false },
          { label: "Contact Us", href: "/contact", isExternal: false },
        ],
        actionButtons: [
          { label: "Get in Touch", href: "/contact", isExternal: false },
          { label: "Enquire Now", href: "/admission", isExternal: false },
        ],
      },
    });
    strapi.log.info('[Seed] Header single type populated.');
  } else {
    strapi.log.info('[Seed] Header already exists, skipping.');
  }

  // 7. Footer
  const footerCount = await strapi.documents('api::footer.footer').count();
  if (footerCount === 0) {
    strapi.log.info('[Seed] Populating Footer single type...');
    const logoFile = await strapi.query('plugin::upload.file').findOne({ where: { name: { $contains: 'Logo' } } });
    const footerBgFile = await strapi.query('plugin::upload.file').findOne({ where: { name: { $contains: 'Grass' } } });
    await strapi.documents('api::footer.footer').create({
      data: {
        tagline: '"A strong foundation for curious, confident and capable learners." Estd. 2005.',
        cbseAffiliationNo: "1230049",
        logo: logoFile?.id,
        footerBg: footerBgFile?.id,
        quickLinks: [
          { label: "About Our School", href: "/about", isExternal: false },
          { label: "Learning & Classes", href: "/learning", isExternal: false },
          { label: "Campus Facilities", href: "/campus", isExternal: false },
          { label: "Clubs & Activities", href: "/clubs-and-activities", isExternal: false },
          { label: "Sports & Arts", href: "/about/sports-and-arts", isExternal: false },
          { label: "Admissions Info", href: "/admission", isExternal: false },
          { label: "Photo Gallery", href: "/gallery", isExternal: false },
          { label: "Contact Us", href: "/contact", isExternal: false },
        ],
        importantLinks: [
          { label: "Mandatory Public Disclosure", href: "/mandatory-public-disclosure", isExternal: false },
          { label: "News and Updates", href: "/news", isExternal: false },
          { label: "Events", href: "/events", isExternal: false },
          { label: "Publications", href: "/news/publications", isExternal: false },
        ],
        address: "Airport Road, Ghari, Imphal-West, Manipur - 795001, India",
        phones: [
          { label: "Mobile 1", number: "+91 8974426944" },
          { label: "Mobile 2", number: "+91 8787302983" },
        ],
        landline: "0385-2456231",
        email: "kidsfoundationghari@gmail.com",
        socialLinks: [
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "instagram", url: "https://instagram.com" },
          { platform: "youtube", url: "https://youtube.com" },
        ],
        copyright: "© 2026 Kids' Foundation School, Imphal. All rights reserved. Designed with care.",
      },
    });
    strapi.log.info('[Seed] Footer single type populated.');
  } else {
    strapi.log.info('[Seed] Footer already exists, skipping.');
  }

  strapi.log.info('[Seed] Header and Footer seeding complete!');

  // 8. About Page
  const aboutCount = await strapi.documents('api::about-page.about-page').count();
  if (aboutCount === 0) {
    strapi.log.info('[Seed] Populating About Page single type...');
    const campusAerial = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'campus-aerial.jpg'), {
      name: 'Campus Aerial',
      alternativeText: "Aerial view of Kids' Foundation circular modern school campus",
    });
    const founderImg = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'founder.png'), {
      name: 'Founder Portrait',
      alternativeText: "Kids' Foundation Founder & Chairman",
    });

    await strapi.documents('api::about-page.about-page').create({
      data: {
        pageTitle: "About Us",
        breadcrumb: ["About"],
        storyLabel: "OUR STORY",
        storyHeading: "A foundation built on values, curiosity and care.",
        storyTopParagraphs: [
          "Kids' Foundation was established out of the ideology that children must be given an environment that makes them want to come to school every day, providing an atmosphere where learning becomes a joyful experience and offers a platform that let them discover their innate potential, at their own pace. At Kids' Foundation we provide a learning environment that inspires and motivates each child, and encourage them to explore limitless possibilities in their quest for knowledge.",
          "A co-educational school catering to holistic education for students of Pre-nursery to tenth standard in English medium, is authorized to offer CBSE program from Central Board of Secondary Education, New Delhi, India.",
        ],
        storyImage: campusAerial?.id,
        storyImageAlt: "Aerial view of Kids' Foundation circular modern school campus",
        storyBottomParagraphs: [
          "Spread over more than 2 acres of sprawling campus, the school is located at the heart of the town on Airport Road just a stone's throwaway from the International Airport. State-of-the-art infrastructure, value based education and the presence of our centuries old cultural ethos with the right blend of modernity, are the hallmarks of the institution.",
          "It is our promise to provide holistic development and learning opportunities in a lively environment, judiciously balancing academic excellence with Co-curricular proficiency. The school is supported by dedicated trained teachers who are always ready to channelize their energy and resources toward child-centered qualitative learning. Students are encouraged to develop skills that enable them to discover, authenticate and communicate concepts with clarity, accuracy and confidence. We challenge each student to reach their full potential as an enquires, knowledge seekers, critical thinkers, risk takers, and communicators, and to be principled, open-minded, caring, balanced and reflective in all that they do.",
          "The education system, besides providing an all-round education intellectually, socially, emotionally and physically, also offers guidance in critical thinking, social openness and in purposeful research. The school joins with parents and community to assist the students in acquiring knowledge and developing skills to become independent self-sufficient adults who will succeed and contribute responsibility in a global community.",
        ],
        pillars: [
          {
            keyId: "mission",
            title: "Our Mission",
            description: "Widen the Child's opportunities for the highest level of cognitive, social, physical, emotional and aesthetic growth while cultivating multiple intelligence.",
          },
          {
            keyId: "philosophy",
            title: "Our Philosophy",
            description: "The World is getting smaller everyday with the technology and communication explosion. The paradigm shift from local to global is a continuous process of change and the need.",
          },
          {
            keyId: "vision",
            title: "Our Vision",
            description: "Shaping happy, life-long learners who will succeed in and contribute to the global community.",
          },
        ],
        founderTag: "FOUNDER'S MESSAGE",
        founderHeading: "A Word from Our Founder",
        founderWelcome: "Welcome to Kids' Foundation School, Imphal.",
        founderParagraphs: [
          "At Kids' Foundation, we believe education is about developing the whole child — nurturing curiosity, confidence, creativity, and the cognitive, social, physical, emotional, and aesthetic growth of every young learner.",
          "The world is changing faster than ever, and our mission is to prepare children not merely for examinations, but for life. Through quality teaching, hands-on experiential learning, and a supportive, values-grounded environment, we nurture confident learners who are ready to adapt, excel, and contribute meaningfully to society.",
          "We encourage every learner to pursue academic excellence, cultivate a lifelong love for discovery, and step into the world with integrity and empathy.",
        ],
        founderQuote: "“Education is not merely the study of textbooks — it is the cultivation of curiosity, character, integrity, and joyful lifelong learning.”",
        founderClosing: "I warmly invite you to join our institution and become part of a community dedicated to academic distinction, holistic character, and the pursuit of excellence.",
        founderName: "Founder's Name",
        founderRole: "Founder & Chairman",
        founderInstitution: "Kids' Foundation School,\nImphal, Manipur",
        founderImage: founderImg?.id,
      },
    });
    strapi.log.info('[Seed] About Page single type populated.');
  } else {
    strapi.log.info('[Seed] About Page already exists, skipping.');
  }

  // 9. Learning Page
  const learningCount = await strapi.documents('api::learning-page.learning-page').count();
  if (learningCount === 0) {
    strapi.log.info('[Seed] Populating Learning Page single type...');
    const earlyYearsMedia = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'academic-early-years.jpg'), {
      name: 'Pre-primary Learning',
      alternativeText: 'Pre-primary students engaged in learning activities',
    });
    const primaryMedia = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'academic-primary.jpg'), {
      name: 'Primary Learning',
      alternativeText: 'Primary students in classroom activities',
    });
    const secondaryMedia = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'academic-secondary.jpg'), {
      name: 'Secondary Learning',
      alternativeText: 'Secondary students in focused learning environment',
    });

    await strapi.documents('api::learning-page.learning-page').create({
      data: {
        pageTitle: "Learning",
        breadcrumb: ["Learning"],
        introLabel: "OUR APPROACH",
        introHeading: "Building the right foundation through learning",
        introText: "We aim to provide our students, who are confident in their academic success and are developing socially, physically and psychologically, with a happy and engaging learning environment that is structured, collaborative and purposeful. Kids' Foundation is not about striving to be best means, but about getting students to be best they can be. We seek to develop students as individuals who achieve their full potential. Kids' Foundation is committed on building a complete personality—a person with a strong moral backbone and integrity. Thus, a promise to give your child the right foundation. Our learning technique is based on constructivism. We believe that each individual child has the potential to construct their own knowledge.",
        stages: [
          {
            stageId: "pre-primary",
            title: "PRE-PRIMARY LEARNING",
            description: [
              "Every child is born a discoverer propelled by the instinctive need to know more. Kids' Foundation early childhood is designed to encourage the natural curiosity and fearless sense of enquiry of children between the ages of 3 and 6. Our pre-primary learning curriculum and strategy is completely child centred and full of fun filled activities. On top of the usual curriculum we have included:",
            ],
            activities: [
              "DANCES",
              "MUSIC",
              "YOGA",
              "AEROBICS",
              "STORY TELLING CLASSES",
              "BIRD FEEDING/ FISH FEEDING CLASSES",
            ],
            bottomText: "These activities are included so that children are exposed to an all-round development of their potentials. They are encouraged to be in sync with nature.",
            image: earlyYearsMedia?.id,
            imageAlt: "Pre-primary students engaged in learning activities",
          },
          {
            stageId: "primary",
            title: "PRIMARY LEARNING",
            boldIntro: "The freedom to question is the freedom to learn.",
            description: [
              "Kids' Foundation recognizes the importance of preserving the innate curiosity of early childhood throughout primary years. The primary classes are introduced to self-study and individualized construction of knowledge. Students are exposed to the different modes of learning like group discussion, pair activities and brain storming. Technologies are incorporated into the teaching modes for elaboration of understanding and comprehension.",
            ],
            image: primaryMedia?.id,
            imageAlt: "Primary students in classroom activities",
          },
          {
            stageId: "secondary",
            title: "SECONDARY LEARNING",
            boldIntro: "Education must be multi-dimensional because every child innately is.",
            description: [
              "The middle years are a challenging time of transition for learners as they move from childhood to adolescence. This crucial period of personal, social, physical and intellectual growth is marked by uncertainty on one hand and increasing maturity on the other. In conformance to the CBSE directives, KIDS' FOUNDATION is delivering a holistic learning approach. Primary importance is given to DISCIPLINE, ATTENDANCE, SENSITIVITY, BEHAVIOUR, VALUES and other co-scholastic activities which will cater to the needs of the community and build wholesome personalities of students. Martial Arts, Arts and Crafts, and Elocution are given importance. For scholastic learning, quizzes and debates based on the curriculum and syllabus is organized. Project works and assignments are part and parcel of the learning tasks.",
            ],
            image: secondaryMedia?.id,
            imageAlt: "Secondary students in focused learning environment",
          },
        ],
      },
    });
    strapi.log.info('[Seed] Learning Page single type populated.');
  } else {
    strapi.log.info('[Seed] Learning Page already exists, skipping.');
  }

  // 10. Campus Page
  const campusCount = await strapi.documents('api::campus-page.campus-page').count();
  if (campusCount === 0) {
    strapi.log.info('[Seed] Populating Campus Page single type...');
    const campusAerial = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'campus-aerial.jpg'), {
      name: 'Campus Aerial',
      alternativeText: "Aerial view of Kids' Foundation campus",
    });
    const heroBg = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'hero-bg.jpg'), {
      name: 'Campus Main Building',
      alternativeText: "Kids' Foundation main building",
    });
    const heroClean = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'hero-clean.jpg'), {
      name: 'Campus Exterior',
      alternativeText: "Campus building exterior",
    });
    const schoolGroup = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-school-group.jpg'), {
      name: 'School Group',
      alternativeText: "School community gathering",
    });
    const examHall = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-exam-hall.jpg'), {
      name: 'Exam Hall',
      alternativeText: "Campus examination hall",
    });
    const scienceLab = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-science-lab.jpg'), {
      name: 'Science Lab',
      alternativeText: "Science laboratory",
    });
    const sportsGround = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-taekwondo.jpg'), {
      name: 'Sports Grounds',
      alternativeText: "Sports grounds",
    });

    await strapi.documents('api::campus-page.campus-page').create({
      data: {
        pageTitle: "Campus",
        breadcrumb: ["Campus"],
        introHeading: "CAMPUS",
        introTitle: "Our campus at a glance",
        introDescription: "Spread over one lakh sq. feet area, Kids' Foundation offers a campus that is spacious, purpose-built, safe and highly conducive to learning. We are conveniently located 5 minutes from our main market Paona Bazar, Imphal, and next to Imphal International Airport. The campus includes:",
        facilities: [
          "Administrative Block",
          "Primary Block",
          "Secondary Block",
          "Recreation Block",
          "Higher Secondary Block (under construction)",
          "Cafeteria",
          "Mini Basketball Court",
          "Volleyball Court",
          "Mini Soccer Field",
        ],
        galleryImages: [
          { image: campusAerial?.id, imageUrl: "/images/campus-aerial.jpg", alt: "Aerial view of Kids' Foundation campus", title: "Aerial view of Kids' Foundation campus" },
          { image: heroBg?.id, imageUrl: "/images/hero-bg.jpg", alt: "Kids' Foundation main building", title: "Kids' Foundation main building" },
          { image: heroClean?.id, imageUrl: "/images/hero-clean.jpg", alt: "Campus building exterior", title: "Campus building exterior" },
          { image: schoolGroup?.id, imageUrl: "/images/gallery-school-group.jpg", alt: "School community gathering", title: "School community gathering" },
          { image: examHall?.id, imageUrl: "/images/gallery-exam-hall.jpg", alt: "Campus examination hall", title: "Campus examination hall" },
          { image: scienceLab?.id, imageUrl: "/images/gallery-science-lab.jpg", alt: "Science laboratory", title: "Science laboratory" },
          { image: sportsGround?.id, imageUrl: "/images/gallery-taekwondo.jpg", alt: "Sports grounds", title: "Sports grounds" },
        ],
        videoTitle: "School Campus",
        youtubeId: "2W6amTtl77s",
        videoDescription: "Take a virtual tour of our campus",
      },
    });
    strapi.log.info('[Seed] Campus Page single type populated.');
  } else {
    strapi.log.info('[Seed] Campus Page already exists, skipping.');
  }

  // 11. Sports & Arts Page
  const sportsCount = await strapi.documents('api::sports-and-arts-page.sports-and-arts-page').count();
  if (sportsCount === 0) {
    strapi.log.info('[Seed] Populating Sports & Arts Page single type...');
    const taekwondo = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-taekwondo.jpg'), {
      name: 'Karate Training',
      alternativeText: "Karate Training",
    });
    const dance = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-dance.jpg'), {
      name: 'Cultural Performances',
      alternativeText: "Cultural Performances",
    });
    const scienceLab = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-science-lab.jpg'), {
      name: 'Innovation & Creativity',
      alternativeText: "Innovation & Creativity",
    });
    const schoolGroup = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'gallery-school-group.jpg'), {
      name: 'Inter House Football',
      alternativeText: "Inter House Football",
    });
    const culturalMeet = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'news-cultural-meet.jpg'), {
      name: 'Cultural Day',
      alternativeText: "Cultural Day",
    });
    const aboutCampus = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'about-campus.jpg'), {
      name: 'Basketball',
      alternativeText: "Basketball",
    });
    const workshop = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'news-workshop.jpg'), {
      name: 'Music Classes',
      alternativeText: "Music Classes",
    });
    const earlyYears = await uploadLocalFile(strapi, path.join(imagesBaseDir, 'academic-early-years.jpg'), {
      name: 'Swimming',
      alternativeText: "Swimming",
    });

    await strapi.documents('api::sports-and-arts-page.sports-and-arts-page').create({
      data: {
        pageTitle: "Sports & Arts",
        breadcrumb: ["About", "Sports & Arts"],
        introLabel: "SPORTS & ARTS",
        introTitle: "Sports & Arts",
        introLead: "SPORTS AND SPORTSMANSHIP – we aim to encourage both in our students. As a part of our pursuit of truly holistic education, Kids’ Foundation offers an enjoyable balance between physical activity and learning. Physical Education (P.E.) at Kids’ Foundation is an integral part of our curricula.",
        activities: [
          {
            name: "YOGA",
            description: "To help concentration and breathing. Yoga means union of body with spirit. Learning Yoga in early life will prove advantages for the child in later life.",
          },
          {
            name: "AEROBICS",
            description: "To help the students to develop a liking for physical movements and rhythm. It also helps in the development of gross and fine motor skills through movements, music and dance.",
          },
          {
            name: "MARTIAL ARTS",
            description: "Martial arts is a sports basically used for combat and for physical and spiritual development. It is also used for self-defence. Kids’ Foundation has a regular course of various martial arts like karate, taekwondo, judo etc.",
          },
          {
            name: "WATER-POOL",
            description: "KIDS’ FOUNDATION has a pool for water games. The pool is constructed to fit their height and the level of water is kept very shallow. Pool games will help the child to overcome the fear of water and will also help in learning how to swim.",
          },
          {
            name: "FINE ARTS",
            description: "Art teacher teaches innovative and creative thinking. It allows them to think of new ideas.",
          },
          {
            name: "PERFORMING ARTS",
            description: "Performing arts such as Drama, Music and Dance encourages students to develop their artistic expressions.",
          },
        ],
        facilitiesCallout: [
          "At our school, we pride ourselves on providing top-notch sports and arts facilities that cater to the diverse interests and talents of our students. Our sports facilities are designed to promote physical fitness, teamwork, and sportsmanship across various disciplines.",
          "In the realm of sports, we offer a wide range of options to suit every interest and skill level. Football enthusiasts can hone their skills on our well-maintained football field, while basketball lovers can enjoy competitive matches on our indoor and outdoor courts. For those who prefer indoor games, we have dedicated spaces for chess and carrom, fostering strategic thinking and friendly competition among students.",
        ],
        gallery: [
          { title: "Karate Training", category: "Sports", image: taekwondo?.id, imageUrl: "/images/gallery-taekwondo.jpg" },
          { title: "Cultural Performances", category: "Culture", image: dance?.id, imageUrl: "/images/gallery-dance.jpg" },
          { title: "Innovation & Creativity", category: "Education", image: scienceLab?.id, imageUrl: "/images/gallery-science-lab.jpg" },
          { title: "Inter House Football", category: "Sports", image: schoolGroup?.id, imageUrl: "/images/gallery-school-group.jpg" },
          { title: "Cultural Day", category: "Culture", image: culturalMeet?.id, imageUrl: "/images/news-cultural-meet.jpg" },
          { title: "Basketball", category: "Sports", image: aboutCampus?.id, imageUrl: "/images/about-campus.jpg" },
          { title: "Music Classes", category: "Arts", image: workshop?.id, imageUrl: "/images/news-workshop.jpg" },
          { title: "Swimming", category: "Sports", image: earlyYears?.id, imageUrl: "/images/academic-early-years.jpg" },
        ],
      },
    });
    strapi.log.info('[Seed] Sports & Arts Page single type populated.');
  } else {
    strapi.log.info('[Seed] Sports & Arts Page already exists, skipping.');
  }

  // 12. Gallery Page
  const galleryPageCount = await strapi.documents('api::gallery-page.gallery-page').count();
  if (galleryPageCount === 0) {
    strapi.log.info('[Seed] Populating Gallery Page single type...');
    const images = [
      {
        title: "Science & Laboratory",
        category: "Academics",
        alt: "Students performing experiments in the science lab",
        filename: "gallery-science-lab.jpg",
      },
      {
        title: "Taekwondo Training",
        category: "Sports",
        alt: "Students practicing taekwondo on the school grounds",
        filename: "gallery-taekwondo.jpg",
      },
      {
        title: "Cultural Dance Performance",
        category: "Culture",
        alt: "Student performing classical Manipuri dance",
        filename: "gallery-dance.jpg",
      },
      {
        title: "Examination Hall",
        category: "Academics",
        alt: "Students in the examination hall",
        filename: "gallery-exam-hall.jpg",
      },
      {
        title: "School Community",
        category: "Events",
        alt: "Faculty and students gathered in front of school",
        filename: "gallery-school-group.jpg",
      },
      {
        title: "Campus Aerial View",
        category: "Campus",
        alt: "Aerial view of Kids' Foundation campus",
        filename: "campus-aerial.jpg",
      },
      {
        title: "Early Years Learning",
        category: "Academics",
        alt: "Early years students in classroom",
        filename: "academic-early-years.jpg",
      },
      {
        title: "Primary School Activities",
        category: "Academics",
        alt: "Primary students in group activity",
        filename: "academic-primary.jpg",
      },
      {
        title: "Secondary School",
        category: "Academics",
        alt: "Secondary students focused on studies",
        filename: "academic-secondary.jpg",
      },
      {
        title: "Senior Secondary",
        category: "Academics",
        alt: "Senior secondary students in class",
        filename: "academic-senior-secondary.jpg",
      },
      {
        title: "Cultural Meet",
        category: "Events",
        alt: "Students at cultural meet event",
        filename: "news-cultural-meet.jpg",
      },
      {
        title: "Teaching Workshop",
        category: "Events",
        alt: "Teachers at training workshop",
        filename: "news-teaching-workshop.jpg",
      },
    ];

    const seededImages = [];
    for (const item of images) {
      const media = await uploadLocalFile(strapi, path.join(imagesBaseDir, item.filename), {
        name: item.title,
        alternativeText: item.alt,
      });
      seededImages.push({
        title: item.title,
        category: item.category,
        image: media?.id,
        imageUrl: `/images/${item.filename}`,
        alt: item.alt,
      });
    }

    await strapi.documents('api::gallery-page.gallery-page').create({
      data: {
        bannerTitle: "Photo Gallery",
        breadcrumb: ["Gallery"],
        sectionLabel: "MOMENTS & MEMORIES",
        sectionHeading: "Life at Kids' Foundation",
        sectionDescription: "A glimpse into the moments, experiences and achievements that make school life memorable.",
        categories: ["All", "Campus", "Academics", "Sports", "Culture", "Events"],
        images: seededImages,
      },
    });
    strapi.log.info('[Seed] Gallery Page single type populated.');
  } else {
    strapi.log.info('[Seed] Gallery Page already exists, skipping.');
  }

  // 13. Admission Page
  const admissionCount = await strapi.documents('api::admission-page.admission-page').count();
  if (admissionCount === 0) {
    strapi.log.info('[Seed] Populating Admission Page single type with exact section-wise components...');
    await strapi.documents('api::admission-page.admission-page').create({
      data: {
        bannerTitle: "Admission",
        breadcrumb: ["Admission"],
        enquiry: {
          label: "ADMISSIONS",
          heading: "Admission Enquiry",
          description: "Please visit us with a prior appointment between 9:00 am to 3:00 pm from Monday to Friday for a campus tour, information about the school, curriculum overview, facilities and fee structure.",
          email: "kidsfoundationghari@gmail.com",
          phone: "0385-2456231",
          downloadLabel: "Download Admission Form",
          downloadHref: "#",
        },
        procedures: {
          label: "GUIDELINES",
          heading: "Admission Procedures",
          registrationTitle: "Registration for Admission:",
          registrationDescription: "For admission into the School, parents are invited to register for a particular year of entry. Prospectus and Registration forms are made available starting from 1st November.",
          testsTitle: "Admission Tests and Interviews:",
          testsDescription: "Following registration, admission and aptitude tests are administered to prospective candidates on a particular date fixed for it. Upon evaluation by a panel, according to the clearly defined admission criteria, successful candidates will be admitted on payment of the admission fee and other charges as applicable.",
        },
        feeStructure: {
          label: "FEE DETAILS",
          heading: "Admission Fee Structure",
          tuitionFeesTitle: "TUITION FEES",
          tuitionFees: [
            {
              level: "Pre-Nursery and Nursery",
              description: "Tuition, Care Taking and Contingency Fee",
              amount: "₹ 1,750/-",
            },
            {
              level: "K.G. to Class V",
              description: "Tuition, Students Security and Contingency Fee",
              amount: "₹ 1,850/-",
            },
            {
              level: "Class VI to Class X",
              description: "Tuition, Student Security and Contingency Fee",
              amount: "₹ 1,950/-",
            },
            {
              level: "Class XI to Class XII",
              description: "Tuition, Contingency Fee, Computer/Lab Fees",
              amount: "₹ 2,200/-",
            },
          ],
          admissionFeesTitle: "Admission Fees",
          admissionFees: [
            { level: "Pre-Nursery and K.G.", amount: "₹ 8,499/-" },
            { level: "Class I to Class V", amount: "₹ 10,499/-" },
            { level: "Class VI to Class X", amount: "₹ 11,499/-" },
            { level: "Class XI & Class XII (Science)", amount: "₹ 19,999/-" },
            { level: "Class XI & Class XII (Commerce / Arts)", amount: "₹ 16,999/-" },
          ],
        },
      },
    });
    strapi.log.info('[Seed] Admission Page single type populated.');
  } else {
    strapi.log.info('[Seed] Admission Page already exists, skipping.');
  }

  // 14. Events Page
  const eventsCount = await strapi.documents('api::events-page.events-page').count();
  if (eventsCount === 0) {
    strapi.log.info('[Seed] Populating Events Page single type...');
    const eventItems = [
      {
        eventId: "event-d1",
        title: "Annual Sports Day 2026",
        date: "November 15, 2026",
        month: "Nov",
        day: "15",
        year: "2026",
        description: "Students from all grades compete in track & field, team sports and relay races on our sprawling school grounds. Parents and guardians are warmly invited to cheer on our young athletes.",
        category: "Sports",
        imageUrl: "/images/academic-early-years.jpg",
        imageAlt: "Students competing in sports day activities",
        time: "8:00 AM - 4:00 PM",
        venue: "School Grounds, Kids' Foundation",
        tag: "upcoming",
      },
      {
        eventId: "event-d2",
        title: "Science & Innovation Fair",
        date: "November 22, 2026",
        month: "Nov",
        day: "22",
        year: "2026",
        description: "An exciting showcase of student-led science projects, experiments and innovations spanning robotics, environment science, chemistry and mathematics. Open to all parents and community members.",
        category: "Academic",
        imageUrl: "/images/gallery-science-lab.jpg",
        imageAlt: "Students presenting science fair projects",
        time: "9:00 AM - 3:00 PM",
        venue: "Science Block & Main Hall",
        tag: "upcoming",
      },
      {
        eventId: "event-d3",
        title: "Christmas & Winter Concert",
        date: "December 5, 2026",
        month: "Dec",
        day: "05",
        year: "2026",
        description: "Join us for an evening of music, drama and cultural performances as our students celebrate the spirit of Christmas with carols, dances and theatrical presentations.",
        category: "Cultural",
        imageUrl: "/images/news-cultural-meet.jpg",
        imageAlt: "Students performing cultural concert",
        time: "5:00 PM - 8:00 PM",
        venue: "School Auditorium",
        tag: "upcoming",
      },
      {
        eventId: "event-d4",
        title: "Annual Prize Distribution Ceremony",
        date: "December 18, 2026",
        month: "Dec",
        day: "18",
        year: "2026",
        description: "A prestigious ceremony recognising academic excellence, co-curricular achievements and outstanding contributions by students across all grades. Parents and dignitaries are invited to grace the event.",
        category: "Ceremony",
        imageUrl: "/images/news-scholarship.jpg",
        imageAlt: "Prize distribution ceremony at Kids Foundation",
        time: "10:00 AM - 1:00 PM",
        venue: "Main Auditorium",
        tag: "upcoming",
      },
      {
        eventId: "event-d5",
        title: "Teachers' Day Celebration",
        date: "September 5, 2026",
        month: "Sep",
        day: "05",
        year: "2026",
        description: "Students honoured their teachers with heartfelt performances, speeches and personal tributes as part of a touching celebration marking National Teachers' Day.",
        category: "School Events",
        imageUrl: "/images/academic-primary.jpg",
        imageAlt: "Teachers Day celebration at Kids Foundation",
        time: "9:00 AM - 12:00 PM",
        venue: "School Auditorium",
        tag: "past",
      },
      {
        eventId: "event-d6",
        title: "Gandhi Jayanti - Cleanliness Drive",
        date: "October 2, 2026",
        month: "Oct",
        day: "02",
        year: "2026",
        description: "Students and staff came together for a special cleanliness drive around the campus and neighbouring areas to commemorate Gandhi Jayanti and promote community responsibility.",
        category: "Community",
        imageUrl: "/images/academic-secondary.jpg",
        imageAlt: "Students participating in cleanliness drive",
        time: "8:00 AM - 10:00 AM",
        venue: "Campus & Surrounding Areas",
        tag: "past",
      },
      {
        eventId: "event-d7",
        title: "Inter-School Debate Competition",
        date: "October 15, 2026",
        month: "Oct",
        day: "15",
        year: "2026",
        description: "Kids' Foundation hosted an inter-school debate competition bringing together students from 12 schools across Imphal to debate on contemporary social and environmental issues.",
        category: "Academic",
        imageUrl: "/images/academic-senior-secondary.jpg",
        imageAlt: "Students debating at inter-school competition",
        time: "10:00 AM - 3:00 PM",
        venue: "Conference Hall",
        tag: "past",
      },
      {
        eventId: "event-d8",
        title: "Taekwondo Belt Grading Ceremony",
        date: "October 28, 2026",
        month: "Oct",
        day: "28",
        year: "2026",
        description: "Students from our martial arts programme underwent formal belt grading assessment, demonstrating discipline, skill and perseverance in front of certified examiners and proud parents.",
        category: "Sports",
        imageUrl: "/images/gallery-taekwondo.jpg",
        imageAlt: "Taekwondo belt grading at Kids Foundation",
        time: "9:00 AM - 12:00 PM",
        venue: "Multi-Purpose Hall",
        tag: "past",
      },
    ];

    await strapi.documents('api::events-page.events-page').create({
      data: {
        bannerTitle: "Events",
        breadcrumb: ["Events"],
        sectionLabel: "ALL EVENTS",
        sectionHeading: "What's happening at Kids' Foundation",
        filterOptions: [
          "All",
          "Upcoming",
          "Past",
          "School Events",
          "Academic",
          "Sports",
          "Cultural",
          "Community",
          "Ceremony",
        ],
        events: eventItems,
      },
    });
    strapi.log.info('[Seed] Events Page single type populated.');
  } else {
    strapi.log.info('[Seed] Events Page already exists, skipping.');
  }

  // 15. News and Updates Page
  const newsPageCount = await strapi.documents('api::news-page.news-page').count();
  if (newsPageCount === 0) {
    strapi.log.info('[Seed] Populating News Page single type...');
    const newsItems = [
      {
        newsId: "notice-final-exam-timetable-class-xi",
        date: "November 18, 2026",
        title: "TIME TABLE FOR FINAL EXAMINATION 2024–25 FOR CLASS XI",
        category: "Academic & Exams",
        hasDocument: true,
        documentName: "Time_Table_Final_Exam_Class_XI.png",
        documentSize: "200 KB",
        documentType: "IMAGE",
        noticeImageUrl: "/images/news/time-table-class-xi.png",
        isLatest: true,
      },
      {
        newsId: "notice-2026-11-10",
        date: "November 10, 2026",
        title: "CBSE Mid-Term Examination Results & Report Card Distribution",
        subtitle: "Official declaration of mid-term assessment outcomes for Classes VI to XII with scheduled parent-teacher meeting slots.",
        category: "Academic & Exams",
        hasDocument: true,
        documentName: "CBSE_MidTerm_Results_Summary_2026-27.pdf",
        documentSize: "420 KB",
        documentType: "PDF",
        isLatest: true,
        fullContent: [
          "The Academic Assessment Council of Kids' Foundation School has formally compiled and ratified the Mid-Term Examination results for the academic session 2026-27 across Middle, Secondary, and Senior Secondary stages (Classes VI through XII).",
          "Individual report cards, subject-wise mark rubrics, and formative learning observations will be distributed during the scheduled Parent-Teacher Meeting (PTM) on Saturday, November 18, 2026, from 8:30 AM to 1:00 PM. Parents and guardians must accompany their wards in complete school uniform.",
          "Subject-wise remedial clinic schedules and guidance sessions will also be provided during the meeting for students requiring reinforcement in mathematics, science, and languages.",
        ],
      },
      {
        newsId: "notice-2026-11-03",
        date: "November 3, 2026",
        title: "Admissions Open for Academic Session 2027-28 (Pre-Nursery to Class XI)",
        subtitle: "Registration process, prospectus availability, entrance evaluation guidelines, and timeline for prospective new admissions.",
        category: "Admissions",
        hasDocument: true,
        documentName: "Admission_Guidelines_Prospectus_2027-28.pdf",
        documentSize: "1.8 MB",
        documentType: "PDF",
        fullContent: [
          "Online registration and in-person prospectus collection for the upcoming academic session 2027-28 commence on Monday, November 6, 2026, at the administrative block counter.",
          "Limited entry vacancies are available across Pre-Nursery, Nursery, Kindergarten, Primary (Classes I-V), Middle School (Classes VI-VIII), Secondary (Classes IX-X), and Senior Secondary streams (Science, Commerce, Arts).",
          "Parents are encouraged to review eligibility ages, required documentation, and entrance assessment schedules on the admissions portal.",
        ],
      },
      {
        newsId: "notice-2026-10-24",
        date: "October 24, 2026",
        title: "Annual Sports Meet & Inter-House Athletic Championships 2026",
        subtitle: "Schedule of field trials, track events, martial arts demonstrations, and march-past parade rehearsals.",
        category: "Events & Culture",
        hasDocument: true,
        documentName: "Annual_Sports_Meet_Event_Schedule_2026.pdf",
        documentSize: "650 KB",
        documentType: "PDF",
        fullContent: [
          "The 19th Annual Sports Meet of Kids' Foundation School will be celebrated from November 14 to November 16, 2026, on the main sports campus field.",
          "Events include sprint races, relays, long jump, shot put, taekwondo kata demonstrations, and the prestigious Inter-House March Past trophy.",
          "House captains and coaches will conduct preliminary heats daily after class hours. Attendance is mandatory for all registered athletes.",
        ],
      },
      {
        newsId: "notice-2026-10-14",
        date: "October 14, 2026",
        title: "State Level Science & Tinkering Exhibition 2026 - Outstanding Student Honours",
        subtitle: "Kids' Foundation innovation team wins first prize in the Renewable Energy & Robotics category at the Regional Science Conclave.",
        category: "Achievements",
        hasDocument: false,
        fullContent: [
          "We are immensely proud to announce that the four-member student engineering team from Class IX secured First Position at the Manipur State Inter-School Science Fair 2026.",
          "Their prototype 'Smart Solar Irrigation & Soil Moisture Sensor Grid' was widely lauded by the judging panel from Manipur University and NIT Imphal.",
          "The team has been nominated to represent the state at the National Children's Science Congress later this winter.",
        ],
      },
      {
        newsId: "notice-2026-09-28",
        date: "September 28, 2026",
        title: "Revised School Timings & Winter Uniform Directive (w.e.f. October 15)",
        subtitle: "Notification on transition to winter session schedule, assembly timings, and prescribed blazer uniform codes.",
        category: "Circulars & Notices",
        hasDocument: true,
        documentName: "Winter_Session_Timings_Uniform_Notice_2026.pdf",
        documentSize: "310 KB",
        documentType: "PDF",
        fullContent: [
          "In view of seasonal daylight adjustments and colder morning temperatures, school reporting time will shift to 8:45 AM starting Monday, October 15, 2026.",
          "Students must report in full winter uniform including navy blazer with school crest, formal tie, and sweater as prescribed in the handbook.",
        ],
      },
    ];

    await strapi.documents('api::news-page.news-page').create({
      data: {
        bannerTitle: "News & Updates",
        breadcrumb: ["News & Updates"],
        sectionLabel: "LATEST ANNOUNCEMENTS",
        sectionHeading: "News, Circulars & Official Notices",
        categories: [
          "All",
          "Circulars & Notices",
          "Academic & Exams",
          "Admissions",
          "Achievements",
          "Events & Culture",
        ],
        articles: newsItems,
      },
    });
    strapi.log.info('[Seed] News Page single type populated.');
  } else {
    strapi.log.info('[Seed] News Page already exists, skipping.');
  }

  // 16. Publications Page
  const pubPageCount = await strapi.documents('api::publications-page.publications-page').count();
  if (pubPageCount === 0) {
    strapi.log.info('[Seed] Populating Publications Page single type...');
    const pubItems = [
      {
        pubId: "pub-budding-sprouts-2026",
        title: "The Budding Sprouts - Annual School Magazine",
        category: "Magazine & Newsletter",
        edition: "Vol. XIX, 2025-26",
        publishedDate: "January 15, 2026",
        academicYear: "2025-2026",
        pages: 72,
        fileSize: "14.2 MB",
        format: "PDF",
        language: "English & Manipuri",
        coverImageUrl: "/images/news-cultural-meet.jpg",
        editorOrAuthor: "School Editorial Board & Literary Guild",
        featured: true,
        description: "The flagship annual publication of Kids' Foundation School celebrating student creativity, original poetry, creative essays, artwork, faculty reflections, and school achievements across sports, academics, and performing arts.",
        highlights: [
          "Founder's & Principal's Annual Keynote",
          "Student Literary Section: 40+ Original Poems & Short Stories",
          "Visual Arts Showcase: Paintings from Fine Arts Guild",
          "CBSE Board Achievers & Merit Roll of Honour",
          "Annual Sports & Cultural Meet Photo Journal",
          "Alumni Reflections & Faculty Contributions",
        ],
        downloadFileName: "Kids_Foundation_The_Budding_Sprouts_2025_26.pdf",
      },
      {
        pubId: "pub-academic-handbook-2026-27",
        title: "Curriculum & Academic Assessment Handbook",
        category: "Academic Handbook",
        edition: "Session 2026-27",
        publishedDate: "February 01, 2026",
        academicYear: "2026-2027",
        pages: 48,
        fileSize: "4.8 MB",
        format: "PDF",
        language: "English",
        coverImageUrl: "/images/gallery-exam-hall.jpg",
        editorOrAuthor: "Academic Council & Curriculum Committee",
        featured: false,
        description: "Comprehensive guide to the academic curriculum, CBSE evaluation rubrics, exam schedules, grading frameworks, scholastic and co-scholastic learning standards for Pre-Nursery to Class XII.",
        highlights: [
          "CBSE Affiliation Norms & Subject Blueprints",
          "Periodic Assessment & Term Examination Weightages",
          "Grading Scales and Continuous Comprehensive Evaluation (CCE)",
          "Science Laboratory Safety Directives",
          "Student Discipline & Attendance Protocols",
        ],
        downloadFileName: "Kids_Foundation_Academic_Handbook_2026_27.pdf",
      },
      {
        pubId: "pub-annual-report-2024-25",
        title: "Annual Institutional Performance & Governance Report",
        category: "Annual Report",
        edition: "Annual Review 2024-25",
        publishedDate: "December 10, 2025",
        academicYear: "2024-2025",
        pages: 56,
        fileSize: "6.1 MB",
        format: "PDF",
        language: "English",
        coverImageUrl: "/images/campus-aerial.jpg",
        editorOrAuthor: "Office of the Managing Committee",
        featured: false,
        description: "Official institutional report detailing annual governance, infrastructure developments, CBSE Board examination results, teacher development programs, athletic achievements, and financial accountability.",
        highlights: [
          "100% Pass Percentage in CBSE Class X Examinations",
          "New Senior Secondary STEM & Computer Lab Commissioning",
          "Faculty Continuous Professional Development (CPD) Hours",
          "Eco-Friendly Green Campus & Solar Infrastructure Audit",
          "Community Outreach & CSR Education Initiatives",
        ],
        downloadFileName: "Kids_Foundation_Annual_Report_2024_25.pdf",
      },
      {
        pubId: "pub-student-parent-guide-2026",
        title: "Parent & Student Code of Conduct & Welfare Guide",
        category: "Parent & Student Guide",
        edition: "Edition 2026",
        publishedDate: "March 05, 2026",
        academicYear: "2026-2027",
        pages: 36,
        fileSize: "3.4 MB",
        format: "PDF",
        language: "English",
        coverImageUrl: "/images/gallery-school-group.jpg",
        editorOrAuthor: "Student Welfare & Counseling Cell",
        featured: false,
        description: "Essential orientation guide for parents and enrolled learners covering school ethos, digital discipline policies, health & safety standards, transport guidelines, and counseling support services.",
        highlights: [
          "Anti-Bullying & Child Protection Protocols (POCSO Guidelines)",
          "Health, First-Aid & Emergency Response Protocols",
          "Parent-Teacher Engagement Calendar & Office Timings",
          "School Bus Safety Routes and Fleet Rules",
        ],
        downloadFileName: "Kids_Foundation_Parent_Student_Guide_2026.pdf",
      },
    ];

    await strapi.documents('api::publications-page.publications-page').create({
      data: {
        bannerTitle: "Publications",
        breadcrumb: ["News & Events", "Publications"],
        bannerImageUrl: "/images/pages_hero_background_image/news_hero.jpg",
        sectionHeading: "School Publications & Handbooks",
        sectionDescription: "Browse and download official school publications, annual magazines, academic handbooks, and guides.",
        categories: [
          "All",
          "Magazine & Newsletter",
          "Academic Handbook",
          "Annual Report",
          "Parent & Student Guide",
        ],
        publications: pubItems,
      },
    });
    strapi.log.info('[Seed] Publications Page single type populated.');
  } else {
    strapi.log.info('[Seed] Publications Page already exists, skipping.');
  }

  // 12. Seed Clubs & Activities Page
  const existingClubsPage = await strapi.documents('api::clubs-page.clubs-page').findFirst();
  if (!existingClubsPage) {
    const clubsList = [
      {
        clubId: "stem-robotics",
        name: "Robotics & STEM Innovators Club",
        tagline: "Empowering young builders with coding, robotics, and creative problem solving",
        category: "STEM & Innovation",
        gradeLevel: "Classes IV to X",
        meetingSchedule: "Wednesday & Saturday (2:30 PM - 4:00 PM)",
        location: "Computer & Advanced STEM Innovation Lab",
        mentor: "Mr. K. Bikram Singh",
        mentorRole: "Head of Computer Science & Tinkering Lab",
        membersCount: 48,
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentGradient: "from-blue-600 to-indigo-700",
        imageUrl: "/images/gallery-science-lab.jpg",
        description: "A hands-on technology ecosystem where students bring code to life. Learners explore algorithmic thinking with Scratch and Python, build autonomous robots with sensor kits, design 3D models, and experiment with IoT concepts.",
        keyActivities: [
          "Lego Mindstorms EV3 & Arduino sensor programming",
          "Block-based Scratch and Python game development",
          "Line-following and obstacle-avoidance robot prototyping",
          "Annual Inter-School Science & Tech Fair preparation",
          "Basic electronics, circuitry, and 3D printing demos",
        ],
        learningOutcomes: [
          "Logical algorithmic reasoning and systematic debugging",
          "Hands-on electrical safety and circuit building",
          "Collaborative project management in student engineering teams",
        ],
        recentHighlight: "Won 1st Runner-Up at Manipur State Youth Robotics Olympiad 2025.",
      },
      {
        clubId: "eco-warriors",
        name: "Eco Warriors & Green Nature Club",
        tagline: "Nurturing environmental stewardship, biodiversity care, and sustainable habits",
        category: "Social & Eco",
        gradeLevel: "Classes II to X",
        meetingSchedule: "Tuesday & Friday (3:00 PM - 4:30 PM)",
        location: "Campus Botanical Garden & Eco Zone",
        mentor: "Mrs. L. Premila Devi",
        mentorRole: "Senior Environmental Science Educator",
        membersCount: 64,
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accentGradient: "from-emerald-600 to-teal-700",
        imageUrl: "/images/campus-aerial.jpg",
        description: "Dedicated to environmental conservation on and off campus. Members cultivate the school herbal garden, monitor zero-waste initiatives, lead seed-ball dispersion drives, and participate in nature trails around Imphal Valley.",
        keyActivities: [
          "Indigenous herbal garden curation and tree-tagging",
          "Organic kitchen waste composting and vermicomposting",
          "Single-use plastic audit and campus recycling drives",
          "Nature walks, bird spotting, and Loktak Lake conservation campaigns",
          "Green Chronicle newsletter contributions and environmental debates",
        ],
        learningOutcomes: [
          "Ecological literacy and knowledge of indigenous biodiversity",
          "Practical sustainable living practices for school and home",
          "Civic leadership in community environmental campaigns",
        ],
        recentHighlight: "Planted 250 indigenous saplings along Ghari Airport Corridor in 2025.",
      },
      {
        clubId: "literary-debate",
        name: "Literary, Debate & Model UN Society",
        tagline: "Cultivating articulate speakers, critical thinkers, and expressive writers",
        category: "Literary & Debate",
        gradeLevel: "Classes V to X",
        meetingSchedule: "Monday & Thursday (2:45 PM - 4:15 PM)",
        location: "School Audio-Visual Seminar Hall",
        mentor: "Ms. T. Romita Chanu",
        mentorRole: "Faculty of English & Debating Society Convener",
        membersCount: 42,
        badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
        accentGradient: "from-purple-600 to-indigo-800",
        imageUrl: "/images/academic-senior-secondary.jpg",
        description: "The premier oratorical and writing forum at Kids' Foundation. Students hone public speaking, master Oxford-style and parliamentary debating, simulate UN diplomatic councils, and author creative prose.",
        keyActivities: [
          "Inter-house and state-level debate tournaments",
          "Model United Nations (MUN) simulation caucuses",
          "Creative writing workshops, slam poetry, and essay contests",
          "Book reviews, literary quizzes, and vocabulary challenges",
          "School assembly news reporting and podcast broadcasting",
        ],
        learningOutcomes: [
          "Persuasive public speaking without stage anxiety",
          "Fact-checking, evidence synthesis, and structured argumentation",
          "Global affairs literacy and diplomatic conflict resolution",
        ],
        recentHighlight: "Outstanding Delegation Trophy at Imphal Interschool MUN 2025.",
      },
      {
        clubId: "creative-arts",
        name: "Creative Fine Arts & Traditional Crafts Guild",
        tagline: "Unleashing imagination through fine arts, clay modeling, and indigenous crafts",
        category: "Arts & Culture",
        gradeLevel: "Classes I to X",
        meetingSchedule: "Saturday (9:30 AM - 12:00 PM)",
        location: "Art Studio & Crafts Workshop",
        mentor: "Mr. O. Rajen Sharma",
        mentorRole: "Master of Fine Arts & Creative Director",
        membersCount: 56,
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        accentGradient: "from-amber-500 to-orange-600",
        imageUrl: "/images/academic-primary.jpg",
        description: "A joyful, vibrant studio space where students experiment with diverse visual arts mediums. From watercolors and charcoal sketches to traditional Manipuri handloom pattern designing and clay sculpture, creativity knows no bounds.",
        keyActivities: [
          "Watercolor, acrylic painting, and charcoal sketching",
          "Clay modeling, pottery shaping, and papier-mâché crafts",
          "Manipuri traditional decorative crafts and puppet making",
          "Annual Art Exhibition showcase in the central foyer",
          "Calligraphy, poster making, and festive campus decor",
        ],
        learningOutcomes: [
          "Fine motor coordination, spatial harmony, and visual literacy",
          "Appreciation for traditional regional craftsmanship and heritage",
          "Emotional expression through color, texture, and form",
        ],
        recentHighlight: "Curated 120 student art pieces for the Annual Cultural Day Exhibition.",
      },
      {
        clubId: "music-performing-arts",
        name: "Harmony Music & Performing Arts Troupe",
        tagline: "Discovering rhythm, melodies, and stage presence through music and theatrical arts",
        category: "Arts & Culture",
        gradeLevel: "Classes I to X",
        meetingSchedule: "Wednesday & Friday (3:00 PM - 4:30 PM)",
        location: "Performing Arts Hall & Music Room",
        mentor: "Mrs. N. Sanatombi Devi",
        mentorRole: "Cultural Director & Performing Arts Faculty",
        membersCount: 50,
        badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
        accentGradient: "from-rose-600 to-pink-700",
        imageUrl: "/images/gallery-dance.jpg",
        description: "Combining musical rhythm, classical and contemporary dance, and theatrical drama. Students learn vocal pitch control, explore traditional Manipuri folk instruments (Pena, Pung) alongside modern keyboards and guitars.",
        keyActivities: [
          "School choir training and vocal harmony exercises",
          "Traditional Manipuri dance forms (Ras Lila, Thabal Chongba steps)",
          "Contemporary drama, mime, and theatrical stagecraft",
          "Percussion and instrumental training (keyboard, drums, guitar)",
          "Annual day thematic musical drama production",
        ],
        learningOutcomes: [
          "Rhythmic synchronization, stage confidence, and vocal projection",
          "Deep emotional intelligence and theatrical character portrayal",
          "Cultural pride through classical regional performing traditions",
        ],
        recentHighlight: "Produced the critically acclaimed musical drama 'Shumang Leela' at Annual Day.",
      },
      {
        clubId: "martial-arts-taekwondo",
        name: "Tae-Kwon-Do & Martial Arts Academy",
        tagline: "Instilling discipline, physical agility, mental resilience, and self-defense",
        category: "Sports & Wellness",
        gradeLevel: "Classes I to X",
        meetingSchedule: "Tuesday, Thursday & Saturday (6:30 AM - 7:45 AM)",
        location: "School Martial Arts Arena / Multipurpose Court",
        mentor: "Master H. Tombi Singh",
        mentorRole: "Chief Martial Arts Coach (Black Belt 4th Dan)",
        membersCount: 72,
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        accentGradient: "from-red-600 to-rose-700",
        imageUrl: "/images/gallery-taekwondo.jpg",
        description: "A rigorous, discipline-centered martial arts program emphasizing self-defense, focus, balance, and athletic agility. Students prepare for belt grading ceremonies and state and national CBSE competitions.",
        keyActivities: [
          "Kicking, punching, blocking drills, and Taekwondo Poomsae forms",
          "Practical self-defense tactics and situational awareness drills",
          "Sparring sessions with complete protective gear",
          "Official belt grading examinations supervised by accredited judges",
          "Physical flexibility, cardiovascular endurance, and core conditioning",
        ],
        learningOutcomes: [
          "Unshakable self-confidence, respect, and emotional self-control",
          "High cardiovascular endurance, agility, and reflex coordination",
          "Principled understanding that martial arts is purely for defense and character",
        ],
        recentHighlight: "Clinched 6 Gold and 4 Silver medals at the All-Manipur Interschool Championship.",
      },
      {
        clubId: "chess-mind-sports",
        name: "Chess & Mind Sports Society",
        tagline: "Sharpening strategic forethought, patience, and concentration on the 64 squares",
        category: "Sports & Wellness",
        gradeLevel: "Classes II to X",
        meetingSchedule: "Monday & Wednesday (3:00 PM - 4:15 PM)",
        location: "Indoor Mind Sports Arena",
        mentor: "Mr. S. Rajesh Singh",
        mentorRole: "FIDE Rated Coach & Mathematics Faculty",
        membersCount: 36,
        badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
        accentGradient: "from-slate-700 to-slate-900",
        imageUrl: "/images/gallery-exam-hall.jpg",
        description: "A quiet haven for deep tactical calculations and friendly rivalries. Students master chess openings, middlegame tactics, endgame techniques, and test their logical prowess with timed blitz matches and puzzle battles.",
        keyActivities: [
          "Opening repertoire analysis and grandmaster game breakdowns",
          "Tactical puzzle tournaments and rapid chess ladders",
          "Simultaneous exhibition matches against faculty masters",
          "Inter-house chess leagues and CBSE cluster qualifiers",
          "Cognitive logic games, Sudoku, and Rubik’s cube speedsolving",
        ],
        learningOutcomes: [
          "Anticipatory calculation and consequence mapping",
          "Grace in victory and emotional composure under time pressure",
          "Prolonged concentration span and spatial problem solving",
        ],
        recentHighlight: "Student Master represented Manipur at CBSE National Chess Championship 2025.",
      },
      {
        clubId: "heritage-community",
        name: "Young Heritage & Social Service Club",
        tagline: "Connecting with cultural roots, civic responsibility, and community outreach",
        category: "Social & Eco",
        gradeLevel: "Classes V to X",
        meetingSchedule: "Every 2nd & 4th Saturday (10:00 AM - 1:00 PM)",
        location: "Social Sciences Center & Off-Campus Field Sites",
        mentor: "Mrs. M. Sunita Devi",
        mentorRole: "Social Sciences Coordinator & Community Outreach Head",
        membersCount: 45,
        badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
        accentGradient: "from-teal-600 to-cyan-800",
        imageUrl: "/images/gallery-school-group.jpg",
        description: "Committed to preserving the rich historical heritage of Manipur while fostering empathy and civic service. Students organize visits to eldercare homes, run book-donation drives, and explore ancient cultural monuments.",
        keyActivities: [
          "Historical monument preservation visits (Kangla Fort, Langthabal)",
          "Community cleanliness drives and literacy outreach for underprivileged kids",
          "Festive food and winter garment distribution drives",
          "Oral history preservation: recording folk tales from village elders",
          "Road safety and civic manners awareness campaigns",
        ],
        learningOutcomes: [
          "Empathy, altruism, and active civic responsibility",
          "Deep appreciation of regional Manipuri history and folklore",
          "Organizational skills in executing social welfare projects",
        ],
        recentHighlight: "Donated 500+ storybooks to rural community libraries across Manipur.",
      },
    ];

    await strapi.documents('api::clubs-page.clubs-page').create({
      data: {
        bannerTitle: "Clubs & Activities",
        breadcrumb: ["Home", "Clubs & Activities"],
        bannerImageUrl: "/images/pages_hero_background_image/sports_and_arts_hero.jpg",
        overviewHeading: "Beyond the Textbook: Cultivating Curiosity, Leadership & Passion",
        overviewDescription: "At Kids' Foundation School, learning extends far beyond academic syllabi. Our vibrant clubs and student societies provide every learner the space to discover hidden talents, collaborate with peers across grades, compete in state and national arenas, and build lifelong self-confidence.",
        categories: [
          "All",
          "STEM & Innovation",
          "Arts & Culture",
          "Sports & Wellness",
          "Literary & Debate",
          "Social & Eco",
        ],
        clubs: clubsList,
      },
    });
    strapi.log.info('[Seed] Clubs & Activities Page single type populated.');
  } else {
    strapi.log.info('[Seed] Clubs & Activities Page already exists, skipping.');
  }

  // 13. Seed Contact Page
  const existingContactPage = await strapi.documents('api::contact-page.contact-page').findFirst();
  if (!existingContactPage) {
    const contactItemList = [
      {
        icon: "map-pin",
        label: "Address",
        value: "Kids' Foundation, Airport Road, Ghari, Imphal-West, Manipur – 795001, India",
      },
      {
        icon: "phone",
        label: "Phone",
        value: "0385-2456231",
      },
      {
        icon: "smartphone",
        label: "Mobile",
        value: "+91 8974426944 / +91 8787302983",
        values: ["+91 8974426944", "+91 8787302983"],
      },
      {
        icon: "mail",
        label: "Email",
        value: "kidsfoundationghari@gmail.com",
      },
      {
        icon: "clock",
        label: "Office Hours",
        value: "Monday – Friday: 9:00 AM – 3:00 PM",
      },
    ];

    await strapi.documents('api::contact-page.contact-page').create({
      data: {
        bannerTitle: "Contact Us",
        breadcrumb: ["Contact"],
        bannerImageUrl: "/images/pages_hero_background_image/contact_hero.jpg",
        getInTouchLabel: "GET IN TOUCH",
        getInTouchHeading: "We'd love to hear from you",
        getInTouchDescription: "Whether you have questions about admissions, our curriculum, campus tours, or general queries, our friendly administrative team is here to assist you.",
        contactItems: contactItemList,
        formHeading: "Send Us a Message",
        formDescription: "Have questions about admissions, campus tours, or anything else? We'd love to hear from you.",
        formSubmitLabel: "Send Message",
        mapLabel: "FIND US",
        mapHeading: "Visit Our Campus",
        mapAddress: "Airport Road, NH 150, Ghari, Imphal, Manipur 795001",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7244.770281699026!2d93.9014291!3d24.7776411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749261ea6480eaf%3A0xba24397b1a9bc2f6!2sKids%E2%80%99%20Foundation%20School%20%7C%20Manipur!5e0!3m2!1sen!2sin!4v1730000000000!5m2!1sen!2sin",
        mapDirectUrl: "https://www.google.com/maps/place/Kids%E2%80%99+Foundation+School+%7C+Manipur/@24.7764361,93.9105756,16z/data=!4m6!3m5!1s0x3749261ea6480eaf:0xba24397b1a9bc2f6!8m2!3d24.7764361!4d93.9105756!16s%2Fg%2F1hc2jgz_7",
        mapTitle: "Kids’ Foundation School | Manipur Location",
      },
    });
    strapi.log.info('[Seed] Contact Page single type populated.');
  } else {
    strapi.log.info('[Seed] Contact Page already exists, skipping.');
  }

  strapi.log.info('[Seed] All page single types seeding complete!');
}

module.exports = { seedHomepageContent };
