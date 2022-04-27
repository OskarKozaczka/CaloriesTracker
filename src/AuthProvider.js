import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, deleteUser} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpRtZOjlHkosYblKMs_fTN1j1HbE7Aoxg",
    authDomain: "mrocin-firebase-services.firebaseapp.com",
    projectId: "mrocin-firebase-services",
    storageBucket: "mrocin-firebase-services.appspot.com",
    messagingSenderId: "21615399150",
    appId: "1:21615399150:web:516a572905c719f2aca3ff",
    measurementId: "G-B1LV38310D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export var current_user = auth.currentUser;
const provider = new GoogleAuthProvider();


export async function createUserPassword(email, password){
    console.log("Creating new user now")
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
};

export async function loginUserPassword(email, password){
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            current_user = user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

export async function loginWithGoogle(){
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user)
            current_user = user
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

export async function logOut(){
    signOut(auth)
        .then(()=>{
            console.log("user signed out")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
}

export function getUserEmail(){
    const user = auth.currentUser;
    if (user) {
        console.log("current user email: ", user.email)
        return user.email
    }   else {

        throw "No user logged in"
    }
}

export function getUserId(){
    const user = auth.currentUser;
    if (user) {
        console.log("current user id: ", user.uid)
        return user.uid
    }   else {
        throw "No user logged in"
    }
}

export function delete_user(){
    deleteUser(current_user).then(() => {
        console.log("user deleted")
    }).catch((error) => {
        console.log(error)
    });
}