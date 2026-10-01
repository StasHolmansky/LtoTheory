import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import SignArtwork from '../components/SignArtwork';
import TranslatedLine from '../components/TranslatedLine';
import { categoryTranslation, groupTranslation, signTranslation } from '../content/signLookup';
import { signCategories, signGroups, signsInCategory, type SignGroupId } from '../content/signs';
import { useLanguage } from '../i18n/LanguageContext';
import type { RootStackParamList } from '../navigation/types';
import { useAppColors } from '../theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SignList'>;
  route: RouteProp<RootStackParamList, 'SignList'>;
};

const SignListScreen = ({ navigation, route }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const category = signCategories.find(item => item.id === route.params.categoryId);
  const items = category ? signsInCategory(category.id) : [];

  useEffect(() => {
    if (!category) {
      return;
    }
    navigation.setOptions({
      title: categoryTranslation(language, category.id, 'name') ?? category.name,
    });
  }, [category, language, navigation]);

  if (!category) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>{t('signs.missing')}</Text>
      </View>
    );
  }

  let lastGroup: SignGroupId | undefined;

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {items.map(sign => {
        const showGroup = sign.groupId != null && sign.groupId !== lastGroup;
        const groupLabel = sign.groupId ? groupTranslation(language, sign.groupId) : null;
        if (sign.groupId) {
          lastGroup = sign.groupId;
        }
        return (
          <View key={sign.id}>
            {showGroup && sign.groupId ? (
              <View style={styles.groupBlock}>
                <Text style={[styles.group, { color: colors.textSecondary }]}>
                  {signGroups[sign.groupId]}
                </Text>
                {groupLabel ? (
                  <Text style={[styles.groupTranslation, { color: colors.textMuted }]}>{groupLabel}</Text>
                ) : null}
              </View>
            ) : null}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <SignArtwork id={sign.id} />
              <View style={styles.copy}>
                <TranslatedLine
                  text={sign.name}
                  translation={signTranslation(language, sign.id, 'name')}
                  strong
                />
                <TranslatedLine
                  text={sign.description}
                  translation={signTranslation(language, sign.id, 'description')}
                />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 12 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  groupBlock: { gap: 2, marginBottom: 8, marginTop: 4 },
  group: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  groupTranslation: { fontSize: 13, fontWeight: '600' },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 12,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  copy: { flex: 1, minWidth: 0, gap: 8 },
});

export default SignListScreen;
