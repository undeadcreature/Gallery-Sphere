document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");
    const loginModal = document.getElementById("loginModal");
    const googleLoginBtn = document.getElementById("googleLoginBtn");

    loginModal.style.display = "block";

    const loginWithEmail = async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log("User logged in:", userCredential.user);
            return userCredential;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            console.log("Google Login Successful:", user);
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Google login error:", error);
            showError(getErrorMessage(error.code));
        }
    };

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        loginError.style.display = "none";
        loginError.textContent = "";

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (!email || !password) {
            showError("Please fill in all fields");
            return;
        }

        try {
            loginForm.querySelector("button").disabled = true;
            await loginWithEmail(email, password);
            window.location.href = "dashboard.html";
        } catch (error) {
            showError(getErrorMessage(error.code));
        } finally {
            loginForm.querySelector("button").disabled = false;
        }
    });

    googleLoginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginWithGoogle();
    });

    function getErrorMessage(errorCode) {
        switch (errorCode) {
            case "auth/invalid-email":
                return "Invalid email format";
            case "auth/user-disabled":
                return "This account has been disabled";
            case "auth/user-not-found":
                return "No account found with this email";
            case "auth/wrong-password":
                return "Incorrect password";
            case "auth/too-many-requests":
                return "Too many attempts. Try again later";
            case "auth/popup-closed-by-user":
                return "Popup closed before completing login";
            default:
                return "Login failed. Please try again";
        }
    }

    function showError(message) {
        loginError.textContent = message;
        loginError.style.display = "block";
    }

    auth.onAuthStateChanged(user => {
        console.log("Auth state changed:", user);
    });
});
