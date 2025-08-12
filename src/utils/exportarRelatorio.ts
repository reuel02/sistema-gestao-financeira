import PDFDocument from "pdfkit"
import { createObjectCsvStringifier } from "csv-writer";
import { Response } from "express";

export const exportarRelatorio = async (transacoes: any[], exportar: string, res: Response) => {
    if (exportar === 'pdf') {
        const doc = new PDFDocument()

        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition", "attachment; filename=Relatorio.pdf")

        doc.pipe(res)

        doc.fontSize(18).text('Relatório de Transações', { align: "center" })
        doc.moveDown()

        transacoes.forEach((t) => {
            doc.fontSize(12).text(`ID: ${t.id} | Tipo: ${t.tipo} | Quantia: ${t.quantia} | Categoria: ${t.categoria} | Data: ${t.data.toISOString()}`)
        })

        doc.end()
    } else {
        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: "id", title: "ID" },
                { id: "tipo", title: "Tipo" },
                { id: "quantia", title: "Quantia" },
                { id: "categoria", title: "Categoria" },
                { id: "data", title: "Data" },
            ]
        });

        const header = csvStringifier.getHeaderString();
        const records = csvStringifier.stringifyRecords(
        transacoes.map((t) => ({
            ...t,
            data: t.data.toISOString()
        }))
        );

        const csv = header + records;

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=Relatorio.csv");

        return res.send(csv)
    }
}