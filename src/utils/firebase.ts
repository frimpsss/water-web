import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCbnttnWzaQdJ78DyfTH8ibwZb4-AzQJVw",
  authDomain: "aquatrack-ecbd9.firebaseapp.com",
  projectId: "aquatrack-ecbd9",
  storageBucket: "aquatrack-ecbd9.appspot.com",
  messagingSenderId: "329519899179",
  appId: "1:329519899179:web:b7263e0a13e1010720806e",
  measurementId: "G-LFMKEZ1W0Q",
  databaseURL:
    "https://aquatrack-ecbd9-default-rtdb.europe-west1.firebasedatabase.app",
};

export const f_app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const dbRef = ref(db);

export async function dataFromFirebase() {
  try {
    const snapshot = await get(child(dbRef, "readings"));
    const data = snapshot.val();

    return data;
  } catch (error) {
    throw error;
  }
}
