import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/../data/codeforcesData.json`;

if (!existsSync(dirname(filePath))) {
  mkdirSync(dirname(filePath), { recursive: true });
}

const generateproblemCode = () => {
  const numbers = Math.floor(100 + Math.random() * 900); // Random 3-digit number
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random uppercase letter
  return `${numbers}${letter}`;
};

const generateRating = () => {
  return 800 + 100 * Math.floor(Math.random() * 28); // 800 to 3500 in steps of 100
};

const generateData = () => {
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-12-31');
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const numProblems = Math.floor(Math.random() * 9); // Between 0 and 8 problems solved
    const problemsSolved = Array.from({ length: numProblems }, () => ({
      rating: generateRating(),
      problemCode: generateproblemCode(),
      numberOfAttempts: Math.floor(Math.random() * 5) + 1, // 1 to 5 attempts
    }));

    data.push({
      date: d.toISOString().split('T')[0],
      numberOfProblemsSolved: numProblems,
      problemsSolved,
    });
  }

  return data;
};

const codeforcesData = generateData();
writeFileSync(filePath, JSON.stringify(codeforcesData, null, 2));
console.log(`Codeforces data generated and saved to ${filePath}`);
