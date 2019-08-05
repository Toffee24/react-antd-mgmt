/**
 * global configuration
 * @type {{copyright: string, logoPath: string, siteName: string, i18n: {defaultLanguage: string, languages: *[]}}}
 */
module.exports = {
  siteName: 'React Admin',
  copyright: `万达营销裂变`,
  logoPath: '/logo.svg',
  adminBasePath: '/app',

  /* I18n configuration */
  i18n: {
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh'
  }
}
