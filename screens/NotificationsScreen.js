import React from 'react';
import {  StyleSheet,View,ScrollView} from 'react-native'
import * as firebase from 'firebase';
import { List, ListItem, Button } from 'react-native-elements';


export default class NotificationsScreen extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      notification: {},
      userID: '',
      notificationsAvailable: [],
      error: ''

    };

  }

  componentDidMount() {
    try{
    let notificationPath = '/users/' + firebase.auth().currentUser.uid + '/notifications';
    firebase.database().ref(notificationPath).orderByKey().on('value', (snapshot) => {
      this.setState({
        notificationsAvailable: snapshot.val()
      });
    });
  }
    catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          {Object.keys(this.state.notificationsAvailable).map((keys, i) => (
              <ListItem   
                  key={i}
                title={this.state.notificationsAvailable[keys].birthday}
              />
            ))
            
          }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});