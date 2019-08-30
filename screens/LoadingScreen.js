import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase'


class LoadingScreen extends Component {
    componentDidMount() {
        let config ={
          apiKey: "AIzaSyB3Kzu07cRkDDXeDQMJJcT4xFhuZgjfr7o",
          authDomain: "connext-b08aa.firebaseapp.com",
          databaseURL: "https://connext-b08aa.firebaseio.com",
          projectId: "connext-b08aa",
          storageBucket: "",
          messagingSenderId: "528012979704",
          appId: "1:528012979704:web:fefe3bd8e60d890b"
        };
        console.log("Firebase Length:"+firebase.apps.length);
        if(firebase.apps.length==0){
        firebase.initializeApp(config);
        }
        this.checkIfLoggedIn();
      }
      checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
          function(user) {
            console.log('AUTH STATE CHANGED CALLED '+user)
            if (user) {
              this.props.navigation.navigate('DashboardScreen');
            } else {
              this.props.navigation.navigate('LoginScreen');
            }
          }.bind(this)
        );
      };
render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});