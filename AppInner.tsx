import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/Home';
import AddItems from './src/pages/AddItems';
import {
  HomeIcon,
  SearchIcon,
  SentenceIcon,
  SettingIcon,
} from './src/assets/svgs';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddItems"
        component={AddItems}
        options={{ headerShown: false }}
        initialParams={{ id: 1 }}
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
        tabBarActiveTintColor: '#1A1E27',
        tabBarInactiveTintColor: '#8E95A3',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} fill={color} />,
        }}
      />
      <Tab.Screen
        name="Sentence"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <SentenceIcon color={color} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <SettingIcon color={color} fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppInner;
