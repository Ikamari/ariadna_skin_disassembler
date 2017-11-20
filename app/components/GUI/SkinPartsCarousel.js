// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImageCarousel from "./ImageCarousel"

class SkinPartsCarousel extends Component {
    render() {
        const { parts, updateSkinParts } = this.props;
        console.log("From storage - skinParts:", this.props);
        return(
            <ImageCarousel images={parts} removeImage={updateSkinParts}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SkinPartsCarousel)