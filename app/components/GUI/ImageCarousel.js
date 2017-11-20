// React
import React, { Component } from "react";

export default class ImageCarousel extends Component {
    createImageBlock(image, index) {
        const { uniqueKey } = this.props;
        console.log(image);
        return(
            <div key={`${uniqueKey}-${index}`} className="image-carousel-element">
                <div className="remove-button" onClick={() => this.removeImage(index)}>x</div>
                <img ref={`${uniqueKey}-${index}`}/>
                {this.drawImage(image, index, uniqueKey)}
            </div>
        )
    }

    drawImage(image, index, uniqueKey) {
        this.refs[`${uniqueKey}-${index}`].src = image;
    }

    removeImage() {

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