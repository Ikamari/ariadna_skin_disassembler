export const uploadSkins = (skins, sizes) => ({
    type: "UPLOAD_SKINS",
    payload: {
        skins: skins,
        sizes: sizes
    }
});

export const removeSkin = (skin) => ({
    type: "REMOVE_SKIN",
    payload: skin
});

export const removeAllSkins = () => ({
    type: "REMOVE_ALL_SKINS",
});
