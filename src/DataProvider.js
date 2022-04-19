import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { collection, getDoc, getDocs, setDoc, doc, updateDoc,increment } from 'firebase/firestore'

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

const db = getFirestore(app);


export async function createUser(user) {
    await setDoc(doc(db, 'users', user), {
        history: {},
        settings: {kcalTarget:2000,email: user,password: "placeholder" }
    });
}

export async function setPassword(user,password) {
    await updateDoc(doc(db, "users", user), {
        settings: {password: password }
    });
}

export async function setTargetKcal(user,kcal) {
    await updateDoc(doc(db, "users", user), {
        settings: {kcalTarget: kcal }
    });
}

export async function setKcal(user,kcal,date) {
    await updateDoc(doc(db, "users", user), {
        history: {[date]: {kcal:kcal}}
    });
}

export async function addKcal(user,kcal,date) {
    await updateDoc(doc(db, "users", user), {
    [`history.${date}.kcal`]: increment(kcal)
    });
}

export async function getKcal(user,date) {
    const data = await getDoc(doc(db, "users", user))
    const kcal = data.data()["history"][date]["kcal"]
    console.log(kcal );
    return kcal;
}
