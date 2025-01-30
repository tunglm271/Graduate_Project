import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';


i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: 'vi', // Default language
    fallbackLng: 'vi', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;