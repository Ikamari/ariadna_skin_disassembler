// React
import React, { Component } from "react";
import PropTypes from "prop-types"

export default class FileLoader extends Component {
    getImagesFromInput (inputData) {
        const { returnPath, extension } = this.props;
        let imageFiles = {}, images = {}, fileNum = 0;

        //Will remove files with wrong extension or return all files, if there in no required extension given
        if(extension) {
            for(let i = 0; i < inputData.length; i++) {
                if(this.checkFileExtension(inputData[i], extension)) {
                    imageFiles[fileNum] = inputData[i];
                    fileNum++;
                }
            }
            imageFiles.length = fileNum;
        } else imageFiles = inputData;

        //Will convert files to dataURL
        for(let i = 0; i < imageFiles.length; i++) {
            let reader  = new FileReader();
            reader.onload = (e) => {
                images[i] = e.target.result;
                if(i === fileNum - 1) {
                    returnPath(images, fileNum);
                }
            };
            reader.readAsDataURL(imageFiles[i]);
        }
    }

    checkFileExtension(file, requiredExtension) {
        const fileExtension = file.name.split('.').pop();
        return fileExtension === requiredExtension;
    }

    render() {
        return (
            <div>
                <label className="file-upload-button" htmlFor="file-upload">Загрузить</label>
                <input id="file-upload" name="images" onChange={(event) => {
                    event.preventDefault();
                    console.log("Loaded files:", event.target.files);
                    this.getImagesFromInput(event.target.files)
                }} type="file" multiple/>
            </div>
        )
    }
}

FileLoader.propTypes = {
    extension: PropTypes.string,
    returnPath: PropTypes.func.isRequired
};

FileLoader.defaultProps = {
    extension: null,
};