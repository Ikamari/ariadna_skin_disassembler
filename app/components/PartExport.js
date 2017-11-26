// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// JSZip
import JSZip from "jszip";

class PartExport extends Component {
    createZip() {
        let zip = new JSZip();
        var img = zip.folder("images");
        img.file("smile.gif", imgData, {base64: true});
        zip.generateAsync({type:"blob"})
            .then(function(content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
            });
    }

    exportZip() {

    }



    render() {

    }
}

// Actions
import * as processStatus from '../actions/processStatus';

const mapDispatchToProps = dispatch => ({
    changeExportStatus: bindActionCreators(processStatus.changeExportStatus, dispatch),
});

const mapStateToProps = state => ({
    processStatus: state.processStatus,
    skinsParts: state.parts
});

export default connect(mapStateToProps, mapDispatchToProps)(PartExport)
