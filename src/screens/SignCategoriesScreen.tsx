import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { StackNavigationProp } from '@react-navigation/stack';
import SignArtwork from '../components/SignArtwork';
import TranslatedLine from '../components/TranslatedLine';
import { categoryTranslation } from '../content/signLookup';
import { signCategories, signsInCategory, type SignCategoryId } from '../content/signs';
import { useLanguage } from '../i18n/LanguageContext';
import type { RootStackParamList } from '../navigation/types';
import { useAppColors } from '../theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SignCategories'>;
};

const categorySample: Record<SignCategoryId, string> = {
  direction: 'dir-straight',
  priority: 'pri-stop',
  parking: 'park-no',
  limits: 'lim-speed',
  awareness: 'aw-ped',
  warning: 'warn-curve-l',
  informative: 'info-advance',
  markings: 'mark-double-yellow',
};

const SignCategoriesScreen = ({ navigation }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.intro, { color: colors.textSecondary }]}>{t('signs.intro')}</Text>
      {signCategories.map(category => {
        const count = signsInCategory(category.id).length;
        return (
          <Pressable
            key={category.id}
            onPress={() => navigation.navigate('SignList', { categoryId: category.id })}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.row}>
              <SignArtwork id={categorySample[category.id]} size={64} />
              <View style={styles.copy}>
                <TranslatedLine
                  text={category.name}
                  translation={categoryTranslation(language, category.id, 'name')}
                  strong
                />
                <TranslatedLine
                  text={category.summary}
                  translation={categoryTranslation(language, category.id, 'summary')}
                />
                <Text style={[styles.count, { color: colors.accent }]}>
                  {t('signs.count', { count })}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 12 },
  intro: { fontSize: 15, lineHeight: 21 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 14,
  },
  row: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  copy: { flex: 1, minWidth: 0, gap: 8 },
  count: { fontSize: 14, fontWeight: '700' },
});

export default SignCategoriesScreen;
