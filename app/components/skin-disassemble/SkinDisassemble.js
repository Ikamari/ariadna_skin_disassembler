// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// Components
import { coordinates, extendedCoordinates } from "./PartCoordinates";

class SkinDisassemble extends Component {
    constructor(props) {
        super(props);

        //Used to tell when another part can be rendered
        this.inProgress = false
    }

    drawPartTexture(skin, coordinates, index, key) {
        //Get size of skin part to know which size must be canvas
        const canvas = this.refs.offscreenCanvas;
        const blank = this.refs.blank;
        const { addSkinPart } = this.props.SkinPartsActions;

        canvas.width = coordinates[2] - coordinates[0];
        canvas.height = coordinates[3] - coordinates[1];
        blank.width = canvas.width;
        blank.height = canvas.height;
        let context = canvas.getContext('2d');

        //Draw part of skin on canvas
        let image = new Image();
        image.onload = () => {
            context.drawImage(
                image,
                coordinates[0],
                coordinates[1],
                context.canvas.width,
                context.canvas.height,
                0,
                0,
                context.canvas.width,
                context.canvas.height
            );
            //Write rendered part to state and tell, that new part can be rendered
            this.inProgress = false;
            //Checks is current part is blank
            if(canvas.toDataURL() !== blank.toDataURL()) {
                addSkinPart(canvas.toDataURL("image/png"), [`${index}-${key}`]);
            }
        };
        image.src = skin;
    }

    renderQueue(skin, coordinates, index, key) {
        //Wait n ms before try to render new part again
        setTimeout(() => {
            if (!this.inProgress) {
                this.inProgress = true;
                this.drawPartTexture(skin, coordinates, index, key);
            } else {
                this.renderQueue(skin, coordinates, index, key);
            }
        }, 5);
    }

    getSkinParts(skin, index, size) {
        //Get main parts of skin (Skin layout version is pre-1.8)
        Object.keys(coordinates).map((key) => this.renderQueue(skin, coordinates[key], index, key));
        size.height === 64 ?
            //Get additional parts of skin (If skin layout version is +1.8)
            Object.keys(extendedCoordinates).map((key) => this.renderQueue(skin, extendedCoordinates[key], index, key)) : undefined;

    }

    disassembleSkins() {
        const {skins, sizes} = this.props.skins;
        const { removeAllSkinParts } = this.props.SkinPartsActions;
        removeAllSkinParts();
        //Give to function every skin and it's dimensions (height & width)
        Object.keys(skins).map((key) => this.getSkinParts(skins[key], key, sizes[key]));
    }

    render() {
        return(
            <div className="disassembler">
                <button className="button" onClick={() => this.disassembleSkins()}>Разобрать скины</button>
                <canvas className="hidden-render" ref="offscreenCanvas"/>
                <canvas className="hidden-render" ref="blank"/>
            </div>
        )
    }
}

// Actions
import * as processStatus from '../../actions/processStatus';
import * as skinParts from '../../actions/skinParts';

const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: bindActionCreators(processStatus.changePartLoadingStatus, dispatch),
    SkinPartsActions: bindActionCreators(skinParts, dispatch)
});

const mapStateToProps = state => ({
    skins: state.skins
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinDisassemble)
