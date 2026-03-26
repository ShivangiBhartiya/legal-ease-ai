import fs from "fs";
import * as pdf from "pdf-parse";

export const uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    const text = data.text;

    res.json({
      message: "File processed successfully",
      text: text.substring(0, 2000), // preview for now
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing file" });
  }
};