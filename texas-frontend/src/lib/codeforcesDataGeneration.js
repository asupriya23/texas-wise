import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = `${__dirname}/../../public/data`;
const problemDataPath = `${dataDir}/codeforcesData.json`;
const contestDataPath = `${dataDir}/codeforcesContests.json`;

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const generateProblemCode = () => {
  const numbers = Math.floor(100 + Math.random() * 900);
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${numbers}${letter}`;
};

const generateRating = () => {
  return 800 + 100 * Math.floor(Math.random() * 28);
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
  if (Math.random() < 0.05) {
    const rank = generateRank();
    return [{
      date,
      contestId: `${date.split('-')[2]}${date.split('-')[1]}`,
      rank,
      ratingChange: calculateRatingChange(rank),
    }];
  }
  return [];
};

const biasedRandomProblemsSolved = () => {
  const biasTable = [0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8];
  return biasTable[Math.floor(Math.random() * biasTable.length)];
};

const generateData = () => {
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-12-31');
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
console.log(`Problem data written to ${problemDataPath}`);
console.log(`Contest data written to ${contestDataPath}`);
