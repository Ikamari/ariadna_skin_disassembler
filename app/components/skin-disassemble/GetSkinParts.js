// React
import React from "react";
// Components
import { coordinates, extendedCoordinates } from "./PartCoordinates";

const drawPartTexture = (skin) => {
    // drawTexture(context, canvasProps, layer, folderName, partName) {
    //     const selectedTextures = this.props.selectedTextures;
    //
    //     let partTexture = new Image();
    //     partTexture.onload = () => {
    //         context.drawImage(
    //             partTexture,
    //             canvasProps.posX,
    //             canvasProps.posY,
    //             canvasProps.sWidth,
    //             canvasProps.sHeight,
    //             canvasProps.sliceX,
    //             canvasProps.sliceY,
    //             canvasProps.dWidth + (layer ? 20 : 0),
    //             canvasProps.dHeight + (layer ? 20 : 0)
    //         );
    //     };
    //     partTexture.src = selectedTextures[partName][layer];
    // }
    //
    // renderCanvas() {
    //     const { partName, layer, side } = this.props;
    //     const folderName = this.getFolderName(partName);
    //     const selectedTextures = this.props.selectedTextures;
    //     const canvasProps = this.getCanvasProps(folderName, side, layer);
    //
    //     let canvasElement = this.refs.renderedPart;
    //     let context = canvasElement.getContext('2d');
    //     context.canvas.width  = canvasProps.dWidth + (layer ? 30 : 0);
    //     context.canvas.height = canvasProps.dHeight + (layer ? 30 : 0);
    //     context.shadowBlur = 6;
    //     context.shadowColor = "black";
    //     context.imageSmoothingEnabled = false;
    //
    //     selectedTextures[partName][layer] !== null ?
    //         this.drawTexture(context, canvasProps, layer, folderName, partName) : this.eraseTexture(context);
    // }
};

const getPartTexture = () => {

};

export const getSkinParts = (skin, index, canvas, size) => {
    let parts = {};
    Object.keys(coordinates).map((key) => parts[`${index}-${key}`] = getPartTexture());
    size.height === 64 ?
        Object.keys(extendedCoordinates).map((key) => parts[`${index}-${key}`] = getPartTexture()) : undefined;
    return parts;
};

