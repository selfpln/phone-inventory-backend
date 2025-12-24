import { drive } from "./drive.js";

app.get("/test-drive", async (req, res) => {
  try {
    await drive.files.list({ pageSize: 1 });
    res.json({ success: true, message: "Google Drive connected" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
