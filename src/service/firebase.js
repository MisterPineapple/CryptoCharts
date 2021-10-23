import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCa5RttYqhghD7pg5u0tlqRpUm0IKMx2Ks",
    authDomain: "crypto-charts-1cb5f.firebaseapp.com",
    projectId: "crypto-charts-1cb5f",
    storageBucket: "crypto-charts-1cb5f.appspot.com",
    messagingSenderId: "268703108627",
    appId: "1:268703108627:web:ac6770b0c9b73a55e339e6",
    measurementId: "G-YJ50QEBLK1"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googlepProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
googlepProvider.setCustomParameters({ propmt: "select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(googlepProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;