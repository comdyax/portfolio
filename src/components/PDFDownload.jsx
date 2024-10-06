import React from "react";

const PdfDownload = () => {
  return (
    <div>
      <h2>Download PDF</h2>
      <a href={`${process.env.PUBLIC_URL}/sample.pdf`} download="sample.pdf">
        Download PDF
      </a>
    </div>
  );
};

export default PdfDownload;