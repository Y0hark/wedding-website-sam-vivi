// Centralized program & venue data - Wedding Website Samuel & Viviana
// Single source of truth for locations, travel info, guest instructions and
// per-event assets. Times/titles/short descriptions stay in index.html
// (and translations.js) as the primary display copy; the event detail modal
// reads them live from the DOM so they are never duplicated here.

// ========================================
// VENUES
// ========================================
const VENUES = {
    hameau: {
        name: "Village de gîtes Le Hameau du Prat",
        shortName: "Hameau du Prat",
        address: "716 Chemin du Prat – 07260 Ribes",
        mapQuery: "Hameau du Prat, 716 Chemin du Prat, 07260 Ribes",
        // No additional arrival information exists yet in the project.
        arrivalInfo: null
    },
    eglise: {
        name: "Église Saint-Pierre-ès-Liens",
        shortName: "Église Saint-Pierre-ès-Liens",
        address: "07460 Banne, Ardèche",
        // Used for the Google Maps search - official search name provided for this venue.
        mapQuery: "Église St Pierre aux Liens de Banne, 07460 Banne",
        travelTimeFromHameau: "Environ 30 minutes de route depuis le Hameau du Prat",
        arrivalInfoKey: "venues.eglise.arrivalInfo"
    }
};

// ========================================
// MAP LINK HELPERS
// ========================================
function buildMapsSearchUrl(query) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

function buildDirectionsUrl(originQuery, destinationQuery) {
    return "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(originQuery) +
        "&destination=" + encodeURIComponent(destinationQuery);
}

// ========================================
// PROGRAM EVENTS - extra detail data keyed by data-event-id
// ========================================
const PROGRAM_EVENTS = {
    "friday-welcome": {
        day: "friday",
        consignesKeys: ["essentials.sheets"],
        assets: [
            { labelKey: "assets.discoverChalets", url: "medias/chalet.jpg", type: "image" }
        ]
    },
    "friday-bbq": {
        day: "friday"
    },
    "saturday-breakfast": {
        day: "saturday"
    },
    "saturday-eglise": {
        day: "saturday",
        detailDescKey: "modal.egliseDetail"
    },
    "saturday-lunch": {
        day: "saturday"
    },
    "saturday-rest": {
        day: "saturday",
        assets: [
            { labelKey: "assets.viewPlayArea", url: "medias/aire_de_jeu.webp", type: "image" }
        ]
    },
    "saturday-secular": {
        day: "saturday",
        consignesKeys: ["essentials.eveningWeather"]
    },
    "saturday-aperitif": {
        day: "saturday",
        consignesKeys: ["essentials.eveningWeather"]
    },
    "saturday-photobooth": {
        day: "saturday"
    },
    "saturday-dinner": {
        day: "saturday",
        consignesKeys: ["essentials.eveningWeather"],
        assets: [
            { labelKey: "assets.viewReceptionRoom", url: "medias/salle_reception.jpeg", type: "image" }
        ]
    },
    "saturday-party": {
        day: "saturday",
        consignesKeys: ["essentials.eveningWeather"]
    },
    "saturday-after": {
        day: "saturday"
    },
    "sunday-brunch": {
        day: "sunday"
    }
};

// Assets available for venues themselves (shown in the "Lieux" section)
const VENUE_ASSETS = {
    hameau: [
        { labelKey: "assets.discoverGite", url: "medias/gite-hameau-prat1_gd.jpg", type: "image" }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { VENUES, PROGRAM_EVENTS, VENUE_ASSETS, buildMapsSearchUrl, buildDirectionsUrl };
}
