import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import TranslatedLine from '../components/TranslatedLine';
import { questions } from '../content/questions';
import { lineTranslation, type LineKey } from '../content/lookup';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppColors } from '../theme';

type Props = {
  route: { params: { id: number } };
};

const QuestionSlideScreen = ({ route }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const question = questions.find(item => item.id === route.params.id);

  if (!question) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textSecondary }}>{t('list.empty')}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TranslatedLine
          text={`${question.id}. ${question.question}`}
          translation={lineTranslation(language, question.id, 'q')}
        />
        <View style={styles.options}>
          {question.options.map(option => {
            const key = option.key.toLowerCase() as LineKey;
            const correct = option.key.toUpperCase() === question.answer;
            return (
              <TranslatedLine
                key={option.key}
                emphasize={correct}
                text={`${option.key}. ${option.text}`}
                translation={lineTranslation(language, question.id, key)}
              />
            );
          })}
        </View>
        <Text style={[styles.answer, { color: colors.textPrimary }]}>
          {t('slide.answer', { letter: question.answer })}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 16,
    gap: 16,
  },
  options: { gap: 12 },
  answer: { fontSize: 22, fontWeight: '800', marginTop: 8 },
});

export default QuestionSlideScreen;
