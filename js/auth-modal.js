// =============================================================
// AUTH MODAL - Gestion du login admin sur les pages publiques
// =============================================================
(function () {
    "use strict";

    // Quand l'état de connexion change
    auth.onAuthStateChanged(function (user) {
        var btn        = document.getElementById("adminLoginBtn");
        var loginForm  = document.getElementById("adminModalLoginForm");
        var loggedView = document.getElementById("adminModalLoggedIn");

        if (user && user.email === ADMIN_EMAIL) {
            // Connecté → icône check verte
            if (btn) {
                btn.innerHTML = '<i class="bi bi-person-check-fill"></i>';
                btn.style.color = "#25a565";
            }
            if (loginForm)  loginForm.classList.add("d-none");
            if (loggedView) loggedView.classList.remove("d-none");
        } else {
            // Déconnecté → icône rose
            if (btn) {
                btn.innerHTML = '<i class="bi bi-person-circle"></i>';
                btn.style.color = "#e91e63";
            }
            if (loginForm)  loginForm.classList.remove("d-none");
            if (loggedView) loggedView.classList.add("d-none");
        }
    });

    document.addEventListener("DOMContentLoaded", function () {

        // Bouton "Se connecter"
        var loginBtn = document.getElementById("adminModalLoginBtn");
        if (loginBtn) {
            loginBtn.addEventListener("click", submitAdminLogin);
        }

        // Touche Entrée dans le champ mot de passe
        var pwdInput = document.getElementById("adminModalPassword");
        if (pwdInput) {
            pwdInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") submitAdminLogin();
            });
        }

        // Bouton déconnexion dans le modal
        var logoutBtn = document.getElementById("adminModalLogoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                auth.signOut();
            });
        }
    });

    function submitAdminLogin() {
        var email    = document.getElementById("adminModalEmail").value.trim();
        var password = document.getElementById("adminModalPassword").value;
        var errorDiv = document.getElementById("adminModalError");
        var loginBtn = document.getElementById("adminModalLoginBtn");

        // Validation basique
        if (!email || !password) {
            showError(errorDiv, "Veuillez remplir tous les champs.");
            return;
        }

        // État chargement
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Connexion...';
        errorDiv.classList.add("d-none");

        auth.signInWithEmailAndPassword(email, password)
            .then(function (cred) {
                if (cred.user.email !== ADMIN_EMAIL) {
                    // Email non autorisé
                    auth.signOut();
                    showError(errorDiv, "Accès non autorisé pour cet email.");
                    resetBtn(loginBtn);
                } else {
                    // Succès → redirection directe
                    window.location.replace("admin.html");
                }
            })
            .catch(function (error) {
                // Messages d'erreur précis selon le code Firebase
                var msg = "Email ou mot de passe incorrect.";
                if (error.code === "auth/user-not-found")    msg = "Aucun compte avec cet email.";
                if (error.code === "auth/wrong-password")    msg = "Mot de passe incorrect.";
                if (error.code === "auth/invalid-email")     msg = "Format d'email invalide.";
                if (error.code === "auth/user-disabled")     msg = "Ce compte est désactivé.";
                if (error.code === "auth/too-many-requests") msg = "Trop de tentatives. Réessayez dans quelques minutes.";
                if (error.code === "auth/network-request-failed") msg = "Erreur réseau. Vérifiez votre connexion.";
                showError(errorDiv, msg);
                resetBtn(loginBtn);
            });
    }

    function showError(div, msg) {
        div.textContent = msg;
        div.classList.remove("d-none");
    }

    function resetBtn(btn) {
        btn.disabled = false;
        btn.textContent = "Se connecter";
    }

})();
