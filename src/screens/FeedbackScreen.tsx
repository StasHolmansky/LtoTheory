import React from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { APP_DISPLAY_NAME, SUPPORT_EMAIL } from '../config/release';
import { useAppColors } from '../theme';

const FeedbackScreen = () => {
  const colors = useAppColors();
  const { t } = useTranslation();

  const openEmail = () => {
    const subject = encodeURIComponent(t('feedback.emailSubject', { appName: APP_DISPLAY_NAME }));
    const url = `mailto:${SUPPORT_EMAIL}?subject=${subject}`;
    Linking.openURL(url).catch(() => {
      Alert.alert(
        t('feedback.emailUnavailableTitle'),
        t('feedback.emailUnavailableMessage', { email: SUPPORT_EMAIL }),
      );
    });
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{t('feedback.title')}</Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>
          {t('feedback.body', { appName: APP_DISPLAY_NAME })}
        </Text>
        <Text style={[styles.emailLabel, { color: colors.textMuted }]}>{t('feedback.emailLabel')}</Text>
        <Pressable style={[styles.emailButton, { backgroundColor: colors.accent }]} onPress={openEmail}>
          <Text style={[styles.emailText, { color: colors.onAccent }]} numberOfLines={1}>
            {SUPPORT_EMAIL}
          </Text>
        </Pressable>
        <Text style={[styles.note, { color: colors.textMuted }]}>{t('feedback.note')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 80 },
  card: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 14, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', lineHeight: 28 },
  body: { fontSize: 15, lineHeight: 22, marginTop: 12 },
  emailLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 22,
    textTransform: 'uppercase',
  },
  emailButton: { alignItems: 'center', borderRadius: 12, marginTop: 8, paddingHorizontal: 14, paddingVertical: 13 },
  emailText: { fontSize: 16, fontWeight: '700' },
  note: { fontSize: 13, lineHeight: 18, marginTop: 14 },
});

export default FeedbackScreen;
