import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDldGMOgCfQVqmu3cOBj_BbKphgXUtZPXg",
    authDomain: "installer-app-service-dev.firebaseapp.com",
    projectId: "installer-app-service-dev",
    storageBucket: "installer-app-service-dev.appspot.com",
    messagingSenderId: "65061419135",
    appId: "1:65061419135:web:0e51bc63ccb0af4e60e74a",
    measurementId: "G-M720M20GQC"
};
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}
const fire = firebase;
export default fire;