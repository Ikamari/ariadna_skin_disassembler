const initialState = {
    parts: {}
};

const skinParts = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_PART": {
            let newState = {};
            Object.assign(newState, state.parts);
            newState[action.payload.key] = action.payload.part;
            return {parts: newState};
        }
        case "REMOVE_PART": {
            let newState = {};
            Object.assign(newState, state.parts);
            delete newState[action.payload];
            return {parts: newState};
        }
        case "REMOVE_ALL_PARTS": {
            let newState = {};
            return {parts: newState};
        }
        default:
            return state
    }
};
export default skinParts