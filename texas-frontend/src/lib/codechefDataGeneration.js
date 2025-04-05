import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/../../public/data/codechefData.json`;

if (!existsSync(dirname(filePath))) {
  mkdirSync(dirname(filePath), { recursive: true });
}

const codechefProblems = [
  "ZOZ", "VOWELTB", "CHN15A", "NUM239", "PRIME1", "KOL15A", "HEADBOB", "WATSCORE", "WESTAND", "FIRESC",
  "MARCHA1", "ACBALL", "ADACRA", "ADAKNG", "ADASCOOL", "ADASTAIR", "ADMIT", "AIRLINE", "ALEXNUMB", "ALEXTASK",
  "ALPHABET", "ALTARAY", "ALTER", "AMMEAT", "AMMEAT2", "AMR15A", "AMR15D", "AMSGAME1", "ANDOR", "ANDSUBAR",
  "ANKTRAIN", "ANUARM", "ANUBTG", "ANUTHM", "ANUWTA", "APPROX2", "AREAPERI", "ARRANGE", "COF1MED1", "ATM2",
  "ATTENDU", "ATTIC", "ATTND", "AVG", "AVGFLEX", "BEGGASOL", "BENDSP2", "BFRIEND", "BFTT", "BIGSALE",
  "BINFLIP", "BINTREE", "BOOKS", "BYTEBIT", "BLACKCELL", "CHESSMATCH", "BMI", "WORLDRECORD", "BOWLINGSTRATEGY", "BRACKETS",
  "BREAKBRICKS", "BEARLADDER", "BROKENTEL", "BSTOPS", "BUGCALC", "BODYBUILDER", "BEAUTYPARTS", "CAKEZONE", "BINARYTREEPATHS", "CIELRCPT",
  "CHEFREMS", "CHEFOPS", "HELPINGCHEF", "NUMMIRROR", "DECREMENTORINCREMENT", "LAZYJEM", "ATM", "ADDNUMS", "FINDREM", "ENORMINPUTTEST",
  "SUMDIGITS", "SMALLFACTORIALS", "TURBOSORT", "FIRSTLASTDIGIT", "LUCKYFOUR", "REVERSENUM", "SQUAREROOTS"
];

const generateProblemCode = () => {
  return codechefProblems[Math.floor(Math.random() * codechefProblems.length)];
};

const generateRating = () => {
  return Math.floor(200 + Math.random() * 2301);
};

const biasedRandomProblemsSolved = () => {
  const biasTable = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8]; // Bias toward lower values
  return biasTable[Math.floor(Math.random() * biasTable.length)];
};

const generateData = () => {
  const startDate = new Date('2021-01-01');
  const endDate = new Date();
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const numProblems = biasedRandomProblemsSolved();
    const problemsSolved = Array.from({ length: numProblems }, () => ({
      rating: generateRating(),
      problemCode: generateProblemCode(),
      numberOfAttempts: Math.floor(Math.random() * 5) + 1,
    }));

    data.push({
      date: d.toISOString().split('T')[0],
      numberOfProblemsSolved: numProblems,
      problemsSolved,
    });
  }

  return data;
};

const codechefData = generateData();
writeFileSync(filePath, JSON.stringify(codechefData, null, 2));
console.log(`CodeChef data generated and saved to ${filePath}`);
