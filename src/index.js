import 'normalize.css';
import './style.css';

const initButtons = () => {
  const continueBtn = document.getElementById('continueBtn');

  continueBtn.addEventListener('click', function () {
    const radio = document.querySelector('.radio-input:checked');
    const link = radio.getAttribute('data-link');
    window.location.href = link;
  });
};

const i18nParams = {
  price: '9.99$',
};

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

    const splittedLocaleTags = browserLocaleTags.map(
      (tag) => tag.split('-')[0]
    );

    let browserLocaleTag = null;

    splittedLocaleTags.forEach((lang) => {
      if (browserLocaleTag === null) {
        if (localeTags.includes(lang)) {
          browserLocaleTag = lang;
        }
      }
    });

    if (browserLocaleTag !== null && browserLocaleTag !== defaultLocaleTag) {
      locale = locales[browserLocaleTag];
    }
  }

  const normalizedLocale = {};

  for (const key in locale) {
    normalizedLocale[normalizeKey(key)] = locale[key];
  }

  localize(normalizedLocale);
};

const localize = (locale) => {
  const i18nElements = document.querySelectorAll('.i18n');
  const navHeight = document.querySelector('.nav').clientHeight;

  i18nElements.forEach((item) => {
    const initialItemHeight = item.clientHeight;

    item.innerHTML = insertParams(locale[normalizeKey(item.innerHTML)] || '');

    if (item.clientHeight > initialItemHeight) {
      item.classList.add('scale-text');
    }

    if (navHeight !== document.querySelector('.nav').clientHeight) {
      document.querySelector('.nav').classList.add('minFZ');
    }
  });
};

const normalizeKey = (str) => str.replace(/\s*</i, '<').trim();

const insertParams = (str) => {
  const params = str.match(/\{\{.*\}\}/g);

  if (params === null) {
    return str;
  }

  params.forEach((param) => {
    const paramKey = param.replace(/[{}]/g, '');
    const paramValue = i18nParams[paramKey];

    if (paramValue) {
      str = str.replace(`{{${paramKey}}}`, paramValue);
    }
  });

  return str;
};

initI18n();
initButtons();
