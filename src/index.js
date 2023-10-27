import 'normalize.css';
import './style.css';

const continueBtn = document.getElementById('continueBtn');

continueBtn.addEventListener('click', function () {
  const radio = document.querySelector('.radio-input:checked');
  const link = radio.getAttribute('data-link');
  window.location.href = link;
});

const initI18n = () => {
  /* Supported locales */
  const defaultLocaleTag = 'en';

  const locales = {
    de: require('./i18n/de.json'),
    en: require('./i18n/en.json'),
    es: require('./i18n/es.json'),
    fr: require('./i18n/fr.json'),
    ja: require('./i18n/ja.json'),
    pt: require('./i18n/pt.json'),
  };

  const localeTags = Object.keys(locales);
  let locale = locales[defaultLocaleTag];

  /* URL param locale */
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlLocaleTag = urlParams.get('lang')?.toLowerCase();

  if (
    urlLocaleTag &&
    localeTags.includes(urlLocaleTag) &&
    urlLocaleTag !== defaultLocaleTag
  ) {
    locale = locales[urlLocaleTag];
  }

  /* Browser locale tag */
  if (!urlLocaleTag) {
    const browserLocaleTags = navigator?.languages?.length
      ? navigator.languages
      : [...navigator?.language];

    let browserLocaleTag = null;

    browserLocaleTags.forEach((lang) => {
      if (browserLocaleTag === null) {
        if (localeTags.includes(lang)) {
          browserLocaleTag = lang;
        }
      }
    });

    if (browserLocaleTag !== null && browserLocaleTag !== defaultLocaleTag) {
      locale = locales['browserLocaleTag'];
    }
  }

  localize(locale);
};

const localize = (locale) => {
  const allI18nEL = document.querySelectorAll('.i18n');
  allI18nEL.forEach((item) => {
    item.innerHTML = locale[item.innerHTML.trim()];
  });
};

initI18n();
