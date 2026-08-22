import {
    database,
    ref,
    set,
    get,
    update,
    remove,
    push
} from "./firebase-config.js";


/* =====================================================
   PROFILE
===================================================== */

export async function simpanProfile(data) {

    const profileRef =
        ref(database, "portfolio/profile");

    await set(profileRef, data);

}


export async function ambilProfile() {

    const profileRef =
        ref(database, "portfolio/profile");

    const snapshot =
        await get(profileRef);

    if (snapshot.exists()) {

        return snapshot.val();

    }

    return null;

}


/* =====================================================
   CONTACT
===================================================== */

export async function simpanContact(data) {

    const contactRef =
        ref(database, "portfolio/contact");

    await set(contactRef, data);

}


export async function ambilContact() {

    const contactRef =
        ref(database, "portfolio/contact");

    const snapshot =
        await get(contactRef);

    if (snapshot.exists()) {

        return snapshot.val();

    }

    return null;

}


/* =====================================================
   PROJECT
===================================================== */

export async function tambahProject(data) {

    const projectsRef =
        ref(database, "portfolio/projects");

    const projectRef =
        push(projectsRef);

    await set(
        projectRef,
        data
    );

    return projectRef.key;

}


export async function ambilProjects() {

    const projectsRef =
        ref(database, "portfolio/projects");

    const snapshot =
        await get(projectsRef);

    if (snapshot.exists()) {

        return snapshot.val();

    }

    return {};

}


export async function updateProject(
    projectId,
    data
) {

    const projectRef =
        ref(
            database,
            `portfolio/projects/${projectId}`
        );

    await update(
        projectRef,
        data
    );

}


export async function hapusProject(
    projectId
) {

    const projectRef =
        ref(
            database,
            `portfolio/projects/${projectId}`
        );

    await remove(projectRef);

}


/* =====================================================
   EXPERIENCE
===================================================== */

export async function tambahExperience(data) {

    const experienceRef =
        ref(
            database,
            "portfolio/experience"
        );

    const itemRef =
        push(experienceRef);

    await set(
        itemRef,
        data
    );

    return itemRef.key;

}


export async function ambilExperience() {

    const experienceRef =
        ref(
            database,
            "portfolio/experience"
        );

    const snapshot =
        await get(experienceRef);

    if (snapshot.exists()) {

        return snapshot.val();

    }

    return {};

}


export async function updateExperience(
    id,
    data
) {

    const itemRef =
        ref(
            database,
            `portfolio/experience/${id}`
        );

    await update(
        itemRef,
        data
    );

}


export async function hapusExperience(
    id
) {

    const itemRef =
        ref(
            database,
            `portfolio/experience/${id}`
        );

    await remove(itemRef);

}


/* =====================================================
   SKILLS
===================================================== */

export async function tambahSkill(data) {

    const skillsRef =
        ref(
            database,
            "portfolio/skills"
        );

    const skillRef =
        push(skillsRef);

    await set(
        skillRef,
        data
    );

    return skillRef.key;

}


export async function ambilSkills() {

    const skillsRef =
        ref(
            database,
            "portfolio/skills"
        );

    const snapshot =
        await get(skillsRef);

    if (snapshot.exists()) {

        return snapshot.val();

    }

    return {};

}


export async function updateSkill(
    id,
    data
) {

    const skillRef =
        ref(
            database,
            `portfolio/skills/${id}`
        );

    await update(
        skillRef,
        data
    );

}


export async function hapusSkill(
    id
) {

    const skillRef =
        ref(
            database,
            `portfolio/skills/${id}`
        );

    await remove(skillRef);

}