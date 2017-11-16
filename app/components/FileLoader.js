// React
import React from "react";

const saveFilesWithCertainExtension = (files, extension) => {
    let filesWithCertainExtension = [];
    for(let i = 0; i < files.length; i++) {
        const currentFileExtension = files[i].name.split('.').pop();
        console.log(currentFileExtension);
        currentFileExtension === "png" ? filesWithCertainExtension.push(files[String(i)]) : undefined;
    }
    return filesWithCertainExtension;
};

const FileLoader = (props) => {
    const { getImages } = props;

    return (
        <div>
            <input name="images" onChange={(event) => {
                event.preventDefault();
                console.log(saveFilesWithCertainExtension(event.target.files, "png"));
            }} type="file" multiple/>
        </div>
    )
};

export default (props) => FileLoader(props);