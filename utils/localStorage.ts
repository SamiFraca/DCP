import { OptionProps } from '@/components/header/lang-switcher';

export const loadLanguageState = () => {
    try {
      const serializedState = localStorage.getItem('languageState');
      if (serializedState === null) {
        return undefined; 
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveLanguageState = (state : OptionProps) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('languageState', serializedState);
    } catch (err) {
    }
  };