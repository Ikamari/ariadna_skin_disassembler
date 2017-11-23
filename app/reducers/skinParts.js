const initialState = {
    parts: {}
};

const skinParts = (state = initialState, action) => {
    switch(action.type) {
        case "UPLOAD_PARTS":
            return {parts: action.payload};
        case "UPDATE_PARTS": {
            let newState = {};
            Object.assign(newState, state.parts);
            delete newState[action.payload];
            return {parts: newState};
        }
        default:
            return state
    }
};
export default skinParts