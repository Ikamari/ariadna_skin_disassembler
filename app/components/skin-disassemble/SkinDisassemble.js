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
        this.inProgress = false;
        this.queueLenght = 0;
    }

    createHash(s) {
        let hash = 0, i, char, l = s.length;
        if (l === 0) return hash;
        for (i = 0; i < l; i++) {
            char = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    queueChecker() {
        setTimeout(() => {
            if(this.queueLenght === 0) {
                const {changePartLoadingStatus} = this.props;
                changePartLoadingStatus();
            } else {
                this.queueChecker();
            }
        }, 100);
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
            this.queueLenght--;
            //Checks is current part is blank
            if(canvas.toDataURL() !== blank.toDataURL()) {
                addSkinPart(canvas.toDataURL("image/png"), this.createHash(canvas.toDataURL("image/png")), key);
            }
        };
        image.src = skin;
    }

    renderOneFromQueue(skin, coordinates, index, key) {
        //Wait n ms before try to render new part again
        setTimeout(() => {
            if (!this.inProgress) {
                this.inProgress = true;
                this.drawPartTexture(skin, coordinates, index, key);
            } else {
                this.renderOneFromQueue(skin, coordinates, index, key);
            }
        }, 5);
    }

    getSkinParts(skin, index, size) {
        //Get main parts of skin (Skin layout version is pre-1.8)
        Object.keys(coordinates).map((key) => {
            this.queueLenght++;
            this.renderOneFromQueue(skin, coordinates[key], index, key);
        });
        size.height === 64 ?
            //Get additional parts of skin (If skin layout version is +1.8)
            Object.keys(extendedCoordinates).map((key) => {
                this.queueLenght++;
                this.renderOneFromQueue(skin, extendedCoordinates[key], index, key);
            }) : undefined;
    }

    disassembleSkins() {
        const {skins, sizes} = this.props.skins;
        const {changePartLoadingStatus} = this.props;
        const { removeAllSkinParts } = this.props.SkinPartsActions;

        removeAllSkinParts();
        changePartLoadingStatus();

        //Give to function every skin and it's dimensions (height & width)
        Object.keys(skins).map((key) => this.getSkinParts(skins[key], key, sizes[key]));
        this.queueChecker();
    }

    render() {
        const { skinsAreLoading, partsAreLoading } = this.props.processStatus;
        return(
            <div className="disassembler">
                <button
                    onClick={() => {
                        if(!(skinsAreLoading || partsAreLoading)){
                            this.disassembleSkins();
                        }
                    }}
                    className={"button" + ((skinsAreLoading || partsAreLoading) ? " unactive" : "")}
                >Разобрать скины</button>
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
    changePartLoadingStatus: bindActionCreators(processStatus.changePartLoadingStatus, dispatch),
    SkinPartsActions: bindActionCreators(skinParts, dispatch)
});

const mapStateToProps = state => ({
    processStatus: state.processStatus,
    skins: state.skins
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinDisassemble)
