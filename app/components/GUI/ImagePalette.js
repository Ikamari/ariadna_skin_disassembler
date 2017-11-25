// React
import React, { Component } from "react";

export default class ImagePalette extends Component {
    createImageBlock(image, index) {
        const { uniqueKey } = this.props;
        return(
            <div key={`${uniqueKey}-${index}`} className="image-carousel-element">
                <div className="remove-button" onClick={() => this.removeImage(index)}>x</div>
                <img src={image}/>
            </div>
        )
    }

    removeImage(index) {
        const { removeImage } = this.props;
        removeImage(index);
    }

    render() {
        const { images } = this.props;
        return(
            <div className="image-carousel">
                {Object.keys(images).map((key) => this.createImageBlock(images[key], key))}
            </div>
        )
    }
}