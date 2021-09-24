import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABu7T4O6KORL3BaHVM35UvWW8LeGxoaXE",
  authDomain: "notifyme-26ad4.firebaseapp.com",
  databaseURL: "https://notifyme-26ad4-default-rtdb.firebaseio.com",
  projectId: "notifyme-26ad4",
  storageBucket: "notifyme-26ad4.appspot.com",
  messagingSenderId: "284150406649",
  appId: "1:284150406649:web:7acccaed436c4dd8a4f128",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }
  get userId() {
    return firebase.auth().currentUser.uid;
  }
}

export default Fire;
