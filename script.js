/* =====================================================
   SEVHA PORTFOLIO
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   1. FIREBASE
===================================================== */

import {
    database,
    ref,
    onValue
} from "./firebase-config.js";


/* =====================================================
   2. REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(
    ".section, .project, .experience-item, .skill-card, .about-photo, .about-content"
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =====================================================
   3. NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
    document.querySelector(".nav");


window.addEventListener(
    "scroll",
    () => {

        const currentScroll =
            window.scrollY;


        if (!navbar) return;


        if (currentScroll > 50) {

            navbar.style.background =
                "rgba(255,255,255,.72)";

            navbar.style.boxShadow =
                "0 20px 60px rgba(42,52,72,.13)";

        } else {

            navbar.style.background =
                "linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.28))";

            navbar.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(255,255,255,.25), 0 25px 70px rgba(42,52,72,.10)";

        }

    }
);


/* =====================================================
   4. SMOOTH ANCHOR SCROLL
===================================================== */

const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


anchorLinks.forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                25;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        }
    );

});


/* =====================================================
   5. PROJECT IMAGE PARALLAX
===================================================== */

const projects =
    document.querySelectorAll(
        ".project"
    );


projects.forEach((project) => {

    const image =
        project.querySelector("img");


    if (!image) return;


    project.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                project.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const moveX =
                ((x - centerX) / centerX) * 8;


            const moveY =
                ((y - centerY) / centerY) * 8;


            image.style.transform =
                `scale(1.06) translate(${moveX}px, ${moveY}px)`;

        }
    );


    project.addEventListener(
        "mouseleave",
        () => {

            image.style.transform =
                "scale(1) translate(0, 0)";

        }
    );

});


/* =====================================================
   6. HERO IMAGE TILT
===================================================== */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


if (heroImage) {

    heroImage.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroImage.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateX =
                ((y / rect.height) - 0.5) * -5;


            const rotateY =
                ((x / rect.width) - 0.5) * 5;


            heroImage.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        }
    );


    heroImage.addEventListener(
        "mouseleave",
        () => {

            heroImage.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        }
    );

}


/* =====================================================
   7. SKILL CARD MOUSE EFFECT
===================================================== */

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


skillCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const percentX =
                x / rect.width * 100;


            const percentY =
                y / rect.height * 100;


            card.style.background =
                `radial-gradient(
                    circle at ${percentX}% ${percentY}%,
                    rgba(255,255,255,.88),
                    rgba(255,255,255,.38)
                )`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.background =
                "";

        }
    );

});


/* =====================================================
   8. CURSOR GLOW
===================================================== */

const cursorGlow =
    document.createElement(
        "div"
    );


cursorGlow.className =
    "cursor-glow";


document.body.appendChild(
    cursorGlow
);


document.addEventListener(
    "mousemove",
    (event) => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =====================================================
   9. CURSOR STYLE
===================================================== */

const cursorStyle =
    document.createElement(
        "style"
    );


cursorStyle.innerHTML = `

    .cursor-glow {

        position: fixed;

        width: 180px;

        height: 180px;

        border-radius: 50%;

        pointer-events: none;

        z-index: -1;

        transform:
            translate(-50%, -50%);

        background:
            radial-gradient(
                circle,
                rgba(130,160,255,.10),
                transparent 70%
            );

        filter:
            blur(15px);

        transition:
            left .15s ease-out,
            top .15s ease-out;

    }


    .hero-image {

        transition:
            transform .25s ease-out;

    }


    .project-image img {

        transition:
            transform .25s ease-out;

    }

`;


document.head.appendChild(
    cursorStyle
);


/* =====================================================
   10. CURRENT YEAR
===================================================== */

const footer =
    document.querySelector(
        "footer"
    );


if (footer) {

    const footerItems =
        footer.querySelectorAll(
            "div"
        );


    if (footerItems.length > 0) {

        footerItems[0].innerHTML =
            `© ${new Date().getFullYear()} SEVHA`;

    }

}


/* =====================================================
   11. ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id], header[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        navItems.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const activeLink =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    }

                }
            );

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =====================================================
   12. ACTIVE NAV STYLE
===================================================== */

const activeNavStyle =
    document.createElement(
        "style"
    );


activeNavStyle.innerHTML = `

    .nav-links a {

        position: relative;

    }


    .nav-links a::after {

        content: "";

        position: absolute;

        left: 0;

        bottom: -6px;

        width: 0;

        height: 2px;

        border-radius: 10px;

        background:
            #8ba6ff;

        transition:
            width .3s ease;

    }


    .nav-links a.active {

        color: #202328;

    }


    .nav-links a.active::after {

        width: 100%;

    }

`;


document.head.appendChild(
    activeNavStyle
);


/* =====================================================
   13. PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );


        setTimeout(
            () => {

                document
                    .querySelector(".hero")
                    ?.classList.add(
                        "hero-loaded"
                    );

            },
            200
        );

    }
);


/* =====================================================
   14. DISABLE 3D EFFECT ON TOUCH DEVICE
===================================================== */

const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;


if (isTouchDevice) {

    document.body.classList.add(
        "touch-device"
    );


    const touchStyle =
        document.createElement(
            "style"
        );


    touchStyle.innerHTML = `

        .cursor-glow {

            display: none;

        }


        .hero-image {

            transform:
                none !important;

        }


        .project-image img {

            transform:
                none !important;

        }

    `;


    document.head.appendChild(
        touchStyle
    );

}


/* =====================================================
   15. UPDATE CONTACT
===================================================== */

function updateContact(
    elementId,
    value,
    type
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) return;


    if (!value) {

        element.style.display =
            "none";

        return;

    }


    /* EMAIL */

    if (type === "email") {

        element.href =
            `mailto:${value}`;

    }


    /* WHATSAPP */

    else if (type === "whatsapp") {

        let number =
            value.replace(
                /\D/g,
                ""
            );


        if (
            number.startsWith("0")
        ) {

            number =
                "62" +
                number.substring(1);

        }


        element.href =
            `https://wa.me/${number}`;

    }


    /* LINK */

    else {

        element.href =
            value;

    }


    element.style.display =
        "flex";

}


/* =====================================================
   16. LOAD DATA PORTFOLIO DARI FIREBASE
===================================================== */

const portfolioRef =
    ref(
        database,
        "portfolio"
    );


onValue(
    portfolioRef,
    (snapshot) => {

        const data =
            snapshot.val();


        /* =============================================
           CEK DATA
        ============================================= */

        if (!data) {

            console.log(
                "❌ Belum ada data portfolio di Firebase."
            );

            return;

        }


        console.log(
            "✅ DATA PORTFOLIO DARI FIREBASE:",
            data
        );


        /* =============================================
           HERO
        ============================================= */

        if (data.hero) {

            const hero =
                data.hero;


            /* -----------------------------------------
               STATUS
            ----------------------------------------- */

            const statusElement =
                document.querySelector(
                    ".status"
                );


            if (
                statusElement &&
                hero.status
            ) {

                const statusDot =
                    statusElement.querySelector(
                        ".status-dot"
                    );


                statusElement.innerHTML =
                    "";


                if (statusDot) {

                    statusElement.appendChild(
                        statusDot
                    );

                }


                statusElement.appendChild(
                    document.createTextNode(
                        " " +
                        hero.status
                    )
                );

            }


            /* -----------------------------------------
               DESKRIPSI HERO
            ----------------------------------------- */

            const heroDescription =
                document.querySelector(
                    ".hero-desc"
                );


            if (
                heroDescription &&
                hero.description
            ) {

                heroDescription.textContent =
                    hero.description;

            }


            /* -----------------------------------------
               HERO META
            ----------------------------------------- */

            const heroMeta =
                document.querySelectorAll(
                    ".hero-meta > div"
                );


            /* LOCATION */

            if (
                heroMeta[0] &&
                hero.location
            ) {

                const element =
                    heroMeta[0].querySelector(
                        "strong"
                    );


                if (element) {

                    element.textContent =
                        hero.location;

                }

            }


            /* FOCUS */

            if (
                heroMeta[1] &&
                hero.focus
            ) {

                const element =
                    heroMeta[1].querySelector(
                        "strong"
                    );


                if (element) {

                    element.textContent =
                        hero.focus;

                }

            }


            /* EXPERIENCE */

            if (
                heroMeta[2] &&
                hero.experience
            ) {

                const element =
                    heroMeta[2].querySelector(
                        "strong"
                    );


                if (element) {

                    element.textContent =
                        hero.experience;

                }

            }

        }


        /* =============================================
           ABOUT
        ============================================= */

        if (data.about) {

            const about =
                data.about;


            const paragraphs =
                document.querySelectorAll(
                    ".about-content > p"
                );


            /* PARAGRAPH 1 */

            if (
                paragraphs[0] &&
                about.paragraph1
            ) {

                paragraphs[0].textContent =
                    about.paragraph1;

            }


            /* PARAGRAPH 2 */

            if (
                paragraphs[1] &&
                about.paragraph2
            ) {

                paragraphs[1].textContent =
                    about.paragraph2;

            }


            /* ABOUT INFO */

            const aboutInfo =
                document.querySelectorAll(
                    ".about-info > div"
                );


            /* FIELD */

            if (
                aboutInfo[0] &&
                about.field
            ) {

                const element =
                    aboutInfo[0].querySelector(
                        "strong"
                    );


                if (element) {

                    element.textContent =
                        about.field;

                }

            }


            /* TOOLS */

            if (
                aboutInfo[1] &&
                about.tools
            ) {

                const element =
                    aboutInfo[1].querySelector(
                        "strong"
                    );


                if (element) {

                    element.textContent =
                        about.tools;

                }

            }


            /* LOCATION */

            if (
                aboutInfo[2] &&
                about.location
            ) {

                const element =
                    aboutInfo[2].querySelector(
                        "strong"
                    );


                if (element) {

                    element.textContent =
                        about.location;

                }

            }

        }


        /* =============================================
           CONTACT
        ============================================= */

        if (data.contact) {

            const contact =
                data.contact;


            /* EMAIL */

            updateContact(
                "contactEmail",
                contact.email,
                "email"
            );


            /* WHATSAPP */

            updateContact(
                "contactWhatsapp",
                contact.whatsapp,
                "whatsapp"
            );


            /* INSTAGRAM */

            updateContact(
                "contactInstagram",
                contact.instagram,
                "link"
            );


            /* LINKEDIN */

            updateContact(
                "contactLinkedin",
                contact.linkedin,
                "link"
            );


            /* YOUTUBE */

            updateContact(
                "contactYoutube",
                contact.youtube,
                "link"
            );


            /* TIKTOK */

            updateContact(
                "contactTiktok",
                contact.tiktok,
                "link"
            );

        }


        /* =============================================
           SELESAI UPDATE
        ============================================= */

        console.log(
            "✅ Website publik berhasil diperbarui dari Firebase."
        );

    },


    /* =============================================
       FIREBASE ERROR
    ============================================= */

    (error) => {

        console.error(
            "❌ FIREBASE DATABASE ERROR:",
            error
        );

    }

);


/* =====================================================
   17. SELESAI
===================================================== */

console.log(
    "✅ SEVHA Portfolio berhasil dijalankan."
);
