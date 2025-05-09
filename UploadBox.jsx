import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

const UploadBox = ({ onUpload }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Handle .txt
      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = () => {
          console.log("✅ TXT Loaded:", reader.result);
          onUpload(reader.result);
        };
        reader.readAsText(file);
      }

      // Handle .pdf
      else if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + "\n";
          }
          console.log("✅ PDF Extracted Text:", text);
          onUpload(text);
        };
        reader.readAsArrayBuffer(file);
      }

      // Handle .docx
      else if (
        file.name.endsWith(".docx") &&
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        console.log("✅ DOCX Extracted Text:", result.value);
        onUpload(result.value);
      }

      // Unsupported file
      else {
        alert("❌ Only .txt, .pdf, and .docx files are supported.");
      }
    } catch (err) {
      console.error("❌ Error processing file:", err);
      alert("Error processing the uploaded file. Try a different one.");
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">
        Upload Resume (.txt, .pdf, .docx)
      </label>
      <input
        type="file"
        accept=".txt,.pdf,.docx"
        onChange={handleFile}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default UploadBox;
