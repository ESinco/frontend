import { useEffect, useState } from "react";

function PdfRenderer({ pdfData }) {
  // Example function to fetch the PDF from the backend
  const [pdfUrl, setPdfUrl] = useState(null);

  const fetchPdf = async () => {
    try {
      const pdfUrlRes = URL.createObjectURL(pdfData.data);
      setPdfUrl(pdfUrlRes);
    } catch (error) {
      console.error("Failed to blob", error);
    }
  };

  return (
    <div>
      <button onClick={fetchPdf}>Fetch and Render PDF</button>

      {/* Conditionally render the iframe when the PDF URL is available */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
          style={{ border: "none" }}
        ></iframe>
      )}

      {/* Alternatively, provide a download link */}
      {pdfUrl && (
        <a href={pdfUrl} download="file.pdf">
          Download PDF
        </a>
      )}
    </div>
  );
}

export default PdfRenderer;
