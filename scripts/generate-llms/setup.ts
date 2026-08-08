import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const scriptDir = dirname(fileURLToPath(import.meta.url));
/** 패키지 루트 (daleui/) */
export const root = `${scriptDir}/../..`;

export const OUT = {
  components: `${root}/skills/daleui/components.md`,
  tokens: `${root}/skills/daleui/tokens.md`,
  examples: `${root}/skills/daleui/examples.md`,
  llms: `${root}/llms.txt`,
};

export const GITHUB = "https://github.com/DaleStudy/daleui/blob/main";
export const CHROMATIC = "https://main--675790d317ba346348aa3490.chromatic.com";

export type PropRow = {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
};

export type StoryExample = {
  storyName: string;
  code: string;
};

export type ComponentDoc = {
  name: string;
  description: string;
  props: PropRow[];
  examples: StoryExample[];
};

export type ExampleDoc = {
  title: string;
  description: string;
  code: string;
};

const configFile = ts.readConfigFile(
  `${root}/tsconfig.app.json`,
  ts.sys.readFile,
);
const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  root,
);
export const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: { ...parsedConfig.options, noEmit: true },
});
export const checker = program.getTypeChecker();

export function write(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(
    path,
    content.endsWith("\n") ? content : content + "\n",
    "utf8",
  );
}

export function github(path: string) {
  return `${GITHUB}/${path}`;
}

export function mdTable(headers: string[], rows: string[][]) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  return [head, sep, body].join("\n");
}

export function escapeCell(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\n/g, " ");
}
