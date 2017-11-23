// React
import React from "react";
// Components
import { coordinates, extendedCoordinates } from "./PartCoordinates";

let inProgress = false;

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
            setTimeout(() => {
                inProgress = false;
                return canvas.toDataURL("image/png");
            }, 25);
    };
    image.src = skin;
};

const getPartTexture = (skin, canvas, coordinates) => {
    setTimeout(() => {
        if(!inProgress) {
            inProgress = true;
            console.log(drawPartTexture(skin, canvas, coordinates));
        } else {
            getPartTexture(skin, canvas, coordinates);
        }
    }, 100);
};

export const getSkinParts = (skin, index, canvas, size) => {
    let parts = {};
    Object.keys(coordinates).map((key) => parts[`${index}-${key}`] = getPartTexture(skin, canvas, coordinates[key]));
    console.log(parts);
    size.height === 64 ?
        Object.keys(extendedCoordinates).map((key) => parts[`${index}-${key}`] = getPartTexture(skin, canvas, extendedCoordinates[key])) : undefined;
    return parts;
};

