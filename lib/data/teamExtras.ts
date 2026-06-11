export interface TeamExtras {
  coachName: string;
  coachNationality: string;
  recentForm: ('W' | 'D' | 'L')[];   // last 5 results newest-first
  squadValue: string;                  // "€850M"
  avgAge: number;
  prediction: string;                  // expected tournament stage
  groupAnalysis: string;               // one-sentence group prediction
  qualifyingGoals?: number;            // goals scored in qualifying
  qualifyingConceded?: number;
}

export const TEAM_EXTRAS: Record<string, TeamExtras> = {
  // GROUP A
  MEX: {
    coachName: "Javier Aguirre", coachNationality: "Mexican",
    recentForm: ["W","W","D","W","W"],
    squadValue: "€185M", avgAge: 27.2,
    prediction: "Round of 32",
    groupAnalysis: "Mexico's home-field fortress at Azteca makes them clear Group A favourites.",
    qualifyingGoals: 24, qualifyingConceded: 8,
  },
  RSA: {
    coachName: "Hugo Broos", coachNationality: "Belgian",
    recentForm: ["W","D","L","W","D"],
    squadValue: "€68M", avgAge: 27.8,
    prediction: "Group stage",
    groupAnalysis: "Bafana Bafana will fight but face a step up in class at their first WC since 2010.",
    qualifyingGoals: 18, qualifyingConceded: 10,
  },
  KOR: {
    coachName: "Hong Myung-bo", coachNationality: "South Korean",
    recentForm: ["W","W","D","W","L"],
    squadValue: "€215M", avgAge: 28.3,
    prediction: "Round of 32",
    groupAnalysis: "Son Heung-min's final World Cup campaign — Korea can reach the knockout round.",
    qualifyingGoals: 22, qualifyingConceded: 7,
  },
  CZE: {
    coachName: "Ivan Hašek", coachNationality: "Czech",
    recentForm: ["W","D","W","D","W"],
    squadValue: "€152M", avgAge: 28.5,
    prediction: "Group stage",
    groupAnalysis: "Czechia are disciplined but lack the firepower to beat Mexico and Korea.",
    qualifyingGoals: 20, qualifyingConceded: 9,
  },

  // GROUP B
  CAN: {
    coachName: "Jesse Marsch", coachNationality: "American",
    recentForm: ["W","W","D","D","W"],
    squadValue: "€225M", avgAge: 26.1,
    prediction: "Round of 32",
    groupAnalysis: "Canada co-hosts with genuine knockout ambitions for the first time.",
    qualifyingGoals: 28, qualifyingConceded: 9,
  },
  BIH: {
    coachName: "Sergej Barbarez", coachNationality: "Bosnian",
    recentForm: ["W","D","W","L","W"],
    squadValue: "€85M", avgAge: 27.4,
    prediction: "Group stage",
    groupAnalysis: "Bosnia bring Balkan grit but face a tough path out of Group B.",
    qualifyingGoals: 22, qualifyingConceded: 14,
  },
  QAT: {
    coachName: "Carlos Queiroz", coachNationality: "Portuguese",
    recentForm: ["W","W","D","W","D"],
    squadValue: "€55M", avgAge: 26.5,
    prediction: "Group stage",
    groupAnalysis: "Qatar look stronger than 2022 but advancing past Canada and Switzerland remains unlikely.",
    qualifyingGoals: 17, qualifyingConceded: 8,
  },
  SUI: {
    coachName: "Murat Yakin", coachNationality: "Swiss",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€275M", avgAge: 27.9,
    prediction: "Round of 32",
    groupAnalysis: "Switzerland are the dark horse — consistent, disciplined and hard to beat.",
    qualifyingGoals: 29, qualifyingConceded: 7,
  },

  // GROUP C
  BRA: {
    coachName: "Carlo Ancelotti", coachNationality: "Italian",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€840M", avgAge: 25.5,
    prediction: "Semi-finals",
    groupAnalysis: "Brazil are in their kindest group draw in years — expect a perfect record.",
    qualifyingGoals: 34, qualifyingConceded: 10,
  },
  MAR: {
    coachName: "Walid Regragui", coachNationality: "Moroccan",
    recentForm: ["W","W","D","W","W"],
    squadValue: "€390M", avgAge: 26.8,
    prediction: "Quarter-finals",
    groupAnalysis: "Morocco's semi-final 2022 pedigree makes them Group C's standout number 2.",
    qualifyingGoals: 26, qualifyingConceded: 5,
  },
  HAI: {
    coachName: "Marc Collat", coachNationality: "French",
    recentForm: ["W","L","W","D","W"],
    squadValue: "€38M", avgAge: 26.2,
    prediction: "Group stage",
    groupAnalysis: "Haiti's debut is historic but Brazil in Group C is an extraordinarily tough draw.",
    qualifyingGoals: 15, qualifyingConceded: 13,
  },
  SCO: {
    coachName: "Steve Clarke", coachNationality: "Scottish",
    recentForm: ["D","W","W","L","W"],
    squadValue: "€128M", avgAge: 28.1,
    prediction: "Group stage",
    groupAnalysis: "Scotland's strongest squad in 30 years but Group C offers limited room.",
    qualifyingGoals: 21, qualifyingConceded: 11,
  },

  // GROUP D
  USA: {
    coachName: "Mauricio Pochettino", coachNationality: "Argentine",
    recentForm: ["W","W","D","W","W"],
    squadValue: "€285M", avgAge: 26.8,
    prediction: "Quarter-finals",
    groupAnalysis: "The USA as co-hosts carry enormous momentum — Pulisic could be tournament revelation.",
    qualifyingGoals: 30, qualifyingConceded: 8,
  },
  PAR: {
    coachName: "Gustavo Alfaro", coachNationality: "Argentine",
    recentForm: ["W","D","W","D","L"],
    squadValue: "€92M", avgAge: 27.6,
    prediction: "Group stage",
    groupAnalysis: "Paraguay are well-organised but the gap to USA and Australia is significant.",
    qualifyingGoals: 19, qualifyingConceded: 15,
  },
  AUS: {
    coachName: "Tony Popovic", coachNationality: "Australian",
    recentForm: ["W","W","D","W","D"],
    squadValue: "€138M", avgAge: 28.6,
    prediction: "Round of 32",
    groupAnalysis: "The Socceroos aim to match their 2022 heroics — USA away may decide the group.",
    qualifyingGoals: 23, qualifyingConceded: 8,
  },
  TUR: {
    coachName: "Vincenzo Montella", coachNationality: "Italian",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€148M", avgAge: 26.4,
    prediction: "Round of 32",
    groupAnalysis: "Turkey's EURO 2024 semi-final run makes them a genuine Group D threat.",
    qualifyingGoals: 26, qualifyingConceded: 8,
  },

  // GROUP E
  GER: {
    coachName: "Julian Nagelsmann", coachNationality: "German",
    recentForm: ["W","W","W","W","D"],
    squadValue: "€760M", avgAge: 26.0,
    prediction: "Semi-finals",
    groupAnalysis: "Germany's home EURO 2024 form showed they're back — Musiala and Wirtz are world-class.",
    qualifyingGoals: 38, qualifyingConceded: 6,
  },
  CUW: {
    coachName: "Patrick Kluivert", coachNationality: "Dutch",
    recentForm: ["W","D","W","W","L"],
    squadValue: "€28M", avgAge: 26.8,
    prediction: "Group stage",
    groupAnalysis: "Curaçao's World Cup debut is a fairytale — survival is the realistic target.",
    qualifyingGoals: 12, qualifyingConceded: 8,
  },
  CIV: {
    coachName: "Emerse Faé", coachNationality: "Ivorian",
    recentForm: ["W","W","D","W","W"],
    squadValue: "€195M", avgAge: 26.7,
    prediction: "Round of 32",
    groupAnalysis: "AFCON 2024 winners Ivory Coast are dangerous — they can spring a surprise in Group E.",
    qualifyingGoals: 24, qualifyingConceded: 9,
  },
  ECU: {
    coachName: "Sebastián Beccacece", coachNationality: "Argentine",
    recentForm: ["D","W","W","W","D"],
    squadValue: "€125M", avgAge: 26.2,
    prediction: "Round of 32",
    groupAnalysis: "Ecuador's 2022 energy returns — Plata and Caicedo are their key weapons.",
    qualifyingGoals: 22, qualifyingConceded: 12,
  },

  // GROUP F
  NED: {
    coachName: "Ronald Koeman", coachNationality: "Dutch",
    recentForm: ["W","D","W","W","W"],
    squadValue: "€635M", avgAge: 27.1,
    prediction: "Quarter-finals",
    groupAnalysis: "The Dutch drew an accessible group — expect them to top with ease.",
    qualifyingGoals: 33, qualifyingConceded: 7,
  },
  JPN: {
    coachName: "Hajime Moriyasu", coachNationality: "Japanese",
    recentForm: ["W","W","D","W","W"],
    squadValue: "€295M", avgAge: 26.3,
    prediction: "Round of 32",
    groupAnalysis: "Japan's EURO-based stars make them genuine competitors for second in Group F.",
    qualifyingGoals: 38, qualifyingConceded: 5,
  },
  SWE: {
    coachName: "Jon Dahl Tomasson", coachNationality: "Danish",
    recentForm: ["W","W","D","W","W"],
    squadValue: "€215M", avgAge: 27.1,
    prediction: "Round of 32",
    groupAnalysis: "Sweden and Japan will battle for second — Isak's form is key.",
    qualifyingGoals: 28, qualifyingConceded: 7,
  },
  TUN: {
    coachName: "Jalel Kadri", coachNationality: "Tunisian",
    recentForm: ["W","L","D","W","W"],
    squadValue: "€78M", avgAge: 27.4,
    prediction: "Group stage",
    groupAnalysis: "Tunisia beat France in 2022 — they're capable of a shock but Group F is brutal.",
    qualifyingGoals: 17, qualifyingConceded: 8,
  },

  // GROUP G
  BEL: {
    coachName: "Domenico Tedesco", coachNationality: "German-Italian",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€515M", avgAge: 28.2,
    prediction: "Quarter-finals",
    groupAnalysis: "Belgium won a weak group — expect them to coast through with De Bruyne pulling strings.",
    qualifyingGoals: 29, qualifyingConceded: 5,
  },
  EGY: {
    coachName: "Hossam Hassan", coachNationality: "Egyptian",
    recentForm: ["W","D","W","D","W"],
    squadValue: "€82M", avgAge: 27.1,
    prediction: "Group stage",
    groupAnalysis: "Salah's World Cup debut is iconic — Egypt will aim to upset one team but qualify is tough.",
    qualifyingGoals: 20, qualifyingConceded: 8,
  },
  IRN: {
    coachName: "Amir Ghalenoei", coachNationality: "Iranian",
    recentForm: ["W","W","D","W","D"],
    squadValue: "€88M", avgAge: 27.8,
    prediction: "Group stage",
    groupAnalysis: "Iran's Bundesliga core makes them competitive, but Belgium is simply too strong.",
    qualifyingGoals: 25, qualifyingConceded: 6,
  },
  NZL: {
    coachName: "Darren Bazeley", coachNationality: "New Zealander",
    recentForm: ["W","D","W","D","L"],
    squadValue: "€42M", avgAge: 28.3,
    prediction: "Group stage",
    groupAnalysis: "New Zealand's first WC since 2010 — Chris Wood can score but draws is the best hope.",
    qualifyingGoals: 14, qualifyingConceded: 6,
  },

  // GROUP H
  ESP: {
    coachName: "Luis de la Fuente", coachNationality: "Spanish",
    recentForm: ["W","W","W","W","W"],
    squadValue: "€920M", avgAge: 24.5,
    prediction: "Final",
    groupAnalysis: "Spain are ranked #1 and EURO 2024 champions — Group H is a formality.",
    qualifyingGoals: 40, qualifyingConceded: 4,
  },
  CPV: {
    coachName: "Pedro Leitão", coachNationality: "Cape Verdean",
    recentForm: ["W","W","D","L","W"],
    squadValue: "€35M", avgAge: 27.0,
    prediction: "Group stage",
    groupAnalysis: "Cape Verde's historic debut — maximum one point would be a success against Spain.",
    qualifyingGoals: 16, qualifyingConceded: 9,
  },
  KSA: {
    coachName: "Hervé Renard", coachNationality: "French",
    recentForm: ["W","D","W","W","D"],
    squadValue: "€68M", avgAge: 26.5,
    prediction: "Group stage",
    groupAnalysis: "Saudi Arabia beat Argentina in 2022 — they'll target Cape Verde for vital points.",
    qualifyingGoals: 19, qualifyingConceded: 10,
  },
  URU: {
    coachName: "Marcelo Bielsa", coachNationality: "Argentine",
    recentForm: ["W","D","W","W","L"],
    squadValue: "€178M", avgAge: 27.6,
    prediction: "Round of 32",
    groupAnalysis: "Uruguay under Bielsa are organised and dangerous — second in Group H is theirs to lose.",
    qualifyingGoals: 22, qualifyingConceded: 13,
  },

  // GROUP I
  FRA: {
    coachName: "Didier Deschamps", coachNationality: "French",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€1.12B", avgAge: 25.8,
    prediction: "Final",
    groupAnalysis: "France (FIFA #1, April 2026) are the most complete squad — Group I is a procession.",
    qualifyingGoals: 35, qualifyingConceded: 5,
  },
  SEN: {
    coachName: "Aliou Cissé", coachNationality: "Senegalese",
    recentForm: ["W","W","D","W","D"],
    squadValue: "€168M", avgAge: 26.4,
    prediction: "Round of 32",
    groupAnalysis: "Senegal carry African Champion momentum — second in Group I is very achievable.",
    qualifyingGoals: 22, qualifyingConceded: 6,
  },
  IRQ: {
    coachName: "Jesús Casas", coachNationality: "Spanish",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€48M", avgAge: 25.5,
    prediction: "Group stage",
    groupAnalysis: "Iraq's emotional return after 40 years — Aymen Hussein will score but France is mountains.",
    qualifyingGoals: 28, qualifyingConceded: 7,
  },
  NOR: {
    coachName: "Ståle Solbakken", coachNationality: "Norwegian",
    recentForm: ["W","W","W","W","D"],
    squadValue: "€385M", avgAge: 25.7,
    prediction: "Round of 32",
    groupAnalysis: "Haaland's first World Cup — Norway and Senegal battle for second in Group I.",
    qualifyingGoals: 38, qualifyingConceded: 8,
  },

  // GROUP J
  ARG: {
    coachName: "Lionel Scaloni", coachNationality: "Argentine",
    recentForm: ["W","W","W","W","D"],
    squadValue: "€730M", avgAge: 27.3,
    prediction: "Final",
    groupAnalysis: "Defending champions Argentina sail through Group J — Messi's farewell continues.",
    qualifyingGoals: 26, qualifyingConceded: 8,
  },
  ALG: {
    coachName: "Djamel Belmadi", coachNationality: "Algerian",
    recentForm: ["W","W","D","W","W"],
    squadValue: "€95M", avgAge: 26.8,
    prediction: "Group stage",
    groupAnalysis: "Algeria can shock Austria for second — Benrahma makes them dangerous.",
    qualifyingGoals: 23, qualifyingConceded: 7,
  },
  AUT: {
    coachName: "Ralf Rangnick", coachNationality: "German",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€172M", avgAge: 27.8,
    prediction: "Round of 32",
    groupAnalysis: "Austria's EURO 2024 momentum under Rangnick — they'll push Algeria hard.",
    qualifyingGoals: 27, qualifyingConceded: 9,
  },
  JOR: {
    coachName: "Adnan Hamad", coachNationality: "Jordanian",
    recentForm: ["W","D","W","D","W"],
    squadValue: "€28M", avgAge: 27.2,
    prediction: "Group stage",
    groupAnalysis: "Jordan's historic debut — scoring against Argentina would make history.",
    qualifyingGoals: 12, qualifyingConceded: 8,
  },

  // GROUP K
  POR: {
    coachName: "Roberto Martínez", coachNationality: "Spanish",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€855M", avgAge: 27.8,
    prediction: "Semi-finals",
    groupAnalysis: "Portugal's strongest non-Ronaldo generation — Group K is manageable.",
    qualifyingGoals: 36, qualifyingConceded: 4,
  },
  COD: {
    coachName: "Sébastien Desabre", coachNationality: "French",
    recentForm: ["W","D","W","W","L"],
    squadValue: "€78M", avgAge: 26.4,
    prediction: "Group stage",
    groupAnalysis: "DR Congo's debut generation is exciting but faces a very tough group.",
    qualifyingGoals: 20, qualifyingConceded: 10,
  },
  UZB: {
    coachName: "Srecko Katanec", coachNationality: "Slovenian",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€48M", avgAge: 25.8,
    prediction: "Group stage",
    groupAnalysis: "Uzbekistan's historic debut — they could cause Colombia an upset.",
    qualifyingGoals: 18, qualifyingConceded: 8,
  },
  COL: {
    coachName: "Néstor Lorenzo", coachNationality: "Argentine",
    recentForm: ["W","W","W","W","D"],
    squadValue: "€235M", avgAge: 27.8,
    prediction: "Round of 32",
    groupAnalysis: "Copa América 2024 runners-up Colombia are Group K's clear second — Díaz is electric.",
    qualifyingGoals: 25, qualifyingConceded: 9,
  },

  // GROUP L
  ENG: {
    coachName: "Thomas Tuchel", coachNationality: "German",
    recentForm: ["W","W","W","D","W"],
    squadValue: "€1.02B", avgAge: 26.5,
    prediction: "Semi-finals",
    groupAnalysis: "England are clear Group L favourites under Tuchel — Bellingham leads a golden generation.",
    qualifyingGoals: 33, qualifyingConceded: 5,
  },
  CRO: {
    coachName: "Zlatko Dalić", coachNationality: "Croatian",
    recentForm: ["W","D","W","W","D"],
    squadValue: "€182M", avgAge: 30.5,
    prediction: "Round of 32",
    groupAnalysis: "Modrić's final dance — Croatia will grind past Ghana for second.",
    qualifyingGoals: 24, qualifyingConceded: 9,
  },
  GHA: {
    coachName: "Otto Addo", coachNationality: "Ghanaian-German",
    recentForm: ["W","D","W","D","L"],
    squadValue: "€95M", avgAge: 26.8,
    prediction: "Group stage",
    groupAnalysis: "Ghana's 2010 heartbreak memory lingers — Kudus can make the difference.",
    qualifyingGoals: 20, qualifyingConceded: 10,
  },
  PAN: {
    coachName: "Thomas Christiansen", coachNationality: "Danish-Spanish",
    recentForm: ["W","D","W","L","W"],
    squadValue: "€42M", avgAge: 27.5,
    prediction: "Group stage",
    groupAnalysis: "Panama want their first World Cup point — Group L makes that very difficult.",
    qualifyingGoals: 15, qualifyingConceded: 14,
  },
};

export function getTeamExtras(code: string): TeamExtras | undefined {
  return TEAM_EXTRAS[code];
}
