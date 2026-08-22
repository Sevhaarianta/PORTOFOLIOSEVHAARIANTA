/* =========================================================
   SEVHA PORTFOLIO
   ADMIN DASHBOARD JAVASCRIPT
========================================================= */


/* =========================================================
   DATABASE LOCAL
========================================================= */

const STORAGE_KEY = "sevhaPortfolioData";


const defaultData = {

    profile: {
        name: "Sevha Arianta",
        role: "Video Editor & Social Media Specialist",
        location: "Bogor, Indonesia",
        focus: "Creative Visual & Digital Content",
        description:
            "Saya adalah kreator visual yang berfokus pada video editing, social media, visual content, dan digital creative."
    },


    contact: {
        email: "",
        whatsapp: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        tiktok: ""
    },


    projects: [],


    experience: [],


    skills: []

};


let portfolioData = loadData();


/* =========================================================
   LOAD DATA
========================================================= */

function loadData() {

    const saved =
        localStorage.getItem(STORAGE_KEY);


    if (!saved) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultData)
        );

        return structuredClone(defaultData);
    }


    try {

        const data =
            JSON.parse(saved);


        return {

            ...defaultData,

            ...data,

            profile: {
                ...defaultData.profile,
                ...(data.profile || {})
            },

            contact: {
                ...defaultData.contact,
                ...(data.contact || {})
            },

            projects:
                Array.isArray(data.projects)
                    ? data.projects
                    : [],

            experience:
                Array.isArray(data.experience)
                    ? data.experience
                    : [],

            skills:
                Array.isArray(data.skills)
                    ? data.skills
                    : []

        };

    } catch (error) {

        console.error(
            "Gagal membaca data:",
            error
        );

        return structuredClone(defaultData);
    }

}


/* =========================================================
   SAVE DATA
========================================================= */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(portfolioData)
    );

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initNavigation();

        initQuickActions();

        initForms();

        initButtons();

        initModal();

        initImport();

        loadProfileForm();

        loadContactForm();

        renderProjects();

        renderExperience();

        renderSkills();

        updateStatistics();

        showCurrentDate();

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    const pages =
        document.querySelectorAll(
            ".admin-page"
        );


    menuItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const page =
                        item.dataset.page;


                    menuItems.forEach(
                        menu => {

                            menu.classList.remove(
                                "active"
                            );

                        }
                    );


                    item.classList.add(
                        "active"
                    );


                    pages.forEach(
                        section => {

                            section.classList.remove(
                                "active"
                            );

                        }
                    );


                    const target =
                        document.getElementById(
                            `page-${page}`
                        );


                    if (target) {

                        target.classList.add(
                            "active"
                        );

                    }


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }
    );


    /* MOBILE MENU */

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (
        mobileMenu &&
        sidebar
    ) {

        mobileMenu.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }

}


/* =========================================================
   QUICK ACTION
========================================================= */

function initQuickActions() {

    const buttons =
        document.querySelectorAll(
            "[data-open]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const page =
                        button.dataset.open;


                    const targetMenu =
                        document.querySelector(
                            `[data-page="${page}"]`
                        );


                    if (targetMenu) {

                        targetMenu.click();

                    }

                }
            );

        }
    );

}


/* =========================================================
   FORMS
========================================================= */

function initForms() {


    /* PROFILE */

    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                portfolioData.profile.name =
                    getValue(
                        "profileName"
                    );


                portfolioData.profile.role =
                    getValue(
                        "profileRole"
                    );


                portfolioData.profile.location =
                    getValue(
                        "profileLocation"
                    );


                portfolioData.profile.focus =
                    getValue(
                        "profileFocus"
                    );


                portfolioData.profile.description =
                    getValue(
                        "profileDescription"
                    );


                saveData();

                showToast(
                    "Profil berhasil disimpan"
                );

            }
        );

    }



    /* CONTACT */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                portfolioData.contact.email =
                    getValue(
                        "contactEmail"
                    );


                portfolioData.contact.whatsapp =
                    getValue(
                        "contactWhatsapp"
                    );


                portfolioData.contact.instagram =
                    getValue(
                        "contactInstagram"
                    );


                portfolioData.contact.linkedin =
                    getValue(
                        "contactLinkedin"
                    );


                portfolioData.contact.youtube =
                    getValue(
                        "contactYoutube"
                    );


                portfolioData.contact.tiktok =
                    getValue(
                        "contactTiktok"
                    );


                saveData();

                showToast(
                    "Kontak berhasil disimpan"
                );

            }
        );

    }

}


/* =========================================================
   BUTTONS
========================================================= */

function initButtons() {


    const addProject =
        document.getElementById(
            "addProject"
        );


    if (addProject) {

        addProject.addEventListener(
            "click",
            () => {

                openProjectModal();

            }
        );

    }



    const addExperience =
        document.getElementById(
            "addExperience"
        );


    if (addExperience) {

        addExperience.addEventListener(
            "click",
            () => {

                openExperienceModal();

            }
        );

    }



    const addSkill =
        document.getElementById(
            "addSkill"
        );


    if (addSkill) {

        addSkill.addEventListener(
            "click",
            () => {

                openSkillModal();

            }
        );

    }



    /* PROFILE IMAGE */

    const imageInput =
        document.getElementById(
            "profileImage"
        );


    if (imageInput) {

        imageInput.addEventListener(
            "change",
            handleProfileImage
        );

    }

}


/* =========================================================
   PROFILE
========================================================= */

function loadProfileForm() {

    const profile =
        portfolioData.profile;


    setValue(
        "profileName",
        profile.name
    );


    setValue(
        "profileRole",
        profile.role
    );


    setValue(
        "profileLocation",
        profile.location
    );


    setValue(
        "profileFocus",
        profile.focus
    );


    setValue(
        "profileDescription",
        profile.description
    );


    renderProfilePreview();

}


function renderProfilePreview() {

    const preview =
        document.getElementById(
            "profilePreview"
        );


    if (!preview) return;


    if (
        portfolioData.profile.image
    ) {

        preview.innerHTML = `
            <img
                src="${portfolioData.profile.image}"
                alt="Foto Profil"
            >
        `;

    } else {

        preview.innerHTML = `
            <span>
                ${getInitial(
                    portfolioData.profile.name
                )}
            </span>
        `;

    }

}


/* =========================================================
   PROFILE IMAGE
========================================================= */

function handleProfileImage(event) {

    const file =
        event.target.files[0];


    if (!file) return;


    if (!file.type.startsWith("image/")) {

        showToast(
            "File harus berupa gambar"
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        portfolioData.profile.image =
            e.target.result;


        saveData();

        renderProfilePreview();

        showToast(
            "Foto profil diperbarui"
        );

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   CONTACT
========================================================= */

function loadContactForm() {

    const contact =
        portfolioData.contact;


    setValue(
        "contactEmail",
        contact.email
    );


    setValue(
        "contactWhatsapp",
        contact.whatsapp
    );


    setValue(
        "contactInstagram",
        contact.instagram
    );


    setValue(
        "contactLinkedin",
        contact.linkedin
    );


    setValue(
        "contactYoutube",
        contact.youtube
    );


    setValue(
        "contactTiktok",
        contact.tiktok
    );

}


/* =========================================================
   PROJECT
========================================================= */

function renderProjects() {

    const container =
        document.getElementById(
            "projectList"
        );


    if (!container) return;


    if (
        portfolioData.projects.length === 0
    ) {

        container.innerHTML = `
            <div class="portfolio-empty">

                <div class="empty-icon">
                    ▣
                </div>

                <h3>
                    Belum ada project
                </h3>

                <p>
                    Tambahkan project pertama
                    kamu untuk ditampilkan
                    di portfolio.
                </p>

            </div>
        `;

        return;

    }


    container.innerHTML =
        portfolioData.projects
            .map(
                (project, index) => `

                    <div
                        class="admin-item"
                    >

                        <div
                            class="admin-item-image"
                        >

                            ${
                                project.image
                                    ? `
                                        <img
                                            src="${project.image}"
                                            alt="${escapeHTML(project.title)}"
                                        >
                                      `
                                    : `
                                        <div
                                            style="
                                            width:100%;
                                            height:100%;
                                            display:grid;
                                            place-items:center;
                                            color:#777;
                                            "
                                        >
                                            ▣
                                        </div>
                                      `
                            }

                        </div>


                        <div
                            class="admin-item-info"
                        >

                            <h3>
                                ${escapeHTML(
                                    project.title
                                )}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    project.description ||
                                    "Tidak ada deskripsi."
                                )}
                            </p>

                        </div>


                        <div
                            class="admin-item-meta"
                        >

                            ${escapeHTML(
                                project.category ||
                                "Project"
                            )}

                            ${
                                project.year
                                    ? ` · ${escapeHTML(project.year)}`
                                    : ""
                            }

                        </div>


                        <div
                            class="admin-item-actions"
                        >

                            <button
                                class="action-button"
                                onclick="editProject(${index})"
                                title="Edit"
                            >
                                ✎
                            </button>


                            <button
                                class="action-button delete"
                                onclick="deleteProject(${index})"
                                title="Hapus"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   PROJECT MODAL
========================================================= */

function openProjectModal(index = null) {

    const isEdit =
        index !== null;


    const project =
        isEdit
            ? portfolioData.projects[index]
            : {};


    openModal(`

        <h2 class="modal-title">
            ${
                isEdit
                    ? "Edit Project"
                    : "Tambah Project"
            }
        </h2>


        <form
            id="projectForm"
            class="admin-form"
        >


            <div class="form-group">

                <label>
                    Nama Project
                </label>

                <input
                    id="projectTitle"
                    type="text"
                    value="${escapeAttribute(
                        project.title || ""
                    )}"
                    placeholder="Contoh: Campaign Social Media"
                    required
                >

            </div>


            <div class="form-grid">


                <div class="form-group">

                    <label>
                        Kategori
                    </label>

                    <input
                        id="projectCategory"
                        type="text"
                        value="${escapeAttribute(
                            project.category || ""
                        )}"
                        placeholder="Video Editing"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Tahun
                    </label>

                    <input
                        id="projectYear"
                        type="text"
                        value="${escapeAttribute(
                            project.year || ""
                        )}"
                        placeholder="2026"
                    >

                </div>


            </div>


            <div class="form-group">

                <label>
                    Deskripsi
                </label>

                <textarea
                    id="projectDescription"
                    placeholder="Ceritakan project ini..."
                >${escapeHTML(
                    project.description || ""
                )}</textarea>

            </div>


            <div class="form-group">

                <label>
                    Link Project
                </label>

                <input
                    id="projectLink"
                    type="url"
                    value="${escapeAttribute(
                        project.link || ""
                    )}"
                    placeholder="https://..."
                >

            </div>


            <div class="form-group">

                <label>
                    Gambar Project
                </label>

                <input
                    id="projectImage"
                    type="file"
                    accept="image/*"
                >

            </div>


            <button
                class="primary-button"
                type="submit"
            >

                ${
                    isEdit
                        ? "Simpan Perubahan"
                        : "Tambah Project"
                }

            </button>


        </form>

    `);


    const form =
        document.getElementById(
            "projectForm"
        );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const file =
                document.getElementById(
                    "projectImage"
                ).files[0];


            const projectData = {

                title:
                    getValue(
                        "projectTitle"
                    ),

                category:
                    getValue(
                        "projectCategory"
                    ),

                year:
                    getValue(
                        "projectYear"
                    ),

                description:
                    getValue(
                        "projectDescription"
                    ),

                link:
                    getValue(
                        "projectLink"
                    ),

                image:
                    project.image || ""

            };


            if (file) {

                const reader =
                    new FileReader();


                reader.onload =
                    function(e) {

                        projectData.image =
                            e.target.result;


                        saveProject(
                            projectData,
                            index
                        );

                    };


                reader.readAsDataURL(
                    file
                );

            } else {

                saveProject(
                    projectData,
                    index
                );

            }

        }
    );

}


/* =========================================================
   SAVE PROJECT
========================================================= */

function saveProject(
    project,
    index
) {

    if (index === null) {

        portfolioData.projects.push(
            project
        );

    } else {

        portfolioData.projects[index] =
            project;

    }


    saveData();

    closeModal();

    renderProjects();

    updateStatistics();

    showToast(
        index === null
            ? "Project berhasil ditambahkan"
            : "Project berhasil diperbarui"
    );

}


/* =========================================================
   EDIT PROJECT
========================================================= */

function editProject(index) {

    openProjectModal(index);

}


/* =========================================================
   DELETE PROJECT
========================================================= */

function deleteProject(index) {

    const project =
        portfolioData.projects[index];


    const confirmDelete =
        confirm(
            `Hapus project "${project.title}"?`
        );


    if (!confirmDelete) return;


    portfolioData.projects.splice(
        index,
        1
    );


    saveData();

    renderProjects();

    updateStatistics();

    showToast(
        "Project berhasil dihapus"
    );

}


/* =========================================================
   EXPERIENCE
========================================================= */

function renderExperience() {

    const container =
        document.getElementById(
            "experienceList"
        );


    if (!container) return;


    if (
        portfolioData.experience.length === 0
    ) {

        container.innerHTML = `
            <div class="portfolio-empty">

                <div class="empty-icon">
                    ◷
                </div>

                <h3>
                    Belum ada pengalaman
                </h3>

                <p>
                    Tambahkan pengalaman kerja
                    kamu di sini.
                </p>

            </div>
        `;

        return;

    }


    container.innerHTML =
        portfolioData.experience
            .map(
                (item, index) => `

                    <div
                        class="admin-item"
                    >

                        <div
                            class="admin-item-info"
                        >

                            <h3>
                                ${escapeHTML(
                                    item.position
                                )}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    item.company
                                )}
                            </p>

                        </div>


                        <div
                            class="admin-item-meta"
                        >

                            ${escapeHTML(
                                item.year || ""
                            )}

                        </div>


                        <div
                            class="admin-item-actions"
                        >

                            <button
                                class="action-button"
                                onclick="editExperience(${index})"
                            >
                                ✎
                            </button>


                            <button
                                class="action-button delete"
                                onclick="deleteExperience(${index})"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   EXPERIENCE MODAL
========================================================= */

function openExperienceModal(
    index = null
) {

    const isEdit =
        index !== null;


    const item =
        isEdit
            ? portfolioData.experience[index]
            : {};


    openModal(`

        <h2 class="modal-title">
            ${
                isEdit
                    ? "Edit Pengalaman"
                    : "Tambah Pengalaman"
            }
        </h2>


        <form
            id="experienceForm"
            class="admin-form"
        >


            <div class="form-grid">


                <div class="form-group">

                    <label>
                        Perusahaan
                    </label>

                    <input
                        id="experienceCompany"
                        value="${escapeAttribute(
                            item.company || ""
                        )}"
                        placeholder="Nama perusahaan"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Posisi
                    </label>

                    <input
                        id="experiencePosition"
                        value="${escapeAttribute(
                            item.position || ""
                        )}"
                        placeholder="Video Editor"
                        required
                    >

                </div>


            </div>


            <div class="form-group">

                <label>
                    Tahun / Periode
                </label>

                <input
                    id="experienceYear"
                    value="${escapeAttribute(
                        item.year || ""
                    )}"
                    placeholder="2025 — Sekarang"
                >

            </div>


            <div class="form-group">

                <label>
                    Deskripsi
                </label>

                <textarea
                    id="experienceDescription"
                    placeholder="Jelaskan pekerjaan kamu..."
                >${escapeHTML(
                    item.description || ""
                )}</textarea>

            </div>


            <button
                class="primary-button"
                type="submit"
            >

                ${
                    isEdit
                        ? "Simpan Perubahan"
                        : "Tambah Pengalaman"
                }

            </button>


        </form>

    `);


    document
        .getElementById(
            "experienceForm"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const data = {

                    company:
                        getValue(
                            "experienceCompany"
                        ),

                    position:
                        getValue(
                            "experiencePosition"
                        ),

                    year:
                        getValue(
                            "experienceYear"
                        ),

                    description:
                        getValue(
                            "experienceDescription"
                        )

                };


                if (index === null) {

                    portfolioData.experience.push(
                        data
                    );

                } else {

                    portfolioData.experience[index] =
                        data;

                }


                saveData();

                closeModal();

                renderExperience();

                updateStatistics();

                showToast(
                    "Pengalaman berhasil disimpan"
                );

            }
        );

}


/* =========================================================
   EDIT EXPERIENCE
========================================================= */

function editExperience(index) {

    openExperienceModal(index);

}


/* =========================================================
   DELETE EXPERIENCE
========================================================= */

function deleteExperience(index) {

    const item =
        portfolioData.experience[index];


    if (
        !confirm(
            `Hapus pengalaman "${item.position}"?`
        )
    ) {

        return;

    }


    portfolioData.experience.splice(
        index,
        1
    );


    saveData();

    renderExperience();

    updateStatistics();

    showToast(
        "Pengalaman berhasil dihapus"
    );

}


/* =========================================================
   SKILLS
========================================================= */

function renderSkills() {

    const container =
        document.getElementById(
            "skillList"
        );


    if (!container) return;


    if (
        portfolioData.skills.length === 0
    ) {

        container.innerHTML = `
            <div class="portfolio-empty">

                <div class="empty-icon">
                    ✦
                </div>

                <h3>
                    Belum ada keahlian
                </h3>

                <p>
                    Tambahkan skill yang kamu kuasai.
                </p>

            </div>
        `;

        return;

    }


    container.innerHTML =
        portfolioData.skills
            .map(
                (skill, index) => `

                    <div
                        class="skill-admin-card"
                    >

                        <h3>
                            ${escapeHTML(
                                skill.name
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                skill.description || ""
                            )}
                        </p>


                        <div
                            class="skill-admin-actions"
                        >

                            <button
                                class="action-button"
                                onclick="editSkill(${index})"
                            >
                                ✎
                            </button>


                            <button
                                class="action-button delete"
                                onclick="deleteSkill(${index})"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   SKILL MODAL
========================================================= */

function openSkillModal(
    index = null
) {

    const isEdit =
        index !== null;


    const skill =
        isEdit
            ? portfolioData.skills[index]
            : {};


    openModal(`

        <h2 class="modal-title">
            ${
                isEdit
                    ? "Edit Keahlian"
                    : "Tambah Keahlian"
            }
        </h2>


        <form
            id="skillForm"
            class="admin-form"
        >


            <div class="form-group">

                <label>
                    Nama Keahlian
                </label>

                <input
                    id="skillName"
                    value="${escapeAttribute(
                        skill.name || ""
                    )}"
                    placeholder="Contoh: Adobe Premiere Pro"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Deskripsi
                </label>

                <textarea
                    id="skillDescription"
                    placeholder="Jelaskan kemampuan kamu..."
                >${escapeHTML(
                    skill.description || ""
                )}</textarea>

            </div>


            <button
                class="primary-button"
                type="submit"
            >

                ${
                    isEdit
                        ? "Simpan Perubahan"
                        : "Tambah Keahlian"
                }

            </button>


        </form>

    `);


    document
        .getElementById(
            "skillForm"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const data = {

                    name:
                        getValue(
                            "skillName"
                        ),

                    description:
                        getValue(
                            "skillDescription"
                        )

                };


                if (index === null) {

                    portfolioData.skills.push(
                        data
                    );

                } else {

                    portfolioData.skills[index] =
                        data;

                }


                saveData();

                closeModal();

                renderSkills();

                updateStatistics();

                showToast(
                    "Keahlian berhasil disimpan"
                );

            }
        );

}


/* =========================================================
   EDIT SKILL
========================================================= */

function editSkill(index) {

    openSkillModal(index);

}


/* =========================================================
   DELETE SKILL
========================================================= */

function deleteSkill(index) {

    const skill =
        portfolioData.skills[index];


    if (
        !confirm(
            `Hapus skill "${skill.name}"?`
        )
    ) {

        return;

    }


    portfolioData.skills.splice(
        index,
        1
    );


    saveData();

    renderSkills();

    updateStatistics();

    showToast(
        "Keahlian berhasil dihapus"
    );

}


/* =========================================================
   MODAL
========================================================= */

function initModal() {

    const close =
        document.getElementById(
            "modalClose"
        );


    const overlay =
        document.querySelector(
            ".modal-overlay"
        );


    if (close) {

        close.addEventListener(
            "click",
            closeModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );

}


function openModal(content) {

    const modal =
        document.getElementById(
            "modal"
        );


    const modalContent =
        document.getElementById(
            "modalContent"
        );


    if (!modal || !modalContent)
        return;


    modalContent.innerHTML =
        content;


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    if (!modal) return;


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const totalProjects =
        document.getElementById(
            "totalProjects"
        );


    const totalExperience =
        document.getElementById(
            "totalExperience"
        );


    const totalSkills =
        document.getElementById(
            "totalSkills"
        );


    if (totalProjects) {

        totalProjects.textContent =
            portfolioData.projects.length;

    }


    if (totalExperience) {

        totalExperience.textContent =
            portfolioData.experience.length;

    }


    if (totalSkills) {

        totalSkills.textContent =
            portfolioData.skills.length;

    }

}


/* =========================================================
   IMPORT DATA
========================================================= */

function initImport() {

    const input =
        document.getElementById(
            "importFile"
        );


    if (!input) return;


    input.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) return;


            const reader =
                new FileReader();


            reader.onload =
                function(e) {

                    try {

                        const imported =
                            JSON.parse(
                                e.target.result
                            );


                        portfolioData = {

                            ...defaultData,

                            ...imported,

                            profile: {
                                ...defaultData.profile,
                                ...(imported.profile || {})
                            },

                            contact: {
                                ...defaultData.contact,
                                ...(imported.contact || {})
                            },

                            projects:
                                Array.isArray(
                                    imported.projects
                                )
                                    ? imported.projects
                                    : [],

                            experience:
                                Array.isArray(
                                    imported.experience
                                )
                                    ? imported.experience
                                    : [],

                            skills:
                                Array.isArray(
                                    imported.skills
                                )
                                    ? imported.skills
                                    : []

                        };


                        saveData();


                        loadProfileForm();

                        loadContactForm();

                        renderProjects();

                        renderExperience();

                        renderSkills();

                        updateStatistics();


                        showToast(
                            "Data berhasil diimport"
                        );


                    } catch (error) {

                        console.error(
                            error
                        );


                        showToast(
                            "File JSON tidak valid"
                        );

                    }

                };


            reader.readAsText(file);

        }
    );

}


/* =========================================================
   EXPORT DATA
========================================================= */

function exportData() {

    const json =
        JSON.stringify(
            portfolioData,
            null,
            2
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "sevha-portfolio-backup.json";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Data berhasil diexport"
    );

}


/* =========================================================
   RESET DATA
========================================================= */

function resetData() {

    const confirmReset =
        confirm(
            "Yakin ingin menghapus semua data portfolio?"
        );


    if (!confirmReset)
        return;


    localStorage.removeItem(
        STORAGE_KEY
    );


    portfolioData =
        structuredClone(
            defaultData
        );


    saveData();


    loadProfileForm();

    loadContactForm();

    renderProjects();

    renderExperience();

    renderSkills();

    updateStatistics();


    showToast(
        "Data berhasil direset"
    );

}


/* =========================================================
   DATE
========================================================= */

function showCurrentDate() {

    const element =
        document.getElementById(
            "currentDate"
        );


    if (!element) return;


    const date =
        new Date();


    element.textContent =
        date.toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    const text =
        toast.querySelector(
            "small"
        );


    if (text) {

        text.textContent =
            message;

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   HELPER
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(
            id
        );


    return element
        ? element.value.trim()
        : "";

}


function setValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.value =
            value || "";

    }

}


function getInitial(name) {

    if (!name)
        return "S";


    return name
        .trim()
        .charAt(0)
        .toUpperCase();

}


function escapeHTML(value) {

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


function escapeAttribute(value) {

    return escapeHTML(
        value
    );

}


/* =========================================================
   GLOBAL FUNCTIONS
   Dipakai oleh tombol onclick di HTML
========================================================= */

window.editProject =
    editProject;


window.deleteProject =
    deleteProject;


window.editExperience =
    editExperience;


window.deleteExperience =
    deleteExperience;


window.editSkill =
    editSkill;


window.deleteSkill =
    deleteSkill;


window.exportData =
    exportData;


window.resetData =
    resetData;