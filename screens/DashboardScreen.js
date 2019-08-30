import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,ScrollView,SafeAreaView,Image,Dimensions,Platform,I18nManager  } from 'react-native';
import {createAppContainer, createDrawerNavigator,DrawerItems, NavigationEvents, NavigationActions} from 'react-navigation'
import HomeScreen from './HomeScreen'
import NotificationsScreen  from './NotificationsScreen'
import LinksScreen from './LinksScreen'
import registerForPushNotificationsAsync from '../app/registerForPushNotificationsAsync';
import ErrorScreen from './ErrorScreen'
const{width}=Dimensions.get('window');

class DashboardScreen extends Component {
  componentDidMount(){
    try{
        registerForPushNotificationsAsync();
       } catch(error){
         console.log(error);
         <ErrorScreen/>
         }
       }
      
  render() {
    
    return (
        
    <AppContainerNavigator />
    );
  }
}


const CustomDrawerComponent = (props) =>(
  <SafeAreaView style={{flex:1}}>
    <View style ={{height:150, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
      <Image source={require('../assets/logo.png')} style={{height:120, width:120,borderRadius:60}}/>

      </View>
      <ScrollView>
        <DrawerItems{...props}/>
      </ScrollView>

    </SafeAreaView>

)


const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Notifications: NotificationsScreen,
  Links: LinksScreen
},{
  contentComponent:CustomDrawerComponent,
 
});
const AppContainerNavigator = createAppContainer(AppDrawerNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default DashboardScreen;