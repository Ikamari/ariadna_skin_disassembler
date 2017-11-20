// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImageLoader from "./ImageLoader"

class SkinLoader extends Component {
    cleanUpSkins(skins) {
        let validSkins = {}, skinSizes = {};

        //     const image = this.refs[`${uniqueKey}-${index}`];
        //     const imageWidth = image.naturalWidth;
        //     const imageHeight = image.naturalHeight;
        //     getImageSize(index, imageHeight, imageWidth)

        return {validSkins, skinSizes}
    }

    saveSkins(skins){

    }

    render() {
        console.log(this.props);
        return(
            <ImageLoader extension="png" returnPath={(skins) => this.saveSkins(this.cleanUpSkins(skins))}/>
        )
    }
}

const mapStateToProps = state => ({
    skins: state.skins
});

// Actions
import * as skinPartsActions from '../../actions/processStatus';

const mapDispatchToProps = dispatch => ({
    changeSkinLoadingStatus: bindActionCreators(skinPartsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinPartsCarousel)

