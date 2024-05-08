// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, getAdditionalUserInfo }
from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwapTF1UqtZ6NaJWZku07IvTPoDYbzIfs",
    authDomain: "ideageneration-a68ad.firebaseapp.com",
    databaseURL: "https://ideageneration-a68ad-default-rtdb.firebaseio.com",
    projectId: "ideageneration-a68ad",
    storageBucket: "ideageneration-a68ad.appspot.com",
    messagingSenderId: "823273349695",
    appId: "1:823273349695:web:794038a8219a655896ce8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//###############################################
//GoogleAuth(認証用)
//###############################################
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();

//###############################################
//Login処理
//###############################################
$("#login").on("click",function(){
    //Google認証完了後の処理
    signInWithPopup(auth, provider).then((result) => {
        //Login後のページ遷移
        location.href="index.html";  
    })
});