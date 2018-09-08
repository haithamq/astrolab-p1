import find from 'lodash/find';

const languages = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'العربية',
    value: 'ar'
  }
];

export default {
  state: {
    selectedLang: 'en'
  },
  getters: {
    currentLang(state) {
      return find(languages, {
        value: state.selectedLang
      });
    }
  },
  mutations: {
    setLanguage(state, langCode) {
      state.selectedLang = langCode;
    }
  }
};
