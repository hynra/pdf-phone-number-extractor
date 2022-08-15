import {findPhoneNumbersInText} from 'libphonenumber-js/mobile'

// @ts-ignore
import * as PDFJS from "pdfjs-dist/build/pdf";
import {promises} from "dns";
import {truncate} from "../util/common";

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export interface ContactInterface {
    title: string;
    phone: string;
    file: string;
    page: number;
}

export interface ProcessParameters {
    files: File[];
    prefixName?: string;
}

interface ExtractInterface {
    file: string;
    number: string;
    page: number;
}

function readFileAsync(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            // @ts-ignore
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}


export async function processPdfs({files, prefixName = 'Contact'}: ProcessParameters): Promise<ContactInterface[]> {
    try {
        let numbersCollected: ExtractInterface[] = [];
        for (const file of files) {
            const extractedNumber: ExtractInterface[] = await extractPdf(file);
            numbersCollected = [...numbersCollected, ...extractedNumber];
        }

        // remove duplicate
        numbersCollected = numbersCollected.filter((v, i, a) => a.findIndex(v2 => (v2.number === v.number)) === i)
        numbersCollected = [...new Set(numbersCollected)];
        // console.log('Numbers collected: ',numbersCollected);
        let contacts: ContactInterface[] = [];
        for (let i = 0; i < numbersCollected.length; i++) {
            const contact: ContactInterface = {
                title: `${prefixName} ${i + 1}`,
                phone: numbersCollected[i].number,
                file: numbersCollected[i].file,
                page: numbersCollected[i].page
            }
            contacts.push(contact);
        }
        return contacts;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function extractPdf(file: File): Promise<ExtractInterface[]> {
    try {
        let extractedNumbers: ExtractInterface[] = [];
        const pdfArrayBuffer = await readFileAsync(file);
        let docs = await PDFJS.getDocument(pdfArrayBuffer).promise;
        for (let i = 0; i < docs.numPages; i++) {
            const document = await docs.getPage(i + 1);
            const contents = await document.getTextContent();
            for (const content of contents.items) {
                const str = content.str;
                const phoneNumbers = findPhoneNumbersInText(str, 'ID');
                if (phoneNumbers.length > 0) {
                    for (const phoneNumber of phoneNumbers) {
                        const foundNumber = phoneNumber.number.number
                        // console.log('Found: ' + foundNumber);
                        extractedNumbers.push({
                            file: truncate(file.name, 50),
                            number: foundNumber,
                            page: i + 1
                        });
                    }
                }
            }

        }
        return extractedNumbers;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
