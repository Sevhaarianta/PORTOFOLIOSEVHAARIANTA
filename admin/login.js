import { auth } from "../firebase-config.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ================================
// ELEMENT
// ================================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");


// ================================
// CEK STATUS LOGIN
// ================================

onAuthStateChanged(auth, (user) => {

    if (user) {
        window.location.href = "./dashboard.html";
    }

});


// ================================
// PROSES LOGIN
// ================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Reset pesan error
    loginError.textContent = "";

    // Disable tombol
    loginButton.disabled = true;
    loginButton.textContent = "Memproses...";


    try {

        // Login Firebase
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Login berhasil
        window.location.href = "./dashboard.html";


    } catch (error) {

        console.error("Login error:", error);


        switch (error.code) {

            case "auth/invalid-credential":
                loginError.textContent =
                    "Email atau password salah.";
                break;


            case "auth/invalid-email":
                loginError.textContent =
                    "Format email tidak valid.";
                break;


            case "auth/too-many-requests":
                loginError.textContent =
                    "Terlalu banyak percobaan. Coba lagi nanti.";
                break;


            case "auth/user-disabled":
                loginError.textContent =
                    "Akun ini telah dinonaktifkan.";
                break;


            default:
                loginError.textContent =
                    "Login gagal. Silakan coba lagi.";
        }


        // Aktifkan tombol kembali
        loginButton.disabled = false;
        loginButton.textContent = "Masuk ke Dashboard";

    }

});
