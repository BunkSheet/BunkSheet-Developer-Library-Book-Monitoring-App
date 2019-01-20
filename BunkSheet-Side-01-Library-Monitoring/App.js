import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import CountScreen from './Screens/CountScreen';
import ListScreen from './Screens/ListScreen';


const MainNavigator = createBottomTabNavigator({
  countScreen: { screen: CountScreen },
  listScreen: { screen: ListScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
