import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/Home';
import AddCategory from './src/pages/AddCategory';
import AddCard from './src/pages/AddCard';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{ title: '카테고리 추가' }}
      />
      <HomeStack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: '카드 추가' }}
      />
    </HomeStack.Navigator>
  );
}

function AppInner() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShadowVisible: false,
        tabBarStyle: { position: 'absolute' },
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Sentence" component={HomeScreen} />
      <Tab.Screen name="Setting" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default AppInner;
