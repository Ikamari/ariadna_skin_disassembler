//React
import React from 'react';

const defaultPartSizes = {
    head: [16, 32],
    body: [16, 14],
    limb: [16, 16]
};

const defaultSkinSizes = {
    new: [64, 64],
    old: [32, 64]
};

/**
 * Will return skin/part scale (64*32 = 1, 128*64 = 2, ...) or false, if the size is wrong
 */
const getScale = (textureHeight, textureWidth, isSkin = true) => {
    console.log(textureHeight, textureWidth, isSkin);
    let type = null;
    let scale = null;

    const countScale = (sizes) => {
        for(let i = 0, keys = Object.keys(sizes); i < keys.length; i++){
            if(textureHeight / sizes[keys[i]][0] !==  textureWidth / sizes[keys[i]][1])
                continue;
            if(textureHeight % sizes[keys[i]][0] === 0 && textureWidth % sizes[keys[i]][1] === 0) {
                scale = 0;
                type = keys[i];

                while(textureHeight !== sizes[keys[i]][0] * Math.pow(2, scale))
                    scale++;

                console.log(`Got ${isSkin ? type + " skin" : type} with scale ${scale}`);
                break;
            }
        }
    };

    isSkin ?
        countScale(defaultSkinSizes) : countScale(defaultPartSizes);

    return scale;
};

export default getScale;
