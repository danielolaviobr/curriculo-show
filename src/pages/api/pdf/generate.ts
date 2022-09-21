import type { NextApiRequest, NextApiResponse } from "next";
import playwright from "playwright";
import { getBaseUrl } from "../../_app";

const generatePDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log(req.query);
  if (!id) {
    res.statusCode = 404;
    return res.send({ error: "id not found" });
  }

  const browser = await playwright.chromium.connect(
    "wss://chrome.browserless.io?token=14db84f3-bae7-4879-851a-1d40a2a48822"
  );
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${getBaseUrl()}/pdf/${id}`, {
    waitUntil: "networkidle",
  });
  await page.addStyleTag({ content: ".print-blank { display: none}" });
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Length", pdfBuffer.length);
  res.send(pdfBuffer);
};

export default generatePDF;
