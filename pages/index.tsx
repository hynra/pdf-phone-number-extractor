import type {NextPage} from 'next'

import MainLayout from "../component/main-layout";
import HeaderNav from "../component/header-nav";
import {FileUploader} from "baseui/file-uploader";
import React from "react";
import {Table} from "baseui/table-semantic";
// @ts-ignore
import {CSVLink} from "react-csv";
import Container from "../component/container";
import {truncate} from "../util/common";
import {ContactInterface, processPdfs} from "../core/extractor";
import PaginationTable from "../component/PaginationTable";
import {Accordion, Panel} from "baseui/accordion";
import {getTableDataForExport, makeCsv} from "../core/helper-core";
import {DisplayXSmall, HeadingXSmall} from "baseui/typography";
import {ArrowRight, ArrowDown} from "baseui/icon";

enum ExtractStatus {
    IDLE,
    READY,
    LOADING,
    SUCCESS,
    ERROR,
}

const Home: NextPage = () => {

    const [pdfFiles, setPdfFiles] = React.useState<File[]>([]);
    const [dataPDF, setDataPDF] = React.useState<any[]>([]);
    const [dataContacts, setDataContacts] = React.useState<any[]>([]);
    const [contacts, setContacts] = React.useState<ContactInterface[]>([]);
    const [expandInPanel, setExpandInPanel] = React.useState<boolean>(true);
    const [expandOutPanel, setExpandOutPanel] = React.useState<boolean>(false);

    const [extractStatus, setExtractStatus] = React.useState<ExtractStatus>(ExtractStatus.IDLE);

    const COLUMNS_PDF = ['Name', 'Size',];
    const COLUMNS_CONTACT = ['Title', 'Number', 'File', 'Page'];

    const csvLink = React.useRef(null);

    React.useEffect(() => {
        if (pdfFiles.length === 0) return;

    }, [pdfFiles]);

    const extract = async () => {
        try {
            setExtractStatus(ExtractStatus.LOADING);
            const extractedContacts = await processPdfs({files: pdfFiles});
            setContacts(extractedContacts);
            let tempData: any[] = []
            for (const contact of extractedContacts) {
                const row: any[] = [contact.title, contact.phone, contact.file, contact.page];
                tempData.push(row);
            }
            setDataContacts(tempData);
            setExpandInPanel(false);
            setExpandOutPanel(true);
            setExtractStatus(ExtractStatus.SUCCESS);
        } catch (e) {
            console.error(e);
            setExtractStatus(ExtractStatus.ERROR);
        }
    }

    return (
        <div>
            <HeaderNav/>
            <MainLayout width="650px">
                {extractStatus === ExtractStatus.IDLE &&
                <div>
                    <HeadingXSmall marginBottom="10px">Extract Phone Numbers from PDF files</HeadingXSmall>
                    <Container>
                        <ArrowDown size={44}/>
                    </Container>
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
                            setExtractStatus(ExtractStatus.READY);
                        }}
                        accept='application/pdf'
                        multiple={true}
                    />
                </div>
                }

                {dataPDF.length > 0 && <Accordion
                    accordion
                    onChange={({expanded}) => {
                        if (expanded.length === 0) {
                            setExpandInPanel(false);
                            setExpandOutPanel(false)
                        } else {
                            if (expanded[0] === '0') {
                                setExpandOutPanel(expandInPanel);
                                setExpandInPanel(!expandInPanel);
                            } else {
                                setExpandInPanel(expandOutPanel);
                                setExpandOutPanel(!expandOutPanel);
                            }
                        }
                    }}
                >
                    <Panel title="Input" expanded={expandInPanel}>
                        <PaginationTable
                            columns={COLUMNS_PDF}
                            data={dataPDF}
                            tableTitle="PDF Files"
                            showActionButton={
                                extractStatus === ExtractStatus.READY ||
                                extractStatus === ExtractStatus.LOADING ||
                                extractStatus === ExtractStatus.SUCCESS
                            }
                            actionButtonText={(extractStatus === ExtractStatus.READY) ? "Extract All" : "New Extraction"}
                            isLoadingButton={extractStatus === ExtractStatus.LOADING}
                            onActionClick={() => {
                                if (extractStatus === ExtractStatus.READY)
                                    extract().then();
                                else {
                                    setExtractStatus(ExtractStatus.IDLE);
                                    setPdfFiles([]);
                                    setDataPDF([]);
                                    setDataContacts([]);
                                }
                            }}
                        />
                    </Panel>
                    {extractStatus === ExtractStatus.SUCCESS && <Panel title="Output" expanded={expandOutPanel}>
                        <PaginationTable
                            columns={COLUMNS_CONTACT}
                            data={dataContacts}
                            tableTitle="Contacts Extracted"
                            showActionButton={dataContacts.length > 0}
                            actionButtonText="Export CSV"
                            onActionClick={() => {
                                // @ts-ignore
                                csvLink.current.link.click()
                            }}
                        />
                    </Panel>}

                </Accordion>}

                <CSVLink
                    data={contacts}
                    filename="data.csv"
                    className="hidden"
                    ref={csvLink}
                    target="_blank"/>

            </MainLayout>
        </div>
    )
}

export default Home
