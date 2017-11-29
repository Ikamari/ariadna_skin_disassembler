const initialState = {
    parts: {},
    partData: {}
};

const skinParts = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_PART": {
            let partsNewState = {}, partDataNewState = {};

            Object.assign(partsNewState, state.parts);
            Object.assign(partDataNewState, state.partData);

            partsNewState[action.payload.key] = action.payload.part;
            partDataNewState[action.payload.key] = { bodyPart: action.payload.bodyPart, isArmor: action.payload.isArmor };

            return {parts: partsNewState, partData: partDataNewState};
        }
        case "REMOVE_PART": {
            let partsNewState = {}, partDataNewState = {};

            Object.assign(partsNewState, state.parts);
            Object.assign(partDataNewState, state.partData);

            delete partsNewState[action.payload];
            delete partDataNewState[action.payload];

            return {parts: partsNewState, partData: partDataNewState};
        }
        case "REMOVE_ALL_PARTS": {
            let newState = {};
            return {parts: newState, partData: newState};
        }
        default:
            return state
    }
};
export default skinParts