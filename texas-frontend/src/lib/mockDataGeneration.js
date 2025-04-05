import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/../data/mockData.json`;

if (!existsSync(dirname(filePath))) {
  mkdirSync(dirname(filePath), { recursive: true });
}

const startDate = new Date('2025-01-01');
const endDate = new Date('2025-12-31');
const mockData = { data: [] };

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  mockData.data.push({
    date: d.toISOString().split('T')[0],
    leetcode: Math.floor(Math.random() * 10) + 1,
    codeforces: Math.floor(Math.random() * 10) + 1,
    codechef: Math.floor(Math.random() * 10) + 1,
  });
}

writeFileSync(filePath, JSON.stringify(mockData, null, 2));
console.log(`Mock data generated and saved to ${filePath}`);
