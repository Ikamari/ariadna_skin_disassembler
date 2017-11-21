// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImageLoader from "./ImageLoader"

class SkinLoader extends Component {
    checkSkinDimensions(height, width) {
        return (height === 64 || height === 32) && width === 64
    }

    cleanUpSkins(skins, amount) {
        let fileNum = 0, validSkins = {}, skinSizes = {};

        for(let i = 0; i < amount; i++) {
            let image = new Image();
            image.onload = (e) => {
                let height = e.target.naturalHeight, width = e.target.naturalWidth;
                if (this.checkSkinDimensions(height, width)) {
                    validSkins[fileNum] = skins[i];
                    skinSizes[fileNum] = {height, width};
                    fileNum++;
                }
                if(i === amount - 1) {
                    this.saveSkins(validSkins, skinSizes)
                }
            };
            image.src = skins[i];
        }
    }

    saveSkins(skins, sizes){
        const { uploadSkins } = this.props.skinsActions;
        console.log("Cleaned up skins - SkinLoader:", skins, sizes);
        uploadSkins(skins, sizes)
    }

    render() {
        return(
            <ImageLoader extension="png" returnPath={(skins, amount) => this.cleanUpSkins(skins, amount)}/>
        )
    }
}

// Actions
import * as processStatusActions from '../../actions/processStatus';
import * as skinsActions from '../../actions/skins';

const mapDispatchToProps = dispatch => ({
    changeSkinLoadingStatus: bindActionCreators(processStatusActions, dispatch),
    skinsActions: bindActionCreators(skinsActions, dispatch)
});

export default connect(null , mapDispatchToProps)(SkinLoader)

