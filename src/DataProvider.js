import { initializeApp } from "firebase/app"
import { getFirestore , getDoc, getDocs, setDoc, doc, updateDoc,increment,arrayUnion, deleteDoc  } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {getUserEmail} from "./AuthProvider"


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

const storage = getStorage(app);
const db = getFirestore(app);


export async function createUser(user_id) {
    await setDoc(doc(db, 'users', user_id), {
        history: {},
        settings: {kcalTarget:2000,email: getUserEmail()}
    });
}


export async function checkIfUserExists(user_id){
    const data = await getDoc(doc(db, "users", user_id))
    console.log(data)

    try {data.data()['history'];return true}
    catch {return false} 
}

export async function setTargetKcal(user,kcal) {
    await updateDoc(doc(db, "users", user), {
        settings: {kcalTarget: kcal }
    });
}

export async function getTargetKcal(user) {
    const data = await getDoc(doc(db, "users", user))
    console.log(data.data())
    return data.data()["settings"]["kcalTarget"]
}

export async function getKcal(user,date) {
    const data = await getDoc(doc(db, "users", user))
    const rows = data.data()["history"][date]
    var kcal = 0

    Object.entries(rows).map(async row => {
        kcal += row[1]["kcal"]
      })

    console.log(kcal );
    return kcal;
}


export async function getUserImages(user,date) {
    const data = await getDoc(doc(db, "users", user))
    const rows = data.data()["history"][date]
    var imagesUrls =[]

    await Promise.all(Object.entries(rows).map(async row => {
        imagesUrls.push(await getDownloadURL(ref(storage, row[1]['image'])))
      }))
    return imagesUrls
}

export async function getSingleImage(entry){
    return await getDownloadURL(ref(storage, entry)).then(promise => {return promise})  
}

export async function getHistory(user){
    const data = await getDoc(doc(db, "users", user))
    const rows = data.data()["history"];

    var historyDays = []
    Object.entries(rows).map(row =>{
        historyDays.push(row);
    });
    return historyDays;
}

export async function addRecord(user,date,kcal,file) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (file) await uploadBytes(ref(storage, 'userImages/' + file.name), file )
    await updateDoc(doc(db, "users", user), {
        [`history.${date}.${time}`]: {kcal: Number.parseInt(kcal),image: file ? 'userImages/'+ file.name : "none.svg"}
    });
    
}

export async function deleteUserFromDB(user){
    await deleteDoc(doc(db, "users", user));
}
