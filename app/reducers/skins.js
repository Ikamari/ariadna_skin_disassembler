const initialState = {
    skins: [],
    sizes: [],
    scales: []
};

const skins = (state = initialState, action) => {
    switch(action.type) {
        case "UPLOAD_SKINS":
            return {skins: action.payload.skins, sizes: action.payload.sizes, scales: action.payload.scales};
        case "REMOVE_SKIN": {
            let skinsNewState = {}, sizesNewState = {}, scalesNewState = {};

            Object.assign(skinsNewState, state.skins);
            Object.assign(sizesNewState, state.sizes);
            Object.assign(scalesNewState, state.scales);

            delete skinsNewState[action.payload];
            delete sizesNewState[action.payload];
            delete scalesNewState[action.payload];

            return {skins: skinsNewState, sizes: sizesNewState, scales: scalesNewState};
        }
        case "REMOVE_ALL_SKINS": {
            let skinsNewState = {}, sizesNewState = {}, scalesNewState = {};

            return {skins: skinsNewState, sizes: sizesNewState, scales: scalesNewState};
        }
        default:
            return state
    }
};
export default skins