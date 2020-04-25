import firebase from 'firebase'
var firebaseConfig = {
	apiKey: "AIzaSyD_GOu9Qy1FFP0eKKZOE6t4lzAegqHwvvw",
	authDomain: "cs-4800-backend-server.firebaseapp.com",
	databaseURL: "https://cs-4800-backend-server.firebaseio.com/",
	projectId: "cs-4800-backend-server",
	storageBucket: "cs-4800-backend-server.appspot.com",
	messagingSenderId: "767965540098",
	appId: "1:767965540098:web:77527f43aec0d7d07a9c1b",
	measurementId: "G-GKYHGS54QX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;