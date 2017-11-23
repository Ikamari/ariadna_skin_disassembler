export const uploadSkins = (skins, sizes) => ({
    type: "UPLOAD_SKINS",
    payload: {
        skins: skins,
        sizes: sizes
    }
});

export const updateSkins = (skin) => ({
    type: "UPDATE_SKINS",
    payload: skin
});

