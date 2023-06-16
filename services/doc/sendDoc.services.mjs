import synopsisPDF from './synopsisPDF.doc.services.mjs';

function sendDoc(res, filename, pdfDoc) {
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`)
    pdfDoc.pipe(res)
    pdfDoc.end()
}

export const docServices = {
    sendPDF: sendDoc,
    synopsisPDF,
}