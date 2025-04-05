import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = `${__dirname}/../../public/data`;
const problemDataPath = `${dataDir}/codechefData.json`;
const contestDataPath = `${dataDir}/codechefContests.json`;

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
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

const generateRank = () => {
  const rankBuckets = [Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 400) + 100, Math.floor(Math.random() * 1000) + 500];
  return rankBuckets[Math.floor(Math.random() * rankBuckets.length)];
};

const calculateRatingChange = (rank) => {
  if (rank <= 500) return Math.floor(60 + Math.random() * 40);
  if (rank <= 1000) return Math.floor(20 + Math.random() * 40);
  if (rank <= 3000) return Math.floor(-10 + Math.random() * 30);
  return Math.floor(-60 + Math.random() * 30);
};

const generateContestsForDate = (date) => {
  if (Math.random() < 0.04) {
    const rank = generateRank();
    return [{
      date,
      contestId: `CC${date.split('-')[2]}${date.split('-')[1]}`,
      rank,
      ratingChange: calculateRatingChange(rank),
    }];
  }
  return [];
};

const biasedRandomProblemsSolved = () => {
  const biasTable = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8];
  return biasTable[Math.floor(Math.random() * biasTable.length)];
};

const generateData = () => {
  const startDate = new Date('2021-01-01');
  const endDate = new Date();
  const problemData = [];
  const contestData = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const numProblems = biasedRandomProblemsSolved();
    const problemsSolved = Array.from({ length: numProblems }, () => ({
      rating: generateRating(),
      problemCode: generateProblemCode(),
      numberOfAttempts: Math.floor(Math.random() * 5) + 1,
    }));

    problemData.push({
      date: dateStr,
      numberOfProblemsSolved: numProblems,
      problemsSolved,
    });

    contestData.push(...generateContestsForDate(dateStr));
  }

  return { problemData, contestData };
};

const { problemData, contestData } = generateData();

writeFileSync(problemDataPath, JSON.stringify(problemData, null, 2));
writeFileSync(contestDataPath, JSON.stringify(contestData, null, 2));
console.log(`CodeChef problem data written to ${problemDataPath}`);
console.log(`CodeChef contest data written to ${contestDataPath}`);
