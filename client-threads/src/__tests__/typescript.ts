import { ModuleKind, ModuleResolutionKind, transpile } from "typescript";
import fs from "fs";
import path from "path";

export async function transpileTypescriptModule(tsPath: string): Promise<string> {
  const tsFileContent = fs.readFileSync(tsPath);
  const jsFileContent = transpile(tsFileContent.toString(), {
    esModuleInterop: true,
    moduleResolution: ModuleResolutionKind.NodeJs,
    module: ModuleKind.CommonJS,
  });
  const jsFilePath = path.join(
    path.dirname(tsPath),
    `.${path.basename(tsPath, ".ts")}.js`
  );
  fs.writeFileSync(jsFilePath, jsFileContent, { flag: "w" });
  return jsFilePath;
}
