import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { APP_BUILD, APP_DISPLAY_NAME, APP_VERSION } from '../config/release';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme, type ThemePreference } from '../theme';

const THEME_OPTIONS: ThemePreference[] = ['system', 'light', 'dark'];

type Props = {
  navigation: { navigate: (route: string) => void };
};

const SettingsScreen = ({ navigation }: Props) => {
  const { colors, preference, setPreference } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.label, { color: colors.textSecondary }]}>{t('settings.appearance')}</Text>
      <View style={styles.row}>
        {THEME_OPTIONS.map(key => {
          const active = preference === key;
          return (
            <Pressable
              key={key}
              onPress={() => setPreference(key)}
              style={[styles.chip, { backgroundColor: active ? colors.chipActiveBg : colors.chipInactiveBg }]}
            >
              <Text style={[styles.chipText, { color: active ? colors.chipActiveText : colors.chipInactiveText }]}>
                {t(`settings.${key}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.hint, { color: colors.textSecondary }]}>{t('settings.systemHint')}</Text>

      <Text style={[styles.label, { color: colors.textSecondary }]}>{t('settings.language')}</Text>
      <View style={styles.row}>
        {SUPPORTED_LANGUAGES.map(({ code, label }) => {
          const active = language === code;
          return (
            <Pressable
              key={code}
              onPress={() => setLanguage(code)}
              style={[styles.chip, { backgroundColor: active ? colors.chipActiveBg : colors.chipInactiveBg }]}
            >
              <Text style={[styles.chipText, { color: active ? colors.chipActiveText : colors.chipInactiveText }]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.hint, { color: colors.textSecondary }]}>{t('settings.languageHint')}</Text>

      <Text style={[styles.label, { color: colors.textSecondary }]}>{t('settings.support')}</Text>
      <Pressable
        style={[styles.feedbackBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
        onPress={() => navigation.navigate('Feedback')}
      >
        <View style={styles.feedbackTextWrap}>
          <Text style={[styles.feedbackTitle, { color: colors.textPrimary }]}>{t('settings.feedback')}</Text>
          <Text style={[styles.feedbackHint, { color: colors.textSecondary }]}>{t('settings.feedbackHint')}</Text>
        </View>
        <Text style={[styles.feedbackArrow, { color: colors.textMuted }]}>›</Text>
      </Pressable>

      <Text style={[styles.footer, { color: colors.textMuted }]}>
        {APP_DISPLAY_NAME} v{APP_VERSION} ({APP_BUILD})
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 80 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  chipText: { fontSize: 14, fontWeight: '600' },
  hint: { fontSize: 13, marginTop: 6, lineHeight: 18 },
  feedbackBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackTextWrap: { flex: 1, minWidth: 0, marginRight: 12 },
  feedbackTitle: { fontSize: 16, fontWeight: '700' },
  feedbackHint: { fontSize: 13, lineHeight: 18, marginTop: 3 },
  feedbackArrow: { fontSize: 28, lineHeight: 28 },
  footer: { marginTop: 32, fontSize: 12, textAlign: 'center' },
});

export default SettingsScreen;
