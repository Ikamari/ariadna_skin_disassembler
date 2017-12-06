export const uploadSkins = (skins, sizes, scales) => ({
    type: "UPLOAD_SKINS",
    payload: {
        skins: skins,
        sizes: sizes,
        scales: scales
    }
});

export const removeSkin = (skin) => ({
    type: "REMOVE_SKIN",
    payload: skin
});

export const removeAllSkins = () => ({
    type: "REMOVE_ALL_SKINS",
});
