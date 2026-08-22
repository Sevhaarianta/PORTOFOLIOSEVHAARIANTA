import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getDatabase,
    ref,
    set,
    get,
    update,
    remove,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const firebaseConfig = {

    apiKey:
        "AIzaSyDgAP5aDMWIvhJ4Y5lNk1lRNHSPkLpW5Xg",

    authDomain:
        "portofolio-8591a.firebaseapp.com",

    databaseURL:
        "https://portofolio-8591a-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
        "portofolio-8591a",

    storageBucket:
        "portofolio-8591a.firebasestorage.app",

    messagingSenderId:
        "76009707903",

    appId:
        "1:76009707903:web:7b15f2363c988cc2c3e24a",

    measurementId:
        "G-GC40KGWF1W"

};


/* =====================================================
   FIREBASE APP
===================================================== */

const app =
    initializeApp(
        firebaseConfig
    );


/* =====================================================
   REALTIME DATABASE
===================================================== */

const database =
    getDatabase(
        app
    );


/* =====================================================
   AUTHENTICATION
===================================================== */

const auth =
    getAuth(
        app
    );


/* =====================================================
   EXPORT
===================================================== */

export {

    app,

    database,

    auth,

    ref,

    set,

    get,

    update,

    remove,

    push,

    onValue

};
