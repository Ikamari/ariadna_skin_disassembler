// React
import React, { Component } from "react";
// Components
import FileLoader from "./FileLoader"
import ImageCarousel from "./ImageCarousel"

export default class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            skins: [],
            parts: []
        }
    }

    loadSkins(skins) {
        this.setState({
            skins: skins
        }, console.log("Loaded skins", this.state.skins, skins));
    }

    deleteSkin(index) {
        let skins = this.state.skins;
        skins.splice(index, 1);
        this.setState({
            skins: skins
        });
        console.log("Deleted skin");
    }

    deletePart(index) {
        let parts = this.state.skins;
        parts.splice(index, 1);
        this.setState({
            parts: parts
        });
        console.log("Deleted skin part");
    }

    render() {
        return(
            <div>
                <FileLoader loadImages={(images) => this.loadSkins(images)}/>
                <ImageCarousel images={this.state.skins} removeImage={(index) => this.deleteSkin(index)}/>
            </div>
        )
    }
}