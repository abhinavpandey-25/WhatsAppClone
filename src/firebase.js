import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtJIMqD3FT6P0fkkBswLZtsjhXTP4RTZA",
  authDomain: "whatsappclone-44797.firebaseapp.com",
  projectId: "whatsappclone-44797",
  storageBucket: "whatsappclone-44797.appspot.com",
  messagingSenderId: "5260312584",
  appId: "1:5260312584:web:00715bc963efa04f9691bd",
  measurementId: "G-D4416MCFS1"
};
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;