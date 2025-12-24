import { drive } from "./drive.js";

app.get("/test-drive", async (req, res) => {
  try {
    await drive.files.list({ pageSize: 1 });
    res.json({ success: true, message: "Google Drive connected" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
