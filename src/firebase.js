import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAW1KfSAs_7mMpMTTsMSRvnDX8LESNkbjU",
    authDomain: "instagram-2b52b.firebaseapp.com",
    projectId: "instagram-2b52b",
    storageBucket: "instagram-2b52b.appspot.com",
    messagingSenderId: "357288111738",
    appId: "1:357288111738:web:31e9f7b999af67d9e315c3",
    measurementId: "G-L054FHNKH2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

export {storage, auth};