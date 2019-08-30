import * as Permissions  from 'expo-permissions';
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
  console.log("Firebase Length:"+firebase.apps.length);
  if(firebase.apps.length==0){
  firebase.initializeApp(config);
  }


export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
console.log(token);


  userID = firebase.auth().currentUser.uid;
try{
  firebase.database().ref('/users/' + userID).update({ token: token });
}catch(error)
{
    console.log(error);
}


  // // POST the token to our backend so we can use it to send pushes from there
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //   }),
  // });
});