import * as path from "path";
import { summarizeImportsInFolder } from "./extractImports";
import { invokeGemini } from "./analyzeWithLLM";
import * as fs from "fs";

async function main() {
  const folder = path.resolve(__dirname, "../utils");
  const imports = summarizeImportsInFolder(folder);
  const response = await invokeGemini(imports);

  const outPath = path.resolve(__dirname, "importAnalysis.md");
  fs.writeFileSync(outPath, response, "utf8");
}

main();
