
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBTICW6bIcpsH1hBA1pmsLPbsWbLn5QeKI",
  authDomain: "instagram-e5398.firebaseapp.com",
  projectId: "instagram-e5398",
  storageBucket: "instagram-e5398.appspot.com",
  messagingSenderId: "465168855457",
  appId: "1:465168855457:web:6291eed6189c0a1dae5be0"
};
const app = initializeApp(firebaseConfig);
export default getFirestore();
