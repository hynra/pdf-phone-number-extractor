import {findPhoneNumbersInText} from 'libphonenumber-js/mobile'

// @ts-ignore
import * as PDFJS from "pdfjs-dist/build/pdf";
import {promises} from "dns";
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export interface ContactInterface {
    title: string;
    phone: string;
}

export interface ProcessParameters {
    files: File[];
    prefixName?: string;
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
        let numbersCollected: string[] = [];
        for(const file of files){
            const extractedNumber = await extractPdf(file);
            numbersCollected = [...numbersCollected, ...extractedNumber];
        }
        numbersCollected = [...new Set(numbersCollected)];
        console.log('Numbers collected: ',numbersCollected);
        let contacts: ContactInterface[] = [];
        for(let i = 0; i < numbersCollected.length; i++){
            const contact: ContactInterface = {
                title: `${prefixName} ${i+1}`,
                phone: numbersCollected[i]
            }
            contacts.push(contact);
        }
        return contacts;
    }catch (e) {
        console.error(e);
        throw e;
    }
}

export async function extractPdf(file: File): Promise<string[]> {
    try {
        let extractedNumbers: string[] = [];
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
                        extractedNumbers.push(foundNumber);
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
