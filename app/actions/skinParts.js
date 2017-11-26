export const addSkinPart = (part, key, partData) => ({
    type: "ADD_PART",
    payload: {
        part: part,
        key: key,
        partData: partData
    }
});

export const removeSkinPart = (part) => ({
    type: "REMOVE_PART",
    payload: part
});

export const removeAllSkinParts = () => ({
    type: "REMOVE_ALL_PARTS",
});
