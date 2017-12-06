// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImageLoader from "./ImageLoader"
// Helpers
import getScale from "../../helpers/getScale";

class SkinLoader extends Component {
    checkSkinDimensions(height, width) {
        return getScale(height, width) !== false;
    }

    //Will leave images(skins) that has height & width = 64*32 or 64*64
    cleanUpSkins(skins, amount) {
        const { changeSkinLoadingStatus } = this.props;
        changeSkinLoadingStatus();
        let fileNum = 0, validSkins = {}, skinSizes = {}, skinScales = {};

        for(let i = 0; i < amount; i++) {
            let image = new Image();
            image.onload = (e) => {
                let height = e.target.naturalHeight, width = e.target.naturalWidth;
                let scale = getScale(height, width);

                if(scale !== false) {
                    validSkins[fileNum] = skins[i];
                    skinSizes[fileNum] = {height, width};
                    skinScales[fileNum] = scale;
                    fileNum++;
                }

                if(i === amount - 1) {
                    this.saveSkins(validSkins, skinSizes, skinScales)
                }
            };
            image.src = skins[i];
        }
    }

    saveSkins(skins, sizes, scales){
        const { changeSkinLoadingStatus } = this.props;
        const { uploadSkins } = this.props.skinsActions;

        console.log("Cleaned up skins:", skins, sizes, scales);

        uploadSkins(skins, sizes, scales);
        changeSkinLoadingStatus();
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
    changeSkinLoadingStatus: bindActionCreators(processStatusActions.changeSkinLoadingStatus, dispatch),
    skinsActions: bindActionCreators(skinsActions, dispatch)
});

export default connect(null , mapDispatchToProps)(SkinLoader)

