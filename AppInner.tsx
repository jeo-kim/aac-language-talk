import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/Home';

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

function AppInner() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShadowVisible: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Sentence" component={HomeScreen} />
      <Tab.Screen name="Setting" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default AppInner;
