import React from 'react';
import {FileUploader} from "react-drag-drop-files";
import CenterPosition from "./center-position";

export interface UploaderInterface {
    onDrop: (files: File[]) => void
}

const Uploader: React.FC<UploaderInterface> = (props) => {
    return (
        <CenterPosition>
            <FileUploader
                name="file"
                types={["PDF"]}
                multiple={true}
                label="Upload atau drop file PDF"
                handleChange={props.onDrop}
            />
        </CenterPosition>
    );
}

export default Uploader;
