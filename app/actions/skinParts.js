export const addSkinPart = (part, key, bodyPart, isArmor) => ({
    type: "ADD_PART",
    payload: {
        part: part,
        key: key,
        bodyPart: bodyPart,
        isArmor: isArmor
    }
});

export const removeSkinPart = (part) => ({
    type: "REMOVE_PART",
    payload: part
});

export const removeAllSkinParts = () => ({
    type: "REMOVE_ALL_PARTS",
});
