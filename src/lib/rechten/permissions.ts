export const Permissions = {
    INCIDENTEN: {
        AANMAKEN: "interface.incidenten.aanmaken",
        BEWERKEN: {
            PRIO: "interface.incidenten.bewerken.prio",
            MELDING: "interface.incidenten.bewerken.melding",
            NOTEPAD: "interface.incidenten.bewerken.notepad",
            LOCATIE: "interface.incidenten.bewerken.locatie",
            GEBIED: "interface.incidenten.bewerken.gebied",
            OGS: "interface.incidenten.bewerken.ogs",   
            EENHEDEN: "interface.incidenten.bewerken.eenheden",

        },
        OVERZICHT: {
            EIGEN: "interface.incidenten.overzicht.eigen",
            BRIGADE: "interface.incidenten.overzicht.brigade"
        },
        SPECIFIEK:"interface.incidenten.specifiek.bekijken",
        SLUITEN: {
            EIGEN: "interface.incidenten.sluiten.eigen",
            BRIGADE: "interface.incidenten.sluiten.brigade"
        },
    },

    PROTOCOLLEN: {
        BEKIJKEN: "interface.protocollen.bekijken",
        TOEVOEGEN: "beheer.protocollen.toevoegen",
        BEWERKEN: "beheer.protocollen.bewerken",
        VERWIJDEREN: "beheer.protocollen.verwijderen"
    }
};

export type Permission = keyof typeof Permissions;

