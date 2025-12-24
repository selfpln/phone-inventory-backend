import { drive } from "./drive.js";

app.get("/test-drive", async (req, res) => {
  try {
    await drive.files.list({ pageSize: 1 });
    res.json({ success: true, message: "Google Drive connected" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

app.post("/inventory/allocate", async (req, res) => {
  const { teamLeader, phones } = req.body;

  const doc = new PDFDocument();
  const fileName = `delivery_${Date.now()}.pdf`;
  const filePath = path.join("/tmp", fileName);

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(16).text("DELIVERY NOTE", { align: "center" });
  doc.moveDown();
  doc.text(`Team Leader: ${teamLeader.name}`);
  doc.text(`Location: ${teamLeader.location}`);
  doc.text(`Phone: ${teamLeader.phone}`);
  doc.moveDown();

  phones.forEach(p => {
    doc.text(`• ${p.brand} - ${p.serial}`);
  });

  doc.end();

  // Upload to Drive
  const upload = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: "application/pdf",
    },
    media: {
      mimeType: "application/pdf",
      body: fs.createReadStream(filePath),
    },
  });

  res.json({ success: true, driveFileId: upload.data.id });
});


app.post("/sales", async (req, res) => {
  const { customer, phone } = req.body;

  const doc = new PDFDocument();
  const fileName = `receipt_${Date.now()}.pdf`;
  const filePath = path.join("/tmp", fileName);

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(16).text("SALES RECEIPT", { align: "center" });
  doc.moveDown();
  doc.text(`Customer: ${customer.name}`);
  doc.text(`ID: ${customer.id}`);
  doc.text(`Phone: ${customer.phone}`);
  doc.moveDown();
  doc.text(`Sold Device: ${phone.brand}`);
  doc.text(`Serial: ${phone.serial}`);
  doc.end();

  const upload = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: "application/pdf",
    },
    media: {
      mimeType: "application/pdf",
      body: fs.createReadStream(filePath),
    },
  });

  res.json({ success: true, receiptId: upload.data.id });
});
