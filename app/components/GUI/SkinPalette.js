// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImagePalette from "./ImagePalette"

class SkinPalette extends Component {
    render() {
        const { skins, removeSkin } = this.props;
        const { skinsAreLoading, partsAreLoading } = this.props.processStatus;

        return(
            <div className="image-palette-wrapper">
                <div className={"image-palette-loading" + ((skinsAreLoading || partsAreLoading) ? " active" : "")}>Loading...</div>
                <ImagePalette images={skins} removeImage={(skin) => removeSkin(skin)} uniqueKey="skin"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    processStatus: state.processStatus,
    skins: state.skins.skins
});

// Actions
import * as skinActions from '../../actions/skins';

const mapDispatchToProps = dispatch => ({
    removeSkin: bindActionCreators(skinActions.removeSkin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinPalette)