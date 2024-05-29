/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppInner from './AppInner';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppInner />
    </NavigationContainer>
  );
}

export default App;
