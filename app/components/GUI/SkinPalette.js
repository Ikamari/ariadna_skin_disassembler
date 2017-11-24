// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImagePalette from "./ImagePalette"

class SkinPalette extends Component {
    render() {
        const { skins, updateSkins } = this.props;
        console.log("From storage skins - SkinCarousel:", this.props);
        return(
            <ImagePalette images={skins} removeImage={(skins) => updateSkins.updateSkins(skins)} uniqueKey="skin"/>
        )
    }
}

const mapStateToProps = state => ({
    skins: state.skins.skins
});

// Actions
import * as skinActions from '../../actions/skins';

const mapDispatchToProps = dispatch => ({
    updateSkins: bindActionCreators(skinActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinPalette)