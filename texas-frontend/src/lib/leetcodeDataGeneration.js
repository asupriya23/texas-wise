import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = `${__dirname}/../../public/data`;
const problemDataPath = `${dataDir}/leetcodeData.json`;
const contestDataPath = `${dataDir}/leetcodeContests.json`;

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const leetcodeProblems = {
  "two-sum": "Easy",
  "add-two-numbers": "Medium",
  "longest-substring-without-repeating-characters": "Medium",
  "longest-palindromic-substring": "Medium",
  "reverse-integer": "Medium",
  "string-to-integer-atoi": "Medium",
  "regular-expression-matching": "Hard",
  "container-with-most-water": "Medium",
  "roman-to-integer": "Easy",
  "letter-combinations-of-a-phone-number": "Medium",
  "remove-nth-node-from-end-of-list": "Medium",
  "valid-parentheses": "Easy",
  "merge-two-sorted-lists": "Easy",
  "merge-k-sorted-lists": "Hard",
  "remove-duplicates-from-sorted-array": "Easy",
  "find-the-index-of-the-first-occurrence-in-a-string": "Easy",
  "divide-two-integers": "Medium",
  "search-in-rotated-sorted-array": "Medium",
  "first-missing-positive": "Hard",
  "wildcard-matching": "Hard",
  "permutations": "Medium",
  "rotate-image": "Medium",
  "group-anagrams": "Medium",
  "powx-n": "Medium",
  "3sum": "Medium",
  "maximum-subarray": "Medium",
  "spiral-matrix": "Medium",
  "jump-game": "Medium",
  "merge-intervals": "Medium",
  "unique-paths": "Medium",
  "plus-one": "Easy",
  "sqrtx": "Easy",
  "climbing-stairs": "Easy",
  "set-matrix-zeroes": "Medium",
  "sort-colors": "Medium",
  "minimum-window-substring": "Hard",
  "subsets": "Medium",
  "word-search": "Medium",
  "largest-rectangle-in-histogram": "Hard",
  "merge-sorted-array": "Easy",
  "decode-ways": "Medium",
  "binary-tree-inorder-traversal": "Easy",
  "validate-binary-search-tree": "Medium",
  "longest-common-subsequence": "Medium",
  "rotting-oranges": "Medium",
  "daily-temperatures": "Medium",
  "binary-search": "Easy",
  "permutation-in-string": "Medium",
  "subarray-sum-equals-k": "Medium",
  "diameter-of-binary-tree": "Easy",
  "kth-largest-element-in-an-array": "Medium",
  "implement-trie-prefix-tree": "Medium",
  "course-schedule": "Medium",
  "reverse-linked-list": "Easy",
  "number-of-islands": "Medium",
  "binary-tree-right-side-view": "Medium",
  "house-robber": "Medium",
  "linked-list-cycle": "Easy",
  "lowest-common-ancestor-of-a-binary-tree": "Medium",
  "maximum-depth-of-binary-tree": "Easy",
  "invert-binary-tree": "Easy",
  "palindromic-substrings": "Medium",
  "find-peak-element": "Medium",
  "search-a-2d-matrix": "Medium",
  "edit-distance": "Hard",
  "minimum-path-sum": "Medium",
  "unique-binary-search-trees": "Medium",
  "construct-binary-tree-from-preorder-and-inorder-traversal": "Medium",
  "flatten-binary-tree-to-linked-list": "Medium",
  "valid-sudoku": "Medium",
  "sudoku-solver": "Hard",
  "n-queens": "Hard",
  "implement-queue-using-stacks": "Easy",
  "implement-stack-using-queues": "Easy",
  "design-browser-history": "Medium",
  "min-stack": "Easy",
  "sliding-window-maximum": "Hard",
  "kth-smallest-element-in-a-bst": "Medium",
  "binary-tree-zigzag-level-order-traversal": "Medium",
  "search-in-a-binary-search-tree": "Easy",
  "delete-node-in-a-bst": "Medium",
  "serialize-and-deserialize-binary-tree": "Hard",
  "design-twitter": "Medium",
  "lfu-cache": "Hard",
  "lru-cache": "Medium",
  "maximum-product-subarray": "Medium",
  "find-median-from-data-stream": "Hard",
  "trapping-rain-water": "Hard",
  "basic-calculator": "Hard",
  "expression-add-operators": "Hard",
  "count-of-smaller-numbers-after-self": "Hard",
  "meeting-rooms-ii": "Medium",
};

const generateProblemCode = () => {
  const keys = Object.keys(leetcodeProblems);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return {
    problemCode: randomKey,
    rating: leetcodeProblems[randomKey],
  };
};

const generateRank = () => {
  const rankBuckets = [
    Math.floor(Math.random() * 100) + 1,
    Math.floor(Math.random() * 400) + 100,
    Math.floor(Math.random() * 1000) + 500,
  ];
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
    return [
      {
        date,
        contestId: `LC-${date.replace(/-/g, '')}`,
        rank,
        ratingChange: calculateRatingChange(rank),
      },
    ];
  }
  return [];
};

const weightedProblemCounts = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8];

const generateData = () => {
  const startDate = new Date("2021-01-01");
  const endDate = new Date();
  const problemData = [];
  const contestData = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const numProblems = weightedProblemCounts[Math.floor(Math.random() * weightedProblemCounts.length)];

    const problemsSolved = Array.from({ length: numProblems }, () => {
      const { problemCode, rating } = generateProblemCode();
      return {
        problemCode,
        rating,
        numberOfAttempts: Math.floor(Math.random() * 5) + 1,
      };
    });

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
console.log(`LeetCode problem data saved to ${problemDataPath}`);
console.log(`LeetCode contest data saved to ${contestDataPath}`);