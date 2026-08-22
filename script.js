/* =====================================================
   SEVHA PORTFOLIO
   PUBLIC WEBSITE JAVASCRIPT
   FIREBASE SYNC VERSION
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
   3. NAVBAR
===================================================== */

const navbar =
    document.querySelector(".nav");

window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;

        const currentScroll =
            window.scrollY;

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
   4. SMOOTH SCROLL
===================================================== */

function setupSmoothScroll() {

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
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });

}

setupSmoothScroll();


/* =====================================================
   5. PROJECT IMAGE PARALLAX
===================================================== */

function setupProjectEffects() {

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

}


/* =====================================================
   6. HERO IMAGE TILT
===================================================== */

function setupHeroEffect() {

    const heroImage =
        document.querySelector(
            ".hero-image"
        );

    if (!heroImage) return;

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
   7. SKILL CARD EFFECT
===================================================== */

function setupSkillEffects() {

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

}


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
   10. ACTIVE NAVIGATION
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
   11. ACTIVE NAV STYLE
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
   12. CURRENT YEAR
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
   13. TOUCH DEVICE
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
            transform: none !important;
        }

        .project-image img {
            transform: none !important;
        }

    `;

    document.head.appendChild(
        touchStyle
    );

}


/* =====================================================
   14. CONTACT
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
            String(value).replace(
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


/* =====================================================
   15. RENDER HERO
===================================================== */

function renderHero(hero) {

    if (!hero) return;


    const description =
        document.querySelector(
            ".hero-desc"
        );

    if (
        description &&
        hero.description !== undefined
    ) {

        description.textContent =
            hero.description;

    }


    const status =
        document.querySelector(
            ".status"
        );

    if (
        status &&
        hero.status !== undefined
    ) {

        status.innerHTML = `
            <span class="status-dot"></span>
            ${escapeHTML(hero.status)}
        `;

    }


    const meta =
        document.querySelectorAll(
            ".hero-meta > div"
        );


    if (
        meta[0] &&
        hero.location !== undefined
    ) {

        const strong =
            meta[0].querySelector(
                "strong"
            );

        if (strong) {

            strong.textContent =
                hero.location;

        }

    }


    if (
        meta[1] &&
        hero.focus !== undefined
    ) {

        const strong =
            meta[1].querySelector(
                "strong"
            );

        if (strong) {

            strong.textContent =
                hero.focus;

        }

    }


    if (
        meta[2] &&
        hero.experience !== undefined
    ) {

        const strong =
            meta[2].querySelector(
                "strong"
            );

        if (strong) {

            strong.textContent =
                hero.experience;

        }

    }

}


/* =====================================================
   16. RENDER ABOUT
===================================================== */

function renderAbout(about) {

    if (!about) return;


    const paragraphs =
        document.querySelectorAll(
            ".about-content > p"
        );


    if (
        paragraphs[0] &&
        about.paragraph1 !== undefined
    ) {

        paragraphs[0].textContent =
            about.paragraph1;

    }


    if (
        paragraphs[1] &&
        about.paragraph2 !== undefined
    ) {

        paragraphs[1].textContent =
            about.paragraph2;

    }


    const aboutInfo =
        document.querySelectorAll(
            ".about-info > div"
        );


    if (
        aboutInfo[0] &&
        about.field !== undefined
    ) {

        aboutInfo[0]
            .querySelector("strong")
            .textContent =
            about.field;

    }


    if (
        aboutInfo[1] &&
        about.tools !== undefined
    ) {

        aboutInfo[1]
            .querySelector("strong")
            .textContent =
            about.tools;

    }


    if (
        aboutInfo[2] &&
        about.location !== undefined
    ) {

        aboutInfo[2]
            .querySelector("strong")
            .textContent =
            about.location;

    }

}


/* =====================================================
   17. RENDER PROJECTS
===================================================== */

function renderProjects(
    projects
) {

    if (!Array.isArray(projects)) {
        return;
    }


    const projectGrid =
        document.querySelector(
            ".project-grid"
        );

    if (!projectGrid) return;


    projectGrid.innerHTML = "";


    projects.forEach(
        (project, index) => {

            const projectElement =
                document.createElement(
                    "a"
                );

            projectElement.className =
                index === 0
                    ? "project project-large"
                    : "project";


            projectElement.href =
                project.link ||
                "#";


            projectElement.innerHTML = `

                <div class="project-image">

                    <img
                        src="${project.image || `assets/project-${String(index + 1).padStart(2, "0")}.jpg`}"
                        alt="${escapeHTML(project.title || "Project")}"
                    >

                    <div class="project-overlay">

                        <span>
                            ${escapeHTML(project.number || String(index + 1).padStart(2, "0"))}
                            /
                            ${escapeHTML(project.category || "")}
                        </span>

                        <h3>
                            ${escapeHTML(project.title || "")}
                        </h3>

                        <p>
                            ${escapeHTML(project.description || "")}
                        </p>

                        <div class="project-arrow">
                            ↗
                        </div>

                    </div>

                </div>

            `;


            projectGrid.appendChild(
                projectElement
            );

        }
    );


    setupProjectEffects();

}


/* =====================================================
   18. RENDER EXPERIENCE
===================================================== */

function renderExperience(
    experiences
) {

    if (!Array.isArray(experiences)) {
        return;
    }


    const experienceList =
        document.querySelector(
            ".experience-list"
        );

    if (!experienceList) return;


    experienceList.innerHTML = "";


    experiences.forEach(
        (experience) => {

            const item =
                document.createElement(
                    "article"
                );

            item.className =
                "experience-item";


            const tags =
                Array.isArray(
                    experience.tags
                )
                    ? experience.tags
                    : [];


            item.innerHTML = `

                <div class="experience-year">

                    ${escapeHTML(
                        experience.year || ""
                    )}

                </div>


                <div class="experience-content">

                    <span>
                        ${escapeHTML(
                            experience.company || ""
                        )}
                    </span>

                    <h3>
                        ${escapeHTML(
                            experience.title || ""
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            experience.description || ""
                        )}
                    </p>

                    <div class="experience-tags">

                        ${tags.map(
                            tag => `
                                <span>
                                    ${escapeHTML(tag)}
                                </span>
                            `
                        ).join("")}

                    </div>

                </div>

            `;


            experienceList.appendChild(
                item
            );

        }
    );


    /* Reveal ulang */

    const newItems =
        experienceList.querySelectorAll(
            ".experience-item"
        );

    newItems.forEach(
        (item) => {

            item.classList.add(
                "reveal"
            );

            revealObserver.observe(
                item
            );

        }
    );

}


/* =====================================================
   19. RENDER SKILLS
===================================================== */

function renderSkills(
    skills
) {

    if (!Array.isArray(skills)) {
        return;
    }


    const skillsGrid =
        document.querySelector(
            ".skills-grid"
        );

    if (!skillsGrid) return;


    skillsGrid.innerHTML = "";


    skills.forEach(
        (skill, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "skill-card";


            card.innerHTML = `

                <span>
                    ${escapeHTML(
                        skill.number ||
                        String(index + 1).padStart(2, "0")
                    )}
                </span>

                <h3>
                    ${escapeHTML(
                        skill.title || ""
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        skill.description || ""
                    )}
                </p>

            `;


            skillsGrid.appendChild(
                card
            );

        }
    );


    const newCards =
        skillsGrid.querySelectorAll(
            ".skill-card"
        );


    newCards.forEach(
        (card) => {

            card.classList.add(
                "reveal"
            );

            revealObserver.observe(
                card
            );

        }
    );


    setupSkillEffects();

}


/* =====================================================
   20. RENDER CONTACT
===================================================== */

function renderContact(
    contact
) {

    if (!contact) return;


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


/* =====================================================
   21. FIREBASE PORTFOLIO
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


        if (!data) {

            console.log(
                "Belum ada data portfolio di Firebase."
            );

            return;

        }


        console.log(
            "Firebase Portfolio:",
            data
        );


        /* HERO */

        renderHero(
            data.hero
        );


        /* ABOUT */

        renderAbout(
            data.about
        );


        /* CONTACT */

        renderContact(
            data.contact
        );


        /* PROJECT */

        renderProjects(
            data.projects
        );


        /* EXPERIENCE */

        renderExperience(
            data.experience
        );


        /* SKILLS */

        renderSkills(
            data.skills
        );

    },


    (error) => {

        console.error(
            "Firebase Database Error:",
            error
        );

    }
);


/* =====================================================
   22. ESCAPE HTML
===================================================== */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   23. PAGE LOAD
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


        setupProjectEffects();

        setupHeroEffect();

        setupSkillEffects();

    }
);


/* =====================================================
   SELESAI
===================================================== */

console.log(
    "SEVHA Portfolio Firebase Sync aktif."
);
