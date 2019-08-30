import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen.js';
import DashboardScreen from './screens/DashboardScreen';
import LoadingScreen from './screens/LoadingScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import LinksScreen from './screens/LinksScreen';
export default class App extends React.Component {
  

   render() {
    return (<AppNavigator />);
  }

}

const AppSwitchNavigator = createSwitchNavigator({
	
  LoadingScreen,
  LoginScreen,
  DashboardScreen,
  NotificationsScreen,
  LinksScreen,
},
{
  initialRouteName: 'LoadingScreen'
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

