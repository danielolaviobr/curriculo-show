import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { getBaseUrl } from "../../_app";

const generatePDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log(req.query);
  if (!id) {
    res.statusCode = 404;
    return res.send({ error: "id not found" });
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${getBaseUrl()}/pdf/${id}`, {
    waitUntil: "networkidle0",
  });
  await page.addStyleTag({ content: ".print-blank { display: none}" });
  await page.emulateMediaType("screen");

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Length", pdfBuffer.length);
  res.send(pdfBuffer);
};

export default generatePDF;
