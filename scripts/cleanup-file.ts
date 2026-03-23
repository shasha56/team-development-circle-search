// scripts/cleanup-file.ts
import fs from "node:fs";
import path from "node:path";
import { CIRCLES } from "../src/data/circles";
import { cleanUrl } from "../src/lib/utils";

async function main() {
  console.log("🧹 Starting data file cleanup...");

  // 1. データのクレンジング処理
  const cleanedCircles = CIRCLES.map((circle) => {
    return {
      ...circle,
      // utils.tsの関数を使って、元データのURLを直接綺麗にする
      twitterUrl: cleanUrl(circle.twitterUrl) ?? "",
      instagramUrl: cleanUrl(circle.instagramUrl) ?? "",
    };
  });

  // 2. TypeScriptファイルとして出力するための文字列生成
  // JSON.stringifyの第3引数(2)で、綺麗なインデントを維持する
  const fileContent = `export const CIRCLES = ${JSON.stringify(
    cleanedCircles,
    null,
    2,
  )};\n`;

  // 3. 出力先（同じディレクトリに circles.cleaned.ts を作る）
  const dir = path.resolve(__dirname, "../src/data");
  const outputPath = path.join(dir, "circles.cleaned.ts");
  const tmpPath = outputPath + ".tmp";

  // 一時ファイルに書いてから名前を変える（簡潔な原子置換）
  fs.writeFileSync(tmpPath, fileContent, "utf8");
  fs.renameSync(tmpPath, outputPath);

  console.log(`✅ Generated cleaned file: ${outputPath}`);
  console.log(
    `確認後、問題なければ元ファイルと差し替えてください: mv ${outputPath} ${path.join(dir, "circles.ts")}`,
  );
}

main().catch(console.error);
