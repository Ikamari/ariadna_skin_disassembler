// React
import React from "react";

const saveFilesWithCertainExtension = (files, extension) => {
    let filesWithCertainExtension = [];
    for(let i = 0; i < files.length; i++) {
        const currentFileExtension = files[i].name.split('.').pop();
        currentFileExtension === extension ? filesWithCertainExtension.push(files[String(i)]) : undefined;
    }
    return filesWithCertainExtension;
};

const FileLoader = (props) => {
    const { loadImages } = props;
    return (
        <div>
            <input name="images" onChange={(event) => {
                event.preventDefault();
                loadImages(saveFilesWithCertainExtension(event.target.files, "png"));
            }} type="file" multiple/>
        </div>
    )
};

export default (props) => FileLoader(props);