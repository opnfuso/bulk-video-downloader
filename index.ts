import fs, { writeFile, writeFileSync } from "fs";
import { get } from "http";
const file = Bun.file(process.env.URLS_FILE || "urls.json");

const urls = await file.json();
// const requests = urls.map((url: string) => fetch(url));

async function getFileFromUrl(url: string) {
  if (!url) throw new Error("No url provided");
  // Get filename from url
  let fileName = url.split("/").pop();

  if (!fileName) throw new Error("No file name found");

  // Check if has query params
  const hasQueryParams = fileName.includes("?");

  // Remove query params
  if (hasQueryParams) fileName = fileName.split("?")[0];

  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  writeFile(fileName, buffer, (err) => {
    if (err) throw err;
  });
}

getFileFromUrl(urls[0]);
