import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const repoRoot = path.resolve(__dirname, "..");
const fixturesPath = path.join(repoRoot, "lib/data/fixtures.ts");
const outputPath = path.join(repoRoot, "lib/data/fifaLiveResults.ts");
const fifaUrl = "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures";

const MONTHS = new Map([
  ["january", "01"],
  ["february", "02"],
  ["march", "03"],
  ["april", "04"],
  ["may", "05"],
  ["june", "06"],
  ["july", "07"],
  ["august", "08"],
  ["september", "09"],
  ["october", "10"],
  ["november", "11"],
  ["december", "12"],
]);

const DATE_HEADER = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/;
const RESULT_BLOCK = /([^\n]+)\n(\d+)\nFT\n(\d+)\n([^\n]+)\nFirst Stage\n·\nGroup ([A-L])\n·\n([^\n]+)\n\(([^\n]+)\)/g;
const TEAM_ALIASES = {
  mexico: "MEX",
  "south africa": "RSA",
  "bafana bafana": "RSA",
  "korea republic": "KOR",
  "south korea": "KOR",
  czechia: "CZE",
  canada: "CAN",
  "bosnia and herzegovina": "BIH",
  "bosnia & herzegovina": "BIH",
  qatar: "QAT",
  switzerland: "SUI",
  brazil: "BRA",
  morocco: "MAR",
  haiti: "HAI",
  scotland: "SCO",
  usa: "USA",
  "united states": "USA",
  paraguay: "PAR",
  australia: "AUS",
  turkey: "TUR",
  türkiye: "TUR",
  germany: "GER",
  "curaçao": "CUW",
  curacao: "CUW",
  ecuador: "ECU",
  netherlands: "NED",
  japan: "JPN",
  sweden: "SWE",
  tunisia: "TUN",
  belgium: "BEL",
  egypt: "EGY",
  iran: "IRN",
  "ir iran": "IRN",
  "new zealand": "NZL",
  spain: "ESP",
  "cape verde": "CPV",
  "cabo verde": "CPV",
  "saudi arabia": "KSA",
  uruguay: "URU",
  france: "FRA",
  senegal: "SEN",
  iraq: "IRQ",
  norway: "NOR",
  argentina: "ARG",
  algeria: "ALG",
  austria: "AUT",
  jordan: "JOR",
  portugal: "POR",
  "congo dr": "COD",
  "dr congo": "COD",
  england: "ENG",
  croatia: "CRO",
  ghana: "GHA",
  panama: "PAN",
  colombia: "COL",
  uzbekistan: "UZB",
  "côte d'ivoire": "CIV",
  "cote d'ivoire": "CIV",
  "ivory coast": "CIV",
};

function parseFixtures(source) {
  const fixtures = [];
  const regex = /\{ id: "([^"]+)", group: "([^"]+)", matchday: (\d+), homeTeam: "([^"]+)", awayTeam: "([^"]+)", date: "([^"]+)"[\s\S]*?matchNumber: (\d+) \}/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    fixtures.push({
      id: match[1],
      group: match[2],
      matchday: Number(match[3]),
      homeTeam: match[4],
      awayTeam: match[5],
      date: match[6],
      matchNumber: Number(match[7]),
    });
  }
  return fixtures;
}

function parseDateHeader(header) {
  const match = DATE_HEADER.exec(header);
  if (!match) return null;
  const [, , day, monthName, year] = match;
  const month = MONTHS.get(monthName.toLowerCase());
  if (!month) return null;
  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

function normalizeTeamName(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'().,&-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function teamCodeFromName(name) {
  const normalized = normalizeTeamName(name);
  return TEAM_ALIASES[normalized] ?? TEAM_ALIASES[name.toLowerCase()] ?? null;
}

function extractDateChunks(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  const chunks = [];
  let currentDate = null;
  let currentLines = [];

  for (const line of lines) {
    if (!line) continue;
    if (DATE_HEADER.test(line)) {
      if (currentDate && currentLines.length > 0) {
        chunks.push({ date: currentDate, text: currentLines.join("\n") });
      }
      currentDate = parseDateHeader(line);
      currentLines = [];
      continue;
    }

    if (currentDate) currentLines.push(line);
  }

  if (currentDate && currentLines.length > 0) {
    chunks.push({ date: currentDate, text: currentLines.join("\n") });
  }

  return chunks;
}

async function main() {
  const fixturesSource = await readFile(fixturesPath, "utf8");
  const fixtures = parseFixtures(fixturesSource);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(fifaUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(20000);
  const text = await page.locator("body").innerText({ timeout: 5000 });
  await browser.close();

  const chunks = extractDateChunks(text);
  const overlays = {};
  const pulledAt = new Date().toISOString();

  for (const { date, text: chunkText } of chunks) {
    if (!date) continue;
    const matches = [...chunkText.matchAll(RESULT_BLOCK)];
    if (matches.length === 0) continue;

    for (const result of matches) {
      const homeTeam = teamCodeFromName(result[1]);
      const awayTeam = teamCodeFromName(result[4]);
      const homeScore = Number(result[2]);
      const awayScore = Number(result[3]);
      const fixture = fixtures.find((entry) => entry.homeTeam === homeTeam && entry.awayTeam === awayTeam);
      if (!fixture) continue;

      overlays[fixture.id] = {
        homeScore,
        awayScore,
        status: "finished",
        pulledAt,
      };
    }
  }

  const sortedEntries = Object.entries(overlays).sort((a, b) => {
    const left = fixtures.find((fixture) => fixture.id === a[0])?.matchNumber ?? 0;
    const right = fixtures.find((fixture) => fixture.id === b[0])?.matchNumber ?? 0;
    return left - right;
  });

  const fileContents = `export interface FifaLiveResult {\n  homeScore: number;\n  awayScore: number;\n  status: \"finished\";\n  pulledAt: string;\n}\n\nexport const FIFA_LIVE_RESULTS: Record<string, FifaLiveResult> = {\n${sortedEntries
    .map(([id, value]) => `  ${id}: { homeScore: ${value.homeScore}, awayScore: ${value.awayScore}, status: \"finished\", pulledAt: ${JSON.stringify(value.pulledAt)} },`)
    .join("\n")}\n};\n`;

  await writeFile(outputPath, fileContents, "utf8");
  console.log(`Updated ${sortedEntries.length} finished matches from FIFA.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
