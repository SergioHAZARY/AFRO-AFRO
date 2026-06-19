// =============================================================
// SITE DYNAMIQUE — Charge TOUTE la personnalisation depuis Firestore
// Applique les changements sur toutes les sections et pages
// =============================================================
(function () {
    "use strict";

    if (typeof db === "undefined") return;

    db.collection("site_config").doc("main").get()
        .then(function (doc) {
            if (!doc.exists) return;
            var c = doc.data();

            // ============================================
            // CAROUSEL (index.html)
            // ============================================
            var slides = document.querySelectorAll("#header-carousel .carousel-item");
            if (slides.length >= 1) {
                if (c.carousel_img1) slides[0].querySelector("img").src = c.carousel_img1;
                if (c.carousel_title1) {
                    var t1 = slides[0].querySelector(".display-1");
                    if (t1) t1.textContent = c.carousel_title1;
                }
                if (c.carousel_sub1) {
                    var s1 = slides[0].querySelector(".fs-5");
                    if (s1) s1.innerHTML = c.carousel_sub1;
                }
            }
            if (slides.length >= 2) {
                if (c.carousel_img2) slides[1].querySelector("img").src = c.carousel_img2;
                if (c.carousel_title2) {
                    var t2 = slides[1].querySelector(".display-1");
                    if (t2) t2.textContent = c.carousel_title2;
                }
                if (c.carousel_sub2) {
                    var s2 = slides[1].querySelector(".fs-5");
                    if (s2) s2.innerHTML = c.carousel_sub2;
                }
            }

            // ============================================
            // ABOUT (index.html — #section-about)
            // ============================================
            var about = document.getElementById("section-about");
            if (about) {
                if (c.about_title) {
                    var at = about.querySelector(".title-left h2");
                    if (at) at.textContent = c.about_title;
                }
                if (c.about_text) {
                    var ap = about.querySelector("p.wow");
                    if (!ap) ap = about.querySelector(".pb-0 p");
                    if (ap) ap.innerHTML = c.about_text;
                }
                if (c.about_img) {
                    var ai = about.querySelector(".col-lg-5 img");
                    if (ai) ai.src = c.about_img;
                }
            }

            // ============================================
            // ABOUT 2 — BMS (index.html — #section-about2)
            // ============================================
            var about2 = document.getElementById("section-about2");
            if (about2 && c.about2_img) {
                var a2i = about2.querySelector(".col-lg-5 img");
                if (a2i) a2i.src = c.about2_img;
            }

            // ============================================
            // SERVICES (index.html — #section-services)
            // ============================================
            var svcSection = document.getElementById("section-services");
            if (svcSection) {
                if (c.services_title) {
                    var st = svcSection.querySelector(".title-center h2");
                    if (st) st.textContent = c.services_title;
                }
                // 4 services individuels
                for (var i = 1; i <= 4; i++) {
                    var svc = document.getElementById("svc" + i);
                    if (!svc) continue;
                    if (c["svc" + i + "_title"]) {
                        var h3 = svc.querySelector("h3");
                        if (h3) h3.textContent = c["svc" + i + "_title"];
                    }
                    if (c["svc" + i + "_text"]) {
                        var p = svc.querySelector("p.mb-4");
                        if (p) p.innerHTML = c["svc" + i + "_text"];
                    }
                    if (c["svc" + i + "_img"]) {
                        var img = svc.querySelector("img.rounded-circle");
                        if (img) img.src = c["svc" + i + "_img"];
                    }
                }
            }

            // ============================================
            // BANNER / CASTING (index.html — #section-banner)
            // ============================================
            var banner = document.getElementById("section-banner");
            if (banner) {
                if (c.banner_title) {
                    var bt = banner.querySelector(".title-center h2");
                    if (bt) bt.textContent = c.banner_title;
                }
                if (c.banner_text) {
                    var bp = banner.querySelector(".fs-5");
                    if (bp) bp.innerHTML = c.banner_text;
                }
            }

            // ============================================
            // TÉMOIGNAGES (index.html — #section-testimonials)
            // ============================================
            var testi = document.getElementById("section-testimonials");
            if (testi) {
                if (c.testimonials_title) {
                    var tt = testi.querySelector(".title-center h2");
                    if (tt) tt.textContent = c.testimonials_title;
                }
                var items = testi.querySelectorAll(".testimonial-item");
                for (var j = 0; j < items.length && j < 3; j++) {
                    var n = j + 1;
                    if (c["testi" + n + "_text"]) {
                        var tp = items[j].querySelector("p");
                        if (tp) tp.innerHTML = c["testi" + n + "_text"];
                    }
                    if (c["testi" + n + "_name"]) {
                        var th = items[j].querySelector("h5");
                        if (th) th.textContent = c["testi" + n + "_name"];
                    }
                    if (c["testi" + n + "_role"]) {
                        var ts = items[j].querySelector("span.text-primary");
                        if (ts) ts.textContent = c["testi" + n + "_role"];
                    }
                    // Image du témoignage (dans data-dot)
                    if (c["testi" + n + "_img"]) {
                        var dot = items[j].getAttribute("data-dot");
                        if (dot) {
                            items[j].setAttribute("data-dot",
                                "<img class='img-fluid' src='" + c["testi" + n + "_img"] + "' alt=''>"
                            );
                        }
                    }
                }
            }

            // ============================================
            // PAGE MODÈLES (model.html — 8 mannequins)
            // ============================================
            for (var m = 1; m <= 8; m++) {
                var modelEl = document.getElementById("model" + m);
                if (!modelEl) continue;
                if (c["model" + m + "_img"]) {
                    var mImg = modelEl.querySelector("img.img-fluid");
                    if (mImg) mImg.src = c["model" + m + "_img"];
                }
                if (c["model" + m + "_name"]) {
                    var mName = modelEl.querySelector("h5");
                    if (mName) mName.textContent = c["model" + m + "_name"];
                }
            }

            // ============================================
            // INFORMATIONS DE CONTACT (collaboration.html)
            // ============================================
            var contactTable = document.querySelector("table.table-dark");
            if (contactTable) {
                var rows = contactTable.querySelectorAll("tr");
                rows.forEach(function (row) {
                    var cells = row.querySelectorAll("td");
                    if (cells.length < 2) return;
                    var label = cells[0].textContent.trim().toUpperCase();
                    if (label.indexOf("PHONE") >= 0 && c.contact_phone) cells[1].textContent = c.contact_phone;
                    if (label.indexOf("MAIL") >= 0 && c.contact_email) cells[1].textContent = c.contact_email;
                    if (label.indexOf("ADDRESS") >= 0 && c.contact_address) cells[1].textContent = c.contact_address;
                });
            }

            // ============================================
            // RÉSEAUX SOCIAUX (footer sur toutes les pages)
            // ============================================
            var footer = document.querySelector(".footer");
            if (footer) {
                var links = footer.querySelectorAll("a.btn-lg-square");
                links.forEach(function (a) {
                    var icon = a.querySelector("i");
                    if (!icon) return;
                    if (icon.classList.contains("fa-facebook-f") && c.social_facebook) a.href = c.social_facebook;
                    if (icon.classList.contains("fa-x-twitter") && c.social_instagram) a.href = c.social_instagram;
                    if (icon.classList.contains("fa-youtube") && c.social_youtube) a.href = c.social_youtube;
                    if (icon.classList.contains("fa-linkedin-in") && c.social_linkedin) a.href = c.social_linkedin;
                });
            }

            // ============================================
            // VISIBILITÉ DES SECTIONS
            // ============================================
            var visMap = {
                "show_about":        "section-about",
                "show_services":     "section-services",
                "show_banner":       "section-banner",
                "show_models":       "section-models",
                "show_testimonials": "section-testimonials"
            };
            Object.keys(visMap).forEach(function (key) {
                if (c[key] === false) {
                    var el = document.getElementById(visMap[key]);
                    if (el) el.style.display = "none";
                }
            });

        })
        .catch(function () {
            // En cas d'erreur → le site garde le contenu statique par défaut
            console.log("site-dynamic: contenu par défaut");
        });
})();
