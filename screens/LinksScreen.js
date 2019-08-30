import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, ListView, Platform } from 'react-native';

import registerForPushNotificationsAsync from '../app/registerForPushNotificationsAsync';
import { Notifications } from 'expo';
import * as firebase from 'firebase';

let config ={
    apiKey: "AIzaSyB3Kzu07cRkDDXeDQMJJcT4xFhuZgjfr7o",
    authDomain: "connext-b08aa.firebaseapp.com",
    databaseURL: "https://connext-b08aa.firebaseio.com",
    projectId: "connext-b08aa",
    storageBucket: "",
    messagingSenderId: "528012979704",
    appId: "1:528012979704:web:fefe3bd8e60d890b"
  };
  console.log(" LinksScreen Firebase Length:"+firebase.apps.length);
  if(firebase.apps.length==0){
  firebase.initializeApp(config);
  }

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props) {
    super(props);
    alert("king")
    this.state = {
      notification: {},
      userID: '',
      notificationsAvailable: [],
      error: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: () => false,
        sectionHeaderHasChanged: () => false,
      }),
    };
  }
  componentDidMount() {
      console.log ('Called Mount')
    this._notificationSubscription = this._registerForPushNotifications();
    
   // this._clearIconBadgeAsync();  
  }
  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  
    
  }

  // //use later for push notification description
  render() {
    return (
      <View>

        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>

    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = (notification) => {
      console.log("Handle Notification is got" + origin +"/"+ data);
    this.userID = firebase.auth().currentUser.uid;
    this.props.navigation.navigate('NotificationsScreen');
    this.setState({ notification: notification });

    firebase.database().ref('users/' + this.userID + '/notifications').push(notification.data);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


