import type {NextPage} from 'next'

import React from "react";

import {ContactInterface, processPdfs} from "../core/extractor";


const Home: NextPage = () => {

    const [pdfFiles, setPdfFiles] = React.useState<File[]>([]);
    const [dataPDF, setDataPDF] = React.useState<any[]>([]);
    const [dataContacts, setDataContacts] = React.useState<any[]>([]);
    const [contacts, setContacts] = React.useState<ContactInterface[]>([]);

    const COLUMNS_PDF = ['Name', 'Size',];
    const COLUMNS_CONTACT = ['Title', 'Number', 'File', 'Page'];

    React.useEffect(() => {
        if (pdfFiles.length === 0) return;
        processPdfs({files: pdfFiles}).then(extractedContacts => {
            setContacts(extractedContacts);
            let tempData: any[] = []
            for(const contact of extractedContacts){
                const row: any[] = [contact.title, contact.phone, contact.file, contact.page];
                tempData.push(row);
            }
            setDataContacts(tempData);
        })
    }, [pdfFiles]);

    return (
        <div>

        </div>
    )
}

export default Home
