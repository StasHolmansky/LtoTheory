import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import type { StackNavigationProp } from '@react-navigation/stack';
import { loadLearnQuestionId } from '../content/learnProgress';
import { EXAM_QUESTION_COUNT, shuffledIds } from '../content/session';
import { questions } from '../content/questions';
import type { QuizMode, RootStackParamList } from '../navigation/types';
import { useAppColors } from '../theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const [resumeId, setResumeId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      loadLearnQuestionId()
        .then(id => {
          if (cancelled) {
            return;
          }
          const known = id != null && questions.some(item => item.id === id);
          const firstId = questions[0]?.id;
          setResumeId(known && id !== firstId ? id : null);
        })
        .catch(() => {
          if (!cancelled) {
            setResumeId(null);
          }
        });
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const renderHeaderRight = useCallback(
    () => (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('home.settingsA11y')}
        onPress={() => navigation.navigate('Settings')}
        style={[styles.headerButton, { borderColor: colors.border, backgroundColor: colors.card }]}
      >
        <Text style={styles.headerIcon}>⚙️</Text>
      </Pressable>
    ),
    [colors.border, colors.card, navigation, t],
  );

  React.useEffect(() => {
    navigation.setOptions({ headerRight: renderHeaderRight });
  }, [navigation, renderHeaderRight]);

  const start = (mode: QuizMode) => {
    const ids = questions.map(item => item.id);
    if (mode === 'exam') {
      navigation.navigate('Quiz', {
        mode,
        ids: shuffledIds(ids).slice(0, EXAM_QUESTION_COUNT),
      });
      return;
    }
    loadLearnQuestionId()
      .then(savedId => {
        const known = savedId != null && ids.includes(savedId);
        navigation.navigate('Quiz', {
          mode,
          ids,
          startId: known ? savedId : undefined,
        });
      })
      .catch(() => {
        navigation.navigate('Quiz', { mode, ids });
      });
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Pressable
        onPress={() => start('learn')}
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.title, { color: colors.textPrimary }]}>{t('home.learnTitle')}</Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>{t('home.learnBody')}</Text>
        {resumeId != null ? (
          <Text style={[styles.resume, { color: colors.accent }]}>
            {t('home.learnResume', { id: resumeId })}
          </Text>
        ) : null}
      </Pressable>
      <Pressable
        onPress={() => start('exam')}
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.title, { color: colors.textPrimary }]}>{t('home.examTitle')}</Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>{t('home.examBody')}</Text>
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
  title: { fontSize: 22, fontWeight: '800' },
  body: { fontSize: 16, lineHeight: 22 },
  resume: { fontSize: 15, fontWeight: '700' },
  headerButton: {
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: { fontSize: 16 },
});

export default HomeScreen;
