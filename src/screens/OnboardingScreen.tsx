import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppColors } from '../theme';

const OnboardingScreen = () => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const { language, setLanguage, completeOnboarding } = useLanguage();
  const [selected, setSelected] = useState<LanguageCode>(language);

  const choose = (code: LanguageCode) => {
    setSelected(code);
    setLanguage(code).catch(() => {});
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.textPrimary }]}>{t('onboarding.title')}</Text>
      <Text style={[styles.body, { color: colors.textSecondary }]}>{t('onboarding.body')}</Text>
      {selected === 'en' ? (
        <Text style={[styles.note, { color: colors.textMuted }]}>{t('onboarding.englishNote')}</Text>
      ) : null}
      <Text style={[styles.label, { color: colors.textSecondary }]}>{t('onboarding.choose')}</Text>
      <View style={styles.row}>
        {SUPPORTED_LANGUAGES.map(({ code, label }) => {
          const active = selected === code;
          return (
            <Pressable
              key={code}
              onPress={() => choose(code)}
              style={[
                styles.chip,
                { backgroundColor: active ? colors.chipActiveBg : colors.chipInactiveBg },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: active ? colors.chipActiveText : colors.chipInactiveText },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        onPress={() => completeOnboarding(selected)}
        style={[styles.button, { backgroundColor: colors.accent }]}
      >
        <Text style={[styles.buttonText, { color: colors.onAccent }]}>{t('common.continue')}</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20, paddingTop: 72, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: '800' },
  body: { fontSize: 16, lineHeight: 23, marginTop: 12 },
  note: { fontSize: 14, lineHeight: 20, marginTop: 10 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 8,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  chipText: { fontSize: 15, fontWeight: '600' },
  button: {
    marginTop: 28,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
  },
  buttonText: { fontSize: 16, fontWeight: '700' },
});

export default OnboardingScreen;
