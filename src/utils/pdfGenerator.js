import PDFDocument from "pdfkit";

export default function generatePDF(bill, res) {
  const doc = new PDFDocument();
  doc.pipe(res);

  doc.fontSize(18).text("Food Bill", { align: "center" });
  doc.moveDown();

  bill.items.forEach(item => {
    doc.text(
      `${item.name} | ${item.category} | ${item.quantity} x ${item.price}`
    );
  });

  doc.moveDown();
  doc.text(`Total: ${bill.totalPrice} AF`);

  doc.end();
}
