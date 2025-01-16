const express = require("express");
const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream");
const dummyRoutes = express.Router();

dummyRoutes.get("/pdf", (req, res) => {
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());
  let URL = "";
  doc.fontSize(25).text("Here is some vector graphics...", 100, 80);
  doc.end();
  stream.on("finish", function () {
    URL = stream.toBlobURL("application/pdf");
  });
  res.status(200).send({
    url: URL,
  });
});

module.exports = dummyRoutes;
