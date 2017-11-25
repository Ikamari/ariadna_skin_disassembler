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
        console.log("From storage skins - SkinCarousel:", this.props);
        return(
            <ImagePalette images={skins} removeImage={(skin) => removeSkin(skin)} uniqueKey="skin"/>
        )
    }
}

const mapStateToProps = state => ({
    skins: state.skins.skins
});

// Actions
import * as skinActions from '../../actions/skins';

const mapDispatchToProps = dispatch => ({
    removeSkin: bindActionCreators(skinActions.removeSkin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinPalette)