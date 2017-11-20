// React
import React from "react";
// Components
import { coordinates, extendedCoordinates } from "./PartCoordinates";

const drawPartTexture = (skin, canvas, coordinates) => {
    canvas.width = coordinates[2] - coordinates[0];
    canvas.height = coordinates[3] - coordinates[1];
    console.log(coordinates, canvas.width, canvas.height);
    let context = canvas.getContext('2d');

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
    };
    image.src = skin;
};

const getPartTexture = (skin, canvas, coordinates) => {
    drawPartTexture(skin, canvas, coordinates);
    console.log(canvas);
};

export const getSkinParts = (skin, index, canvas, size) => {
    let parts = {};
    let reader  = new FileReader();
    reader.onload = (e) => {
        console.log("Stated");
        Object.keys(coordinates).map((key) => parts[`${index}-${key}`] = getPartTexture(e.target.result, canvas, coordinates[key]));
        console.log(parts);
        size.height === 64 ?
            Object.keys(extendedCoordinates).map((key) => parts[`${index}-${key}`] = getPartTexture(e.target.result, canvas, extendedCoordinates[key])) : undefined;
        console.log("Finished");
        return parts;
    };
    reader.readAsDataURL(skin);
};

