import { FIFA_LIVE_RESULTS } from "./fifaLiveResults";

export interface Match {
  id: string;
  group: string;
  matchday: number;
  homeTeam: string;
  awayTeam: string;
  date: string;         // ISO date "2026-06-11"
  timeUTC: string;      // "19:00"
  timeSAST: string;     // "21:00"
  venue: string;
  city: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "upcoming" | "live" | "finished";
  matchNumber: number;
}

// SAST = UTC+2. All times converted from local venue time.
// Venues and UTC offsets:
//   Mexico (UTC-6 in summer): Azteca, BBVA, Akron → +8h to get SAST
//   West Coast USA/BC Place (UTC-7 PDT): SoFi, Lumen, BC Place → +9h
//   Mountain/Central US (UTC-6 MDT): Arrowhead → +8h
//   Central US (UTC-5 CDT): NRG, AT&T, Lincoln Fin. → +7h
//   Eastern US/Toronto (UTC-4 EDT): MetLife, Gillette, Mercedes, Hard Rock, BMO → +6h

export const GROUP_FIXTURES: Match[] = [
  // ─── GROUP A ───────────────────────────────────────────────────────────
  { id: "A1", group: "A", matchday: 1, homeTeam: "MEX", awayTeam: "RSA", date: "2026-06-11", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "Estadio Azteca", city: "Mexico City", homeScore: 2, awayScore: 0, status: "finished", matchNumber: 1 },
  { id: "A2", group: "A", matchday: 1, homeTeam: "KOR", awayTeam: "CZE", date: "2026-06-11", timeUTC: "02:00", timeSAST: "04:00 SAST (+1)", venue: "Estadio Akron", city: "Zapopan", homeScore: 2, awayScore: 1, status: "finished", matchNumber: 2 },
  { id: "A3", group: "A", matchday: 2, homeTeam: "CZE", awayTeam: "RSA", date: "2026-06-18", timeUTC: "16:00", timeSAST: "18:00 SAST", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 13 },
  { id: "A4", group: "A", matchday: 2, homeTeam: "MEX", awayTeam: "KOR", date: "2026-06-18", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "Estadio Akron", city: "Zapopan", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 14 },
  { id: "A5", group: "A", matchday: 3, homeTeam: "CZE", awayTeam: "MEX", date: "2026-06-24", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "Estadio Azteca", city: "Mexico City", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 46 },
  { id: "A6", group: "A", matchday: 3, homeTeam: "RSA", awayTeam: "KOR", date: "2026-06-24", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "Estadio BBVA", city: "Guadalupe", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 47 },

  // ─── GROUP B ───────────────────────────────────────────────────────────
  { id: "B1", group: "B", matchday: 1, homeTeam: "CAN", awayTeam: "BIH", date: "2026-06-12", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "BMO Field", city: "Toronto", homeScore: 1, awayScore: 1, status: "finished", matchNumber: 3 },
  { id: "B2", group: "B", matchday: 1, homeTeam: "QAT", awayTeam: "SUI", date: "2026-06-13", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "Levi's Stadium", city: "Santa Clara", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 5 },
  { id: "B3", group: "B", matchday: 2, homeTeam: "SUI", awayTeam: "BIH", date: "2026-06-18", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "SoFi Stadium", city: "Inglewood", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 15 },
  { id: "B4", group: "B", matchday: 2, homeTeam: "CAN", awayTeam: "QAT", date: "2026-06-18", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "BC Place", city: "Vancouver", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 16 },
  { id: "B5", group: "B", matchday: 3, homeTeam: "SUI", awayTeam: "CAN", date: "2026-06-24", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "BC Place", city: "Vancouver", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 48 },
  { id: "B6", group: "B", matchday: 3, homeTeam: "BIH", awayTeam: "QAT", date: "2026-06-24", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "Lumen Field", city: "Seattle", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 49 },

  // ─── GROUP C ───────────────────────────────────────────────────────────
  { id: "C1", group: "C", matchday: 1, homeTeam: "BRA", awayTeam: "MAR", date: "2026-06-13", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "MetLife Stadium", city: "East Rutherford", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 6 },
  { id: "C2", group: "C", matchday: 1, homeTeam: "HAI", awayTeam: "SCO", date: "2026-06-13", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "Gillette Stadium", city: "Foxborough", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 7 },
  { id: "C3", group: "C", matchday: 2, homeTeam: "SCO", awayTeam: "MAR", date: "2026-06-19", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "Gillette Stadium", city: "Foxborough", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 21 },
  { id: "C4", group: "C", matchday: 2, homeTeam: "BRA", awayTeam: "HAI", date: "2026-06-20", timeUTC: "00:30", timeSAST: "02:30 SAST (+1)", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 22 },
  { id: "C5", group: "C", matchday: 3, homeTeam: "SCO", awayTeam: "BRA", date: "2026-06-24", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "Hard Rock Stadium", city: "Miami", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 50 },
  { id: "C6", group: "C", matchday: 3, homeTeam: "MAR", awayTeam: "HAI", date: "2026-06-24", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 51 },

  // ─── GROUP D ───────────────────────────────────────────────────────────
  { id: "D1", group: "D", matchday: 1, homeTeam: "USA", awayTeam: "PAR", date: "2026-06-12", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "SoFi Stadium", city: "Inglewood", homeScore: 4, awayScore: 1, status: "finished", matchNumber: 4 },
  { id: "D2", group: "D", matchday: 1, homeTeam: "AUS", awayTeam: "TUR", date: "2026-06-13", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "BC Place", city: "Vancouver", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 8 },
  { id: "D3", group: "D", matchday: 2, homeTeam: "USA", awayTeam: "AUS", date: "2026-06-19", timeUTC: "16:00", timeSAST: "18:00 SAST", venue: "Lumen Field", city: "Seattle", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 23 },
  { id: "D4", group: "D", matchday: 2, homeTeam: "TUR", awayTeam: "PAR", date: "2026-06-20", timeUTC: "00:00", timeSAST: "02:00 SAST (+1)", venue: "Levi's Stadium", city: "Santa Clara", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 24 },
  { id: "D5", group: "D", matchday: 3, homeTeam: "TUR", awayTeam: "USA", date: "2026-06-25", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "SoFi Stadium", city: "Inglewood", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 57 },
  { id: "D6", group: "D", matchday: 3, homeTeam: "PAR", awayTeam: "AUS", date: "2026-06-25", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "Levi's Stadium", city: "Santa Clara", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 58 },

  // ─── GROUP E ───────────────────────────────────────────────────────────
  { id: "E1", group: "E", matchday: 1, homeTeam: "GER", awayTeam: "CUW", date: "2026-06-14", timeUTC: "17:00", timeSAST: "19:00 SAST", venue: "NRG Stadium", city: "Houston", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 9 },
  { id: "E2", group: "E", matchday: 1, homeTeam: "CIV", awayTeam: "ECU", date: "2026-06-14", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 10 },
  { id: "E3", group: "E", matchday: 2, homeTeam: "GER", awayTeam: "CIV", date: "2026-06-20", timeUTC: "20:00", timeSAST: "22:00 SAST", venue: "BMO Field", city: "Toronto", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 25 },
  { id: "E4", group: "E", matchday: 2, homeTeam: "ECU", awayTeam: "CUW", date: "2026-06-20", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 26 },
  { id: "E5", group: "E", matchday: 3, homeTeam: "CUW", awayTeam: "CIV", date: "2026-06-25", timeUTC: "20:00", timeSAST: "22:00 SAST", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 59 },
  { id: "E6", group: "E", matchday: 3, homeTeam: "ECU", awayTeam: "GER", date: "2026-06-25", timeUTC: "20:00", timeSAST: "22:00 SAST", venue: "MetLife Stadium", city: "East Rutherford", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 60 },

  // ─── GROUP F ───────────────────────────────────────────────────────────
  { id: "F1", group: "F", matchday: 1, homeTeam: "NED", awayTeam: "JPN", date: "2026-06-14", timeUTC: "20:00", timeSAST: "22:00 SAST", venue: "AT&T Stadium", city: "Arlington", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 11 },
  { id: "F2", group: "F", matchday: 1, homeTeam: "SWE", awayTeam: "TUN", date: "2026-06-15", timeUTC: "02:00", timeSAST: "04:00 SAST (+1)", venue: "Estadio BBVA", city: "Guadalupe", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 12 },
  { id: "F3", group: "F", matchday: 2, homeTeam: "NED", awayTeam: "SWE", date: "2026-06-20", timeUTC: "17:00", timeSAST: "19:00 SAST", venue: "NRG Stadium", city: "Houston", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 27 },
  { id: "F4", group: "F", matchday: 2, homeTeam: "TUN", awayTeam: "JPN", date: "2026-06-21", timeUTC: "04:00", timeSAST: "06:00 SAST (+1)", venue: "Estadio BBVA", city: "Guadalupe", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 28 },
  { id: "F5", group: "F", matchday: 3, homeTeam: "JPN", awayTeam: "SWE", date: "2026-06-25", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "AT&T Stadium", city: "Arlington", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 61 },
  { id: "F6", group: "F", matchday: 3, homeTeam: "TUN", awayTeam: "NED", date: "2026-06-25", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 62 },

  // ─── GROUP G ───────────────────────────────────────────────────────────
  { id: "G1", group: "G", matchday: 1, homeTeam: "BEL", awayTeam: "EGY", date: "2026-06-15", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "Lumen Field", city: "Seattle", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 16 },
  { id: "G2", group: "G", matchday: 1, homeTeam: "IRN", awayTeam: "NZL", date: "2026-06-16", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "SoFi Stadium", city: "Inglewood", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 15 },
  { id: "G3", group: "G", matchday: 2, homeTeam: "BEL", awayTeam: "IRN", date: "2026-06-21", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "SoFi Stadium", city: "Inglewood", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 31 },
  { id: "G4", group: "G", matchday: 2, homeTeam: "NZL", awayTeam: "EGY", date: "2026-06-22", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "BC Place", city: "Vancouver", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 32 },
  { id: "G5", group: "G", matchday: 3, homeTeam: "EGY", awayTeam: "IRN", date: "2026-06-27", timeUTC: "00:00", timeSAST: "02:00 SAST (+1)", venue: "Lumen Field", city: "Seattle", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 67 },
  { id: "G6", group: "G", matchday: 3, homeTeam: "NZL", awayTeam: "BEL", date: "2026-06-27", timeUTC: "00:00", timeSAST: "02:00 SAST (+1)", venue: "BC Place", city: "Vancouver", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 68 },

  // ─── GROUP H ───────────────────────────────────────────────────────────
  { id: "H1", group: "H", matchday: 1, homeTeam: "ESP", awayTeam: "CPV", date: "2026-06-15", timeUTC: "16:00", timeSAST: "18:00 SAST", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 17 },
  { id: "H2", group: "H", matchday: 1, homeTeam: "KSA", awayTeam: "URU", date: "2026-06-15", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "Hard Rock Stadium", city: "Miami", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 18 },
  { id: "H3", group: "H", matchday: 2, homeTeam: "ESP", awayTeam: "KSA", date: "2026-06-21", timeUTC: "16:00", timeSAST: "18:00 SAST", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 33 },
  { id: "H4", group: "H", matchday: 2, homeTeam: "URU", awayTeam: "CPV", date: "2026-06-21", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "Hard Rock Stadium", city: "Miami", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 34 },
  { id: "H5", group: "H", matchday: 3, homeTeam: "CPV", awayTeam: "KSA", date: "2026-06-26", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "NRG Stadium", city: "Houston", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 69 },
  { id: "H6", group: "H", matchday: 3, homeTeam: "URU", awayTeam: "ESP", date: "2026-06-27", timeUTC: "00:00", timeSAST: "02:00 SAST (+1)", venue: "Estadio Akron", city: "Zapopan", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 70 },

  // ─── GROUP I ───────────────────────────────────────────────────────────
  { id: "I1", group: "I", matchday: 1, homeTeam: "FRA", awayTeam: "SEN", date: "2026-06-16", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "MetLife Stadium", city: "East Rutherford", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 19 },
  { id: "I2", group: "I", matchday: 1, homeTeam: "IRQ", awayTeam: "NOR", date: "2026-06-16", timeUTC: "22:00", timeSAST: "00:00 SAST (+1)", venue: "Gillette Stadium", city: "Foxborough", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 20 },
  { id: "I3", group: "I", matchday: 2, homeTeam: "FRA", awayTeam: "IRQ", date: "2026-06-22", timeUTC: "21:00", timeSAST: "23:00 SAST", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 35 },
  { id: "I4", group: "I", matchday: 2, homeTeam: "NOR", awayTeam: "SEN", date: "2026-06-23", timeUTC: "00:00", timeSAST: "02:00 SAST (+1)", venue: "MetLife Stadium", city: "East Rutherford", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 36 },
  { id: "I5", group: "I", matchday: 3, homeTeam: "NOR", awayTeam: "FRA", date: "2026-06-26", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "Gillette Stadium", city: "Foxborough", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 71 },
  { id: "I6", group: "I", matchday: 3, homeTeam: "SEN", awayTeam: "IRQ", date: "2026-06-26", timeUTC: "19:00", timeSAST: "21:00 SAST", venue: "BMO Field", city: "Toronto", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 72 },

  // ─── GROUP J ───────────────────────────────────────────────────────────
  { id: "J1", group: "J", matchday: 1, homeTeam: "ARG", awayTeam: "ALG", date: "2026-06-16", timeUTC: "01:00", timeSAST: "03:00 SAST (+1)", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 21 },
  { id: "J2", group: "J", matchday: 1, homeTeam: "AUT", awayTeam: "JOR", date: "2026-06-17", timeUTC: "04:00", timeSAST: "06:00 SAST (+1)", venue: "Levi's Stadium", city: "Santa Clara", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 22 },
  { id: "J3", group: "J", matchday: 2, homeTeam: "ARG", awayTeam: "AUT", date: "2026-06-22", timeUTC: "17:00", timeSAST: "19:00 SAST", venue: "AT&T Stadium", city: "Arlington", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 37 },
  { id: "J4", group: "J", matchday: 2, homeTeam: "JOR", awayTeam: "ALG", date: "2026-06-23", timeUTC: "03:00", timeSAST: "05:00 SAST (+1)", venue: "Levi's Stadium", city: "Santa Clara", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 38 },
  { id: "J5", group: "J", matchday: 3, homeTeam: "ALG", awayTeam: "AUT", date: "2026-06-28", timeUTC: "02:00", timeSAST: "04:00 SAST (+1)", venue: "Arrowhead Stadium", city: "Kansas City", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 73 },
  { id: "J6", group: "J", matchday: 3, homeTeam: "JOR", awayTeam: "ARG", date: "2026-06-28", timeUTC: "02:00", timeSAST: "04:00 SAST (+1)", venue: "AT&T Stadium", city: "Arlington", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 74 },

  // ─── GROUP K ───────────────────────────────────────────────────────────
  { id: "K1", group: "K", matchday: 1, homeTeam: "POR", awayTeam: "COD", date: "2026-06-17", timeUTC: "17:00", timeSAST: "19:00 SAST", venue: "NRG Stadium", city: "Houston", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 23 },
  { id: "K2", group: "K", matchday: 1, homeTeam: "UZB", awayTeam: "COL", date: "2026-06-18", timeUTC: "02:00", timeSAST: "04:00 SAST (+1)", venue: "Estadio Azteca", city: "Mexico City", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 24 },
  { id: "K3", group: "K", matchday: 2, homeTeam: "POR", awayTeam: "UZB", date: "2026-06-23", timeUTC: "17:00", timeSAST: "19:00 SAST", venue: "NRG Stadium", city: "Houston", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 39 },
  { id: "K4", group: "K", matchday: 2, homeTeam: "COL", awayTeam: "COD", date: "2026-06-24", timeUTC: "02:00", timeSAST: "04:00 SAST (+1)", venue: "Estadio Akron", city: "Zapopan", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 40 },
  { id: "K5", group: "K", matchday: 3, homeTeam: "COL", awayTeam: "POR", date: "2026-06-28", timeUTC: "23:30", timeSAST: "01:30 SAST (+1)", venue: "Hard Rock Stadium", city: "Miami", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 75 },
  { id: "K6", group: "K", matchday: 3, homeTeam: "COD", awayTeam: "UZB", date: "2026-06-28", timeUTC: "23:30", timeSAST: "01:30 SAST (+1)", venue: "Mercedes-Benz Stadium", city: "Atlanta", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 76 },

  // ─── GROUP L ───────────────────────────────────────────────────────────
  { id: "L1", group: "L", matchday: 1, homeTeam: "ENG", awayTeam: "CRO", date: "2026-06-17", timeUTC: "20:00", timeSAST: "22:00 SAST", venue: "AT&T Stadium", city: "Arlington", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 25 },
  { id: "L2", group: "L", matchday: 1, homeTeam: "GHA", awayTeam: "PAN", date: "2026-06-17", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "BMO Field", city: "Toronto", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 26 },
  { id: "L3", group: "L", matchday: 2, homeTeam: "ENG", awayTeam: "GHA", date: "2026-06-23", timeUTC: "20:00", timeSAST: "22:00 SAST", venue: "Gillette Stadium", city: "Foxborough", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 41 },
  { id: "L4", group: "L", matchday: 2, homeTeam: "PAN", awayTeam: "CRO", date: "2026-06-23", timeUTC: "23:00", timeSAST: "01:00 SAST (+1)", venue: "BMO Field", city: "Toronto", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 42 },
  { id: "L5", group: "L", matchday: 3, homeTeam: "PAN", awayTeam: "ENG", date: "2026-06-27", timeUTC: "21:00", timeSAST: "23:00 SAST", venue: "MetLife Stadium", city: "East Rutherford", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 77 },
  { id: "L6", group: "L", matchday: 3, homeTeam: "CRO", awayTeam: "GHA", date: "2026-06-27", timeUTC: "21:00", timeSAST: "23:00 SAST", venue: "Lincoln Financial Field", city: "Philadelphia", homeScore: null, awayScore: null, status: "upcoming", matchNumber: 78 },
];

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export function getTournamentFixtures(): Match[] {
  return GROUP_FIXTURES.map((match) => {
    const live = FIFA_LIVE_RESULTS[match.id];
    return live ? { ...match, ...live } : match;
  });
}

export function getSastDateString(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getGroupFixtures(group: string): Match[] {
  return getTournamentFixtures().filter((m) => m.group === group);
}

export function getTodaysMatches(): Match[] {
  const today = getSastDateString();
  return getTournamentFixtures().filter((m) => m.date === today);
}

export function getUpcomingMatches(count = 5): Match[] {
  const today = getSastDateString();
  return getTournamentFixtures().filter((m) => m.date >= today && m.status !== "finished").slice(0, count);
}
