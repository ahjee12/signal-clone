// import * as firebase from 'firebase'
// import firebase from 'firebase/app'
import firebase from 'firebase'
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUhJd8ihwlBsEYtZTlHhgtkiTX2Rkcikg",
    authDomain: "signal-clone-yt-build-ea4eb.firebaseapp.com",
    projectId: "signal-clone-yt-build-ea4eb",
    storageBucket: "signal-clone-yt-build-ea4eb.appspot.com",
    messagingSenderId: "500561608532",
    appId: "1:500561608532:web:e3a3a544054abfe36712c1",
  
  };

 
let app;

if(firebase.apps.length === 0){
  // firebase.firestore().settings({ experimentalForceLongPolling: true });
  app = firebase.initializeApp(firebaseConfig)
}else{
  app = firebase.app()
}
// let  app = firebase.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = firebase.auth()

export {db, auth}

