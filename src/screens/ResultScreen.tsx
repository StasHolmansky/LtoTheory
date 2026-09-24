import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import { EXAM_PASS_COUNT, EXAM_QUESTION_COUNT, shuffledIds } from '../content/session';
import { questions } from '../content/questions';
import type { RootStackParamList } from '../navigation/types';
import { useAppColors } from '../theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Result'>;
  route: RouteProp<RootStackParamList, 'Result'>;
};

const ResultScreen = ({ navigation, route }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const { mode, correct, total } = route.params;
  const passed = mode === 'exam' && correct >= EXAM_PASS_COUNT;

  const again = () => {
    const ids = questions.map(item => item.id);
    const sessionIds =
      mode === 'exam' ? shuffledIds(ids).slice(0, EXAM_QUESTION_COUNT) : ids;
    navigation.reset({
      index: 1,
      routes: [{ name: 'Home' }, { name: 'Quiz', params: { mode, ids: sessionIds } }],
    });
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.score, { color: colors.textPrimary }]}>
          {t('result.score', { correct, total })}
        </Text>
        {mode === 'exam' ? (
          <>
            <Text style={[styles.verdict, { color: passed ? colors.success : colors.danger }]}>
              {passed ? t('result.passed') : t('result.failed')}
            </Text>
            <Text style={[styles.hint, { color: colors.textSecondary }]}>
              {t('result.passHint', { need: EXAM_PASS_COUNT, total })}
            </Text>
          </>
        ) : (
          <Text style={[styles.hint, { color: colors.textSecondary }]}>{t('result.studyDone')}</Text>
        )}
      </View>
      <Pressable onPress={again} style={[styles.button, { backgroundColor: colors.accent }]}>
        <Text style={[styles.buttonText, { color: colors.onAccent }]}>{t('result.again')}</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.popToTop()}
        style={[styles.button, { backgroundColor: colors.chipInactiveBg }]}
      >
        <Text style={[styles.buttonText, { color: colors.chipInactiveText }]}>{t('result.home')}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 12 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 18,
    gap: 8,
  },
  score: { fontSize: 32, fontWeight: '800' },
  verdict: { fontSize: 22, fontWeight: '800' },
  hint: { fontSize: 16, lineHeight: 22 },
  button: { borderRadius: 12, alignItems: 'center', paddingVertical: 14 },
  buttonText: { fontSize: 16, fontWeight: '700' },
});

export default ResultScreen;
