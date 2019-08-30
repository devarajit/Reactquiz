
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,Image,ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Icon, SafeAreaView,Header,Left } from 'react-native-elements';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


export default class Home extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: (tintcolor) => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }
  render(){
    
      return(
        <View style ={StyleSheet.container}>
            <Header
          leftComponent={{ icon: 'menu', color: '#fff',           onPress:this.props.navigation.openDrawer }}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
          <View style={{flex:1,alignItems:'center' ,justifyContent:'center', padding:10,}}>
          
          <Text>HomeScreen</Text>
        </View>
        </View>
      );
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});