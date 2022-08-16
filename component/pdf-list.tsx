import React from "react";
import {PdfFileInterface} from "../core/extractor";
import {Cell, Row, TableView, TableHeader, TableBody, Column, Flex} from '@adobe/react-spectrum';

export interface PdfListProps {
    pdfs: PdfFileInterface[];
}

const PdfList: React.FC<PdfListProps> = (props) => {
    return (
        <Flex height="size-5000" width="100%" direction="column" gap="size-150">
            <TableView
                aria-label="PDF List"
                selectionMode="multiple"
                selectionStyle="highlight"
                density="spacious"
                flex={true}
            >
                <TableHeader>
                    <Column isRowHeader>File Name</Column>
                    <Column align="end">Size</Column>
                </TableHeader>
                <TableBody>
                    {
                        props.pdfs.map(pdf => (
                            <Row key={pdf.name}>
                                <Cell>{pdf.name}</Cell>
                                <Cell>{pdf.size}</Cell>
                            </Row>
                        ))
                    }

                </TableBody>
            </TableView>
        </Flex>
    );
}

export default PdfList;
