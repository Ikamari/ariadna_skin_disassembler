const initialState = {
    skins: {},
    sizes: {}
};

const skins = (state = initialState, action) => {
    switch(action.type) {
        case "UPLOAD_SKINS":
            return {skins: action.payload.skins, sizes: action.payload.sizes};
        case "UPDATE_SKINS":
            return {...state, skins: action.payload};
        default:
            return state
    }
};
export default skins