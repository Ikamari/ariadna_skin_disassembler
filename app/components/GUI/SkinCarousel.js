// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import ImageCarousel from "./ImageCarousel"

class SkinCarousel extends Component {
    render() {
        const { skins, updateSkins } = this.props;
        console.log("From storage - skins:", this.props);
        return(
            <ImageCarousel images={skins} removeImage={updateSkins}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SkinCarousel)