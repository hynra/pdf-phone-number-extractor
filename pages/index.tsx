import type {NextPage} from 'next'

import MainLayout from "../component/main-layout";
import HeaderNav from "../component/header-nav";
import {FileUploader} from "baseui/file-uploader";
import React from "react";
import {Table} from "baseui/table-semantic";
import Container from "../component/container";
import {truncate} from "../util/common";
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
            <HeaderNav/>
            <MainLayout>
                {dataPDF.length <= 0 &&
                <Container>
                    <FileUploader
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            // handle file upload...
                            setPdfFiles(acceptedFiles);
                            let tempData: any[] = [];
                            for (const file of acceptedFiles) {
                                const row: any[] = [truncate(file.name, 50), (file.size / 1000).toFixed() + 'Kb']
                                tempData.push(row);
                            }
                            setDataPDF(tempData);
                        }}
                        accept='application/pdf'
                        multiple={true}
                    />
                </Container>
                }
                {
                    dataPDF.length > 0 && <Container><Table columns={COLUMNS_PDF} data={dataPDF}/></Container>
                }
                {
                    dataContacts.length > 0 && <Container><Table columns={COLUMNS_CONTACT} data={dataContacts}/></Container>
                }
            </MainLayout>
        </div>
    )
}

export default Home
