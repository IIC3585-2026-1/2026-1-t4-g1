// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAUu33LiDttvTqNUGYMcgB42OhSGHwMMdE",
    authDomain: "t4-grupo-1.firebaseapp.com",
    projectId: "t4-grupo-1",
    storageBucket: "t4-grupo-1.firebasestorage.app",
    messagingSenderId: "256155294548",
    appId: "1:256155294548:web:8fe3e8de887fac296086c1"
});

firebase.messaging().onBackgroundMessage((payload) => {
    const { title, body } = payload.notification;
    self.registration.showNotification(title, {
        body,
        icon: "/imgs/split_friends.png"
    });
});