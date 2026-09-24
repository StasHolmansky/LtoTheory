import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppColors } from '../theme';

type Props = {
  text: string;
  translation: string | null;
  emphasize?: boolean;
};

const TranslatedLine = ({ text, translation, emphasize }: Props) => {
  const colors = useAppColors();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const showHint = Boolean(translation);

  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.text,
          {
            color: emphasize ? colors.danger : colors.textPrimary,
            fontWeight: emphasize ? '700' : '500',
          },
        ]}
      >
        {text}
      </Text>
      {showHint ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('slide.translateA11y')}
          onPress={() => setOpen(true)}
          style={[styles.hint, { borderColor: colors.border, backgroundColor: colors.chipInactiveBg }]}
        >
          <Text style={[styles.hintMark, { color: colors.accent }]}>?</Text>
        </Pressable>
      ) : null}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={[styles.backdrop, { backgroundColor: colors.modalBackdrop }]} onPress={() => setOpen(false)}>
          <Pressable
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => {}}
          >
            <Text style={[styles.translation, { color: colors.textPrimary }]}>{translation}</Text>
            <Pressable
              onPress={() => setOpen(false)}
              style={[styles.close, { backgroundColor: colors.accent }]}
            >
              <Text style={[styles.closeText, { color: colors.onAccent }]}>{t('common.close')}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  text: {
    flex: 1,
    minWidth: 0,
    fontSize: 17,
    lineHeight: 24,
  },
  hint: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  hintMark: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  translation: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  closeText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default TranslatedLine;
