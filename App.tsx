/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppInner from './AppInner';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F6F8',
  },
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={theme}>
      <AppInner />
    </NavigationContainer>
  );
}

export default App;
