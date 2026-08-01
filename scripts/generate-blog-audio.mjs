import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

const posts = [
  ["01-what-is-a-cli-agent.md", "what-is-a-cli-agent.m4a"],
  ["02-how-waldo-cares-about-your-health.md", "health-apps-are-mirrors.m4a"],
  ["03-why-a-dalmatian.md", "why-a-dalmatian.m4a"],
  ["04-the-patterns.md", "patterns-your-ai-cannot-see.m4a"],
  ["05-connectors-and-professions.md", "explain-your-job-to-a-computer.m4a"],
  ["06-what-we-actually-do-with-your-data.md", "what-we-do-with-your-data.m4a"],
];

const projectRoot = process.cwd();
const contentDirectory = join(projectRoot, "content", "blogs");
const outputDirectory = join(projectRoot, "public", "assets", "blogs", "audio");

function markdownToNarration(markdown) {
  const title = markdown.match(/^title:\s*(.+)$/m)?.[1] ?? "Waldo article";
  const body = markdown
    .replace(/^---[\s\S]*?---\s*/, "")
    .replace(/^# .+\n+/, "")
    .replace(/\n## Backlinks[\s\S]*$/, "")
    .replace(/```[\s\S]*?```/g, " Code example omitted. ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+(.+)$/gm, "[[slnc 450]] $1. [[slnc 350]]")
    .replace(/[*_>]/g, "")
    .replace(/\n\s*\n/g, " [[slnc 500]] ")
    .replace(/[—–]/g, ", ")
    .replace(/\bAI\b/g, "A.I.")
    .replace(/\bCLI\b/g, "C.L.I.")
    .replace(/\bHRV\b/g, "H.R.V.")
    .replace(/\bAPI\b/g, "A.P.I.")
    .replace(/\bJSON\b/g, "J.S.O.N.")
    .replace(/\s+/g, " ")
    .trim();

  return `${title}. [[slnc 700]] ${body}`;
}

mkdirSync(outputDirectory, { recursive: true });

for (const [sourceFile, outputFile] of posts) {
  const markdown = readFileSync(join(contentDirectory, sourceFile), "utf8");
  const narration = markdownToNarration(markdown);
  const temporaryAudio = join(
    tmpdir(),
    `waldo-blog-${process.pid}-${basename(sourceFile, ".md")}.aiff`,
  );

  try {
    execFileSync("/usr/bin/say", ["-v", "Samantha", "-r", "172", "-o", temporaryAudio, narration], {
      stdio: "inherit",
    });
    execFileSync(
      "/opt/homebrew/bin/ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        temporaryAudio,
        "-ac",
        "1",
        "-ar",
        "22050",
        "-c:a",
        "aac",
        "-b:a",
        "48k",
        "-movflags",
        "+faststart",
        join(outputDirectory, outputFile),
      ],
      { stdio: "inherit" },
    );
  } finally {
    rmSync(temporaryAudio, { force: true });
  }
}
