import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBzbZcuKczVCD0sWyHLNfU9nFAPe5TwhQ",
  authDomain: "proyecto-react-native-6c2c4.firebaseapp.com",
  projectId: "proyecto-react-native-6c2c4",
  storageBucket: "proyecto-react-native-6c2c4.appspot.com",
  messagingSenderId: "205894965206",
  appId: "1:205894965206:web:1f0809002519290757b677"
};


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();