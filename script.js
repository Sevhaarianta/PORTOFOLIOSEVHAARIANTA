/* =====================================================
   15. LOAD DATA PORTFOLIO DARI FIREBASE
===================================================== */

import {
    database,
    ref,
    onValue
} from "./firebase-config.js";


const portfolioRef = ref(
    database,
    "portfolio"
);


onValue(
    portfolioRef,
    (snapshot) => {

        const data = snapshot.val();

        if (!data) {

            console.log(
                "Belum ada data portfolio di Firebase."
            );

            return;
        }


        console.log(
            "Data portfolio Firebase:",
            data
        );


        /* =============================================
           HERO
        ============================================= */

        if (data.hero) {

            const hero = data.hero;


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


            /*
                STATUS
            */

            const status =
                document.querySelector(
                    ".status"
                );


            if (
                status &&
                hero.status
            ) {

                const dot =
                    status.querySelector(
                        ".status-dot"
                    );


                status.innerHTML = "";

                if (dot) {

                    status.appendChild(
                        dot
                    );

                }


                status.append(
                    document.createTextNode(
                        " " + hero.status
                    )
                );

            }


            /*
                BERBASIS DI
            */

            const heroMeta =
                document.querySelectorAll(
                    ".hero-meta > div"
                );


            if (
                heroMeta[0] &&
                hero.location
            ) {

                const strong =
                    heroMeta[0].querySelector(
                        "strong"
                    );


                if (strong) {

                    strong.textContent =
                        hero.location;

                }

            }


            /*
                FOKUS
            */

            if (
                heroMeta[1] &&
                hero.focus
            ) {

                const strong =
                    heroMeta[1].querySelector(
                        "strong"
                    );


                if (strong) {

                    strong.textContent =
                        hero.focus;

                }

            }


            /*
                PENGALAMAN
            */

            if (
                heroMeta[2] &&
                hero.experience
            ) {

                const strong =
                    heroMeta[2].querySelector(
                        "strong"
                    );


                if (strong) {

                    strong.textContent =
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


            const aboutParagraphs =
                document.querySelectorAll(
                    ".about-content > p"
                );


            if (
                aboutParagraphs[0] &&
                about.paragraph1
            ) {

                aboutParagraphs[0].textContent =
                    about.paragraph1;

            }


            if (
                aboutParagraphs[1] &&
                about.paragraph2
            ) {

                aboutParagraphs[1].textContent =
                    about.paragraph2;

            }


            const aboutInfo =
                document.querySelectorAll(
                    ".about-info > div"
                );


            /*
                BIDANG
            */

            if (
                aboutInfo[0] &&
                about.field
            ) {

                const strong =
                    aboutInfo[0].querySelector(
                        "strong"
                    );


                if (strong) {

                    strong.textContent =
                        about.field;

                }

            }


            /*
                TOOLS
            */

            if (
                aboutInfo[1] &&
                about.tools
            ) {

                const strong =
                    aboutInfo[1].querySelector(
                        "strong"
                    );


                if (strong) {

                    strong.textContent =
                        about.tools;

                }

            }


            /*
                DOMISILI
            */

            if (
                aboutInfo[2] &&
                about.location
            ) {

                const strong =
                    aboutInfo[2].querySelector(
                        "strong"
                    );


                if (strong) {

                    strong.textContent =
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


            updateContact(
                "contactEmail",
                contact.email,
                "email"
            );


            updateContact(
                "contactWhatsapp",
                contact.whatsapp,
                "whatsapp"
            );


            updateContact(
                "contactInstagram",
                contact.instagram,
                "link"
            );


            updateContact(
                "contactLinkedin",
                contact.linkedin,
                "link"
            );


            updateContact(
                "contactYoutube",
                contact.youtube,
                "link"
            );


            updateContact(
                "contactTiktok",
                contact.tiktok,
                "link"
            );

        }

    },


    (error) => {

        console.error(
            "Firebase Database Error:",
            error
        );

    }

);


/* =====================================================
   UPDATE CONTACT
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


    if (type === "email") {

        element.href =
            `mailto:${value}`;

    }


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


    else {

        element.href =
            value;

    }


    element.style.display =
        "flex";

}
