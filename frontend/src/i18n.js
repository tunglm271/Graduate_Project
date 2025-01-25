import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';

// Ensure the imported JSON files exist and are correctly formatted
console.log('English Translations:', en);
console.log('Vietnamese Translations:', vi);

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

i18n.on('initialized', () => {
  console.log('i18n is initialized:', i18n);
});

export default i18n;