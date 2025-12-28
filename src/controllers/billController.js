import Bill from "../models/Bill.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Food from "../models/Food.js";
import PDFDocument from "pdfkit";

// Create Bill / Order
export const createBill = asyncHandler(async (req, res) => {
  const { items } = req.body; // [{food: foodId, quantity: 2}, ...]

  if (!items || items.length === 0)
    return res.status(400).json({ message: "No items provided" });

  let totalPrice = 0;
  const billItems = [];

  for (const i of items) {
    const food = await Food.findById(i.food);
    if (!food) return res.status(404).json({ message: `Food not found: ${i.food}` });

    billItems.push({
      food: food._id,
      quantity: i.quantity,
      price: food.price,
    });

    totalPrice += food.price * i.quantity;
  }

  const bill = await Bill.create({
    user: req.user._id,
    items: billItems,
    totalPrice,
  });

  res.status(201).json(bill);
});

// Get all bills (Admin)
export const getBills = asyncHandler(async (req, res) => {
  const bills = await Bill.find().populate("user").populate("items.food");
  res.json(bills);
});

// Get single bill
export const getBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id).populate("user").populate("items.food");
  if (!bill) return res.status(404).json({ message: "Bill not found" });
  res.json(bill);
});

// Update bill status (Admin)
export const updateBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id);
  if (!bill) return res.status(404).json({ message: "Bill not found" });

  bill.status = req.body.status || bill.status;
  await bill.save();
  res.json(bill);
});

// Delete bill (Admin)
export const deleteBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id);
  if (!bill) return res.status(404).json({ message: "Bill not found" });

  await bill.remove();
  res.json({ message: "Bill deleted successfully" });
});

// Generate PDF of bill
export const generateBillPDF = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id).populate("user").populate("items.food");
  if (!bill) return res.status(404).json({ message: "Bill not found" });

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=bill_${bill._id}.pdf`);

  doc.fontSize(20).text("Food Order Bill", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`User: ${bill.user.username} (${bill.user.email})`);
  doc.text(`Status: ${bill.status}`);
  doc.text(`Date: ${bill.createdAt.toLocaleString()}`);
  doc.moveDown();

  doc.text("Items:", { underline: true });
  bill.items.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.food.name} - ${item.quantity} x $${item.price} = $${
        item.quantity * item.price
      }`
    );
  });
  doc.moveDown();
  doc.text(`Total: $${bill.totalPrice}`, { bold: true });

  doc.end();
  doc.pipe(res);
});
