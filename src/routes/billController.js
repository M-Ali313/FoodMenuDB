import Bill from "../models/Bill.js";
import { generateBillHTML } from "../utils/pdfGenerator.js";

export const getBillPDF = async (req, res) => {
  const bill = await Bill.findById(req.params.id);
  if (!bill) return res.status(404).json({ message: "Bill not found" });

  const html = generateBillHTML(bill);
  res.send(html);
};
