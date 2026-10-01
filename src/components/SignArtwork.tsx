import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { signSvgs } from '../content/signArt';

type Props = {
  id: string;
  size?: number;
};

const SignArtwork = ({ id, size = 84 }: Props) => {
  const xml = signSvgs[id];
  if (!xml) {
    return null;
  }
  return (
    <View style={[styles.frame, { width: size, height: size }]}>
      <SvgXml xml={xml} width={size - 8} height={size - 8} />
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    borderRadius: 12,
    backgroundColor: '#e8eef5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignArtwork;
