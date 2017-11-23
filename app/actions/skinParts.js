export const uploadSkins = (parts) => ({
    type: "UPLOAD_PARTS",
    payload: parts
});

export const updateSkinParts = (part) => ({
    type: "UPDATE_PARTS",
    payload: part
});
