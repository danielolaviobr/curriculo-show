import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

const generatePDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/pdf/1/", {
    waitUntil: "networkidle0",
  });
  await page.addStyleTag({ content: ".print-blank { display: none}" });
  await page.emulateMediaType("screen");

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  // res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.send(pdfBuffer);
};

export default generatePDF;
