import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import TranslatedLine from '../components/TranslatedLine';
import { questions } from '../content/questions';
import { lineTranslation, type LineKey } from '../content/lookup';
import { useLanguage } from '../i18n/LanguageContext';
import type { RootStackParamList } from '../navigation/types';
import { useAppColors } from '../theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Quiz'>;
  route: RouteProp<RootStackParamList, 'Quiz'>;
};

const QuizScreen = ({ navigation, route }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { mode, ids } = route.params;
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions.find(item => item.id === ids[index]);
  const locked = choice !== null;
  const isCorrect =
    question != null && choice != null && choice.toUpperCase() === question.answer.toUpperCase();
  const last = index >= ids.length - 1;

  React.useEffect(() => {
    navigation.setOptions({
      title: t(mode === 'exam' ? 'nav.exam' : 'nav.learn'),
    });
  }, [mode, navigation, t]);

  const choose = (key: string) => {
    if (locked || !question) {
      return;
    }
    setChoice(key);
    if (key.toUpperCase() === question.answer.toUpperCase()) {
      setCorrectCount(count => count + 1);
    }
  };

  const goNext = () => {
    if (!locked) {
      return;
    }
    if (last) {
      navigation.replace('Result', { mode, correct: correctCount, total: ids.length });
      return;
    }
    setIndex(current => current + 1);
    setChoice(null);
  };

  if (!question) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textSecondary }}>{t('quiz.missing')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.progress, { color: colors.textSecondary }]}>
          {t('quiz.progress', { current: index + 1, total: ids.length })}
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TranslatedLine
            text={question.question}
            translation={lineTranslation(language, question.id, 'q')}
          />
          <View style={styles.options}>
            {question.options.map(option => {
              const key = option.key.toLowerCase() as LineKey;
              const selected = choice?.toUpperCase() === option.key.toUpperCase();
              const isAnswer = option.key.toUpperCase() === question.answer.toUpperCase();
              const showAsCorrect = locked && (mode === 'learn' ? isAnswer : selected && isCorrect);
              const showAsWrong = locked && selected && !isCorrect;
              const borderColor = showAsCorrect
                ? colors.success
                : showAsWrong
                  ? colors.danger
                  : colors.border;
              return (
                <Pressable
                  key={option.key}
                  disabled={locked}
                  onPress={() => choose(option.key)}
                  style={[styles.option, { borderColor, backgroundColor: colors.background }]}
                >
                  <TranslatedLine
                    text={`${option.key}. ${option.text}`}
                    translation={lineTranslation(language, question.id, key)}
                  />
                </Pressable>
              );
            })}
          </View>
          {locked ? (
            <Text
              style={[
                styles.verdict,
                { color: isCorrect ? colors.success : colors.danger },
              ]}
            >
              {isCorrect
                ? t('quiz.correct')
                : mode === 'learn'
                  ? t('quiz.answer', { letter: question.answer })
                  : t('quiz.incorrect')}
            </Text>
          ) : null}
        </View>
      </ScrollView>
      {locked ? (
        <Pressable
          onPress={goNext}
          style={[styles.next, { backgroundColor: colors.accent }]}
        >
          <Text style={[styles.nextText, { color: colors.onAccent }]}>
            {last ? t('quiz.finish') : t('quiz.next')}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  progress: { fontSize: 13, fontWeight: '700', marginBottom: 10 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 16,
    gap: 16,
  },
  options: { gap: 10 },
  option: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
  },
  verdict: { fontSize: 20, fontWeight: '800' },
  next: {
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
  },
  nextText: { fontSize: 16, fontWeight: '700' },
});

export default QuizScreen;
