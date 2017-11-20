// React
import React, { Component } from "react";
// Components
import FileLoader from "./FileLoader";
import ImageCarousel from "./ImageCarousel";
import SkinDisassemble from "./skin-disassemble/SkinDisassemble"

export default class Calculator extends Component {
    constructor(props){
        super(props);

        this.skinSize = {};
        this.state = {
            skins: {},
            parts: {}
        }
    }

    loadSkins(skins) {
        this.setState({
            skins: skins,
            pars: {}
        });
        this.skinSize = {};
        console.log("Loaded skins", skins)
    }

    getImageSize(name, height, width) {
        this.skinSize[name] = {height, width};
        if(Object.keys(this.skinSize).length === Object.keys(this.state.skins).length) {
            console.log("Got size of images", this.skinSize);
            this.doImageCleanup();
        }
    }

    doImageCleanup() {
        let cleanedUp = false;
        let skins = this.state.skins;
        Object.keys(this.skinSize).map((key) => {
            const {height, width} = this.skinSize[key];
            if (!((height === 64 || height === 32) && width === 64)) {
                delete skins[key];
                cleanedUp = true;
            }
        });
        if (cleanedUp) {
            this.setState({
                skins: skins
            });
            console.log("Cleaned up images", this.state.skins);
        }
    }

    loadParts(parts) {
        // this.setState({
        //     parts: parts
        // });
        console.log("Loaded parts", parts);
    }

    deleteSkin(index) {
        let skins = this.state.skins;
        delete skins[index];
        this.setState({
            skins: skins
        });
        console.log("Deleted skin №" + index, skins);
    }

    deletePart(index) {
        let parts = this.state.skins;
        delete parts[index];
        this.setState({
            parts: parts
        });
        console.log("Deleted skin part №" + index);
    }

    render() {
        return(
            <div>
                <FileLoader returnPath={(images) => this.loadSkins(images)} getImages={true} extension="png"/>
                <ImageCarousel
                    images={this.state.skins}
                    removeImage={(index) => this.deleteSkin(index)}
                    getImageSize={(name, height, width) => this.getImageSize(name, height, width)}
                    uniqueKey="skin"
                />
                {/*<SkinDisassemble*/}
                    {/*skins={this.state.skins}*/}
                    {/*skinSizes={this.skinSize}*/}
                    {/*partLoader={(parts) => this.loadParts(parts)}*/}
                {/*/>*/}
                {/*<ImageCarousel*/}
                    {/*images={this.state.parts}*/}
                    {/*removeImage={(index) => this.deletePart(index)}*/}
                    {/*uniqueKey="part"*/}
                {/*/>*/}
                {/*<button className="button">Экспортировать части</button>*/}
            </div>
        )
    }
}