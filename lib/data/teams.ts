export interface Team {
  code: string;        // FIFA code (e.g. "ARG")
  name: string;        // Full name
  shortName: string;   // Short display name
  flagCode: string;    // flagcdn.com 2-letter code
  fifaRank: number;    // FIFA ranking (Nov 2025, used for draw seeding)
  wcTitles: number;
  wcAppearances: number;
  wcBestResult: string;
  pot: number;         // Draw pot (1-4)
  confederation: string;
  color: string;       // Primary jersey hex
  tournamentOdds: number; // % chance to win the tournament
  fact: string;
  quote: string;
  quoteSource: string;
  strengths: string[];
  keyPlayer: string;
}

export const TEAMS: Record<string, Team> = {
  // ── GROUP A ─────────────────────────────────────────────────────
  MEX: {
    code: "MEX", name: "Mexico", shortName: "Mexico", flagCode: "mx",
    fifaRank: 15, wcTitles: 0, wcAppearances: 18, wcBestResult: "Quarter-finals (1970, 1986)",
    pot: 1, confederation: "CONCACAF", color: "#006847",
    tournamentOdds: 1.2,
    fact: "Mexico is the only nation to host the World Cup three times (1970, 1986, 2026).",
    quote: "The Azteca will roar again. We play for every Mexican heart.",
    quoteSource: "Javier Aguirre, Mexico Head Coach",
    strengths: ["Passionate home support", "Clinical counter-attack", "Azteca altitude advantage"],
    keyPlayer: "Santiago Giménez",
  },
  RSA: {
    code: "RSA", name: "South Africa", shortName: "Bafana Bafana", flagCode: "za",
    fifaRank: 61, wcTitles: 0, wcAppearances: 4, wcBestResult: "Group stage (1998, 2002, 2010)",
    pot: 3, confederation: "CAF", color: "#009B48",
    tournamentOdds: 0.2,
    fact: "South Africa hosted the 2010 World Cup — the first on African soil — drawing 1–1 with Mexico in the opening match, exactly as they do now in 2026.",
    quote: "History doesn't repeat itself, but it does rhyme.",
    quoteSource: "Hugo Broos, South Africa Head Coach",
    strengths: ["High-energy pressing", "Strong set pieces", "Motivated underdog mindset"],
    keyPlayer: "Percy Tau",
  },
  KOR: {
    code: "KOR", name: "South Korea", shortName: "South Korea", flagCode: "kr",
    fifaRank: 22, wcTitles: 0, wcAppearances: 12, wcBestResult: "Fourth place (2002)",
    pot: 2, confederation: "AFC", color: "#C60C30",
    tournamentOdds: 1.5,
    fact: "South Korea's 4th place finish in 2002 remains the best ever by an Asian nation. Their fans — the Red Devils — create some of the tournament's loudest atmospheres.",
    quote: "We have the quality. We have the hunger. Now we need the belief.",
    quoteSource: "Hong Myung-bo, South Korea Head Coach",
    strengths: ["Elite work-rate", "Quick wide play", "Son Heung-min's world-class finishing"],
    keyPlayer: "Son Heung-min",
  },
  CZE: {
    code: "CZE", name: "Czechia", shortName: "Czechia", flagCode: "cz",
    fifaRank: 44, wcTitles: 0, wcAppearances: 10, wcBestResult: "Runner-up as Czechoslovakia (1934, 1962)",
    pot: 4, confederation: "UEFA", color: "#D7141A",
    tournamentOdds: 0.4,
    fact: "As Czechoslovakia, they were World Cup runners-up twice. Their 1962 team remains one of the great European sides never to lift the trophy.",
    quote: "People may underestimate us, but that's how we like it.",
    quoteSource: "Ivan Hašek, Czechia Head Coach",
    strengths: ["Compact defensive shape", "Set-piece threat", "Experienced veterans"],
    keyPlayer: "Tomáš Souček",
  },

  // ── GROUP B ─────────────────────────────────────────────────────
  CAN: {
    code: "CAN", name: "Canada", shortName: "Canada", flagCode: "ca",
    fifaRank: 27, wcTitles: 0, wcAppearances: 3, wcBestResult: "Group stage (1986, 2022)",
    pot: 1, confederation: "CONCACAF", color: "#FF0000",
    tournamentOdds: 0.8,
    fact: "Canada qualified for their first World Cup in 36 years in 2022 with a golden generation including Alphonso Davies and Jonathan David.",
    quote: "We're not just here to participate. We're here to compete.",
    quoteSource: "Jesse Marsch, Canada Head Coach",
    strengths: ["Alphonso Davies' explosive pace", "Physical pressing", "Jonathan David's clinical finishing"],
    keyPlayer: "Alphonso Davies",
  },
  BIH: {
    code: "BIH", name: "Bosnia & Herzegovina", shortName: "Bosnia", flagCode: "ba",
    fifaRank: 65, wcTitles: 0, wcAppearances: 2, wcBestResult: "Group stage (2014)",
    pot: 4, confederation: "UEFA", color: "#002395",
    tournamentOdds: 0.15,
    fact: "Bosnia & Herzegovina's 2014 World Cup debut featured a stunning goal by Edin Džeko. Their squad blends veterans with exciting youngsters.",
    quote: "Every match is a statement about who we are as a nation.",
    quoteSource: "Sergej Barbarez, Bosnia Head Coach",
    strengths: ["Džeko-inspired attacking tradition", "Physical midfield", "Disciplined structure"],
    keyPlayer: "Ermedin Demirović",
  },
  QAT: {
    code: "QAT", name: "Qatar", shortName: "Qatar", flagCode: "qa",
    fifaRank: 51, wcTitles: 0, wcAppearances: 2, wcBestResult: "Group stage (2022)",
    pot: 3, confederation: "AFC", color: "#8D1B3D",
    tournamentOdds: 0.1,
    fact: "Qatar made history as the first host nation to be eliminated in the group stage at their own 2022 World Cup, but have since heavily invested in developing their squad.",
    quote: "We have learned from 2022. We are a different team now.",
    quoteSource: "Carlos Queiroz, Qatar Head Coach",
    strengths: ["Well-organised defence", "Disciplined system", "Experienced against top opponents"],
    keyPlayer: "Akram Afif",
  },
  SUI: {
    code: "SUI", name: "Switzerland", shortName: "Switzerland", flagCode: "ch",
    fifaRank: 17, wcTitles: 0, wcAppearances: 13, wcBestResult: "Quarter-finals (1934, 1938, 1954)",
    pot: 2, confederation: "UEFA", color: "#FF0000",
    tournamentOdds: 1.0,
    fact: "Switzerland has reached the knockout rounds in 4 of their last 5 World Cups. Their multicultural squad represents over 10 nationalities.",
    quote: "We may be the smallest nation here but our ambition is the biggest.",
    quoteSource: "Murat Yakin, Switzerland Head Coach",
    strengths: ["Tactical versatility", "Strong spine", "Xherdan Shaqiri's creativity"],
    keyPlayer: "Granit Xhaka",
  },

  // ── GROUP C ─────────────────────────────────────────────────────
  BRA: {
    code: "BRA", name: "Brazil", shortName: "Brazil", flagCode: "br",
    fifaRank: 5, wcTitles: 5, wcAppearances: 22, wcBestResult: "Champions (1958, 1962, 1970, 1994, 2002)",
    pot: 1, confederation: "CONMEBOL", color: "#009C3B",
    tournamentOdds: 8.5,
    fact: "Brazil is the only nation to have played in every World Cup (22 editions) and the most successful team in history with 5 titles. Their 2002 front three of Ronaldo, Ronaldinho and Rivaldo remains legendary.",
    quote: "Brazil never arrives at a World Cup to participate — we arrive to win.",
    quoteSource: "Carlo Ancelotti, Brazil Head Coach",
    strengths: ["Vinicius Jr's electric dribbling", "Deep attacking depth", "Rodrygo and Endrick combination"],
    keyPlayer: "Vinícius Júnior",
  },
  MAR: {
    code: "MAR", name: "Morocco", shortName: "Morocco", flagCode: "ma",
    fifaRank: 11, wcTitles: 0, wcAppearances: 8, wcBestResult: "Semi-finals (2022)",
    pot: 2, confederation: "CAF", color: "#C1272D",
    tournamentOdds: 2.5,
    fact: "Morocco became the first African nation to reach a World Cup semi-final at Qatar 2022, defeating Spain, Portugal and Belgium along the way. Their Atlas Lions are now genuine contenders.",
    quote: "2022 was not a dream — it was a message. Africa can compete at the highest level.",
    quoteSource: "Walid Regragui, Morocco Head Coach",
    strengths: ["Elite defensive organisation", "Physical intensity", "Hakim Ziyech's chance creation"],
    keyPlayer: "Achraf Hakimi",
  },
  HAI: {
    code: "HAI", name: "Haiti", shortName: "Haiti", flagCode: "ht",
    fifaRank: 84, wcTitles: 0, wcAppearances: 2, wcBestResult: "Group stage (1974)",
    pot: 4, confederation: "CONCACAF", color: "#00209F",
    tournamentOdds: 0.05,
    fact: "Haiti's second World Cup appearance ever (first since 1974). Striker Frantzdy Pierrot was the CONCACAF qualifying top scorer. Their passionate fanbase is one of football's most devoted.",
    quote: "We represent 12 million people who dream through us.",
    quoteSource: "Marc Collat, Haiti Head Coach",
    strengths: ["Surprising tactical discipline", "Quick transitions", "Fierce competitive spirit"],
    keyPlayer: "Frantzdy Pierrot",
  },
  SCO: {
    code: "SCO", name: "Scotland", shortName: "Scotland", flagCode: "gb-sct",
    fifaRank: 36, wcTitles: 0, wcAppearances: 9, wcBestResult: "Group stage (best record: 1978)",
    pot: 3, confederation: "UEFA", color: "#003da5",
    tournamentOdds: 0.5,
    fact: "Scotland have never made it past the group stage of a World Cup across 9 appearances, but their 2026 squad — led by Billy Gilmour and Scott McTominay — is the strongest in a generation.",
    quote: "Scotland's greatest strength is that we have nothing to lose and everything to prove.",
    quoteSource: "Steve Clarke, Scotland Head Coach",
    strengths: ["Physical midfield", "Set-piece prowess", "Andy Robertson's relentless energy"],
    keyPlayer: "Scott McTominay",
  },

  // ── GROUP D ─────────────────────────────────────────────────────
  USA: {
    code: "USA", name: "United States", shortName: "USA", flagCode: "us",
    fifaRank: 14, wcTitles: 0, wcAppearances: 12, wcBestResult: "Third place (1930), Quarter-finals (2002)",
    pot: 1, confederation: "CONCACAF", color: "#002868",
    tournamentOdds: 3.5,
    fact: "As co-hosts, the USA plays at SoFi Stadium in Los Angeles — the largest World Cup venue ever at 93,000 capacity. Their MLS golden generation is complemented by European stars like Pulisic and McKennie.",
    quote: "The eyes of the world will be on us. Let's give them something to talk about.",
    quoteSource: "Mauricio Pochettino, USA Head Coach",
    strengths: ["Christian Pulisic's creative spark", "Athletic intensity", "Massive home crowd advantage"],
    keyPlayer: "Christian Pulisic",
  },
  PAR: {
    code: "PAR", name: "Paraguay", shortName: "Paraguay", flagCode: "py",
    fifaRank: 39, wcTitles: 0, wcAppearances: 9, wcBestResult: "Quarter-finals (1954, 2010)",
    pot: 3, confederation: "CONMEBOL", color: "#0038A8",
    tournamentOdds: 0.3,
    fact: "Paraguay's 2010 team reached the quarter-finals, defeating Japan in penalties. Goalkeeper Justo Villar was one of the tournament's standout performers.",
    quote: "La Albirroja plays with its heart. Every opponent knows that.",
    quoteSource: "Gustavo Alfaro, Paraguay Head Coach",
    strengths: ["Rugged defensive resilience", "Physical dominance", "Set-piece danger"],
    keyPlayer: "Miguel Almirón",
  },
  AUS: {
    code: "AUS", name: "Australia", shortName: "Socceroos", flagCode: "au",
    fifaRank: 26, wcTitles: 0, wcAppearances: 6, wcBestResult: "Third place (1974 as single Oceania rep), Round of 16 (2006, 2022)",
    pot: 3, confederation: "AFC", color: "#FFD700",
    tournamentOdds: 0.6,
    fact: "Australia's 2022 run to the Round of 16 — defeating Denmark and Tunisia — sparked a football revolution in Australia. The Socceroos now have the deepest squad in their history.",
    quote: "2022 showed us we belong. 2026 is where we prove it.",
    quoteSource: "Tony Popovic, Australia Head Coach",
    strengths: ["Harry Souttar's commanding defence", "Mitchell Duke aerial threat", "Resilient team spirit"],
    keyPlayer: "Mat Ryan",
  },
  TUR: {
    code: "TUR", name: "Turkey", shortName: "Turkey", flagCode: "tr",
    fifaRank: 32, wcTitles: 0, wcAppearances: 3, wcBestResult: "Third place (2002)",
    pot: 4, confederation: "UEFA", color: "#E30A17",
    tournamentOdds: 0.8,
    fact: "Turkey's unforgettable 2002 run to third place included a stunning 3–2 victory over Senegal. Current star Hakan Çalhanoğlu has matured into one of the world's best deep-lying playmakers.",
    quote: "The spirit of 2002 lives in every Turkish player. We will honour it.",
    quoteSource: "Vincenzo Montella, Turkey Head Coach",
    strengths: ["Çalhanoğlu's passing range", "Arda Güler's dribbling genius", "Physical intensity"],
    keyPlayer: "Hakan Çalhanoğlu",
  },

  // ── GROUP E ─────────────────────────────────────────────────────
  GER: {
    code: "GER", name: "Germany", shortName: "Germany", flagCode: "de",
    fifaRank: 9, wcTitles: 4, wcAppearances: 20, wcBestResult: "Champions (1954, 1974, 1990, 2014)",
    pot: 1, confederation: "UEFA", color: "#000000",
    tournamentOdds: 6.0,
    fact: "Germany have never failed to reach the knockout rounds from their group in 19 appearances — until 2018 and 2022 shocking group-stage exits. Under Nagelsmann, they're hungry for redemption.",
    quote: "We don't do sentiment. We do winning.",
    quoteSource: "Julian Nagelsmann, Germany Head Coach",
    strengths: ["Jamal Musiala's improvisational genius", "Florian Wirtz's vision", "Clinical in big tournaments"],
    keyPlayer: "Jamal Musiala",
  },
  CUW: {
    code: "CUW", name: "Curaçao", shortName: "Curaçao", flagCode: "cw",
    fifaRank: 82, wcTitles: 0, wcAppearances: 1, wcBestResult: "First World Cup appearance",
    pot: 4, confederation: "CONCACAF", color: "#002B7F",
    tournamentOdds: 0.02,
    fact: "Curaçao make their World Cup debut in 2026 — a tiny island of 150,000 people that competes via the CONCACAF. Their Dutch-Caribbean heritage gives them technical European-influenced football.",
    quote: "We are the underdogs. But underdogs can bite.",
    quoteSource: "Patrick Kluivert, Curaçao Head Coach",
    strengths: ["Surprise factor", "Dutch technical DNA", "Nothing to lose mentality"],
    keyPlayer: "Cuco Martina",
  },
  CIV: {
    code: "CIV", name: "Ivory Coast", shortName: "Ivory Coast", flagCode: "ci",
    fifaRank: 42, wcTitles: 0, wcAppearances: 4, wcBestResult: "Round of 16 (2006)",
    pot: 3, confederation: "CAF", color: "#F77F00",
    tournamentOdds: 0.6,
    fact: "The Ivory Coast of Didier Drogba (2006–2014) was one of Africa's greatest-ever squads but fell in star-studded groups. The 2026 side, AFCON 2024 winners, finally has less pressure.",
    quote: "AFCON proved we are winners. The World Cup is the next chapter.",
    quoteSource: "Emerse Faé, Ivory Coast Head Coach",
    strengths: ["Simon's attacking flair", "Physical dominance", "Cup tournament mentality"],
    keyPlayer: "Sébastien Haller",
  },
  ECU: {
    code: "ECU", name: "Ecuador", shortName: "Ecuador", flagCode: "ec",
    fifaRank: 23, wcTitles: 0, wcAppearances: 4, wcBestResult: "Round of 16 (2006)",
    pot: 2, confederation: "CONMEBOL", color: "#FFD100",
    tournamentOdds: 0.7,
    fact: "Ecuador opened the 2022 World Cup with a historic 2–0 win over Qatar. Striker Enner Valencia scored in all three group games despite playing through injury.",
    quote: "Ecuador opens World Cups. This time, we plan to close one too.",
    quoteSource: "Sébastien Beccacece, Ecuador Head Coach",
    strengths: ["Enner Valencia's veteran leadership", "Height and physicality", "Solid defensive unit"],
    keyPlayer: "Gonzalo Plata",
  },

  // ── GROUP F ─────────────────────────────────────────────────────
  NED: {
    code: "NED", name: "Netherlands", shortName: "Netherlands", flagCode: "nl",
    fifaRank: 7, wcTitles: 0, wcAppearances: 11, wcBestResult: "Runner-up (1974, 1978, 2010)",
    pot: 1, confederation: "UEFA", color: "#FF4F00",
    tournamentOdds: 4.5,
    fact: "The Netherlands invented 'Total Football' and have been runners-up 3 times without ever winning. Cody Gakpo has emerged as one of the world's most complete forwards.",
    quote: "Dutch football has always been about ideas. This generation plays with purpose.",
    quoteSource: "Ronald Koeman, Netherlands Head Coach",
    strengths: ["Virgil van Dijk's commanding defence", "Cody Gakpo's finishing", "High defensive line"],
    keyPlayer: "Cody Gakpo",
  },
  JPN: {
    code: "JPN", name: "Japan", shortName: "Japan", flagCode: "jp",
    fifaRank: 18, wcTitles: 0, wcAppearances: 8, wcBestResult: "Quarter-finals (2022)",
    pot: 2, confederation: "AFC", color: "#003087",
    tournamentOdds: 1.8,
    fact: "Japan's 2022 Qatar performances were sensational — beating Germany and Spain in the group stage and reaching the QF. Over 40% of their squad now plays in Europe's top leagues.",
    quote: "We shocked the world in Qatar. Now we want to go further.",
    quoteSource: "Hajime Moriyasu, Japan Head Coach",
    strengths: ["Takefusa Kubo's dribbling", "Electric transitions", "High pressing system"],
    keyPlayer: "Takefusa Kubo",
  },
  SWE: {
    code: "SWE", name: "Sweden", shortName: "Sweden", flagCode: "se",
    fifaRank: 25, wcTitles: 0, wcAppearances: 12, wcBestResult: "Third place (1950, 1994)",
    pot: 3, confederation: "UEFA", color: "#006AA7",
    tournamentOdds: 0.6,
    fact: "Sweden reached the 2018 semi-finals without Ibrahimović. Their post-Ibra era has produced Alexander Isak, one of the world's most coveted strikers.",
    quote: "Without Zlatan, people said Swedish football was over. Isak proved them wrong.",
    quoteSource: "Jon Dahl Tomasson, Sweden Head Coach",
    strengths: ["Alexander Isak's elite movement", "Physical defensive block", "Set-piece mastery"],
    keyPlayer: "Alexander Isak",
  },
  TUN: {
    code: "TUN", name: "Tunisia", shortName: "Tunisia", flagCode: "tn",
    fifaRank: 40, wcTitles: 0, wcAppearances: 7, wcBestResult: "Group stage (best run: 2022 beat France)",
    pot: 3, confederation: "CAF", color: "#E70013",
    tournamentOdds: 0.15,
    fact: "Tunisia defeated defending champions France 1–0 at the 2022 World Cup — one of the tournament's great upsets. Midfielder Hannibal Mejbri was the standout performer.",
    quote: "When Tunisia defeated France, every African child believed anything was possible.",
    quoteSource: "Jalel Kadri, Tunisia Head Coach",
    strengths: ["Strong team spirit", "Tactical discipline", "Ability to upset top nations"],
    keyPlayer: "Wahbi Khazri",
  },

  // ── GROUP G ─────────────────────────────────────────────────────
  BEL: {
    code: "BEL", name: "Belgium", shortName: "Belgium", flagCode: "be",
    fifaRank: 8, wcTitles: 0, wcAppearances: 15, wcBestResult: "Third place (2018)",
    pot: 1, confederation: "UEFA", color: "#EF3340",
    tournamentOdds: 3.5,
    fact: "Belgium's 2018 squad was called the 'Golden Generation' — the greatest ever not to win the World Cup. The current squad bridges that era with exciting youth like Johan Bakayoko.",
    quote: "We watched the golden generation fall short. We will not make the same mistakes.",
    quoteSource: "Domenico Tedesco, Belgium Head Coach",
    strengths: ["De Bruyne's vision and passing", "Romelu Lukaku's physicality", "Deep creative talent"],
    keyPlayer: "Kevin De Bruyne",
  },
  EGY: {
    code: "EGY", name: "Egypt", shortName: "Egypt", flagCode: "eg",
    fifaRank: 34, wcTitles: 0, wcAppearances: 4, wcBestResult: "Group stage (1990)",
    pot: 3, confederation: "CAF", color: "#C8102E",
    tournamentOdds: 0.25,
    fact: "Mohamed Salah is one of the greatest footballers of his generation — winner of Premier League, Champions League, and everything in between — but has never played at a World Cup.",
    quote: "For 30 years I dreamed of this moment. Now I'm here to make it count.",
    quoteSource: "Mohamed Salah",
    strengths: ["Mohamed Salah's world-class quality", "Organised defensive block", "Set-piece efficiency"],
    keyPlayer: "Mohamed Salah",
  },
  IRN: {
    code: "IRN", name: "Iran", shortName: "Iran", flagCode: "ir",
    fifaRank: 20, wcTitles: 0, wcAppearances: 7, wcBestResult: "Group stage",
    pot: 2, confederation: "AFC", color: "#239F40",
    tournamentOdds: 0.3,
    fact: "Iran's 2022 comeback — losing 6–2 to England but defeating Wales and USA — showed their resilience. Coach Carlos Queiroz previously led Portugal to the 2006 semi-finals.",
    quote: "We may come from controversy, but on the pitch, football is the only politics.",
    quoteSource: "Amir Ghalenoei, Iran Head Coach",
    strengths: ["Physical and aggressive pressing", "Quick counters", "Bundesliga-based core"],
    keyPlayer: "Sardar Azmoun",
  },
  NZL: {
    code: "NZL", name: "New Zealand", shortName: "New Zealand", flagCode: "nz",
    fifaRank: 86, wcTitles: 0, wcAppearances: 3, wcBestResult: "Group stage (1982, 2010)",
    pot: 4, confederation: "OFC", color: "#000000",
    tournamentOdds: 0.05,
    fact: "New Zealand drew all three games at the 2010 World Cup — the only team to avoid defeat without advancing. Their all-time record scorer Chris Wood has scored 50+ international goals.",
    quote: "New Zealand went unbeaten in 2010. We want that and more in 2026.",
    quoteSource: "Darren Bazeley, New Zealand Head Coach",
    strengths: ["Chris Wood aerial dominance", "Disciplined defensive organisation", "Set-piece threat"],
    keyPlayer: "Chris Wood",
  },

  // ── GROUP H ─────────────────────────────────────────────────────
  ESP: {
    code: "ESP", name: "Spain", shortName: "Spain", flagCode: "es",
    fifaRank: 1, wcTitles: 1, wcAppearances: 16, wcBestResult: "Champions (2010)",
    pot: 1, confederation: "UEFA", color: "#AA151B",
    tournamentOdds: 11.0,
    fact: "Spain won EURO 2024 for a record 4th time, cementing Lamine Yamal and Pedri as the world's most exciting young midfield. They are the #1 ranked team and tournament favorites.",
    quote: "We play for joy. And when Spain plays with joy, nobody can stop us.",
    quoteSource: "Luis de la Fuente, Spain Head Coach",
    strengths: ["Lamine Yamal's genius dribbling", "Pedri's midfield control", "Tiki-taka with modern intensity"],
    keyPlayer: "Lamine Yamal",
  },
  CPV: {
    code: "CPV", name: "Cape Verde", shortName: "Cape Verde", flagCode: "cv",
    fifaRank: 68, wcTitles: 0, wcAppearances: 1, wcBestResult: "World Cup debut 2026",
    pot: 4, confederation: "CAF", color: "#003893",
    tournamentOdds: 0.03,
    fact: "Cape Verde make their World Cup debut, representing a nation of 560,000 people. Many of their players are of Cape Verdean descent playing in European leagues.",
    quote: "We are a small island with a giant heart.",
    quoteSource: "Pedro Leitão, Cape Verde Head Coach",
    strengths: ["Surprise debut factor", "Fast wingers", "Intense work ethic"],
    keyPlayer: "Dylan Tavares",
  },
  KSA: {
    code: "KSA", name: "Saudi Arabia", shortName: "Saudi Arabia", flagCode: "sa",
    fifaRank: 60, wcTitles: 0, wcAppearances: 7, wcBestResult: "Round of 16 (1994)",
    pot: 3, confederation: "AFC", color: "#006C35",
    tournamentOdds: 0.15,
    fact: "Saudi Arabia's 2–1 defeat of Argentina at the 2022 World Cup is considered one of the greatest upsets in World Cup history. With Ronaldo and Benzema now retired, their domestic league faces a test.",
    quote: "We proved the world wrong in 2022. We will do it again.",
    quoteSource: "Herve Renard, Saudi Arabia Head Coach",
    strengths: ["Disciplined defensive block", "Shock-factor history", "Salem Al-Dawsari's pace"],
    keyPlayer: "Salem Al-Dawsari",
  },
  URU: {
    code: "URU", name: "Uruguay", shortName: "Uruguay", flagCode: "uy",
    fifaRank: 16, wcTitles: 2, wcAppearances: 14, wcBestResult: "Champions (1930, 1950)",
    pot: 2, confederation: "CONMEBOL", color: "#75AADB",
    tournamentOdds: 1.5,
    fact: "Uruguay, population 3.5 million, has won the World Cup twice — the original 1930 and the miraculous 1950 Maracanazo. Darwin Núñez brings a new era of physical forward play.",
    quote: "Uruguay punches above its weight because it has no other choice.",
    quoteSource: "Marcelo Bielsa, Uruguay Head Coach",
    strengths: ["Darwin Núñez's explosive pace", "Federico Valverde's engine", "Defensive solidity"],
    keyPlayer: "Darwin Núñez",
  },

  // ── GROUP I ─────────────────────────────────────────────────────
  FRA: {
    code: "FRA", name: "France", shortName: "France", flagCode: "fr",
    fifaRank: 3, wcTitles: 2, wcAppearances: 16, wcBestResult: "Champions (1998, 2018)",
    pot: 1, confederation: "UEFA", color: "#002395",
    tournamentOdds: 13.0,
    fact: "France are the reigning World Cup runners-up (2022) and arguably have the deepest talent pool ever assembled. Kylian Mbappé leads a squad that includes 8 of the world's 20 best players.",
    quote: "When I was a boy I watched Zidane win the World Cup on this very pitch in Paris. Now it's my turn.",
    quoteSource: "Kylian Mbappé",
    strengths: ["Kylian Mbappé's devastating pace and finishing", "Defensive depth with Camavinga and Tchouaméni", "Multiple match-winners in every position"],
    keyPlayer: "Kylian Mbappé",
  },
  SEN: {
    code: "SEN", name: "Senegal", shortName: "Senegal", flagCode: "sn",
    fifaRank: 19, wcTitles: 0, wcAppearances: 4, wcBestResult: "Quarter-finals (2002)",
    pot: 2, confederation: "CAF", color: "#00853F",
    tournamentOdds: 1.2,
    fact: "Senegal are reigning African champions (AFCON 2021, 2022). Sadio Mané's retirement opened space for a new generation, but Ismaïla Sarr remains one of Africa's most dangerous attackers.",
    quote: "We carry the dreams of a continent on our backs. We carry them with pride.",
    quoteSource: "Aliou Cissé, Senegal Head Coach",
    strengths: ["Physical and athletic squad", "Ismaïla Sarr's pace", "Diallo and Sarr wide threat"],
    keyPlayer: "Ismaïla Sarr",
  },
  IRQ: {
    code: "IRQ", name: "Iraq", shortName: "Iraq", flagCode: "iq",
    fifaRank: 58, wcTitles: 0, wcAppearances: 2, wcBestResult: "Group stage (1986)",
    pot: 4, confederation: "AFC", color: "#007A3D",
    tournamentOdds: 0.05,
    fact: "Iraq's return to the World Cup after 40 years is one of the most emotional stories of 2026. Aymen Hussein was the AFC's joint top scorer in qualifying, scoring 13 goals.",
    quote: "Iraq returns to the World Cup. This match belongs to our people.",
    quoteSource: "Jesús Casas, Iraq Head Coach",
    strengths: ["Aymen Hussein's clinical finishing", "Team unity and spirit", "Physical defensive structure"],
    keyPlayer: "Aymen Hussein",
  },
  NOR: {
    code: "NOR", name: "Norway", shortName: "Norway", flagCode: "no",
    fifaRank: 29, wcTitles: 0, wcAppearances: 4, wcBestResult: "Round of 16 (1994, 1998)",
    pot: 3, confederation: "UEFA", color: "#EF2B2D",
    tournamentOdds: 0.8,
    fact: "Norway missed the last three World Cups. Erling Haaland — one of the most lethal strikers on the planet — is playing in his first World Cup at 25.",
    quote: "Erling has scored 60 Premier League goals in two seasons. Now let's see him do it on the World Cup stage.",
    quoteSource: "Ståle Solbakken, Norway Head Coach",
    strengths: ["Erling Haaland's unstoppable goal threat", "Martin Ødegaard's creativity", "Physical directness"],
    keyPlayer: "Erling Haaland",
  },

  // ── GROUP J ─────────────────────────────────────────────────────
  ARG: {
    code: "ARG", name: "Argentina", shortName: "Argentina", flagCode: "ar",
    fifaRank: 2, wcTitles: 3, wcAppearances: 18, wcBestResult: "Champions (1978, 1986, 2022)",
    pot: 1, confederation: "CONMEBOL", color: "#74ACDF",
    tournamentOdds: 12.0,
    fact: "Argentina are the defending World Cup champions, having beaten France in a historic 2022 final. Lionel Messi plays his final World Cup at 38 — in what he has called 'my last dance'.",
    quote: "This is my last World Cup. I want to play every minute as if it's the last. Because it is.",
    quoteSource: "Lionel Messi",
    strengths: ["Messi's unparalleled vision", "Julián Álvarez's intensity", "Hardened champions with winning DNA"],
    keyPlayer: "Lionel Messi",
  },
  ALG: {
    code: "ALG", name: "Algeria", shortName: "Algeria", flagCode: "dz",
    fifaRank: 35, wcTitles: 0, wcAppearances: 5, wcBestResult: "Round of 16 (2014)",
    pot: 3, confederation: "CAF", color: "#006233",
    tournamentOdds: 0.2,
    fact: "Algeria's 2022 qualifying heartbreak — eliminated in a playoff — made 2026 qualification even sweeter. Manchester City star Riyad Mahrez's retirement spurred a new generation.",
    quote: "Algeria is back where it belongs. We are dangerous and unpredictable.",
    quoteSource: "Djamel Belmadi, Algeria Head Coach",
    strengths: ["Sofiane Feghouli's experience", "Physical and aggressive press", "Dangerous counter-attacks"],
    keyPlayer: "Saïd Benrahma",
  },
  AUT: {
    code: "AUT", name: "Austria", shortName: "Austria", flagCode: "at",
    fifaRank: 24, wcTitles: 0, wcAppearances: 7, wcBestResult: "Third place (1954)",
    pot: 2, confederation: "UEFA", color: "#ED2939",
    tournamentOdds: 0.5,
    fact: "Austria reached the EURO 2024 knockout rounds for the first time in decades. Marko Arnautović's leadership and Marcel Sabitzer's midfield energy make them a dangerous dark horse.",
    quote: "We've been sleeping giants. Time to wake up.",
    quoteSource: "Ralf Rangnick, Austria Head Coach",
    strengths: ["Arnautović's target-man play", "Sabitzer's box-to-box dynamism", "High-intensity pressing"],
    keyPlayer: "Marcel Sabitzer",
  },
  JOR: {
    code: "JOR", name: "Jordan", shortName: "Jordan", flagCode: "jo",
    fifaRank: 66, wcTitles: 0, wcAppearances: 1, wcBestResult: "World Cup debut 2026",
    pot: 4, confederation: "AFC", color: "#007A3D",
    tournamentOdds: 0.04,
    fact: "Jordan make their World Cup debut after reaching the 2023 Asian Cup final and qualifying through the AFC playoffs. Their players, many based in the Middle East, are football pioneers in their region.",
    quote: "A first World Cup for Jordan. We dedicate every kick to our people.",
    quoteSource: "Adnan Hamad, Jordan Head Coach",
    strengths: ["Disciplined defensive structure", "Motivation of debut", "Quick transitions"],
    keyPlayer: "Yazan Al-Naimat",
  },

  // ── GROUP K ─────────────────────────────────────────────────────
  POR: {
    code: "POR", name: "Portugal", shortName: "Portugal", flagCode: "pt",
    fifaRank: 6, wcTitles: 0, wcAppearances: 9, wcBestResult: "Third place (1966), semi-finals (2006, 2022)",
    pot: 1, confederation: "UEFA", color: "#006600",
    tournamentOdds: 5.5,
    fact: "Portugal have reached the semi-finals in their last two World Cups. This tournament is the defining chance for the post-Ronaldo generation led by Rafael Leão and Bernardo Silva to claim their own glory.",
    quote: "Ronaldo carried us for two decades. Now it's our turn to carry Portugal.",
    quoteSource: "Roberto Martínez, Portugal Head Coach",
    strengths: ["Rafael Leão's dribbling and pace", "Bernardo Silva's intelligence", "Bruno Fernandes' creativity"],
    keyPlayer: "Rafael Leão",
  },
  COD: {
    code: "COD", name: "DR Congo", shortName: "DR Congo", flagCode: "cd",
    fifaRank: 78, wcTitles: 0, wcAppearances: 2, wcBestResult: "Quarter-finals as Zaïre (1974)",
    pot: 4, confederation: "CAF", color: "#007FFF",
    tournamentOdds: 0.08,
    fact: "As Zaïre (now DR Congo), they played at the 1974 World Cup where defender Mwepu Ilunga famously sprinted out of a wall and kicked a free-kick before opponents were ready.",
    quote: "DR Congo has 100 million reasons to do this. We play for all of them.",
    quoteSource: "Sébastien Desabre, DR Congo Head Coach",
    strengths: ["Yoane Wissa's clinical finishing", "Physical power", "Rich footballing tradition"],
    keyPlayer: "Yoane Wissa",
  },
  UZB: {
    code: "UZB", name: "Uzbekistan", shortName: "Uzbekistan", flagCode: "uz",
    fifaRank: 50, wcTitles: 0, wcAppearances: 1, wcBestResult: "World Cup debut 2026",
    pot: 3, confederation: "AFC", color: "#1EB53A",
    tournamentOdds: 0.06,
    fact: "Uzbekistan make their World Cup debut after three decades of independence. Their football federation, inspired by Barcelona's methodology, has produced technically gifted players.",
    quote: "Uzbekistan on the world stage — history in the making.",
    quoteSource: "Srecko Katanec, Uzbekistan Head Coach",
    strengths: ["Technical ground play", "Debut determination", "Khojaev's goals from midfield"],
    keyPlayer: "Eldor Shomurodov",
  },
  COL: {
    code: "COL", name: "Colombia", shortName: "Colombia", flagCode: "co",
    fifaRank: 13, wcTitles: 0, wcAppearances: 7, wcBestResult: "Quarter-finals (2014)",
    pot: 2, confederation: "CONMEBOL", color: "#FCD116",
    tournamentOdds: 2.0,
    fact: "Colombia reached the Copa América 2024 final, going unbeaten. James Rodríguez, then 33, announced himself as the World Cup's best player in 2014 — a golden boot winner.",
    quote: "Colombia has finally put together a squad that can win it all. This generation is different.",
    quoteSource: "Néstor Lorenzo, Colombia Head Coach",
    strengths: ["Luis Díaz's electric dribbling", "James Rodríguez's creativity (if fit)", "Falcao-inspired striker tradition"],
    keyPlayer: "Luis Díaz",
  },

  // ── GROUP L ─────────────────────────────────────────────────────
  ENG: {
    code: "ENG", name: "England", shortName: "England", flagCode: "gb-eng",
    fifaRank: 4, wcTitles: 1, wcAppearances: 17, wcBestResult: "Champions (1966), Fourth place (1990), Semi-finals (2018, 2022)",
    pot: 1, confederation: "UEFA", color: "#003070",
    tournamentOdds: 10.0,
    fact: "England reached the EURO 2024 final for the second consecutive time. Under Thomas Tuchel they have the most complete squad in 60 years — Bellingham, Saka and Kane form a generational attack.",
    quote: "This group of players can end 60 years of hurt. I believe that completely.",
    quoteSource: "Thomas Tuchel, England Head Coach",
    strengths: ["Bellingham's dynamic runs", "Harry Kane's clinical finishing", "Saka's wing play"],
    keyPlayer: "Jude Bellingham",
  },
  CRO: {
    code: "CRO", name: "Croatia", shortName: "Croatia", flagCode: "hr",
    fifaRank: 10, wcTitles: 0, wcAppearances: 7, wcBestResult: "Runner-up (2018), Third place (1998, 2022)",
    pot: 2, confederation: "UEFA", color: "#FF0000",
    tournamentOdds: 2.0,
    fact: "Croatia have reached the semi-finals or better in three of their last four World Cups — an extraordinary record for a nation of just 4 million people. Luka Modrić plays his final World Cup at 40.",
    quote: "People always say we're done. We always prove them wrong. I will prove them wrong one more time.",
    quoteSource: "Luka Modrić",
    strengths: ["Modrić's tempo and vision", "Kovačić's engine", "Collective team DNA of overachievement"],
    keyPlayer: "Luka Modrić",
  },
  GHA: {
    code: "GHA", name: "Ghana", shortName: "Ghana", flagCode: "gh",
    fifaRank: 72, wcTitles: 0, wcAppearances: 4, wcBestResult: "Quarter-finals (2010)",
    pot: 3, confederation: "CAF", color: "#006B3F",
    tournamentOdds: 0.15,
    fact: "Ghana's 2010 quarter-final run captured the world's imagination. A handball by Luis Suárez in the dying seconds denied them a semi-final — the most controversial moment in WC history.",
    quote: "2010 should have been ours. 2026 is the chance for justice.",
    quoteSource: "Otto Addo, Ghana Head Coach",
    strengths: ["Physical power and pace", "Jordan Ayew's experience", "Set-piece danger"],
    keyPlayer: "Mohammed Kudus",
  },
  PAN: {
    code: "PAN", name: "Panama", shortName: "Panama", flagCode: "pa",
    fifaRank: 30, wcTitles: 0, wcAppearances: 2, wcBestResult: "Group stage (2018)",
    pot: 3, confederation: "CONCACAF", color: "#DA121A",
    tournamentOdds: 0.08,
    fact: "Panama's historic 2018 debut saw them concede 11 goals in 3 games, but their joy at qualifying was one of football's most heartwarming stories. In 2026 they aim to win their first World Cup point.",
    quote: "In 2018 we danced. In 2026, we compete.",
    quoteSource: "Thomas Christiansen, Panama Head Coach",
    strengths: ["Physically imposing defenders", "Organised shape", "Penalty box resilience"],
    keyPlayer: "Adalberto Carrasquilla",
  },
};

export const TEAM_LIST = Object.values(TEAMS);

export function getTeam(code: string): Team {
  return TEAMS[code] || TEAMS.MEX; // fallback
}

export function getWinProbability(homeCode: string, awayCode: string): { home: number; draw: number; away: number } {
  const home = TEAMS[homeCode];
  const away = TEAMS[awayCode];
  if (!home || !away) return { home: 33, draw: 34, away: 33 };

  // Rating from FIFA rank (lower rank = better)
  const homeRating = Math.pow(1 / home.fifaRank, 0.4);
  const awayRating = Math.pow(1 / away.fifaRank, 0.4);
  const total = homeRating + awayRating;

  const homeWin = Math.round((homeRating / total) * 65); // 65% share for win/loss
  const awayWin = Math.round((awayRating / total) * 65);
  const draw = 100 - homeWin - awayWin;

  return { home: homeWin, draw, away: awayWin };
}

export function getGoalPrediction(homeCode: string, awayCode: string): { home: number; away: number } {
  const home = TEAMS[homeCode];
  const away = TEAMS[awayCode];
  if (!home || !away) return { home: 1, away: 1 };

  const homeStrength = 1 / Math.sqrt(home.fifaRank);
  const awayStrength = 1 / Math.sqrt(away.fifaRank);
  const avgGoals = 2.7; // avg goals per WC game

  const homeExpected = (homeStrength / (homeStrength + awayStrength)) * avgGoals * 1.15;
  const awayExpected = (awayStrength / (homeStrength + awayStrength)) * avgGoals;

  return {
    home: Math.max(0, Math.round(homeExpected * 10) / 10),
    away: Math.max(0, Math.round(awayExpected * 10) / 10),
  };
}
