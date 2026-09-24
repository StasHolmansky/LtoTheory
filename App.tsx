import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import './src/i18n';
import { LanguageProvider, useLanguage } from './src/i18n/LanguageContext';
import FeedbackScreen from './src/screens/FeedbackScreen';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import type { RootStackParamList } from './src/navigation/types';
import { ThemeProvider, useAppTheme } from './src/theme';

const Stack = createStackNavigator<RootStackParamList>();

function HeaderBackButton({ tintColor, onPress }: { tintColor?: string; onPress?: () => void }) {
  const { t } = useTranslation();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('common.back')}
      onPress={onPress}
      style={styles.backButton}
    >
      <Text style={[styles.backButtonText, { color: tintColor }]}>‹ {t('common.back')}</Text>
    </Pressable>
  );
}

function AppNavigator() {
  const { navTheme, colors } = useAppTheme();
  const { t } = useTranslation();
  const { ready, onboardingComplete } = useLanguage();

  if (!ready) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!onboardingComplete) {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '600' },
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: colors.textPrimary,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: t('nav.home') }} />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ headerLeft: HeaderBackButton }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: t('nav.result'), headerLeft: HeaderBackButton }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: t('nav.settings'), headerLeft: HeaderBackButton }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ title: t('nav.feedback'), headerLeft: HeaderBackButton }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backButton: { paddingHorizontal: 16, paddingVertical: 8 },
  backButtonText: { fontSize: 16, fontWeight: '600' },
});

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <LanguageProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </LanguageProvider>
  </GestureHandlerRootView>
);

export default App;
