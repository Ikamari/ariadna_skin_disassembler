//React
import React from "react";

export const coordinates = {
    "head":             [  0,  0, 32, 16 ], // x and y of left top and right bottom corners of part
    "head-armor":       [ 32,  0, 64, 16 ],
    "body":             [ 16, 16, 40, 32 ],
    "right-hand":       [ 40, 16, 56, 32 ],
    "right-leg":        [  0, 16, 16, 32 ],
};

export const extendedCoordinates = {
    "left-hand":        [ 32, 48, 48, 64 ],
    "left-hand-armor":  [ 48, 48, 64, 64 ],
    "body-armor":       [ 16, 32, 40, 48 ],
    "right-hand-armor": [ 40, 32, 56, 32 ],
    "left-leg":         [ 16, 48, 32, 64 ],
    "left-leg-armor":   [  0, 48, 16, 64 ],
    "right-leg-armor":  [  0, 32, 16, 48 ]
};