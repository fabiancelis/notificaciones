importScripts(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyDFr3oQv6jeYlXg6D-Sgqnh5A4kf4Hip1Y",
    authDomain: "curso-abab9.firebaseapp.com",
    projectId: "curso-abab9",
    storageBucket: "curso-abab9.appspot.com",
    messagingSenderId: "1052489171402",
    appId: "1:1052489171402:web:157f1a29e3156329b70f33",
    measurementId: "G-1ETLDDNE99",
    vapidKey: "BBG85BX97-13eB6op1509fwuo5b5OKZ4PkENh4ThJB8A1BPDKULYOvQ9L-1lO6VGX06at_hQli3ucTD4O_s7xM8"
});

// Initialize Firebase
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const channel = new BroadcastChannel('bg-notification');
    channel.postMessage(payload);
  })