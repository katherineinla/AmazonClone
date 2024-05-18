import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ShoppingCartStack from './ShoppingCartStack';
import MenuScreen from '../screens/MenuScreen';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#ffbd7d',
        tabBarActiveTintColor: '#e47911',
        headerShown: false,
      }}>
      <Tab.Screen
        component={HomeStack}
        name="home"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="profile"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ShoppingCartStack}
        name="shoppingCart"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="shopping-cart" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={MenuScreen}
        name="more"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="menu" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
