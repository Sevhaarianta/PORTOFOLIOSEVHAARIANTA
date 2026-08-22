/* =====================================================
   SEVHA PORTFOLIO
   ADMIN JAVASCRIPT
===================================================== */

import {
    database,
    ref,
    get,
    update
} from "./firebase-config.js";

import {
    auth
} from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


/* =====================================================
   1. ELEMENT
===================================================== */

const userEmail =
    document.getElementById("userEmail");

const logoutButton =
    document.getElementById("logoutButton");

const saveButton =
    document.getElementById("saveButton");

const saveStatus =
    document.getElementById("saveStatus");


/* =====================================================
   2. CEK LOGIN
===================================================== */

onAuthStateChanged(
    auth,
    (user) => {

        if (!user) {

            window.location.href =
                "login.html";

            return;

        }

        if (userEmail) {

            userEmail.textContent =
                user.email;

        }

    }
);


/* =====================================================
   3. BUAT SECTION PROJECT & EXPERIENCE
===================================================== */

const contactSection =
    document.querySelector(
        "#contactEmail"
    )?.closest(".card");


/* =====================================================
   PROJECT SECTION
===================================================== */

const projectCard =
    document.createElement("section");

projectCard.className = "card";

projectCard.innerHTML = `

    <h2>
        Project
    </h2>

    <p class="card-description">
        Tambahkan dan ubah project yang pernah
        kamu kerjakan. Project ini akan tampil
        di website publik.
    </p>

    <div id="projectsContainer"></div>

    <button
        type="button"
        class="button"
        id="addProjectButton"
    >
        + Tambah Project
    </button>

`;


/* =====================================================
   EXPERIENCE SECTION
===================================================== */

const experienceCard =
    document.createElement("section");

experienceCard.className = "card";

experienceCard.innerHTML = `

    <h2>
        Pengalaman Kerja
    </h2>

    <p class="card-description">
        Kelola pengalaman kerja, freelance,
        maupun project profesional yang tampil
        di website.
    </p>

    <div id="experienceContainer"></div>

    <button
        type="button"
        class="button"
        id="addExperienceButton"
    >
        + Tambah Pengalaman
    </button>

`;


/*
   Masukkan sebelum Contact
*/

if (contactSection) {

    contactSection.parentNode.insertBefore(
        projectCard,
        contactSection
    );

    contactSection.parentNode.insertBefore(
        experienceCard,
        contactSection
    );

}


/* =====================================================
   4. CONTAINER
===================================================== */

const projectsContainer =
    document.getElementById(
        "projectsContainer"
    );

const experienceContainer =
    document.getElementById(
        "experienceContainer"
    );

const addProjectButton =
    document.getElementById(
        "addProjectButton"
    );

const addExperienceButton =
    document.getElementById(
        "addExperienceButton"
    );


/* =====================================================
   5. PROJECT DATA
===================================================== */

let projects = [];


/* =====================================================
   6. EXPERIENCE DATA
===================================================== */

let experiences = [];


/* =====================================================
   7. PROJECT CARD HTML
===================================================== */

function createProjectCard(
    project,
    index
) {

    const card =
        document.createElement("div");

    card.className =
        "project-card";

    card.innerHTML = `

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:18px;
        ">

            <h3>
                Project ${index + 1}
            </h3>

            <button
                type="button"
                class="delete-project"
                style="
                    border:none;
                    background:#111;
                    color:#fff;
                    padding:8px 12px;
                    border-radius:10px;
                    cursor:pointer;
                "
            >
                Hapus
            </button>

        </div>


        <div class="form-grid">


            <div class="form-group">

                <label>
                    Nomor
                </label>

                <input
                    type="text"
                    class="project-number"
                    value="${escapeHTML(
                        project.number || ""
                    )}"
                    placeholder="01"
                >

            </div>


            <div class="form-group">

                <label>
                    Kategori
                </label>

                <input
                    type="text"
                    class="project-category"
                    value="${escapeHTML(
                        project.category || ""
                    )}"
                    placeholder="VIDEO EDITING"
                >

            </div>


            <div class="form-group">

                <label>
                    Judul Project
                </label>

                <input
                    type="text"
                    class="project-title"
                    value="${escapeHTML(
                        project.title || ""
                    )}"
                    placeholder="Konten Konstruksi"
                >

            </div>


            <div class="form-group">

                <label>
                    Link Project
                </label>

                <input
                    type="url"
                    class="project-link"
                    value="${escapeHTML(
                        project.link || ""
                    )}"
                    placeholder="https://..."
                >

            </div>


            <div class="form-group full">

                <label>
                    Deskripsi
                </label>

                <textarea
                    class="project-description"
                    placeholder="Deskripsi project..."
                >${escapeHTML(
                    project.description || ""
                )}</textarea>

            </div>


            <div class="form-group full">

                <label>
                    URL Gambar Project
                </label>

                <input
                    type="url"
                    class="project-image"
                    value="${escapeHTML(
                        project.image || ""
                    )}"
                    placeholder="https://..."
                >

            </div>


        </div>

    `;


    /* DELETE */

    card
        .querySelector(".delete-project")
        .addEventListener(
            "click",
            () => {

                if (
                    !confirm(
                        "Hapus project ini?"
                    )
                ) {

                    return;

                }

                projects.splice(
                    index,
                    1
                );

                renderProjects();

            }
        );


    return card;

}


/* =====================================================
   8. RENDER PROJECTS
===================================================== */

function renderProjects() {

    projectsContainer.innerHTML = "";

    projects.forEach(
        (project, index) => {

            projectsContainer.appendChild(
                createProjectCard(
                    project,
                    index
                )
            );

        }
    );

}


/* =====================================================
   9. TAMBAH PROJECT
===================================================== */

addProjectButton.addEventListener(
    "click",
    () => {

        projects.push({

            number:
                String(
                    projects.length + 1
                ).padStart(
                    2,
                    "0"
                ),

            category:
                "CREATIVE",

            title:
                "Project Baru",

            description:
                "",

            image:
                "",

            link:
                "#"

        });


        renderProjects();

    }
);


/* =====================================================
   10. EXPERIENCE CARD
===================================================== */

function createExperienceCard(
    experience,
    index
) {

    const card =
        document.createElement("div");

    card.className =
        "project-card";

    card.innerHTML = `

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:18px;
        ">

            <h3>
                Pengalaman ${index + 1}
            </h3>

            <button
                type="button"
                class="delete-experience"
                style="
                    border:none;
                    background:#111;
                    color:#fff;
                    padding:8px 12px;
                    border-radius:10px;
                    cursor:pointer;
                "
            >
                Hapus
            </button>

        </div>


        <div class="form-grid">


            <div class="form-group">

                <label>
                    Tahun
                </label>

                <input
                    type="text"
                    class="experience-year"
                    value="${escapeHTML(
                        experience.year || ""
                    )}"
                    placeholder="2025 — SEKARANG"
                >

            </div>


            <div class="form-group">

                <label>
                    Perusahaan
                </label>

                <input
                    type="text"
                    class="experience-company"
                    value="${escapeHTML(
                        experience.company || ""
                    )}"
                    placeholder="DIBIKININ INTERIOR"
                >

            </div>


            <div class="form-group full">

                <label>
                    Posisi
                </label>

                <input
                    type="text"
                    class="experience-position"
                    value="${escapeHTML(
                        experience.position || ""
                    )}"
                    placeholder="Video Editor"
                >

            </div>


            <div class="form-group full">

                <label>
                    Deskripsi
                </label>

                <textarea
                    class="experience-description"
                    placeholder="Deskripsi pengalaman kerja..."
                >${escapeHTML(
                    experience.description || ""
                )}</textarea>

            </div>


            <div class="form-group full">

                <label>
                    Tags
                </label>

                <input
                    type="text"
                    class="experience-tags"
                    value="${escapeHTML(
                        Array.isArray(
                            experience.tags
                        )
                            ? experience.tags.join(", ")
                            : (
                                experience.tags ||
                                ""
                            )
                    )}"
                    placeholder="Video Editing, Content, Social Media"
                >

            </div>


        </div>

    `;


    /* DELETE */

    card
        .querySelector(
            ".delete-experience"
        )
        .addEventListener(
            "click",
            () => {

                if (
                    !confirm(
                        "Hapus pengalaman ini?"
                    )
                ) {

                    return;

                }

                experiences.splice(
                    index,
                    1
                );

                renderExperiences();

            }
        );


    return card;

}


/* =====================================================
   11. RENDER EXPERIENCE
===================================================== */

function renderExperiences() {

    experienceContainer.innerHTML = "";

    experiences.forEach(
        (experience, index) => {

            experienceContainer.appendChild(
                createExperienceCard(
                    experience,
                    index
                )
            );

        }
    );

}


/* =====================================================
   12. TAMBAH EXPERIENCE
===================================================== */

addExperienceButton.addEventListener(
    "click",
    () => {

        experiences.push({

            year:
                "2026 — SEKARANG",

            company:
                "PERUSAHAAN",

            position:
                "Posisi",

            description:
                "",

            tags: []

        });


        renderExperiences();

    }
);


/* =====================================================
   13. ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
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
   14. LOAD PORTFOLIO
===================================================== */

async function loadPortfolio() {

    try {

        const snapshot =
            await get(
                ref(
                    database,
                    "portfolio"
                )
            );


        if (
            !snapshot.exists()
        ) {

            console.log(
                "Belum ada data portfolio."
            );

            renderProjects();
            renderExperiences();

            return;

        }


        const data =
            snapshot.val();


        /* =============================================
           HERO
        ============================================= */

        if (data.hero) {

            document.getElementById(
                "heroStatus"
            ).value =
                data.hero.status || "";


            document.getElementById(
                "heroLocation"
            ).value =
                data.hero.location || "";


            document.getElementById(
                "heroFocus"
            ).value =
                data.hero.focus || "";


            document.getElementById(
                "heroExperience"
            ).value =
                data.hero.experience || "";


            document.getElementById(
                "heroDescription"
            ).value =
                data.hero.description || "";

        }


        /* =============================================
           ABOUT
        ============================================= */

        if (data.about) {

            document.getElementById(
                "aboutField"
            ).value =
                data.about.field || "";


            document.getElementById(
                "aboutTools"
            ).value =
                data.about.tools || "";


            document.getElementById(
                "aboutLocation"
            ).value =
                data.about.location || "";


            document.getElementById(
                "aboutParagraph1"
            ).value =
                data.about.paragraph1 || "";


            document.getElementById(
                "aboutParagraph2"
            ).value =
                data.about.paragraph2 || "";

        }


        /* =============================================
           PROJECT
        ============================================= */

        if (
            data.projects
        ) {

            if (
                Array.isArray(
                    data.projects
                )
            ) {

                projects =
                    data.projects;

            } else {

                projects =
                    Object.values(
                        data.projects
                    );

            }

        } else {

            projects = [];

        }


        renderProjects();


        /* =============================================
           EXPERIENCE
        ============================================= */

        if (
            data.experience
        ) {

            if (
                Array.isArray(
                    data.experience
                )
            ) {

                experiences =
                    data.experience;

            } else {

                experiences =
                    Object.values(
                        data.experience
                    );

            }

        } else {

            experiences = [];

        }


        renderExperiences();


        /* =============================================
           CONTACT
        ============================================= */

        if (data.contact) {

            document.getElementById(
                "contactEmail"
            ).value =
                data.contact.email || "";


            document.getElementById(
                "contactWhatsapp"
            ).value =
                data.contact.whatsapp || "";


            document.getElementById(
                "contactInstagram"
            ).value =
                data.contact.instagram || "";


            document.getElementById(
                "contactLinkedin"
            ).value =
                data.contact.linkedin || "";


            document.getElementById(
                "contactYoutube"
            ).value =
                data.contact.youtube || "";


            document.getElementById(
                "contactTiktok"
            ).value =
                data.contact.tiktok || "";

        }


        console.log(
            "Portfolio berhasil dimuat:",
            data
        );


    } catch (error) {

        console.error(
            "Gagal mengambil data:",
            error
        );

    }

}


loadPortfolio();


/* =====================================================
   15. AMBIL DATA PROJECT DARI FORM
===================================================== */

function collectProjects() {

    const cards =
        projectsContainer.querySelectorAll(
            ".project-card"
        );


    return Array.from(
        cards
    ).map(
        (card, index) => {

            return {

                number:
                    card
                        .querySelector(
                            ".project-number"
                        )
                        .value
                        .trim(),

                category:
                    card
                        .querySelector(
                            ".project-category"
                        )
                        .value
                        .trim(),

                title:
                    card
                        .querySelector(
                            ".project-title"
                        )
                        .value
                        .trim(),

                description:
                    card
                        .querySelector(
                            ".project-description"
                        )
                        .value
                        .trim(),

                image:
                    card
                        .querySelector(
                            ".project-image"
                        )
                        .value
                        .trim(),

                link:
                    card
                        .querySelector(
                            ".project-link"
                        )
                        .value
                        .trim()

            };

        }
    );

}


/* =====================================================
   16. AMBIL DATA EXPERIENCE
===================================================== */

function collectExperiences() {

    const cards =
        experienceContainer.querySelectorAll(
            ".project-card"
        );


    return Array.from(
        cards
    ).map(
        (card) => {

            const tags =
                card
                    .querySelector(
                        ".experience-tags"
                    )
                    .value
                    .split(",")
                    .map(
                        tag =>
                            tag.trim()
                    )
                    .filter(
                        tag =>
                            tag.length > 0
                    );


            return {

                year:
                    card
                        .querySelector(
                            ".experience-year"
                        )
                        .value
                        .trim(),

                company:
                    card
                        .querySelector(
                            ".experience-company"
                        )
                        .value
                        .trim(),

                position:
                    card
                        .querySelector(
                            ".experience-position"
                        )
                        .value
                        .trim(),

                description:
                    card
                        .querySelector(
                            ".experience-description"
                        )
                        .value
                        .trim(),

                tags:
                    tags

            };

        }
    );

}


/* =====================================================
   17. SIMPAN SEMUA
===================================================== */

saveButton.addEventListener(
    "click",
    async () => {

        saveButton.disabled =
            true;

        saveButton.textContent =
            "Menyimpan...";


        saveStatus.style.display =
            "none";


        try {

            const portfolioData = {

                /* =====================================
                   HERO
                ===================================== */

                hero: {

                    status:
                        document.getElementById(
                            "heroStatus"
                        ).value.trim(),

                    location:
                        document.getElementById(
                            "heroLocation"
                        ).value.trim(),

                    focus:
                        document.getElementById(
                            "heroFocus"
                        ).value.trim(),

                    experience:
                        document.getElementById(
                            "heroExperience"
                        ).value.trim(),

                    description:
                        document.getElementById(
                            "heroDescription"
                        ).value.trim()

                },


                /* =====================================
                   ABOUT
                ===================================== */

                about: {

                    field:
                        document.getElementById(
                            "aboutField"
                        ).value.trim(),

                    tools:
                        document.getElementById(
                            "aboutTools"
                        ).value.trim(),

                    location:
                        document.getElementById(
                            "aboutLocation"
                        ).value.trim(),

                    paragraph1:
                        document.getElementById(
                            "aboutParagraph1"
                        ).value.trim(),

                    paragraph2:
                        document.getElementById(
                            "aboutParagraph2"
                        ).value.trim()

                },


                /* =====================================
                   PROJECT
                ===================================== */

                projects:
                    collectProjects(),


                /* =====================================
                   EXPERIENCE
                ===================================== */

                experience:
                    collectExperiences(),


                /* =====================================
                   CONTACT
                ===================================== */

                contact: {

                    email:
                        document.getElementById(
                            "contactEmail"
                        ).value.trim(),

                    whatsapp:
                        document.getElementById(
                            "contactWhatsapp"
                        ).value.trim(),

                    instagram:
                        document.getElementById(
                            "contactInstagram"
                        ).value.trim(),

                    linkedin:
                        document.getElementById(
                            "contactLinkedin"
                        ).value.trim(),

                    youtube:
                        document.getElementById(
                            "contactYoutube"
                        ).value.trim(),

                    tiktok:
                        document.getElementById(
                            "contactTiktok"
                        ).value.trim()

                }

            };


            await update(
                ref(
                    database,
                    "portfolio"
                ),
                portfolioData
            );


            saveStatus.textContent =
                "✓ Semua perubahan berhasil disimpan ke Firebase.";

            saveStatus.style.display =
                "block";


            console.log(
                "Data tersimpan:",
                portfolioData
            );


        } catch (error) {

            console.error(
                "Gagal menyimpan:",
                error
            );


            saveStatus.textContent =
                "✕ Gagal menyimpan perubahan. Cek Console.";

            saveStatus.style.display =
                "block";

        }


        saveButton.disabled =
            false;

        saveButton.textContent =
            "Simpan Perubahan";

    }
);


/* =====================================================
   18. LOGOUT
===================================================== */

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await signOut(
                auth
            );


            window.location.href =
                "login.html";


        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    }
);


/* =====================================================
   19. SELESAI
===================================================== */

console.log(
    "SEVHA ADMIN berhasil dijalankan."
);
