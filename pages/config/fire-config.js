import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA9FN4Sx_RmQ34TrVt3VTn_6lBwVZzwWGA",
    authDomain: "pin2019-e2e80.firebaseapp.com",
    databaseURL: "https://pin2019-e2e80.firebaseio.com",
    projectId: "pin2019-e2e80",
    storageBucket: "pin2019-e2e80.appspot.com",
    messagingSenderId: "518984196083",
    appId: "1:518984196083:web:7e937b408412a89582fc86"
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