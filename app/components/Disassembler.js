// React
import React, { Component } from "react";
// Components
import FileLoader from "./FileLoader"

export default class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    getImages(event) {
        event.preventDefault();

        const image = event.target.files;
        console.log(image[0].name.split('.').pop());
        let reader  = new FileReader();
        reader.onload = (e) => {
            this.refs.image.src = e.target.result;
        };
        reader.readAsDataURL(image[0]);
        console.log(this.refs.image.clientWidth);
    }

    render() {
        return(
            <div>
                <FileLoader getImages={(images) => this.getImages(images)}/>
                <img ref="image" onClick={(e) => console.log(e.target.clientWidth)}/>
            </div>
        )
    }
}