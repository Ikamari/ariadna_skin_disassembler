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
        const { partsAreLoading } = this.props.processStatus;

        return(
            <div className="image-palette-wrapper">
                <div className={"image-palette-loading" + ((partsAreLoading) ? " active" : "")}>Loading...</div>
                <ImagePalette images={parts} removeImage={(part) => removeSkinPart(part)} uniqueKey="part"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    processStatus: state.processStatus,
    parts: state.skinParts.parts
});

// Actions
import * as skinPartsActions from '../../actions/skinParts';

const mapDispatchToProps = dispatch => ({
    removeSkinPart: bindActionCreators(skinPartsActions.removeSkinPart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinPartsPalette)