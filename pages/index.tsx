import type {NextPage} from 'next'

import MainLayout from "../component/main-layout";
import HeaderNav from "../component/header-nav";
import {FileUploader} from "baseui/file-uploader";
import React from "react";
import {Table} from "baseui/table-semantic";
import Container from "../component/container";
import {truncate} from "../util/common";


const Home: NextPage = () => {

    const [pdfFiles, setPdfFiles] = React.useState<File[]>([]);
    const [dataTable, setDataTable] = React.useState<any[]>([]);

    const COLUMNS = ['Name', 'Size',];

    return (
        <div>
            <HeaderNav/>
            <MainLayout>
                {dataTable.length <= 0 &&
                <Container>
                    <FileUploader
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            // handle file upload...
                            console.log(acceptedFiles, rejectedFiles);
                            setPdfFiles(acceptedFiles);
                            let tempData: any[] = [];
                            for (const file of acceptedFiles) {
                                const row: any[] = [truncate(file.name, 50), (file.size / 1000).toFixed() + 'Kb']
                                tempData.push(row);
                            }
                            setDataTable(tempData);
                        }}
                        accept='application/pdf'
                        multiple={true}
                    />
                </Container>
                }
                {
                    dataTable.length > 0 && <Container><Table columns={COLUMNS} data={dataTable}/></Container>
                }
            </MainLayout>
        </div>
    )
}

export default Home
