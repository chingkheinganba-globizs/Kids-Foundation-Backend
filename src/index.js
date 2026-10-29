const { seedHomepageContent } = require('./bootstrap/seed-homepage');

module.exports = {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    // 1. Configure public read permissions
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const permissions = [
          'api::global-setting.global-setting.find',
          'api::header.header.find',
          'api::footer.footer.find',
          'api::home-page.home-page.find',
          'api::about-page.about-page.find',
          'api::learning-page.learning-page.find',
          'api::campus-page.campus-page.find',
          'api::sports-and-arts-page.sports-and-arts-page.find',
          'api::gallery-page.gallery-page.find',
          'api::admission-page.admission-page.find',
          'api::events-page.events-page.find',
          'api::news-page.news-page.find',
          'api::publications-page.publications-page.find',
          'api::clubs-page.clubs-page.find',
          'api::contact-page.contact-page.find',
        ];

        for (const action of permissions) {
          const existing = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                role: publicRole.id,
                action,
              },
            });

          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
              },
            });
          }
        }
        strapi.log.info('Public read permissions verified for approved schemas.');
      }
    } catch (err) {
      strapi.log.warn('Could not auto-assign public permissions: ' + err.message);
    }

    // 2. Safely seed homepage content if empty
    try {
      await seedHomepageContent(strapi);
    } catch (err) {
      strapi.log.error('Error seeding homepage content: ' + err.message);
    }
  },
};
