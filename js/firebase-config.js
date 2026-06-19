// =============================================================
// CONFIGURATION FIREBASE - AFRO-AFRO
// (CDN compat v8 — fonctionne avec les fichiers HTML statiques)
// =============================================================

const firebaseConfig = {
    apiKey:            "AIzaSyAH1hWwaX6SrdO_tVmwnsrqEQItsvSnW3w",
    authDomain:        "afro-afro.firebaseapp.com",
    projectId:         "afro-afro",
    storageBucket:     "afro-afro.firebasestorage.app",
    messagingSenderId: "877918528691",
    appId:             "1:877918528691:web:e1e1d02180831133007cc6",
    measurementId:     "G-W56XNMR1TG"
};

// Email de l'administrateur — seul cet email peut accéder au dashboard
const ADMIN_EMAIL = "sergiohazary@gmail.com";

// Initialisation Firebase (évite la double initialisation)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db   = firebase.firestore();
const auth = firebase.auth();
