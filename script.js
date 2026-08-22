/* =====================================================
   SEVHA PORTFOLIO
   FIREBASE PUBLIC DATA
===================================================== */

import {
    database,
    ref,
    onValue
} from "./firebase-config.js";


/* =====================================================
   HELPER
===================================================== */

function setText(selector, value) {

    const element =
        document.querySelector(selector);

    if (
        element &&
        value !== undefined &&
        value !== null
    ) {
        element.textContent = value;
    }

}


function setHref(id, value, type = "link") {

    const element =
        document.getElementById(id);

    if (!element) return;

    if (!value) {
        element.style.display = "none";
        return;
    }

    let url = value;

    if (type === "email") {

        url = `mailto:${value}`;

    }

    if (type === "whatsapp") {

        let number =
            String(value).replace(/\D/g, "");

        if (number.startsWith("0")) {
            number = "62" + number.substring(1);
        }

        url = `https://wa.me/${number}`;

    }

    element.href = url;

    element.style.display = "flex";

}


/* =====================================================
   LOAD FIREBASE
===================================================== */

const portfolioRef =
    ref(
        database,
        "portfolio"
    );


onValue(

    portfolioRef,

    (snapshot) => {

        console.log("Firebase connected.");

        const data =
            snapshot.val();

        console.log("Portfolio:", data);


        if (!data) {

            console.warn(
                "Node portfolio belum memiliki data."
            );

            return;

        }


        /* =================================================
           HERO
        ================================================= */

        if (data.hero) {

            const hero =
                data.hero;


            const status =
                document.querySelector(".status");

            if (status && hero.status) {

                status.innerHTML = `
                    <span class="status-dot"></span>
                    ${hero.status}
                `;

            }


            setText(
                ".hero-desc",
                hero.description
            );


            const meta =
                document.querySelectorAll(
                    ".hero-meta > div strong"
                );


            if (meta[0] && hero.location) {
                meta[0].textContent =
                    hero.location;
            }


            if (meta[1] && hero.focus) {
                meta[1].textContent =
                    hero.focus;
            }


            if (meta[2] && hero.experience) {
                meta[2].textContent =
                    hero.experience;
            }

        }


        /* =================================================
           ABOUT
        ================================================= */

        if (data.about) {

            const about =
                data.about;


            const paragraphs =
                document.querySelectorAll(
                    ".about-content > p"
                );


            if (
                paragraphs[0] &&
                about.paragraph1
            ) {

                paragraphs[0].textContent =
                    about.paragraph1;

            }


            if (
                paragraphs[1] &&
                about.paragraph2
            ) {

                paragraphs[1].textContent =
                    about.paragraph2;

            }


            const info =
                document.querySelectorAll(
                    ".about-info > div strong"
                );


            if (
                info[0] &&
                about.field
            ) {

                info[0].textContent =
                    about.field;

            }


            if (
                info[1] &&
                about.tools
            ) {

                info[1].textContent =
                    about.tools;

            }


            if (
                info[2] &&
                about.location
            ) {

                info[2].textContent =
                    about.location;

            }

        }


        /* =================================================
           PROJECT
        ================================================= */

        if (data.projects) {

            const projectElements =
                document.querySelectorAll(
                    ".project"
                );


            let projects =
                Array.isArray(data.projects)
                    ? data.projects
                    : Object.values(data.projects);


            projects.forEach(
                (project, index) => {

                    const element =
                        projectElements[index];

                    if (!element) return;


                    const image =
                        element.querySelector(
                            ".project-image img"
                        );


                    const category =
                        element.querySelector(
                            ".project-overlay span"
                        );


                    const title =
                        element.querySelector(
                            ".project-overlay h3"
                        );


                    const description =
                        element.querySelector(
                            ".project-overlay p"
                        );


                    if (
                        image &&
                        project.image
                    ) {

                        image.src =
                            project.image;

                        image.alt =
                            project.title ||
                            `Project ${index + 1}`;

                    }


                    if (
                        category &&
                        project.category
                    ) {

                        category.textContent =
                            `${String(index + 1).padStart(2, "0")} / ${project.category}`;

                    }


                    if (
                        title &&
                        project.title
                    ) {

                        title.textContent =
                            project.title;

                    }


                    if (
                        description &&
                        project.description
                    ) {

                        description.textContent =
                            project.description;

                    }


                    if (project.link) {

                        element.href =
                            project.link;

                    }

                }
            );

        }


        /* =================================================
           EXPERIENCE
        ================================================= */

        if (data.experience) {

            const experienceElements =
                document.querySelectorAll(
                    ".experience-item"
                );


            let experiences =
                Array.isArray(data.experience)
                    ? data.experience
                    : Object.values(data.experience);


            experiences.forEach(
                (experience, index) => {

                    const element =
                        experienceElements[index];

                    if (!element) return;


                    const year =
                        element.querySelector(
                            ".experience-year"
                        );


                    const company =
                        element.querySelector(
                            ".experience-content > span"
                        );


                    const title =
                        element.querySelector(
                            ".experience-content h3"
                        );


                    const description =
                        element.querySelector(
                            ".experience-content p"
                        );


                    const tags =
                        element.querySelector(
                            ".experience-tags"
                        );


                    if (
                        year &&
                        experience.year
                    ) {

                        year.textContent =
                            experience.year;

                    }


                    if (
                        company &&
                        experience.company
                    ) {

                        company.textContent =
                            experience.company;

                    }


                    if (
                        title &&
                        experience.title
                    ) {

                        title.textContent =
                            experience.title;

                    }


                    if (
                        description &&
                        experience.description
                    ) {

                        description.textContent =
                            experience.description;

                    }


                    if (
                        tags &&
                        experience.tags
                    ) {

                        tags.innerHTML = "";


                        let tagList =
                            Array.isArray(
                                experience.tags
                            )
                                ? experience.tags
                                : String(
                                    experience.tags
                                ).split(",");


                        tagList.forEach(
                            (tag) => {

                                const span =
                                    document.createElement(
                                        "span"
                                    );

                                span.textContent =
                                    tag.trim();

                                tags.appendChild(
                                    span
                                );

                            }
                        );

                    }

                }
            );

        }


        /* =================================================
           CONTACT
        ================================================= */

        if (data.contact) {

            const contact =
                data.contact;


            setHref(
                "contactEmail",
                contact.email,
                "email"
            );


            setHref(
                "contactWhatsapp",
                contact.whatsapp,
                "whatsapp"
            );


            setHref(
                "contactInstagram",
                contact.instagram
            );


            setHref(
                "contactLinkedin",
                contact.linkedin
            );


            setHref(
                "contactYoutube",
                contact.youtube
            );


            setHref(
                "contactTiktok",
                contact.tiktok
            );

        }


        console.log(
            "✓ Portfolio berhasil dimuat."
        );

    },

    (error) => {

        console.error(
            "Firebase Error:",
            error
        );

    }

);


/* =====================================================
   ANIMATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "loaded"
        );


        const elements =
            document.querySelectorAll(
                ".section, .project, .experience-item, .skill-card, .about-photo, .about-content"
            );


        elements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

            }
        );


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "show"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.05
                    }
                );


            elements.forEach(
                (element) => {

                    observer.observe(
                        element
                    );

                }
            );

        }
        else {

            elements.forEach(
                (element) => {

                    element.classList.add(
                        "show"
                    );

                }
            );

        }

    }
);


/* =====================================================
   CURRENT YEAR
===================================================== */

const footer =
    document.querySelector("footer");

if (footer) {

    const first =
        footer.querySelector("div");

    if (first) {

        first.textContent =
            `© ${new Date().getFullYear()} SEVHA`;

    }

}


console.log(
    "✓ SEVHA Portfolio Script aktif."
);
