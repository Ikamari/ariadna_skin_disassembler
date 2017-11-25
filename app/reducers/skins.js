const initialState = {
    skins: [],
    sizes: []
};

const skins = (state = initialState, action) => {
    switch(action.type) {
        case "UPLOAD_SKINS":
            return {skins: action.payload.skins, sizes: action.payload.sizes};
        case "REMOVE_SKIN": {
            let newState = {};
            Object.assign(newState, state.skins);
            delete newState[action.payload];
            return {...state, skins: newState};
        }
        case "REMOVE_ALL_SKINS": {
            let newState = {};
            return {...state, skins: newState};
        }
        default:
            return state
    }
};
export default skins