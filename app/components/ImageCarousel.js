// React
import React, { Component } from "react";

export default class ImageCarousel extends Component {

    createImageBlock(image, index) {
        const { uniqueKey, removeImage } = this.props;
        return(
            <div key={`${uniqueKey}-${index}`} className="image-carousel-element">
                <div className="remove-button" onClick={() => removeImage(index)}>x</div>
                <img ref={`${uniqueKey}-${index}`} onLoad={(e) => {
                    e.target.naturalHeight > 64 || e.target.naturalWidth > 64 ?
                        removeImage(index) : undefined
                }}/>
                {this.drawImage(image, index, uniqueKey)}
            </div>
        )
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
                {images.map((image, index) => this.createImageBlock(image, index))}
            </div>
        )
    }
}