
import fs from "node:fs";
import path from "node:path";

const outputDir = path.resolve("out");

function fixHtml(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      fixHtml(filePath);
      continue;
    }

    if (!entry.name.endsWith(".html")) continue;

    const original = fs.readFileSync(filePath, "utf8");
    const corrected = original.replace(
      /(["'(])\/work\//g,
      "$1/random-hours/work/"
    );

    if (corrected !== original) {
      fs.writeFileSync(filePath, corrected);
      console.log(`Fixed image paths in ${filePath}`);
    }
  }
}

fixHtml(outputDir);
