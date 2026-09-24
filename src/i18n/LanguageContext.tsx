import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import i18n, { SUPPORTED_LANGUAGES, type LanguageCode } from './index';

const LANGUAGE_PREF_KEY = 'languagePreference';
const ONBOARDING_KEY = 'onboardingComplete';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => Promise<void>;
  ready: boolean;
  onboardingComplete: boolean;
  completeOnboarding: (language: LanguageCode) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguageCode(value: string): value is LanguageCode {
  return SUPPORTED_LANGUAGES.some(language => language.code === value);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(
    (i18n.language as LanguageCode) || 'en',
  );
  const [ready, setReady] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      AsyncStorage.getItem(LANGUAGE_PREF_KEY),
      AsyncStorage.getItem(ONBOARDING_KEY),
    ])
      .then(async ([savedLanguage, savedOnboarding]) => {
        if (cancelled) {
          return;
        }
        if (savedLanguage && isLanguageCode(savedLanguage)) {
          await i18n.changeLanguage(savedLanguage);
          if (!cancelled) {
            setLanguageState(savedLanguage);
          }
        }
        if (!cancelled) {
          setOnboardingComplete(savedOnboarding === '1');
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = useCallback(async (nextLanguage: LanguageCode) => {
    await i18n.changeLanguage(nextLanguage);
    setLanguageState(nextLanguage);
    await AsyncStorage.setItem(LANGUAGE_PREF_KEY, nextLanguage);
  }, []);

  const completeOnboarding = useCallback(
    async (nextLanguage: LanguageCode) => {
      await setLanguage(nextLanguage);
      await AsyncStorage.setItem(ONBOARDING_KEY, '1');
      setOnboardingComplete(true);
    },
    [setLanguage],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      ready,
      onboardingComplete,
      completeOnboarding,
    }),
    [language, setLanguage, ready, onboardingComplete, completeOnboarding],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
