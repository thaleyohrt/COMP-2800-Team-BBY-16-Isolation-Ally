  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBWnd1MERbrpmZR_PSgt17IlpY6wCNd4sc",
    authDomain: "isolation-ally-group16.firebaseapp.com",
    databaseURL: "https://isolation-ally-group16.firebaseio.com",
    projectId: "isolation-ally-group16",
    storageBucket: "isolation-ally-group16.appspot.com",
    messagingSenderId: "1040288799446",
    appId: "1:1040288799446:web:be0d6b35e92668deff8777"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  let user;