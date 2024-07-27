/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AppInner from './AppInner';
import { initializeDatabase } from './database/connection';
import { ActivityIndicator, View } from 'react-native';
import { seedDatabase } from './database/seed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const USE_SEED_DATA = true; // 초기 데이터를 삽입할지 여부를 제어하는 플래그

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F6F8',
  },
};

function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      await initializeDatabase();
      if (USE_SEED_DATA) {
        await seedDatabase();
      }
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme}>
        <BottomSheetModalProvider>
          <AppInner />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
