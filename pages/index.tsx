import type {NextPage} from 'next'

import React from "react";
import {Button, Content, Grid, View, Flex} from '@adobe/react-spectrum';

import {ContactInterface, PdfFileInterface, processPdfs} from "../core/extractor";
import {FileUploader} from "react-drag-drop-files";
import Container from "../component/container";
import Uploader from "../component/uploader";
import {truncate} from "../util/common";
import PdfList from "../component/pdf-list";


const Home: NextPage = () => {

    const [pdfFiles, setPdfFiles] = React.useState<File[]>([]);
    const [pdfs, setPdfs] = React.useState<PdfFileInterface[]>([]);
    const [contacts, setContacts] = React.useState<ContactInterface[]>([]);

    React.useEffect(() => {
        if (pdfFiles.length === 0) return;
        processPdfs({files: pdfFiles}).then(extractedContacts => {
            setContacts(extractedContacts);
        })
    }, [pdfFiles]);

    return (
        <Container>
            <View
                backgroundColor="static-gray-50"
                gridArea="header"
                height="size-1000"
                borderColor="dark"
                borderWidth="thin"
            />
            <View
                backgroundColor="static-gray-50"
                gridArea="nav"
                borderColor="dark"
                borderWidth="thin"
            >
                <Flex
                    direction={{base: 'row', M: 'column'}}
                    gap="size-100"
                    margin="size-100"
                >
                    <View
                        backgroundColor="static-gray-50"
                        height="size-250"
                        minWidth="size-900"
                    />
                </Flex>
            </View>
            <View
                backgroundColor="static-gray-50"
                gridArea="content"
                borderColor="dark"
                borderWidth="thin"
                padding="size-250"
            >
                {pdfFiles.length === 0 && <Uploader
                    onDrop={(files => {
                        setPdfFiles(files);
                        let tmpPdfs: PdfFileInterface[] = [];
                        for (const file of files) {
                            const pdfFile: PdfFileInterface = {
                                name: truncate(file.name, 50),
                                size: (file.size / 1000).toFixed() + 'Kb',
                            }
                            tmpPdfs.push(pdfFile);
                        }
                        setPdfs(tmpPdfs);
                    })}
                />}

                {pdfs.length > 0 && <PdfList pdfs={pdfs} />}


            </View>
            <View
                backgroundColor="static-gray-50"
                gridArea="toc"
                borderColor="dark"
                borderWidth="thin"
                minHeight="size-1000"
                isHidden={{base: true, L: false}}
            />
            <View
                backgroundColor="static-gray-50"
                gridArea="footer"
                height="size-1000"
                borderColor="dark"
                borderWidth="thin"
            />
        </Container>
    )
}

export default Home
