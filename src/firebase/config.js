import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPxj5C_ViBbNXcgC6msq-tLz-SLqKoRAs",
  authDomain: "proyectoreactnative-d5f71.firebaseapp.com",
  projectId: "proyectoreactnative-d5f71",
  storageBucket: "proyectoreactnative-d5f71.appspot.com",
  messagingSenderId: "67131813772",
  appId: "1:67131813772:web:f93da57abd283d73e6b0a9"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();