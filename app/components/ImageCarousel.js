// React
import React, { Component } from "react";

export default class ImageCarousel extends Component {

    //Create block and then do this function
    drawImages(image, index) {
        let imageBlock = <img/>;
        let reader  = new FileReader();
        reader.onload = (e) => {
            imageBlock = e.target.result;
        };
        console.log(image);
        reader.readAsDataURL(image);
        return imageBlock;
    }

    render() {
        const { images } = this.props;
        return(
            <div className="image-carousel">
                {images.map((image, index) => this.drawImages(image, index))}
            </div>
        )
    }
}