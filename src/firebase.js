import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAxsX3RhOeaXu8XBdWxOMNDKQCvroLjgJw",
    authDomain: "simple-messenger-7688f.firebaseapp.com",
    databaseURL: "https://simple-messenger-7688f.firebaseio.com",
    projectId: "simple-messenger-7688f",
    storageBucket: "simple-messenger-7688f.appspot.com",
    messagingSenderId: "625179904956",
    appId: "1:625179904956:web:c6aac2628907c73c02f9b9"
});

const db = firebaseApp.firestore();

export default db;