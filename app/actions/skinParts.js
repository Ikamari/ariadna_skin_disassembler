export const addSkinPart = (part, key) => ({
    type: "ADD_PART",
    payload: {
        part: part,
        key: key
    }
});

export const removeSkinPart = (part) => ({
    type: "REMOVE_PART",
    payload: part
});

export const removeAllSkinParts = () => ({
    type: "REMOVE_ALL_PARTS",
});
