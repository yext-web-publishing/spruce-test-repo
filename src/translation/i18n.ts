import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationDe from '../../locales/de.json';
import translationFr from '../../locales/fr.json';
import translationIt from '../../locales/it.json';
import translationEn  from '../../locales/en.json';

const resources = {
  de: {
    translation: translationDe
  },
  fr: {
    translation: translationFr
  },
  en: {
    translation: translationEn
  },
  it: {
    translation: translationIt
  }
};

i18n.use(initReactI18next).init({
  resources: resources,
  fallbackLng: 'de',
  lng: 'de',
});

export default i18n;
