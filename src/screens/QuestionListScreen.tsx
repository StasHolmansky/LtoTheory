import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { questions } from '../content/questions';
import { useAppColors } from '../theme';

type Props = {
  navigation: {
    navigate: (route: string, params?: { id: number }) => void;
    setOptions: (options: object) => void;
  };
};

const QuestionListScreen = ({ navigation }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();

  const renderHeaderRight = useCallback(
    () => (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('list.settingsA11y')}
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

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.list}
      data={questions}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate('Question', { id: item.id })}
          style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Text style={[styles.number, { color: colors.accent }]}>{item.id}</Text>
          <View style={styles.textWrap}>
            <Text style={[styles.question, { color: colors.textPrimary }]} numberOfLines={3}>
              {item.question}
            </Text>
            <Text style={[styles.answer, { color: colors.textSecondary }]}>
              {t('list.answer', { letter: item.answer })}
            </Text>
          </View>
          <Text style={[styles.arrow, { color: colors.textMuted }]}>›</Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 40, gap: 10 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  number: { fontSize: 18, fontWeight: '800', width: 32 },
  textWrap: { flex: 1, minWidth: 0 },
  question: { fontSize: 16, fontWeight: '600', lineHeight: 21 },
  answer: { fontSize: 13, marginTop: 4, fontWeight: '600' },
  arrow: { fontSize: 28, lineHeight: 28 },
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

export default QuestionListScreen;
