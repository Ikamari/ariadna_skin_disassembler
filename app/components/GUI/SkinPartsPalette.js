// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImagePalette from "./ImagePalette"

class SkinPartsPalette extends Component {
    render() {
        const { parts, removeSkinPart } = this.props;
        console.log("From storage skinParts - SkinPartsCarousel:", this.props);
        return(
            <ImagePalette images={parts} removeImage={(part) => removeSkinPart(part)} uniqueKey="part"/>
        )
    }
}

const mapStateToProps = state => ({
    parts: state.skinParts.parts
});

// Actions
import * as skinPartsActions from '../../actions/skinParts';

const mapDispatchToProps = dispatch => ({
    removeSkinPart: bindActionCreators(skinPartsActions.removeSkinPart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinPartsPalette)