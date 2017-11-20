const initialState = {
    parts: {}
};

const skinParts = (state = initialState, action) => {
    switch(action.type) {
        case "UPDATE_PARTS":
            return {...state, skinsAreLoading: action.payload};
        default:
            return state
    }
};
export default skinParts