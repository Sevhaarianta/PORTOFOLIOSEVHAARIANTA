import {
    database,
    ref,
    get
} from "./firebase-config.js";


/* ==================================================
   HELPER
================================================== */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element && value !== undefined) {

        element.textContent =
            value || "";

    }

}


function setImage(
    selector,
    url,
    alt
) {

    const image =
        document.querySelector(selector);

    if (!image) return;


    if (url) {

        image.src = url;

    }


    if (alt) {

        image.alt = alt;

    }

}


/* ==================================================
   LOAD PORTFOLIO
================================================== */

async function loadPortfolio() {

    try {

        const snapshot =
            await get(
                ref(
                    database,
                    "portfolio"
                )
            );


        if (!snapshot.exists()) {

            console.log(
                "Belum ada data portfolio."
            );

            return;

        }


        const data =
            snapshot.val();


        console.log(
            "Portfolio:",
            data
        );



        /* ==================================================
           HERO
        ================================================== */

        if (data.hero) {

            const hero =
                data.hero;


            const heroDescription =
                document.querySelector(
                    ".hero-desc"
                );


            if (heroDescription) {

                heroDescription.textContent =
                    hero.description || "";

            }


            const heroMeta =
                document.querySelectorAll(
                    ".hero-meta strong"
                );


            if (heroMeta[0]) {

                heroMeta[0].textContent =
                    hero.location || "";

            }


            if (heroMeta[1]) {

                heroMeta[1].textContent =
                    hero.focus || "";

            }


            if (heroMeta[2]) {

                heroMeta[2].textContent =
                    hero.experience || "";

            }


            const status =
                document.querySelector(
                    ".status"
                );


            if (status && hero.status) {

                status.innerHTML =
                    `<span class="status-dot"></span>
                     ${hero.status}`;

            }

        }



        /* ==================================================
           ABOUT
        ================================================== */

        if (data.about) {

            const about =
                data.about;


            const aboutParagraphs =
                document.querySelectorAll(
                    ".about-content > p"
                );


            if (aboutParagraphs[0]) {

                aboutParagraphs[0].textContent =
                    about.paragraph1 || "";

            }


            if (aboutParagraphs[1]) {

                aboutParagraphs[1].textContent =
                    about.paragraph2 || "";

            }


            const aboutInfo =
                document.querySelectorAll(
                    ".about-info strong"
                );


            if (aboutInfo[0]) {

                aboutInfo[0].textContent =
                    about.field || "";

            }


            if (aboutInfo[1]) {

                aboutInfo[1].textContent =
                    about.tools || "";

            }


            if (aboutInfo[2]) {

                aboutInfo[2].textContent =
                    about.location || "";

            }

        }



        /* ==================================================
           PROJECTS
        ================================================== */

        if (data.projects) {

            const projects =
                data.projects;


            /* ==============================================
               PROJECT 01
            ============================================== */

            if (projects.project1) {

                const project =
                    projects.project1;


                const projectElement =
                    document.querySelectorAll(
                        ".project"
                    )[0];


                if (projectElement) {

                    /* IMAGE */

                    const image =
                        projectElement.querySelector(
                            ".project-image img"
                        );


                    if (
                        image &&
                        project.image
                    ) {

                        image.src =
                            project.image;

                        image.alt =
                            project.title ||
                            "Project 01";

                    }


                    /* CATEGORY */

                    const category =
                        projectElement.querySelector(
                            ".project-overlay > span"
                        );


                    if (category) {

                        category.textContent =
                            `01 / ${(
                                project.category ||
                                ""
                            ).toUpperCase()}`;

                    }


                    /* TITLE */

                    const title =
                        projectElement.querySelector(
                            ".project-overlay h3"
                        );


                    if (title) {

                        title.textContent =
                            project.title || "";

                    }


                    /* DESCRIPTION */

                    const description =
                        projectElement.querySelector(
                            ".project-overlay p"
                        );


                    if (description) {

                        description.textContent =
                            project.description || "";

                    }


                    /* LINK */

                    if (project.link) {

                        projectElement.href =
                            project.link;

                        projectElement.target =
                            "_blank";

                        projectElement.rel =
                            "noopener noreferrer";

                    }

                }

            }



            /* ==============================================
               PROJECT 02
            ============================================== */

            if (projects.project2) {

                const project =
                    projects.project2;


                const projectElement =
                    document.querySelectorAll(
                        ".project"
                    )[1];


                if (projectElement) {

                    /* IMAGE */

                    const image =
                        projectElement.querySelector(
                            ".project-image img"
                        );


                    if (
                        image &&
                        project.image
                    ) {

                        image.src =
                            project.image;

                        image.alt =
                            project.title ||
                            "Project 02";

                    }


                    /* CATEGORY */

                    const category =
                        projectElement.querySelector(
                            ".project-overlay > span"
                        );


                    if (category) {

                        category.textContent =
                            `02 / ${(
                                project.category ||
                                ""
                            ).toUpperCase()}`;

                    }


                    /* TITLE */

                    const title =
                        projectElement.querySelector(
                            ".project-overlay h3"
                        );


                    if (title) {

                        title.textContent =
                            project.title || "";

                    }


                    /* DESCRIPTION */

                    const description =
                        projectElement.querySelector(
                            ".project-overlay p"
                        );


                    if (description) {

                        description.textContent =
                            project.description || "";

                    }


                    /* LINK */

                    if (project.link) {

                        projectElement.href =
                            project.link;

                        projectElement.target =
                            "_blank";

                        projectElement.rel =
                            "noopener noreferrer";

                    }

                }

            }



            /* ==============================================
               PROJECT 03
            ============================================== */

            if (projects.project3) {

                const project =
                    projects.project3;


                const projectElement =
                    document.querySelectorAll(
                        ".project"
                    )[2];


                if (projectElement) {

                    /* IMAGE */

                    const image =
                        projectElement.querySelector(
                            ".project-image img"
                        );


                    if (
                        image &&
                        project.image
                    ) {

                        image.src =
                            project.image;

                        image.alt =
                            project.title ||
                            "Project 03";

                    }


                    /* CATEGORY */

                    const category =
                        projectElement.querySelector(
                            ".project-overlay > span"
                        );


                    if (category) {

                        category.textContent =
                            `03 / ${(
                                project.category ||
                                ""
                            ).toUpperCase()}`;

                    }


                    /* TITLE */

                    const title =
                        projectElement.querySelector(
                            ".project-overlay h3"
                        );


                    if (title) {

                        title.textContent =
                            project.title || "";

                    }


                    /* DESCRIPTION */

                    const description =
                        projectElement.querySelector(
                            ".project-overlay p"
                        );


                    if (description) {

                        description.textContent =
                            project.description || "";

                    }


                    /* LINK */

                    if (project.link) {

                        projectElement.href =
                            project.link;

                        projectElement.target =
                            "_blank";

                        projectElement.rel =
                            "noopener noreferrer";

                    }

                }

            }

        }



        /* ==================================================
           EXPERIENCE
        ================================================== */

        if (data.experience) {

            const experiences =
                data.experience;


            const experienceElements =
                document.querySelectorAll(
                    ".experience-item"
                );


            /* ==============================================
               EXPERIENCE 01
            ============================================== */

            if (
                experiences.experience1 &&
                experienceElements[0]
            ) {

                const experience =
                    experiences.experience1;


                const element =
                    experienceElements[0];


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
                    element.querySelectorAll(
                        ".experience-tags span"
                    );


                if (year) {

                    year.innerHTML =
                        `${experience.year || ""}
                        <span>SEKARANG</span>`;

                }


                if (company) {

                    company.textContent =
                        experience.company || "";

                }


                if (title) {

                    title.textContent =
                        experience.title || "";

                }


                if (description) {

                    description.textContent =
                        experience.description || "";

                }


                if (experience.tags) {

                    const tagArray =
                        experience.tags
                            .split(",")
                            .map(
                                tag =>
                                    tag.trim()
                            )
                            .filter(Boolean);


                    tags.forEach(
                        (
                            tagElement,
                            index
                        ) => {

                            if (
                                tagArray[index]
                            ) {

                                tagElement.textContent =
                                    tagArray[index];

                            }

                        }
                    );

                }

            }



            /* ==============================================
               EXPERIENCE 02
            ============================================== */

            if (
                experiences.experience2 &&
                experienceElements[1]
            ) {

                const experience =
                    experiences.experience2;


                const element =
                    experienceElements[1];


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
                    element.querySelectorAll(
                        ".experience-tags span"
                    );


                if (year) {

                    year.innerHTML =
                        `${experience.year || ""}
                        <span>SEKARANG</span>`;

                }


                if (company) {

                    company.textContent =
                        experience.company || "";

                }


                if (title) {

                    title.textContent =
                        experience.title || "";

                }


                if (description) {

                    description.textContent =
                        experience.description || "";

                }


                if (experience.tags) {

                    const tagArray =
                        experience.tags
                            .split(",")
                            .map(
                                tag =>
                                    tag.trim()
                            )
                            .filter(Boolean);


                    tags.forEach(
                        (
                            tagElement,
                            index
                        ) => {

                            if (
                                tagArray[index]
                            ) {

                                tagElement.textContent =
                                    tagArray[index];

                            }

                        }
                    );

                }

            }

        }



        /* ==================================================
           CONTACT
        ================================================== */

        if (data.contact) {

            const contact =
                data.contact;


            /* EMAIL */

            const email =
                document.getElementById(
                    "contactEmail"
                );


            if (
                email &&
                contact.email
            ) {

                email.href =
                    `mailto:${contact.email}`;

            }



            /* WHATSAPP */

            const whatsapp =
                document.getElementById(
                    "contactWhatsapp"
                );


            if (
                whatsapp &&
                contact.whatsapp
            ) {

                let number =
                    contact.whatsapp
                        .replace(
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


                whatsapp.href =
                    `https://wa.me/${number}`;

            }



            /* INSTAGRAM */

            const instagram =
                document.getElementById(
                    "contactInstagram"
                );


            if (
                instagram &&
                contact.instagram
            ) {

                instagram.href =
                    contact.instagram;

            }



            /* LINKEDIN */

            const linkedin =
                document.getElementById(
                    "contactLinkedin"
                );


            if (
                linkedin &&
                contact.linkedin
            ) {

                linkedin.href =
                    contact.linkedin;

            }



            /* YOUTUBE */

            const youtube =
                document.getElementById(
                    "contactYoutube"
                );


            if (
                youtube &&
                contact.youtube
            ) {

                youtube.href =
                    contact.youtube;

            }



            /* TIKTOK */

            const tiktok =
                document.getElementById(
                    "contactTiktok"
                );


            if (
                tiktok &&
                contact.tiktok
            ) {

                tiktok.href =
                    contact.tiktok;

            }

        }


    } catch (error) {

        console.error(
            "Gagal mengambil portfolio:",
            error
        );

    }

}



/* ==================================================
   START
================================================== */

loadPortfolio();



/* ==================================================
   REVEAL ANIMATION
================================================== */

const revealElements =
    document.querySelectorAll(
        ".section, .project, .experience-item, .skill-card, .about-photo, .about-content"
    );


const observer =
    new IntersectionObserver(
        (
            entries
        ) => {

            entries.forEach(
                entry => {

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
            threshold: .1
        }
    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

        observer.observe(
            element
        );

    }
);
