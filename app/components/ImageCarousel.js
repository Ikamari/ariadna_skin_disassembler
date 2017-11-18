// React
import React, { Component } from "react";

export default class ImageCarousel extends Component {

    createImageBlock(image, index) {
        const { uniqueKey } = this.props;
        return(
            <div key={`${uniqueKey}-${index}`} className="image-carousel-element">
                <div className="remove-button" onClick={() => removeImage(index)}>x</div>
                <img ref={`${uniqueKey}-${index}`} onLoad={() => this.getImageSize(index, uniqueKey)}/>
                {this.drawImage(image, index, uniqueKey)}
            </div>
        )
    }

    getImageSize(index, uniqueKey) {
        const { getImageSize } = this.props;
        const image = this.refs[`${uniqueKey}-${index}`];
        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;
        getImageSize(index, imageHeight, imageWidth)
    }

    drawImage(image, index, uniqueKey) {
        let reader  = new FileReader();
        reader.onload = (e) => {
            this.refs[`${uniqueKey}-${index}`].src = e.target.result;
        };
        reader.readAsDataURL(image);
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