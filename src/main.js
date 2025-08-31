// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzI_9JV_cUuUQgmA078jaAYIk7EUWaGxE",
  authDomain: "daily-report-f84f2.firebaseapp.com",
  projectId: "daily-report-f84f2",
  storageBucket: "daily-report-f84f2.firebasestorage.app",
  messagingSenderId: "3439557401",
  appId: "1:3439557401:web:f5da8fccb4f76dc54aa388"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
    let tags = "";

    // reportsコレクションのデータを取得
    const querySnapshot = await getDocs(collection(db, "reports"));

    // データをテーブル表の形式に合わせてHTMLを挿入
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
    });
    document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestoreからデータを取得して表示
if(document.getElementById("js-history")) {
    fetchHistoryData();
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const docRef = await addDoc(collection(db, "reports"), {
            date: new Date(),
            name: formData.get("name"),
            work: formData.get("work"),
            comment: formData.get("comment")
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ",e);
    }
}

// Cloud Firestoreにデータを送信する
if(document.getElementById("js-form")) {
    document.getElementById("js-form").addEventListener("submit", (e) => submitData(e));
};

console.log("こんにちは");