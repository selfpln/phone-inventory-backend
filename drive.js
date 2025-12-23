import { google } from "googleapis";

if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
  throw new Error("GOOGLE_SERVICE_ACCOUNT missing");
}

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export const drive = google.drive({ version: "v3", auth });
