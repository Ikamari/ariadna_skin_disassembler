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
    constructor(props) {
        super(props);

        //Used to tell when another part can be rendered
        this.inProgress = false;
        this.queueLenght = 0;
        this.validSkins = {};
        this.skinSizes = {};
        this.skinScales = {};
    }

    checkSkinDimensions(height, width) {
        return getScale(height, width) !== false;
    }

    queueChecker() {
        setTimeout(() => {
            if (!this.inProgress) {
                const {changeSkinLoadingStatus} = this.props;
                changeSkinLoadingStatus();
                this.saveSkins(this.validSkins, this.skinSizes, this.skinScales)
            } else {
                this.queueChecker();
            }
        }, 10);
    }

    //Will leave images(skins) that has height & width = 64*32 or 64*64
    cleanUpSkins(skins, amount) {
        const { changeSkinLoadingStatus } = this.props;
        this.validSkins = {};
        this.skinSizes = {};
        this.skinScales = {};
        this.queueLenght = amount - 1;
        this.inProgress = true;
        let fileNum = 0;

        changeSkinLoadingStatus();
        this.queueChecker();

        const renderImage = () => {
            let image = new Image();
            image.onload = (e) => {
                let height = e.target.naturalHeight, width = e.target.naturalWidth;
                let scale = getScale(height, width);

                if(scale !== null) {
                    this.validSkins[fileNum] = skins[this.queueLenght];
                    this.skinSizes[fileNum] = {height, width};
                    this.skinScales[fileNum] = scale;
                    fileNum++;
                }

                this.queueLenght--;
                if(this.queueLenght >= 0) {
                    renderImage();
                } else {
                    this.inProgress = false;
                }
            };
            image.src = skins[this.queueLenght];
        };

        renderImage();

        // renderOneFromQueue(skin, coordinates, index, key, scale) {
        //     //Wait n ms before try to render new part again
        //     setTimeout(() => {
        //         if (!this.inProgress) {
        //             this.inProgress = true;
        //             this.drawPartTexture(skin, coordinates, index, key, scale);
        //         } else {
        //             this.renderOneFromQueue(skin, coordinates, index, key, scale);
        //         }
        //     }, 5);
        // }
    }

    saveSkins(skins, sizes, scales){
        const { uploadSkins } = this.props.skinsActions;

        console.log("Cleaned up skins:", skins, sizes, scales);

        uploadSkins(skins, sizes, scales);
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

