//Redux
import { combineReducers } from 'redux';
//Reducers
import skins from './skins';
import skinParts from './skinParts';
import processStatus from './processStatus';
import other from './other';

export default combineReducers({
    skins,
    skinParts,
    processStatus,
    other,
})