import React from "react";
import { BlobProvider } from "@react-pdf/renderer";

const PDFGenerator = ({ document = <></>, fileName = "sample.pdf" }) => {
  return (
    <div>
      <h1>Generate and Download PDF</h1>
      <BlobProvider document={document}>
        {({ blob, url }) => (
          <div>
            <a href={url} download={fileName}>
              Download the PDF
            </a>

            <button onClick={() => window.open(url, "_blank")}>
              Open PDF in New Tab
            </button>
          </div>
        )}
      </BlobProvider>
    </div>
  );
};

export default PDFGenerator;
