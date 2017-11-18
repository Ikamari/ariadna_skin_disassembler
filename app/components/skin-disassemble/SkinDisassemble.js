// React
import React, { Component } from "react";
// Components
import { getSkinParts } from "./GetSkinParts";

export default class SkinDisassemble extends Component {
    disassembleSkins() {
        const { skins, sizes, partLoader } = this.props;
        let parts = {};

        Object.keys(skins).map((key) => Object.assign(parts, getSkinParts(skins[key], key, this.refs.offscreenCanvas, sizes[key])));
        partLoader(parts);
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

