const initialState = {
    skinsAreLoading: false,
    partsAreLoading: false,
    exporting: false
};

const processStatus = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE_SKIN_LOADING_STATUS":
            return {...state, skinsAreLoading: !state.skinsAreLoading};
        case "CHANGE_PART_LOADING_STATUS":
            return {...state, partsAreLoading: !state.partsAreLoading};
        case "CHANGE_EXPORT_STATUS":
            return {...state, exporting: !state.exporting};
        default:
            return state
    }
};
export default processStatus