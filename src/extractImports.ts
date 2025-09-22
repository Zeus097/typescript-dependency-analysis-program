import ts from "typescript";
import * as fs from "fs";
import * as path from "path";

/**
 * fs → gives program access to the raw file text.
 * ts → understands that text as TypeScript code, so it can be analyzed.
 */



/**
 * Extracts all module specifiers from a given TS file into a string arrayx 
 */
export function extractImports(filePath: string): string[] {
  const sourceText = fs.readFileSync(filePath, "utf8");
  
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true    // keep comments, whitespace positions, etc. (detailed parsing)
  );

  const imports: string[] = [];


  sourceFile.forEachChild((node) => {
    
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      imports.push(node.moduleSpecifier.text);
    }

    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      imports.push(node.moduleSpecifier.text);
    }
  });

  return imports;
}


export function summarizeImportsInFolder(folderPath: string): string {
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

  const lines: string[] = [];

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const imports = extractImports(fullPath);
    lines.push(
      `${file} has the following imports: ${
        imports.length ? imports.join(", ") : "(no imports)"
      }`
    );
  }

  return lines.join("\n");
}
