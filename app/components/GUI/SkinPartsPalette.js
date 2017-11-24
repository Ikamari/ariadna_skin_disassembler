// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImagePalette from "./ImagePalette"

class SkinPartsPalette extends Component {
    render() {
        const { parts, updateSkinParts } = this.props;
        console.log("From storage skinParts - SkinPartsCarousel:", this.props);
        return(
            <ImagePalette images={parts} removeImage={updateSkinParts.updateSkinParts} uniqueKey="part"/>
        )
    }
}

const mapStateToProps = state => ({
    parts: state.skinParts.parts
});

// Actions
import * as skinPartsActions from '../../actions/skinParts';

const mapDispatchToProps = dispatch => ({
    updateSkinParts: bindActionCreators(skinPartsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinPartsPalette)