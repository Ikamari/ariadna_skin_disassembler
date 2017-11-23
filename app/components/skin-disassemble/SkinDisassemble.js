// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
// Components
import { getSkinParts } from "./GetSkinParts";

class SkinDisassemble extends Component {
    disassembleSkins() {
        const { skins, sizes } = this.props.skins;
        let parts = {};

        Object.keys(skins).map((key) => Object.assign(parts, getSkinParts(skins[key], key, this.refs.offscreenCanvas, sizes[key])));
        console.log(parts);
    }

    render() {
        return(
            <div className="disassembler">
                <button className="button" onClick={() => this.disassembleSkins()}>Разобрать скины</button>
                <canvas className="hidden-render" ref="offscreenCanvas"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    skins: state.skins
});

export default connect(mapStateToProps)(SkinDisassemble)
