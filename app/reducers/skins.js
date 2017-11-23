const initialState = {
    skins: [],
    sizes: []
};

const skins = (state = initialState, action) => {
    switch(action.type) {
        case "UPLOAD_SKINS":
            return {skins: action.payload.skins, sizes: action.payload.sizes};
        case "UPDATE_SKINS": {
            let newState = {};
            Object.assign(newState, state.skins);
            delete newState[action.payload];
            return {...state, skins: newState};
        }
        default:
            return state
    }
};
export default skins