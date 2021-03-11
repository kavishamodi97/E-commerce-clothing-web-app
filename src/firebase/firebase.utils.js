import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCVVSGTU-XYn5WGAWYTCuwCkLAv95c-Ou8",
    authDomain: "crwn-db-69c74.firebaseapp.com",
    projectId: "crwn-db-69c74",
    storageBucket: "crwn-db-69c74.appspot.com",
    messagingSenderId: "425397053337",
    appId: "1:425397053337:web:04da50169f86bed87d9508",
    measurementId: "G-6W5S1D2TY7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;
