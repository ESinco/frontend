import SessionContext from "@/contexts/sessionContext";
import { useContext, useEffect, useState } from "react";

function PdfRenderer({ pdfData }) {
  // Example function to fetch the PDF from the backend
  const [pdfUrl, setPdfUrl] = useState(null);
  const session = useContext(SessionContext);

  const fetchPdf = async () => {
    try {
      const pdfUrlRes = URL.createObjectURL(pdfData.data);
      setPdfUrl(pdfUrlRes);
    } catch (error) {
      console.error("Failed to blob", error);
    }
  };

  useEffect(() => {
    if (pdfData) {
      fetchPdf();
    }
  }, [pdfData]);

  return (
    <div className="flex flex-col gap-4 items-center">
      {!session.data.isTeacher ? (
        <button className="btn btn-outline btn-primary" onClick={fetchPdf}>
          Mostrar Historico
        </button>
      ) : null}

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
        <a href={pdfUrl} className="btn btn-accent" download="file.pdf">
          Download Historico
        </a>
      )}
    </div>
  );
}

export default PdfRenderer;
