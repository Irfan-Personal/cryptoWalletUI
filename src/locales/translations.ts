import { initReactI18next } from 'react-i18next';
import LanguageDetector from '@os-team/i18next-react-native-language-detector';
import i18n from 'i18next';

import { ENGLISH_TRANSLATIONS } from './languages/englishTranslations.ts';
import { GERMAN_TRANSLATIONS } from './languages/germanTranslations.ts';

const resources = {
  de: {
    translation: GERMAN_TRANSLATIONS,
  },
  en: {
    translation: ENGLISH_TRANSLATIONS,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
