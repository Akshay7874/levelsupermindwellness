// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { loginSuccess } from '../redux/reducers/authReducer';
import { loginFailure } from '../redux/reducers/authReducer';
// Now you can use dispatch(loginSuccess(user))
import { logout } from '../redux/reducers/authReducer';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase configuration (replace with your own Firebase project details)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Monitor authentication state
export const monitorAuthState = (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, dispatch login success action
            dispatch(loginSuccess(user));
        } else {
            // User is signed out, dispatch login failure action
            dispatch(loginFailure('User signed out'));
        }
    });
};

// Authentication Functions
export const createUserWithEmailAndPasswordFunc = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential; // Returns userCredential containing user data
    } catch (error) {
        throw new Error(error.message); // If an error occurs during sign-up
    }
};

export const signInWithEmailAndPasswordFunc = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Returns userCredential containing user data
    } catch (error) {
        throw new Error(error.message); // If an error occurs during sign-in
    }
};

export const logoutFunc = async (dispatch) => {
    try {
        await signOut(auth);  // Firebase sign-out
        dispatch(logout());   // Dispatch logout action to Redux to reset user state
    } catch (error) {
        throw new Error('Error during sign out: ' + error.message);
    }
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user; // Returns user data after successful Google login
    } catch (error) {
        throw new Error('Error during Google sign-in: ' + error.message);
    }
};


// Firestore Functions
export const addHackathonToFirestore = async (hackathonData) => {
    try {
        const docRef = await addDoc(collection(db, 'hackathons'), {
            ...hackathonData,
            participants: []  // Initialize the participants field as an empty array
        });
        console.log("New hackathon added:", docRef.id);
        return docRef;
    } catch (e) {
        console.error('Error adding hackathon to Firestore: ', e);
        throw e;
    }
};

export const getHackathonsFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'hackathons'));
        const hackathons = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return hackathons; // Returns an array of hackathon data
    } catch (e) {
        console.error('Error fetching hackathons from Firestore: ', e);
        throw e;
    }
};
export const joinHackathon = async (hackathonId, userId) => {
    console.log("Joining hackathon:", hackathonId, userId);
    const hackathonRef = doc(db, 'hackathons', hackathonId);

    try {
        // Check if participants array exists
        const hackathonDoc = await getDoc(hackathonRef);
        const hackathonData = hackathonDoc.data();
        console.log("Current participants:", hackathonData?.participants);

        await updateDoc(hackathonRef, {
            participants: arrayUnion(userId)
        });
        console.log("User joined the hackathon");
    } catch (error) {
        console.error("Error joining hackathon: ", error);
        throw new Error('Error joining the hackathon: ' + error.message);
    }
};



export { auth, db };
