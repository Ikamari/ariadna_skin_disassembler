// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// JSZip
import JSZip from "jszip";
//Axios
import axios from 'axios';

class PartExport extends Component {
    createSubFolders(armor, main) {
        let subFolders = ["head", "body", "leg", "hand"], folders = {};
        subFolders.map((value) => {
            folders[value] = main.folder(value);
            folders[value + "-armor"] = armor.folder(value);
        });
        return folders;
    }

    fillZip(folders) {
        const { parts, partData } = this.props.skinParts;
        Object.keys(parts).map((key) => {
            folders[partData[key].isArmor ? partData[key].bodyPart + "-armor" : partData[key].bodyPart].file(
                key + ".png",
                parts[key].replace(/^data:image\/(png|jpg);base64,/, ""),
                {base64: true}
                )
        });
    }

    createZip() {
        let zip = new JSZip(),
            armor = zip.folder("armor"),
            main = zip.folder("main"),
            folders = this.createSubFolders(armor, main);

        this.fillZip(folders);
        this.exportZip(zip);
    }

    exportZip(zip) {
        let link = this.refs.link;
        zip.generateAsync({type:"base64"})
            .then(function(content) {
                axios.post("part-import.php", {
                        zip: content
                    })
                    .then((response) => {
                        console.log("Successfully loaded parts to server");
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log("Can't load parts to server");
                        console.log(error);
                    })
            });
    }

    render() {
        const { skinsAreLoading, partsAreLoading, exporting } = this.props.processStatus;

        return(
            <div>
                <button
                    onClick={() => {if (!(skinsAreLoading || partsAreLoading || exporting)) this.createZip();}}
                    className={"button" + ((skinsAreLoading || partsAreLoading || exporting) ? " unactive" : "")}
                >Экспортировать части</button>
                <a ref="link"/>
                <form encType="multipart/form-data" action="part-import.php" method="POST">
                    <input type="hidden" name="MAX_FILE_SIZE" value="1024000" />
                    Отправить этот файл: <input name="userfile" type="file" />
                    <input type="submit" value="Send File" />
                </form>
            </div>
        )
    }
}

// Actions
import * as processStatus from '../actions/processStatus';

const mapDispatchToProps = dispatch => ({
    changeExportStatus: bindActionCreators(processStatus.changeExportStatus, dispatch),
});

const mapStateToProps = state => ({
    processStatus: state.processStatus,
    skinParts: state.skinParts
});

export default connect(mapStateToProps, mapDispatchToProps)(PartExport)
