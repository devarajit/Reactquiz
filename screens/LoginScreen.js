import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,  TextInput } from 'react-native';
import * as Google from 'expo-google-app-auth'
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
class LoginScreen extends Component {
  
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
                firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };
      onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser+"?"+this.state.id+"/+this.is");
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
          function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
              // Build Firebase credential with the Google ID token.
              var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
              );
              // Sign in with credential from the Google user.
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(function(result) {
                  console.log('user signed in '+ result.additionalUserInfo.isNewUser);
                  if (result.additionalUserInfo.isNewUser) {
                    firebase
                      .database()
                      .ref('/users/' + result.user.uid)
                      .set({
                        gmail: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        created_at: Date.now(),
                        
                      })
                      .then(function(snapshot) {
                        console.log('Snapshot', snapshot);
                      });
                   
                      firebase.database().ref('/users/' +  result.user.uid).update({ bank_id: this.state.id });
                  } else {
                    firebase
                      .database()
                      .ref('/users/' + result.user.uid)
                      .update({
                        last_logged_in: Date.now()
                      });
                  }
                })
                .catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...

                  console.log(error);
                });
            } else {
              console.log('User already signed-in Firebase.');
            }
          }.bind(this)
        );

      };
      signInWithGoogleAsync = async (id) => {
        try {
            console.log(" calling signInWithGoogleAsync")
           
          const result = await Google.logInAsync({
            behaviour:'web',
             androidClientId: '528012979704-q3hlmjps8shf9b7j5okg5l2fjhhjgei5.apps.googleusercontent.com',
         //   iosClientId: '', //enter ios client id
            scopes: ['profile', 'email']
          });
        

        console.log(result.type+"/"+this.state.id+": result Type");
          if (result.type === 'success') {
              console.log("Successful Login" + result.accessToken);
            this.onSignIn(result);
            return result.accessToken;
          } else {
            console.log("InSuccessful Login");
            return { cancelled: true };
          }
        } catch (e) {
            console.log(e);
          return { error: true };
        }
      };
      constructor(props) {
        super(props);
        this.state = {
           data:{id: null},
        };
      }
    render() {
      
        return (
          <View style={styles.container}>
            <Text>Enter your ID:</Text>
            <TextInput
              style={styles.input}
              onChangeText={id => this.setState({ id })}
              maxLength={100}
              value={this.state.data.id}
            />
            <Button
              title="Sign In With Google"
              onPress={() => this.signInWithGoogleAsync()}
            />
          </View>
        );
      }
    }


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    padding: 8,
  },
  text: {
    paddingBottom: 2,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: '95%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: '95%',
  }
});